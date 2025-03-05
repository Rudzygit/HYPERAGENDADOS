import { connection } from "../config/db.js";

export const findByUserEmail = async (email) => {
  const user = await connection.query(
    "SELECT * FROM usuario WHERE username = ?",
    [email]
  );
  return user[0];
};

export const saveUser = async (user) => {
  // await connection.query("INSERT INTO usuario SET ?", [user]);
};
