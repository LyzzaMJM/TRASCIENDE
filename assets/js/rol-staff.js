document.getElementById("filtro").addEventListener("input", function() {
    let filtro = this.value.toLowerCase();
    document.querySelectorAll("tbody tr").forEach(row => {
        let texto = row.innerText.toLowerCase();
        if (texto.includes(filtro) || filtro === "") {
            row.style.display = "";
        } else {
            row.style.display = "none";
        }
    });
});


