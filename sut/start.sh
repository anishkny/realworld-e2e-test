#!/bin/bash -x
export SUT_FOLDER=`pwd`


########################################
# Start app backend
########################################
cd $SUT_FOLDER/node_modules/conduit-node/
yarn
yarn run start &
sleep 5

# Test backend API endpoint
curl 'http://localhost:3000/api/tags'


########################################
# Start React-Redux app forntend
########################################
cd $SUT_FOLDER/node_modules/react-redux-realworld-example-app/

# Make API_ROOT point to local backend
patch --forward ./src/agent.js $SUT_FOLDER/agent.js.patch || true
yarn
BROWSER=none yarn start &
sleep 5

# Test frontend
curl 'http://localhost:4100/'
