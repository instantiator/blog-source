---
title: "Free art should be free"
date: 2026-06-21T00:00:00Z
draft: false
tags: [ "art", "scripts", "download", "scrappy", "free", "free-art", "Wikimedia", "Wikipedia" ]
categories: [ "tool", "hack" ]
images: [ "/art/Claude Monet - Water Lilies and Japanese Bridge.jpg" ]
thumbnail: "/art/Claude Monet - Water Lilies and Japanese Bridge.jpg"
---

When it's not being a television with a very awkward user interface, the Samsung Frame 55" is touted as being optimised for art. Imagine spending money on it, just to learn that if you want to access the art itself you need to buy a subscription.

# Free art is already free

Most of the art, held in public galleries across the world, is freely available and published online.

![Waterlillies and Japanese Bridge](/art/water-lillies-and-japanese-bridge.jpg "Claude Monet's Waterlillies and Japanese Bridge is free and you are allowed to just download it! It's an impressionist painting of a white wooden bridge, over a stretch of reflective water covered in water lillies with reeds at the side. Willow trees in the distance. It's brightly coloured in natural greens, and some pink flowers on the water lillies.")

The Frame will also display images you provide, although it doesn't make much effort to format or scale them to nicely to your screen. Art provided through the subscription is, at least, curated and fitted to the screen.

Still, though, it shouldn't cost you money. You've already paid for the screen.

I put together [frame-55-art](https://github.com/instantiator/frame-55-art) to address this gap. It's a couple of tools and some scripts to help you search through publicly avaialble art, published under a permissive license through Wikimedia Commons, download it, and reformat it for your screen dimensions.

It's very much a "here are some scripts, enjoy!" project. I may return to it in future and build a friendlier interface. For now, it's good enough for me.

I learned a bit about querying wikimedia as I progressed, but much less about SPARQL than I might have liked.

* [Wikidata](https://en.wikipedia.org/wiki/Wikidata) (wikipedia article)
* [SPARQL](https://en.wikipedia.org/wiki/SPARQL) (wikipedia article)
* [Wikidata query service](https://query.wikidata.org/) (interactive prompt)

## Get started

Getting started is pretty straightforward.

### Clone the repository

Right now, these tools are available as a GitHub repository. I may return to this at some point and deploy them as packages you can install - but this was a scrappy art project, so you'll have to bear with me.

```bash
git clone https://github.com/instantiator/frame-55-art.git
```

### Install the prerequisites

> [!WARNING]
> I've written these scripts to run on Mac OS. Your mileage may vary on other operating systems. These scripts make use of: `bash`, `brew`, `nodejs`, `npm`, `imagemagick`, `jq`. If `imagemagick` or `jq` aren't installed, they'll be installed during first usage from Homebrew.

* Install Homebrew: [brew.sh](https://brew.sh/)
* Install Node:
  ```bash
  brew install node
  ```
* Install `imagemagick`, `jq`:
  ```bash
  brew install imagemagick jq
  ```

### Fetch some art

Identify an artist who's works you'd like to download. In this example, Monet...

Given a name (in this example, Monet), the `retrieve-art` tool will fetch all the matching entities, helping you to identify the artist (`-n 'Monet'` = name matching Monet).

```bash
./retrieve-art.sh -n 'Monet'
┌─────────┬──────────────┬──────────────────┬───────────────────────────────────────────────────────────────┐
│ (index) │ id           │ label            │ description                                                   │
├─────────┼──────────────┼──────────────────┼───────────────────────────────────────────────────────────────┤
│ 0       │ 'Q296'       │ 'Claude Monet'   │ 'French painter (1840–1926)'                                  │
│ 1       │ 'Q24698278'  │ 'Monet'          │ 'family name'                                                 │
│ 2       │ 'Q2959838'   │ 'Charles Monnet' │ 'French court painter (1732-1808)'                            │
│ 3       │ 'Q8142'      │ 'currency'       │ 'generally accepted medium of exchange for goods or services' │
│ 4       │ 'Q119729672' │ 'Monet'          │ 'given name'                                                  │
│ 5       │ 'Q139693933' │ 'Monet'          │ 'female given name'                                           │
│ 6       │ 'Q234900'    │ 'Linda Darnell'  │ 'American actress (1923–1965)'                                │
└─────────┴──────────────┴──────────────────┴───────────────────────────────────────────────────────────────┘
```

In this case, the artist is `Q296`, Claude Monet, identified as a French painter by Wikimedia.

A quick check (`-l 3` = limit 3) with this id shows that there are art-works associated with it (`-i Q296` = id `Q296`), and downloads 3 of them:

```bash
./retrieve-art.sh -i Q296 -l 3
Found 3 pieces for artist: Claude Monet
[1/3] Downloading: Étretat: The Beach and the Falaise d'Amont ...
[2/3] Downloading: The Customs House at Varengeville ...
[3/3] Downloading: Waterloo Bridge, Sunlight Effect ...

Summary of downloaded art:
┌─────────┬────────────────┬──────────────────────────────────────────────┬────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────┬───────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────┬─────────────────┬──────────────────────────────────────────────────────┐
│ (index) │ artistName     │ pieceName                                    │ path                                                                                                                               │ sourceUrl                                                                                                                                                                                         │ license         │ licenseUrl                                           │
├─────────┼────────────────┼──────────────────────────────────────────────┼────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────┼───────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────┼─────────────────┼──────────────────────────────────────────────────────┤
│ 0       │ 'Claude Monet' │ "Étretat: The Beach and the Falaise d'Amont" │ "art/source/Q296 Claude Monet/Claude Monet - Étretat, The Beach and the Falaise d'Amont - 1964.204 - Art Institute of Chicago.jpg" │ 'http://commons.wikimedia.org/wiki/Special:FilePath/Claude%20Monet%20-%20%C3%89tretat%2C%20The%20Beach%20and%20the%20Falaise%20d%27Amont%20-%201964.204%20-%20Art%20Institute%20of%20Chicago.jpg' │ 'Public domain' │ 'https://creativecommons.org/publicdomain/mark/1.0/' │
│ 1       │ 'Claude Monet' │ 'The Customs House at Varengeville'          │ 'art/source/Q296 Claude Monet/Monet - The Customs House at Varengeville, 1897.jpg'                                                 │ 'http://commons.wikimedia.org/wiki/Special:FilePath/Monet%20-%20The%20Customs%20House%20at%20Varengeville%2C%201897.jpg'                                                                          │ 'CC BY-SA 4.0'  │ 'https://creativecommons.org/licenses/by-sa/4.0'     │
│ 2       │ 'Claude Monet' │ 'Waterloo Bridge, Sunlight Effect'           │ 'art/source/Q296 Claude Monet/Monet - Waterloo Bridge, Sunlight Effect, 1903.jpg'                                                  │ 'http://commons.wikimedia.org/wiki/Special:FilePath/Monet%20-%20Waterloo%20Bridge%2C%20Sunlight%20Effect%2C%201903.jpg'                                                                           │ 'CC BY-SA 4.0'  │ 'https://creativecommons.org/licenses/by-sa/4.0'     │
└─────────┴────────────────┴──────────────────────────────────────────────┴────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────┴───────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────┴─────────────────┴──────────────────────────────────────────────────────┘
```

The script downloads the art, by default into `art/source/Q296 Claude Monet/` and creates two additional index files (`art.csv` and `art.json`) both containing the same information:

- the artist
- the art
- the filename
- its source url
- the license it's published under
- a link to the license

If you're confident you've got the artist you're looking for, drop the limit on the script and run it again:

```bash
./retrieve-art.sh -i Q296
```

> **⚠️ This can take some time,** and the art is downloaded at high resolution. You may need a lot of disk space if your chosen artist is prolific!

### Resize the art for your screen

By default, the `resize-art` script will format the art it finds to fit a Samsung Frame 55" screen.

```bash
./resize-art.sh -s "art/source/Q296 Claude Monet"
```

This places the resulting art in the `art/output/Samsung Frame 55"/` directory.

To format art for alternative screen dimensions, modify `data/dimensions.json` and specify the definition you wish to use (`-d '.samsung.frame55'`):

```bash
./resize-art.sh -s "art/source/Q296 Claude Monet" -d '.samsung.frame55'
```

Congratulations! Your freely available free art is in the `art/output/` directory, from where you can move it to your display.

> NB. These scripts use the equivalent of `object-fit: cover` to scale and crop the art. Art will fill the available screen and the longer side will be cropped to match the screen dimensions.

Beautiful!

![Starry Night Over the Rhône](/art/starry-night-over-the-rhone.jpg "Vincent van Gogh's Starry Night Over the Rhône is also freely available! Yellow stars shine in a dark sky, over the water which reflects the rich blues of the sky and the lights from the boats and buildings by the surface.")