import React from "react";
import { FaLock, FaExclamationTriangle } from "react-icons/fa";
import { motion } from "framer-motion";

const AccessDenied = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="max-w-md w-full bg-white rounded-lg shadow-2xl overflow-hidden"
      >
        <div className="p-8">
          <div className="text-center">
            <motion.div
              initial={{ rotate: 0 }}
              animate={{ rotate: [0, -10, 10, -10, 10, 0] }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="inline-block"
            >
              <FaLock className="text-6xl text-red-500 mx-auto mb-4" />
            </motion.div>

            <motion.h2
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="text-3xl font-bold text-gray-800 mb-2"
            >
              Acceso Denegado
            </motion.h2>

            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="flex items-center justify-center space-x-2 text-yellow-600 mb-4"
            >
              <FaExclamationTriangle />
              <span>Error de autenticación</span>
            </motion.div>

            <motion.p
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.5 }}
              className="text-gray-600 mb-6"
            >
              Lo sentimos, no tienes permisos para acceder a esta página. Por
              favor, contacta al administrador si crees que esto es un error.
            </motion.p>

            <motion.button
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.6 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-red-500 text-white px-6 py-3 rounded-lg font-semibold
                       hover:bg-red-600 transition-colors duration-300
                       shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 cursor-pointer"
              onClick={() => (window.location.href = "/")}
            >
              Volver al Inicio
            </motion.button>
          </div>
        </div>

        <motion.div
          initial={{ height: 0 }}
          animate={{ height: "4px" }}
          transition={{ duration: 0.5, delay: 0.7 }}
          className="bg-gradient-to-r from-red-500 via-yellow-500 to-red-500"
        />
      </motion.div>
    </div>
  );
};

export default AccessDenied;
