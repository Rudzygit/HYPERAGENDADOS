"use client";
import Login from "@/components/auth/login";
import Register from "@/components/auth/register";
import { useState } from "react";

export default function Page() {
  const [view, setView] = useState<"login" | "register">("login");

  return (
    <main className="h-screen w-full fondo-imagen flex items-center justify-center overflow-x-auto overflow-y-hidden p-2">
      <article
        className={`w-full bg-white ${
          view === "login" ? "md:w-1/2 xl:w-1/3" : "md:w-[60%] xl:w-[50%]"
        } min-h-2/3 text-center rounded-2xl shadow-2xl p-10 flex`}
      >
        <div className="flex-1">
          {view === "login" && <Login setView={setView} />}
          {view === "register" && <Register />}
        </div>
      </article>
    </main>
  );
}
