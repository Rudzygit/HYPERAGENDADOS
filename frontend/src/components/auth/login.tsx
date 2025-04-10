"use client";
import { useForm } from "react-hook-form";
import { signIn } from "next-auth/react";
import { FaUser, FaKey } from "react-icons/fa";
import { useRouter } from "next/navigation";

interface loginProps {
  setView: (view: "login" | "register") => void;
  addAlert: (
    message: string,
    type: "success" | "error" | "warning" | "info"
  ) => void;
}

const Login = ({ setView, addAlert }: loginProps) => {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = handleSubmit(async (data) => {
    try {
      const resAuth = await signIn("credentials", {
        username: data.username,
        password: data.password,
        redirect: false,
      });

      if (resAuth?.error) {
        addAlert(resAuth.error, "error");
        return;
      }

      addAlert("Inicio de sesión exitoso", "success");
      setTimeout(() => router.push("/dashboard/"), 1500);
    } catch (error) {
      addAlert(`Error al conectar con el servidor ${error}`, "error");
    }
  });

  return (
    <section
      className="flex flex-col items-center bg-white shadow-md rounded-lg p-8 w-full max-w-sm mx-auto"
      aria-labelledby="login-title"
    >
      <h1
        id="login-title"
        className="text-3xl font-bold text-gray-800 mb-2"
      >
        HYPERAGENDADOS
      </h1>
      <p className="text-gray-500 mb-6">Bienvenido</p>
      <form
        onSubmit={onSubmit}
        className="w-full"
        aria-describedby="login-description"
      >
        <fieldset>
          <legend
            id="login-description"
            className="sr-only"
          >
            Formulario de inicio de sesión
          </legend>
          <div className="mb-4">
            <label
              htmlFor="username"
              className="sr-only"
              title="Ingrese su nombre de usuario"
            >
              Usuario
            </label>
            <div className="flex items-center border border-gray-300 rounded-md px-3 py-2 focus-within:border-sky-500">
              <FaUser
                className="text-gray-400"
                aria-hidden="true"
              />
              <input
                id="username"
                className="w-full ml-2 outline-none text-gray-700"
                type="text"
                placeholder="Ingrese su usuario"
                aria-required="true"
                {...register("username", {
                  required: "El usuario es requerido",
                })}
              />
            </div>
            {errors.username && typeof errors.username.message === "string" && (
              <span
                className="text-red-500 text-xs italic"
                role="alert"
              >
                {errors.username.message}
              </span>
            )}
          </div>

          <div className="mb-4">
            <label
              htmlFor="password"
              className="sr-only"
              title="Ingrese su contraseña"
            >
              Contraseña
            </label>
            <div className="flex items-center border border-gray-300 rounded-md px-3 py-2 focus-within:border-sky-500">
              <FaKey
                className="text-gray-400"
                aria-hidden="true"
              />
              <input
                id="password"
                className="w-full ml-2 outline-none text-gray-700"
                type="password"
                placeholder="Ingrese su contraseña"
                aria-required="true"
                {...register("password", {
                  required: "La contraseña es requerida",
                })}
              />
            </div>
            {errors.password && typeof errors.password.message === "string" && (
              <span
                className="text-red-500 text-xs italic"
                role="alert"
              >
                {errors.password.message}
              </span>
            )}
          </div>
        </fieldset>

        <button
          type="submit"
          className="w-full cursor-pointer bg-sky-600 text-white py-2 rounded-md shadow-md hover:bg-sky-700 transition"
          title="Iniciar sesión en su cuenta"
        >
          Iniciar sesión
        </button>

        <div
          className="text-center my-4 text-gray-500"
          aria-hidden="true"
        >
          o
        </div>

        <button
          type="button"
          className="w-full cursor-pointer bg-gray-600 text-white py-2 rounded-md shadow-md hover:bg-gray-700 transition"
          onClick={() => setView("register")}
          title="Crear una nueva cuenta"
        >
          Registrarse
        </button>
      </form>
    </section>
  );
};

export default Login;
