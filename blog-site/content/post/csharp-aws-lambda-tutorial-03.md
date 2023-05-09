---
title: "Building an AWS Lambda in C#, part 3: APIs and secrets"
date: 2021-04-17T18:00:00Z
draft: false
tags: ["coding", "c#", ".net", "aws", "lambda"]
categories: ["tutorial"]
images: ["/csharp-aws-lambda-tutorial/000-heading-img.png"]
thumbnail: "/csharp-aws-lambda-tutorial/000-heading-img.png"
series: ["csharp-aws-lambda-tutorial"]
---

In part 2, we build a Lambda function, deployed and invoked it; and in this part, we'll extend it to communicate with an API using a secret key.

# Let's build an AWS Lambda in C#

* Source code for the final project is available on GitHub: [instantiator/sample-lambda-function](https://github.com/instantiator/sample-lambda-function)

## Part 3: Accessing an API with a secret API key

Let's build something a little more sophisticated than the default "string upper-casing" function. Lambdas often need to work with information elsewhere - perhaps data that's accessible through an API.

In this part, we'll modify our sample Lambda function to read some weather data from an API. We'll be using the FREE tier of the OpenWeather API, to read [current weather data](https://openweathermap.org/current).

The OpenWeather API requires an API key. Helpfully, this allows us to illustrate ways you can manage secrets in your deployed services.

### Reading weather data

Feel free to modify, skip, or just read this example if you'd rather not sign up to OpenWeather. See: [pricing details](https://openweathermap.org/price)

* First, sign up to get an OpenWeather API key: https://openweathermap.org/price

#### Secrets as environment variables

You shouldn't include secrets, such as API keys, in source code that could ever appear in a public repository - as they could then be used without your consent. Including them alongside your code is generally a bit of a risk - and it's far easier to reason about them in isolation.

AWS Lambda has some facilities that allow us to manage secrets, and to provide them to our code as environment variables. We can also provide those environment variables locally when testing.

You can provide environment variables to the Lambda through the AWS web interface.

> NB. If you'd rather do it from the command line, you can use the `--environment-variables` option to provide the various secrets when you deploy your lambda. Provide them as key/value pairs in this format: `<key1>=<value1>;<key2>=<value2>` etc.

> You could also add an `environment-variables` key in the `aws-lambda-tools-default.json` file inside your project, but be careful not to include your secrets in code you then share to a public repository!

The sample project relies on manual (click-ops) configuration of the secrets through the AWS console, so that they don't have to be included in the deploy script or json configuration files.

> NB. You could also do something a little more advanced, like placing your secrets in the **Parameter Store** (found in the **AWS Systems Manager**). That's a little too complex for this example, and likely more useful for secrets that are regularly modified or those that might need to be shared between different services. For our purposes, environment variables provided by the Lambda service will do just fine.

#### Adding the weather API key as a secret

* Visit the **Lambda service** in the AWS console.
* Click into your **SampleLambaFunction** from the list of functions.

![Lambda list on AWS](/csharp-aws-lambda-tutorial/005-lambda-listed.png)

* Choose the **Configuration** tab
* Choose **Environment variables** from the configuration options
* Tap the `Edit` button to add some environment variables
* Tap `Add environment variable`
* For key, put: `WEATHER_API_KEY`
* For value, put the API key provided by the OpenWeather API
* Tap `Save`

The API key will now be available to your lambda, in the environment variable called `WEATHER_API_KEY`.

#### Providing the weather API key locally

When testing your Lambda locally, you'll also need the environment variable set.

If testing from your IDE, you'll need to create a **Run Configuration** in the settings for the **SampleLambdaFunction.Tests** project, and provide the **Environment Variable** `WEATHER_API_KEY` there.

![Run configuration](/csharp-aws-lambda-tutorial/003.5-run-configuration.png)

If testing from the terminal, you'll need to ensure you've exported the environment variable first:

```
export WEATHER_API_KEY='the-weather-api-key-goes-here'
dotnet test
```

#### Reading the weather data

Let's modify the Lambda to read weather data. We'll configure the Lambda to accept a string as input, with the name of a city.

> NB. It is often dangerous to accept unconstrained strings as inputs, especially if you're going to copy them into URLs or database queries. **Don't do this in production!**

The URL of the weather API we're going to use is:

```url
https://api.openweathermap.org/data/2.5/weather?q={city name}&appid={API key}
```

First, we'll take a look at the output we get from this endpoint - with a simple update to our Lambda:

```csharp
/// <summary>
/// A simple function that accepts a city name, and queries weather data for that city.
/// </summary>
/// <param name="input">a city name</param>
/// <param name="context"></param>
/// <returns></returns>
public async Task<string> FunctionHandler(string input, ILambdaContext context)
{
	context.Logger.LogLine("Querying OpenWeather for: " + input);
	var weatherKey = Environment.GetEnvironmentVariable("WEATHER_API_KEY");
	
	// (!) Injecting strings into your query without checking them first is dangerous. Don't do it in production!
	var query = $"https://api.openweathermap.org/data/2.5/weather?q={input}&appid={weatherKey}";
	using (var http = new HttpClient())
	{
		var output = await http.GetStringAsync(query);
		return output;
	}
}
```

There are a few things to note, here:

* We're taking advantage of `async` operations in C#, and so the footprint of the `FunctionHandler` method has changed a little. It's marked `async` and returns a `Task<string>`. This will be recognised by AWS Lambda, called in an asynchronous context, and awaited. The result is that you'll still receive a `string` when you need it.
* As described, we expect the name of a city in the `input` parameter.
* The context parameter is now used to perform a little logging.
* `Environment.GetEnvironmentVariable` should do as expected, and retrieve the API key we stored in the AWS console.
* `HttpClient` is a simple way to make an HTTP GET request. It has various methods, including `GetAsync` which returns more information about the query and response. `GetStringAsync` is simpler and meets our needs.
* As you can see, the function should return the full response it received from the OpenWeather API.

> NB. `HttpClient` isn't the only way to make HTTP requests. If you're looking for a library to build queries that can map query content and responses between JSON and C# object classes, I highly recommend [RestSharp](https://restsharp.dev/). It's pleasant to use, and makes complex things simple.

Before we can build the entire solution, note that the local test won't compile - as we've changed the footprint of the `FunctionHandler` method. You can update that test quickly now with something that passes (although it's not hugely informative):

```csharp
public class FunctionTest
{
	[Fact]
	public async Task TestWeatherReturnsData()
	{
		var function = new Function();
		var context = new TestLambdaContext();
		var weather = await function.FunctionHandler("London", context);
		Assert.False(string.IsNullOrWhiteSpace(weather));
	}
}
```

With that in place, the test should build. Note that:

* The test also runs in an asynchronous context now and so, in turn, it can make an asynchronous call to the `FunctionHandler` method, and await its result.

#### Test the lambda again

Try it now, with:

* `deploy.sh`
* `test-a-city.sh`

There are a couple of things to note from the output.

1. Returned: a full JSON blob (although it has been escaped) with lots of current weather data for London, UK.
2. You'll also see the logs, and your new log line appears there:
   `Querying OpenWeather for: London, UK`

#### Conclusion

Congratulations! You've created a Lambda that can retrieve and return weather data from the weather API, using a secret key stored safely in AWS.
