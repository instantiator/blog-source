---
title: "Policing data interventions"
date: 2019-03-05T00:00:00Z
Tags: [ "data", "c#", "policing", "DataScience", "conversion" ]
Images: ["/police-rewired/ipscj.png"]
Categories: [ "necropost", "article", "police rewired", "hack" ]
---

*This is a necropost, resurrected from an old blog. To find out more about Hack the Police events, civic tech, and policing technology, visit: [Police Rewired](https://policerewired.org)*

# Policing data interventions

[Police Rewired](https://policerewired.org/) recently worked with the [IPSCJ](http://www.ipscj.org/) on a data project with some unique challenges.

Across the crime fighting community, data is collected in any number of different forms. It’s found in spreadsheets, databases, custom build applications, plain text, CSV, emails and more.

{{< figure src="/police-rewired/ipscj.png" >}}

**The Institute for Public Safety, Crime and Justice** (IPSCJ) undertake research and evaluation work with agencies and services across policing, local authorities and justice. The IPSCJ are currently examining an intervention model designed to improve outcomes for vulnerable people, and need to be able to bring case file data from different agencies together.

**Police Rewired** are a volunteer group for developers and designers who want to give a little back.

## The problem?

Everything they need is spread across multiple workbooks, with multiple sheets. It needs to be collated, understood, and summarised to illustrate the changes at individual level and trends over time.

Outcome data from one agency is in a dozen sheets of one workbook, while case summaries are in another workbook, without shared IDs.

It was estimated to take 3 full days of (gruelling) manual work to find each name in the summary file, locate the matching entry in each sheet of the source workbook, process and extract the important data, and produce a comprehensive data sheet. It’s no small task — and the IPSCJ are looking for ways to improve on that, in terms of both efficiency and ensuring accurate results.

Of course, this is sensitive data, so it comes with a caveat: only staff at the IPSCJ may see the content of the sheets, as they contain personal information about the people they’re working with.

## 3 days to beat!

What does this challenge look like to a civic tech volunteer?

_My name is Lewis. I’m a professional developer and a volunteer. I’ve had 15 year’s experience in software development, and I was glad to get started!_

The first thing I recognised was that there’s a wealth of data locked away in those dozen sheets of the first source workbook. It needs to be extracted and understood before summaries can be created. The data is unwieldy. Rows and columns are arranged for manual use, data is in multiple sheets, and the merge depends on an index that’s composed of names and a date of birth (that were all entered by hand).

I couldn’t see the data, so I had to work from column headings and a few judicious questions about the format. Rather than working on the sheets myself, I was building a tool so that IPSCJ staff could do it themselves.

Instinctively I treated all my inputs as read-only. The tool would have to write out a separate copy of the final summary rather than put the source data at risk. This turned out to be an important safeguard, as we iterated on the design several times before we could say for sure it was doing everything the IPSCJ needed.

## TL;DR the solution

In 3 hours, we built several iterations of a tool that could read rich information from the source data sheets, identify rows it could match in the target summary sheet (allowing for inconsistencies in the typing of names), then construct and append summaries to each matching row.

* The total run time came in at under 30 seconds.
* We saved 3 days of gruelling work for an IPSCJ staff member.
* We removed the risk of human error in matching and summarising entries.
* The tool can be modified and reused for similar work.

> Working with Police Rewired has been great — they respond super fast, have a great understanding of the context of policing and the pace required on projects, and are really enthusiastic, positive people. Their development of some code pulled two messy datasets of case files together in minutes — their 3 hours work saved us at least 3 days of data cleaning, and is definitely more reliable. Plus we can use it again next time!

## The fine detail

I worked in C#.

It’s my tool of choice for complex problems, as it’s clear and concise — and it comes with some great libraries through NuGet (particularly for manipulating Excel). The IPSCJ work in a Windows environment, and needed something that they could use without a complex setup, so I chose to build the project as a .NET Core console application.

There were 6 core iterations for this project, each adding a capability to the tool:

1. Read a single source sheet, identify the correct rows and columns, extract the data contained there and hold it in a data structure to work with later.
1. Read all of the source sheets, hold the data from each in a data structure that’s indexed by the sheet.
1. Read the target summary sheet, identify the correct rows and columns for each subject, and where it is appropriate to add more columns for summary data.
1. For each subject found in the target summary sheet, compose a summary from source data — matching names and dates of birth to link records across sheets.
1. Modify the target summary sheet in memory, adding new summary items in the appropriate columns.
1. Write out the whole target summary sheet to a new file.

## So what were the key challenges?

**Names.** Police collected data by hand, and so did the IPSCJ. The format of names is a tricky problem — especially when people record them without agreeing a standard. Names can be written in either order (starting with first name or starting with surname, sometimes comma-separated). Surnames might be hyphenated — and sometimes hyphenated surnames are truncated.

There are some good libraries for dealing with names. I’ve worked with one in the past called [NameParser](https://github.com/binaryfog/NameParser) by [Catalin Hatmanu](https://github.com/binaryfog). It’s a great tool for managing names as a complex structure. In this case though, after a short conversation, it became clear that I only had a few special cases to handle.

I opted to manage it manually. Names from the source sheets were comma separated, surname first. Names from the summary sheets were forename first and not comma separated. I split each name by comma and then whitespace. I extracted the first name and surname and discarded any middle names. What about hyphenated names? As these are sometimes truncated, I deliberated only kept the first part of any hyphenated names.

All things considered, although this was a little lossy, I was matching on names and dates of birth — and a quick test revealed that there were no double-matches with the processed names that could put the integrity of the data at risk. _Good enough for this project!_

**Excel.** There are a number of different ways to read from and write to Excel workbooks in .NET. I opted for [NPOI](https://www.nuget.org/packages/NPOI/), [maintained](https://github.com/tonyqus/npoi) by [Tony Qu](https://github.com/tonyqus) and based on Apache’s [POI](http://poi.apache.org/) project. It’s superb, quick to get going with, remarkably good at what it does, and works just fine with .NET Core.

Detecting the last row in each sheet was sometimes harder than it could have been. Not every set of records ended with a blank row. Some had totals. Some totals weren’t marked in the first column. I had to be careful, and examine the whole row for evidence that the core data was finished — or identify keywords that would indicate there was no more data.

The feedback cycle made this possible. Having the user available to answer questions about the data sped up the work significantly.

* I made some best guesses at the content of the data, based on column headings I had.
* We added some fake sample records to work with and I built the tool to handle them.
* The IPSCJ ran the tool on real data, and checked for edge cases.
* This was really speculative, and needed some creative thinking at both ends to figure out what might be unusual about the data and how it’s formatted.
* We tried to detect edge cases — records that weren’t matched, records we weren’t expecting to find.
* For each type of edge case that hadn’t been processed properly, we were able to iterate on the tool and try again.

**The outcome was a tool that the IPSCJ were able to use to process their data in just 30 seconds. It took 3 hours to create, and saved 3 days of work. Moreover, the code we’ve created is reusable, and can save more time in future.**

I’m pleased that Police Rewired were able to make a positive intervention for this project.

_If you’d like to know more about what we do, or join one of our open source projects, check out our site and [join our community](https://policerewired.org)._

![Police Rewired](/police-rewired/police-rewired-poster.png)
