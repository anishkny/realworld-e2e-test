#!/bin/bash -x
export SUT_FOLDER=`pwd`

## Start app backend
cd $SUT_FOLDER/node_modules/conduit-node/
yarn
yarn run start &
sleep 5

## Test backend endpoint
curl 'http://localhost:3000/api/tags'

## Start app frontend
cd $SUT_FOLDER/node_modules/conduit-angularjs/
yarn
cp $SUT_FOLDER/app.constants.js.modified ./src/js/config/app.constants.js
cat ./src/js/config/app.constants.js
rm -rf ./dist
./node_modules/.bin/gulp build
test -e ./dist
yarn add http-server
./node_modules/.bin/http-server dist/ -a localhost -p 4000 &
sleep 5

## Test frontend endpoint
curl 'http://localhost:4000/'
