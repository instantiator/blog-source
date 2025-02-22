---
title: "Bucket List - the bucket that wouldn't die"
date: 2025-02-22T11:00:00Z
draft: false
tags: ["coding", "infrastructure", "aws", "amazon-web-services", "s3", "bucket", "empty", "delete", "cli", "aws-cli", "script", "bash", "shell"]
categories: ["tutorial"]
images: ["/bucket-list/bucket-list-graphic.png"]
thumbnail: "/bucket-list/bucket-list-graphic.png"
---

_In which I present a short 3-act play about emptying a bucket, and a handy script to make it easy._

# Simple job, right?

When the time comes to delete your bucket, it's important to know that S3 buckets can't be deleted while they contain content. This is a sensible precaution, I guess, but it's frustrating at times. Especially when working with the AWS command line tools. The issue is compounded when the bucket is versioned - and we'll get into that.

Before we get started, though, if you just want a script that makes it easy to empty a versioned S3 bucket, see:

* [`empty-bucket.sh`](https://gist.github.com/instantiator/093b1727b1cf16e77dfa3218d1957610)

> This script is built around some solutions [presented](https://stackoverflow.com/a/61123579) on StackOverflow. I'm extremely grateful to the author, [Alexandre Hamon](https://stackoverflow.com/users/5174358/alexandre-hamon), for openly sharing his solution way back in 2020. I've built on it to develop a full script with a nice interface, but it wouldn't have been possible without the ability to learn from others - especially in cases like these where official documentation falls short.

## 🎭 Bucket List

_A 3-act autobiographical play about a man who wants to delete a bucket._

### Dramatis personae

```
Lewis ... ... ... protagonist ... ... would like to delete a bucket
AWS   ... ... ... villain     ... ... a counter-deletion revolutionary
```

### Act 1 - objects in the dark

Wishing to delete a bucket, Lewis naively deletes every object in it, confident in his strongly-held belief that this is how you delete everything in a bucket. To his surprise, the bucket cannot be deleted because it is not empty!

### Act 2 - it's versions all the way down

On discovering that the bucket is still not empty and cannot be deleted, Lewis deletes every version of every object in the bucket, because it is a versioned bucket and naively deleting the objects did not delete previous versions. To his surprise, the bucket still cannot be deleted, because it is still not empty!

### Act 3 - who will delete the deletions?

Driven almost to the brink of madness, Lewis deletes every deletion marker in the bucket left behind by the previous deletions. Now the bucket is truly empty. He deletes the bucket and finds peace with the world, his debt to society paid in full.

# What can we learn?

If you enable versioning on your buckets, you'll be able to retrieve previous versions of files stored in your bucket. This is a handy feature to help you recover from overwriting good content with bad, and accidental deletions - but it leaves a trail of additional data and metadata.

When the time comes to delete your bucket, you'll find that first you need to empty it of content. If you do it from the AWS web console, it's reasonably straightforward (if clunky). First it'll tell you it can delete the bucket because it isn't empty. Then it'll offer you the option of emptying the bucket. Once emptied, you can return to deletion and try again.

Using the AWS CLI from a shell prompt, it's a little harder!

## Deleting objects

You can delete every object from a regular S3 bucket with the `rm` command:

```bash
aws s3 rm s3://${BUCKET} --region ${REGION} --recursive
```

The `--region` parameter is optional, provided you can reach and control your bucket from your default region. Otherwise provide a value of your own.

The `--recursive` parameter indicates that everything in the bucket should be deleted.

However, that's not enough - this leaves behind:

* Previous versions of all the objects in the bucket
* Deletion records of everything deleted!

If you want to delete the bucket, you're going to have to remove all of those too...

## Deleting previous versions

You can find every version of every object in a bucket with a `list-object-versions` request like this:

```bash
aws s3api list-object-versions --bucket $BUCKET --max-items 500 --query='{Objects: Versions[0:500].{Key:Key,VersionId:VersionId}}'
```

This returns the first 500 records - which is plenty to handle at a time. [`list-object-versions`](https://docs.aws.amazon.com/cli/latest/reference/s3api/list-object-versions.html) is a paginated query. You may need to call it again after deletion if there are more records to delete.

The `--query` on the end extracts the first 500 results as a map of JSON objects of the form: `{ Key, VersionId }`

With this information, you can then initiate a deletion of those versions with a `delete-objects` request like this:

```bash
aws s3api delete-objects --bucket $BUCKET --delete "${VERSIONS_TO_DELETE}" --query 'length(Deleted[*] || `[]` )'
```

The `--query` on the end, here, extracts either the number of items found in `$.Deleted` in the result JSON, or `0` (the length of `[]`) if `Deleted` isn't found.

That's pretty simple - if the result is greater than `0`, you should fetch info about the next batch of versions and delete those. This can be executed as a loop, as illustrated by the script in [this gist](https://gist.github.com/instantiator/093b1727b1cf16e77dfa3218d1957610).

## Deleting deletion records

Ironically, even after you've deleted every version of every object in the bucket, the bucket still isn't empty! There are deletion records that must be ... deleted ... before you can declare the bucket truly empty. _Fortunately, deleting a deletion record doesn't create more deletion records._

You can find every deletion record in a bucket with a `list-object-versions` request like this:

```bash
aws s3api list-object-versions --bucket ${BUCKET} --max-items 500 --query='{Objects: DeleteMarkers[0:500].{Key:Key,VersionId:VersionId}}'
```

You can see that this is very similar to the object versions query above, except that it's looking for `DeleteMarkers`.

The same `delete-objects` query above can be used to delete those markers, and again - it returns the number of items deleted by use of the `--query` parameter:

```bash
aws s3api delete-objects --bucket ${BUCKET} --delete "${DELETION_RECORDS_TO_DELETE}" --query 'length(Deleted[*] || `[]` )'
```

That's pretty simple - if the result is greater than `0`, you should fetch info about the next batch of markers and delete those. This can be executed as a loop, as illustrated by the script in [this gist](https://gist.github.com/instantiator/093b1727b1cf16e77dfa3218d1957610).

## Making it easy

I've done my best to make this simple - and I've popped the whole of this into a single script, which you can find in this gist:

* [`empty-bucket.sh`](https://gist.github.com/instantiator/093b1727b1cf16e77dfa3218d1957610)

The script also does some extra work for you:

* It checks you really meant to do this! (Unless you provide the `-y` / `--yes` option)
* It checks that the bucket exists before starting
* It counts the number of object versions in the bucket it'll need to delete
* It counts the number of deletion records in the bucket it'll need to delete

... and that's it!

It wasn't a trivial problem to solve, and I've built my script around solutions presented by a kind soul on StackOverflow. I'm grateful that people share good practices, tips and tricks in this way. Being open, helps everybody.

**Best of luck 👋**