---
title: "Why are some projects so expensive?"
date: 2017-09-22T00:00:00Z
Tags: [ "costs", "estimates", "expenses", "ANPR", "app", "developer" ]
Categories: [ "necropost", "article" ]
Images: [ "/necro-images/project-costs-anpr-1.jpeg" ]
---

*This article was originally posted to Medium.*

# Why are some projects so expensive? Need they be?

*This article is adapted from a response I gave to [the Reddit post](https://www.reddit.com/r/coding/comments/6wvupz/how_i_replicated_an_86_million_project_in_57/) for the Medium article [How I replicated an $86 million project in 57 lines of code](https://medium.com/@taitems/how-i-replicated-an-86-million-project-in-57-lines-of-code-277031330ee9) in [r/coding](https://reddit.com/r/coding) by [Tait Brown](https://medium.com/@taitems)*

Tait’s article demonstrates an [ANPR](https://en.wikipedia.org/wiki/Automatic_number-plate_recognition_in_the_United_Kingdom) app that can read number plates and compare them against an internally held database.

![the ANPR app looks impressive](/necro-images/project-costs-anpr-1.jpeg)

The app itself works with a video feed from the phone’s camera to process a video stream in real time. It’s impressive to look at — and all the more so, as he comments that he wrote it in 57 lines of code.

First off, despite comments that appeared on the reddit post about his ego, and a little name-calling, it _isn’t_ arrogant to demonstrate a working ANPR app that can operate on a live video feed. Nor is it arrogant to ask why a _similar looking_ project should cost as much as $86 million.

It is fair to say that any working solution to a problem like this cannot be as simple as a mobile app that can do ANPR. From a developer perspective that seems to be the hard problem, and a developer’s instincts will tell her that that ought to be the most expensive part. It’s easy to overlook everything else that’s required to support and assure a solution like this...

Writing mobile apps that are responsive, can utilise complex libraries, make good use of video previews, and provide a good user experience (such as the well designed and clear overlays shown in the screenshot) is a difficult task. A government contractor could well bill tens of thousands for a piece of work like that alone — even without any of the supporting infrastructure.

I appreciate that that’s simultaneously an argument for how a single developer (such as the original poster) can generate value by being skilled and reducing the cost of a project, but also goes some way towards explaining why the implemented solutions sometimes turn out to be very expensive.

Public service organisations aren’t software houses. They are forced to turn to “trusted” partners for their innovations, and those partners exist to make money. The assurances they offer (large teams that can deliver complex projects and are resilient against individuals walking away, insurance against software failures with impact on physical safety (imagine if a police officer deals with a vehicle that belongs to a wanted, violent, offender, but it doesn’t flag a warning to him/her)) often come with a hefty price.

*There’s a very important conversation to be had* around why in this day and age, public service bodies don’t have a software development capability. Arguably, they should — and developing that capability would save a lot of money. However, we should understand that unless there’s political will to change things, they will continue as they are. We should factor in the costs of turning to partners to do the development when we consider public service software projects.

It’s also worth noting that for a project of this size there’s bound to be a tendering process. Tendering is a lengthy, expensive process that often involves so many steps in order to be “fair” that, ironically, smaller companies and individuals capable of delivering these projects on a budget simply cannot compete. Once a tender is won, the winner will often consider that the costs associated with tendering (building prototypes, lengthy documentation, assurances, workshopping, also costs associated with other, lost, tenders that cannot be recovered any other way) should be recouped in the cost of the delivery (and so price their offering from the very beginning accordingly).

*There’s another conversation to be had* about tendering processes in public service. Why does it need to be so complex and expensive? Which well-meaning legislation is making it more expensive? What work-arounds exist for these shortcomings? Who is motivated to keep things as they are, and who is motivated to change them for the better? A good place to look for some answers about how things might improve is the UK Government’s [Digital Marketplace](https://www.digitalmarketplace.service.gov.uk/), and [G-Cloud](https://www.digitalmarketplace.service.gov.uk/g-cloud) directory. These are ways for providers to list and make available their services to government departments, and meet the tendering requirements with significantly less time and effort and pain.

## So what’s the real question here?

Here’s the one I’ve chosen to answer.

> What are the features that push a project from a working tool such as mine, all the way to an $86 million project? What can’t I see?

**Here’s what I think is missing.** If we can identify all the parts of the machine, and it sums to $1,000,000 or over, then (ignoring a fiddle-factor of 86) perhaps we can say “yes, this needs to be expensive”...

* **Factor in a data source for license plates of interest.** If we were just technicians, we’d say: Let’s assume a few thousand a year to maintain that, and perhaps an initial setup cost of a few thousand. License plates (and their providence) consume miniscule storage. However, we also know that whatever service we build must be accessible on the internet, either provide access to the data or run a comparison service. It must be resilient against attack (DoS, and also slurping of the data) and able to detect unusual behaviour and cut off rogue access. There’s going to be a security design for it, and it’s likely going to need to be implemented in an accreditable data store. Of course, this all assumes that “license plates of interest” is protected data. If it were public data, it could be published on an existing government website, and updated regularly.

* **Factor in secure communication channels.** This is now a distributed system. That means certificate pinning and SSL for fetching updates — there are lines of communication that shouldn’t be easy to compromise. The app must be assured that it is fetching data from the server it thinks it is fetching data from!

* **Factor in reliable communication channels.** As mentioned in /u/M240G ‘s comment, there’s a need for a data synchronisation queue. If the app can’t communicate because it’s in a poor signal area, it needs to keep trying — and it needs to inform the user that they may not have the most up-to-date information just now. There are good libraries for this — but you’ll need to implement them both in the app and server-side to ensure nothing is dropped.

* **Factor in a reporting system.** The police service (or any public service agency running this) will need an API for MOP devices to be able to submit sightings. That will require photo storage and providence, with accreditation and assurances against tampering that mean the data can be used evidentially. It must also be resistant to spoofing so that organised criminals cannot generate and submit false trails across the country and consume police time (or devalue real input by adding too much noise).

* **Factor in a real-time monitor showing alerts,** that’s also somehow integrated into police dispatch. This could be another mobile app or a desktop service. It will need features that allow for multiple users (so that one dispatcher can mark an alert as “being dealt with” and clear it from the map to reduce clutter for others and prevent multiple dispatches to the same job). If a police service use the tool and wish to respond immediately to reports of wanted offenders on the move, they may need a dedicated monitor for it.

* **Factor in hardware.** That’s a consumer phone per police vehicle. MOPs who wish to participate voluntarily can provide their own dash-mounted phone. Phones come in at a few hundred plus a data package.

* **Factor in user acceptance testing.** This app is going to have to be useful while its users are doing stressful things like driving, pursuing, listening to instructions by radio, or a dozen other things. It needs to be simple and pleasant to use. Technology in public service has a reputation for being slow, difficult to use, and overly complex. There are going to be regulatory hurdles to overcome, too. It will need a hands-free operation mode — which means the app may need to make decisions about when to take a photo for evidential purposes, when to make visual and audible alerts, where and how large to display those alerts, etc. This will take time (both yours and also your potential users) to hammer out and get right.

* **Factor in the the cost of any accreditation required for the whole system,** should a public service body choose to use the tool. Consider that to be a few weeks’ work for a couple of contractors with expertise in that to generate the documentation. (As a developer you really don’t want to learn about that whole world any more than you have to — it’s just not worth your time — there are whole courses you can take.) There’s also going to be a code review — to ensure that the system isn’t leaking data or vulnerable to attack at any of its points (and it has quite a large surface!) That review should come through an established company that can provide a full report, in detail with access to some extremely qualified penetration testers and seasoned coders. With that in hand, you should set aside a significant amount of developer time to modifying the system based on those recommendations before you can safely get sign-off from an accreditor.

* **Factor in on-call support and support call-offs** for modifications, fixes, and new features. You may also have a requirement for a monitoring system to get early notification if something isn’t working. If the system doesn’t report anything new in a while, somebody will need to check it’s still running, delete archive the logs as they fill up the storage, or perform other maintenance actions — and they can’t be too busy right now. There are going to be a lot of support calls along the lines of “I’ve forgotten how to do X, Y or Z.” Somebody somewhere is going to have to manage those — and as a solo developer, you really don’t want it to be you!

To run a system like this for a department for a year, still seems to me (finger in the air) to come in under a million. That said, I’ve not put a price to everything so perhaps I’ve underestimated certain parts of this.

The original poster has deliberately chosen to keep costs low by factoring out data-warehousing and doing the OCR/ANPR on mobile devices. This is a wise choice. However, I think with a bit of the bigger picture in sight now, it starts to become clear why a project like this is going to be surprisingly expensive.

*That said, perhaps an app on a smaller budget can be repurposed. Communities and consumer groups (for instance, neighbourhood watch organisations) aren’t required to tender or accredit their tools (of course) — nor do police departments ignore information that comes from external sources (otherwise nobody would be able to give evidence to the police!) Could a distributed network of volunteers generate useful data and report it to the police? Absolutely.*

*As a developer you still have costs though. You have a lot of hard work to do to ensure your app can’t be abused to generate false data, and you still have to negotiate access to the data source. Many police departments are reluctant to hand out data such as wanted license plates — as it will “tip off” offenders, or encourage them to disguise their vehicle plates or attack the system in other ways. They will have to weigh up the pro’s and con’s — and may simply choose not to release the data in the light of the risks. You’d have to make a compelling case for making the data publicly available.*

**TLDR; Projects like these are more complicated than you might assume at first. Take that on board and never stop building things!**

*A teeny, tiny, disclaimer: I, too, have written an ANPR app. It’s not as sophisticated as /u/javinpaul’s, but it’s oriented towards a similar niche. It needs a lot of work, but I stopped where I was and use it as a simple tech demo when questions about OCR come up with potential clients.*
