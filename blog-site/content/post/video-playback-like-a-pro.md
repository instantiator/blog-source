---
title: "Manage rich video experiences in your webapp like a pro"
date: 2026-04-21T19:00:00Z
Tags: [ "video", "audio", "html5", "howto", "technical", "synchronise", "timing", "browser", "permissions", "deliberation", "cci", "collective-intelligence","ci","zeitgeist","zg" ]
Categories: [ "tutorial" ]
thumbnail: "/cci/play-button.png"
images: [ "/cci/play-button.png", "/cci/zg-card.jpeg" ]
#Series: [ "like a pro" ]
---

_Browsers rule with an iron fist when it comes to the things your web app is allowed to do, and video playback is a complex topic. This post breaks down some advanced solutions for developers implementing embedded video._

# Managing rich video experiences in your web app like a pro

Developing web apps with embedded video content means you can offer your users a rich experience, and HTML5’s `<video>` element offers a lot of capabilities that used to be very difficult to implement.

There are still some aspects that are complex for developers, though - particularly in cases where video playback must be triggered by a remote event, or automatically played, rather than in response to a user’s click:

* How to understand if the browser will permit the video to play
* How to work within those constraints to get permission to play video
* How to minimise the risk that video will buffer during playback
* How to manage resources when you have a lot of videos to play
* How to synchronise video playback across multiple devices

At Nesta’s [Centre for Collective Intelligence](https://www.nesta.org.uk/project/centre-collective-intelligence/), we needed to address all of these problems as we built [Zeitgeist](https://zg-app.com), our application to deliver [deliberative workshops](https://instantiator.dev/post/cci-zg-deliberation-at-scale/) at scale. The stimuli for these workshops (often in the form of videos) is a core part of the user experience, and a key reason why our workshops are reported so enjoyable by participants.

[![Zeitgeist - scalable public deliberation, data-driven insights, and more engaging public participation](/cci/zg-card.jpeg "A small poster for Zeitgeist - a digital product that delivers scalable public engagements")](https://zg-app.com)

It’s important to get video implementation right, and there are a surprising number of pitfalls.

For most use cases, a good video component for your chosen framework is the best option but, even then, awareness of the issues will help you debug and problem solve differences in experience between your users.

You may have custom needs, a design that doesn’t fit any existing video playback component, or playback issues on specific devices. This is a technical post with advice to help you to understand what’s going on, and how you can best craft a good experience for your users…

## Playing video programmatically

Here’s a simple rule to get started: If your video is silent or muted, you can autoplay a video or initiate play programmatically without any extra steps. If your video has an audio track, most browsers require a user gesture for this.

### Concepts

Browsers each manage video playback permission with their own variant on some common rules. There are some common concepts shared between them.

#### Activation and user gestures

There are two key ways that some restricted APIs are activated by browsers.

* [**Sticky activation**](https://developer.mozilla.org/en-US/docs/Glossary/Sticky_activation)**.** After sticky activation, a restricted API is enabled, and remains enabled for the duration of the user’s session on your page.  
* [**Transient activation**](https://developer.mozilla.org/en-US/docs/Glossary/Transient_activation)**.** This is available only for a short time after activation (eg. a second or so after the user clicks on your page, or performs another gesture).

#### Autoplay

Autoplay, or programmatic play, of **videos with sound** is governed by **sticky activation**.

The autoplay policy of the browser governs both the **`autoplay`** property of a video, and any attempts to play it by invoking the **`play()`** function on the element programmatically.

Each browser has its own definition of user gestures, activation requirements, and the transient window of opportunity…

| Policy | Autoplay policy |
|-|-|
| **All browsers** | **Autoplay is permitted if** the video is muted |
| **[MDN general autoplay description](https://developer.mozilla.org/en-US/docs/Web/Media/Guides/Autoplay#autoplay_availability)** | **Autoplay is likely to be permitted if** the audio is muted or volume is set to `0` the user has interacted with the site the site has been allowlisted the autoplay permissions policy has been granted by an `<iframe>` |
| [**Chrome autoplay policy**](https://developer.chrome.com/blog/autoplay) | **Autoplay is permitted if** the user has installed this app as a PWA, or the user has interacted with the domain (eg. clicked on the page), or the user has crossed the Media Engagement Index (MEI) threshold **The MEI threshold is crossed if** the user has previously played more than 7s of audio or video with sound on the domain, and the tab with the video is active, and the video element itself is rendered at larger than 200x140px |
| [**Delivering video content for Safari**](https://developer.apple.com/documentation/webkit/delivering-video-content-for-safari) | **Autoplay is permitted if** the video element has the `playsinline` attribute (iOS) the video element itself has played video with sound before the site itself has been allow-listed by browser settings |
|  |  |

### Testing for autoplay

There’s no guarantee that playback will succeed. The best advice seems to be, when programmatically playing video, to catch any errors thrown. If the **`play`** function throws, your code should fail gracefully.

```ts
const promise = videoRef.current.play();
if (promise !== undefined) {
  promise.catch(error => {
    // Playback has started
  }).then(() => {
    // Playback has failed
  });
}
```

or, asynchronously:

```ts
try {
  await videoRef.current.play();
  // Playback has started
} catch (err: any) {
  // Playback has failed
}
```

### Getting sticky permissions

Our application needs to play video at certain times, and governed by its own events. It’s sensitive to timing, and so when video is required to play, we need to maximise the likelihood that the browser will permit this.

As browsers are fickle and grant permissions according to their own policies, it’s possible that the user may not have the sticky permission at time of playback. We take some steps to improve the odds…

Prior to video playback, we initiate a short test of the play function. We initiate a very short play and pause cycle. If the video does not play, then we know additional permissions are required.

```ts
const testPlayback = useCallback((): Promise<void> => {
  try {
    await myVideoElement.play();
    // Playback has succeeded
  } catch {
    // Playback has failed
    getStickyActivation();
  } finally {
    myVideoElement.pause();
  }
}, []);
```

To obtain that sticky activation, we ask the user to click a button to indicate they wish video to play when the time is right. We then *repeat* the play/pause test off the back of their click. As we are in the short window of opportunity right after the user’s click, a transient activation makes the playback function available. The playback itself should then be sufficient for a sticky activation.

```ts
const getStickyActivation = useCallback(() => {
  // Show a dialog with a button, asking the user if they wish to permit video playback.
  // The 'allow' button calls testPlayback() again.
  // The 'deny' button fails gracefully.
}, []);
```

NB. This is a simple pseudocode example, and there are some further considerations…

#### Caveats

Some older browsers have been reported to return the **`play`** function as **`undefined`** until activated. This feels like a simple workaround to limit access to certain APIs until permissions are available. Be aware of it\! The code above would fail in this circumstance \- and may need an additional check to ensure that **`myVideoElement.play !== undefined`** \- and should immediately move to **`getStickyActivation()`** if that’s the case.

```ts
try {
  if (videoRef.current?.play === undefined) {
    throw new Error("play function not available");
  }
  await videoRef.current.play();
  // Playback has started
} catch (err: any) {
  // Playback has failed
}
```

It’s possible that, despite the user interaction, playback could still be denied by the browser. If this happens, the above example would show the user a seemingly endless set of dialogs, until they choose the deny option. It’s a good idea to fail gracefully, let the user know what’s happened, and have a fallback option…

#### Fallback

A graceful solution might be to revert to silent video (ie. apply the `muted` attribute to the video element) if the sticky activation does not succeed after the second attempt. This would guarantee that playback succeeds, as all browsers support autoplay for muted videos (or videos with no audio track).

In our case, our videos all feature subtitles, meaning that silent playback is an option (acceptable, if undesirable for most users).

## Caching and resource management

Users don’t enjoy interrupted video. Especially when working with time sensitive video playback, you’ll likely want to know when the video is ready to play.

### Preload

Video elements don’t automatically load by default, but you can ask them to with the `preload` attribute on the **`<video>`** element.

NB. **`preload`** is just a browser hint, not a guarantee. However, it seems to be widely observed.

* Use **`preload=”auto”`** to hint that video content should be loaded immediately   
* Use **`preload=”metadata”`** to hint that video metadata should be loaded immediately  
* Use **`preload=”none”`** if the video does not need to be loaded immediately

### Video readiness events

The **`<video>`** element emits a number of different [events](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/video#events), and these can be used to gauge the state of readiness for playback:

* **`canplay`** indicates that the video will be able to play (although it may not be fully loaded)  
* **`canplaythrough`** indicates that the browser *estimates* that it will be able to play to the end of the video without stopping to buffer (although this isn’t a guarantee\!)

This example illustrates a simple approach to safely subscribe to the **`canplaythrough`** event in a React application component, registering a callback function as the recipient (and updating this registration when the callback function updates):

```ts
const onReadyToPlay = useCallback(() => {
  // Video is ready to play, update the system and the UI
], []);

useEffect(() => {
  videoRef.current.addEventListener("canplaythrough", onReadyToPlay);
  return () => {
    videoRef.current.removeEventListener("canplaythrough");
  };
}, [onReadyToPlay]);
```

There are also a number of useful events available from the **`<video>`** element itself to help monitor playback, including **`ended`**, **`pause`**, **`play`**, **`playing`**, and **`progress`**.

### Unload video

Cached video takes up valuable memory and, on devices with limited resources, can interfere with performance. Our experimentation with modest tablet devices showed that after pre-loading several videos, subsequent video content *failed* to load \- and it’s likely the browser was protecting the remaining resources it had.

Space and resources can be cleared by unloading videos after they are no longer required. Unloading isn’t trivial. The best approach seems to be to remove any `src` information, and then instruct the element to reload.

```ts
videoRef.current.pause();
videoRef.current.removeAttribute('src'); // empty source
videoRef.current.videoElement.load();
```

## Synchronising video playback

Our application has a strong requirement for well-synchronized video playback. We may have multiple clients, and each must play back their video at the same time. When those clients are not in the same room, we can tolerate a degree of variation in playback time (perhaps up to a second or so).

When they are in the same room, though, it becomes more important. Our application client mute playback on most devices, and a single client becomes responsible for the audio track.

Users, as we instinctively recognise, are very sensitive to the synchronisation of video and audio, particularly when lip-sync is visible on screen. Differences of only a couple of hundred milliseconds look wrong, and greater differences can cause feelings of disassociation or difficulty focusing on content. We noted that for videos where lip-sync failures are clear to our users, they started to look away from the screen in order to be able to listen to the speech.

**Getting this right requires careful synchronisation\!**

In a native application, this would be trivial: Using a shared NTP service, all clients can agree a shared *server time* (and so recognise the delta between their own clock and server time).

Of course, it’s possible to synchronise the operating system clocks between devices, using NTP, and if that’s an option for you I suggest you take it. We do not have control of all our users' devices, so we needed an alternative.

Our application runs in client web browsers, and for better or worse (it’s worse\!) NTP is unavailable in that environment because it relies on the inspection of UDP packets. Web browsers are built on TCP and don’t make UDP communication available.

### The basics

Because our client interactions are moderated by a server, we are able to initiate playback at *approximately* the same time by issuing WebSocket messages to all clients in a session. This isn’t close enough, but it makes a good start to build on. 

So how can we improve on it?

### Getting server time

It’s important to note that we don’t actually need the *correct* time. The video playback clients need a shared time that they can use to control playback.

The [HTTP `Date` header](https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Headers/Date) is a simple way to review the current time on any server, and included in every response from all our endpoints, but it’s not sufficient: It is only accurate to a single second, and that’s not sufficient.

A better solution involves a simple endpoint that can respond with the full server time \- including the milliseconds on the clock. This is accurate enough that (caveats below) it could be used to play back video sufficiently synchronised for a good user experience.

### Code: Server time endpoint

We implemented this as a lambda function, written in Typescript and running on the NodeJS runtime, served through API Gateway. Acknowledging caveats, again, it has been sufficient for our needs.

```ts
import { APIGatewayProxyHandler, APIGatewayProxyResult } from "aws-lambda";

const { WEBAPP_BASE_URL } = process.env;

const ALL_HEADERS = {
  "Access-Control-Allow-Origin": `${WEBAPP_BASE_URL}`,
  "Access-Control-Allow-Methods": "OPTIONS,GET",
};

export const handler: APIGatewayProxyHandler = async (_event: any, _context: any): Promise<APIGatewayProxyResult> => {
  const info = { timestamp: Date.now() };
  const response: APIGatewayProxyResult = { 
    statusCode: 200, 
    body: JSON.stringify(info), 
    headers: ALL_HEADERS 
  };
  return response;
};
```

### Caveat: Cold-starts

Lambda functions (even on the NodeJS runtime) do experience cold starts. For some runtimes, this can create a delay of several seconds. The NodeJS / Typescript experience is much better than that, and these delays are well below a second.

However, to avoid this risk, each client reaches out to the endpoint more than once \- so reducing the likelihood it will encounter a cold start.

### Caveat: Round-trip time

Round-trip times can also impact the accuracy of this solution. When the server’s lambda creates a timestamp for the response, that is at the moment it has received the request. Clients won’t receive that immediately, as there’s the return journey for the response to consider.

This makes it difficult to know with certainty how long it has taken between the timestamp being written to the response, and the moment it is received on the client.

Assuming that the outgoing and returning routes are the same for packets, and that there aren’t significant changes in internet traffic during the request, clients can estimate when the timestamp was written by placing it half-way between the moment the request was sent, and the moment the response was received. Provided the request / response cycle is short enough, this is adequate for our purposes.

We further improve on this by making the request several times \- and making use of the answer from the shortest request duration.

### The full process

1. Request server time several times to allow for cold-starts and variation in the round-trip duration  
2. Record the start and end time of each round-trip request  
3. Take the timestamp from the shortest round-trip, and place it half-way between request and response time on the client

We do this while the user initially loads the application, and it meets our needs. Each client can then use the timestamp from the server to calculate a delta between their own clock’s time, and server time.

### Code: Server time calculation

This client code illustrates how you might manage the process inside a provider \- which can make **`toServerTime`** and **`fromServerTime`** functions available to the rest of your application.

```ts
/** A delay between attempts to retrieve the server time. */
const PERIOD_ms = 1000;

/** 
 * A function that calculates the best server time delta over several attempts.
 * NB. getServerTime is not implemented in this illustrative example.
 */
const getServerTimeDelta = async (): Promise<number> => {
  let bestRoundTripTime_ms: number | undefined = undefined;
  let bestDelta_ms: number | undefined = undefined;

  // Makes 4 attempts to retrieve the server time
  for (let i = 0; i < 4; i++) {
    // introduce a short delay between attempts
    if (i > 0) {
      await new Promise((resolve) => setTimeout(resolve, PERIOD_ms));
    }

    // retrieve the server time
    const sent = Date.now();
    const response = await getServerTime());
    const received = Date.now();

    // if this is a shortest roundtrip, calculate the delta
    const roundTripTime_ms = received - sent;
    if (bestRoundTripTime_ms === undefined || roundTripTime_ms < bestRoundTripTime_ms) {
      const midMoment_localTime_ms = (sent + received) / 2;
      const delta_ms = response.timestamp - midMoment_localTime_ms;
      bestRoundTripTime_ms = roundTripTime_ms;
      bestDelta_ms = delta_ms;
    }
  }

  // bestDelta_ms is the delta between local and server time
  return bestDelta_ms; 
}

interface ServerTimeContextData {
  toServerTime: (localTime: number) => number;
  fromServerTime: (serverTime: number) => number;
}

/** A context that provides toServerTime and fromServerTime */
export const ServerTimeContext = createContext<ServerTimeContextData>(undefined!);

/** A simple hook to access toServerTime and fromServerTime */
export const useServerTime = () => {
  const context = useContext(ServerTimeContext);
  if (context === undefined) { 
    throw new Error("useServerTime must be called from within a ServerTimeProvider"); 
  }
  return context;
};

/** Responsible for calculating a delta between local and server time. */
export default const ServerTimeProvider = ({ children }: { children: ReactNode }) => {
  // store the delta between local and server time
  const [bestDelta, setBestDelta] = useState<number | undefined>(undefined);

  // Inititalise server time data once when this provider is rendered
  useEffect(() => {
    const init = async () => {
      setBestDelta(await getServerTimeDelta());
    };

    init();
  }, []);

  /** Calculates server time from local time */
  const toServerTime = useCallback((localTime: number) => { 
    return localTime + bestDelta; 
  }, [bestDelta]);

  /** Calculates local time from server time */
  const fromServerTime = useCallback((serverTime: number) => { 
    return serverTime - bestDelta; 
  }, [bestDelta]);

  return (<>
    {bestDelta !== undefined &&
      <ServerTimeContext.Provider value={{toServerTime, fromServerTime}}>
        {children}
      </ServerTimeContext.Provider>}
  </>);
};
```

### Agreed playback time

Finally, playback events can be scheduled by the server and distributed to clients by web socket connection. These are often scheduled a second or two in the future to allow all clients an opportunity to receive the “initiate playback” event before playback should begin.

Each client then uses its **`fromServerTime`** function to calculate when the playback should begin according to the time included in the event. It then delays playback until that moment to ensure that it begins at the prescribed time.

In situations where the start has already been missed (perhaps because the client did not receive the web socket message until after the scheduled start time), the client may also need to modify the start position within the video to account for missed time.

### Caveat: final calculations

The **`<video>`** element’s **`play`** function returns a promise, and that promise *should* resolve when playback has begun. This is not guaranteed to take a known amount of time, and so although playback is initiated at the right time (per the processes outlined above) there may still need to be a final adjustment after playback has actually begun.

On return from playback, a comparison can be made between the current time and the expected start time. This can then be added to the current video’s playback position to adjust for the time spent starting playback.

### Code: Video playback

This code is illustrative of a client video component, and is heavily simplified. For instance, there’s no error handling for cases where playback does not begin…

```ts
executePlaybackRequest = async (request: PlaybackRequest): Promise<void> => {
  // calculate the requested start time for the local clock, and delay until then
  const localStartTime = toLocalTime(request.serverStartTime);
  const delay = Math.max(localStartTime - Date.now(), 0);

  // offset the start position of the video if required
  const startPositionOffset = Math.abs(Math.min(localStartTime - Date.now(), 0));
  videoRef.current.position = startPositionOffset;

  // wait until the start time and play the video
  await new Promise((resolve) => setTimeout(resolve, delay));
  const startPlay = Date.now();
  await videoRef.current.play();

  // skip forward the time spent starting the video playback
  const startingDuration = Date.now() - startPlay;
  videoRef.current.position += startingDuration;
};
```

## In summary

Thanks so much for reading to the end\! I hope this post has been helpful to you. With a little effort, you can build some great user experiences with the **`<video>`** element.

At Nesta’s [Centre for Collective Intelligence](https://www.nesta.org.uk/project/centre-collective-intelligence/), we have used these techniques to develop [Zeitgeist](https://zg-app.com), an application to deliver deliberative workshops at scale. We’ve worked hard to elevate the user experience, and in doing so it seems right to share back what we’ve learned.

If you’d like to learn more about how deliberative workshops can help you get to the heart of what matters most, reach out to us at: [collective.intelligence@nesta.org.uk](mailto:collective.intelligence@nesta.org.uk) 