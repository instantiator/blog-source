---
title: "Touch Pairing at Sex Tech Hack 2017"
date: 2017-11-26T13:00:00Z
draft: false
tags: [ "touch", "speech", "contact", "closeness", "intimacy", "sex", "SexTech", "experiment", "pairing", "TouchPairing", "Android", "Nearby", "NearbyAPI", "Java", "OpenSource", "AndroidDev" ]
categories: [ "hack" ]
images: [ "https://github.com/instantiator/touch-pair/blob/master/docs/images/thumbnail-wide.png?raw=true" ]
thumbnail: "https://github.com/instantiator/touch-pair/blob/master/docs/images/thumbnail-wide.png?raw=true"
---

_Touch pairing is an exploration of intimacy and closeness at a distance, from Sex Tech Hack 2017._

# Closeness without contact

In 2017, I wanted to investigate intimacy. In particular, I wanted to explore the idea that perhaps you needn't be in the same room as someone in order to feel their presence.

I developed an app that allows you to pair two Android devices, each with a screen. As you touch your screen, you leave a visible trace on both devices - they effectively share a screen. Similarly, as your partner touches theirs, their motion is communicated between both devices.

I've rustled up the slides from my presentation, which I present to you here... barely tweaked at all!

<div style="position: relative; width: 100%; height: 0; padding-bottom: 60%;">
<iframe src="https://docs.google.com/presentation/d/e/2PACX-1vQ6WWyyAQK2A0zYRuIGV08vqbZNXCCNvZ7h2FKTWlEbGmWwpb4VgB6j33RiXuWx9NCOr5xJVq7FmFCb/embed?start=false&loop=false&delayms=3000" frameborder="0" style="width: 100%; height: 100%; position: absolute; left: 0" allowfullscreen="true" mozallowfullscreen="true" webkitallowfullscreen="true"></iframe><!-- width="960" height="569" -->
</div>

* [Presentation](https://docs.google.com/presentation/d/e/2PACX-1vQ6WWyyAQK2A0zYRuIGV08vqbZNXCCNvZ7h2FKTWlEbGmWwpb4VgB6j33RiXuWx9NCOr5xJVq7FmFCb/pub?start=false&loop=false&delayms=3000) (Google Slides)
* [instantiator/touch-pairing](https://github.com/instantiator/touch-pair) (GitHub repository)

## Tools and tips

_Reflections from 2023_

I worked in Java on Android, and I used the Android Nearby API. Perhaps I shouldn't have. At the time it was a shocking mess of callbacks and handlers, which made it very difficult to keep state! Mind you, the developer experience for Android has improved significantly since then...

I was quite proud to have put the project together in the time available. It was an intense coding experience and, of course, it meant that I missed out on the social aspects of the hackathon - which would have been nice.

I guess I had a bit of a bee in my bonnet about completing the app and having something to show for it. I recall finishing the code in the small hours of the morning, and then going home to find a cardboard box and two phones to test it with (in the dark).

Overall, it was a fun hack and there's nothing quite like working under pressure to learn new skills!
