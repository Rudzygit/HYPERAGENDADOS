"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

interface Props {
  children: React.ReactNode;
  roleRequired: "admin" | "empleado" | "usuario";
}

const ProtegerRuta: React.FC<Props> = ({ children, roleRequired }) => {
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user") || "{}");

    if (!user || user.role !== roleRequired) {
      router.push("/");
    } else {
      setLoading(false);
    }
  }, [router, roleRequired]);

  if (loading) return <p>Cargando...</p>;

  return <>{children}</>;
};

export default ProtegerRuta;
