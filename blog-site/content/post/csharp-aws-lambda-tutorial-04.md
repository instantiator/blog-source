---
title: "Building an AWS Lambda in C#, part 4: Logs"
date: 2021-04-18T18:00:00Z
draft: false
tags: ["coding", "c#", ".net", "aws", "lambda"]
categories: ["tutorial"]
images: ["/csharp-aws-lambda-tutorial/000-heading-img.png"]
series: ["csharp-aws-lambda-tutorial"]
---

In part 3, we extended our Lambda to communicate with an API, using a secret key; and in this part, we'll explore the logs created when the Lambda runs.

# Let's build an AWS Lambda in C#

* Source code for the final project is available on GitHub: [instantiator/sample-lambda-function](https://github.com/instantiator/sample-lambda-function)

## Part 4: Viewing the logs

> This is going to be a short section - logs are easy to find and analyse in AWS.

Logs in are collated by the **CloudWatch** service, and are grouped into **log groups**, describing the source of the logs. Inside each log group, each instance or session of the source service is then discoverable as a separate **log stream**.

By default, your **SampleLambdaFunction** Lambda has created a **log group** with the same name: **SampleLambdaFunction**

To find your logs:

* Visit the CloudWatch service in AWS.
* Choose Log Groups from the menu.
* Click the log group for your lambda, ie. `/aws/lambda/SampleLambdaFunction`
* Log streams are listed inside the log group, and sortable by latest event time.

![Log groups](/csharp-aws-lambda-tutorial/009-log-groups.png)

* Click a log stream to see inside it.

#### Conclusion

You should now be comfortable locating and examining the log streams from your Lambda (or any other AWS services that you're running).