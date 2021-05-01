---
title: "Text adventures in 3D"
date: 2013-10-29T00:00:00Z
Tags: [ "Necropost", "inform", "3D", "Frotz", "GLUT" ]
Categories: [ "Necropost", "Article" ]
---

*This is a necropost, resurrected from an old blog.*

# Educational games

It's time to take a look at a project from almost a decade ago! Source code, screenshots, documentation and (old!) binaries are now available in the [instantiator/openbook-v2](https://github.com/instantiator/openbook-v2) GitHub repository.

It was 2005(-ish), I was fresh out of uni and I had my first job. It was a part-time job, so I had the time to dream of setting up a company to write and sell educational games. I was pretty enthused about the power of text adventures to drive up literacy and plenty of other problem-solving skills in kids - but it was clear to everyone who looked at any text adventure game that they were just visually very unappealing!

## OpenBook v1

To that end, I decided I would write a new interpreter, focussed entirely around the UI. Enter OpenBook! I wrote the first iteration in C to prove to myself it was possible.

![Openbook v1](/necro-images/openbook-v1.png)

The results weren't awful, but I knew I wanted to do more with it.

## Inform

Inform is a virtual machine written for interaction fiction that dates back to 1976. Nowadays it has evolved to become [Inform 7](http://inform7.com/) - a very sophisticated tool for creating games in almost natural language.

There are many games available already for Inform and I was excited about ways to take that library and make it fun and easy for kids to play.

There are also plenty of open source interpreters for Inform, and the one I selected is called Dumb Frotz: and it really was simple enough to integrate without too much hassle! (It needed some work to redirect the input and output, and later wrapping up so that it could interact properly with the C++ application, but broadly speaking it was the best candidate for inclusion.)

## Other libraries

The other library I made plenty of use of was GLUT - a freely available and open source graphics library that made it possible to bring the books to life!

I can't remember a lot about the project structure or internals other than that - but it seems I was pretty diligent about commenting my code, so there's plenty of clues as to what everything is for lurking in the source.

## OpenBook v2

As you can imagine, OpenBook v1 reached a level of complexity that meant it was time to rewrite in an object oriented language very quickly. I decided I was going to have to rewrite in C++.

This time I carefully planned, bearing in mind all the things I wanted to improve about the project: adding smooth animations (the book opens onto the first page, and the pages turn as you progress, you can turn back the pages to view your history, open and close the book, and the letters gently fall onto the page), and the possibility of future enhancements and features.

![Openbook v2](/necro-images/openbook-v2.png)

OpenBook v2 was actually nearly a viable product. I was pleased enough with it and still interested by the project (after having spent an age on it) that I could have completed it. And then... I got a [real full time job](https://www.softwire.com/) that was actually able to pay the bills and I let that particular dream slide a bit...

The finished product was going to be a suite that allowed teachers to set homeworks and challenges, that allowed students to record their transcripts for marking, and that gave awards with animations for achievements in the games.

I've released the source for the project, [screenshots](https://github.com/instantiator/openbook-v2/tree/master/docs/screenshots), [documentation](https://github.com/instantiator/openbook-v2/tree/master/docs/tech-docs) and (old!) binaries at the [instantiator/openbook-v2](https://github.com/instantiator/openbook-v2) GitHub repository because I think there's a lot of value, both in evaluating my mental processes at the time with the lens of hindsight, and because you never know it might inspire someone to take the dream to completion! (Actually, I'd recommend starting over if you're going to do it!)

I made some fascinating choices back then, such as the object hierarchy: Book, Line and Page all inherited from a class I decided to call Umbrella! It all made sense at the time I suppose. I left various TODOs for myself (using qq back then), including one that read: "qq: Improve this."

I've also included in the repository a few stories that ought to work on the engine if you succeed in getting it running, including Quake.z5 - a spoof-of-genre text-adventure game of the popular 3D shoot-em-up Quake! Somehow, the idea of playing Quake as a text adventure in 3D appealed to my sense of humour at the time!

If you want to see the project evolve over time, take a look in the [screenshots](https://github.com/instantiator/openbook-v2/tree/master/docs/screenshots) folder - it seems I captured a fresh image at each milestone of development, starting at the point where I'd succeeded in getting Frotz to do anything at all, and taking it all the way to the 3D animated goodness!
