"use client";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { FaUser, FaKey, FaEye, FaEyeSlash } from "react-icons/fa";
import { IoMail } from "react-icons/io5";
import { FaPhone } from "react-icons/fa";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { RiAccountCircleFill } from "react-icons/ri";

const steps = ["Datos personales", "Contacto", "Cuenta"];

interface registerProps {
  setView: (view: "login" | "register") => void;
  addAlert: (
    message: string,
    type?: "success" | "error" | "warning" | "info"
  ) => void;
}

const Register = ({ setView, addAlert }: registerProps) => {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(0);
  const [showPassword, setShowPassword] = useState(false);
  const [tipoDocumento, setTipoDocumento] = useState<
    { idDocumento: number; nombre: string }[] | null
  >(null);
  const [profesiones, setProfesiones] = useState<
    { idProfesion: number; nombre: string }[] | null
  >(null);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    const fetchProfesiones = async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/profesiones`
        );
        const data = await response.json();
        setProfesiones(data.data);
      } catch (error) {
        console.error("Error al obtener profesiones:", error);
      }
    };

    const fetchTipoDocumento = async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/tipo-documentos`
        );
        const data = await response.json();
        setTipoDocumento(data.data);
      } catch (error) {
        console.error("Error al obtener tipos de documento:", error);
      }
    };
    fetchTipoDocumento();
    fetchProfesiones();
  }, []);

  useEffect(() => {
    if (
      errors.primerNombre ||
      errors.apellido1 ||
      errors.apellido2 ||
      errors.idDocumento ||
      errors.fechaNacimiento ||
      errors.idProfesion ||
      errors.documento ||
      errors.telefono
    ) {
    }
  }, [errors]);

  const nextStep = () => {
    if (currentStep < steps.length - 1) setCurrentStep(currentStep + 1);
  };

  const prevStep = () => {
    if (currentStep > 0) setCurrentStep(currentStep - 1);
  };

  const onSubmit = handleSubmit(async (data) => {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/register`,
        {
          method: "POST",
          body: JSON.stringify({
            primerNombre: data.primerNombre,
            segundoNombre: data.segundoNombre,
            apellido1: data.apellido1,
            apellido2: data.apellido2,
            idDocumento: parseInt(data.idDocumento),
            documento: data.documento,
            idProfesion: parseInt(data.idProfesion),
            fechaNacimiento: data.fechaNacimiento,
            telefono: data.telefono,
            correoElectronico: data.correoElectronico,
            usuario: data.usuario,
            password: data.password,
          }),
          headers: { "Content-Type": "application/json" },
        }
      );
      const response = await res.json();
      console.log(response);

      if (response.status !== 200 && response.status !== 201) {
        if (response.data) {
          response.data.forEach((error: { [key: string]: string }) => {
            const message = Object.values(error)[0];
            addAlert(message, "error");
          });
        } else {
          addAlert(response.message, "error");
        }

        return;
      }

      addAlert("Usuario registrado exitosamente", "success");
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "Error desconocido";
      addAlert(`Error al conectar con el servidor: ${errorMessage}`, "error");
      return;
    }

    try {
      const resAuth = await signIn("credentials", {
        username: data.usuario,
        password: data.password,
        redirect: false,
      });

      if (resAuth?.error) {
        addAlert(resAuth.error, "error");
        return;
      }

      addAlert("Inicio de sesión exitoso", "success");
      setTimeout(() => router.push("/dashboard/"), 500);
    } catch (error) {
      addAlert(`Error al conectar con el servidor ${error}`, "error");
      return;
    }
  });

  return (
    <section className="flex flex-col items-center bg-white shadow-md rounded-lg p-2 lg:px-8 lg:py-4 w-full mx-auto">
      <h1 className="text-3xl font-bold text-gray-800 mb-2">Nuevo usuario</h1>
      <div className="mb-4 text-lg font-semibold">{steps[currentStep]}</div>

      <form
        onSubmit={onSubmit}
        className="w-full"
      >
        <div
          className={`${
            currentStep === 0 ? "block" : "hidden"
          } grid grid-cols-1 lg:grid-cols-2 gap-4`}
        >
          <div className="mb-4">
            <div className="flex items-center border border-gray-300 rounded-md px-3 py-2 focus-within:border-sky-500">
              <FaUser className="text-gray-400" />
              <input
                className="w-full ml-2 outline-none text-gray-700"
                type="text"
                placeholder="Ingrese su primer nombre *"
                {...register("primerNombre", {
                  required: "El primer nombre es obligatorio",
                })}
              />
            </div>
            {errors.primerNombre &&
              typeof errors.primerNombre.message === "string" && (
                <span className="text-red-500 text-xs italic">
                  {errors.primerNombre.message}
                </span>
              )}
          </div>
          <div className="mb-4">
            <div className="flex items-center border border-gray-300 rounded-md px-3 py-2 focus-within:border-sky-500">
              <FaUser className="text-gray-400" />
              <input
                className="w-full ml-2 outline-none text-gray-700"
                type="text"
                placeholder="Ingrese su segundo nombre"
                {...register("segundoNombre")}
              />
            </div>
            {errors.segundoNombre &&
              typeof errors.segundoNombre.message === "string" && (
                <span className="text-red-500 text-xs italic">
                  {errors.segundoNombre.message}
                </span>
              )}
          </div>

          <div className="mb-4">
            <div className="flex items-center border border-gray-300 rounded-md px-3 py-2 focus-within:border-sky-500">
              <FaUser className="text-gray-400" />
              <input
                className="w-full ml-2 outline-none text-gray-700"
                type="text"
                placeholder="Ingrese su primer apellido *"
                {...register("apellido1", {
                  required: "El primer apellido es obligatorio",
                })}
              />
            </div>
            {errors.apellido1 &&
              typeof errors.apellido1.message === "string" && (
                <span className="text-red-500 text-xs italic">
                  {errors.apellido1.message}
                </span>
              )}
          </div>
          <div className="mb-4">
            <div className="flex items-center border border-gray-300 rounded-md px-3 py-2 focus-within:border-sky-500">
              <FaUser className="text-gray-400" />
              <input
                className="w-full ml-2 outline-none text-gray-700"
                type="text"
                placeholder="Ingrese su segundo apellido"
                {...register("apellido2")}
              />
            </div>
            {errors.apellido2 &&
              typeof errors.apellido2.message === "string" && (
                <span className="text-red-500 text-xs italic">
                  {errors.apellido2.message}
                </span>
              )}
          </div>

          <div className="mb-4">
            <div className="flex items-center border border-gray-300 rounded-md px-3 py-2 focus-within:border-sky-500">
              <FaUser className="text-gray-400" />
              <select
                className="w-full cursor-pointer ml-2 outline-none text-gray-700"
                {...register("idDocumento", {
                  required: {
                    value: true,
                    message: "El tipo de documento es obligatorio",
                  },
                })}
              >
                <option defaultValue={""}>
                  Seleccione un tipo de documento *
                </option>
                {tipoDocumento &&
                  tipoDocumento.map(
                    (documento: { idDocumento: number; nombre: string }) => (
                      <option
                        key={documento.idDocumento}
                        value={documento.idDocumento}
                      >
                        {documento.nombre}
                      </option>
                    )
                  )}
              </select>
            </div>
            {errors.idDocumento &&
              typeof errors.idDocumento.message === "string" && (
                <span className="text-red-500 text-xs italic">
                  {errors.idDocumento.message}
                </span>
              )}
          </div>

          <div className="mb-4">
            <div className="flex items-center border border-gray-300 rounded-md px-3 py-2 focus-within:border-sky-500">
              <FaUser className="text-gray-400" />
              <input
                className="w-full ml-2 outline-none text-gray-700"
                type="text"
                placeholder="Ingrese su numero de documento *"
                {...register("documento", {
                  required: {
                    value: true,
                    message: "El documento es obligatorio",
                  },
                })}
              />
            </div>
            {errors.documento &&
              typeof errors.documento.message === "string" && (
                <span className="text-red-500 text-xs italic">
                  {errors.documento.message}
                </span>
              )}
          </div>

          <div className="mb-4">
            <div className="flex items-center border border-gray-300 rounded-md px-3 py-2 focus-within:border-sky-500">
              <FaUser className="text-gray-400" />
              <select
                className="w-full ml-2 cursor-pointer outline-none text-gray-700"
                {...register("idProfesion", {
                  required: {
                    value: true,
                    message: "El tipo de documento es obligatorio",
                  },
                })}
              >
                <option defaultValue={""}>Seleccione una profesion *</option>
                {profesiones &&
                  profesiones.map(
                    (prof: { idProfesion: number; nombre: string }) => (
                      <option
                        key={prof.idProfesion}
                        value={prof.idProfesion}
                      >
                        {prof.nombre}
                      </option>
                    )
                  )}
              </select>
            </div>
            {errors.idProfesion &&
              typeof errors.idProfesion.message === "string" && (
                <span className="text-red-500 text-xs italic">
                  {errors.idProfesion.message}
                </span>
              )}
          </div>

          <div className="mb-4">
            <div className="flex items-center border border-gray-300 rounded-md px-3 py-2 focus-within:border-sky-500">
              <FaUser className="text-gray-400" />
              <input
                className="w-full ml-2 outline-none text-gray-700 cursor-pointer"
                type="date"
                placeholder="Fecha de nacimiento *"
                max={(() => {
                  const date = new Date();
                  date.setHours(date.getHours() - 12);
                  return date.toISOString().split("T")[0];
                })()}
                {...register("fechaNacimiento", {
                  required: {
                    value: true,
                    message: "La fecha de nacimiento es obligatoria",
                  },
                  validate: {
                    notFuture: (value) => {
                      const date = new Date(value);
                      const maxDate = new Date();
                      maxDate.setHours(maxDate.getHours() - 12);
                      return (
                        date <= maxDate || "La fecha ingresada no es valida"
                      );
                    },
                  },
                })}
              />
            </div>
            {errors.documento &&
              typeof errors.documento.message === "string" && (
                <span className="text-red-500 text-xs italic">
                  {errors.documento.message}
                </span>
              )}
          </div>
        </div>

        <div
          className={`${
            currentStep === 1 ? "block" : "hidden"
          } grid grid-cols-1 lg:grid-cols-2 gap-4`}
        >
          <div className="mb-4">
            <div className="flex items-center border border-gray-300 rounded-md px-3 py-2 focus-within:border-sky-500">
              <FaPhone className="text-gray-400" />
              <input
                className="w-full ml-2 outline-none text-gray-700"
                type="text"
                placeholder="Ingrese su numero de telefono"
                {...register("telefono")}
              />
            </div>
            {errors.telefono && typeof errors.telefono.message === "string" && (
              <span className="text-red-500 text-xs italic">
                {errors.telefono.message}
              </span>
            )}
          </div>

          <div className="mb-4">
            <div className="flex items-center border border-gray-300 rounded-md px-3 py-2 focus-within:border-sky-500">
              <IoMail className="text-gray-400" />
              <input
                className="w-full ml-2 outline-none text-gray-700"
                type="email"
                placeholder="Ingrese su correo electronico *"
                {...register("correoElectronico", {
                  required: {
                    value: true,
                    message: "El documento es obligatorio",
                  },
                })}
              />
            </div>
            {errors.correoElectronico &&
              typeof errors.correoElectronico.message === "string" && (
                <span className="text-red-500 text-xs italic">
                  {errors.correoElectronico.message}
                </span>
              )}
          </div>
        </div>

        <div
          className={`${
            currentStep === 2 ? "block" : "hidden"
          } grid grid-cols-1 lg:grid-cols-2 gap-4`}
        >
          <div className="mb-4">
            <div className="flex items-center border border-gray-300 rounded-md px-3 py-2 focus-within:border-sky-500">
              <RiAccountCircleFill className="text-gray-400" />
              <input
                className="w-full ml-2 outline-none text-gray-700"
                type="text"
                placeholder="Ingrese usuario *"
                {...register("usuario", {
                  required: {
                    value: true,
                    message: "Debe establecer un usuario",
                  },
                })}
              />
            </div>
            {errors.usuario && typeof errors.usuario.message === "string" && (
              <span className="text-red-500 text-xs italic">
                {errors.usuario.message}
              </span>
            )}
          </div>

          <div className="mb-4">
            <div className="flex items-center border border-gray-300 rounded-md px-3 py-2 focus-within:border-sky-500">
              <FaKey className="text-gray-400" />
              <input
                className="w-full ml-2 outline-none text-gray-700"
                type={showPassword ? "text" : "password"}
                placeholder="Ingrese una contraseña *"
                {...register("password", {
                  required: {
                    value: true,
                    message: "Debe establecer una contraseña",
                  },
                })}
              />
              <div
                className="cursor-pointer ml-1 text-gray-400 hover:text-gray-600"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </div>
            </div>
            {errors.password && typeof errors.password.message === "string" && (
              <span className="text-red-500 text-xs italic">
                {errors.password.message}
              </span>
            )}
          </div>

          <div className="mb-2 col-span-1 lg:col-span-2">
            <button
              type="submit"
              className="px-4 cursor-pointer py-2 rounded bg-blue-500 text-white hover:bg-blue-700"
            >
              Crear cuenta
            </button>
          </div>
        </div>
      </form>

      <Stepper currentStep={currentStep} />
      <div className="flex gap-4">
        <button
          onClick={prevStep}
          disabled={currentStep === 0}
          className={`px-4 items-center ${
            currentStep > 0 && "cursor-pointer"
          } py-2 rounded bg-gray-400 text-white disabled:opacity-50`}
        >
          Atrás
        </button>
        <button
          onClick={nextStep}
          disabled={currentStep === steps.length - 1}
          className="px-4 cursor-pointer py-2 rounded bg-blue-500 text-white hover:bg-blue-700"
        >
          Siguiente
        </button>
      </div>

      <div className="mt-4">
        <p>
          Si ya tienes una cuenta, puedes{" "}
          <a
            className="cursor-pointer text-sky-600 hover:text-sky-800"
            onClick={() => setView("login")}
          >
            iniciar sesion aquí
          </a>{" "}
        </p>
      </div>
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
