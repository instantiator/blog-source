---
title: "International Consensus Chess is in public beta!"
date: 2022-12-08T00:00:00Z
tags: ["game", "consensus", "distributed", "voting", "social", "mastodon", "fediverse", "chess", "games", "project", "microservice", "serverless", "docker", "compose", ".NET" ]
images: [ "/consensus/neon-king.png" ]
thumbnail: "/consensus/neon-king.png"
categories: ["article"]
---

Consensus Chess is going through some beta testing on Mastodon, and you can play today!

# What are Consensus Games?

I dug a little into the idea [last time](../consensus-games), and here's a short summary: Consensus Games are a way to play a turn-based game (in this example, chess) by polling each team to figure out the move each side will make.

## Can I play it now?

Yes! There's a test game up and running over at [icgames@botsin.space](https://botsin.space/@icgames) - you can join a side by voting on a move. Just reply to a board post with the move you think your side should make, providing the square to move _from_ and the square to move _to_ - separated by a hyphen.

eg. `e2 - e4`

It's that simple! Consensus Games will respond, indicating that it accepted your move, and when all the votes will be tallied. Good luck!

## Where can I find out more?

There's a new website - [icgames.net](https://icgames.net), or you can reach out to me on social media. I'll happily talk your ears off!

<img 
    src="/consensus/colossus-2.jpg" 
    style="width: 40%; float: right; margin: 20px;"
    alt="Colossus, a tiny stack of 4 Raspberry Pi computers. 2 of them have little red lights on to indicate that they are powered."
    title="Colossus, a tiny stack of 4 Raspberry Pi computers. 2 of them have little red lights on to indicate that they are powered.">

## Where have you hosted it?

The whole service is hosted on a single Raspberry Pi in Colossus, my tiny server stack! It's written in C#, and runs in a number of docker containers.

### Technologies I'm using

🔷 [.NET 7 and #CSharp](https://learn.microsoft.com/en-us/dotnet/csharp/) (the engine)<br/>
🔷 [PostgreSQL](https://www.postgresql.org/) (database)<br/>
🔷 [Docker Compose](https://docs.docker.com/compose/) (containers)<br/>
🔷 [Portainer](https://www.portainer.io/) (dashboard)<br/>
🔷 [Raspberry Pi 3 Model B](https://www.raspberrypi.com/products/raspberry-pi-3-model-b/) (server)

## How does it all fit together?

The service is designed to be modular, and broken into:

* An engine - to create and manage the games
* Any number of nodes - to interact with social networks
* A shared database - to track games, players, and votes

Each node subscribes to a stream of notifications from its network, and polls the shared database for information about games.

When there's a new move or a new game, each node posts a new board. When a user interacts with that board post, the node updates the shared database to keep track of all the votes.

<p style="text-align: center;"><img 
    src="/consensus/consensus-diagram.png" 
    style="width: 80%;"
    alt="A network diagram showing how each node and engine runs in a docker container, and connects to a mastodon account. They each share a single database."
    title="A network diagram showing how each node and engine runs in a docker container, and connects to a mastodon account. They each share a single database."></p>

## How do you know it'll work?

The whole service is extensively tested.

The build process takes place as Docker assembles each container, and must pass all unit tests and feature tests before it can complete.

At current time there are:

🔸 77 unit tests<br/>
🔸 32 feature tests<br/>
🔸 12 integration tests

## Who created the graphics?

The art for the chess board comes from the [Pixel Chess](https://dani-maccari.itch.io/pixel-chess) asset pack by [Dani Maccari](https://dani-maccari.itch.io/). It's listed as a free asset pack, but you can pay what you think is fair. (That's a nice feature of [itch.io](https://itch.io/) - and as I'm using it, I contributed.)

The Neon King (icon) was generated in [DreamStudio](https://beta.dreamstudio.ai/dream) using [Stable Diffusion](https://en.wikipedia.org/wiki/Stable_Diffusion). I spent some time experimenting with prompts to find something I liked, and I'm pretty pleased with the way it came out.

<p style="text-align: center;"><img 
    src="/consensus/challenge-image.png" 
    alt="A dinky, pixellated chess board, with the ICGames logo on it. The logo shows a black chess king with a bright green neon streak on a dark concrete-like background."
    title="A dinky, pixellated chess board, with the ICGames logo on it. The logo shows a black chess king with a bright green neon streak on a dark concrete-like background."></p>

## Who wrote your copy?

I asked [ChatGPT](https://chat.openai.com/chat) to write some copy for Consensus Chess with a simple prompt:

> Consensus Games are a way to play turn-based games by polling each team to figure out the move each side will make. Write some promotional material to explain how fun it could be to play Consensus Chess.

What it came up with was pretty nice:

> Consensus Chess is a fun and unique way to play the classic game of chess. In Consensus Chess, each team gets to vote on their next move, adding an exciting new layer of strategy to the game.
>
> Rather than just relying on the skill of a single player, Consensus Chess allows teams to collaborate and come up with the best possible move. This not only makes the game more challenging, but also more fun and engaging.
>
> Additionally, Consensus Chess allows for more players to participate in the game at once. While traditional chess is a two-player game, Consensus Chess can be played by teams of any size, making it a great option for groups of friends or even larger groups.
>
> So why not give Consensus Chess a try? It's a fresh take on a classic game that is sure to provide plenty of entertainment for players of all skill levels. Give it a try and see for yourself how much fun it can be!
