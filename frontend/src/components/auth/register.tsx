"use client";
import { useState } from "react";
import { useForm } from "react-hook-form";

const steps = ["Datos personales", "Contacto", "Cuenta"];

const Register = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const nextStep = () => {
    if (currentStep < steps.length - 1) setCurrentStep(currentStep + 1);
  };

  const prevStep = () => {
    if (currentStep > 0) setCurrentStep(currentStep - 1);
  };

  const onSubmit = handleSubmit((data) => {
    console.log(data);
  });

  return (
    <section className="flex flex-col items-center bg-white shadow-md rounded-lg px-8 py-4 w-full mx-auto">
      <h1 className="text-3xl font-bold text-gray-800 mb-2">Nuevo usuario</h1>
      <div className="mb-4 text-lg font-semibold">{steps[currentStep]}</div>
      <Stepper currentStep={currentStep} />

      <form
        onSubmit={onSubmit}
        className="w-full"
      ></form>

      <div className="flex gap-4">
        <button
          onClick={prevStep}
          disabled={currentStep === 0}
          className={`px-4 items-center cursor-pointer disabled:cursor-not-allowed py-2 rounded bg-gray-400 text-white disabled:opacity-50`}
        >
          Atrás
        </button>
        <button
          onClick={nextStep}
          disabled={currentStep === steps.length - 1}
          className="px-4 py-2 rounded bg-blue-500 text-white hover:bg-blue-700"
        >
          Siguiente
        </button>
      </div>
      {/* <p className="text-gray-500 mb-6">Bienvenido</p>
          <form
            onSubmit={onSubmit}
            className="w-full"
          >
            <div className="mb-4">
              <div className="flex items-center border border-gray-300 rounded-md px-3 py-2 focus-within:border-sky-500">
                <FaUser className="text-gray-400" />
                <input
                  className="w-full ml-2 outline-none text-gray-700"
                  type="text"
                  placeholder="Ingrese su usuario"
                  {...register("username", {
                    required: "El usuario es requerido",
                  })}
                />
              </div>
              {errors.username && typeof errors.username.message === "string" && (
                <span className="text-red-500 text-xs italic">
                  {errors.username.message}
                </span>
              )}
            </div>
    
            <div className="mb-4">
              <div className="flex items-center border border-gray-300 rounded-md px-3 py-2 focus-within:border-sky-500">
                <FaKey className="text-gray-400" />
                <input
                  className="w-full ml-2 outline-none text-gray-700"
                  type="password"
                  placeholder="Ingrese su contraseña"
                  {...register("password", {
                    required: "La contraseña es requerida",
                  })}
                />
              </div>
              {errors.password && typeof errors.password.message === "string" && (
                <span className="text-red-500 text-xs italic">
                  {errors.password.message}
                </span>
              )}
            </div>
    
            {showError && <p className="text-red-600 text-sm mb-4">{showError}</p>}
    
            <button
              type="submit"
              className="w-full bg-sky-600 text-white py-2 rounded-md shadow-md hover:bg-sky-700 transition"
            >
              Iniciar sesión
            </button>
    
            <div className="text-center my-4 text-gray-500">o</div>
    
            <button
              type="button"
              className="w-full bg-gray-600 text-white py-2 rounded-md shadow-md hover:bg-gray-700 transition"
              onClick={() => setView("register")}
            >
              Registrarse
            </button>
          </form> */}
    </section>
  );
};

const Stepper = ({ currentStep }: { currentStep: number }) => {
  return (
    <div className="flex items-center justify-center my-4">
      {steps.map((step, index) => (
        <div
          key={index}
          className="flex items-center"
        >
          {index > 0 && (
            <div
              className={`h-1 w-8 md:w-16 transition-colors duration-300 ${
                index <= currentStep ? "bg-blue-500" : "bg-gray-300"
              }`}
            ></div>
          )}
          <div
            className={`w-10 h-10 flex items-center justify-center rounded-full text-white font-bold transition-all duration-300 ${
              index === currentStep
                ? "bg-blue-500 scale-110"
                : index < currentStep
                ? "bg-blue-300"
                : "bg-gray-300"
            }`}
          >
            {index + 1}
          </div>
        </div>
      ))}
    </div>
  );
};

export default Register;
