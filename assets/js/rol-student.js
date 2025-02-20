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

document.addEventListener("DOMContentLoaded", function () {
    const searchBtn = document.getElementById("search-btn");
    const searchBox = document.getElementById("search-box");
    const searchContainer = document.querySelector(".search-container");
    const sections = document.querySelectorAll("section"); // Filtrará secciones de la landing

    if (!searchBtn || !searchBox || !searchContainer) {
        console.error("Error: No se encontraron los elementos de la búsqueda en el DOM.");
        return;
    }

    // Manejar clic en el botón de la lupa
    searchBtn.addEventListener("click", function () {
        if (!searchContainer.classList.contains("active")) {
            searchContainer.classList.add("active");
            searchBox.focus();
        } else if (searchBox.value.trim() !== "") {
            filtrarResultados(searchBox.value);
        }
    });

    // Permitir la búsqueda con la tecla "Enter"
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
            if (section.textContent.toLowerCase().includes(textoBusqueda)) {
                section.style.display = "block"; // Mostrar sección si coincide
                encontrado = true;
            } else {
                section.style.display = "none"; // Ocultar sección si no coincide
            }
        });

        if (!encontrado) {
            alert("No se encontraron resultados.");
            sections.forEach(section => section.style.display = "block"); // Mostrar todo si no hay coincidencias
        }
    }

    // Ocultar la barra de búsqueda si el usuario hace clic fuera de ella
    document.addEventListener("click", function (event) {
        if (!searchContainer.contains(event.target) && searchBox.value.trim() === "") {
            searchContainer.classList.remove("active");
        }
    });
});
