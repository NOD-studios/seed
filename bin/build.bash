#!/bin/bash

echo "Updating require.js config with bower main paths";
"$(npm bin)/bower-requirejs" -c js/main.js;
echo "Compressing require.js";
"$(npm bin)/uglifyjs" vendor/requirejs/require.js --output="vendor/requirejs/require.min.js";
echo "Building with require.js";
"$(npm bin)/r.js" -o js/build.js;
