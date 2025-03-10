"use client";

import React, { useEffect, useState } from "react";
import ProtegerRuta from "../../protegerRuta";
import "./AdminPage.css";

// Definimos interfaces para los datos
interface Cita {
  idCita: number;
  fechaCita: string;
  horaCita: string;
}

interface Usuario {
  idUsuario: number;
  usuario: string;
  rol: string;
}

const AdminPage: React.FC = () => {
  const [citas, setCitas] = useState<Cita[]>([]);
  const [usuarios, setUsuarios] = useState<Usuario[]>([]);

  useEffect(() => {
    fetch("http://localhost:3000/api/citas")
      .then((res) => res.json())
      .then((data) => setCitas(data))
      .catch((error) => console.error("Error cargando citas:", error));

    fetch("http://localhost:3000/api/usuarios")
      .then((res) => res.json())
      .then((data) => setUsuarios(data))
      .catch((error) => console.error("Error cargando usuarios:", error));
  }, []);

  return (
    <ProtegerRuta roleRequired="admin">
      <div className="admin-container">
        <h1>Panel de Administrador</h1>
        <p>Gestión de citas y usuarios</p>

        {/* Listado de Citas */}
        <section aria-labelledby="citas-title">
          <h2 id="citas-title">Citas</h2>
          <ul>
            {citas.map((cita) => (
              <li key={cita.idCita}>
                {cita.fechaCita} - {cita.horaCita}
                <button 
                  aria-label="Editar cita" 
                  title="Editar cita"
                  className="edit-button"
                >
                  ✏️
                </button>
                <button 
                  aria-label="Eliminar cita" 
                  title="Eliminar cita"
                  className="delete-button"
                >
                  ❌
                </button>
              </li>
            ))}
          </ul>
        </section>

        {/* Listado de Usuarios */}
        <section aria-labelledby="usuarios-title">
          <h2 id="usuarios-title">Usuarios</h2>
          <ul>
            {usuarios.map((usuario) => (
              <li key={usuario.idUsuario}>
                {usuario.usuario} - {usuario.rol}
                <button 
                  aria-label="Editar usuario" 
                  title="Editar usuario"
                  className="edit-button"
                >
                  ✏️
                </button>
                <button 
                  aria-label="Eliminar usuario" 
                  title="Eliminar usuario"
                  className="delete-button"
                >
                  ❌
                </button>
              </li>
            ))}
          </ul>
        </section>
      </div>
    </ProtegerRuta>
  );
};

export default AdminPage;
