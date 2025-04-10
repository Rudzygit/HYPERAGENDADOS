import ApiResponse from "../utils/apiResponse.js";

// Funcion para validar los campos de entrada, recibe un array con los campos permitidos y un objeto con los datos a validar
export const validateInputsFields = (allowedFields, data, res) => {
  const keys = Object.keys(data);

  const invalidFields = keys.filter((field) => !allowedFields.includes(field));
  if (invalidFields.length > 0) {
    // Meter los invalidFields en un Json { clave: valor }
    let send = {};
    for (let i = 0; i < invalidFields.length; i++) {
      send[invalidFields[i]] = `"${invalidFields[i]} no es un campo válido"`;
    }
    return ApiResponse(400, "Campos inválidos: ", send);
  }

  const missingFields = allowedFields.filter((field) => !keys.includes(field));
  if (missingFields.length > 0) {
    let send = {};
    for (let i = 0; i < missingFields.length; i++) {
      send[missingFields[i]] = `"${missingFields[i]} es un campo obligatorio"`;
    }
    return ApiResponse(400, "Campos faltantes: ", send);
  }

  return ApiResponse(200, "Formulario válido", null);
};

//validar campo no vacio
export const validateFieldNotEmpty = (field) => {
  return field.trim().length > 0;
};

//validar email
export const validateEmail = (email) => {
  const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return regex.test(email);
};

//validar tipo de campo
export const validatTypeOfField = (field, type) => {
  return typeof field === type;
};

//validar formato de fecha yyyy-mm-dd
export const validateDate = (date) => {
  const regex = /^\d{4}-\d{2}-\d{2}$/;
  return regex.test(date);
};

//Vlidar contraseña segura
export const validatePassword = (password) => {
  // Debe contener al menos una letra minúscula (a-z).
  // Debe contener al menos una letra mayúscula (A-Z).
  // Debe contener al menos un número (0-9).
  // Debe contener al menos un carácter especial (@$!%*?&).
  // La contraseña debe tener al menos 8 caracteres y solo puede contener letras, números y los caracteres especiales permitidos.
  const regex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$.,!%*?&]{8,}$/;
  return regex.test(password);
};
