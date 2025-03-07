"use client";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const HomePage = () => {
  const router = useRouter();

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user") || "{}");
    if (user.role === "admin") router.push("/admin");
    else if (user.role === "empleado") router.push("/empleado");
    else if (user.role === "usuario") router.push("/usuario");
  }, [router]);

  const handleLogin = (role: "admin" | "empleado" | "usuario") => {
    localStorage.setItem("user", JSON.stringify({ role }));
    if (role === "admin") router.push("/admin");
    else if (role === "empleado") router.push("/empleado");
    else if (role === "usuario") router.push("/usuario");
  };

  return (
    <div>
      <h1>Iniciar Sesión</h1>
      <button onClick={() => handleLogin("admin")}>Login como Admin</button>
      <button onClick={() => handleLogin("empleado")}>Login como Empleado</button>
      <button onClick={() => handleLogin("usuario")}>Login como Usuario</button>
    </div>
  );
};

export default HomePage;
