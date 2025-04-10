"use client";
import Login from "@/components/auth/login";
import Register from "@/components/auth/register";
import { AlertContainer } from "@/components/alerts/AlertContainer";
import { useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import PageLoading from "@/components/loading/PageLoading";

interface Alert {
  message: string;
  type: "success" | "error" | "warning" | "info";
}

export default function Page() {
  const { status } = useSession();
  const router = useRouter();
  const [view, setView] = useState<"login" | "register">("login");
  const [alerts, setAlerts] = useState<Alert[]>([]);

  const handleAddAlert = (message: string, type: Alert["type"] = "info") => {
    setAlerts((current) => [...current, { message, type }]);
  };

  const handleCloseAlert = (index: number) => {
    setAlerts((current) => current.filter((_, i) => i !== index));
  };

  useEffect(() => {
    if (status === "authenticated") {
      router.push("/dashboard");
    }
  }, [status, router]);

  if (status === "loading" || status === "authenticated") {
    return <PageLoading />;
  }

  return (
    <main className="min-h-screen w-full fondo-imagen flex items-start justify-center p-2 overflow-y-auto">
      <AlertContainer
        alerts={alerts}
        onClose={handleCloseAlert}
      />
      <article
        className={`w-full bg-white my-4 ${
          view === "login" ? "md:w-1/2 xl:w-1/3" : "md:w-[60%] xl:w-[50%]"
        } text-center rounded-2xl shadow-2xl p-2 lg:p-10 flex`}
      >
        <div className="flex-1">
          {view === "login" && (
            <Login
              setView={setView}
              addAlert={handleAddAlert}
            />
          )}
          {view === "register" && (
            <Register
              setView={setView}
              addAlert={handleAddAlert}
            />
          )}
        </div>
      </article>
    </main>
  );
}
