---
title: "Building an AWS Lambda in C#, part 5: S3"
date: 2021-04-19T18:00:00Z
draft: false
tags: ["coding", "c#", ".net", "aws", "lambda"]
categories: ["coding", "tutorial"]
images: ["/csharp-aws-lambda-tutorial/000-heading-img.png"]
---

In previous parts, we've built a Lambda that can query the OpenWeather API, using a secret key; and in this part we'll extend it to write that data to S3.

# Let's build an AWS Lambda in C#

## Part 5: Writing to an S3 object

As an example, we'll write the data our Lambda retrieves into an object (ie. a file) in an S3 bucket, so it can be analysed later. We could just as easily store it in an RDS or DynamoDB database instance.

### Create and configure an S3 bucket

First we'll create a new S3 bucket where our Lambda can store its results, and then we'll provide it with a permissions policy that allows the Lambda to get and put objects in it.

* Visit the S3 service in AWS console
* Tap `Create bucket`

![Create an S3 bucket](/csharp-aws-lambda-tutorial/010-create-s3-bucket.png)

* Give your bucket a **name**, eg. `sample-lambda-storage`
* Check the **region**, and other defaults, look right to you
* Ensure **block *all* public access to the bucket** is selected - this bucket is for our Lambda only
* Optionally enable **bucket versioning** if you want to store every version of every file you overwrite (impacts storage used over time)
* Optionally enable **default encryption** if you want S3 to encrypt every file by default
* Tap `Create bucket`

#### Set the bucket permissions policy

In order to control exactly what can access objects inside the bucket, it has a permissions policy - which we'll edit now, to allow your Lambda to read and write to it.

* Visit the **S3** service in the AWS console if you're not there already.
* Choose **Buckets** to see a list of all buckets in the account.
* Click the name of your new bucket (sample-lambda-storage).
* Choose the **Permissions** tab.

![S3 bucket permissions](/csharp-aws-lambda-tutorial/011-s3-bucket-permissions.png)

* Scroll down to the **Bucket policy** section.
* Tap `Edit`

AWS does provide a policy generator, but in this case it's much easier to understand what's going on by providing the policy in text form.

* Copy/paste the policy below into your bucket policy.
* Tap `Save changes` to set the new policy.

```json
{
    "Version": "2012-10-17",
    "Id": "SampleLambdaStoragePolicy",
    "Statement": [
        {
            "Sid": "statement-1",
            "Effect": "Allow",
            "Principal": {
                "AWS": "arn:aws:iam::747647019788:role/sample-lambda-role"
            },
            "Action": "s3:ListBucket",
            "Resource": "arn:aws:s3:::sample-lambda-storage"
        },
        {
            "Sid": "statement-2",
            "Effect": "Allow",
            "Principal": {
                "AWS": "arn:aws:iam::747647019788:role/sample-lambda-role"
            },
            "Action": [
                "s3:GetObject",
                "s3:PutObject"
            ],
            "Resource": "arn:aws:s3:::sample-lambda-storage/*"
        }
    ]
}
```

![Bucket policy (set)](/csharp-aws-lambda-tutorial/013-s3-bucket-policy-set.png)

There are a few things to note about this policy:

* It has an **Id**, which ought to be unique.
* It's broken down into 2 statements, each of which has an **Sid**, which ought to be unique, too.

  > NB. The policy generator helps to create unique values for these IDs. We're using simpler values (`statement-1`, `statement-2`) for the sake of visibility. You could also give them meaningful names.

* The first statement permits our Lambda to see a list of all objects in the bucket.
  * The **Principal** is set to the ARN for the `sample-lambda-storage` role - which our Lambda assumes when it is running.
  * The statement *grants* the principal a permission (**Effect** is `Allow`).
  * The permission is to see the items in the bucket (**Action** is `s3:ListBucket`).
  * The permission is for the whole bucket (**Resource** is the ARN for the whole bucket).

* The second statement grants our Lambda permission to get and put objects from and to the bucket.
  * The **Principal** is set to the ARN for the `sample-lambda-storage` role again.
  * The statement *grants* the principal a permission (**Effect** is `Allow`).
  * The permissions are to get and put objects (**Action** is a list of `s3:GetObject`, `s3:PutObject`).
  * The permission is for objects inside the bucket (**Resource** is the ARN for the bucket suffixed with `/*` to indicate it applies to items inside the bucket).

This policy is broken into two statements because, as you can see above, the first statement applies to a slightly different **Resource** (the bucket itself) than the second (items inside the bucket).

These are a simple set of permissions, and will do for our project.

> There are some other permissions you could grant. It's even possible to permit `PutObject` without `GetObject` (and this might allow you to create a process that can submit data without ever being able to leak data from a bucket).

### Using the AWS library to get and put to S3

Now that you've created and configured the bucket, we can update our Lambda to make use of it.

* Open up the solution in your .NET IDE, and add the nuget package: `AWSSDK.S3`

![Adding the AWS SDK for S3 in Nuget](/csharp-aws-lambda-tutorial/014-add-aws-sdk-s3-nuget.png)

With this package, the Lambda will be able to perform `PutObject` and `GetObject` operations against your new S3 bucket.

Now open up `Function.cs` and add a new method to your `Function` class:

```csharp
private async Task<bool> PutToS3Async(string bucket, string key, string content, ILambdaContext context)
{
	var request = new PutObjectRequest
	{
		BucketName = bucket,
		Key = key,
		ContentBody = content
	};

	using (var s3 = new AmazonS3Client(RegionEndpoint.EUWest2))
	{
		var response = await s3.PutObjectAsync(request);
		if (response.HttpStatusCode == HttpStatusCode.OK)
		{
			return true;
		}
		else
		{
			context.Logger.Log($"{response.HttpStatusCode} encountered putting: {bucket}:{key}");
			return false;
		}
	}
}
```

A few things to note about the new `PutToS3Async` method:

* The method runs asychronously, as it makes asynchronous calls to S3.
* First it constructs a `PutObjectRequest`, called `request`, containing details of the bucket, key (filename), and content to write.
* Then it constructs an `AmazonS3Client` in the right region to do the work.
* It passes the `request` to the client's `PutObjectAsync` method, and waits for a response.
* It returns true if the response suggests it succeeded, and false otherwise.

Now, it's time to add a few extra lines to the `FunctionHandler` method. Here's the full method, now:

```csharp
public async Task<string> FunctionHandler(string input, ILambdaContext context)
{
	context.Logger.LogLine("Querying OpenWeather for: " + input);
	var weatherKey = Environment.GetEnvironmentVariable("WEATHER_API_KEY");

	// (!) Injecting strings into your query without checking them first is dangerous. Don't do it in production!
	var query = $"https://api.openweathermap.org/data/2.5/weather?q={input}&appid={weatherKey}";
	using (var http = new HttpClient())
	{
		var output = await http.GetStringAsync(query);
		var bucket = "sample-lambda-storage";
		var key = $"weather_{DateTime.Now.Ticks}.json";
		var stored = await PutToS3Async(bucket, key, output, context);
		var msg = stored
			? $"Successfully stored weather data: {bucket}:{key}"
			: $"Failed to store weather data.";
		return msg;
	}
}
```

The new lines in `FunctionHandler` allow it to make a call to PutS3Async with the data received from the weather API call, and this causes that data to be written to an object (file) there.

* The `key` variable is constructed using `DateTime.Now.Ticks` - a quick and easy way to get a short timestamp to append to the filename.
* `PutToS3Async` returns `true` if it succeeded, and so the `string` returned from the Lambda reflects this indication of success (or not).

#### Test the lambda again

Try it now, with:

* `deploy.sh`
* `test-a-city.sh`

The output has changed, and is now a simple string telling us if it succeeded or not. Here's a sample response:

```text
Successfully stored weather data: sample-lambda-storage:weather_637545441697515760.json
```

![Test write to S3](/csharp-aws-lambda-tutorial/015-test-write-to-s3.png)

The real work of the Lambda has shifted to storing the weather data it retrieve in the `sample-lambda-storage` bucket. Let's check there:

* Visit the S3 service in the AWS console.
* Click into your bucket, and select the **Objects** view.
* You should see your file listed there.
* Check the box next to it, tap the `Actions` button, and choose `Download`

![Download the file from S3](/csharp-aws-lambda-tutorial/016-download-file-from-s3.png)

You can now take a peek at the file itself to make sure it's the JSON data you're expecting. It'll look like rather a lot of JSON, all on the same line:

```json
{"coord":{"lon":-0.1257,"lat":51.5085},"weather":[{"id":804,"main":"Clouds","description":"overcast clouds","icon":"04n"}],"base":"stations","main":{"temp":284.86,"feels_like":284.07,"temp_min":284.15,"temp_max":285.93,"pressure":1018,"humidity":76},"visibility":6000,"wind":{"speed":3.6,"deg":90},"clouds":{"all":95},"dt":1618947215,"sys":{"type":1,"id":1414,"country":"GB","sunrise":1618894425,"sunset":1618945477},"timezone":3600,"id":2643743,"name":"London","cod":200}
```

If you wanted to, you could reformat it to make it a little more readable, or use it in another service, or another Lambda.

```json
{
    "coord": {
        "lon": -0.1257,
        "lat": 51.5085
    },
    "weather": [
        {
            "id": 804,
            "main": "Clouds",
            "description": "overcast clouds",
            "icon": "04n"
        }
    ],
    "base": "stations",
    "main": {
        "temp": 284.86,
        "feels_like": 284.07,
        "temp_min": 284.15,
        "temp_max": 285.93,
        "pressure": 1018,
        "humidity": 76
    },
    "visibility": 6000,
    "wind": {
        "speed": 3.6,
        "deg": 90
    },
    "clouds": {
        "all": 95
    },
    "dt": 1618947215,
    "sys": {
        "type": 1,
        "id": 1414,
        "country": "GB",
        "sunrise": 1618894425,
        "sunset": 1618945477
    },
    "timezone": 3600,
    "id": 2643743,
    "name": "London",
    "cod": 200
}
```

#### Conclusion

Congratulations! You've created a Lambda that fetches and stores current weather information whenever it is triggered.

In the next part, we'll discuss triggers, and how you might schedule your Lambda to run regularly.