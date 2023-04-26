import connectDb from "../../knex/connectDb.js";
import argon2 from "argon2";
import { INVALID_USERNAME_OR_PASSWORD } from "../../util/consts.js";

export default async (req, res) => {
  const { username, password } = req.body;
  const knex = await connectDb();
  const user = await knex("users").where({ username }).first();
  if (!user) {
    return res.status(401).json({ error: INVALID_USERNAME_OR_PASSWORD });
  }
  const correct = await argon2.verify(user.password, password);
  if (!correct) {
    return res.status(401).json({ error: INVALID_USERNAME_OR_PASSWORD });
  }
  req.session.userId = user.id;
  return res.json({ auth: true });
};
