"use client";

import React from "react";
import ProtegerRuta from "../../../../app/protegerRuta";
import "./UsuarioPage.css";

const UsuarioPage: React.FC = () => {
  return (
    <ProtegerRuta roleRequired="usuario">
      <div className="usuario-container">
        <h1>Panel de Usuario</h1>
        <p>Aquí puedes ver y agendar tus citas.</p>
      </div>
    </ProtegerRuta>
  );
};

export default UsuarioPage;