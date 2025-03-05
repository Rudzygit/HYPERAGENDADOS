import React from "react";
import ReactDOM from "react-dom";
import "./index.css";

// Redirigir a inicio.html
window.location.href = "./inicio.html";

ReactDOM.render(
  <React.StrictMode>
    <div>Cargando...</div>
  </React.StrictMode>,
  document.getElementById("root")
);