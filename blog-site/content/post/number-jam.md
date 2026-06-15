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

We wanted to share this as a warning to other cat owners.

> **⚠️ Always check the wheel arches before you drive.**

Before posting the video, though, we needed to obscure the number plate...

I asked Gemini to do it. Gemini, fairly enough, pointed out that this would require a subscription. That seemed a lot for one video.

_How hard could it be?_

# Building `number-jam`

I set about building [number-jam](https://github.com/instantiator/number-jam) — a command line tool that detects and obscures number plates in videos.

In its simplest form, you can ask it to detect number plates in a video, and then use it to obscure them:

```bash
npx number-jam detect --input source.mp4 | npx number-jam obscure --input source.mp4 --output output.mp4
```

The tool has two verbs:

- `detect` analyses the video and writes a JSON tracking document
- `obscure` reads that document and renders the obscured output.

Keeping them separate means you can inspect, store, or modify the detection data between steps.

## The challenge

At its core is [OpenALPR](https://github.com/openalpr/openalpr), a well-known ANPR library — though not a well-maintained one.

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

## Learnings

The standards aren't perfect — and that's instructive in itself. If you don't specify something clearly enough, cutting a corner is a perfectly reasonable response for a developer, or an AI. I steadily amended the rules as we worked to try to address this.

A few things stood out:

**Review pressure.** Coding assistants produce a lot of code very quickly, but it also means less time to review each piece. it's easy to get overwhelmed. For a low-risk personal tool, I could lean on tests and documentation when I didn't have the bandwidth. (I don't have the time to become an expert in video processing.) _For production code, you need to slow down if you want your project to be safe and reliable._

**Dependency versions.** Libraries and GitHub Actions tended to come out behind their latest versions — training data has a cutoff. This matters for security. _Enable Dependabot, or make `npm audit` part of your workflow._

**Small tasks review better.** Breaking work into smaller pieces makes it much easier to spot problems. Large tasks produced large changesets, which are hard to reason about. It's much easier to miss something important if you allow things to get out of hand. _I'm sure I missed things._

**Tests aren't always adequate.** The code was surprisingly fragile at times - even with the tests I'd described in the task, and in the coding standards. That means that further changes could break established functionality.

- There were times I had to ask for specific additional tests to cover specific behaviours.
- An AI doesn't always reason carefully about what's *missing* from a test suite.

There are some things that are _hard_ to test automatically. For instance
- several changes regressed the ability to obscure number plates properly, and led to flickery or unreliable output
- the 'obscuring polygons' floated near the edges of the screen as plates entered and exited, and we had quite a bit of work to do to ensure that there weren't gaps in coverage

It was hard to explain what was wrong (although it helped to be able to share screenshots), and I had to do quite a lot of manual testing to establish that things were working.

On the other hand, it was also good to be able to talk the problem through, and the AI had more suggestions than I could have made alone. (I wasn't so sure about snapping polygons to the edge of the frame, but it made the case.)

**Documentation drift.** A literal-minded developer could update one documented instance of something that has changed, without propagating the change to every other place it appears. That's something a human reviewer might catch — but only if they're looking for it.

**It's a bit lonely.** Working in a small team is a more social experience, and leads to fewer omissions. Talking things through is good for the project, and good for me. Being able to go faster is a bit of a double-edged sword, for the reasons I've already mentioned.

**The counter-arguments:** I built more than I could have managed alone, and faster than a small team might have moved.

AI coding assistants seem to be particularly good at _unit testing_ and, whilst that's only a part of a good testing strategy, having a few hundred unit tests under the belt, and built into an automated test suite, is reassuring!

_Overall, I still much prefer working as part of a team._

---

If you need to obscure a number plate in a video, you're welcome to use it - it's free and open source:

* [instantiator/number-jam](https://github.com/instantiator/number-jam)

```bash
npx number-jam --help
```
