#!/bin/bash

echo "Pulling git";
git pull;
echo "Updating npm";
npm update;
echo "Updating bower";
"$(npm bin)/bower" update --allow-root;
echo "Updating composer";
composer selfupdate && composer update;
echo "Updating require.js config with bower main paths";
"$(npm bin)/bower-requirejs" -c js/main.js;
echo "Compressing require.js";
"$(npm bin)/uglifyjs" vendor/requirejs/require.js --output="vendor/requirejs/require.min.js";
echo "Building with require.js";
"$(npm bin)/r.js" -o js/build.js;
DATE=$(date +%d-%m-%Y" "%H:%M:%S);
DATE="Updated at $DATE";
git add -A && git commit -am "$DATE" && git push;
echo "$DATE";
