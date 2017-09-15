#!/bin/bash -x
export PROJECT_ROOT=`pwd`

## Install dependencies
yarn

## Start app backend
cd ./node_modules/conduit-node/
yarn
yarn run start &
cd $PROJECT_ROOT
sleep 10

## Test backend endpoint
curl 'http://localhost:3000/api/tags'

## Start app frontend
cd ./node_modules/conduit-angularjs/
yarn
patch ./src/js/config/app.constants.js $PROJECT_ROOT/app.constants.js.patch
cat ./src/js/config/app.constants.js
rm -rf ./dist
./node_modules/.bin/gulp build
test -e ./dist
yarn add http-server
./node_modules/.bin/http-server dist/ -a localhost -p 4000 &
cd $PROJECT_ROOT
sleep 10

## Test frontend endpoint
curl 'http://localhost:4000/'
