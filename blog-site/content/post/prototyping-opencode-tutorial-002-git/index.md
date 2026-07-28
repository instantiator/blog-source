---
title: "Free AI-assisted coding tools 2: Managing your code"
date: 2026-07-27T00:00:00Z
draft: false
tags: ["tutorial", "git", "github", "version-control"]
categories: ["tutorial"]
series: ["prototyping-opencode-tutorial"]
thumbnail: "staged-files.png"
images: ["staged-files.png"]
---

_Use `git` to keep a full history of your coding project and track changes. It's a commonly used tool to help manage your work._

## What is Git?

Git is a very popular _version control_ tool. It has been a very popular tool to manage software projects for a good while, and remains reasonably unchallenged as the industry standard (for now).

**If you're working in software development, or you want to be in future, you'll need to be familiar with `git` and how it works.**

> ⏩ If you're already familiar with `git` you can skip this tutorial. It's focussed on getting you started if you've never used it before.

Version control systems keep a history of every change you make to your files.

> NB. There are other version control systems: [cvs](https://en.wikipedia.org/wiki/Concurrent_Versions_System) (uses [rcs](https://en.wikipedia.org/wiki/Revision_Control_System)), [mercurial](https://www.mercurial-scm.org/), and others. I won't be discussing them here. Each has their advantages and disadvantages - but git is a clear front-runner for flexibility, and has wide adoption.

Using version control means you can safely make changes to your software, and roll the whole project (or any part of it) back to any previous point, if you need, without losing your work.

Git also supports a variety of ways to work with other developers without accidentally interfering with each others work. By creating branches, you can work in parallel with other developers, manage the history of those changes separately, and merge those changes together when you need.

**Each git project is called a repository.** It's a place to keep the source code of your application and its documentation, and the history of all the changes you've made. Typically you'd create a repository for each piece of software you're working on.

> You may decide to build a collection of applications. Opinions vary about whether you should place them all in the _same repository_ (this is called the **mono-repo** pattern), or into _separate repositories_. Often, a change to one application should be delivered together with changes to other applications that depend on them. In that case, the mono-repo pattern becomes more attractive - because you can make a single change that affects everything at once. Coordinating separate repositories with separate histories would make that more complex.

## GitHub and other providers

Git is often confused with repository providers, like GitHub, GitLab, BitBucket, Gitea, etc. By using a repository providers, you can keep a centralised authoritative version of your repository.

Like a shared drive, these services support collaboration with features that improve how you can use git. They keep your code safely backed up, and allow you to publish open source projects in a commonly understood way.

Most providers have a similar set of features these days - meaning you can expect to see common collaborative methods, and automations for your repository.

There's often a small fee to use a provider's features - although this can be almost-free if you're only using a small amount of automation, and if you open source your code.

<details>
<summary> <b>Using a service or self-hosting...</b> </summary>

You don't _need_ to use a third party provider, but it's commonly done because:

- providers are accessible through the internet, which makes publishing your open source code and working with others easy
- providers manage their service and keep it up to date - they are responsible for managing authentication of your contributors and some aspects of security around your respositories

The disadvantages are:

- loss of control and privacy - you'll be storing your code with a third-party service
- costs - as noted, these services have fees (albeit often with generous free tiers)

The alternative is to self-host git. These offer a higher degree of privacy as your code remains stored inside your own network, but you will have to install, run, and maintain the provider yourself. This places the responsibility of securing the service on your shoulders.

You may also find that you are missing automation and collaboration features that you need if working in a team.

</details>

## Why is this important?

You could write software without version control, but you're missing out on important protections, and a mature way to collaborate. Software is made up many complex and interdependent components, and without a series of safeguards it can very quickly spiral out of control. Version control is one of those safeguards.

That said, you can get started without knowing everything...

## Terminology

Below are a number of features you may wish to learn about. Open any section to learn more, or refer back to here when something comes up.

<details>
<summary> <b>CI/CD...</b> </summary>

Repository hosts also offer other features, such as security audits, test runners, and automated deployments. Many projects have CI/CD pipelines.

- Continuous Integration (CI): The practice of automatically validating code changes by running tests against them before allowing them to merge.
- Continuous Deployment (CD): The practice of automatically deploying code that has been merged.

</details>

<details>
<summary> <b>Commits, branches, merges, pull requests...</b> </summary>

As you make changes to your project, you'll modify different files. A **commit** is a group of these changes, bundled together, that represent a single conceptual change (eg. "Add the login screen", "Update the logo", etc.)

Whenever you make a commit, it is added to the **branch** you are on. When you get started, your repository will have one branch - the `main` branch. It's common to let that branch represent the authoritative version of the project.

At any time, you can create a new branch from the commit you are currently at (or any other). When on another branch, your commits will be added to the new branch - not the `main` branch. This means you can create as many commits as you need to develop a new feature, or fix, or improvement, and work on it in isolation from the rest of the project.

When you switch between branches, the files you see are changed by git to reflect the last commit on the branch you move to. You can work on many different things in this way, alternating between them by moving between branches.

This is great for working on multiple features, and great for working in collaboration. Developers can work on separate branches, meaning that they won't interfere with each other. But what happens when a branch is ready?

It's possible to **merge** from one branch to another directly in git. This is a very simple approach to combining two streams of work, and it's worth understanding why most development teams do it in a more round-about way... 

Developers create **pull requests** to represent changes they wish to merge.

A pull request is a bundle of different pieces of information, and they're handled by the repository host, rather than git. GitHub's pull request is one example, but all services have a lot in common:

- the branch that the changes are coming from
- the branch that they're targeting
- a description of the change
- lots of code review, testing, and approval features to help you manage a publishing workflow

Working this way means that developers can carefully manage changes, review them, catch mistakes, and catch bugs before they enter the code base.

Pull requests are one of the benefits of working with hosted repository providers like GitHub.

</details>

<details>
<summary> <b>Push and pull...</b> </summary>

Working with GitHub or another repository host means that your local copy of the repository _isn't the authoritative copy._ That means you're going to need a way to pull what's there into your own copy, and push your own branches changes up to the remote copy.

Git is built for this - and it's normal for each branch to have an origin - an equivalent branch found on the repository provider's version of the repository.

The easiest way to think about it:

- **pull** - get the latest commits from a remote branch
- **push** - send your commits to a remote branch

</details>

<details>
<summary> <b>Staging...</b> </summary>

Before you create a commit, git helps you to decide what will go into that commit. By adding files to a _staging_ list, you can prepare a group of changes that will then become a single commit.

</details>

<details>
<summary> <b>Environments...</b> </summary>

> This is more of a software development term than specific to git. However, it's helpful to think about, especially if you're developing software that you want to be able to test before changes go into production...

Software projects often have multiple deployment environments. Examples are: `testing`, `demo`, `production`

These are often entirely isolated instances of the application, each for a different purpose. This allows data to be separated, and for changes to be carefully managed. It's likely that the most recent changes will be deployed to a testing environment first, where tests can be run against the application.

If it passes those tests, it may then be deployed ('promoted') to the demo and production environments.

Each project will have its own policies surrounding these deployments. Some projects will run automated checks, and automatically promote code changes from one environment to the next if the tests pass. The main advantage of this is the speed at which changes can be safely tested and deployed to production. Others may rely on manual gating, so that changes can be managed. This may be because significant changes to the project  could be disruptive, or because the automated testing suite isn't mature enough yet to give sufficient assurances - and so changes must be grouped and manually tested first.

</details>

### Summary

| Term | Meaning |
|-|-|
| git | An application to help you track and manage changes in code repositories. |
| staging | A collection of files that are _under consideration_ for inclusion in a commit. |
| commit | A single change to a repository. (Can represent changes to any number of files.) |
| branch | A sequence of commits. |
| pull, push | Get all commits from a remote branch, or push local commits to a remote branch. |
| pull request | A request to merge the commits from one branch to another. |
| environment | An isolated instance of your application, for a specific purpose. |

## A common workflow

1. **Switch to `main`** and **pull** the latest - ie. get back to the most recent authoritative version of the project

2. **Create a new branch** for your current piece of work (and switch to it)

3. Make some changes
   - **Add those changes** to staging
   - **Create a commit** from staging (give it a helpful description)
   - Make some more changes...
     - **Add those changes** to staging
     - **Create a commit** from staging (give it a helpful description)
       - Keep going until your change is ready for review...

4. When ready, **push** to a remote branch

5. **Create a pull request** from that branch to main

6. Kick off your publication workflow...
   - A colleague reviews your pull request and approves or suggests changes
   - Iterate by adding more commits with improvements until ready
   - After final approval, **merge your pull request to `main`**

## Installing Git

These installation instructions are for the terminal. Working with shell commands in a terminal is an essential tool to help you understand and manage software development.

> 💡 If you're struggling, your coding assistant can explain most things. 

> 💡 If you just want a quick reference for a command, use the `man` command (manual), or the `--help` option for your command (which is commonly implemented for most commands). eg.
>
> ```
> man git
> ```
>
> or:
>
> ```
> git --help
> ```

<details>
<summary> <b>macOS...</b> </summary>

Type:

```bash
git --version
```

If Git is not installed, macOS will prompt you to install the Xcode Command Line Tools. Follow the dialog and it will install Git for you.
</details>

<details>
<summary> <b>Windows...</b> </summary>

Download and install git from: [https://git-scm.com/download/win](https://git-scm.com/download/win)
</details>

<details>
<summary> <b>Linux...</b> </summary>

Use one of these commands, depending on your system:

```bash
sudo apt install git    # Debian / Ubuntu
sudo dnf install git    # Fedora
```
</details>

### Check it works

```bash
git --version
```

You should see something like `git version 2.x.x`.

## Creating a repository on GitHub

1. Go to [https://github.com](https://github.com) and sign in (create a free account if you don't have one)
2. Click the **+** icon in the top right corner and select **New repository**
3. Give your repository a name (e.g. `my-data-prototype`)
4. Leave it **Public** if you don't mind that it's free and shareable, or choose **Private** (you can change this later if you need)
5. Consider the templating options[^templating], or the option to create a `README.md` file when creating the repository
6. Click **Create repository**

[^templating]: If you _aleady have_ a local repository that you want to link to the repository on GitHub, create a blank repository with no templating. Otherwise, you're starting fresh - so explore the options, as there may be something to help you get going.

GitHub will create the repository. If you didn't allow it to template anything, it will show you a page with setup instructions. If there's already code there from a template, GitHub will show you what's in the repository.

## Cloning the repository locally

"Cloning" means making a copy of a GitHub repository to your computer.

For this tutorial, I've assumed you're starting with a fresh repository (ie. you've done no work on it).

### Create your `src` folder

This is something you'll only need to do once.

Most developers keep all their code repositories inside a folder called `src`. It's not a strong requirement, but it's a common convention and it helps to find things. You can name it anything else and it won't matter...

1. Create a `src` folder:

   Navigate to your home folder:

   ```bash
   cd ~
   ```

   Create the new folder there:

   ```bash
   mkdir src
   ```

2. Enter the `src` folder:

   ```bash
   cd ~/src
   ```

### Clone the repository

1. On your new repository page on GitHub, click the green **Code** button
2. Copy the URL under **HTTPS** (it looks like `https://github.com/your-username/your-repository-name.git`)
3. Open a terminal in VS Code (`Ctrl+backtick` / `Cmd+backtick`, or use the **Terminal** menu)
4. Clone the repository:

   ```bash
   git clone https://github.com/your-username/your-repository-name.git
   ```

## Opening the repository in VS Code

1. In VS Code, go to **File** > **Open Folder** (or **File** > **Open**)
2. Navigate to the new repository folder, and select it
3. Click **Open**

VS Code knows this is a Git repository, and you'll see a Source Control icon in the sidebar (it looks like a branching line) where you can view changes, stage files, and commit.

> 💡 The next time you open a terminal, it'll start in the folder that VS Code is currently working in.

## How Git fits into your workflow

The basic cycle when working with Git is:

1. **Edit files** — make changes to your code
2. **Stage** — tell Git which changes you want to save (`git add`)
3. **Commit** — save a snapshot with a message (`git commit`)
4. **Push** — upload your commits to GitHub (`git push`)

This means your work is always backed up and versioned. If something breaks, you can look through your commit history and get back to a working state - and git offers plenty of commands to help you do that.

## Useful commands

Here are some simple commands to help you get started using `git` with your new repository:

| Command | What it does |
| --- | --- |
| `git status` | Shows which files have changed |
| `git add .` | **Adds** all changed files to **staging** |
| `git commit -m "description"` | Creates a **commit** with a message |
| `git push` | **Pushes** new **commits** to the branch on GitHub |
| `git pull` | Retrives the latest **commits** from the branch on GitHub |
| `git log --oneline` | Shows a short list of recent commits |

> 💡 Of course, you could ask an AI coding assistant to do all of these things for you. I don't recommend that until you've used it so much you're over-familiar with it. Although an assistant can take away these minutiae, you must understand what it is doing if you want to be responsible for the code that's committed. That comes from hands-on experience.

## Summary

| Concept | What it is |
| --- | --- |
| Git | Local version control — tracks changes on your machine |
| GitHub | Online hosting — stores your repository in the cloud |
| Clone | Downloading a repository from GitHub to your computer |
| Commit | Saving a snapshot of your changes |
| Push | Uploading commits to GitHub |

You now have a repository on GitHub, a local copy on your machine, and the tools to track every change. In the next tutorial, we'll create a data science project scaffold and make our first commit.
