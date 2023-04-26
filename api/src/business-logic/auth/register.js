import validateRegister from "./validateRegister.js";
import argon2 from "argon2";
import connectDb from "../../knex/connectDb.js";
import { USERNAME_ALREADY_EXISTS } from "../../util/consts.js";

export default async (req, res) => {
  const { username, password } = req.body;
  const knex = await connectDb();
  const error = validateRegister({ username, password });
  if (error) {
    return res.status(400).json({ error });
  }
  const existingUser = await knex("users").where({ username }).first();
  if (existingUser) {
    return res.status(400).json({ error: USERNAME_ALREADY_EXISTS });
  }
  const hashedPassword = await argon2.hash(password);
  const [user] = await knex("users")
    .insert({
      username,
      password: hashedPassword,
    })
    .returning("*");
  req.session.userId = user.id;
  return res.json({ auth: true });
};
