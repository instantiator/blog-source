---
title: "A friendly face for the victims of burglary"
date: 2019-02-23T00:00:00Z
draft: false
tags: ["policing", "burglary", "crime", "reporting", "bot", "technology", "c#", "developer", "project", "Police Rewired" ]
images: ["/police-rewired/friendly-police-bot.png"]
thumbnail: "/police-rewired/friendly-police-bot.png"
categories: ["article", "police rewired"]
---

*This is a necropost, resurrected from an old blog. To find out more about Hack the Police events, civic tech, and policing technology, visit: [Police Rewired](https://policerewired.org)*

# A friendly face for victims of burglary

![Here to help!](/police-rewired/here-to-help-bot.png)

From Oct 2016 to Sep 2017, there were [664,000 burglaries](https://www.ons.gov.uk/peoplepopulationandcommunity/crimeandjustice/bulletins/crimeinenglandandwales/yearendingseptember2017#overview-of-crime) in the UK. Burglary affects [2 out of every 100 households](https://www.ons.gov.uk/peoplepopulationandcommunity/crimeandjustice/articles/overviewofburglaryandotherhouseholdtheft/englandandwales), and it can be devastating for the victims.

Police are doing everything they can, but don’t have the resources to get to every home.

Reporting a burglary to the police could leave you waiting anything from 3 hours to 3 days for a visit.

That’s assuming there are enough resources to send someone at all.

While you wait, you’ll have questions on your mind...

> )How can I protect myself and my home? Will I see my things again? Will everything be covered by my insurance? What do I need to do if we go to court? Will the police speak my language? Is there CCTV in my street? Are my neighbours at risk, too? What happens next?_

It’s not simple for the police either. Teams are stretched, and cannot get to everyone quickly enough. They’ll be triaging and prioritising calls all day every day, so they can spend time protecting those most at risk.

## So what can we do about it?

[Police Rewired](https://policerewired.org) is a community for volunteers who want to bring their development and design skills to bear on public safety and crime. We are project based, and we’re building a conversational tool to help the victims of burglary.

When a police officer comes to your door to investigate your burglary, they’re going to help you do a lot of the same things every time...

1. **Enumerate your losses.** They're going to help you list everything that was taken, find photos of lost items, dig up receipts or find serial numbers, and estimate their cost. This helps pawn shops and police return your property to you when it finally surfaces.

2. **Write a personal statement.** If your burglar is taken to court, you'll need an evidentially sound statement showing exactly what was taken and from where, that it was yours, and prove a few legal points to help secure a conviction.

3. **Explore forensic opportunities.** The sooner yuou can steps to identify, preserve, and record forensic evidence that the burglar may have left behind, the better the chances of a successful charge, and later a conviction. Understanding what is, and isn't, helpful is a key part of the investigation.

4. **Examine your insurance.** A lot of people have insurance that they don't understand, or don't even know about! Some banks offer protections on credit cards.

5. **Give crime prevention advice.** How can you protect yourself from burglaries? Are your window catches vulnerable? If you're going to buy a TV, don't leave the box outside... There are lots of "gotchas" and pitfalls like these that a police officer could share with you to help reduce the likelihood of your becoming a repeat victim.

It’s time consuming, but it’s also really important to investigate each burglary thoroughly. We believe this is a perfect opportunity to build a conversational tool to help you through each step of the investigation. As you do, you’ll be able to get things moving long before police arrive...

Just suppose a tool like this could shave an hour off the investigation of each burglary. At less than 50% uptake, that’s 300,000 hours the police can spend with vulnerable victims who need it the most, or doing the work it takes to catch criminals.

## What's the status?

We are in the early stages of our design and build process. The bot can talk — but it can’t do much yet!

We’ve assembled libraries that build on the Microsoft Bot Framework, and we’ve designed the data structures it will need to work with as it learns about your situation.

As a developer, you can see the code on GitHub at [PoliceRewired/burglary-victims-support-bot](https://github.com/PoliceRewired/burglary-victims-support-bot), and interact with the bot through an emulator.

You can read some more about the [Burglary Victims' Bot project](https://www.policecoders.org/home/2019-01-projects/002-burglary-victims-support-bot) at our site.

## What’s next?

Design documents are in the works. We’ll be sketching out all the flows, designing and writing dialog for the bot, and improving it with each iteration.

We need to build our bot the right way to meet our responsibilities as a data operator and processor under GDPR. Remember, we’ll be responsible for the personal data of all our users. That means having the right components in place, a thorough threat model, and processes to help us responsibly handle threats to our data.

We’re all volunteers.

~~If you’d like to join the team that brings this bot all the way to production, we’d love to hear from you. We’ll be holding a meet-up on Tuesday 12th, at Newspeak House in London, so let us know if you’re coming!~~

**This post was written in 2019, and a lot of Police Rewired projects were paused or deprioritised during the pandemic. If you’d like to get involved and help us to revive this project, let us know by filling out this short form: [Police Rewired teams 2021](https://bit.ly/PoliceRewired-teams-2021)**

If you meet any of these criteria, then you’re perfect for this project:

* Creative problem solvers who’d like to give a little back.
* Former victims of burglary who’d like to reach out and help others.
* D*evelopers with a passion for doing some civic good.
* Professional testers who can push our bot to its limits.
* Security professionals with knowledge around GDPR compliance and secure design.
* HTML/CSS/Javascript coders and designers who’d like to help make our work open and accessible to the public.
* Copywriters who can help us with conversational text and blog posts.
* Technical writers to help us preserve the legacy of our framework.

_Police officers, we’ll be reaching out once we’ve completed a working prototype that we can structure around the work you do._

If you’d like to hear more about projects we’re building and events we hold, then please [join our community](https://policerewired.org).

_To do what we do, we need co-working space, cloud based servers and storage, backup space, disaster recovery resources, professional security consultancy, and funding for events and publicity. If you’d like to sponsor our work, we’d love to hear from you: team@policerewired.org_
