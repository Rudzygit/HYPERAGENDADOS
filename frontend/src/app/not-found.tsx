import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-600 to-blue-500 flex items-center justify-center px-4">
      <div className="max-w-md w-full text-center">
        <h1 className="text-9xl font-extrabold text-white animate-bounce">
          404
        </h1>

        <div className="absolute rotate-12 animate-pulse select-none">
          <div className="text-8xl font-extrabold text-white opacity-20">
            404
          </div>
        </div>

        <p className="mt-4 text-3xl font-bold tracking-tight text-white md:text-4xl animate-fade-in">
          ¡Página no encontrada!
        </p>

        <p className="mt-4 text-lg text-white/70">
          Lo sentimos, la página que estás buscando no existe o ha sido movida.
        </p>

        <div className="mt-8">
          <Link
            href="/"
            className="inline-block px-6 py-3 text-base font-medium text-white bg-white/20 rounded-lg backdrop-blur-sm hover:bg-white/30 transition-all duration-200 transform hover:scale-105 hover:shadow-xl"
          >
            Volver al inicio
          </Link>
        </div>
      </div>
    </div>
  );
}
