import { validateInputsFields } from "../validations/field.validation.js";
import { findByUserEmail } from "../models/user.model.js";

export const login = async (req, res) => {
  validateInputsFields(["username", "password"], req.body, res);
  const { username, password } = req.body;

  const results = await findByUserEmail(username);

  if (results.length === 0)
    return res.status(404).json({ message: "Usuario no encontrado" });

  if (results.length > 1)
    return res.status(500).json({
      message: "Error interno del servidor, contacte con el administrador",
    });

  const user = results[0];
  const isValidPassword = await bcrypt.compare(password, user.password);

  if (!isValidPassword)
    return res.status(401).json({ message: "Contraseña incorrecta" });

  const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
    expiresIn: "1d",
  });

  console.log(token, user[0]);

  res.status(200).json({ message: "Inicio de sesión exitoso", token });
};

export const register = (req, res) => {
  res.status(200).json({ message: "Registro exitoso" });
};
