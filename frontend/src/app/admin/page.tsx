"use client";

import React from "react";
import ProtegerRuta from "../protegerRuta";
import "../admin/AdminPage.css"; // Importación correcta

const AdminPage: React.FC = () => {
  return (
    <ProtegerRuta roleRequired="admin">
      <div className="admin-container">
        <h1>Panel de Administrador</h1>
        <p>Bienvenido, aquí puedes gestionar las citas y usuarios.</p>
      </div>
    </ProtegerRuta>
  );
};

export default AdminPage;
