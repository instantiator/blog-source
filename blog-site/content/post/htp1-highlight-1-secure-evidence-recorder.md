---
title: "Hack Highlight #1: Secure evidence recording"
date: 2013-05-25T00:00:00Z
Tags: [ "Necropost", "policing", "crime", "technology", "civic tech", "Hack the Police", "Metropolitan Police", "evidence", "recording", "hackathon", "hack", "app", "infrastructure", "photography" ]
Categories: [ "necropost", "article", "police rewired" ]
Series: [ "hack the police 1" ]
---

*This is a necropost, resurrected from an old blog. To find out more about Hack the Police events, civic tech, and policing technology, visit: [Police Rewired](https://policerewired.org)*

# Securing evidence

This is the first in a series of blog posts where I'll be highlighting the hacks that came out of Hack the Police.

Tim Perry came to the hack with an open mind. He asked many people about where the opportunities were to build an app that would have the best impact on crime fighting and victim care - and then settled down to assemble a **Secure Evidence Recorder**.

Tim's app is a lightweight software alternative to taking paper notes, and waiting for a physical camera to arrive on scene to take photographs. It allows an officer to take their notes, photographs and video evidence with a mobile device - such as a smart-phone.

{{< figure src="/necro-images/htp1-secure-evidence-1.png" alt="Secure evidence recorder screen 1" width="300px" class="inline-image" >}}
{{< figure src="/necro-images/htp1-secure-evidence-2.png" alt="Secure evidence recorder screen 2" width="300px" class="inline-image" >}}

Some of the challenges of secure evidence recording are:
* Where do you store the data once it has been recorded?
* How do you show when and where that data was recorded?
* Does the data stay on the device?
* If so, will the device be seized as evidence?
* How do you make these actions quicker and easier than pen, paper, and physical camera?

Tim's secure evidence recorder addresses many of these problems in a simple and elegant way. He stores the recorded data on a central server, and stamps the data with time and location information. This is then available to officers through a web-based interface back at the station where they can download and exhibit it however they need.

It means the data does not need to stay on the device, and it means the data itself is evidentially sound - as it cannot have been tampered with by the officer after its creation.

Tim spent the full weekend working on the app, and the result is something quick and easy to use. He demoed it to a room full of developers and police officers, who were all impressed by how swiftly he was able to take notes and store information using a mobile phone - including an audience photo. It was pretty clear how being able to take those photographs at the scene would save time and effort waiting for another officer to bring a camera down, and how easily his evidential notes could have been adapted to record a witness statement.

Tim won **Best in Show** for his secure evidence recorder, and has made the code for his solution available on github:

* https://github.com/pimterry/hackthepolice-2013

He's used HTML5 and Apache Cordova (also known as phonegap) to build the app which means it can be used across a range of devices.

![Tim receives his prize from Metropolitan Police Commissioner Sir Bernard Hogan-Howe](/necro-images/htp1-tp-bhh.jpeg)

## So what next?

That's a difficult question to answer. No police force in the UK yet has the infrastructure to support even simple apps. One of the goals of Hack the Police for the [Commissioner's 100](http://c-100.org) was to show just how quick, cheap and easy this is to do. We've achieved that goal: and now we're working on proposals to help make the next steps happen.

The capability to deliver an app is understood by software developers and technicians to be a trivial problem with 3 parts: place the server inside your secure network, secure the connection between device and network, and distribute the app. 

(There are, additionally, requirements for managing the data we record - some of which is personal and must be protected. For those interested, the government's newest procurement programme: [gCloud](http://gcloud.civilservice.gov.uk/) provides an excellent summary of Impact Levels and the requirement to protect services and data.)

App distribution can be handled through any existing private app store solution. The most challenging of those steps is the secure line between mobile device and network - but even that is well understood, and there exists excellent documentation and guidelines to allow this to be implemented very quickly by technical staff. 

However, to do this as a police force you need to overcome several challenges:

* Complex contracts which hinder innovation, requiring lengthy procurement processes and expensive consultancy periods - even when the solution is already known. This makes it very  difficult to use a current provider to do the work.
* The absence of staff who are able to perform unplanned technical work. This would render the entire project simple and affordable - but police forces have relied on 3rd-party contractors for a very long time, and as a result the skill base and knowledge required to take action for themselves has deteriorated to almost nothing.

Of course, once the infrastructure is in place, this opens the gateway for all manner of affordable improvements from small enterprises who can have a great impact on the cost and quality of policing.

Those are the issues we need to work around - and that's where we're working on creative solutions to help make these things happen - so we can help victims of crime the way we know we should.

*To find out more about Hack the Police events, civic tech, and policing technology, visit: [Police Rewired](https://policerewired.org)*