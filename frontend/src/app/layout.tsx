import React, { ReactNode } from 'react';
import Link from 'next/link';

interface LayoutProps {
  children: ReactNode;
}

export default function RootLayout({ children }: LayoutProps) {
  return (
    <html lang="es">
      <head>
        <title>HyperAgendados</title>
      </head>
      <body>
        <nav>
          <ul>
            <li><Link href="/pages/admin">Admin</Link></li>
            <li><Link href="/pages/empleado">Empleado</Link></li>
            <li><Link href="/pages/usuario">Usuario</Link></li>
          </ul>
        </nav>
        <main>{children}</main>
      </body>
    </html>
  );
}
