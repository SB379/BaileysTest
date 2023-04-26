// Update with your config settings.

/**
 * @type { Object.<string, import("knex").Knex.Config> }
 */
import dotenv from "dotenv"
dotenv.config();
export default {
  development: {
    client: "postgresql",
    connection: process.env.PG_CONNECTION_STRING,
  },

  production: {
    client: "postgresql",
    connection: process.env.PG_CONNECTION_STRING,
    pool: {
      min: 2,
      max: 10,
    },
    migrations: {
      tableName: "knex_migrations",
    },
  },
};
