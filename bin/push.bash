#!/bin/bash

echo "Pushing git";
DATE=$(date +%d-%m-%Y" "%H:%M:%S);
DATE="Updated at $DATE";
git add -A && git commit -am "$DATE" && git push;
echo "$DATE";
