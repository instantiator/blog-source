---
title: "Choosing your first coding language"
date: 2021-01-03T15:00:00Z
draft: false
tags: ["coding", "programming", "beginner", "101"]
categories: ["tutorial"]
---

# Anyone can code.

This is a short exploration of the choices for coding beginners out there.

There's nothing unique about coders (other than choosing to code) and certainly
no reason to believe that your gender, age, or any other characteristic is going
to hold you back. Anyone who tells you differently is gatekeeping, and that's
not kind. If you want to get started, read on...

Choosing a language or framework to learn might seem daunting, but hopefully this will help.

Communities form around frameworks and languages, and those communities build libraries you can
use in your projects, generate lots of self-help material (such as this blog), support each other
and improve the tools available to you as a developer.

It's because of these communities that the creators of the tools you're using (whether it's
companies or open source developers) will continue to support and develop them.

There are plenty of coding courses that will teach you these things for free, and plenty of
resources online. The goal here is to talk about what to look for, and to help you make
a choice about what to invest your time in.

Whatever you build, it's worth understanding how best to build an inclusive experience
for all users. The UK's [Government Digital Service](https://accessibility.blog.gov.uk/) run an accessibility blog,
which is a great place to learn more about it.

**Disclaimer:** All languages ought to support everything you need to do, and
technically, they can. However, some have more active communities, and better libraries.
You probably don't want to write a web server from scratch just to host a website, so
hopefully this will help you choose the right tool for the job.

This is my perspective from early 2021. I expect it to change...

# Getting started

To lean how to think about coding, and experience the joy of building something and showing it
to others, I'd suggest [Scratch](https://scratch.mit.edu/).
It's a highly visual coding experience designed to teach coding.

When you feel ready to write some code, you could move on to [Python](https://www.python.org/).
It's everywhere right now and steadily increasing in popularity.
It's got a great community and lots of libraries that let you set up simple
web servers, through to complex data science and machine learning.

The basics of Python are likely to underpin quite a lot of whatever you decide to
do next, if you decide to keep learning.

# Websites

Websites are built with code, and even if you're going to use graphical tools to build them,
understanding how they work under the bonnet will help you to create unique designs and
experiences.

There are plenty of places to start, but I'd recommend that you pick up the basics of
[HTML](https://www.w3schools.com/), [CSS](https://www.w3schools.com/css/) and
[Javascript](https://www.w3schools.com/js/default.asp) (not to be confused with Java - they're very different things).

Before you go too far with hosting options, it's worth trying out what you've got. Now
is a good time to pick up some [git](https://git-scm.com/) (a tool for managing code and
code repositories) and then pop your website on something like [GitHub Pages](https://pages.github.com/)
to test it out.

Building websites isn't just about good code though. Have a think about content and
design, too. You may find you can contribute just as much to the quality of the tools
that get built by contributing to a well designed user experience.

# Mobile apps

Mobile development is very fast moving. At the current time I could make a number of different
recommendations, depending on what you are planning to build for (usually a choice between
Android, iOS, or both).

For each platform, there's not just a good language, but also a framework of built-in libraries
and conventions to learn about. I'd recommend finding yourself a good, recently updated, course
or tutorial to ensure you get to know all the intricacies.

If you're building for iOS (iPhones and iPads) exclusively, consider learning [Swift](https://developer.apple.com/swift/).
It recently replaced Objective C as the language of choice. Apple provide an IDE called
[XCode](https://developer.apple.com/xcode/) for this.

Similarly, for Android phones, [Kotlin](https://kotlinlang.org/) is the language of choice now (having recently
become a first-class language on Android). Google provide [Android Studio](https://developer.android.com/studio),
which supports Java and Kotlin in Android projects.

I wrote a number of posts and comments on reddit about developing for Android over the past few years:

- [Good libraries and getting started with Android.](https://www.reddit.com/r/androiddev/comments/8t2pvw/i_might_be_able_to_help_you_with_your_android/e14i3lh?utm_source=share&utm_medium=web2x&context=3)
- [I might be able to help you with your Android development questions.](https://www.reddit.com/r/androiddev/comments/8t2pvw/i_might_be_able_to_help_you_with_your_android/)
- [I might be able to help you with your Android development questions, again.](https://www.reddit.com/r/androiddev/comments/9vz7nx/i_might_be_able_to_help_you_with_your_android/?utm_source=share&utm_medium=web2x&context=3)
- [Questions you might ask in interview to establish experience of Android.](https://www.reddit.com/r/androiddev/comments/73i7mh/relevant_android_dev_interview_questions/dnqk1nz?utm_source=share&utm_medium=web2x&context=3)

If you'd like to build for both Android and iOS at the same time, you might consider picking up
[C#](https://docs.microsoft.com/en-us/dotnet/csharp/) and
the [Xamarin](https://dotnet.microsoft.com/apps/xamarin) framework
(a part of [Visual Studio](https://visualstudio.microsoft.com/) now).
This has the advantage that you only
need to write your code once, and the Xamarin.Forms framework helps you to design your
user experience in such a way that it will work across both platforms.

Alternatively, you could look at building your app in web technologies - giving you the
advantage of working on any mobile platform and regular web browsers too.
There are some great frameworks for that, and it's all underpinned by
HTML5 and Javascript. I'd recommend reading about [Progressive Web Apps](https://developer.mozilla.org/en-US/docs/Web/Progressive_web_apps)
to understand exactly which hoops you'll need to jump through to build a PWA.

NB. As some platforms (notably Safari on iOS) don't support every feature of PWAs.
You may find that it's not quite the perfect choice for your needs. ie. iOS doesn't
support web push notifications, and there's no indication of a schedule or timeline
for when it will. Apple seem to be stubbornly holding out to protect their own
push notification service (APNS).

I'd recommend checking a recent
[summary of which PWA features are supported](https://simplabs.com/blog/2020/06/10/the-state-of-pwa-support-on-mobile-and-desktop-in-2020/)
before you embark on a project.

# Games

[Unity](https://unity.com/) is a widely recognised, and well supported games development tool. It's a great
framework for developing new games, and there are many tutorials and courses you can
use to get started.

For a lot of game development, you'll be designing and arranging levels and graphics.
Eventually, though, you'll want to encode some behaviours for the things in your game.
Unity supports [C#](https://docs.microsoft.com/en-us/dotnet/csharp/) and Javascript for this, and with the wide range of supporting
material online, you'll find it easy to get started.

Other game development frameworks exist, too - and you may find you like the look
of a simple javascript, web based game development environment more.
There are quite a few well loved libraries for that
(such as [impact](https://impactjs.com/) or [phaser](http://phaser.io/)).

There are plenty of other, more sophisticated games engines you could use too - and
those may involve C++ or even C. These languages will give your code a real speed
boost as they compile to code that runs directly on your computer's processor, with
far fewer layers of abstraction. They're also pretty complex, but if you're considering
a future in game development, this may well be time well invested.

# Enterprise

This isn't the most thorough analysis of enterprise technologies, but if you're looking to work for
business and industry, there are plenty of jobs available
working on systems that need to behave predictably and reliably.
They'll be talking to databases, storing, validating and processing user input,
generating reports, and controlling other systems. There are a couple of front-runners for this:
Java and C#.

[Java](https://www.java.com/en/) (currently owned and supported by Oracle) is a bit long in the tooth now,
but it's very well supported, still has a huge community and still in use across great swathes of industry.

[C#](https://docs.microsoft.com/en-us/dotnet/csharp/), by comparison, feels like a slightly fresher and more intuitive take on a similar set of
ideas to Java. Where Java is sometimes a little verbose, C# has found ways to make life a little
easier, and tooling such as Visual Studio do wonders for usability.

Both of these languages have strong support for features that help to reduce the errors you make, such
as testing, strong typing, and logging. Both also have well established frameworks that can help you to build
robust websites, and web services. In Java, it's worth taking a look at [Spring Boot](https://spring.io/projects/spring-boot),
or [DropWizard](https://www.dropwizard.io/en/latest/). C# offers [ASP .Net Core MVC](https://docs.microsoft.com/en-us/aspnet/core/mvc/overview?view=aspnetcore-5.0).

Of course there are plenty of other libraries and frameworks that offer similar capabilities.
It's a good idea to assess what's available at the beginning of each project. These things change.

# Data

There are two main types of database in the world - SQL and NoSQL.

[SQL](https://www.w3schools.com/sql/) is a language for querying data in relational databases
(here, data is stored in tables. Each table describes a single type of record, just like
rows in a spreadsheet. Relationships are defined between the tables so that records
in one table can refer to others). Databases such as [MySQL](https://www.mysql.com/),
[MSSQL](https://www.microsoft.com/en-gb/sql-server/sql-server-2019) (aka SQL Server, from Microsoft),
[SQLite](https://www.sqlite.org/index.html) and [postgres](https://www.postgresql.org/) are SQL databases.

You're likely to need a bit of an understanding of SQL whatever the nature of the data
you're working with. It's everywhere.

NoSQL databases (aka documenting databases) store data as 'documents'.
You can think of a document like an individual file, containing a single record.
These are arranged into collections. Depending on the choice of NoSQL database you're using you
may need to understand a little about data formats such as [JSON](https://www.w3schools.com/js/js_json_intro.asp)
and [YAML](https://en.wikipedia.org/wiki/YAML). [MongoDB](https://www.mongodb.com) and [redis](https://redis.io/)
are examples of documenting databases.

[XML](https://en.wikipedia.org/wiki/XML) used to be all the rage for representing data like this.
You'll find that most new systems prefer JSON and YAML though, as they are much more concise
and a little easier for people to read and write.

# Microservices

A microservice is a small, well-defined application that does a few things well. They run inside
an environment called a container. Containers are a fun idea. They're a small, lightweight virtual machine (usually
a Docker container, and usually a bit linux-like).

You get some guarantees from running your code inside a container, such as:

- You can control the versions of everything inside the machine. (This helps to prevent accidental upgrades that
  affect the behaviour of your code, or introduce breaking changes.)
- If the container runs on your machine, it'll run everywhere.

There are plenty of pre-built Docker containers to choose from to build your service. Many of which
are full applications in the own right, others are environments for running your code in.

Interestingly, although I didn't list Python amongst the languages for enterprise software development,
it's well suited to building microservices. You can create small services quickly and test them thoroughly
to ensure they do what you need. The [python container images](https://hub.docker.com/_/python) at Docker Hub
have some great instructions for getting started.

When you've a few different microservices you'd like to run together, I suggest experimenting with
Docker Compose. It allows you to define groups of Docker containers that run together, and communicate
with each other in a miniature virtual network of their own.

Docker containers are the basic unit of a number of bigger frameworks such as [Cloudfoundry](https://www.cloudfoundry.org/)
and [Kubernetes](https://kubernetes.io/).

These frameworks are often used in enterprise environments to ensure that code is running reliably, and
they make guarantees of their own, like:

- Your container will always be running, and automatically restarted if it fails.
- You can build groups of the same container, so that there are always 3 of them running (for example).
- You can have fine-grained control of which containers can communicate and how.
