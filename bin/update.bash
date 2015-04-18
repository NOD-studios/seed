#!/bin/bash

echo "Pulling git";
git pull;
echo "Updating npm";
npm update;
echo "Updating bower";
"$(npm bin)/bower" update --allow-root --silent;
echo "Updating composer";
composer selfupdate --quiet && composer update --quiet;
DIR=$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )
bash "$DIR/build.bash";
DIR=$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )
bash "$DIR/push.bash";
