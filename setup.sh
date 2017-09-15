#!/bin/bash -x

## Install top level dependencies
yarn
test -e node_modules/
test -e node_modules/conduit-node/
test -e node_modules/conduit-angularjs/

## Start app backend
cd node_modules/conduit-node/
yarn
yarn run start &
sleep 10

## Test backend endpoint
curl 'http://localhost:3000/api/tags'

## Start app frontend
cd ./node_modules/conduit-angularjs/
yarn
patch ./src/js/config/app.constants.js ../../app.constants.js.patch
cat ./src/js/config/app.constants.js
gulp build
yarn add http-server
./node_modules/.bin/http-server dist/ -a localhost -p 4000 &
sleep 10
