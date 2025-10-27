const containerCursosHead = document.getElementById("cursosContainerInicio");
let usuarioActivo = JSON.parse(sessionStorage.getItem('usuarioLogueado'));
const contenedorDeCursosCarrito = document.getElementById("cursosEnCarrito");
const contenedorValorTotal = document.getElementById("totalCompra");
//FUNCIONALIDAD CARRITO
document.addEventListener('DOMContentLoaded', function() {
    let cantidadElementos = usuarioActivo.carrito.length;
    actualizarContador(cantidadElementos);
    const botonAbrir = document.getElementById('botonAbrirCarrito');
    const botonCerrar = document.getElementById('botonCerrarCarrito');
    const panelCarrito = document.getElementById('carritoPanel');

    botonAbrir.addEventListener('click', function(event) {
        event.preventDefault();        
        panelCarrito.classList.add('visible');
    });

    botonCerrar.addEventListener('click', function() {
        panelCarrito.classList.remove('visible');
    });

    containerCursosHead.addEventListener('click', function(event) {
        if (event.target.classList.contains('agregarCurso')) {
            const tarjeta = event.target.closest('.curso');            
            const idDelCurso = tarjeta.dataset.id;            
            const idNumerico = parseInt(idDelCurso);
            const cursoSeleccionado = datosCursos.find(curso => curso.id === idNumerico);

            if (cursoSeleccionado) {
                agregarAlCarrito(cursoSeleccionado);
            }
            
            mostrarCursosEnCarrito();
        }
    });

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
            localStorage.setItem('usuarios', JSON.stringify(usuarioActivo));
        } else {    
            alert("El curso ya está en tu carrito.");
        }
        cantidadElementos = usuarioActivo.carrito.length;
        actualizarContador(cantidadElementos);
    }

    function actualizarContador(cantidad) {
        const contadorCarrito = document.getElementById("logoCarrito");
        if (contadorCarrito) {
            contadorCarrito.textContent = cantidad;
        }
    }

    function mostrarCursosEnCarrito() {
        contenedorDeCursosCarrito.innerHTML = '';
        usuarioActivo.carrito.forEach(curso => {
            const cursoElemento = document.createElement('section');
            cursoElemento.classList.add('cursoEnCarrito');
            const imagenElemento = document.createElement('img');
            imagenElemento.classList.add('imagenCursoCarrito');
            imagenElemento.src = curso.imagenUrl;
            imagenElemento.alt = curso.titulo;
            const contenedorDetalles = document.createElement('section');
            contenedorDetalles.classList.add('contenedorDetalles');
            const tituloElemento = document.createElement('h4');
            tituloElemento.textContent = curso.titulo;
            const precioElemento = document.createElement('p');
            precioElemento.textContent = `Precio: $${curso.precio.valor}`;
            const dedicacionElemento = document.createElement('p');
            dedicacionElemento.textContent = `Dedicación: ${curso.dedicacion}`;
            const eliminarDelCarritoBtn = document.createElement('button');
            eliminarDelCarritoBtn.classList.add('eliminarDelCarrito');
            eliminarDelCarritoBtn.innerHTML = `<i class="fa-solid fa-trash"></i>`;
            eliminarDelCarritoBtn.addEventListener('click', function() {
                usuarioActivo.carrito = usuarioActivo.carrito.filter(item => item.id !== curso.id);
                sessionStorage.setItem('usuarioLogueado', JSON.stringify(usuarioActivo));
                localStorage.setItem('usuarios', JSON.stringify(usuarioActivo));
                mostrarCursosEnCarrito();
                cantidadElementos = usuarioActivo.carrito.length;
                actualizarContador(cantidadElementos);
            });            
            cursoElemento.appendChild(imagenElemento);
            contenedorDetalles.appendChild(tituloElemento);
            contenedorDetalles.appendChild(precioElemento);
            contenedorDetalles.appendChild(dedicacionElemento);
            cursoElemento.appendChild(contenedorDetalles);            
            cursoElemento.appendChild(eliminarDelCarritoBtn);

            contenedorDeCursosCarrito.appendChild(cursoElemento);

            let valorTotal = 0;
            usuarioActivo.carrito.forEach(curso => {
                valorTotal += curso.precio.valor;
            });
            if (usuarioActivo.carrito.length === 0) {
                valorTotal = 0;
            }else {
                valorTotal = valorTotal;
            }
            contenedorValorTotal.textContent = valorTotal;
        });
    }

    mostrarCursosEnCarrito();
});
