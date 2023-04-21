#!/bin/sh

# quit script on error
set -e

# generate the site
printf "\033[0;32mGenerating site...\033[0m\n"
pushd blog-site
hugo 

# push content changes to source repo
printf "\033[0;32mPushing source changes...\033[0m\n"
git add --all
msg="content changes ${date}"
if [ -n "$*" ]; then
	msg="${msg}: $*"
fi
git commit -m "$msg"
git push

# push rendered changes to public site
printf "\033[0;32mDeploying updates...\033[0m\n"
pushd public
git add --all
msg="rebuilding site ${date}"
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
msg="updated submodules: ${date}"
git commit -m "$msg"
git push
printf "\033[0;32mDone updating repository.\033[0m\n"
