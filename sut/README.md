# System Under Test (SUT)

This folder contains the React/Redux frontend and NodeJS backends that make up the full Conduit Realworld stack.

Dependencies are expressed through the [`package.json`](sut/package.json) file in this folder.

To start the frontend and backend stacks, you can execute:

```
yarn
yarn start
```

which will pull in code from the respecive GitHub repos of the stacks locally and call the startup script [`start.sh`](sut/start.sh).

If all goes well, the backend server should be started at port 3000, and frontend stack should be available at http://localhost:4100/
