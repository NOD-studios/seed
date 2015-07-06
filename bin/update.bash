#!/bin/bash

echo "Pulling git";
git pull;
echo "Updating npm";
npm update;
echo "Updating jspm";
"$(npm bin)/jspm" update;
echo "Updating composer";
composer selfupdate --quiet && composer update --quiet;
DIR=$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )
bash "$DIR/build.bash";
bash "$DIR/push.bash";
