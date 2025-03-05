import React, { useState } from "react";
import "./App.css"; // Importamos los estilos

function Inicio() {
  const [usuario, setUsuario] = useState("");
  const [contraseña, setContraseña] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:5000/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ usuario, contraseña }),
      });
      const data = await response.json();
      console.log(data);
      if (data.message) {
        alert(data.message); // Mostrar mensaje de éxito
      } else {
        alert(data.error); // Mostrar mensaje de error
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <main className="login-container">
      <h1>HYPERAGENDADOS</h1>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="usuario">Usuario:</label>
          <input
            type="text"
            id="usuario"
            value={usuario}
            onChange={(e) => setUsuario(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="contraseña">Contraseña:</label>
          <input
            type="password"
            id="contraseña"
            value={contraseña}
            onChange={(e) => setContraseña(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="ingresar-button">
          Ingresar
        </button>
      </form>
      <div className="enlaces-container">
        <a href="#" className="enlace-button">
          Olvidé mis datos
        </a>
        <a href="#" className="enlace-button">
          Registrar
        </a>
      </div>
    </main>
  );
}

export default Inicio;