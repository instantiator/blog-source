#!/bin/sh

# quit script on error
set -e

export DATE=$(date)

# ensure submodule is initialized
printf "\033[0;32mInitializing public submodule...\033[0m\n"
git submodule update --init blog-site/public

# generate the site
printf "\033[0;32mGenerating site...\033[0m\n"
pushd blog-site
hugo

# push content changes to source repo
printf "\033[0;32mPushing source changes...\033[0m\n"
git add --all
msg="content changes ${DATE}"
if [ -n "$*" ]; then
	msg="${msg}: $*"
fi
git commit -m "$msg"
git push

# push rendered changes to public site
printf "\033[0;32mDeploying updates...\033[0m\n"
pushd public
git checkout main
git add --all
msg="rebuilding site ${DATE}"
# optionally uses command line arguments as the message
if [ -n "$*" ]; then
	msg="${msg}: $*"
fi
git commit -m "$msg"
git push

popd # public
popd # blog-site
printf "\033[0;32mDone updating public submodule.\033[0m\n"

git add --all
msg="updated submodules: ${DATE}"
git commit -m "$msg"
git push
printf "\033[0;32mDone updating repository.\033[0m\n"
