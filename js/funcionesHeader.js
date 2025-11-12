document.addEventListener('DOMContentLoaded', function () {

    let usuarioActivo = JSON.parse(sessionStorage.getItem('usuarioLogueado'));
    //Carrito
    const botonAbrir = document.getElementById('botonAbrirCarrito');
    const botonCerrar = document.getElementById('botonCerrarCarrito');
    const panelCarrito = document.getElementById('carritoPanel');
    const contenedorDeCursosCarrito = document.getElementById('cursosEnCarrito');
    const contenedorValorTotal = document.getElementById('totalCompra');
    const containerCursosHead = document.getElementById("cursosContainerInicio");
    //Buscador
    const formBuscador = document.querySelector('.formularioBuscador');
    const inputBuscador = document.getElementById('buscador');
    const iconoBuscar = document.getElementById('iconoBuscar');

    //Carrito
    if (usuarioActivo) {
        actualizarContador(usuarioActivo.carrito.length);
    }

    if (botonAbrir && panelCarrito) {
        botonAbrir.addEventListener('click', function (event) {
            event.preventDefault();
            mostrarCursosEnCarrito();
            panelCarrito.classList.add('visible');
        });
    }

    if (botonCerrar && panelCarrito) {
        botonCerrar.addEventListener('click', function () {
            panelCarrito.classList.remove('visible');
        });
    }

    if (contenedorDeCursosCarrito && contenedorValorTotal) {
        mostrarCursosEnCarrito();
    }


    // Escucha global: funciona en cualquier página
    document.addEventListener('click', function (event) {
        // Si el click viene de un botón "Agregar al Carrito"
        if (event.target.classList.contains('agregarCurso')) {
            const tarjeta = event.target.closest('.curso');

            // Si el botón está dentro de una tarjeta con data-id
            if (tarjeta && tarjeta.dataset.id) {
                const idDelCurso = parseInt(tarjeta.dataset.id);
                const cursoSeleccionado = DATOS_CURSOS.find(curso => curso.id === idDelCurso);

                if (cursoSeleccionado) {
                    agregarAlCarrito(cursoSeleccionado);
                }
            }
            // Si estás en una página de detalle sin contenedor .curso, tomamos el ID directo
            else if (event.target.dataset.id) {
                const idDelCurso = parseInt(event.target.dataset.id);
                const cursoSeleccionado = DATOS_CURSOS.find(curso => curso.id === idDelCurso);

                if (cursoSeleccionado) {
                    agregarAlCarrito(cursoSeleccionado);
                }
            }
        }
    });

    function agregarAlCarrito(curso) {
        if (!usuarioActivo) {
            alert("Debes iniciar sesión para agregar cursos a tu carrito.");
            return;
        }

        // 🔹 Verificar si ya está inscripto en el curso
        const yaInscripto = usuarioActivo.cursosInscripto.some(item => item.id === curso.id);
        if (yaInscripto) {
            alert("Ya estás inscripto en este curso.");
            return;
        }

        // 🔹 Verificar si ya está en el carrito
        const yaEnCarrito = usuarioActivo.carrito.some(item => item.id === curso.id);
        if (yaEnCarrito) {
            alert("El curso ya está en tu carrito.");
            return;
        }

        // 🔹 Si no está ni inscripto ni en el carrito, agregarlo
        const itemEnCarrito = {
            id: curso.id,
            titulo: curso.titulo,
            precio: curso.precio,
            imagenUrl: curso.imagenUrl,
            dedicacion: curso.dedicacion
        };

        usuarioActivo.carrito.push(itemEnCarrito);

        // 🔹 Actualizar en sessionStorage y localStorage
        sessionStorage.setItem("usuarioLogueado", JSON.stringify(usuarioActivo));
        actualizarUsuarioEnLocalStorage(usuarioActivo);

        actualizarContador(usuarioActivo.carrito.length);
    }

    function actualizarContador(cantidad) {
        const contadorCarrito = document.getElementById("logoCarrito");
        if (contadorCarrito) {
            contadorCarrito.textContent = cantidad;
        }
    }

    function mostrarCursosEnCarrito() {
        const usuarioActivoActualizado = JSON.parse(sessionStorage.getItem('usuarioLogueado'));

        if (!contenedorDeCursosCarrito || !contenedorValorTotal) {
            console.error("No se encontraron los contenedores del carrito en esta página.");
            return;
        }

        if (!usuarioActivoActualizado || usuarioActivoActualizado.carrito.length === 0) {
            contenedorDeCursosCarrito.innerHTML = `<h3 class="mensajeCarrito">Tu carrito está vacío.</h3>`;
            contenedorValorTotal.textContent = "0.00";
            return;
        }

        contenedorDeCursosCarrito.innerHTML = '';
        let valorTotal = 0;

        usuarioActivoActualizado.carrito.forEach(curso => {
            const cursoElemento = document.createElement('section');
            cursoElemento.classList.add('cursoEnCarrito');

            cursoElemento.innerHTML = `
                <img class="imagenCursoCarrito" src="${curso.imagenUrl}" alt="${curso.titulo}">
                <section class="contenedorDetalles">
                    <h4>${curso.titulo}</h4>
                    <p>Precio: $${curso.precio.valor}</p>
                    <p>Dedicación: ${curso.dedicacion}</p>
                </section>
                <button class="eliminarDelCarrito" data-id="${curso.id}"><i class="fa-solid fa-trash"></i></button>
            `;

            contenedorDeCursosCarrito.appendChild(cursoElemento);

            valorTotal += curso.precio.valor;
        });

        contenedorValorTotal.textContent = valorTotal.toFixed(2);
    }

    function actualizarUsuarioEnLocalStorage(usuarioActualizado) {
        let usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];
        const index = usuarios.findIndex(user => user.nombreUsuario === usuarioActualizado.nombreUsuario);

        if (index !== -1) {
            usuarios[index] = usuarioActualizado;
            localStorage.setItem('usuarios', JSON.stringify(usuarios));
        }
    }

    if (contenedorDeCursosCarrito) {
        contenedorDeCursosCarrito.addEventListener('click', function (event) {
            const botonEliminar = event.target.closest('.eliminarDelCarrito');

            if (botonEliminar) {
                const idParaEliminar = parseInt(botonEliminar.dataset.id);

                // 🔹 Recuperamos el usuario más reciente desde sessionStorage
                let usuarioActivoActualizado = JSON.parse(sessionStorage.getItem('usuarioLogueado'));

                if (!usuarioActivoActualizado) return;

                // 🔹 Filtramos el carrito y actualizamos datos
                usuarioActivoActualizado.carrito = usuarioActivoActualizado.carrito.filter(item => item.id !== idParaEliminar);

                // 🔹 Guardamos los cambios en sessionStorage y localStorage
                sessionStorage.setItem('usuarioLogueado', JSON.stringify(usuarioActivoActualizado));
                actualizarUsuarioEnLocalStorage(usuarioActivoActualizado);

                // 🔹 Actualizamos la vista
                mostrarCursosEnCarrito();
                actualizarContador(usuarioActivoActualizado.carrito.length);
            }
        });
    }
    //Buscador
    function realizarBusqueda(event) {
        event.preventDefault();
        const terminoBusqueda = inputBuscador.value.trim();
        sessionStorage.setItem('terminoBusqueda', terminoBusqueda);
        window.location.href = './resultadosBusqueda.html';
    }
    formBuscador.addEventListener('submit', realizarBusqueda);
    iconoBuscar.addEventListener('click', realizarBusqueda);
});