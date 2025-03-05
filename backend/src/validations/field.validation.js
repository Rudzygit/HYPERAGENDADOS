// Funcion para validar los campos de entrada, recibe un array con los campos permitidos y un objeto con los datos a validar
export const validateInputsFields = (allowedFields, data, res) => {
  const keys = Object.keys(data);

  const invalidFields = keys.filter((field) => !allowedFields.includes(field));
  if (invalidFields.length > 0)
    res
      .status(400)
      .json({ message: `Campos inválidos: ${invalidFields.join(", ")}` });

  const missingFields = allowedFields.filter((field) => !keys.includes(field));
  if (missingFields.length > 0)
    res
      .status(400)
      .json({ message: `Campos faltantes: ${missingFields.join(", ")}` });
};
