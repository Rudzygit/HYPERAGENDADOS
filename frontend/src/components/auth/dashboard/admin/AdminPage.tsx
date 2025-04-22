import React from "react";

const AdminPage = () => {
  return (
    <div className="max-w-5xl mx-auto p-6 bg-white shadow-md rounded-lg">
      <h2 className="text-3xl font-semibold text-center text-red-800 border-b-4 border-red-500 pb-2 mb-6">
        Panel de Administrador
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-red-100 p-6 rounded-lg border-l-4 border-red-700">
        <input
          className="p-3 border rounded-lg focus:border-red-700 focus:ring-2 focus:ring-red-300"
          type="text"
          placeholder="Nombre del Usuario"
        />
        <input
          className="p-3 border rounded-lg focus:border-red-700 focus:ring-2 focus:ring-red-300"
          type="email"
          placeholder="Correo Electrónico"
        />
        <select
          className="p-3 border rounded-lg focus:border-red-700 focus:ring-2 focus:ring-red-300"
        >
          <option>Seleccionar Rol</option>
          <option value="admin">Administrador</option>
          <option value="empleado">Empleado</option>
          <option value="usuario">Usuario</option>
        </select>
        <input
          className="p-3 border rounded-lg focus:border-red-700 focus:ring-2 focus:ring-red-300"
          type="password"
          placeholder="Contraseña"
        />

        <button
          className="col-span-1 md:col-span-2 bg-red-700 text-white p-3 rounded-lg font-bold hover:bg-red-600 transition"
          title="Crear un nuevo usuario"
        >
          Crear Usuario
        </button>
      </div>

      <h3 className="text-2xl font-semibold text-red-800 mt-6">Usuarios Registrados</h3>
      <table className="w-full border-collapse border mt-4 shadow-md rounded-lg overflow-hidden">
        <thead>
          <tr className="bg-red-700 text-white">
            <th className="border p-3">Nombre</th>
            <th className="border p-3">Correo</th>
            <th className="border p-3">Rol</th>
            <th className="border p-3">Acciones</th>
          </tr>
        </thead>
        <tbody>
          <tr className="text-center even:bg-red-100 hover:bg-red-200 transition">
            <td className="border p-3">Juan Pérez</td>
            <td className="border p-3">juan@example.com</td>
            <td className="border p-3 font-semibold text-red-700">Empleado</td>
            <td className="border p-3 flex justify-center gap-2">
              <button
                className="bg-yellow-500 text-white px-3 py-1 rounded-lg hover:bg-yellow-400 transition"
                title="Editar usuario"
              >
                Editar
              </button>
              <button
                className="bg-red-600 text-white px-3 py-1 rounded-lg hover:bg-red-500 transition"
                title="Eliminar usuario"
              >
                Eliminar
              </button>
            </td>
          </tr>
          <tr>
            <td colSpan={4} className="text-center p-4 text-gray-500 italic">
              (Aquí aparecerán los usuarios una vez registrados)
            </td>
          </tr>
        </tbody>
      </table>

      <div className="fixed bottom-6 right-6">
        <button 
          className="bg-red-700 text-white px-4 py-2 rounded-lg font-bold hover:bg-red-600 transition shadow-lg"
          title="Cerrar sesión"
        >
          Cerrar Sesión
        </button>
      </div>
    </div>
  );
};

export default AdminPage;
