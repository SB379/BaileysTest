import dotenv from "dotenv";
import express from "express";
import authorized from "./middleware/authorized.js";
import useSession from "./middleware/session.js";
import setup from "./routes/setup.js";
import bodyParser from "body-parser";
import start from "./cron/start.js";

const PORT = process.env.PORT || 3000;

const main = async () => {
  dotenv.config();
  const app = express();
  await useSession(app);
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));
  app.all("*", authorized);
  setup(app);
  start();
  app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
  });
};

main();
