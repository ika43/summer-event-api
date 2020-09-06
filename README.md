# Summer events REST API

---
## Requirements

For development, you will only need Node.js and a node global package installed in your environement.

### Node


- #### Installation
  You can find more information about the installation on the [official Node.js website](https://nodejs.org/) and the [official NPM website](https://npmjs.org/).

## Setup
    rename env.sample file to .env
    $ npm install

## Running the project
    $ npm start

## Run test
    $ npm test

## Docker build
    $ docker build -t <your username>/summer-event-api .
    $ docker run -p 8080:8080 -d <your username>/summer-event-api

## Docs
    Check http://localhost:8080/docs for swagger docs

## Metrics
    Check http://localhost:8080/metrics for metrics