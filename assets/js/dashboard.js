import { logout } from "../js/config.js";

document.addEventListener("DOMContentLoaded", function () {
    const logoutBtn = document.getElementById("logoutBtn");
    const searchBtn = document.getElementById("search-btn");
    const searchBox = document.getElementById("search-box");
    const searchContainer = document.querySelector(".search-container");
    const sections = document.querySelectorAll("section");

    // Validar que los elementos existen antes de usarlos
    if (!logoutBtn || !searchBtn || !searchBox || !searchContainer) {
        console.error("Error: No se encontraron todos los elementos necesarios en el DOM.");
        return;
    }

    // Función para cerrar sesión
    logoutBtn.addEventListener("click", (event) => {
        event.preventDefault(); // Evita redirección no deseada
        logout()
            .then(() => {
                window.location.href = "../html/login.html";
            })
            .catch((error) => {
                console.error("Error al cerrar sesión:", error);
                alert("No se pudo cerrar sesión, intenta de nuevo.");
            });
    });

    // Manejar la barra de búsqueda
    searchBtn.addEventListener("click", function () {
        if (!searchContainer.classList.contains("active")) {
            searchContainer.classList.add("active");
            searchBox.focus();
        } else if (searchBox.value.trim() !== "") {
            filtrarResultados(searchBox.value);
        }
    });

    searchBox.addEventListener("keypress", function (event) {
        if (event.key === "Enter" && searchBox.value.trim() !== "") {
            filtrarResultados(searchBox.value);
        }
    });

    // Función para filtrar resultados en la landing
    function filtrarResultados(termino) {
        const textoBusqueda = termino.toLowerCase();
        let encontrado = false;

        sections.forEach(section => {
            const texto = section.textContent.toLowerCase();
            if (texto.includes(textoBusqueda)) {
                section.classList.add("highlight");
                encontrado = true;
            } else {
                section.classList.remove("highlight");
            }
        });

        if (!encontrado) {
            alert("No se encontraron resultados.");
        }
    }

    // Ocultar la barra de búsqueda si el usuario hace clic fuera de ella
    document.addEventListener("click", function (event) {
        if (!searchContainer.contains(event.target) && searchBox.value.trim() === "") {
            searchContainer.classList.remove("active");
        }
    });
});


//  cursor dinámico
const cursor = document.createElement("div");
cursor.id = "custom-cursor";
document.body.appendChild(cursor);


document.addEventListener("mousemove", (e) => {
  cursor.style.left = `${e.clientX}px`;
  cursor.style.top = `${e.clientY}px`;
});
