document.addEventListener("DOMContentLoaded", () => {
    const contenedorCarrito = document.getElementById("contenedorCarrito");
    const totalPrecio = document.getElementById("totalPrecio");
    const botonPagar = document.getElementById("confirmar");
    const checkConfirm = document.getElementById("confirm-toggle");

    // 🔹 Leer usuario activo con carrito
    let usuarioActivo = JSON.parse(sessionStorage.getItem("usuarioLogueado"));

    if (!usuarioActivo || !usuarioActivo.carrito) {
        contenedorCarrito.innerHTML = "<p>No hay cursos en el carrito.</p>";
        totalPrecio.textContent = "";
        return;
    }

    let carrito = usuarioActivo.carrito;

    // --- Renderizar carrito ---
    function renderizarCarrito() {
        contenedorCarrito.innerHTML = "";
        let total = 0;

        if (carrito.length === 0) {
            contenedorCarrito.innerHTML = "<p>No hay cursos en el carrito.</p>";
            totalPrecio.textContent = "";
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
                <button id="cancelar" class="eliminarCurso" data-index="${index}">Eliminar</button>
            `;

            contenedorCarrito.appendChild(item);
            total += curso.precio.valor;
        });

        totalPrecio.textContent = `Total a pagar: $${total}`;
    }

    // --- Eliminar curso individual ---
    contenedorCarrito.addEventListener("click", (e) => {
        if (e.target.classList.contains("eliminarCurso")) {
            const index = e.target.dataset.index;
            carrito.splice(index, 1);

            // 🔹 Actualizar en sessionStorage y localStorage
            usuarioActivo.carrito = carrito;
            sessionStorage.setItem("usuarioLogueado", JSON.stringify(usuarioActivo));
            actualizarUsuarioEnLocalStorage(usuarioActivo);

            renderizarCarrito();
        }
    });

    // --- Confirmar pago ---
    if (botonPagar) {
        botonPagar.addEventListener("click", (e) => {
            e.preventDefault();
            e.stopPropagation();

            const metodoSeleccionado = document.querySelector('input[name="pago"]:checked');

            if (!metodoSeleccionado) {
                alert("⚠️ Por favor seleccioná un método de pago antes de confirmar.");
                return;
            }

            if (metodoSeleccionado.value === "tarjeta") {
                const numeroTarjeta = document.querySelector('input[placeholder="XXXX XXXX XXXX XXXX"]').value.trim();
                const cvv = document.querySelector('input[placeholder="CVV"]').value.trim();

                if (!numeroTarjeta || !cvv) {
                    alert("⚠️ Por favor completá los datos de tu tarjeta antes de confirmar.");
                    return;
                }

                const soloNumerosTarjeta = numeroTarjeta.replace(/\D/g, "");
                const soloNumerosCVV = cvv.replace(/\D/g, "");

                if (soloNumerosTarjeta.length !== 16) {
                    alert("⚠️ El número de tarjeta debe tener 16 dígitos.");
                    return;
                }

                if (soloNumerosCVV.length !== 3) {
                    alert("⚠️ El CVV debe tener 3 dígitos.");
                    return;
                }
            }

            // 🔹 Mover los cursos del carrito a cursosInscripto (sin duplicar)
            const idsActuales = usuarioActivo.cursosInscripto.map(c => c.id);
            usuarioActivo.carrito.forEach(curso => {
                if (!idsActuales.includes(curso.id)) {
                    usuarioActivo.cursosInscripto.push(curso);
                }
            });

            // 🔹 Vaciar carrito en ambos almacenamientos
            usuarioActivo.carrito = [];
            sessionStorage.setItem("usuarioLogueado", JSON.stringify(usuarioActivo));
            actualizarUsuarioEnLocalStorage(usuarioActivo);

            renderizarCarrito();

            alert("Pago realizado con éxito. ¡Gracias por tu compra!");
            if (checkConfirm) checkConfirm.checked = false;

            setTimeout(() => {
                window.location.href = "../html/inicio.html";
            }, 400);
        });
    }

    // 🔹 Función para sincronizar usuarios en localStorage
    function actualizarUsuarioEnLocalStorage(usuarioActualizado) {
        let usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];
        const index = usuarios.findIndex(user => user.nombreUsuario === usuarioActualizado.nombreUsuario);

        if (index !== -1) {
            usuarios[index] = usuarioActualizado;
        } else {
            usuarios.push(usuarioActualizado);
        }

        localStorage.setItem("usuarios", JSON.stringify(usuarios));
    }

    renderizarCarrito();
});