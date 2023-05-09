---
title: "Wriggler"
date: 2018-04-23T00:00:00Z
draft: false
tags: ["coding", "qbasic", "game", "wriggler", "1998", "amstrad", "nostalgia", "retro" ]
images: ["/necro-images/qbasic-wriggler-01.png", "/necro-images/qbasic-wriggler-02.png", "/necro-images/qbasic-wriggler-03.png"]
thumbnail: "/necro-images/qbasic-wriggler-01.png"
categories: ["article", "necropost"]
---

*This is a necropost, resurrected from an old blog.*

# Wriggler

It was 1998 and I was 17. My tool of choice was QBasic and this is a game I wrote based on a concept I stole from another game called Wriggler.

The original Wriggler is a race game through a maze of bugs and creepy crawlies, played against the computer. My game would have been a race, had I gotten around to writing the computer player.

Instead it pits you, a plucky young worm (4 lines and a blob), against an army of anatomically incorrect spiders in your mission to see a duck and solve a single puzzle. Also there are some chocolate bars.

{{< figure src="/necro-images/qbasic-wriggler-01.png" alt="Anatomically incorrect spiders!" width="300px" class="inline-image" caption="Anatomically incorrect spiders!" >}}
{{< figure src="/necro-images/qbasic-wriggler-02.png" alt="One whole puzzle!" width="300px" class="inline-image" caption="One whole puzzle!" >}}
{{< figure src="/necro-images/qbasic-wriggler-03.png" alt="A duck!" width="300px" class="inline-image" caption="A duck!" >}}

I fired it up once again to make a playthrough video. The game features some pretty old-school beep/boop sound effects, which really hit me right in the nostalgias!

**Warning, this playthrough video contains spoilers for The Puzzle...**

{{< youtube IMtjw2OJrKs >}}

I don't suppose there's much to be learned from my code, but you can see it all on Github if that's your groove and you're welcome to have a tinker. I had some success running it with [DOSBox](https://www.dosbox.com/).

* [instantiator/wriggler-qbasic](https://github.com/instantiator/wriggler-qbasic)

I seem to have followed a fairly traditional sprite system, using QBasic's built-in GET and PUT to grab and then render sprites. (You can read more about QBasic sprites in Ted Felix's post here.) As a result, there's a loading sequence where all the sprites are individually drawn to the screen before they are grabbed before the game begins...

I remember very little about the actual coding, but it seems like I also wrote some tools to edit the sprites in the game, and to design the rooms in the level. I stopped development roughly around the time I ran out of disk space it seems, and in the last moment of the game you see a teleporter system that I never actually finished. Early mentions of it are commented out in the code, which tells me it wasn't working the last time I showed the game to someone.

It's always fun digging up old projects. I can't believe how far I got with this one!

_I'm hoping I'll be able to find some more amongst the dusty old floppies I've dug up so far..._

You can [find out more about the original Wriggler](https://en.wikipedia.org/wiki/Wriggler_(video_game)) at Wikipedia, and [see it in action in this video](https://www.youtube.com/watch?v=02Kh076wja8).

{{< figure src="/necro-images/amstrad-wriggler-00.png" alt="" width="300px" >}}
