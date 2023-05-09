---
title: "3D puzzle print: crosswords (tool and tutorial)"
date: 2023-01-18T00:00:00Z
tags: [ "SCAD", "STL", "3D", "3D-printing", "design", "SnapMaker", "Luban", "puzzle", "crossword", "print", "gcode", "DotNet", "Docker", "OpenSCAD", "M600" ]
images: [ "/crossword-prints/sample-print-clarbert.jpeg" ]
categories: ["tool"]
---

A tool to design 3D printed crossword puzzles.

# Generating 3D crossword models

I've been working on a tool to generate crossword designs using OpenSCAD. The output is an STL file that you can use with your favourite slicer and send to a 3D printer. It's open source, and you're free to plunder it for tips, techniques, or to generate your own...

* [instantiator/crossword-generator-scad](https://github.com/instantiator/crossword-generator-scad)

With minimal effort, you can probably create prints better than this...

![](/crossword-prints/sample-print-clarbert.jpeg)

## What's OpenSCAD?

[OpenSCAD](https://openscad.org/) is freely available software for creating solid 3D CAD objects. A SCAD file contains definitions that describe the object you want to create - and OpenSCAD can use that to generate an STL model.

![OpenSCAD screenshot](https://openscad.org/assets/img/screenshot.png)

OpenSCAD is a neat solution for expressing complex designs, and yes - I'm aware there are many other cool ways to achieve this with sophisticated design packages and other tools.

## How does the crossword generator work?

The `ScadGenerator` directory contains the code for a C# application that combines your input CSV with a SCAD [crossword template](https://github.com/instantiator/crossword-generator-scad/blob/main/templates/crossword-template.scad) for the crossword, and a set of variables contained in [another CSV](https://github.com/instantiator/crossword-generator-scad/blob/main/templates/crossword-default-values-18x20.csv) file. What it produces ought to be a valid SCAD file defining the crossword in the shape you defined.

The `generate-crossword.sh` script builds and executes this application in a Docker container for you.

The output SCAD file it generates is then fed into the [openscad/openscad](https://hub.docker.com/r/openscad/openscad) Docker image itself, which is used to generate an STL model from your SCAD definition.

| Test cells (STL) | A crossword design (STL) |
|-|-|
| ![A 3D design showing a small flat base, that's 3 by 1. The first position is blank, so it's just the base. The other 2 positions have grid cells elevated over them, each with a stubby little circle printed inside the grid cell. The 3rd position grid walls are printed slightly higher than the other - they represent a highlighted cell. ](/crossword-prints/preview-test-cells.png) | ![A full crossword printed in the same way. There's a large, flat, 11x9 base plate, and then on top of it a crossword grid is elevated. In each cell of the crossword is another stubby little circle. Some cells have higher walls than others - they are highlighted cells.](/crossword-prints/preview-clarbert-crossword.png) |

## How do I use it?

* You'll need to have [Docker](https://www.docker.com/products/docker-desktop/) installed on your machine.
* Fork, clone, or download [the repository](https://github.com/instantiator/crossword-generator-scad).

The process is pretty simple:

* Create a CSV file to describe your crossword
  * [Copy this template sheet](https://docs.google.com/spreadsheets/d/1V18dAKi18F9mF3wuK5d-L5pdg0llTGk-J9Tq7vYNg_I/copy)
  * Edit your characters into the crossword tab of the sheet.
  * Use lower case for regular letter grid spaces.
  * Use upper case for highlighted spaces.
  * Leave everything else blank.
  * You may wish to expand the size of the sheet.
  * Export the crossword grid as CSV.* Optionally, modify any of the parameters that define the print
* Use the `generate-crossword.sh` script to generate an STL model
  * See: [usage examples in the README](https://github.com/instantiator/crossword-generator-scad#usage)
* Generate the gcode for your printer with the slicer of your choice
* Optionally, add some breaks to change filament/colour during the print
  * See: [filament changes in the README](https://github.com/instantiator/crossword-generator-scad#filament-changes)
* Send to your printer and print!

## How do I get those colour changes?

There's some extra documentation [in the README](https://github.com/instantiator/crossword-generator-scad#filament-changes) about how you can modify the gcode file for your 3D printer, to trigger a change of filament at the right moment during the print.

Essentially, you need to add an extra `M600` command to the file just before the layer you want printed with the new material. Many slicers can do this for you but, as I found with Snapmaker Luban, not all!

Most printers support the `M600` command - but I suggest checking the documentation for yours before you rely on it!
