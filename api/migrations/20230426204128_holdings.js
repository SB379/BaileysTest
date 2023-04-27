import { readFileSync } from "fs";
/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function up(knex) {
  const file = readFileSync("./data/holdings.json", "utf-8");
  const json = JSON.parse(file);
  const holdings = Object.entries(json).map(([ticker, shares]) => ({
    ticker,
    shares,
  }));
  await knex.schema.createTable("holdings", (table) => {
    table.increments("id");
    table.string("ticker").notNullable();
    table.string("name");
    table.integer("shares").notNullable();
  });
  await knex("holdings").insert(holdings);
}

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export function down(knex) {
    return knex.schema.dropTable("holdings");
}
