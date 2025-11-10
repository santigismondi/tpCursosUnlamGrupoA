document.addEventListener('DOMContentLoaded', function() {
    
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
        botonAbrir.addEventListener('click', function(event) {
            event.preventDefault();
            mostrarCursosEnCarrito();
            panelCarrito.classList.add('visible');
        });
    }

    if (botonCerrar && panelCarrito) {
        botonCerrar.addEventListener('click', function() {
            panelCarrito.classList.remove('visible');
        });
    }
    
    if(contenedorDeCursosCarrito && contenedorValorTotal){
        mostrarCursosEnCarrito();
    }


    if (containerCursosHead) {
        
        containerCursosHead.addEventListener('click', function(event) {
            if (event.target.classList.contains('agregarCurso')) {
                const tarjeta = event.target.closest('.curso');
                const idDelCurso = tarjeta.dataset.id;
                const idNumerico = parseInt(idDelCurso);
                const cursoSeleccionado = datosCursos.find(curso => curso.id === idNumerico);
                if (cursoSeleccionado) {
                    agregarAlCarrito(cursoSeleccionado);
                }
            }
        });
    }

    function agregarAlCarrito(curso) {
        if (!usuarioActivo) {
            alert("Debes iniciar sesión para agregar cursos a tu carrito.");
            return;
        }

        const itemEnCarrito = {
            id: curso.id,
            titulo: curso.titulo,
            precio: curso.precio,
            imagenUrl: curso.imagenUrl,
            dedicacion: curso.dedicacion
        };

        const yaExiste = usuarioActivo.carrito.some(item => item.id === curso.id);

        if (!yaExiste) {
            usuarioActivo.carrito.push(itemEnCarrito);
            
            sessionStorage.setItem('usuarioLogueado', JSON.stringify(usuarioActivo));
            
            actualizarUsuarioEnLocalStorage(usuarioActivo);

        } else {
            alert("El curso ya está en tu carrito.");
        }
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
        contenedorDeCursosCarrito.addEventListener('click', function(event) {
            const botonEliminar = event.target.closest('.eliminarDelCarrito');
            
            if (botonEliminar) {
                const idParaEliminar = parseInt(botonEliminar.dataset.id);
                
                usuarioActivo.carrito = usuarioActivo.carrito.filter(item => item.id !== idParaEliminar);
                
                sessionStorage.setItem('usuarioLogueado', JSON.stringify(usuarioActivo));
                
                actualizarUsuarioEnLocalStorage(usuarioActivo);
                
                mostrarCursosEnCarrito();
                
                actualizarContador(usuarioActivo.carrito.length);
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