import React from "react";

const LoadingScreen = () => {
  return (
    <div className="fixed inset-0 bg-white flex flex-col items-center justify-center min-h-screen">
      <div className="relative">
        <div className="absolute -inset-4 bg-green-500/20 rounded-full animate-pulse"></div>

        <div className="relative bg-white p-6 rounded-lg shadow-2xl">
          <div className="w-16 h-16 relative">
            <div className="absolute inset-0 bg-green-600 rounded-md rotate-0 transform transition-transform ">
              <div className="absolute inset-y-2 inset-x-6 bg-white"></div>
              <div className="absolute inset-x-2 inset-y-6 bg-white"></div>
            </div>
          </div>
        </div>

        {/* Círculos decorativos animados */}
        <div className="absolute -inset-1 flex items-center justify-center">
          <div className="w-full h-full border-4 border-green-500/30 rounded-full animate-[spin_2s_linear_infinite]"></div>
        </div>
        <div className="absolute -inset-2 flex items-center justify-center">
          <div className="w-full h-full border-4 border-green-500/20 rounded-full animate-[spin_3s_linear_infinite_reverse]"></div>
        </div>
      </div>

      {/* Texto de carga */}
      <div className="mt-8 text-center">
        <h2 className="text-2xl font-semibold text-gray-700 mb-2 flex justify-center items-center gap-x-2">
          Cargando
          <div className="flex items-center gap-x-2">
            <div className="w-2.5 h-2.5 bg-green-600 rounded-full animate-bounce [animation-delay:-0.3s]"></div>
            <div className="w-2.5 h-2.5 bg-green-600 rounded-full animate-bounce [animation-delay:-0.2s]"></div>
            <div className="w-2.5 h-2.5 bg-green-600 rounded-full animate-bounce"></div>
          </div>
        </h2>

        <p className="mt-4 text-gray-500">Preparando su cita médica</p>
      </div>
    </div>
  );
};

export default LoadingScreen;
