"use client";
import ProtegerRuta from "../protegerRuta";
import "./EmpleadoPage.css";

const EmpleadoPage = () => {
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
