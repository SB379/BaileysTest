import connectDb from "../../knex/connectDb.js";
import { NOT_AUTHENTICATED } from "../../util/consts.js";

export default async (req, res) => {
  const { userId } = req.session;
  if (!userId) {
    return res.json({ auth: false, error: NOT_AUTHENTICATED });
  }
  const knex = await connectDb();
  const user = await knex("users").where({ id: userId }).first();
  if (!user) {
    return res.json({ auth: false, error: NOT_AUTHENTICATED });
  }
  return res.json({ auth: true, username: user.username });
};
