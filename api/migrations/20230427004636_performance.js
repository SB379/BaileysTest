/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export function up(knex) {
  return knex.schema.createTable("performance", (table) => {
    table.increments("id");
    table.timestamps(true, true);
    table.double("total_value_now");
    table.double("total_value_yesterday");
    table.double("total_value_last_month");
    table.double("total_value_last_year");
    table.double("year_return_percent");
    table.double("month_return_percent");
    table.double("day_return_percent");
    table.double("year_return_dollars");
    table.double("month_return_dollars");
    table.double("day_return_dollars");
  });
}

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export function down(knex) {
  return knex.schema.dropTable("performance");
}
