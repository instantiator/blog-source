---
title: "Dead Person Switches - secrets from beyond the grave"
date: 2021-11-30T00:00:00Z
tags: ["Research", "MSc", "ComputerScience", "Journalism", "Academia", "InvestigativeJournalism", "DMS", "DeadManSwitch", "DPS", "DeadPersonSwitch", "Cryptography", "WitnessEncryption", "TimeLockEncryption", "SmartContract", "SecretContract", "Secret", "SSSS", "TrustNetworks" ]
images: [ "/dps/stone.jpg" ]
categories: ["publication"]
---

_More commonly known as a Dead Man's Switch, a Dead Person Switch (DPS) is a system that can hold a secret on behalf of a person, and govern its release should they become unavailable._

# Dead Person Switches

Use cases for a DPS system include final messages to loved ones, the distribution of assets after death, and the controlled release of a damaging secret to disincentivise an attack on the owner of a DPS (the _subject_). 

This was the subject of my MSc dissertation in Software & Systems Security, which focuses on the needs of an investigative journalist. It's available to download here:

* [Dead Person Switches - with or without trust](/dps/DPS-thesis-LGW.2021-09-01.with-appendices.pdf)

Little formal work exists on the topic, although time-release cryptography (related) is an active field of research.

## How do you build a DPS?

A simple, very high level representation for a Dead Person Switch might look like this:

![High level diagram representing a DPS](/dps/dps-threat-model-scoping.png "High level diagram representing a DPS")

This seems simple enough, but hides a number of underlying questions - particularly around how such a system can hope to keep the subject's secret safe...

### A cryptographic conundrum

_Could you use encryption to protect the secret inside a DPS?_

At face value, a DPS seems to be in conflict with the classic idea of cryptography.

Under ordinary circumstances, a user may encrypt a secret in such a way that they can decrypt it again with a secret key. That key is protected by the user until they need to perform the decryption.

However, the DPS needs to be able to decrypt the secret when the user does _not_ return (and then only under the right circumstances). For classic cryptography, this creates a problem: Where do you keep the key? If you stored it in the same service, then you might as well not encrypt the secret at all - it's recoverable by any attacker (including any insiders who operate your DPS). If elsewhere, how will you protect it there, and how will you trust the new service that stores it?

A number of interesting solutions exist:

* You could store the key in another system.
* You could entrust a friend to keep the key secret until you die.
* You could [fragment your key](https://en.wikipedia.org/wiki/Shamir%27s_Secret_Sharing) and entrust portions of it to a number of different friends.

Each of these proposed solutions relies on a third party that could potentially be compromised, bribed, or legally required to release the key. At least distributing fragments of the key amongst friends could provide a little resilience...

## My contribution

The work I completed for the dissertation is divided into 3 sections:

1. I derived the requirements for a DPS through research, study and survey.
2. I evaluated existing systems against these requirements.
3. I researched contributing components, proposed and evaluated new alternate designs.

## Requirements

Through desk research, study, and survey I derived the following requirements for a DPS:

* **Confidentiality** - A DPS must keep a user's **secret** confidential until it determines it is appropriate to release the **secret**.
* **Awareness** - A DPS must have a mechanism to check the **subject's** well-being, and a method to release the **secret** if the subject fails this test.
* **Timing** - A DPS should not release the **subject's** **secret** early (ie. whilst they are still alive and well), late (ie. too long after the subject has become unresponsive), or never.
* **Resilience** - A DPS must assume the existence of, and protect against, attempts by hostile **threats** to compromise the **secret's** **confidentiality** and **integrity**, and be resilient against attacks intended to compromise its **availability** (CIA properties).
* **Affordability** - A DPS should use affordable technologies to provide its functionality, not relying on resources beyond the means of the target subject group.
* **Durability** - A DPS should be expected to remain operational for a significant amount of time (eg. the lifetime of a **subject**), with continued maintenance (including security patches), support, or upgrade pathways if the technologies in use become obsolete.
* **Explainability** - A DPS must be presentable as a model that the target subject group can understand and trust.
* **Visibility** - A DPS must be able to present evidence that it is operational, to contribute to its deterrent effect.

These then provided a framework for consistently evaluating the existing systems, and new designs.

## Proposed designs

Having explored a variety of options for the implementation of a DPS, I proposed and evaluated three potential designs:

1. A classic micro-services architecture.
2. A distributed application (dApp) built with a smart contract and secret contract.
3. An application of witness encryption.

### Classic design

Designing a DPS using the principles of secure design gave me a strong baseline which I could then compare with existing systems, and the more exotic proposed designs. I presented a (fairly) simple microservice architecture design - clearly illustrating the various components, and easy to reason with.

![A classic microservice architecture design for a DPS](/dps/microservices.png "A classic microservice architecture design")

This has all the strengths and weaknesses of current cloud services. It can be protected from outsiders through access control mechanisms, but has strong vulnerabilities to insiders (including staff at the cloud service provider), legal constraints, and denial of service attacks.

### dApps

dApps show a lot of promise. Networks that can execute smart contracts (such as Ethereum) offer a number of guarantees around availability and reliability that are very important to a DPS. However, smart contracts alone are not enough - it's important to be able to store, protect, and retrieve secrets. Smart contracts cannot keep secrets, as they are execute in a VM that runs on any participating node in their network.

Some solutions hide the subject's secret key in another service. This transfers the risk with the key, and relies on strong controls to protect the new service.

A number of networks, such as the [SECRET](https://scrt.network/) network, have formed in recent years that can support _secret contracts_ - smart contracts that are able to protect their state and inputs from observation by the nodes that execute them. At current time, this is achievable through [Trusted Execution Environments](https://en.wikipedia.org/wiki/Trusted_execution_environment) (TEE). Enclaves inside a CPU (such as Intel's [SGX](https://en.wikipedia.org/wiki/Software_Guard_Extensions)) can protect the confidentiality of secrets, and prove the integrity of their results. Networks such as SECRET execute secret contracts in TEE enclaves on their nodes.

![Activation flow for a DPS composed of a smart contract and secret contract](/dps/smart-and-secret-contract-flow.png "Activation flow for a DPS composed of a smart contract and secret contract")

A design that incorporates a smart contract and secret contract could prove a very promising solution.

### Witness encryption

[Witness encryption](https://eprint.iacr.org/2013/258.pdf) is a particularly interesting area of research - offering encryption schemes that do not rely on a given key to decrypt a secret. The provision of a _witness_, something that conforms to a set of rules (described by a mapping in an NP language), can be used in place of a key.

The development of a witness-based DPS relies on a number of steps, and assumptions:

* [It has been shown](https://eprint.iacr.org/2015/482.pdf) that a valid blockchain could serve as a computational reference clock. (Most cryptocurrency blockchains grow at a steady rate, and valid chains are provable.)
* A valid blockchain of a given length, then, could serve as the witness for a time-lock encryption scheme - effectively making it near-impossible to decrypt a secret with a valid chain of a predetermined length. Effectively making it trivial to decrypt the same secret once a known amount of time has passed.
* Now suppose that we wish the chain to contain proof-of-life for the subject. They commit to transferring a small amount of currency between Wallet A and Wallet B (or back again) each day.
  * **If** this activity on the currency blockchain can be considered a good proxy for aliveness and well-being, and
  * **If** an encryption scheme could require a valid chain of given length _that does not contain evidence of the subject's transaction_ as a witness (and such conditions still lead to a valid witness),
  * **Then** the secret becomes near-impossible to decrypt until the subject is no longer showing signs of life, whereupon it becomes trivial to decrypt.

**This is a very exciting idea!** A passive blob of data that can be distributed publicly protects your secret while you are alive, but becomes easy to decrypt after death. The caveat, of course, is that this is predicated on assumption and speculation. It may prove possible, but there may also be good reasons why such conditions do not lend themselves to witness encryption schemes.

## Conclusions

I was able to evaluate the existing systems and proposed designs against the requirements for a DPS, giving each a score per requirement. Here's a matrix of it for reference:

![A matrix showing 12 existing DPS solutions, and 3 proposed designs - each with their scores per requirement](/dps/matrix.png "Scores for all designs")

**It's pretty clear that the existing systems each have strengths and weaknesses, and that none were consistently strong across the board.**

**The proposed designs represent distinct approaches to the implementation of a DPS, and certainly seem to meet more of the requirements.**

Of the proposed designs, I concluded that the _dApp_ design is the strongest that can currently be implemented.

The _witness encryption_ design presents a strong hypothetical alternative, but does need some further research.

The project opened up some rather interesting questions which might make good avenues for further research, and it's a topic I'd be glad to stay connected with in future.

**If you'd like to know more, feel free to [give it a read](/dps/DPS-thesis-LGW.2021-09-01.with-appendices.pdf) and reach out - I'd be glad to chat about it.**
