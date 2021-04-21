---
title: "Tutorial - Building an AWS Lambda in C#, part 6: Triggers"
date: 2021-04-20T18:00:00Z
draft: false
tags: ["coding", "c#", ".net", "aws", "lambda"]
categories: ["coding", "tutorial"]
---

In part 5, we amended our Lambda to write to an S3 bucket; and in this part, we'll explore triggers to run it regularly.

# Let's build an AWS Lambda in C#

## Part 6: Scheduling your Lambda

Most Lambdas aren't invoked the way we're testing ours... Instead, triggers cause them to run when certain events happen (perhaps a new file in an S3 bucket with data to work on, a timer, or some other input).

The **AWS EventBridge** service can provide scheduled trigger events for a variety of services, including Lambdas.

### Create a trigger

We're going to create a trigger that will run our Lambda once per day, for the city of our choice.

First we'll create it, and schedule it to run every 5 minutes. This will allow us to test that it's working. Then, we'll go back and revise it to run on a daily basis.

* Visit the **Amazon Eventbridge** service in the AWS console.
* Select **Rules** to see all current rules for your account, and tap `Create rule`
* Provide a name, eg. `trigger-sample-lambda-daily`
* In the **Define pattern** section, select **Schedule**
* You could provide Cron expression for a nuanced schedule, but we'll use the **Fixed rate** option.
* Configure the **Fixed rate** schedule to run every **5 minutes**.
* Skip the **Select event bus** section (scheduled events always run on the **AWS default event bus**).

![Trigger schedule pattern](/csharp-aws-lambda-tutorial/017-trigger-schedule-pattern.png)

* In the **Select targets** section, we'll instruct the event to trigger our Lambda.
	* In **Target**, select: **Lambda function**
	* A **Function** selection appears, choose our Lambda: **SampleLambdaFunction**
	* Now expand the **Configure input** options.
	* Select **Constant** input and provide: `"London, UK"`

![Trigger target](/csharp-aws-lambda-tutorial/018-trigger-target.png)

> Correction to the screenshot above: you must enclose `"London, UK"` in quotation marks in order for it to be accepted as a JSON string.

* Finally, click `Create` to create your trigger.

#### Check the logs

Having created the trigger, it'll run every 5 minutes, so wait up to 5 minutes to view the logs.

* Navigate to the **CloudWatch** service in the AWS console.
* There, under **Log groups**, click into the `/aws/lambda/SampleLambdaFunction` group.
* You should find a **log stream** from the past 5 minutes.
* Take a quick look to make sure it seems ok.

Next, we'll check S3 for an ouptut file.

* Navigate to the **S3** service in the AWS console.
* There, under **Buckets**, click into the `sample-lambda-storage` bucket.
* If the Lambda was successful, you should see a new object, created in the past 5 minutes.
* You can select and **Download** the object with the `Actions` menu button to ensure it has the content you expect.

#### Update the schedule

Now that we're satisfied that the scheduled event is working, it's time to adjust it to run a little less frequently.

* Return to the **Amazon EventBridge** service in AWS.
* Select Rules, and click into the new rule, ie. `trigger-sample-lambda-daily`
* Tap `Edit` to modify it, and head down to the **Define pattern** section.

> You can read more about [scheduling expressions](https://docs.aws.amazon.com/lambda/latest/dg/services-cloudwatchevents-expressions.html) to figure out the best for your use.

> Cron expressions are pretty nuanced, and you can learn about their syntax in the [Schedule Expressions for Rules](https://docs.aws.amazon.com/AmazonCloudWatch/latest/events/ScheduledEvents.html) documentation.

We're going to use one of the example cron strings:

```cron
15 12 * * ? *
```

This can be interpreted as a set of positional parameters:

| Minutes | Hours | Day of month | Month | Day of week | Year |
|-|-|-|-|-|-|
| 15 | 12 | * | * | ? | * |

It will run at 12:15pm (UTC) every day.

* Select **Cron expression** and provide the expression: `15 12 * * ? *`

As soon as you provide an expression, the schedule section will display the next 10 upcoming trigger times to help you check your cron expression. If it's correct, you'll see it scheduled to run at 12:15:00 GMT on each of the next 10 days.

![Trigger cron expression](/csharp-aws-lambda-tutorial/019-trigger-cron-expression.png)

* Finally scroll to the bottom, and tap `Update` to confirm the change.

The event has now been altered to run every day at 12:15pm GMT.

#### Conclusion

Congratulations! You've created a Lambda that checks the weather at your chosen city, using a secret API key, and then stores that information in an S3 bucket. You've scheduled an event that will trigger it every day at 12:15pm, and checked that it's working.

#### Where next?

There are plenty of other services your Lambda could interact with, and AWS provide a number of `AWSSDK.*` nuget library packages to help you communicate with other AWS services, too.

> For instance, you might consider establishing a database in RDS and then storing the temperature information for your chosen city there so that you can access it and reason about it.

Hopefully this tutorial has given you a little more information and experience than the usual "hello world" examples, and hopefully some insights into how you could build useful tools using AWS and .NET technologies.