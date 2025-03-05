import { connection } from "../config/db.js";

export const findByUserEmail = async (email) => {
  const user = await connection.query(
    "SELECT * FROM usuario WHERE username = ?",
    [email]
  );
  return user[0];
};
