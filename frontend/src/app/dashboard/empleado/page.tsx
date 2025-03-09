"use client";

import React from "react";
import ProtegerRuta from "../../protegerRuta";
import "./EmpleadoPage.css";

const EmpleadoPage: React.FC = () => {
  return (
    <ProtegerRuta roleRequired="empleado">
      <div className="empleado-container">
        <h1>Panel de Empleado</h1>
        <p>Aquí puedes gestionar tus citas.</p>
      </div>
    </ProtegerRuta>
  );
};

export default EmpleadoPage;
