# Bailey API

This is the API for Bailey with javascript.

## Setup

Run `npm i` to install all dependencies.

Run `docker-compose up -d` to start the database.

Make a copy of `.env.example` and rename it to `.env`.

Run the migrations with `npm run migrate:latest`.

If you get an error about the database, make sure the docker image is running with `docker ps`.

Run `npm start` to start the server.

## Rest Client

In VSCode, download the [REST Client](https://marketplace.visualstudio.com/items?itemName=humao.rest-client) extension.

Go to the `src/routes` folder and open any of the `.http` files.
