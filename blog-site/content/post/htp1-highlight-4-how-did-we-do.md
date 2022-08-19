---
title: "Hack Highlight #4: How did we do?"
date: 2013-06-14T00:00:00Z
Tags: [ "Necropost", "policing", "crime", "technology", "civic tech", "Hack the Police", "Metropolitan Police", "QOS", "survey", "feedback", "app", "victim care", "service" ]
Categories: [ "necropost", "article", "police rewired" ]
Series: [ "hack the police 1" ]
---

*This is a necropost, resurrected from an old blog. To find out more about Hack the Police events, civic tech, and policing technology, visit: [Police Rewired](https://policerewired.org)*

# How did we do?

Rory was the first person to explicitly state in his presentation something we were all thinking:

> Police officers care deeply about the victims of crime.

That's why they go out every day to do what they do - to face not only danger, crime and disorder, but also the endless reams of bureaucracy and paperwork, seemingly invented to prevent the police from helping people.

The police service currently relies on paper-based feedback, or telephone calls to find out just how well teams, departments and officers are performing. That makes it very difficult to record and analyse the thoughts, feelings and opinions of large swathes of those who interact with police - simply because there isn't the capacity.

Rory's solution is much better suited to scaling quickly and much easier for members of the public to participate in - making it quick, easy, and cheap to give, receive and analyse feedback - and linking that feedback to specific incidents.

His hack, aptly entitled **How Did We Do?** does just that. It's an app that can be used by police officers or members of the public to take or give feedback. It collates that data, and makes it available to the appropriate teams.

![How did we do? Feedback welcome](/necro-images/htp1-how-did-we-do-1.jpeg)

## Challenges

Rory's system relies on 2 components: the app, which interacts with the public, and a back-end services that retrieve, store, and present the feedback for analysis. That creates 3 challenges:

* **Distribute the app:** As this is a public-facing app, this challenge is overcome: we can use the regular public-facing app stores.
* **Store the data:** Depending on the anonymity of the data, there are various levels of challenge to overcome. If, as I suspect, the data recorded runs the risk of representing personally identifiable information, then this is going to have to be stored in a secure server (likely IL3), which means it will have to sit inside PNN (the Police National Network).
* **Communicate between server and app:** Again, as the server will likely sit inside a force network, reaching it represents a significant hurdle. There are well understood ways and means to do this, and plenty of advice from the home office and GCHQ on the matter - but no apparent will to actually perform this piece of work and stand up a gateway.

The over-arching challenge here, then, is to generate the interest and will from the departments and contractors that control force networks, to allow the implementation of a gateway.

## Open source software

It's interesting to note that the components required to build the gateway are a series of VMs, each hosting freely-available and open source software to provide the various security functions required of it. The cost of building and maintaining it is negligible as compared to the staggering size of the contracts in place for today's IT systems. It is widely acknowledged that those systems offer poor value - and in many cases actually impede the work police officers do.

## New skills

Even this incredibly simple app that directly feeds into public confidence and police performance is held up by bureaucracy - fueled by the distaste of incumbent suppliers and contract negotiators for flexibility or change.

As I've stressed in previous posts on this topic, police services could cut out this blockade and deliver new apps and services to police and public quickly, efficiently and at far less cost - simply by employing staff with technical skills - and will continue to argue for this.

In the meantime, we will continue to develop and innovate - as there's still no better argument for change than being able to demonstrate new skills, benefits, cost savings and rewards for police and the public. 

Ultimately, we all want to make the world a better, safer place. The question is how to persuade the decision makers in policing IT that they should prioritise that as highly as we do.

*To find out more about Hack the Police events, civic tech, and policing technology, visit: [Police Rewired](https://policerewired.org)*