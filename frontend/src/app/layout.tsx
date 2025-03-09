import "./globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "HyperAgendados",
  description: "Agendamiento de citas",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <body>{children}</body>
    </html>
  );
}
