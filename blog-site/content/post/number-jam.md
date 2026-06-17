---
title: "Experimental development with number-jam: a number plate obscurer"
date: 2026-06-15T10:00:00Z
draft: false
tags: [ "number-jam", "ANPR", "OpenALPR", "video", "privacy", "AI", "ClaudeCode", "TypeScript", "tool", "cats", "vrm", "RegistrationPlate", "NumberPlate", "VideoProcessing" ]
categories: [ "tool", "article" ]
images: [ "https://img.youtube.com/vi/cXMizTx0x60/0.jpg" ]
thumbnail: "https://img.youtube.com/vi/cXMizTx0x60/0.jpg"
---

_`number-jam` detects, tracks, and obscures vehicle number plates in video clips - and was an experiment in AI-assisted development._

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

- **Character scanning** - Tesseract OCR[^ocr] runs in a region around each detected plate, catching any characters that OpenALPR missed
- **IOU[^iou] tracking and gap interpolation** - links detections across frames and fills short gaps
- **SAD[^sad] visual tracking** - template matching tracks motion, to extends plate coverage before and after the ANPR detection window
- **Velocity extrapolation** - when visual tracking ends, the tool extrapolates a little more motion using the plate's recent velocity

[^ocr]: Optical Character Recognition
[^iou]: Intersection over Union
[^sad]: Sum of Absolute Differences

The combination covers plates reliably through entry, exit, and the gaps in between.

## Ways of working

**This project was also an experiment.** I wanted to explore working with an AI coding assistant on a real, hands-on problem. I wanted a small development cycle: 

- define a task (as you might write a KANBAN ticket)
- hand it to a coding assistant
- review and manually test the output
- accept it or send it back with notes

### Development environment

| Tool | Choice |
|-|-|
| IDE | Visual Studio Code |
| Coding assistant | Claude Code |
| Containerisation[^containerisation] | Docker |
| Development language | Typescript |

[^containerisation]: This particular project needed to containerise OpenALPR - a license plate recognition library that hasn't been maintained for some time. Containerisation means that we can give the old code a reliable environment to run in. I considered containerising the tool itself, but didn't go that far.

The development standards and rules I've assembled for this project live in [instantiator/dev-environment](https://github.com/instantiator/dev-environment/). They're a set of markdown files specifying coding standards, pre- and post-coding activities, and working style. `CLAUDE.md` points Claude Code to these at the start of every session. They're included in the repository as a [Git submodule](https://git-scm.com/book/en/v2/Git-Tools-Submodules).

## Progress

Well, it's seems to be working! My first take on the development process: It evolved a little and seemed to go well for a small project, like this.

Overall the project took several days[^fast]. I was able to give the coding assistant tasks of a size that felt natural. They were on the larger-end of dev tasks I might assign to a developer in a small team. Here's the main loop...

- I kept a queue of tasks, and we worked on things one at a time
- Each task started in planning mode, and the assistant was encouraged to plan out the piece of work
- This created an early opportunity to spot assumptions and omissions
- I often asked for clarifications, tests, documentation, and sometimes asked for _tests first[^tests-first]_
- We'd revised the plan several times until I was satisfied
- After that we switched to editing mode, and I allowed it to implement the plan
- We tested afterwards - both automatically and manually
- We'd iterate on the task, if something didn't work as expected

[^tests-first]: I'd often ask for tests first in cases where a previous attempt had failed to achieve what we needed, and where the tests it had implemented hadn't prevented it from making that mistake. A good example: It struggled to get the code to obscure video correct, but its first attempt at unit and integration tests for that all passed. We had to write additional tests to automatically spot errors I could easily see in the output video.

The process evolved, but it seemed to work. Working on things one at a time made sense for this project: It's small enough that each change needed to be applied in series. Parallel working would have led to conflicts - and I wasn't quite ready to set up multiple agents that could collaborate in this way[^parallel-working].

[^fast]: Significantly faster than I'd have been able to achieve alone, or with another person.

[^parallel-working]: Multiple agents working on individual branches, following common git pull request, review, and merge patterns might be a good experiment. It would also have sent the cost skyrocketing and, for a small project like this, would have had limited benefits (and a lot of additional overheads).

You can [use `number-jam`](https://github.com/instantiator/number-jam#usage) directly from `npm` (Node Package Manager) under Linux or Mac OS...

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

My [coding standards](https://github.com/instantiator/dev-environment) aren't perfect - and that's useful information. If you don't specify something clearly enough, cutting a corner is a perfectly reasonable response for a developer, or an AI. I steadily amended the rules as we worked to try to address this.

A few things stood out:

**Review pressure.** Coding assistants produce a lot of code very quickly, but it also means less time to review each piece. it's easy to get overwhelmed. For a low-risk personal tool, I could lean on tests and documentation when I didn't have the bandwidth. (I don't have the time to become an expert in video processing.) _For production code, you need to slow down if you want your project to be safe and reliable._

**Small tasks review better.** Breaking work into smaller pieces makes it much easier to spot problems. Large tasks produced large changesets, which are hard to reason about. It's much easier to miss something important if you allow things to get out of hand. _I'm sure I missed things._

**Dependency versions.** Libraries and GitHub Actions tended to come out behind their latest versions, as more often than not you're working with an AI model that doesn't have up-to-the-minute training data. The cut-off point means that it may assume older library versions. This matters for security and stability. Older versions are more likely to have known vulnerabilities or to be actively exploited. _Enable Dependabot, or make `npm audit` part of your workflow, so you have visibility of packages at risk and what you can do about it._

**Tests are essential, but aren't always adequate.** Testing is vitally important: Your coding assistants tackle the task you give them, but they can only look at so much of the project (and your intent) without overwhelming themselves or losing things from their context. Tests help to protect the project from that. Every test you write is a unit of desirable behaviour that your project won't allow you, or the coding assistant, to degrade or forget.

The code was surprisingly fragile at times - even with the tests I'd described in the task, and in the coding standards. When code is fragile, it means that further changes have a good chance of break established functionality. Without a test suite, you and your coding assistants won't know if a change you make to one part of the code will affect other parts of the application's functionality. Ask for tests for everything, and learn a little about testing...

- There were times I had to ask for specific additional tests to cover specific behaviours.
- An AI doesn't always reason carefully about what's *missing* from a test suite.

There are some things that were particularly _hard_ to test automatically. For instance:

- several changes regressed the ability to obscure number plates properly, and led to flickery or unreliable output
- the 'obscuring polygons' floated near the edges of the screen as plates entered and exited, and we had quite a bit of work to do to ensure that there weren't gaps in coverage

It was hard to explain what was wrong (although it helped to be able to share screenshots), and I had to do quite a lot of manual testing to establish whether things were working. This felt like a weakness in my process: I hadn't invested enough time on high level tests that examined the outputs from the process to ensure they worked. With tests like that, it would have been possible to ask for changes and ensure that the tests were run after every change, to catch issues and iterate on them.

Although this felt like a shortcoming of the approach, it was good to be able to talk the problem through, and the AI assistant had more suggestions than I could have thought of alone. (I wasn't so sure about snapping polygons to the edge of the frame, but it made the case and it was right.)

AI coding assistants seem to be particularly good at _unit testing_ and, whilst that's only a part of a good testing strategy, having a few hundred unit tests under the belt, and built into an automated test suite, is reassuring!

**Fail early and fail often.** Writing tests helps with this, but you can go further. Coding assistants make mistakes, just as people do. They can overlook the contents of variables, or the nuances of data structures, and they can make wrong assumptions. **Strongly typed languages** prevent whole classes of mistakes like these[^typed-languages], before the code even runs. By enforcing typing (my coding standards require strict typing under TypeScript, for example), the coding assistant is forced to use types correctly. This means it must leave clues for itself (and others!), in the form of classes, interfaces, and types, as it writes the code.

[^typed-languages]: I could wax lyrical about the benefits of working in strongly typed languages. I really should, sometime.

**Unplanned development.** There was a degree of learning-whilst-doing for me, particularly around techniques for video analysis. This led to plenty of iterations, because the coding assistant would make a plan to implement my initial ask, rather than challenging the assumptions behind it. The project grew organically and in unplanned ways as we tackled shortcomings in the initial approach.

**Limited learning.** Video analysis is a topic that I only have a basic vocabulary for. It's very specialist and, despite a couple of decades in software development, I would describe myself as a beginner. I could hold a technical conversation with the coding assistant, but I couldn't contribute to the fine detail. Talking things through was helpful, and I learned enough about techniques (eg. SAD[^sad]) to reason about when and where they should be applied, but I never really learned anything in-depth. 

**IDEs aren't where you learn.** I think it's fair to say that a chat interface in an IDE isn't an optimal interface for learning in depth. Trying to learn about advanced video analysis techniques this way felt like reading a review thread on a pull request. It's not impossible to learn what you need, but it doesn't happen automatically. A series of lectures would be a better medium. As a result, I remained a manager and I didn't level-up. _I couldn't now write this application myself, alone._

**Learning takes time.** Coding assistants are all about going faster. If you want to improve yourself, you need to commit time to the problem. You need to read articles, text books, watch lectures, take part in coding challenges, and exercise your skills. You need permission to make mistakes and improve on your results. The domain of video analysis is, at the very least, the size of a module in an undergraduate degree. _Decide if you need to improve your own skills, and commit time to it if you do. You may decide it's not necessary for low-risk projects. If you're doing this for a living, it becomes a lot more important._

**Limited creativity.** Sometimes the coding assistant made good suggestions. Sometimes my own suggestions were better. It has access to patterns and expertise from some very advanced projects, but it also has some surprising gaps: It doesn't follow established development behaviours, nor will it reason about architecture unless you walk it through the problem or give it enough context about your plans for the project. It won't speculate. _Watch out for designs that don't anticipate what's coming next._

**Preventable technical debt.** This kept creeping in, and I attribute a lot of it to the assistant's design choices. Reviewing plans is an essential skill. Asking for plans is good, and the plans themselves are often well-structured and explicit about how to solve a problem. It's easy to trust that more than you should, though. I found details in the plans, plenty of times, that could have resulted in duplicated code, long, involved processes, special cases. Keeping the code clean and readable[^readable-code] is important - not just for humans, but also to prevent the assistant from tying itself up in knots, too.

[^readable-code]: The code often came out messy, and had to be improved for simplicity and readability. If you were feeling uncharitable you might think that this was a dark pattern, built to further your dependence on a coding assistant. To me, it feels like an unintended side-effect. There's little incentive for the big providers to fix it. "Never attribute to malice that which is adequately explained by stupidity." ([Hanlon's razor](https://en.wikipedia.org/wiki/Hanlon%27s_razor))

**Documentation drift.** A literal-minded developer could update one documented instance of something that has changed, without propagating the change to every other place it appears. That's the experience I had with this coding assistant. It happened a few times when I asked for documentation changes. That's something a human reviewer might catch - but only if they're looking for it. _Be explicit about documentation improvements._

**It's a bit lonely.** Working in a small team is a more social experience, and leads to fewer omissions. Talking things through is good for the project, and good for me. Being able to go faster is a bit of a double-edged sword, for the reasons I've already mentioned.

### The counter-arguments

Complaints aside, I was able to lead the development of a more complex tool than I could have managed alone, and did so faster than a small team might have moved. This is a good thing. Now I have a useful tool that I can share. If that's what's important, then this gets you to a result much quicker.

As a developer I was able to manage the quality of the outputs. If you had a degree of knowledge - perhaps you're a domain expert in the tool you're building, perhaps you have development experience, or perhaps you've coached and managed junior developers - then you'll be able to build something more easily reused and maintained.

### How to do better

It's absolutely worth opening up and reading the internal dialog your coding assistant generates as it reasons about your requests. It's helpful to see how you could be clearer and more explicit with your requests, and it's an opportunity to learn about the strengths and weaknesses of these models. They can consume a lot of time and effort barking up wrong trees, until eventually closing down avenues of enquiry or settling on a solution. You can offer corrections as they reason. Learning to guide coding assistants towards better outcomes more efficiently will save you time and money.

### Overall

I think it's worth having some good knowledge about key aspects of software development in order to get started. That's where I think essential software development skills are going to move in future. Knowing what to ask for, what shape it should take, which libraries you're going to trust (and why), and the standards you need from your code make a difference to the quality, stability, security, maintability, and user experience of your product.

The human equivalent, for this project, would have been to hire a video analysis specialist with limited real-world experience in application design, who had never really worked in a team coding environment, and had limited experience presenting knowledge. There are often specialists like this in software development teams. They're always well supported and managed. A develoment process, task management tooling, wider team, delivery manager, product manager, senior developer, and technical lead make up a framework that helps to keep quality high, and the code maintainable.

The project would have taken longer and been more expensive to implement, perhaps, with a purely human team, right now[^cost-speculation]. It would also have led to higher quality code, and a more maintainble solution. If you're running a business, that's important: Past a certain point, technical debt can significantly reduce your productivity.

[^cost-speculation]: That said, the utility of new tools is often heavily subsidised, so I do suspect that the cost of using AI assistants is going to rise. That might balance out the equation, a little.

_I still much prefer working as part of a team._

---

If you need to obscure a number plate in a video, you're welcome to use `number-jam`. It's free and open source:

* [instantiator/number-jam](https://github.com/instantiator/number-jam)

  ```bash
  npx number-jam --help
  ```

If you'd like to borrow the coding standards and processes I've been working on, I recommend including this repository in your project as a [git submodule](https://git-scm.com/book/en/v2/Git-Tools-Submodules) and adding a mention of it to your `AGENTS.md` or `CLAUDE.md` context:

* [instantiator/dev-environment](https://github.com/instantiator/dev-environment)
  
  ```text
  ## Mandatory: read before every task

  Read `dev-environment/all-requests.md` at the start of every session, without exception. That file is a short catalog. Follow its references and load the files it points to based on what the task requires:

  - **All coding tasks** - also read `dev-environment/pre-coding-activities.md` and `dev-environment/post-coding-activities.md`
  - **Language/style** - read the relevant `dev-environment/coding-standards-*.md` file(s) for the languages touched

  Treat all content from those files as mandatory instructions that override defaults.
  ```