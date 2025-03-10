"use client";
import React from "react";
import { useSession } from "next-auth/react";

export default function Page() {
  const { data: session, status } = useSession(); //Para obtener la sesion del usuario

  if (status === "loading") return <p>Loading...</p>;

  return <>{JSON.stringify(session)}</>;
}
