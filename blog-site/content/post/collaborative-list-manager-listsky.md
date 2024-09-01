---
title: "Managing lists on BlueSky collaboratively"
date: 2024-09-01T12:00:00Z
tags: [ "List", "ListSky", "Communities", "Collaborative", "Collective Intelligence", "Data", "People", "Organise", "Open", "CI", ".NET", "Repository", "GitHub", "App", "Tool", "Actions", "GHA" ]
images: [ "/listsky-img/listsky-poster-1.png", "/listsky-img/listsky-poster-2.png" ]
thumbnail: "/listsky-img/listsky-poster-1.png"
categories: [ "article", "tool" ]
---

_ListSky is a new tool for collaboratively managing lists of social accounts._

# ListSky

ListSky is a tool that lives on GitHub and manages lists of social media accounts. It published them itself as web pages, and it manages lists on BlueSky. See:

* [ListSky](https://instantiator.dev/listsky) (web pages)
* [ListSky](https://bsky.app/profile/listsky.bsky.social) (BlueSky account)

It works primarily with BlueSky lists, although there's no reason it couldn't extend into the rest of the social sphere (as and when there's time to build again).

## What lists?

You can see all the lists that ListSky currently manages at: https://instantiator.dev/listsky, or visit [ListSky](https://bsky.app/profile/listsky.bsky.social) on BlueSky to see and follow all the lists.

I'm currently using it to seed a list of accounts working in Collective Intelligence - that's researchers, practitioners, organisations, communities and bots that have anything to do with CI or CI projects. I'm excited to grow that list!

| An overview of lists | Collective Intelligentsia |
|-|-|
| ![](/listsky-img/01-overview.png) | ![](/listsky-img/02-ci-list.png) |

## How is it collective?

Anyone can submit an addition or update to a list by creating an issue on GitHub or, if you want to flex your skills, by creating a pull request. That gets reviewed by the list owner. If it's approved, ListSky automatically updates its public lists and the BlueSky lists it maintains.

## How does it work?

If you have a GitHub account, you can create your own collaborative list manager.

All the work is done in GitHub Actions - so you don't need server space, deployments, or complex CI/CD to operate ListSky. The app detects changes to the `main` branch, and reflects those changes in the lists it manages.

## Can I run my own collaborative lists?

You can do that! (And I'd be glad to support you.)

ListSky is open source, and there are instructions for forking and setting up your own instance in the [README](https://github.com/instantiator/listsky/blob/main/README.md).
