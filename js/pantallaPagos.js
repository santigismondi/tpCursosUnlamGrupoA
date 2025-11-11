document.addEventListener("DOMContentLoaded", () => {
    const contenedorCarrito = document.getElementById("contenedorCarrito");
    const totalPrecio = document.getElementById("totalPrecio");
    const botonPagar = document.getElementById("btnPagar");

    let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

    // Función para renderizar el carrito
    function renderizarCarrito() {
        contenedorCarrito.innerHTML = "";
        let total = 0;

        if (carrito.length === 0) {
            contenedorCarrito.innerHTML = "<p>No hay cursos en el carrito.</p>";
            totalPrecio.textContent = "";
            if (botonPagar) botonPagar.style.display = "none";
            return;
        }

        carrito.forEach((curso, index) => {
            const item = document.createElement("div");
            item.classList.add("cursoCarrito");

            item.innerHTML = `
                <img src="${curso.imagenUrl}" alt="${curso.titulo}" class="imgCarrito">
                <div class="infoCarrito">
                    <h3>${curso.titulo}</h3>
                    <span>Precio: $${curso.precio.valor}</span>
                </div>
                <button class="eliminarCurso" data-index="${index}">Eliminar</button>
            `;

            contenedorCarrito.appendChild(item);
            total += curso.precio.valor;
        });

        totalPrecio.textContent = `Total a pagar: $${total}`;
    }

    // Escuchar clicks en los botones de eliminar
    contenedorCarrito.addEventListener("click", e => {
        if (e.target.classList.contains("eliminarCurso")) {
            const index = e.target.dataset.index;
            carrito.splice(index, 1);
            localStorage.setItem("carrito", JSON.stringify(carrito));
            renderizarCarrito(); // vuelve a mostrar los cursos actualizados
        }
    });

    // Botón pagar
    if (botonPagar) {
        botonPagar.addEventListener("click", () => {
            localStorage.removeItem("carrito");
            alert("✅ Pago realizado con éxito. ¡Gracias por tu compra!");
            window.location.href = "inicio.html";
        });
    }

    // Mostrar los cursos al cargar la página
    renderizarCarrito();
});
