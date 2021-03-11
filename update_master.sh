#!/bin/bash 

git checkout master
git merge production
git push origin master
git checkout development