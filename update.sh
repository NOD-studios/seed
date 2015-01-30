npm update;
bower update;
composer update;
lessc less/app.less > css/app.css;
uglifyjs bower_components/requirejs/require.js --output="vendor/requirejs/require.min.js";
"$(npm bin)/r.js" -o js/build.js;
git add -A;
git commit -am "date +'updated: %d-%m-%Y %H:%M:%S'";
git push;
