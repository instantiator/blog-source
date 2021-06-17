---
title: "A template thesis"
description: "The things I'll do to avoid learning LaTeX..."
date: 2021-06-17T00:00:00Z
tags: ["research", "paper", "thesis", "writeup", "masters", "MSc", "markdown", "LaTeX", "" ]
images: [ "/thesis/sample-cover-page.png" ]
categories: ["tools"]
---

> The things I'll do to avoid learning LaTeX...

I've written a small tool and template to help you write papers in Markdown. The output is a PDF in the style of a LaTeX document.

# A template thesis

[This is a template for building a thesis](https://github.com/instantiator/markdown-thesis-builder) PDF that's written in markdown, using features and styles from LaTeX. I'm using it for my MSc thesis, and I've spent a little time cleaning it up so it's easy to share and use.

![sample cover page](/thesis/sample-cover-page.png)

Check out the [sample document](https://github.com/instantiator/markdown-thesis-builder/releases/tag/1.0) in release 1.0. 

* Runs in a Docker container for portability.
* Allows you to write primarily in Markdown for simplicity.

Markdown is easy to write, and will help you to write the bulk of your document. This project supports a few additional features you may also need:

* Includes support for a cover page (not numbered).
* Includes support for building a table of contents.
* Numbers the various main sections of the document.
* Includes support for LaTeX mathematics / formulae.
* Includes support for citations, and a BibTex bibliography.

The whole document is built from source markdown files using a Docker container that contains everything it needs. The output is a PDF document.

## How to use it

* Head over to the repository at: [instantiator/markdown-thesis-builder](https://github.com/instantiator/markdown-thesis-builder)
* Download or fork-and-download-or-clone the repository.
* Follow the instructions in [README.md](https://github.com/instantiator/markdown-thesis-builder/blob/main/README.md) to install Docker (pretty much the only prerequisite).
* Modify the various markdown files in the `source/` directory to add content to your document.
* Run `build-project.sh` to build the whole document, eg. 
  
  ```bash
  ./build-project.sh
  ```

* The final line of a successful build tells you where to find the output document:
  
  ```text
  Output document: source/build/Sample-Project_Your-Name.pdf
  ```
