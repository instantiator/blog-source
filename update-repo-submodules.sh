#!/bin/sh

# This script will update all submodules in the repo when first cloned.
git submodule update --recursive --remote
