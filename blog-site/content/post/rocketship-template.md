---
title: "The rocketship template 🚀"
date: 2023-01-08T00:00:00Z
tags: ["AWS", "SAM", "template", "rocketship", "serverless", "api", "gateway", "lambda", "dynamodb", "database", "cognito", "auth", "dotnet", "csharp" ]
images: [ "/rocketship/rocket-mvp.png" ]
categories: ["article"]
---

Presenting a simple template to develop, publish, and test a simple C# service backend on AWS, with serverless Lambda functions, supported by DynamoDb, behind an API Gateway, and protected by Cognito auth.

_Hopefully this will accelerate some early prototyping for some of my projects, and perhaps you'll find it useful as a reference too._

# The rocketship template

I've been giving some thought to building a number of prototype projects for some friends. They need to reflect the realities of hosting on a cloud service provider, exploit the benefits of serverless design, and offer some frequently needed services: serverless lambdas with database support, behind an API gateway protected by an authentication service.

What I came up with is probably not too surprising given the brief:

![A diagram illustrating several services, each with access to a database; behind an API gateway, which has access to an auth service. A web app and mobile app both have access to the API Gateway and auth service, too.](https://raw.githubusercontent.com/instantiator/mvp-rocketship-template/main/documentation/images/rocket-mvp.png "A diagram illustrating several services, each with access to a database; behind an API gateway, which has access to an auth service. A web app and mobile app both have access to the API Gateway and auth service, too.")

It's a nice design, it's pretty simple, and it suits a variety of applications. You're welcome to plunder it on GitHub:

* [instantiator/mvp-rocketship-template](https://github.com/instantiator/mvp-rocketship-template)

Scripts and instructions for setup, building and testing a deployment are included with the repository.

## Some notes

Zones (DMZ and Services) and connections between services here are implemented through IAM access controls.

I instinctively work in C# by default, and that's what I've used for the sample functions in the template. It doesn't need to be .NET services, and you can swap them out for anything else.

I've not implemented any kind of client yet. I've had some good results using [Blazor webasm](https://dotnet.microsoft.com/en-us/apps/aspnet/web-apps/blazor) in the past, but you may have a cool javascript or TS framework of your own in mind.

_If you make improvements and amendments, do please upstream a PR or two!_

