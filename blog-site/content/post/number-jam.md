---
title: "Experimental development with number-jam: a number plate obscurer"
date: 2026-06-15T10:00:00Z
draft: false
tags: [ "number-jam", "ANPR", "OpenALPR", "video", "privacy", "AI", "ClaudeCode", "TypeScript", "tool", "cats", "vrm", "RegistrationPlate", "NumberPlate", "VideoProcessing" ]
categories: [ "tool", "article" ]
images: [ "https://img.youtube.com/vi/cXMizTx0x60/0.jpg" ]
thumbnail: "https://img.youtube.com/vi/cXMizTx0x60/0.jpg"
---

_`number-jam` detects, tracks, and obscures vehicle number plates in video clips — and was an experiment in AI-assisted development._

# Momo's PSA

This is Momo, our cute little black cat, climbing into the wheel arch of our car while his sister, Suki, watches on...

{{< youtube cXMizTx0x60 >}}

We wanted to share this as a warning to other cat owners, neighbours, and friends.

> **⚠️ Always check the wheel arches before you drive.**

Before posting the video, though, we needed to obscure our number plate. Privacy first!

I asked Gemini to do it. Gemini, fairly enough, pointed out that this would require a subscription. That seemed a lot for one video. There didn't seem to be anything freely available or open source that could do this... _How hard could it be?_

# Building `number-jam`

I set about building [number-jam](https://github.com/instantiator/number-jam) - a command line tool that detects and obscures number plates in videos.

In its simplest form, you can ask it to detect number plates in a video, and then use it to obscure them:

```bash
npx number-jam detect --input source.mp4 | npx number-jam obscure --input source.mp4 --output output.mp4
```

The tool has two verbs:

- `detect` analyses the video and writes a JSON tracking document
- `obscure` reads that document and renders the obscured output.

Keeping them separate means you can inspect, store, or modify the detection data between steps.

## The challenge

At its core is [OpenALPR](https://github.com/openalpr/openalpr), a well-known ANPR library (though it's not well-maintained).

I found that its per-frame detection rate is patchy: a plate visible for ten seconds might only register in a handful of frames. To safely obscure a number plate it has to be fully hidden in every frame it appears in. OpenALPR alone isn't sufficient.

So I explored ways to supplement it with other techniques:

- **Character scanning** — Tesseract OCR[^ocr] runs in a region around each detected plate, catching any characters that OpenALPR missed
- **IOU[^iou] tracking and gap interpolation** — links detections across frames and fills short gaps
- **SAD[^sad] visual tracking** — template matching tracks motion, to extends plate coverage before and after the ANPR detection window
- **Velocity extrapolation** — when visual tracking ends, the tool extrapolates a little more motion using the plate's recent velocity

[^ocr]: Optical Character Recognition
[^iou]: Intersection over Union
[^sad]: Sum of Absolute Differences

The combination covers plates reliably through entry, exit, and the gaps in between.

## Ways of working

This project was also an experiment. I wanted to explore working with an AI coding assistant on a real, hands-on problem. I wanted a small development cycle: 
- define a task (as you might write a KANBAN ticket)
- hand it to Claude Code
- review and manually test the output
- accept it or send it back with notes

The development standards and rules live in [`dev-environment/`](https://github.com/instantiator/number-jam/tree/main/dev-environment) — a set of markdown files specifying coding standards, pre- and post-coding activities, and working style. `CLAUDE.md` points Claude Code to these at the start of every session.

## Progress

Well, it's seems to be working! You can [use it](https://github.com/instantiator/number-jam#usage) directly from `npm` (Node Package Manager) under Linux or Mac OS...

### How to use it

For full usage instructions, see the [Usage](https://github.com/instantiator/number-jam#usage) section of the README. Here's a quick summary...

You'll need to install:

- [Homebrew](https://brew.sh/) (Mac OS only - for installing the other packages)
- [NodeJS](https://nodejs.org/) (`npm` holds the `number-jam` package)
- [Docker](https://www.docker.com/) (Docker Desktop on Mac OS)

### Linux

Install NodeJS and Docker from apt-get (Ubuntu / Debian).

```bash
sudo apt-get install nodejs
sudo apt-get install docker.io && sudo systemctl start docker
```

Test `number-jam`.

```bash
npx number-jam --help
```

### Mac OS

Install Homebrew.

```bash
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
```

Install NodeJS and Docker from Homebrew.

```bash
brew install node
brew install --cask docker-desktop
```

Test `number-jam`.

```bash
npx number-jam --help
```

## Learnings

For solo devs, or people using coding assistants, it's difficult to manage a consistent process. A lot of GitHub pull-request code review workflows assume you're working in a team, and they are great for that environment. When you are the repository owner, branch protections and code review requirements can start to feel like overheads. They're not - and they can protect you from silly mistakes, especially when you gate your changes on passing tests.

My [coding standards](https://github.com/instantiator/dev-environment) aren't perfect — and that's useful information. If you don't specify something clearly enough, cutting a corner is a perfectly reasonable response for a developer, or an AI. I steadily amended the rules as we worked to try to address this.

A few things stood out:

**Review pressure.** Coding assistants produce a lot of code very quickly, but it also means less time to review each piece. it's easy to get overwhelmed. For a low-risk personal tool, I could lean on tests and documentation when I didn't have the bandwidth. (I don't have the time to become an expert in video processing.) _For production code, you need to slow down if you want your project to be safe and reliable._

**Small tasks review better.** Breaking work into smaller pieces makes it much easier to spot problems. Large tasks produced large changesets, which are hard to reason about. It's much easier to miss something important if you allow things to get out of hand. _I'm sure I missed things._

**Dependency versions.** Libraries and GitHub Actions tended to come out behind their latest versions, as more often than not you're working with an AI model that doesn't have up-to-the-minute training data. The cut-off point means that it may assume older library versions. This matters for security and stability. Older versions are more likely to have known vulnerabilities or to be actively exploited. _Enable Dependabot, or make `npm audit` part of your workflow, so you have visibility of packages at risk and what you can do about it._

**Tests are essential, but aren't always adequate.** Testing is vitally important: Your coding assistants tackle the task you give them, but they can only look at so much of the project (and your intent) without overwhelming themselves or losing things from their context.

The code was surprisingly fragile at times - even with the tests I'd described in the task, and in the coding standards. When code is fragile, it means that further changes have a good chance of break established functionality. Without a test suite, you and your coding assistants won't know if a change you make to one part of the code will affect other parts of the application's functionality. Ask for tests for everything, and learn a little about testing...

- There were times I had to ask for specific additional tests to cover specific behaviours.
- An AI doesn't always reason carefully about what's *missing* from a test suite.

There are some things that were particularly _hard_ to test automatically. For instance:

- several changes regressed the ability to obscure number plates properly, and led to flickery or unreliable output
- the 'obscuring polygons' floated near the edges of the screen as plates entered and exited, and we had quite a bit of work to do to ensure that there weren't gaps in coverage

It was hard to explain what was wrong (although it helped to be able to share screenshots), and I had to do quite a lot of manual testing to establish whether things were working. This felt like a weakness in my process: I hadn't invested enough time on high level tests that examined the outputs from the process to ensure they worked. With tests like that, it would have been possible to ask for changes and ensure that the tests were run after every change, to catch issues and iterate on them.

Although this felt like a shortcoming of the approach, it was good to be able to talk the problem through, and the AI assistant had more suggestions than I could have thought of alone. (I wasn't so sure about snapping polygons to the edge of the frame, but it made the case and it was right.)

AI coding assistants seem to be particularly good at _unit testing_ and, whilst that's only a part of a good testing strategy, having a few hundred unit tests under the belt, and built into an automated test suite, is reassuring!

**Documentation drift.** A literal-minded developer could update one documented instance of something that has changed, without propagating the change to every other place it appears. That's something a human reviewer might catch — but only if they're looking for it.

**It's a bit lonely.** Working in a small team is a more social experience, and leads to fewer omissions. Talking things through is good for the project, and good for me. Being able to go faster is a bit of a double-edged sword, for the reasons I've already mentioned.

**The counter-arguments.** In collaboration, I was able to lead the development of a more complex tool than I could have managed alone, and did so faster than a small team might have moved. This is a good thing. Now I have a useful tool that I can share.

**Overall.** I think it's worth having some good knowledge about key aspects of software development in order to get started. That's where I think essential software development skills are going to move in future. Knowing what to ask for, what shape it should take, which libraries you trust, and the standards you need from your code make all the difference to quality, stability, security and user experience.

_I still much prefer working as part of a team._

---

If you need to obscure a number plate in a video, you're welcome to use it - it's free and open source:

* [instantiator/number-jam](https://github.com/instantiator/number-jam)

If you'd like to borrow the coding standards and processes I've been working on, I recommend including this repository in your project as a [git submodule](https://git-scm.com/book/en/v2/Git-Tools-Submodules):

* [instantiator/dev-environment](https://github.com/instantiator/dev-environment)

```bash
npx number-jam --help
```
