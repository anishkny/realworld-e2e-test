#!/bin/bash -x

## Install top level dependencies
pwd
yarn
test -e node_modules/
test -e node_modules/conduit-node/
ls -lhta node_modules/conduit-node/

## Start app backend
cd node_modules/conduit-node/
yarn
yarn run start &
sleep 10

## Test backend endpoint
curl 'http://localhost:3000/api/tags'
