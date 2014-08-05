#!/bin/bash

echo -e "\033[0;32mDeploying new sofa.io site...\033[0m"

# delete old gh-pages branch
git branch -D deploy

git checkout -b deploy

# Add changes to git.
git add -f dist

# Commit changes.
msg="chore(*): adding dist `date`"
if [ $# -eq 1 ]
  then msg="$1"
fi
git commit -m "$msg"

git subtree split -P dist -b deploy-dist

# Push source and build repos.
git push -f upstream deploy-dist:gh-pages
git branch -D deploy-dist
git checkout master
git branch -D deploy
