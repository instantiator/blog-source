---
title: "Look for the helpers"
date: 2020-04-23T00:00:00Z
tags: ["covid-19", "volunteering", "community", "aid", "mutual aid", "open data", "research"]
categories: ["Article"]
images: [ "/covid-19/map-1.png", "/covid-19/map-2.png", "/covid-19/map-3.png" ]
series: [ "covid-19" ]
---

What can we learn about grass-roots COVID-19 volunteer groups from open data?

# Look for the helpers

Thousands of volunteer groups across the country have formed in the wake of COVID-19. Some have formed specifically to help those in self-isolation, others were already community groups that have taken up the call.

{{< figure src="/covid-19/london.png" alt="London" width="300px" class="left-image" >}}

I’ve been volunteering in London with the Metropolitan Police since 2009. More than a year ago I took a career break from that, to build a community called [Police Rewired](https://policerewired.org) for volunteers who wanted to contribute their tech skills to public safety.

Community- and volunteer-driven efforts (particularly those with a strong ethos of social inclusion) are close to my heart…

Over the past few months we’ve seen a transition in the way people are volunteering — from individual volunteers offering their help on social media, through tools to map and match help to need, groups (with various levels of autonomy and vastly different organisational patterns) operating over small localities, to local councils and hubs picking up a lot of the strain getting food and supplies to those in need.

I set aside some time to collate and clean up the open data sources that are available, so we can learn a little more about them. This exploration takes us through a number of sources, which I’ve summarised in a small collection:

* 🌐 [Covid-19 volunteerism data sets](https://docs.google.com/spreadsheets/d/1fFknLCgnOvu6T9MhbADdww68oW_W_R6Nrrm7a4nRRDI/edit?usp=sharing) (our sources)

I’m also sharing the cleaned up data about volunteering groups across the UK — so if you’re interested in getting hold of it, you’re welcome to plunder this resource:

* 🌐 [COVID-19 combined volunteer groups data set](https://www.policerewired.org/home/covid-19/communities) (a cleaned-up and deduplicated collation of coronavirus support group data, from all the sources we currently have)

Interested folks have started creating new tools with the data...

* 📌 A map of the support groups _was_ available through [helpisavailable.org.uk](https://helpisavailable.org.uk) (maintained by [Police Rewired](https://policerewired.org) volunteers). (This has now been deprecated as the data is no longer updated.)
* 📌 [A map merging this source with data showing areas of deprivation](https://fryford.github.io/coronasupport/index.html) was created by [Rob Fryford](https://twitter.com/fryford) ([ONS](https://www.ons.gov.uk/)), to help guide volunteer and relief efforts.
* 📌 [LocalHelpers](https://localhelpers.org/) offer links to nearby volunteer groups when handling requests or offers of help.
* 📌 [The Community Policing Dashboard](https://www.policerewired.org/home/covid-19/community-policing), is a collaboration between staff and volunteers from [ESRI UK](https://www.esriuk.com/en-gb/home) and [Police Rewired](https://policerewired.org/).
* 📌 The COVID-19 combined volunteer groups data set is being made ready to be shared through ESRI’s [Living Atlas](https://www.esriuk.com/en-gb/content/living-atlas), making the information available for other services to build on.

{{< figure src="/covid-19/map-1.png" alt="London" width="300px" class="inline-image" attr="helpisavailable.org.uk" attrlink="https://helpisavailable.org.uk" >}}
{{< figure src="/covid-19/map-2.png" alt="London" width="300px" class="inline-image" attr="support groups and areas of deprivation" attrlink="https://fryford.github.io/coronasupport/index.html" >}}
{{< figure src="/covid-19/map-3.png" alt="London" width="300px" class="inline-image" attr="community policing support dashboard" attrlink="https://www.policerewired.org/home/covid-19/community-policing" >}}

Here’s what we know about the data we have...

## The rise of volunteerism

In the UK, one of the most notable changes to the landscape since restrictions began was how quickly and how many people began to volunteer. These were individuals responding to the needs of those in their communities that had been asked to go into self-isolation. Many appeared as offers on facebook, twitter, instagram, or whatsapp — wherever people felt they could reach out.

Anecdotally, there are strong indicators that almost everyone knows about someone in their community who has taken part in a volunteering effort… but what data do we have to support that narrative?

This period was characterised by a number of sites that people were able to use to share their needs in isolation, or offer to help.

### Self-isolation helpers

One of the earliest contributions to the volunteering landscape was the [self-isolation helpers map](https://randall.ie/help/) from [Jonathan Randall](https://twitter.com/MrJRan), rapidly shared through Twitter. It initially focussed on requests and offers of help across Ireland, using the hashtag [#selfisolationhelp](https://twitter.com/search?q=%23selfisolationhelp).

> Like a lot of freelancers I quickly realised I’m going to be given a lot of spare time over the next few weeks. I thought, I’m going to need to be creating something, or I’ll lose my mind!
> 
> I started looking at what people were saying online, and I noticed how many people wanted to send out a message that they’d help anyone in their town who needed it — but those kind offers were quickly being bumped down the timeline.
> 
> I decided we needed a better way to be able to share these important gestures, and I thought it would be better if they could be placed on a map.
> 
> I couldn’t believe how many people used it, and how it was shared across the world. I think people were feeling so hopeless reading the news, and then they would go online and be inspired by how much kindness there is — and they’d want to be part of it.

Support from popular online figures such as [Helen O’Rahilly](https://twitter.com/helenorahilly) helped to grow the map’s impact.

The service was withdrawn on 27 March 2020 — the date that the Irish ‘lockdown’ was introduced, and at that point over 8000 people had offered to volunteer, and made new connections through the site.

![randall.ie/help closed on March 27th in response to lockdown](/covid-19/randall-ie.png)

The data shows an early burst of activity, starting on the 14th March and trailing off towards the 25th when the site was switched off.

![self-isolation helper registrations](/covid-19/self-isolation-helper-registrations.png)

As we’ll see, by this time many people had moved towards working together in groups and so their activity is better reflected in the data we have about volunteer groups.

### LocalHelpers

[LocalHelpers](https://localhelpers.org/) started during the initial phase of the crisis, before volunteer groups had become established and while individuals who wanted assistance could find local people to help them.

They registered their domain on 15th March, and almost immediately began to match requests and offers. Their functionality is connected helpers offering specific skills or tasks to those in need...

{{< figure src="/covid-19/local-helpers.png" alt="Local Helpers" caption="LocalHelpers are currently showing 2500 registered helpers in a number of categories." >}}

[Nick Bailey](https://www.linkedin.com/in/ngcbailey/) (LocalHelpers tech lead) has observed a change in the landscape of needs since their service launched, commenting on this in mid-April.

> There’s a shift from the immediate and reactive ‘how do we do something useful?’ to ‘how do we support the NHS now they’ve had to move all the non-critical patients into the community?’

The local helpers volunteering data shows an initial burst of activity, followed by some core people maintaining their effort over time…

![LocalHelper volunteer offers](/covid-19/localhelper-volunteer-offers.png)

From his first-hand experience, Nick describes 3 phases of the volunteering story so far:

1. **Immediate firefighting,** as people ask “how are we going to care for people?” With uncertainty around food, or the duration of lockdown, people wanted to help those hardest hit.
1. **Consolidation,** as groups form around a smaller core of people who have the stamina to volunteer persistently.
1. **Long term care.** How do some volunteers become long-term carers? With many thousands of people being supported by those groups, what happens next?

Nick also has a passion for helping groups to protect and manage the data they hold about their volunteers and vulnerable people; and has offered guidance and support to groups current working from shared spreadsheets or AirTable.

The LocalHelpers team went further, and developed a lightweight, easy to use client and case management tool to support volunteer groups. Many groups have now transitioned away from spreadsheets towards this safer platform, which is also being shown to be a significant timesaver for group leaders.

> This tool is free for volunteer groups and has already been through due diligence with local councils. Whether groups choose to use LocalHelpers or another case management tool, significant concerns have been raised about spreadsheets and Airtables; specifically with the relative ease with which access can be granted more widely than is needed, accidental deletion of records, and difficulty in seeing a single view of everything that’s been done so far to help a particularly person in need.

As volunteers moved away from individual action and formed steady groups, the Covid-19 Mutual Aid UK site captured thousands of group registrations…

### Mutual Aid

The largest data set we have comes from Covid-19 Mutual Aid UK, a group of volunteers providing support to groups that have sprung up across the country.

According to their [FAQ](https://covidmutualaid.org/faq/), mutual aid groups are structured around several ideologies. The key points being: Groups are voluntary, work in a leaderless horizontal structure, and operate without contact or support from institutions or official bodies (such as local councils, government, police, NGOs, etc.)

**Not every group registered through the site is a mutual aid group.** Many are registered elsewhere too, subscribe to other sets of values, pre-existed, or signed up to raise their profile (and so make it easier to reach more vulnerable people). Nevertheless, the mutual aid movement now has significantly more recognition amongst volunteers than before the crisis.

_NB. These ideologies mean my connection to [Police Rewired](https://policerewired.org) and volunteering in public safety prevent Covid-19 Mutual Aid UK from speaking to me. I found myself in the position of an objective researcher exploring their data “without fear or favour”... There are worse ways to spend the long Easter weekend!_

#### Registrations

Covid-19 Mutual Aid UK don’t state when they started collating data about groups that have registered with them, and unfortunately they record dates in at least two ambiguous formats. Cautious interpretation of their data suggests that the first registration was 2020–03–14.

Over the course of about a month, a little over 3800 groups registered. At their peak, more than 400 groups joined in a day, tailing off over the weeks as groups have stabilised and people have joined existing groups rather than start more…

![Mutual Aid registrations](/covid-19/mutual-aid-registrations.png)

Not all of these are mutual aid groups (defined by their horizontal structure and ideologies), but nearly all are volunteer groups looking after the vulnerable in their communities.

_NB. As you might expect with an open data set, a number of religious groups and opportunist individuals have added themselves with the hopes of raising their own profile (in ways unrelated to aid). There’s still quite a bit of manual cleaning to do if we want to identify those and filter them out._

#### Organising volunteers

Each registration with Covid-19 Mutual Aid UK contains a group name, a location description, and a URL. The URL is particularly interesting, as it gives us an insight into the tools people are using to assemble and communicate with their volunteer groups.

_The data below also includes from 216 local councils, and 580 halo communities created specifically for coronavirus support._

![Group organisation tools](/covid-19/group-organisation-tools.png)

It’s pretty clear that facebook groups are taking the lion’s share of this, and there’s some supporting reasoning for that: They’re well understood, easy to find, easy to administer, and most people already have an account. Low friction is key to building communities quickly...

Looking at registrations over time, we see a similar pattern to total registrations, reflected in the facebook groups:

![Registrations by tool](/covid-19/registrations-by-tool.png)

Council and halo categories here are special cases. They’re drawn from datasets that were imported on specific days.

* Halo created all their coronavirus communities in London on 21st March.
* Council hub data came from a crowdsourced [dataset of council hubs](https://docs.google.com/spreadsheets/d/1uwcEbPob7EcOKBe_H-OiYEP3fITjbZH-ccpc81fMO7s/edit#gid=1418426695) (assembled by [Paul Bowsher](https://twitter.com/boffbowsh) and colleagues at [TheyHelpYou](https://www.theyhelpyou.co.uk/)), and imported on 10th April.

These special cases aren’t volunteer groups, but they do form a part of the overall picture regarding where and how help is being organised.

NB. the council hub data was subsequently shared with GOV.UK, and it now supports a local volunteering opportunities service: https://www.gov.uk/coronavirus-volunteer-local

We don’t have a straightforward way to determine when those council hubs were created — some are mentions on a long-standing page, others are whole new aspects of the site.

Exclude facebook groups, halo communities and council hubs, and the next biggest group are ‘website’. Many of these are a traditional websites — run by groups or companies, with pointers to a number to call, or an email address. Some are more sophisticated…

In a thriving [group admins](https://www.facebook.com/groups/151925132663139) group on Facebook (6.8k members at the last count), helpers share questions and advice about the best tools to use and the best ways of working:

* Groups like [LocalHelpers](https://localhelpers.org/), [Reach UK](https://uk.communitydeliverynetwork.org/), [Huddle Puddle](https://huddle-puddle.com/), [GetLocal](https://www.getlocal.org.uk/), are building tools that groups can use to manage offers and requests for help.
* For the difficult question of finance and payment, some are using [Open Collective](https://opencollective.com/) (a tool for building sustainable communities), some are teaming up with local charities or organisations that already have these facilities, others are using established payment services such as [PayPal](https://paypal.com/), [Square](https://squareup.com/), or [SumUp](https://sumup.co.uk/), [iZettle](https://izettle.com/).
* Groups such as the [PPE Maker Network](https://www.ppemaker.net/) are collaborating on the construction and distribution of safety equipment for volunteers.
* There are conversations around insurance, shared safety information, mental health, and outreach to people who are not connected to the internet...

The Coronavirus Tech Handbook [Volunteering & Organising](https://coronavirustechhandbook.com/volunteering) pages have details of many more tools, and advice being shared across groups.

#### Group sizes

As Facebook groups make up the bulk of the data, you might think they’d bring with them the promise of data about the volume of volunteer activity in an area. We should be cautious about drawing figures from them for the following reasons:

* Volunteers may join more than one local group (and there are plenty of good reasons for doing so), and so are likely to be counted multiple times across different groups. At scale this significantly reduces our confidence in the volume of activity in an area. _Without access to volunteer identities, this is difficult to resolve, and volunteer identities should be protected._
* Not all groups were originally COVID-19 support groups. They may have many inactive members, or members who joined for community reasons before the group registered.
* Not everybody in each group is a volunteer. There are also large numbers of people who are not yet actively participating, and also people who have joined to seek help.
* Groups have their own ‘catchment areas’ — varying from entire cities to just a few streets. If the size of a group could be calculated, it would still needs to be adjusted for the area it covers, and the population density there.
* People shouldn’t travel far, but some volunteers will be making their transport capabilities available to groups (ie. to fetch supplies over distances that the vulnerable cannot cover) and may therefore come from outside the area that a group is helping. This also reduces our confidence in group size / catchment area calculations.

Anecdotal accounts suggest there are many more volunteers than people in need of help in some groups. (This is a wonderful finding, if not yet supportable with hard data!)

So where are volunteers to be found now? Well, activity in the [group admins](https://www.facebook.com/groups/151925132663139) group on Facebook suggests that groups themselves are still busy and a great way to volunteer. Many of the groups themselves are now registered with their local council hubs, listed in the [TheyHelpYou](https://twitter.com/theyhelpyouuk) [Council Hubs dataset](https://docs.google.com/spreadsheets/d/1uwcEbPob7EcOKBe_H-OiYEP3fITjbZH-ccpc81fMO7s/edit?usp=sharing), and searchable at this GOV.UK service:

* 🌐 https://www.gov.uk/coronavirus-volunteer-local

## Cleaning up the data

Volunteers have provided all the data we’ve seen so far and this, of course, comes with a degree of human error. Cleaning up the group information registered with Covid Mutual Aid UK has been challenging for a number of reasons…

There’s enough for a full article, so watch this space for a post about it all.

## Mapping the groups

So, having skipped the duplicates, applied the updates, and added all the new records, what does the result look like?

The volunteer groups map at helpisavailable.org.uk showed our full data set of volunteer groups operating across the UK, helping those in isolation or who could not otherwise get what they need...

![HelpIsAvailable.org.uk volunteer groups map](/covid-19/help-is-available-map.png)

As mentioned earlier, [Rob Fryford](https://twitter.com/fryford)’s map merges our source with data showing areas of deprivation, to help guide volunteer and relief efforts.

* 📌 [Volunteer groups and areas of deprivation](https://fryford.github.io/coronasupport/index.html)

![Volunteer groups and areas of deprivation](/covid-19/rob-fryford-map.png)

[Police Rewired](https://policerewired.org/) and [ESRI](https://www.esriuk.com/en-gb/home) are collaboratively building a dashboard to help connect local policing teams with volunteer groups in their policing area.

* 📌 [Community policing dashboard](https://www.policerewired.org/home/covid-19/community-policing)

![Community policing dashboard](/covid-19/esri-dashboard-map.png)

The full data set is available to explore through [Police Rewired](https://policerewired.org), and you are more than welcome to make use of it:

* 📌 [Volunteer communities map and data](https://www.policecoders.org/home/covid-19/communities)

## Police Rewired

[Police Rewired](https://policerewired.org/) is a group for volunteer professionals, students, academics, developers, designers, and creative problem-solvers who want to develop tools and work on projects in public safety and crime.

If you’d like to take part, or you’re already working on a voluntary project in public safety, we’d love to hear from you!

![Police Rewired poster](/police-rewired/police-rewired-poster.png)
