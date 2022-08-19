---
title: "Being a better witness"
date: 2019-03-28T00:00:00Z
draft: false
tags: ["policing", "witness", "video", "crime", "phone", "android", "999", "emergency", "civic tech" ]
images: ["/police-rewired/emergency-recorder.png"]
categories: [ "article", "police rewired" ]
---

_A couple of weeks ago I witnessed a stabbing..._

# Being a better witness

**I didn’t know it was a stabbing at the time.** I was walking to the gym when I heard some young men shouting. I could see a few of them in someone’s front garden behind a hedge, pushing and shoving. It sounded brutal. A little girl in school uniform ran past me up the road, and there were a few people from the street nearby, looking on — some of them were on the phone. I called the police and reported what I saw. By the time I’d told them everything I could see, everyone involved had fled down the road.

While I was at the gym I missed a couple of calls from police calling to ask about what I saw, and when I walked back they had put a cordon up around the scene. There was a small amount of blood on the floor. When I told the police officer there what I’d seen, he asked if I saw which way the young man who had been stabbed had run. I couldn’t say. I wasn’t even aware that anyone had been stabbed.

The best descriptions I could give, afterwards, were just details of the clothing that people involved had been wearing, and their skin colour. That’s not enough for a good identification, and human memory fades so quickly that I don’t have confidence I could have recognised them again.

_I remember wishing I’d taken some video that I could share with the police to help them identify the people involved._

**You never know when there’s going to be an emergency.** It’s very difficult to prepare, unless you work for the emergency services and that’s your job. If you’re going to take video, you’ll have to swipe and click your way through the apps on your phone to make it happen. That was too much distraction for me when I made my call, and it could easily prevent others from taking video too. I thought about that, and then I decided I’d do something about it...

_I’ve been coding furiously since then._

I’m Lewis Westbury. I’ve been a volunteer police officer with the Met Police since 2009, and I’m currently on a career break to spend my spare time building [Police Rewired](https://policerewired.org) — a community of voluntary professional developers and designers, working on open source projects in policing and public safety. Here’s what I came up with.

## The Emergency Recorder

{{< figure src="/police-rewired/emergency-recorder.png" alt="The Emergency Recorder" width="400px" class="left-image" >}}

**The Emergency Recorder is an app for Android phones.** When it detects that you’ve made an emergency call, it immediately opens the camera in a bubble that floats over your call, and starts recording. You don’t need to do anything — it takes care of that for you.

When you finish the recording, it adds what it took to your phone gallery and you can choose if you want to share it with anyone or not.

When you call the police to report an emergency, they’ll want to know where you are. Not everybody knows the street they are on all of the time, and it’s really important that if something happens the police can get moving as quickly as possible. The app looks up the closest street address to you, so there’s a starting point. 

## Simple, right?

Almost. I’m looking for volunteers to become a part of the team that delivers this project...

**This project need testers.** I’ve been working with what I have — my own phone. That’s pretty limiting. Android is a diverse ecosystem, and factors like manufacturer’s preferences, Android versions, or camera hardware could come into play and affect the operation of the app.

**This project needs peer coders.** If you’re an Android developer, and you’d like to review the project or add your own flourish to it, we’d love to hear from you!

**This project needs a logo and an icon.** Graphic designers — I know you’re out there! You could do a great job of building the sort of brand that connects with people long before they encounter an emergency situation.

**This project needs copywriting.** I’m a coder, and I know my limitations! Professional copywriters can take a complex idea and make it accessible to everyone. People need to understand just how simple the app is to install and use, and why they’d want to.

**This project needs a website.** People should be able to find out all about the app, and be able to download it quickly and easily without navigating through blog posts or the whole Police Rewired site.

**This project needs a campaign.** If we want people to discover this app and install it speculatively, we’ll need to reach people across all walks of life. Social media savants, this is your time to shine! Join the team to help us figure out how we’ll reach people.

**If you’d like to help with testing, copywriting, building a website, designing a campaign, or adding to the app let us know by filling out this short form: [Police Rewired teams 2021](https://bit.ly/PoliceRewired-teams-2021)**

## Q&A

* **Is it ready?** Mostly. The app works. There’s a little more to do, though — particularly around support for full motion video. This has a dependency on the CameraKit project, currently in beta for version 1.0.0.

* **Can I see the code?** Yes, it’s really important that people can trust this project. All the source code is on GitHub: https://github.com/PoliceRewired/emergency-recorder

* **What’s Police Rewired?** We are a group of volunteer professionals - developers, designers, students, academics, data scientists and creative problem solvers who want to make everybody safer by building new tools. All our projects are open source. You can find out more about us at our site: [policerewired.org](https://policerewired.org)

* **Will there be a version for iPhones?** Sorry, I doubt it. From my limited understanding it’s not possible to overlay an app on top of a call on iOS. There may be other ways to achieve this, though. I’d love to talk it through with an experienced iOS developer.
