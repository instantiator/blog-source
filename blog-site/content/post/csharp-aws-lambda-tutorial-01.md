---
title: "Tutorial - Building an AWS Lambda in C#, part 1: AWS"
date: 2021-04-15T18:00:00Z
draft: false
tags: ["coding", "c#", ".net", "aws", "lambda"]
categories: ["coding", "tutorial"]
---

At first glance, Amazon Web Services (AWS) can seem impenetrably complex, but it's not so bad once you've found your way around it...

# Let's build an AWS Lambda in C#

**A Lambda** is a lightweight, short-lived, event-triggered process that can run reliably whenever it is needed. AWS Lambdas are perfect for small tasks.

**C#** is a language, with strong typing, for .NET Core. That's one of the runtimes that AWS Lambdas supports. The .NET framework also has some pretty good support for interacting with the AWS Lambda service, which will help us later on in this tutorial.

**An S3 bucket** is a simple file storage instance, where you (or your Lambda) can read and write objects (files).

**In this tutorial,** you'll learn to create a Lambda for yourself that runs on AWS, using C# and .NET tools. It'll use a secret API key to communicate with the [OpenWeather API](https://openweathermap.org/api) to read some data, and then store what it learned in an S3 bucket.

Don't worry if a lot of that sounds like technobabble. Together we'll build a simple Lambda, and hopefully demistify:

* AWS accounts
* Identity and Access Management (IAM)
* AWS Lambdas
* Ways to manage secret API keys
* AWS S3 buckets
* Permissions and polices in AWS

## A Lambda in the wild

![Police Rewired poster](/police-rewired/police-rewired-poster.png)

[Police Rewired](https://policerewired.org) is an open community of technologists, focussed on solving problems in public safety and crime. Our online social footprint spans [Twitter](https://twitter.com/policerewired), [Facebook](https://www.facebook.com/police.rewired/), [LinkedIn](https://www.linkedin.com/company/police-rewired/), [Reddit](https://www.reddit.com/r/policerewired/), and our own Discord server ([invite](https://bit.ly/PoliceRewired-join-discord)).

Distributing news and material, for and about our community, on social media takes a lot of time - so I built a social library service that would do it for us.

**The data source for the Police Rewired social library** is a Google Sheet that contains a set of articles, bookmarks and links of interest to our community. The sheet is published as a CSV file at a known URL.

**At the heart of the project is a Lambda** that reads this CSV data, plans a set of posts, and then shares posts from that plan across all our social media, periodically, until it's time to plan again.

* Source code is available on GitHub: [PoliceRewired/social-distributor](https://github.com/PoliceRewired/social-distributor)

## Our sample code

This tutorial is going to build something with slightly fewer moving parts, but we'll cover a lot of the same ground.

* Source code for the final project is available on GitHub: [instantiator/sample-lambda-function](https://github.com/instantiator/sample-lambda-function)

## Assumptions

This tutorial assumes you have knowledge of a few things:

* **C#** - We'll use simple C# code to build our examples.
* **APIs** - The tutorial refers to use of an API to retrieve some data.
* **Git** - The tutorial refers to code repositories in a few places. You don't *need* this to complete the examples, but it'll help if you are familiar with some of the ideas.

**A significant portion of this tutorial is not coding!** That's because the supporting infrastructure is a really important part of building a reliable, public-facing service.

Although this is a beginner's tutorial, we're going to cover all the concepts you need to know to build the supporting infrastructure for your service. That knowledge will help you to reason about much larger and more complex projects in the future.

When we get to the coding part, if you're feeling confident, feel free to substitute your preferred language and toolchain.

*So, let's get started!*

## Part 1: AWS

The Police Rewired social library runs as a Lambda in AWS, which makes it reliable and easy to manage.

A Lambda is a small piece of code that can be triggered by an event, provided with a small input (such as a small piece of JSON), and responds with a small output.

Lambdas are transient and aren't expected to run for long. (They have a maximum runtime of ~15 mins. By default they time out after 30 seconds.) They're perfect for a short process that makes a few posts to social media and then stops until it is called again.

You could also use lambdas to represent many small tasks that can run sequentially or in parallel. For instance, to read items from a queue, or to store data from another service.

Our Lambda stores its plan in AWS S3 (Simple Storage Service) - which is a simple way to store and retrieve files.

Before we get to the code, it's helpful to understand a few things about how AWS and the services there fit together. Some services have some rather idiosyncratic names, and it can all seem a bit overwhelming at first.

Some AWS services you may already have heard of:

* **EC2** - for virtual machines to run your application on.
* **Fargate** - an EC2 service to run applications in a managed environment.
* **EBS (Elastic Block Store)** - virtual filing systems you can attach to Batch, Lambda, Fargate and EC2 instances.
* **Batch** - for longer running, scheduled jobs.
* **SQS (Simple Queue Service)** - manages queues of events to be delivered to other services (such as Lambdas).
* **RDS (the Relational Database Service)** - managed instances of MySQL, PostgreSQL, MariaDB, Oracle BYOL, or SQL Server.
* **DynamoDB** - a NoSQL database offering.

Here are the services we'll be looking at for this project:

* **IAM (Identity and Access Management)** - This is where you'll create and manage users, roles, profiles, and policies.
* **S3 (Simple Storage Service)** - This is a filing system, where you can store and retrieve files (referred to as Objects) from different instances (referred to as Buckets).
* **Lambda** - This is the service where you can define Lambdas, short pieces of code that are triggered by events.
* **CloudWatch** - This contains a number of services including CloudWatch Logs (where your Lambda and other services can log to), and CloudWatch Events (now moved to Amazon EventBridge) which can be used to trigger your Lambda.

### What's free?

This tutorial shouldn't have a knock on effect on your wallet. What we're building is lightweight and ought to fit into the free tier at AWS. You can find out more about the free tier offerings, here:

* [AWS free tier](https://aws.amazon.com/free/?all-free-tier)

The two services we'll be using:

| Service | Free tier allowance | Free tier duration |
|---------|---------------------|--------------------|
| Lambda  | 1,000,000 free requests pcm; 3,200,000 secs compute time pcm. | Indefinite |
| S3 | 5 GB storage; 20,000 get requests; 2,000 put requests. | 12 months |

### ARNs

Everything you create and use on AWS has an [ARN](https://docs.aws.amazon.com/general/latest/gr/aws-arns-and-namespaces.html) (Amazon Resource Name) which is a unique identity for the object. You can use an ARN to refer to things when you're granting permissions or passing information back and forth. They come in a few variant formats, and can be recognised by the prefix: `arn`

```text
arn:partition:service:region:account-id:resource-id
arn:partition:service:region:account-id:resource-type/resource-id
arn:partition:service:region:account-id:resource-type:resource-id
```

### Regions

AWS is divided into regions, and each region defines the geographical location where your data is stored and services run. They're isolated from each other, and so AWS can make guarantees about where your assets are stored.

There are various reasons why you may wish to choose one region over another, and I recommend you [read more about it](https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/using-regions-availability-zones.html) to make your decision.

For the purposes of this tutorial, everything is conducted in region: **eu-west-2** (that's London, UK)

### Setting up your account

*If you've already set up a service in AWS before, you can probably skip this section. We'll cover the IAM work you need to do to set up some sensible users, roles, profiles, and policies for your new Lambda service.*

**You're going to be creating a few accounts, and ought to give them strong passwords. I'd advise using a password manager to help you keep track of it all.**

AWS provides infrastructure that can support projects far more complex than ours. To do so, it provides the IAM service, offering an elaborate system of users, roles and permissions.

A quick summary of some of the key types we'll encounter in IAM:

* **An account** represents your organisation
* **Accounts** contain IAM users, groups, roles, policies, services
* **Users** have **policies**
* **Users** belong to **groups**
* **Groups** also have **policies** that they apply to all their users
* **Users** and some **services** can assume **roles**
* **Roles** have **policies**
* **Policies** grant **permissions**

When you create a new account on AWS, your credentials grant you access to the whole account as **root**. This is the most powerful level of access. You should give it a complex password, enable 2-factor authentication (2FA), and try to use it as little as possible.

If you ever lose control of your root credentials, you'll need to recover access to the account - whereas, if you lose control of an IAM user, you can quickly disable it and create another. It's better to have some more limited IAM accounts that do regular work, so that if they're compromised they can only do a limited amount of harm.

If you have more than one individual administrating your services, creating an IAM user for each will help you to audit their work, too.

We'll create an IAM user with administrator permissions to work on your services.

There are primarily 2 types of access a user can have in AWS:

* **Programmatic acccess** (a script uses the AWS CLI, SDK, or some other means)
* **Console acccess** (a person signs in through the AWS web console)

We're following a simple model here, and your administrator is going to need both forms of access - so that you can make changes across your account in the console, but also use the CLI to update your Lambda.

Here's a quick layout of the setup we're aiming for:

* Account: eg. `123456789012`
	* User: `sample-admin`
		* Access: `console` and `programmatic`
		* Group: `sample-org-admins`
			* Policy: `AdministratorAccess`
	* Role: `sample-lambda-role`
		* Policy: `AwsLambdaExecute`
	* Lambda: `sample-lambda`
		* Execution role: `sample-lambda-role`

The role we'll create for the Lambda will allow it to access just the things it needs. In this way, it's not possible for a process to overstep its bounds. This is particularly helpful when you're building complex systems and need to reason about the privacy of your data.

#### Creating an administrator account

The first thing you should do is create an IAM account with enough permissions to allow you to do work on AWS.

* Make your way to the **IAM service**
* Choose **Users**
* Tap `Add user`
* Give your user a username, eg. **sample-admin** (or something more specific)
* Choose both: **Console access** and **Programmatic access**

![Adding a user](/csharp-aws-lambda-tutorial/001-add-user.png)

Next, you'll need to give the user a group. Remember, groups come with policies that define their permissions. In this case, the group we need is for administrator accounts, so you might want to create one called: **sample-org-admins**

AWS comes with a number of preconfigured policies, so find and attach the policy called: **AdministratorAccess**

Finally, AWS permits you add some tags to the things you create. These will make them easier to find by any metric you care to use. It's often helpful to tag things by project. It's optional and you can skip it if you prefer.

Having created your new user, it's time to test it out.

* Visit the **Users** section of IAM again.
* You'll see that the new user is listed there, and clickable.
* Click to username to view details of the user.
* Open the **Security credentials** tab.

You'll see a console sign-in link, like this: 

```
https://XXXXXXXXXXXX.signin.aws.amazon.com/console
```

That 12-digit number on the beginning is the AWS account number. Bookmark that link so you can sign in as your IAM user any time you need.

Now sign out, and give it a try.

*From now on, we'll assume that everything you do in the AWS console is done through your **sample-admin** account.*

#### Creating a role for your lambda

Back in the IAM console, it's time to create a role that your lambda can assume when it runs. This will define the permissions that your lambda has, and may also be referenced by other services (such as S3) when defining which roles may access private data stored there.

* Choose **Roles**
* Tap `Create role`

![Creating a role](/csharp-aws-lambda-tutorial/002-create-role.png)

The role needs a trusted entity type to define what can assume the role.

* Choose **AWS service**
* Choose **Lambda**

Next, we'll need to define permissions by selecting a policy. (You could select multiple policies, or create one.

![Role permissions](/csharp-aws-lambda-tutorial/003-role-permissions.png)

An existing policy, **AWSLambdaExecute**, will do for our purposes. This grants your lambda permission to write to **CloudWatch Logs** (to log its output), and **S3** (to read and write Objects in Buckets).

* Search for and select: **AWSLambdaExecute**

As before you could add tags to your role.

In review, you can now name the role.

* Name the role **sample-lambda-role**
* Finish and create the role

#### Conclusion

Congratulations! You've set up the basic infrastructure to support a new Lambda function.

In the next part, we'll build and test a Lambda that can run on your new infrastructure.