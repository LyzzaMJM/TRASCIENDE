import { getAuth, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/11.3.1/firebase-auth.js";

const auth = getAuth();

document.addEventListener("DOMContentLoaded", () => {
    onAuthStateChanged(auth, (user) => {
        if (user) {
            document.getElementById("user-name").textContent = user.displayName || "Estudiante";
        } else {
            console.log("No hay usuario autenticado");
        }
    });
});
