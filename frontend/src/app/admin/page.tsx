"use client";
import ProtegerRuta from "../protegerRuta";
import "./AdminPage.css";

const AdminPage = () => {
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
