---
title: "Open Social Distributor"
date: 2023-11-11T11:00:00Z
tags: [ "SocialNetwork", "social", "SocialMedia", "media", "post", "facebook", "mastodon", "linkedin", "discord", "formatting", "thread" ]
categories: [ "tool" ]
images: [ "/osd/social-distributor-icon.png" ]
thumbnail: "/osd/social-distributor-icon.png"
---

_How to use Open Social Distributor to post threads and messages across multiple social networks at once._

# Open Social Distributor

The Open Social Distributor is a simple tool that to format and post your message across any number of social networks.

It's free and open source.

## Download

* [Releases](https://github.com/instantiator/open-social-distributor/releases) (binaries for Windows, Mac OS, Linux)

## Documentation

* [Documentation](https://instantiator.dev/open-social-distributor/)
* [Source code](https://github.com/instantiator/open-social-distributor)

## Configuring social networks

The Open Social Distributor supports a number of different social networks. At time of writing, that includes Mastodon, Discord, Facebook, and LinkedIn.

| Network | Test | Post | Thread | Link | Tags | Images |
|-|-|-|-|-|-|-|
| Console | ✅ | ✅ | ✅ | ✅ | ✅ | 🆗 |
| Mastodon | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |
| Discord | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |
| Facebook (page) | ✅ | ✅ | ⌛️ | ✅ | ✅ | ✅ |
| LinkedIn (org) | ✅ | ✅ | ⌛️ | ✅ | ✅ | ✅ |
| LinkedIn (member) | ✅ | ✅ | ⌛️ | ✅ | ✅ | ✅ |

✅ = implemented, working
⌛️ = implemented, not fully tested yet

### Installation

_These instructions assume you're reasonably comfortable with the command line interface, or shell, on your system._

Download the binaries, and locate the binary for your system (Windows, Mac OS, or Linux) from: [Releases](https://github.com/instantiator/open-social-distributor/releases)

You'll need to include this in your path, or call it directly.

### Configuring social networks

Open Social Distributor needs a little configuration to know about the social network accounts it'll be posting to, and you'll need to take a few actions in your accounts to permit it.

The configuration format is simple JSON, described in the documentation:

* [Configuration](https://instantiator.dev/open-social-distributor/configuration.html)
* [Connection strings](https://instantiator.dev/open-social-distributor/connection-strings.html)

Create a blank config file if you do not have one.

```json
{
    "networks": {
        "enabled": [
            "type=console"
        ],
        "disabled": []
    }
}
```

For each type of social network, you'll need to take some specific actions to obtain permission to post. These are described here:

* [Mastodon](https://instantiator.dev/open-social-distributor/mastodon-notes.html)
* [Facebook](https://instantiator.dev/open-social-distributor/facebook-notes.html)
* [LinkedIn](https://instantiator.dev/open-social-distributor/linkedin-notes.html)
* [Discord](https://instantiator.dev/open-social-distributor/discord-notes.html)

Add a connection string, as described in the documentation, to the `enabled` list for each network you want to post to.

## Make a simple post

There are a couple of ways to post. You can provide some simple information through command line options, or you can create a posts file and draw from there.

### Posting with CLI options

Simple posting is documented in:

* [Post composition](https://instantiator.dev/open-social-distributor/post-composition.html)

On the command line, you can provide some simple options to describe the post you wish to make:

```text
-m, --message               Simple message text.
-l, --link                  Link for this message.
-i, --images                URIs to images, semi-colon separated (;)
-d, --image-descriptions    Image descriptions, semi-colon separated (;)
-t, --tags                  A list of tags (without # prefix), semi-colon separated (;)
```

For the simplest possible message, you could construct a post like this:

```bash
DistributionCLI post \
  --config-file path/to/config.json \
  --message "this is a test"
```

If there's an overall link for the message, you could include it in your message text, or you can include it with the `--link` option. If you use the link option, it'll be included as a part of the message text, or as a media link - depending on each social network's specifics.

To include images, provide a semi-colon separated list of paths to files with the `--images` option (these can be as a URIs, or local paths).

To include image descriptions, provide a semi-colon separated list of descriptions with the `--image-descriptions` option.

Finally, you could include hashtags in your message, or use the `--tags` option (as a semi-colon separated list of tags without the preceding `#` hash). These will be added to the end of each message - if there's room. (If not, a random subset will be used on each message in the thread.)

### Threads

If your message is longer than a message length for each social network, it will be reformatted into a thread. Threads have different meanings for different social networks.

Some items (ie. tags, links) will either be moved to the first post, duplicated across all posts, or may be handled differently depending on the social network.

| Network | First post | Subsequent posts | Tags | Link | Images | Images per post | Image size limit |
|-|-|-|-|-|-|-|-|
| Mastodon | `500` | `500` | All posts | First post | Front-loaded | `4` | TBC |
| Discord | `2000` | `2000` | First post | First post |  First post | `10` | TBC |
| Facebook | `63206` | `8000` | First post | Special | First post | `∞` |`10Mb` |
| LinkedIn | `3000` | `1250` | First post | First post | First post | `20` | TBC |
| Twitter | `280` | `280` | All posts | First post | Front-loaded | `4` | TBC |

Thread formatting is described fully in:

* [Post composition](https://instantiator.dev/open-social-distributor/post-composition.html)

By and large, you can expect that Open Social Distributor will try to do _the right thing_ for long posts, links, images, and tags - depending on the constraints of each social network.

### Posting from a posts file

It's likely you'll be building a set of posts to work from, and these can be stored in a posts file.

To use a post list file, you can provide these options:

```text
-s, --source-file           Path or url to a source file containing posts.
-o, --offset                Offset (index) of a post within the source file. (Leave blank to send all posts in the source file.)
```

For the simplest possible message, you could construct a post like this:

```bash
DistributionCLI post \
  --config-file path/to/config.json \
  --source-file path/to/posts.json \
  --offset 0
```

The post list format is described at:

* [Post list format](https://instantiator.dev/open-social-distributor/post-list-format.html)

Some samples are available at:

| Sample | Description |
|-|-|
| [sample-messages/blank-root.json](https://github.com/instantiator/open-social-distributor/blob/main/open-social-distributor-app/sample-messages/blank-root.json) | Blank template |
| [sample-messages/single-message.jsonc](https://github.com/instantiator/open-social-distributor/blob/main/open-social-distributor-app/sample-messages/single-message.jsonc) | A simple message, documented with comments |
| [sample-messages/release-announcement-v0.1.jsonc](https://github.com/instantiator/open-social-distributor/blob/main/open-social-distributor-app/sample-messages/release-announcement-v0.1.jsonc) | The v0.1 release announcement post |

## Contributing

The project is open source, and covered by the (very permissive) [MIT license](https://github.com/instantiator/open-social-distributor/blob/main/LICENSE).

If you'd to contribute, please read the [contributors guide](https://github.com/instantiator/open-social-distributor/blob/main/CONTRIBUTING.md) and get stuck in! You're very welcome.

We have a [code of conduct](https://github.com/instantiator/open-social-distributor/blob/main/CODE_OF_CONDUCT.md) to ensure that working on this project is a welcoming and safe experience.
