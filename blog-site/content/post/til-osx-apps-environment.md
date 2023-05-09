---
title: "TIL - shell environment variables aren't available to OS X apps"
date: 2021-11-12T00:00:00Z
tags: ["TIL", "OS X", "environment", "shell", "applications"]
categories: ["tutorial"]
images: [ "/TIL/shellexecute-docs.jpeg" ]
thumbnail: "/TIL/shellexecute-docs.jpeg"
---

_Just recently I have been exploring a very strange issue: My application couldn't find a tool that was right where it should be..._

I'm building a C# project that relies on a library called [FFMpegCore](https://github.com/rosenbjerg/FFMpegCore). In turn, FFMpegCore relies on [ffmpeg](https://www.ffmpeg.org/) - a complete, cross-platform solution to record, convert and stream audio and video.

I discovered, though, that when testing my code in Visual Studio I had to provide the full path to `ffmpeg` - even though the documentation and examples suggested that wasn't necessary.

I dug into the code of FFMpegCore to see how it was trying to launch and use `ffmpeg`. It creates a process, providing parameters with `ProcessStartInfo` - and it explicitly sets the `UseShellExecute` option to `false`.

The documentation for [UseShellExecute](https://docs.microsoft.com/en-us/dotnet/api/system.diagnostics.processstartinfo.useshellexecute?view=net-5.0) states that:

> When `UseShellExecute` is `false`, the `FileName` property can be either a fully qualified path to the executable, or a simple executable name that the system will attempt to find within folders specified by the `PATH` environment variable.

This suggests that if `ffmpeg` is on the `PATH`, the application should be able to find it - but this wasn't happening. I checked my `PATH` and it clearly contained the location where [Homebrew](https://brew.sh/) had installed `ffmpeg`.

This was made more complicated by the fact that other tools, such as `docker`, were reliably found.

What was going on?

## Testing some theories

I created a solution where I could test out a variety of different scenarios.

* [instantiator/process-start-info-testing](https://github.com/instantiator/process-start-info-testing) (GitHub repository)

I tried setting `UseShellExecute` to both `true` and `false` - and tested with `ffmpeg` and `docker` (the control - known to work). Here's what I saw:

![Tests show that with UseShellExecute false, ffmpeg cannot be found](/TIL/test-run-results.png)

When `UseShellExecute` was set to `false`, `ffmpeg` could not be found - and the test fails.

Interestingly with `UseShellExecute` set to `true`, `ffmpeg` _was_ found - however, this actually leads to the risk of unwanted behaviour, as with `UseShellExecute` enabled, the process could easily launch a document or folder in the GUI with the same name as the preferred binary tool.

## The answer

In the end, the answer should have been obvious from the start, as described in [this thread](https://developercommunity.visualstudio.com/t/Xamarin-Visual-Studio-for-Mac-override/374888#T-ND376446):

> Mac GUI applications do not inherit environment variables defined in your shell profile.

Visual Studio didn't know about my `PATH` and nor did the tests it launched.

However, when launching the tests from the shell, using the `dotnet` CLI, they worked perfectly - as the process could now find `ffmpeg` in the `PATH`:

```shell
dotnet test
```

It is also possible to launch Visual Studio from the terminal, using the `open` command - so giving it visibility of your shell's `PATH`:

```shell
open -n /Applications/Visual\ Studio.app
```

{{< tweet 1457683593074028546 >}}
