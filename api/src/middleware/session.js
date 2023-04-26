import RedisStore from "connect-redis"
import session from "express-session"
import {createClient} from "redis"
import isProd from "../util/isProd.js";

export default async function (app) {
    if(isProd()) {
        const redisClient = createClient();
        await redisClient.connect();

        const redisStore = new RedisStore({
            client: redisClient,
            prefix: "sess:",
        })

        app.use(session({
            store: redisStore,
            resave: false,
            saveUninitialized: false,
            secret: 'secret',
        }))
    }
    else {
        app.use(session({
            resave: false,
            secret: 'secret',
            saveUninitialized: false,
        }))
    }
}