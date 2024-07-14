---
title: "Dracula and the Epistolorean"
date: 2024-07-14T12:00:00Z
draft: false
tags: ["project", "c#", ".net", "dotnet", "pi", "rpi", "raspberry-pi", "books", "literature", "epistolary", "epistolorean", "dracula", "count dracula", "bram", "stoker", "subscription", "service", "vampire", "library", "subscription"]
categories: ["article"]
images: ["/epistolorean/draculorean-poster.png"]
thumbnail: "/epistolorean/draculorean-poster.png"
---

What is the Epistolorean, and what has it got to do with Count Dracula?

# The Epistolorean

Epistolary books are written as letters or journals. They tell a story through the eyes of one or more characters, capturing their thoughts, feelings, and events as and when they are recorded. [Dracula](https://www.gutenberg.org/ebooks/345), by Bram Stoker, is a great example of this.

I recently completed building The Epistolorean, a service that breaks up epistolary books by entry, so that you can subscribe to them by email over time, receiving entries from the characters as they write them in the story. That's an email for each journal entry, or letter in the book - and sent as and when they would have been sent if the story were happening in real time.

If you'd like to know more about the project, and find out when it's ready for new subscriptions, fill out this form:
* [Epistolorean](https://forms.gle/gNdG8V199XhDtB3Y7) (form)

## The Draculorean

![The Draculorean](/epistolorean/draculorean-poster.png "A Delorean about to time travel, leaving trails of fire behind it, along a dark gothic street lit by old iron street lamps. Books lie by the side of the road, lit by candles. Castle dracula looms over the background, and bats in the sky are silhouetted in front of the moon... It's a real mood piece!")

Dracula, for instance, begins in early May and (nearly) ends in November (if you don't include the final entry, dated 7 years later). Although Bram doesn't state the year, it's thought to be a contemporary writing, and the events of the book can be placed in the year 1897 without too many contradictions.

I particularly enjoyed reading Dracula. It has a sly villain with a dastardly plan, and clever protagonists who (almost) always do the smart thing. It takes place in Transylvania, England, and a dozen places in between, and it offers us moments of sadness, disgust, despair, action, hope, excitement and the thrill of the chase!

The Draculorean is a subscription to Bram Stoker's Dracula, and has been running since May of this year amongst a small group of friends and testers. (It needn't start then, though - it could start at any time of the year, and still track elapsed time in the story.)

Every subscriber receives an email from the protagonist who has written the next entry in the book, as and when that entry would have been written.

I'm excited to report that it's working smoothly, and this means that in future I can go further - to build a subscription service that anyone can use.

### Chronologies

Dracula is also an interesting case. The story is delivered in parts, telling each protagonists individual tale when they are not together, and telling their group tale when they are. For instance, when Jonathan Harker is at Castle Dracula in Translyvania, Mina and Lucy are writing letters to each other in England, and Dr Seward is studying Renfield at his mental health facility.

The book tells each story individually, but the Draculorean delivers them all _as they happen._ While Jonathan is encountering the count, everybody is also living their tales too and writing in their journals, and so we experience it all. It's quite a different experience, but I'm finding it fun to follow along as the various stories become linked...

## A library of epistolary books

The Epistolorean doesn't just have to serve Dracula, of course. I'm on the look out for some other _good reads_ that fit the bill to convert for subscription.

I initially started by converting Anne Frank's Diary (as found [in the Internet Archive](https://archive.org/stream/in.ernet.dli.2015.201940/2015.201940.Anne-Frank_djvu.txt)). The copyright on this work is unclear, and it's probably not legal to distribute for at least a few more years, so I won't be able to include that in the library for now. (It's a shame, I think that this is a format that could really bring the book into focus.)

If you have suggestions or ideas for books that could be adapted for the Epistolorean, I'd love to hear more about them.

## Technical ambitions

The Episolorean is a containerised .NET Background Service, running in [Docker](https://www.docker.com/) on a [Raspberry Pi](https://www.raspberrypi.org/). It's tiny, consumes very few resources, and sits quite happily on my shelf.

The service itself is built and deployed using [Docker Compose](https://docs.docker.com/compose/), and shares a composition with its [postgresql](https://www.postgresql.org/) database. It has a connection to an external [SMTP](https://en.wikipedia.org/wiki/Simple_Mail_Transfer_Protocol) service to send email, and a command-line interface (CLI) on the server can manage the service by altering the contents of the database.

![Epistolorean architecture (now)](/epistolorean/2024-07-epistolorean-arch-now.png "A diagram illustrating the composition of the Epistolorean Service, described above.")

The next step for this project are accompanying services that allow subscriptions to be managed through a web application. I've been considering [Shopify](https://www.shopify.com/uk), as it offers subscription-based products and [web-hooks](https://shopify.dev/docs/api/admin-rest/2024-01/resources/webhook) to share details of subscriptions and cancellations.

Without a static IP, it'll need a dynamic DNS service like [noip](https://www.noip.com/) to be discoverable and remain connected.

![Epistolorean architecture (ambition)](/epistolorean/2024-07-epistolorean-arch-ambition.png "A diagram illustrating the composition of the Epistolorean Service, incorporating an external third party service (Shopify) with web hooks, and use of a dynamic DNS service to make the Epistolorean discoverable.")

All of this is yet to come! Sign up to hear when it's ready:

* [Epistolorean](https://forms.gle/gNdG8V199XhDtB3Y7) (form)
