import connectDb from "../../knex/connectDb.js";

export default async (req, res) => {
  const knex = await connectDb();
  const performance = await knex("performance")
    .select("*")
    .orderBy("created_at", "desc")
    .first();
  res.json(performance);
};
