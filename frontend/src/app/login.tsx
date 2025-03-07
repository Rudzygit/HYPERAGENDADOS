import React, { useState } from "react";
import { useRouter } from "next/router";

const LoginPage = () => {
  const router = useRouter();
  const [role, setRole] = useState("");

  const handleLogin = () => {
    localStorage.setItem("userRole", role);
    if (role === "admin") {
      router.push("/admin");
    } else if (role === "empleado") {
      router.push("/empleado");
    } else if (role === "usuario") {
      router.push("/usuario");
    } else {
      alert("Rol inválido");
    }
  };

  return (
    <div>
      <h1>Iniciar Sesión</h1>
      <select onChange={(e) => setRole(e.target.value)}>
        <option value="">Selecciona un rol</option>
        <option value="admin">Administrador</option>
        <option value="empleado">Empleado</option>
        <option value="usuario">Usuario</option>
      </select>
      <button onClick={handleLogin}>Ingresar</button>
    </div>
  );
};

export default LoginPage;
