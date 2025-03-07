"use client";
import ProtegerRuta from "../protegerRuta";
import "./UsuarioPage.css";

const UsuarioPage = () => {
  return (
    <ProtegerRuta roleRequired="usuario">
      <div className="usuario-container">
        <h1>Panel de Usuario</h1>
        <p>Bienvenido, aquí puedes agendar y gestionar tus citas médicas.</p>
      </div>
    </ProtegerRuta>
  );
};

export default UsuarioPage;
