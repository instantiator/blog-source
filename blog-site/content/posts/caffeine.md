---
title: "Keeping jobs alive with caffeine"
date: 2021-01-02T19:00:00Z
draft: false
tags: ["linux", "os x", "tool"]
categories: ["tools"]
---

My Mac likes to go to sleep to save power, and that means any long-running processes
I have underway will be suspended when it does.

Until recently, I had assumed my best option was to change the power settings.
For tasks I want to keep alive, there's a better option - called `caffeinate`, available on OS X and Linux.

Just like `time` (a tool to tell you how long a task took to run), you can prefix a command
with `caffeinate`. Its job is to keep the computer awake until the command exits.

eg.

```bash
caffeinate ./my-long-running-script.sh
caffeinate python ./my-long-running-script.py
caffeinate docker run <image>
```

It's really that simple.

Take a look at the manual pages for it on your system to see what other
options there are: `man caffeine`
