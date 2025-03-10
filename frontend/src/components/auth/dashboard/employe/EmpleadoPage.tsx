
import React, { useState, useEffect } from "react";
import "./EmpleadoPage.css";

const EmpleadoPage = () => {
  const [citas, setCitas] = useState([]);
  const [nuevaCita, setNuevaCita] = useState({
    profesion: "",
    fechaCita: "",
    sede: "",
    localidad: ""
  });

  useEffect(() => {
    fetch("http://localhost:3000/api/citas")
      .then((response) => response.json())
      .then((data) => setCitas(data))
      .catch((error) => console.error("Error al cargar citas", error));
  }, []);

  const handleChange = (e) => {
    setNuevaCita({ ...nuevaCita, [e.target.name]: e.target.value });
  };

  const agregarCita = () => {
    if (!nuevaCita.profesion || !nuevaCita.fechaCita || !nuevaCita.sede || !nuevaCita.localidad) {
      alert("Todos los campos son obligatorios");
      return;
    }
    
    fetch("http://localhost:3000/api/citas", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...nuevaCita, estado: "Disponible" })
    })
      .then((response) => response.json())
      .then((data) => setCitas([...citas, data]))
      .catch((error) => console.error("Error al agregar cita", error));
    
    setNuevaCita({ profesion: "", fechaCita: "", sede: "", localidad: "" });
  };

  const eliminarCita = (idCita) => {
    fetch(`http://localhost:3000/api/citas/${idCita}`, { method: "DELETE" })
      .then(() => setCitas(citas.filter((cita) => cita.idCita !== idCita)))
      .catch((error) => console.error("Error al eliminar cita", error));
  };

  return (
    <div className="empleado-container">
      <h2>Panel de Empleado</h2>
      <div className="formulario">
        <input type="text" name="profesion" placeholder="Profesión" value={nuevaCita.profesion} onChange={handleChange} />
        <input type="datetime-local" name="fechaCita" value={nuevaCita.fechaCita} onChange={handleChange} />
        <input type="text" name="sede" placeholder="Sede" value={nuevaCita.sede} onChange={handleChange} />
        <input type="text" name="localidad" placeholder="Localidad" value={nuevaCita.localidad} onChange={handleChange} />
        <button onClick={agregarCita} title="Crear una nueva cita">Crear Cita</button>
      </div>

      <h3>Citas Creadas</h3>
      <table>
        <thead>
          <tr>
            <th>Profesión</th>
            <th>Fecha y Hora</th>
            <th>Sede</th>
            <th>Localidad</th>
            <th>Estado</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {citas.map((cita) => (
            <tr key={cita.idCita}>
              <td>{cita.profesion}</td>
              <td>{cita.fechaCita}</td>
              <td>{cita.sede}</td>
              <td>{cita.localidad}</td>
              <td>{cita.estado}</td>
              <td>
                <button onClick={() => eliminarCita(cita.idCita)} title="Eliminar esta cita">Eliminar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default EmpleadoPage;
