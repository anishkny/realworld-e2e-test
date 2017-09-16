#!/bin/bash -x
export PROJECT_ROOT=`pwd`

## Install system under test (SUT)
rm -rf sut; mkdir sut; cd sut/
git clone https://github.com/gothinkster/angularjs-realworld-example-app
git clone https://github.com/gothinkster/node-express-realworld-example-app.git
cd $PROJECT_ROOT

## Start app backend
cd ./sut/node-express-realworld-example-app/
yarn
yarn run start &
cd $PROJECT_ROOT
sleep 5

## Test backend endpoint
curl 'http://localhost:3000/api/tags'

## Start app frontend
cd ./sut/angularjs-realworld-example-app/
yarn
patch ./src/js/config/app.constants.js $PROJECT_ROOT/app.constants.js.patch
cat ./src/js/config/app.constants.js
rm -rf ./dist
./node_modules/.bin/gulp build
test -e ./dist
yarn add http-server
./node_modules/.bin/http-server dist/ -a localhost -p 4000 &
cd $PROJECT_ROOT
sleep 5

## Test frontend endpoint
curl 'http://localhost:4000/'

## Create screenshots folder if required
cd $PROJECT_ROOT
mkdir -p .screenshots/
