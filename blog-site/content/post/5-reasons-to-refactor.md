---
title: "5 reasons refactoring your project can give you back your competitive edge"
date: 2017-10-05T00:00:00Z
Tags: [ "refactoring", "technical debt", "agility", "software development", "requirements" ]
Categories: [ "article" ]
Images: [ "/necro-images/bonkers-world-software.jpg", "/necro-images/xkcd-good-code.png", "/necro-images/the-refactoring.png" ]
---

*This article was originally posted to Medium.*

# 5 reasons refactoring your project can give you back your competitive edge

> It didn’t used to be so expensive to change one little thing...

**Congratulations! You’ve put together a great team and steered the new project all the way to your first release.** You’ve re-focussed on marketing, press releases, and you’re doing some horizon scanning for new features...

**Your lead developer comes to you with a serious request: She wants to refactor the project.**

“What does that even mean?” you ask. The answer doesn’t sound like it’s worth your time — the app won’t even change, but some of the wiring under the bonnet gets re-plumbed. So what? Mixed metaphors aside, it sounds like an expensive exercise that’s not going to benefit you at all. Why should you bother? If there’s a better way to do it, why didn’t your developers do it that way in the first place?

**It’s time you learned about technical debt...**

{{< figure src="/necro-images/bonkers-world-software.jpg" alt="I've done it again" attr="Bonkers World" attrlink="https://tapas.io/episode/21002" >}}

## 1. All projects have technical debt

Technical debt increases the friction every time you want to modify your application to add a new feature or fix a bug. The amount of it you have is difficult to measure and takes effort to control. It slows down your developers and increases the work they have to do to achieve each milestone you give them. Worse, it’s virulent: Because something in your code isn’t quite as it should be, your developers are forced to write extra code to work around its limitations — and that code represents technical debt, too...

**When left unchecked, technical debt can make your simple change requests prohibitively expensive.**

Instinctively, your developers will know when they are introducing technical debt. It creeps in as the compromises they have to make to deliver something on budget and on-time. It’s a blessing and a curse — by making those compromises your team can deliver, although they know they’ll have to pay for it in the future...

So what does technical debt look like in code? Here’s a concrete example...

*Perhaps there’s a well defined library method your application uses, and you need to re-use it with a subtle change in behaviour. There isn’t time to re-write it more configurably, so instead your developer makes a copy of it and alters the copy to suit your new requirement. It works and does what you need — but what happens when you need to revisit it? Suddenly, your developer has to change the behaviour of your code in two different places.*

You might think you’re never going to need to change that again...

## 2. You are absolutely definitely going to change your requirements

Perhaps this is the most difficult lesson of all. During the course of a project, you will discover mistakes in your assumptions, changes in your users’ needs, and perhaps even changes to regulatory (or legal) requirements that you need to adapt to.

*Protecting your flexibility is extremely valuable, especially because you cannot hope to predict every change requirement you’ll encounter.*

## 3. Technical debt is inevitable

> Why can’t I just avoid technical debt in the first place?

{{< figure src="/necro-images/xkcd-good-code.png" alt="How to write good code" attr="xkcd: good code" attrlink="https://xkcd.com/844/" >}}

It’s important to understand that no matter how good your developers are, there will always be _some_ technical debt in the project, and it will always increase at _some rate._

A good developer is fast and experienced. A fast developer has spare cycles so they can find ways to minimize technical debt as they code.

An experienced developer has seen a lot of early mistakes and compromises, and has already thought through ways to quickly minimize those risks.

It’s important to remember that nobody is perfect, and nobody can predict the future. A developer might say “I’d imagine the requirements are going to change for this function.”, but she still might not know in what way exactly, and nor might you, and nor might your customers. If she has the time, your developer would make the new function as generic and configurable as possible — but there’s no way to know for sure if that’s time well spent or time wasted. If time is tight, it’s probably not going to happen…

## 4. Refactoring reduces technical debt

**The answer to technical debt is refactoring, and it’s an essential part of the development cycle.**

Refactoring is an opportunity for your project to breathe. It allows your developers to go back into the code and fix some of the issues that have been nagging at them since they started. It’s an opportunity for you, too, to hint at the places your application is going to go in future. An idea of the features in your future gives your developers an idea of which parts of the project are going to be serving different purposes in future.

{{< figure src="/necro-images/the-refactoring.png" alt="How to write good code" attr="toggl" attrlink="https://blog.toggl.com/life-of-a-programmer/" >}}

In the practical example above, your developers would instinctively want to refactor those two copies of the library method back into one — with a few more configurable options.

There are other tangible benefits: Perhaps since you started your project, a new third-party library has emerged that deals with something your developers had to code for themselves. This is a good time to retrofit that library, and cut out the need to bug-fix and enhance it yourselves. Developers working on stand-alone third party libraries are often inclined to build their code to be as configurable as possible, _because they don’t have a single use in mind at all._

## 5. Reducing technical debt keeps you competitive

Still, though, why bother?

All of the effort your team expends refactoring the project will reduce the cost of future development — and that’s the take-home for you. It may seem like your application hasn’t changed at all, but in fact it’s now far more agile and easy to adapt as you go forward.

That new agility means savings in time and money every time you ask for a change. It’s impossible to prove, because you might never realise how bad things could have been — but _refactoring pays for itself._

Whatever industry you’re in, that’s a competitive edge you don’t want to miss out on!

## TL;DR

* Technical debt always increases in your project, because of budgetary and time limits.
* Technical debt gums up development and makes it more and more expensive to change your application.
* Good developers can slow down technical debt by pushing back on it as they build, but it never stops or goes away entirely.
* Refactoring reduces technical debt by allowing your developers to fix those compromises they made to deliver on time.
* Reducing technical debt means your project can change more quickly, and reduces the cost of changes.
* Setting time aside for refactoring pays for itself.
* It may seem like your application hasn’t changed at all, but that new agility is a competitive edge in your market.

