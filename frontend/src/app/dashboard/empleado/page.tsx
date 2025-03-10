"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/router"; // Usa "next/navigation" si estás en Next.js 13+
import "./EmpleadoPage.css";

export default function EmpleadoPage() {
    const router = useRouter();
    const [citas, setCitas] = useState([]);
    const [fecha, setFecha] = useState("");
    const [hora, setHora] = useState("");

    useEffect(() => {
        async function fetchCitas() {
            try {
                const response = await fetch("/api/citas");
                if (!response.ok) throw new Error("Error al obtener las citas");
                const data = await response.json();
                setCitas(Array.isArray(data) ? data : []);
            } catch (error) {
                console.error("Error al obtener citas:", error);
            }
        }
        fetchCitas();
    }, []);

    async function handleCrearCita(e) {
        e.preventDefault();
        if (!fecha || !hora) {
            alert("Debes ingresar una fecha y una hora.");
            return;
        }

        const nuevaCita = { fecha, hora };

        try {
            const response = await fetch("/api/citas", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(nuevaCita),
            });

            if (!response.ok) throw new Error("Error al crear la cita");

            const citaCreada = await response.json();

            if (citaCreada && typeof citaCreada === "object" && citaCreada.id) {
                setCitas((prevCitas) => [...prevCitas, citaCreada]);
                setFecha("");
                setHora("");
            } else {
                console.error("La cita creada no tiene un ID válido.");
            }
        } catch (error) {
            console.error("Error al crear cita:", error);
        }
    }

    return (
        <div className="empleado-container">
            <h1>Panel del Empleado</h1>

            <form onSubmit={handleCrearCita} className="form-cita">
                <label>
                    Fecha:
                    <input
                        type="date"
                        value={fecha}
                        onChange={(e) => setFecha(e.target.value)}
                        required
                    />
                </label>
                <label>
                    Hora:
                    <input
                        type="time"
                        value={hora}
                        onChange={(e) => setHora(e.target.value)}
                        required
                    />
                </label>
                <button type="submit">Crear Cita</button>
            </form>

            <h2>Citas Programadas</h2>
            <div className="citas-lista">
                {citas.length > 0 ? (
                    citas.map((cita, index) =>
                        cita && typeof cita === "object" && cita.id ? (
                            <article key={cita.id || index} className="cita">
                                <p><strong>Fecha:</strong> {cita.fecha ?? "No disponible"}</p>
                                <p><strong>Hora:</strong> {cita.hora ?? "No disponible"}</p>
                            </article>
                        ) : null
                    )
                ) : (
                    <p>No hay citas registradas.</p>
                )}
            </div>
        </div>
    );
}
