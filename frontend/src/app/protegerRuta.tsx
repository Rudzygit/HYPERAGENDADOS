"use client";
import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";

interface Props {
  children: React.ReactNode;
  roleRequired: "admin" | "empleado" | "usuario";
}

const ProtegerRuta: React.FC<Props> = ({ children, roleRequired }) => {
  const router = useRouter();
  const pathname = usePathname();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user") || "{}");

    if (!user?.role) {
      router.push("/"); // Si no hay usuario, redirigir al login
    } else if (user.role !== roleRequired) {
      // Si el usuario tiene otro rol, lo redirigimos a su panel correcto
      router.push(`/dashboard/${user.role}`);
    } else {
      setLoading(false);
    }
  }, [router, pathname, roleRequired]);

  if (loading) return <p>Cargando...</p>;

  return <>{children}</>;
};

export default ProtegerRuta;
