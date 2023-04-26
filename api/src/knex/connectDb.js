import Knex from "knex";

let knex;

export default async () => {
  if (!knex) {
    knex = Knex({
      client: "pg",
      connection: process.env.PG_CONNECTION_STRING,
    });
  }
  return knex;
};
