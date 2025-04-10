"use client";
import React from "react";
import { useSession } from "next-auth/react";
import AdminPage from "@/components/auth/dashboard/admin/AdminPage";
import UsuarioPage from "@/components/auth/dashboard/user/UsuarioPage";
import EmpleadoPage from "@/components/auth/dashboard/employe/EmpleadoPage";
import PageLoading from "@/components/loading/PageLoading";
import AccessDenied from "@/components/denied/AccessDenied";

export default function Page() {
  const { data: session, status } = useSession();

  if (status === "loading" || status === "unauthenticated") {
    return <PageLoading />;
  }

  if (!session) {
    return <AccessDenied />;
  }

  const renderDashboard = () => {
    switch (session.user.user.idRol) {
      case 1:
        return <AdminPage />;
      case 2:
        return <UsuarioPage />;
      case 3:
        return <EmpleadoPage />;
      default:
        return <AccessDenied />;
    }
  };

  return <>{renderDashboard()}</>;
}
