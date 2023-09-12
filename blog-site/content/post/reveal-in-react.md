---
title: "Reveal in React"
date: 2023-09-12T00:00:00Z
tags: ["RevealJS", "reveal", "React", "NextJS", "presentation", "SlideShow", "javascript", "TypeScript", "template", "repository", "UI", "UX" ]
images: [ "/reveal/multiplexing-slides-1-and-2.gif" ]
thumbnail:  "/reveal/multiplexing-slides-1-and-2.gif"
categories: [ "tutorial"]
---

What if your UI was a slide show?

# Reveal in React

**TLDR:** Here's a template repository for a NextJS app with a Reveal slide show UI: [instantiator/reveal-on-next](https://github.com/instantiator/reveal-on-next)

[NextJS](https://nextjs.org/) from [Vercel](https://vercel.com/) is a [React](https://react.dev/) framework for creating web applications that can be hosted statically or dynamically - with some clever ways to control if your code should run server-side or client-side. It can statically load pages with content from build time, and then update them dynamically. This is a very important for SEO.

I've been exploring ways to embed slide shows into React applications, and allowing them to interact with the rest of the web app as React elements or components in their own right.

[RevealJS](https://revealjs.com/) is described as "an HTML presentation framework". It's nice looking, simple to create content for, and very flexible. It embeds into regular vanilla javascript websites easily, and with a little tweaking it can be made compatible with React apps, too.

## Multiplexing

RevealJS has another feature: Multiplexing. This allows one (or more) client slide shows to follow the progress of one (or more) ~~master~~ controller slide show. This capability is available as the [Multiplex plugin](https://github.com/reveal/multiplex). It can be easily enabled, provided you have access to its socket.io server.

You can stand up your own server, or for non-production work there's also one hosted at [reveal-multiplex.glitch.me](https://reveal-multiplex.glitch.me/).

This experiment also explores multiplexing capability.

## Dynamic content

Another aspect of using a presentation as a UI is the ability for an application to control the content that goes inside it. This experiment explores the use of the [SWR](https://swr.vercel.app/) library to fetch content, and then [html-react-parser](https://www.npmjs.com/package/html-react-parser) to render that content inside the presentation.

This has an interesting benefit: It's possible to create and insert real React elements inside the presentation - meaning you can create rich user experiences and interactions within the slide show UI.

## Static sites

An interesting benefit of working with NextJS is that it can generate a fully static export of your application. This can significantly reduce your hosting costs, provided you don't need server-side features. Some static hosting, eg. [GitHub Pages](https://pages.github.com/), is completely free.

NB. Some NextJS features are at odds with the ability to generate a static export, eg. if you need to regularly update the content of your static preview. These should be avoided to preserve this capability.

Building a static site aligns well with requirements for Reveal, as it needs client-side javascript from the moment it is created.

A goal of this experiment is to build an application that preserves this static export capability.

## Getting started

To get a simple web app running, with slide show pages for client and controllers:

* Fork the template repository: [instantiator/reveal-on-next](https://github.com/instantiator/reveal-on-next)
* Install dependencies and run the dev server:

  ```bash
  npm install
  npm run dev
  ```

The site will be served at: [localhost:3000](http://localhost:3000)

## Build your own

The following notes outline the approach I took to embedding Reveal in a Next/React application...

### Install node and npx

```bash
brew install node
npm install -g npx
```

### Create the app

```bash
npx create-next-app@latest
```

### Install `reveal.js`

There are a few react-reveal packages that wrap Reveal for React/Next applications, but they're a little out of date now (the latest was last updated 3 years ago), and aren't really suited to Next or server-side rendering without some extra work.

Install `reveal.js` directly:

```bash
npm install reveal.js
```

### Create a presentation component

**See:** [`components/Presentation.tsx`](https://github.com/instantiator/reveal-on-next/blob/main/components/Presentation.tsx)

`reveal.js` will only run in a browser environment, as it needs access to client specific javascript objects, such as `navigator`. It also needs to be able to see the `div` elements with `reveal` and `slides` CSS classes, as soon as it is created. This code forces Next to only invoke it in a browser...

This is an invocation for Next - telling it that the component needs client-side rendering:

```tsx
"use client";
```

`Reveal` is only created inside a `useEffect` - which is called when the page and divs are ready.

The `embedded` option is set to true - and this helps to incorporate other layout and elements alongside the presentation. As the presentation no longer automatically fills the page, the `reveal` `div` will need to have its size specified in CSS...

_NB. The configuration also includes multiplex information and dependencies. See below for more information._

`Reveal` is only initialised once the content inside the presentation is ready. See below for details of how the content is retrieved and rendered.

### Modify `globals.css`

**See:** [`app/globals.css`](https://github.com/instantiator/reveal-on-next/blob/main/app/globals.css)

The global CSS can be simplified and adjusted to help fit the presentation to the page. If you are using another framework, such as [MUI](https://mui.com/), you may need to solve this another way.

In particular:

* Zero `margin` and `padding` on `html` and `body`. This removes any whitespace around the edges of the page.
* Set `body` to `display: flex` (in column direction). This allows us to resize the presentation to fit below any layout above it.

```css
html, body {
  max-width: 100vw;
  overflow-x: hidden;
  height: 100%;
  margin: 0;
  padding: 0;
}

body {
  display: flex;
  flex-direction: column;
  color: rgb(var(--foreground-rgb));
}
```

### Import the presentation component

**See:**

* [`app/slides/controller/page.tsx`](https://github.com/instantiator/reveal-on-next/blob/main/app/slides/controller/page.tsx)
* [`app/slides/client/page.tsx`](https://github.com/instantiator/reveal-on-next/blob/main/app/slides/client/page.tsx)

`dynamic` is used to import the `Presentation` element dynamically, with `ssr: false` to prevent server-side rendering.

## Remote content

The [`Presentation`](https://github.com/instantiator/reveal-on-next/blob/main/components/presentation.tsx) element has a `src` parameter, and this is passed to an internal [`PresentationContent`](https://github.com/instantiator/reveal-on-next/blob/main/components/PresentationContent.tsx) element which uses the [SWR](https://swr.vercel.app/) library to fetch the content. This content is then enriched (React elements are created where needed inside it), and then rendered inside the `Presentation`.

```bash
npm install swr
```

### Dynamically creating React elements

Some of the content is regular HTML, but some of the elements are React components. There are a number of packages that might help us convert the HTML and manage React components:

| Library                                                                  | Last updated |
| ------------------------------------------------------------------------ | ------------ |
| [html-react-parser](https://www.npmjs.com/package/html-react-parser)     | recently     |
| [html-to-react](https://www.npmjs.com/package/html-to-react)             | recently     |
| ~~[react-html-parser](https://www.npmjs.com/package/react-html-parser)~~ | 6 years ago  |

Install `html-react-parser`

```bash
npm install html-react-parser
```

**NB.** `html-react-parser` is simple to use, but not XSS-safe, and should be used with caution. `PresentationContent` manages replacement of individual React elements by type:

```tsx
const options = {
  replace: (domNode: any) => {
    if (domNode instanceof Element && domNode.attribs) {
      switch (domNode.tagName) {
        case "question":
          console.log("Enriching question tag...");
          let question = domNode.attribs["question"];
          let explanation = domNode.attribs["explanation"];
          let instruction = domNode.attribs["instruction"];
          if (question && explanation && instruction) {
            return (
              <Question
                question={question}
                explanation={explanation}
                instruction={instruction}
              />
            );
          }
          break;
      }
    }
  },
};
```

Here, [`Question`](https://github.com/instantiator/reveal-on-next/blob/main/components/Question.tsx) also incorporates a `Rating` element, from: [react-rating](https://www.npmjs.com/package/react-rating)

```bash
npm install react-rating
```

## Multiplexing

Multiplexing allows a controller presentation to send its state to client presentations on other devices (ie. to allow them to follow along).

There are 3 components:

- Any number of client presentations
- A controller\* presentation, with the same slides
- A socket.io based server that passes messages between the various presentations

_\*Sometimes referred to as a master presentation._

### The server

This demo uses the server at: https://reveal-multiplex.glitch.me/

```tsx
const SOCKET_IO_SERVER = "https://reveal-multiplex.glitch.me/";
```

- To test locally, you could also run your own server.
- A production system should host its own server.
- See: [reveal/multiplex](https://github.com/reveal/multiplex)

### Client and controller

Install the multiplex plugin:

```bash
npm install reveal-multiplex
```

The Presentation component in [`Presentation.tsx`](https://github.com/instantiator/reveal-on-next/blob/main/components/Presentation.tsx) accepts several parameters:

- `secret` (a secret to permit control, or `null` if acting as the client)
- `id` (the id of the presentation)
- `role` (not currently used)

- To collect a fresh secret and id from the server, visit: https://reveal-multiplex.glitch.me/token

The multiplex plugin is configured during initialization of Reveal:

```tsx
multiplex: {
    secret: secret,
    id: id,
    url: SOCKET_IO_SERVER
},
dependencies: [
    { src: 'https://reveal-multiplex.glitch.me/socket.io/socket.io.js', async: true },
    { src: 'https://reveal-multiplex.glitch.me/master.js', async: true },
    { src: 'https://reveal-multiplex.glitch.me/client.js', async: true },
]
```

Because these dependencies rely on being able to find `Reveal` as a global variable, we also add this, just before initialization:

```tsx
window.Reveal = reveal;
```

## Static builds

### Fix compiler issues

Not all imports agree on the version of React to use, and this can lead to difficulties with imported elements (such as the `Rating` element used in [`Question.tsx`](https://github.com/instantiator/reveal-on-next/blob/main/components/Question.tsx)). In [`tsconfig.json`](https://github.com/instantiator/reveal-on-next/blob/main/tsconfig.json) add the following to `$.compilerOptions.paths` to enforce use of the same version:

```jsonc
{
    // ...
    "compilerOptions": {
        "paths": [
            // ...
            "react": ["./node_modules/@types/react"]
        ]
    } 
}
```

In [`Presentation.tsx`](https://github.com/instantiator/reveal-on-next/blob/main/components/Presentation.tsx), `window.Reveal` is explicitly set to ensure that it is available to the multiplexing scripts imported as dependencies of `Reveal`. 

TypeScript is strict during a production build, and rejects this as it thinks `Reveal` is already the name of the module. To instruct the compiler to overlook TypeScript errors, precede the line with `// @ts-ignore`, as here:

```tsx
// @ts-ignore
window.Reveal = reveal;
```

### Build and export the project

Modify [`next.config.js`](https://github.com/instantiator/reveal-on-next/blob/main/next.config.js) to set `output` to `export`:

```js
const nextConfig = { output: "export" };
```

Build the project:

```bash
npx next build
```

Static output is put into the `out` directory by default.

## Hosting on GitHub pages

[GitHub Pages](https://pages.github.com/) can serve the static content either from the root directory of a repository, or from the `docs/` directory. You can place the output from `out` into another repository, and serve it from there by enabling GitHub Pages.

**However,** directories that are prefixed with `_` (underscore) are ignored by default. To work around this, add an empty file called `.nojekyll` at the root of the repository (see: [this blog post](https://github.blog/2009-12-29-bypassing-jekyll-on-github-pages/) about it).

## Conclusion

This is an absolute bare-bones application - but hopefully it illustrates how you can build a presentation as a React component with dynamically fetched content, and how it can contain rich React components within it to interact with the rest of the application.

Feel free to use the template in any way you wish.
