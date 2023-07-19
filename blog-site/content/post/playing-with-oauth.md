---
title: "Exploring OAuth"
date: 2023-07-18T17:00:00Z
tags: ["OAuth", "authentication", "sign in", "federated", "authorisation", "authorization", "access token", "authorization code", "redirect url", "scope", "social network", "explore", "tool" ]
categories: ["tool"]
images: [ "/oauth/oauth.png" ]
thumbnail: "/oauth/oauth.png"
---

_OAuth Token Explorer is a tool to explore authentication and authorisation on behalf of a user._

OAuth isn't the most trivial process, but it's incredibly useful for modern applications that interact with social networks or provide sign in. You can use it for federated "sign in with" services, or to take actions on behalf of a user on a social network.

I built [OAuth Token Explorer](https://instantiator.dev/oauth-token-explorer/) to investigate and test the [OAuth 3-legged process](https://learn.microsoft.com/en-us/linkedin/shared/authentication/authorization-code-flow) for getting access tokens.

# Playing with OAuth

It's not immediately obvious how to work with OAuth.

To test an implementation, you'll need to...

* Register an application with an OAuth provider (LinkedIn, Facebook, Google, etc.)
* Create and host an application
* Register your application's redirect URL
* Build a page to initialise an OAuth flow and send your user to the OAuth provider
* Build another page to accept the response from the OAuth provider (containing an authorisation code)
* Build a back-channel process to exchange the authorisation code for an access token
* Provide that access token in the header of API requests to take actions on behalf of the user.

I put together the explorer to act as the application in this process. It's a simple tool to help you initialise an OAuth flow, handle the user authorisation code on return from the OAuth provider, and then craft a `curl` command to exchange it for an access token.

* **[OAuth Token Explorer](https://instantiator.dev/oauth-token-explorer/)**

It's simple to use it as is, but you could just as well fork and host it with [GitHub Pages](https://pages.github.com/) from your own repository. The redirect URL will change automatically based the URL it is being served at.

## Source code

OAuth Token Explorer is open source, and you're welcome to plunder, modify, and adapt it to your needs.

* [instantiator/oauth-token-explorer](https://github.com/instantiator/oauth-token-explorer)
