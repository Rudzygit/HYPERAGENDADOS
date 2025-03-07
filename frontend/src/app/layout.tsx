"use client";
import React, { ReactNode, useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

interface LayoutProps {
  children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const [userRole, setUserRole] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user") || "{}");
    if (user?.role) {
      setUserRole(user.role);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("user");
    setUserRole(null);
    router.push("/");
  };

  return (
    <div>
      <nav>
        <ul>
          {userRole === "admin" && <li><Link href="/admin">Admin</Link></li>}
          {userRole === "empleado" && <li><Link href="/empleado">Empleado</Link></li>}
          {userRole === "usuario" && <li><Link href="/usuario">Usuario</Link></li>}
          {!userRole && <li><Link href="/">Iniciar Sesión</Link></li>}
          {userRole && <li><button onClick={handleLogout}>Cerrar Sesión</button></li>}
        </ul>
      </nav>
      <main>{children}</main>
    </div>
  );
};

export default Layout;
