import React from "react";
import { IoMedicalOutline } from "react-icons/io5";
import { FaUserMd, FaCalendarAlt, FaHeartbeat } from "react-icons/fa";

const PageLoading = () => {
  return (
    <div className="fixed inset-0 bg-white z-50 flex flex-col items-center justify-center">
      <div className="relative">
        <div className="absolute inset-0 bg-green-500/20 rounded-full animate-ping"></div>
        <div className="relative bg-green-600 p-8 rounded-full animate-[spin_3s_linear_infinite]">
          <IoMedicalOutline className="w-16 h-16 text-white" />
        </div>
      </div>

      <div className="relative w-32 h-32 mt-8">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2">
          <div className="bg-sky-600 p-3 rounded-full animate-[spin_3s_linear_infinite]">
            <FaUserMd className="w-6 h-6 text-white" />
          </div>
        </div>

        <div className="absolute top-1/2 right-0 -translate-y-1/2 translate-x-1/2">
          <div className="bg-green-600 p-3 rounded-full animate-[spin_3s_linear_infinite_reverse]">
            <FaCalendarAlt className="w-6 h-6 text-white" />
          </div>
        </div>

        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2">
          <div className="bg-red-600 p-3 rounded-full animate-[spin_2s_linear_infinite]">
            <FaHeartbeat className="w-6 h-6 text-white" />
          </div>
        </div>
      </div>

      <div className="mt-8 text-center">
        <h2 className="text-2xl font-bold text-gray-700 mb-2">
          HyperAgendados
        </h2>
        <p className="text-gray-600 flex items-center justify-center gap-2">
          Cargando
          <span className="inline-flex gap-1">
            <span className="w-2 h-2 bg-green-600 rounded-full animate-bounce [animation-delay:-0.3s]"></span>
            <span className="w-2 h-2 bg-green-600 rounded-full animate-bounce [animation-delay:-0.2s]"></span>
            <span className="w-2 h-2 bg-green-600 rounded-full animate-bounce"></span>
          </span>
        </p>
      </div>
    </div>
  );
};

export default PageLoading;
