// dashboard.js
import { logout } from "./config.js";

document.getElementById("logoutBtn").addEventListener("click", () => {
  logout()
    .then(() => {
      // Redirige a la página de login después de cerrar sesión
      window.location.href = "../html/login.html";
    })
    .catch((error) => {
      console.error("Error al cerrar sesión:", error);
      alert("No se pudo cerrar sesión, intenta de nuevo.");
    });
});
