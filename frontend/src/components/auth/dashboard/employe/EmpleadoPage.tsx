import React, { useState, useEffect } from "react";

const EmpleadoPage = () => {
  const [citas, setCitas] = useState<Cita[]>([]);
  const [nuevaCita, setNuevaCita] = useState({
    profesion: "",
    fechaCita: "",
    sede: "",
    localidad: "",
  });

  useEffect(() => {
    fetch("http://localhost:3000/api/citas")
      .then((response) => {
        if (!response.ok) {
          console.error("Error en la respuesta de la API", response);
          return [];
        }
        return response.json();
      })
      .then((data) => setCitas(Array.isArray(data) ? data : []))
      .catch((error) => console.error("Error al cargar citas", error));
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNuevaCita({ ...nuevaCita, [e.target.name]: e.target.value });
  };

  const formatFecha = (fecha: string) => {
    if (!fecha) return "Fecha no disponible";
    return new Date(fecha).toLocaleString();
  };

  const agregarCita = () => {
    if (!nuevaCita.profesion || !nuevaCita.fechaCita || !nuevaCita.sede || !nuevaCita.localidad) {
      alert("Todos los campos son obligatorios");
      return;
    }

    fetch("http://localhost:3000/api/citas", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...nuevaCita, estado: "Disponible" }),
    })
      .then((response) => {
        if (!response.ok) {
          console.error("Error al agregar cita", response);
          return null;
        }
        return response.json();
      })
      .then((data) => {
        if (data) {
          setCitas([...citas, data]);
        }
      })
      .catch((error) => console.error("Error al agregar cita", error));

    setNuevaCita({ profesion: "", fechaCita: "", sede: "", localidad: "" });
  };

  const eliminarCita = (idCita: string) => {
    fetch(`http://localhost:3000/api/citas/${idCita}`, { method: "DELETE" })
      .then((response) => {
        if (!response.ok) {
          console.error("Error al eliminar cita", response);
          return;
        }
        setCitas((prevCitas) => prevCitas.filter((cita) => cita.idCita !== idCita));
      })
      .catch((error) => console.error("Error al eliminar cita", error));
  };

  const cerrarSesion = () => {
    window.location.href = "http://localhost:3001";
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-md rounded-lg">
      <h2 className="text-3xl font-semibold text-center text-green-800 border-b-4 border-green-500 pb-2 mb-6">
        Panel de Empleado
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-green-100 p-6 rounded-lg border-l-4 border-green-700">
        <input className="p-3 border rounded-lg focus:border-green-700 focus:ring-2 focus:ring-green-300"
          type="text" name="profesion" placeholder="Profesión"
          value={nuevaCita.profesion} onChange={handleChange} />
        <input className="p-3 border rounded-lg focus:border-green-700 focus:ring-2 focus:ring-green-300"
          type="datetime-local" name="fechaCita"
          value={nuevaCita.fechaCita} onChange={handleChange} />
        <input className="p-3 border rounded-lg focus:border-green-700 focus:ring-2 focus:ring-green-300"
          type="text" name="sede" placeholder="Sede"
          value={nuevaCita.sede} onChange={handleChange} />
        <input className="p-3 border rounded-lg focus:border-green-700 focus:ring-2 focus:ring-green-300"
          type="text" name="localidad" placeholder="Localidad"
          value={nuevaCita.localidad} onChange={handleChange} />
        <button className="col-span-1 md:col-span-2 bg-green-700 text-white p-3 rounded-lg font-bold hover:bg-green-600 transition"
          onClick={agregarCita} title="Crear una nueva cita">
          Crear Cita
        </button>
      </div>

      <h3 className="text-2xl font-semibold text-green-800 mt-6">Citas Creadas</h3>
      <table className="w-full border-collapse border mt-4 shadow-md rounded-lg overflow-hidden">
        <thead>
          <tr className="bg-green-700 text-white">
            <th className="border p-3">Profesión</th>
            <th className="border p-3">Fecha y Hora</th>
            <th className="border p-3">Sede</th>
            <th className="border p-3">Localidad</th>
            <th className="border p-3">Estado</th>
            <th className="border p-3">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {citas.length > 0 ? (
            citas.map((cita) => (
              <tr key={cita.idCita} className="text-center even:bg-green-100 hover:bg-green-200 transition">
                <td className="border p-3">{cita.profesion || "No especificado"}</td>
                <td className="border p-3">{formatFecha(cita.fechaCita)}</td>
                <td className="border p-3">{cita.sede || "No especificado"}</td>
                <td className="border p-3">{cita.localidad || "No especificado"}</td>
                <td className="border p-3 font-bold text-green-900">{cita.estado || "Desconocido"}</td>
                <td className="border p-3">
                  <button className="bg-red-600 text-white p-2 rounded-lg hover:bg-red-500 transition"
                    onClick={() => eliminarCita(cita.idCita)} title="Eliminar esta cita">
                    Eliminar
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={6} className="text-center p-4">No hay citas registradas.</td>
            </tr>
          )}
        </tbody>
      </table>
      
      <div className="fixed bottom-6 right-6">
        <button 
          className="bg-red-700 text-white px-4 py-2 rounded-lg font-bold hover:bg-red-600 transition shadow-lg"
          onClick={cerrarSesion}
          title="Cerrar sesión"
        >
          Cerrar Sesión
        </button>
      </div>
    </div>
  );
};

export default EmpleadoPage;