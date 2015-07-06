#!/bin/bash

npm install;
"$(npm bin)/jspm" install;
"$(npm bin)/gulp" build;
