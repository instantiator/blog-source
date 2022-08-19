---
title: "A template thesis to simplify your write-up"
description: "The things I'll do to avoid learning LaTeX..."
date: 2021-06-17T00:00:00Z
tags: ["research", "paper", "thesis", "writing", "masters", "MSc", "markdown", "LaTeX", "formulae", "contents", "TOC", "figures", "cover" ]
images: [ "/thesis/sample-cover-page.png" ]
categories: ["article", "tool"]
---

> The things I'll do to avoid learning LaTeX...

Do you prefer Markdown to LaTeX?

Do you still want the benefits of LaTeX, such as bibliography, formulae, figures, contents, and cover page?

I've written a small tool and template to help you write papers in Markdown. The output is a PDF in the style of a LaTeX document.

# A template thesis

[This is a template for building a thesis](https://github.com/instantiator/markdown-thesis-builder) PDF that's written in markdown, using features and styles from LaTeX. I'm using it for my MSc thesis, and I've spent a little time cleaning it up so it's easy to share and use.

* Runs in a Docker container for portability.
* Allows you to write primarily in Markdown for simplicity.

Markdown is easy to write, and will help you to write the bulk of your document. This project supports a few additional features you may also need:

* Includes support for a cover page (not numbered).
* Includes support for building a table of contents.
* Numbers the various main sections of the document.
* Includes support for LaTeX mathematics / formulae.
* Includes support for citations, and a BibTex bibliography.

The whole document is built from source markdown files using a Docker container that contains everything it needs. The output is a PDF document.

## Sample output

* See: [Sample project PDF](https://github.com/instantiator/markdown-thesis-builder/raw/main/sample/Sample-Project_Your-Name.pdf)

### Cover page and table of contents

Illustrating cover page and automated table of contents.

{{< figure src="https://github.com/instantiator/markdown-thesis-builder/raw/main/screenshots/page001.png.shadow.png" alt="cover page" width="300px" class="inline-image" caption="cover page" >}}
{{< figure src="https://github.com/instantiator/markdown-thesis-builder/raw/main/screenshots/page002.png.shadow.png" alt="table of contents" width="300px" class="inline-image" caption="table of contents" >}}

### Methodology and bibliography

Illustrating footnotes, citations, formulae, figures, and automated bibliography.

{{< figure src="https://github.com/instantiator/markdown-thesis-builder/raw/main/screenshots/page006.png.shadow.png" alt="methodology" width="300px" class="inline-image" caption="methodology" >}}
{{< figure src="https://github.com/instantiator/markdown-thesis-builder/raw/main/screenshots/page010.png.shadow.png" alt="bibliography" width="300px" class="inline-image" caption="bibliography" >}}

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

## It's a free and open template

You're welcome to use this tool for any of your project writing needs.

If you've an improvement or modification, please submit a pull request.

If you have any issues or suggestions, please create an issue.

Feel free to fork, improve, modify, or do whatever you please with it.
