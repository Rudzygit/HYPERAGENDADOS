"use client";
import React from "react";
import { useSession } from "next-auth/react";
import AdminPage from "@/components/auth/dashboard/admin/AdminPage";
import UsuarioPage from "@/components/auth/dashboard/user/UsuarioPage";
import EmpleadoPage from "@/components/auth/dashboard/employe/EmpleadoPage";

export default function Page() {
  const { data: session, status } = useSession(); //Para obtener la sesion del usuario

  if (status === "loading") return <p>Loading...</p>;

  return <>
  {/* {JSON.stringify(session)} */}
  {session?.user.user.idRol === 1 && <AdminPage />}
  {session?.user.user.idRol === 2 && <UsuarioPage /> }
  {session?.user.user.idRol === 3 && <EmpleadoPage />} 
  </>;
}
