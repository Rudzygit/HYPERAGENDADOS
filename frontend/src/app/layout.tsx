"use client";
import React, { ReactNode, useEffect, useState } from "react";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";

interface LayoutProps {
  children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const [userRole, setUserRole] = useState<string | null>(null);
  const router = useRouter();
  const pathname = usePathname(); // Obtiene la ruta actual

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user") || "{}");
    if (user?.role) {
      setUserRole(user.role);

      // Redirigir solo si el usuario NO está en su ruta correcta
      if (user.role === "admin" && pathname !== "/admin") {
        router.push("/admin");
      } else if (user.role === "empleado" && pathname !== "/empleado") {
        router.push("/empleado");
      } else if (user.role === "usuario" && pathname !== "/usuario") {
        router.push("/usuario");
      }
    }
  }, [router, pathname]); // Dependencias correctas

  const handleLogout = () => {
    localStorage.removeItem("user");
    setUserRole(null);
    router.push("/");
  };

  return (
    <html lang="es">
      <body>
        <div className="layout-container">
          <nav className="navbar">
            <ul>
              {userRole === "admin" && (
                <li>
                  <Link href="/admin">Admin</Link>
                </li>
              )}
              {userRole === "empleado" && (
                <li>
                  <Link href="/empleado">Empleado</Link>
                </li>
              )}
              {userRole === "usuario" && (
                <li>
                  <Link href="/usuario">Usuario</Link>
                </li>
              )}
              {!userRole && (
                <li>
                  <Link href="/">Iniciar Sesión</Link>
                </li>
              )}
              {userRole && (
                <li>
                  <button onClick={handleLogout}>Cerrar Sesión</button>
                </li>
              )}
            </ul>
          </nav>
          <main>{children}</main>
        </div>
      </body>
    </html>
  );
};

export default Layout;
