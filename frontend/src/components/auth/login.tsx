"use client";
import { useForm } from "react-hook-form";
import { signIn } from "next-auth/react";
import { FaUser, FaKey } from "react-icons/fa";
import { useRouter } from "next/navigation";
import { useState } from "react";

interface loginProps {
  setView: (view: "login" | "register") => void;
}

const Login = ({ setView }: loginProps) => {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [showError, setShowError] = useState<string>("");

  const onSubmit = handleSubmit(async (data) => {
    const resAuth = await signIn("credentials", {
      username: data.username,
      password: data.password,
      redirect: false,
    });

    if (resAuth?.error) {
      setShowError(resAuth.error);
      return;
    }

    router.push("/dashboard/");
  });

  return (
    <section className="flex flex-col items-center bg-white shadow-md rounded-lg p-8 w-full max-w-sm mx-auto">
      <h1 className="text-3xl font-bold text-gray-800 mb-2">HYPERAGENDADOS</h1>
      <p className="text-gray-500 mb-6">Bienvenido</p>
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
          className="w-full cursor-pointer bg-sky-600 text-white py-2 rounded-md shadow-md hover:bg-sky-700 transition"
        >
          Iniciar sesión
        </button>

        <div className="text-center my-4 text-gray-500">o</div>

        <button
          type="button"
          className="w-full cursor-pointer bg-gray-600 text-white py-2 rounded-md shadow-md hover:bg-gray-700 transition"
          onClick={() => setView("register")}
        >
          Registrarse
        </button>
      </form>
    </section>
  );
};

export default Login;
