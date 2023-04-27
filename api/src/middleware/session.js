import RedisStore from "connect-redis";
import session from "express-session";
import Redis from "ioredis";
import createClient from "../redis/createClient.js";

export default async function (app) {
  const redisStore = new RedisStore({
    client: createClient(),
    prefix: "sess:",
  });

  app.use(
    session({
      store: redisStore,
      resave: false,
      saveUninitialized: true,
      secret: "secret",
    })
  );
}
