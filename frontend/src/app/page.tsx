"use client";
import Login from "@/components/auth/login";
import Register from "@/components/auth/register";
import { useState } from "react";

export default function Page() {
  const [view, setView] = useState<"login" | "register">("login");

  return (
    <main className="h-screen w-full fondo-imagen flex items-center justify-center overflow-x-auto overflow-y-hidden p-2">
      <article className="w-full bg-white md:w-1/2 xl:w-1/3 min-h-2/3 text-center rounded-2xl shadow-2xl p-3 flex">
        <div className="flex-1 flex flex-col justify-between">
          {view === "login" && <Login />}
          {view === "register" && <Register />}
          <footer className="w-full bg-red-400 flex justify-around items-end gap-4">
            <button
              className="cursor-pointer bg-sky-600 px-3 py-2 rounded-sm hover:bg-sky-700"
              onClick={() => setView("login")}
            >
              Iniciar Sesión
            </button>
            <button
              className="cursor-pointer bg-sky-600 px-3 py-2 rounded-sm hover:bg-sky-700"
              onClick={() => setView("register")}
            >
              Registrarse
            </button>
          </footer>
        </div>
      </article>
    </main>
  );
}
