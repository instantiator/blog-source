---
title: "International Consensus Games (WIP)"
date: 2022-11-10T00:00:00Z
tags: ["game", "consensus", "distributed", "voting", "social", "twitter", "mastodon", "fediverse", "chess", "games", "project", "chess.com", "microservice", "serverless", "docker", "compose", ".NET", "worker" ]
images: [ "/consensus/pieces_dream.png" ]
thumbnail: "/consensus/pieces_dream.png"
categories: ["article"]
---

I've been working on a pet project recently: Consensus games are a fun new way to play together through social media... 

_While we wait for some more accounts to be approved across the fediverse, here's a little intro to the idea and an update on progress..._

# What are consensus games?

Consensus Games are a way to play a turn-based game (in this example, chess) by polling each team to figure out the move each side will make.

For Consensus Chess, the process is pretty simple:

* Post the board, encourage people to reply with the move they'd make
* After a day or so, tally the votes, and the most popular move is made
* Post the new board, encourage people to reply...

<img style="width:100%;" src="/consensus/pieces_dream.png" alt="many chess pieces in front of starry sky, realistic" />

There are a number of different variants I'm experimenting with - to help specify the way people can join a team, and what they can do:

* **Free for all games** - anyone can contribute a vote to a move on either side
* **Move-lock games** - once you've voted for a side, you're _on_ that side
* **Server-lock games** - you must be from a particular federated social network server to play on a side

I think there's plenty of room for some fun games in there - you could play one server community against another in the Mastodon world, or just open up games to whoever wants to play. I'm looking forward to being able to do that soon...

# Watch which space?

The project's going smoothly for now - although you can't yet play a game. I've still plenty of work to do. The various social nodes can launch, check their instructions, start a game and post the first board, but that's it so far.

You may occasionally catch me posting instructions from my Mastodon account, [@instantiator@mastodon.social](https://mastodon.social/@instantiator) to the engine node. (You'll see it when I forget to post them as direct messages, so I don't spam your feed too often!)

There's a little way to go before we've got an MVP...

* Posting new game boards
* Collating and validating votes
* Determining the next move
* Advancing the game
* Lots of content to help people play
* Some serious testing...

I'm currently waiting on an approval here or there for some more Mastodon accounts so I can test the new features. In the meantime, you can track development progress at:

* [Consensus Chess 2022](https://trello.com/b/r0OX2iCq/consensus-chess-2022) (Trello board)
* [instantiator/consensus-chess-engine](https://github.com/instantiator/consensus-chess-engine) (GitHub repository)

<img style="width:100%;" src="/consensus/consensus-chess-2022-trello-snapshot.png" alt="a snapshot of the Consensus Chess 2022 trello board from 2022-11-10" />

# Chess and stuff

I can't pretend to be much of a chess expert. I've a couple of games on the go at chess.com at any one time, and if you'd like to [play me](https://friend.chess.com/e3U1), that'd be really fun. 

Chess isn't trivial to implement, and I'm exploring existing libraries out there to help resolve moves (ie. determine if your vote was valid according to the rules). If nothing quite fits the need, I suppose I can get into the nitty gritty of it and implement the rules myself. (And if I do, I'll endeavour to build a library that I can share.)

Right now, I'm representing the board internally with [Forsyth-Edwards notation](https://en.wikipedia.org/wiki/Forsyth%E2%80%93Edwards_Notation) (FEN). It's a simple way to represent the state of a game. For example, here is the opening position of a standard game:

```
rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1
```

In this notation,

* `/` - rows of the chess board are separated by a slash
* `r` `n` `b` `q` `k` `p` - each piece has a letter (respectively: rook, knight, bishop, queen, king, pawn)
* `rnbqkbnr/pppppppp` `PPPPPPPP/RNBQKBNR` - upper case represents white pieces, lower case black
* `1-8` - numbers represent a number of empty spaces in a row (it's run-length encoding!)
* `w`/`b` - this represents which player to move next
* `KQkq` - this represents the ability of each side to castle (and to which side they can castle)
* `-` - when there's an en-passant square, it's represented here
* `0 1` - these are the half-move clock and full-move number, respectively

This is all fine and good - it represents a game, but it's not very pretty and I'm also interested in how to do this right for people reliant on assistive technology. I'm likely to want to publish an image of the board, and so what the application puts into the ALT text for those images is very important.

I'm toying with the idea of using an emoji/unicode modification of this, to help assistive tech do a better job of describing the board. I don't want to veer too far from the specification. It might look something like this:

```
♜♞♝♛♚♝♞♜/
♟♟♟♟♟♟♟♟/
8/
8/
8/
8/
♙♙♙♙♙♙♙♙/
♖♘♗♕♔♗♘♖

white to play, both sides can castle to both sides
```

This definitely needs some research before I commit to a format. (Can assistive tech recite the names and colours of pieces correctly? How do blind or partially sighted users prefer to have boards described to them?) I've plans to figure that out soon - and I'd love to hear from you if you know something about this.

In the meantime, if you fancy a game, you can [befriend me on chess.com](https://friend.chess.com/e3U1). I'm far from a good player, but I'm learning and it's fun! 

<img style="max-width:480px;" src="/consensus/instantiator-chess-com.png" alt="a QR code for instantiator at chess.com - you could scan it to play me" />

# The build

For the techies here's a little rundown of how I'm building this...

I'm working to a microservice-esque architecture. There are two types of service in the application: engine and node.

* **Engine** - responsible for managing games, tallying votes, determining the next move
* **Node** - the point of interaction in each social network, responsible for posting new boards 
 
I'm working in C# and each microservice is a .NET Worker, containerised with docker. The whole application is defined in docker compose - making it easy to bring up and manage.

All services currently share a single database - a handy shortcut for managing shared games (for now).

When ready, I expect to be able to run the whole thing on a [Raspberry Pi](https://www.raspberrypi.com/) from home.

This is Colossus, my Raspberry Pi stack... [Its namesake](https://en.wikipedia.org/wiki/Colossus_computer) was a World War II computer designed for cryptanalysis of German ciphers. It was the size of your living room, and weighed 5 tonnes.

![This is colossus](/consensus/colossus.jpg "This is colossus - 4 Raspberry Pi computers, stacked one atop the other.")

## Performance
 
After MVP I may consider giving each node its own database instance. There aren't too many benefits to that for now - but should we find that the database is the bottleneck, it could help to break things up.
 
Similarly, a fully serverless architecture could remove all performance concerns, although that would require a 3rd party host and right now I'm motivated to save on costs by constraining myself to technologies I can operate from my pi stack. (I thought about using localstack - I'm not sure if it's really production ready.)

# A little bit of history

I came up with this idea in the olden days of `.asp` and Visual Basic. It must have been the early 2000s. I remember writing some code for it in a long summer holiday, but getting nowhere...

I owned the domain I wanted to use for this for a long time - and only gave it up recently. I'm on the cusp of claiming it again.

In the original plan, people could vote by SMS. We'd put the board in a national newspaper each week. You could play off the readership of different papers, or you could even play off different countries! It feels like a fun new kind of sporting rivalry.

# Follow my progress

Follow along if you're interested!

* [@instantiator@mastodon.social](https://mastodon.social/@instantiator) (I'm on Mastodon)
* [Consensus Chess 2022](https://trello.com/b/r0OX2iCq/consensus-chess-2022) (Trello board)
* [instantiator/consensus-chess-engine](https://github.com/instantiator/consensus-chess-engine) (GitHub repository)
