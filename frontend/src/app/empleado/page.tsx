"use client";

import React from "react";
import ProtegerRuta from "../protegerRuta";
import "../empleado/EmpleadoPage.css"; // Importación correcta

const EmpleadoPage: React.FC = () => {
  return (
    <ProtegerRuta roleRequired="empleado">
      <div className="empleado-container">
        <h1>Panel de Empleado</h1>
        <p>Bienvenido, aquí puedes gestionar tus citas.</p>
      </div>
    </ProtegerRuta>
  );
};

export default EmpleadoPage;
