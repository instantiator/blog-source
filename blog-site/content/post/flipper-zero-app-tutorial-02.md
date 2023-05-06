---
title: "Building an app for Flipper Zero, part 2: A simple user interface"
date: 2023-05-05T21:00:00Z
draft: false
tags: [ "FlipperZero", "flipper", "app", "plugin", "coding", "c", "clang", "ufbt", "community", "project", "ui", "gui", "user interface", "graphics", "view", "scene" ]
images: [ "https://github.com/instantiator/flipper-zero-experimental-apps/raw/main/resistors/.flipcorg/banner.png" ]
categories: ["tutorial"]
series: ["flipper-zero-app-tutorial"]
---

In this part, we'll build a simple user interface for a Flipper Zero app.

The Flipper Zero is a digital signals multi-tool device, with some fun applications. It has an infrared module, a sub-GHz radio, RFID and NFC capability, iButton, USB, a screen, input controls, and GPIO pins. It's small enough to fit in your hand, and it can communicate with your home appliances, or help you to learn about the signals that fly around our world. It's also extremely customisable.

# Let's build a UI for Flipper Zero

The Flipper's firmware provides a range of library functions and structures to support user interfaces. There are some simple options, but anything more complex than the simplest apps will need to display a variety of views grouped into scenes.

The UI for this tutorial will have 3 scenes:

* A main menu
* A popup (popup 1)
* Another popup (popup 2)

The user can choose an option from the menu, which will then result in their seeing either popup 1 or popup 2. (It's very simple!)

## Tutorial code

**The code for this tutorial is at: [instantiator/flipper-zero-tutorial-app](https://github.com/instantiator/flipper-zero-tutorial-app)**

For simplicity, the tutorial app is contained in a single, self-contained `.c` file. When building an app any more complex than this, I recommend breaking it into multiple files, and making the functions you wish to share available by creating and importing `.h` header files.

_NB. Without header files, as here, references must come after that particular resource has been defined, or they will not compile. In effect, the code "reads backwards". The entrypoint is the last function defined in [`test_app.c`](https://github.com/instantiator/flipper-zero-tutorial-app/blob/main/test_app.c), as it must refer to functions that came before it - and so on..._

### Supporting references

A lot of the code I'll be sharing here is derived from the work I did building the [resistance calculator](https://github.com/instantiator/flipper-zero-experimental-apps/tree/main/resistors) app, and you're welcome to sift through that code and plunder what you need for your own projects.

In turn, that app relies heavily on the patterns provided in Derek Jamison's [basic scenes](https://github.com/jamisonderek/flipper-zero-tutorials/tree/main/plugins/basic_scenes) tutorial. Derek has been kindly supporting and debugging my work in the background, and has produced a vast library of valuable learning resources. Check out his YouTube channel:

* [@MrDerekJamison](https://www.youtube.com/@MrDerekJamison)

Derek also maintains a wiki, full of information for new coders:

* [jamisonderek/flipper-zero-tutorials/wiki/User-Interface](https://github.com/jamisonderek/flipper-zero-tutorials/wiki/User-Interface)

### With thanks

This part of the tutorial series would not have been possible without the help and support of various people in the Flipper Zero community. Many thanks to:

* [Derek Jamison](https://github.com/jamisonderek) for the [Flipper Zero tutorials](https://github.com/jamisonderek/flipper-zero-tutorials) repository (in particular, [plugins](https://github.com/jamisonderek/flipper-zero-tutorials/tree/main/plugins))
* [DroomOne](https://github.com/DroomOne) for the [Flipper Plugin tutorial](https://github.com/DroomOne/Flipper-Plugin-Tutorial).
* [Chris Hranj](https://brodan.biz/) (Brodan) for the [guide to Flipper Zero components](https://brodan.biz/blog/a-visual-guide-to-flipper-zero-gui-components/).

## Approaches

Flipper Zero provides a few of ways to build an app interface. The simplest is to create and register a `ViewPort`, and register a function for redrawing it which will be called each time `view_port_update` is called.

Although reasonably simple, this approach doesn't benefit from all the components available through the firmware. You'll have to design your own interface. It does seem to be reasonably popular amongst developers of simple games on the Flipper, though. If you want to see an example of this approach, check out the **tag** application (currently under development). In particular: [`tag_ui.c`](https://github.com/instantiator/flipper-zero-experimental-apps/blob/main/tag/src/tag_ui.c), [`tag_app_loop.c`](https://github.com/instantiator/flipper-zero-experimental-apps/blob/main/tag/src/tag_app_loop.c)

In this tutorial, we'll explore another approach, which supports the simplification and management of more complex UI structures. It uses the various UI components available through the Flipper firmware.

## Scenes and views

A user interface is broken down into views, each of which is a visual component (such as a menu, popup, file browser, or text input...)

> For a guide to the various components, I recommend Brodan's [Visual Guide to Flipper Zero GUI Modules](https://brodan.biz/blog/a-visual-guide-to-flipper-zero-gui-components/). The most adaptable of these is the `Widget` view, which deserve a tutorial of its own. For an example of its use, see the resistor editing scene in the Resistance Calculator app: [scene_edit.c ](https://github.com/instantiator/flipper-zero-experimental-apps/blob/main/resistors/src/scene_edit.c)

We'll take a look at a the `Menu` and `Popup` components in a little more detail as a part of this tutorial.

Scenes are a layer of abstraction above views, allowing you to define a number of scene handler functions - responsible for rendering the view on entering a scene, destroying it on exit, and responding to events while the scene is active.

## `SceneManager` and `ViewDispatcher`

A `SceneManager` (supported by a number of `scene_manager_*` functions) contains and manages all details of the scenes known to the app. It's responsible for ensuring that the functions that govern the active scene are called during entry, exit, and when events are received.

Views are managed by a `ViewDispatcher` (with a number of `view_dispatcher_` prefixed functions), called from the handler functions passed in to the `SceneManager`.

To define all the scenes for your app, provide all the handler functions as a [`SceneManagerHandlers`](https://github.com/flipperdevices/flipperzero-firmware/blob/dev/applications/services/gui/scene_manager.h#L42) `struct` to the [`scene_manager_alloc`](https://github.com/flipperdevices/flipperzero-firmware/blob/dev/applications/services/gui/scene_manager.h#L77) function.

Scenes are indexed numerically, and so it's helpful to create an enum to track their indices, eg.

```c
typedef enum {
    TestAppScene_MainMenu,
    TestAppScene_FirstPopup,
    TestAppScene_SecondPopup,
    TestAppScene_count
} TestAppScene;
```

_NB. That `TestAppScene_count` value at the end of the enum is a handy way to safely obtain the size of the `enum` even if you change its contents later. Just ensure it's always the last item._

Views can be reused, and so there may be fewer views than scenes, eg.:

```c
typedef enum {
    TestAppView_Menu,
    TestAppView_Popup
} TestAppScene;
```

## Initialising the app

With these enums defined, we're ready to set up the main `struct` containing the app's state, and then go on to allocate and initialise everything.

In the tutorial app, this takes place in the `test_app_init` function, which goes on to call out to functions that will initialise the scene manager, and view dispatcher:

```c
TestApp* app = malloc(sizeof(TestApp));
test_app_scene_manager_init(app);
test_app_view_dispatcher_init(app);
```

## Setting up the scene manager

`test_app_scene_manager_init` is reasonably simple. It allocates memory for a `SceneManager`.

```c
app->scene_manager = scene_manager_alloc(&test_app_scene_event_handlers, app);
```

The second parameter is simply the context, passed back to the active scene's handler methods when they are called. The first parameter, `SceneManagerHandlers* test_app_scene_event_handlers` has already been defined above. It's a collection of all the `on_enter`, `on_exit`, and `on_event` handler functions for all the scenes:

```c
/** collection of all scene on_enter handlers - in the same order as their enum */
void (*const test_app_scene_on_enter_handlers[])(void*) = {
    test_app_scene_on_enter_main_menu,
    test_app_scene_on_enter_popup_one,
    test_app_scene_on_enter_popup_two};

/** collection of all scene on event handlers - in the same order as their enum */
bool (*const test_app_scene_on_event_handlers[])(void*, SceneManagerEvent) = {
    test_app_scene_on_event_main_menu,
    test_app_scene_on_event_popup_one,
    test_app_scene_on_event_popup_two};

/** collection of all scene on exit handlers - in the same order as their enum */
void (*const test_app_scene_on_exit_handlers[])(void*) = {
    test_app_scene_on_exit_main_menu,
    test_app_scene_on_exit_popup_one,
    test_app_scene_on_exit_popup_two};

/** collection of all on_enter, on_event, on_exit handlers */
const SceneManagerHandlers test_app_scene_event_handlers = {
    .on_enter_handlers = test_app_scene_on_enter_handlers,
    .on_event_handlers = test_app_scene_on_event_handlers,
    .on_exit_handlers = test_app_scene_on_exit_handlers,
    .scene_num = TestAppScene_count};
```

## Setting up the view dispatcher

`test_app_view_dispatcher_init` has a little more to do.

### Allocate the dispatcher

```c
app->view_dispatcher = view_dispatcher_alloc();
view_dispatcher_enable_queue(app->view_dispatcher);
```

### Allocate individual views

```c
app->menu = menu_alloc();
app->popup = popup_alloc();
```

### Pass events from the view to the scene

The views themselves initially handle events and navigation, but we want to pass those to the scene manager so that they're available to the active scene's handler functions.

```c
// assign callback that pass events from views to the scene manager
view_dispatcher_set_event_callback_context(app->view_dispatcher, app);
view_dispatcher_set_custom_event_callback(
    app->view_dispatcher,
    test_app_scene_manager_custom_event_callback);
view_dispatcher_set_navigation_event_callback(
    app->view_dispatcher,
    test_app_scene_manager_navigation_event_callback);
```

### Register views with the dispatcher

```c
// add views to the dispatcher, indexed by their enum value
view_dispatcher_add_view(
    app->view_dispatcher,
    TestAppView_Menu,
    menu_get_view(app->menu));

view_dispatcher_add_view(
    app->view_dispatcher,
    TestAppView_Popup,
    popup_get_view(app->popup));
```

## Defining the scenes

With all the structure to support scenes in place, the scene functions will complete the test app. Each scene has 3 functions:

* `*_on_enter` - initiating the view and scene resources
* `*_on_event` - handling inputs and custom events
* `*_on_exit` - freeing resources used by the scene

Of these, the main menu scene `TestAppScene_MainMenu` is the most complex.

### The menu callback

The menu view itself has an additional callback of its own:

`test_app_menu_callback_main_menu` is provided with a value from `TestAppMenuSelection` indicating the selection that the user made. This is then used to determine which event from `TestAppEvent` to send to the scene's custom event handler function with a call to `scene_manager_handle_custom_event`.

> Sending events on to the scene manager, rather than handling them in the menu's callback, is good practise - ensuring that the _active_ scene is sent the event, and that the scene's `_on_event` handler is the place where actions are initiated. This pattern ensures that your application's decision-making logic for each scene is easy to locate.

### On entering the main menu scene

When entering a scene, the `test_app_scene_on_enter_main_menu` function is called. This is responsible for setting up the scene, by initiating the view for the scene (and any other resources it needs), and then instructing the view dispatcher to switch to the appropriate view, with a call to: `view_dispatcher_switch_to_view`

First, the menu view is reset:

```c
menu_reset(app->menu);
view_set_context(menu_get_view(app->menu), app);
```

Then each menu item is added. Each is given an id from `TestAppMenuSelection` - this is used in `test_app_menu_callback_main_menu` to identify the user's selection:

```c
menu_add_item(
    app->menu,
    "First popup",
    &I_one,
    TestAppMenuSelection_One,
    test_app_menu_callback_main_menu,
    app);
menu_add_item(
    app->menu,
    "Second popup",
    &I_two,
    TestAppMenuSelection_Two,
    test_app_menu_callback_main_menu,
    app);
```

Finally the view dispatcher is instructed to switch to this view:

```c
view_dispatcher_switch_to_view(app->view_dispatcher, TestAppView_Menu);
```

### Handling events in the menu scene

The menu scene's event handling function, `test_app_scene_on_event_main_menu` is given a `SceneManagerEvent` to interpret. It returns a `bool` indicating if it handled the event or not. This is a reasonably simple struct:

`event.type` is a `SceneManagerEventType` with 3 possible values:

* `SceneManagerEventTypeCustom` - these are events we have passed to the scene manager, and can be for anything. They often represent significant events, such as user interactions, or inputs.
* `SceneManagerEventTypeBack` - this event indicates that the user is attempting to go back in the app (ie. with the back button). If not handled, the scene manager will do the right thing and pass the user to the previous scene.
* `SceneManagerEventTypeTick` - this event indicates that the scene has been sent a tick, and should refresh. It's also an opportunity to update any models that the application updates over time. Similarly, if not handled, the scene manager will take care of this.

`SceneManagerEventTypeCustom` is the type of event that the `test_app_menu_callback_main_menu` function creates when it invokes `scene_manager_handle_custom_event`.

`event.event` contains the value from `TestAppEvent` that was passed in, ie. `TestAppEvent_ShowPopupOne` or `TestAppEvent_ShowPopupTwo`. These events should be reasonably clear - they are instructions to switch the scene, using `scene_manager_next_scene`.

This logic is handled in two nested switch statements:

```c
bool consumed = false;
switch(event.type) {
case SceneManagerEventTypeCustom:
    switch(event.event) {
    case TestAppEvent_ShowPopupOne:
        scene_manager_next_scene(app->scene_manager, TestAppScene_FirstPopup);
        consumed = true;
        break;
    case TestAppEvent_ShowPopupTwo:
        scene_manager_next_scene(app->scene_manager, TestAppScene_SecondPopup);
        consumed = true;
        break;
    }
    break;
default: // eg. SceneManagerEventTypeBack, SceneManagerEventTypeTick
    consumed = false;
    break;
}
return consumed;
```

### Exiting the main menu scene

Finally, the `test_app_scene_on_exit_main_menu` function very simply clears up the menu, using `menu_reset`.

```c
TestApp* app = context;
menu_reset(app->menu);
```

_NB. This does not free the menu's memory allocation, but it does clear away the menu items and content of the menu._

Although we also do this reset when entering the menu scene, it's good practise to clear up a resource on exit to ensure that it's not occupying space when not in use.

### The popup scenes

The popup scenes, `TestAppScene_FirstPopup` and `TestAppScene_SecondPopup`, are much simpler than the menu scene.

The most complex part of each is their `_on_enter` function, that sets up the popup. eg. `test_app_scene_on_enter_popup_one` resets the popup, and adds several pieces of content (the context, header, icon, and text), before finally instructing the view dispatcher to switch to the popup view, with a call to: `view_dispatcher_switch_to_view`

```c
popup_reset(app->popup);
view_set_context(popup_get_view(app->popup), app);
popup_set_context(app->popup, app);
popup_set_header(app->popup, "Popup One", 64, 10, AlignCenter, AlignTop);
popup_set_icon(app->popup, 10, 10, &I_cvc_36x36);
popup_set_text(app->popup, "One! One popup. Ah ah ah...", 64, 20, AlignLeft, AlignTop);
view_dispatcher_switch_to_view(app->view_dispatcher, TestAppView_Popup);
```

Neither popup scene handles any events - just returning `false` in their `_on_event` functions and leaving it to the scene manager to do the right thing.

_NB. Popups can ordinarily handle use inputs, often giving users a choice between a couple of options. This tutorial does not, for the sake of simplicity._

Finally, each popup's `_on_exit` function simply clears away the content, with another call to `popup_reset`.

## Graphics

In a few places, the code refers to `Icon` pointers, prefixed with `I_`. These are created automatically by `ufbt` during the build process, from resources found in the `images/` directory.

There are a few images in the directory:

* `cvc_36x36.png` (a tiny image of Count von Count), which becomes `I_cvc_36x46`
* `one.png` (a 10x10 icon representing 1 in roman numerals as 'i'), becomes `I_one`
* `two.png` (a 10x10 icon representing 2 in roman numerals as 'ii'), becomes `I_two`

Adding more 1-bit png files to this directory will result in their being compiled into the app and available to the code as `Icon` resources.

## Build and deploy

If you haven't already, get a copy of the code from:

* [instantiator/flipper-zero-tutorial-app](https://github.com/instantiator/flipper-zero-tutorial-app)

Now, you can build the application:

```bash
$ ufbt
scons: Entering directory `/Users/lewiswestbury/.ufbt/current/scripts/ufbt'
        CC      /Users/lewiswestbury/src/personal/test_app/test_app.c
        CDB     /Users/lewiswestbury/src/personal/test_app/.vscode/compile_commands.json
        LINK    /Users/lewiswestbury/.ufbt/build/test_app_d.elf
        INSTALL /Users/lewiswestbury/src/personal/test_app/dist/debug/test_app_d.elf
        APPMETA /Users/lewiswestbury/.ufbt/build/test_app.fap
        FAP     /Users/lewiswestbury/.ufbt/build/test_app.fap
        INSTALL /Users/lewiswestbury/src/personal/test_app/dist/test_app.fap
        APPCHK  /Users/lewiswestbury/.ufbt/build/test_app.fap
                Target: 7, API: 26.0
```

Provided `ufbt` and your Flipper agree on the firmware version, you can deploy it to your Flipper to try it out:

```bash
$ ufbt launch
scons: Entering directory `/Users/lewiswestbury/.ufbt/current/scripts/ufbt'
python3 "/Users/lewiswestbury/.ufbt/current/scripts/runfap.py" -s /Users/lewiswestbury/.ufbt/build/test_app.fap -t /ext/apps/Examples/test_app.fap
        APPCHK  /Users/lewiswestbury/.ufbt/build/test_app.fap
                Target: 7, API: 26.0
2023-05-06 23:38:36,824 [INFO] Using flip_Akurisau on /dev/cu.usbmodemflip_Akurisau1
2023-05-06 23:38:36,877 [INFO] Installing "/Users/lewiswestbury/.ufbt/build/test_app.fap" to /ext/apps/Examples/test_app.fap
2023-05-06 23:38:36,916 [INFO] Sending "/Users/lewiswestbury/.ufbt/build/test_app.fap" to "/ext/apps/Examples/test_app.fap"
100%, chunk 1 of 1
2023-05-06 23:38:37,108 [INFO] Launching app: "Applications" /ext/apps/Examples/test_app.fap
```

{{< youtube Lkau7hTrkLE >}}

## Putting it all together

This walk-through has hopefully covered everything required to initiate and launch a simple UI for a Flipper Zero app.

**The code for this tutorial is available at: [instantiator/flipper-zero-tutorial-app](https://github.com/instantiator/flipper-zero-tutorial-app)**

Feel free to plunder it for your own app. I highly recommend reading it through, and then taking a look at some other tutorials too to ensure you get a fully rounded view of the patterns for UI development on the Flipper.

In the next part, we'll cover options for publishing your app.
