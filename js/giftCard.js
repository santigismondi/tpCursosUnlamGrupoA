

document.addEventListener('DOMContentLoaded', () => {

    const cuadradoDiv = document.querySelector('.cuadrado'); 
    const nombreDestinatarioH1 = document.getElementById('nombreDestinatario');
    const cuadradoMontoDiv = document.querySelector('.cuadrado-monto');

    const opcionesColor = document.querySelectorAll('input[name="letra"]');
    const opcionesTamaño = document.querySelectorAll('input[name="Tamaño"]');
    const inputNombreDestinatario = document.getElementById('nombreGiftCard');
    const inputMonto = document.getElementById('monto');
    const opcionesUbicacion = document.querySelectorAll('input[name="Ubicación"]'); 
    const opcionesFondo = document.querySelectorAll('input[name="fondo"]');


    const form = document.getElementById('giftCardForm'); 

    if (form) {
        form.addEventListener('submit', (event) => {
            if (inputMonto) {
                const monto = inputMonto.value.trim();
                
                localStorage.setItem('montoGiftCard', monto);
                

                
                console.log('Monto  guardados antes de la redirección.');
            } else {
                console.error('Error: No se encontró el campo de monto.');
                event.preventDefault();
            }
        });
    } else {
        console.error('Advertencia: No se encontró el formulario con ID "giftCardForm". Asegúrate de que exista.');
    }

    const mapaClasesUbicacion = {
        'derecha-abajo': 'derecha-abajo',
        'derecha-arriba': 'derecha-arriba',
        'izquierda-arriba': 'izquierda-arriba'
    };
    
    const mapaClasesFondo = {
        'celeste': 'celeste',
        'violeta': 'violeta',
        'negro': 'negro',
        'naranja': 'naranja',
        'dorado': 'dorado'
    };


    const actualizarColorDestinatario = (color) => {
        if (nombreDestinatarioH1) {
            nombreDestinatarioH1.style.color = color;
        }
    };
    
    const actualizarTamañoDestinatario = (tamaño) => {
        if (nombreDestinatarioH1) {
            nombreDestinatarioH1.style.fontSize = `${tamaño}px`; 
        }
    };

    const actualizarNombreDestinatario = () => {
        if (nombreDestinatarioH1 && inputNombreDestinatario) {
            const nuevoNombre = inputNombreDestinatario.value.trim();
            nombreDestinatarioH1.textContent = nuevoNombre === "" ? "DESTINATARIO" : nuevoNombre.toUpperCase();
        }
    };

    const actualizarMonto = () => {
        if (cuadradoMontoDiv && inputMonto) {
            let valor = inputMonto.value.trim();
            if (valor === "" || isNaN(parseInt(valor))) {
                valor = "0"; 
            }
            const montoFormateado = parseInt(valor).toLocaleString('es-AR'); 
            cuadradoMontoDiv.textContent = `$${montoFormateado}`;
        }
    };
    
    const actualizarUbicacionMonto = (ubicacionId) => {
        if (cuadradoMontoDiv) {
            Object.values(mapaClasesUbicacion).forEach(clase => {
                cuadradoMontoDiv.classList.remove(clase);
            });
            const nuevaClase = mapaClasesUbicacion[ubicacionId];
            if (nuevaClase) {
                cuadradoMontoDiv.classList.add(nuevaClase);
            }
        }
    };

    const actualizarFondo = (fondoId) => {
        if (cuadradoDiv) {
            Object.values(mapaClasesFondo).forEach(clase => {
                cuadradoDiv.classList.remove(clase);
            });

            const nuevaClase = mapaClasesFondo[fondoId];
            if (nuevaClase) {
                cuadradoDiv.classList.add(nuevaClase);
            }
        }
    };


    opcionesFondo.forEach(opcion => {
        opcion.addEventListener('change', (event) => {
            const fondoSeleccionadoId = event.target.id; 
            actualizarFondo(fondoSeleccionadoId);
        });
    });

    opcionesColor.forEach(opcion => {
        opcion.addEventListener('change', (event) => {
            const colorSeleccionado = event.target.value.toLowerCase();
            actualizarColorDestinatario(colorSeleccionado);
        });
    });

    opcionesTamaño.forEach(opcion => {
        opcion.addEventListener('change', (event) => {
            const tamañoSeleccionado = event.target.value; 
            actualizarTamañoDestinatario(tamañoSeleccionado);
        });
    });

    opcionesUbicacion.forEach(opcion => {
        opcion.addEventListener('change', (event) => {
            const ubicacionSeleccionadaId = event.target.id; 
            actualizarUbicacionMonto(ubicacionSeleccionadaId);
        });
    });

    inputNombreDestinatario.addEventListener('input', actualizarNombreDestinatario);
    inputMonto.addEventListener('input', actualizarMonto); 


    actualizarNombreDestinatario();
    actualizarMonto();
    
    const tamañoInicial = document.querySelector('input[name="Tamaño"]:checked')?.value || '22';
    actualizarTamañoDestinatario(tamañoInicial);
    
    const ubicacionInicial = document.querySelector('input[name="Ubicación"]:checked')?.id;
    if (ubicacionInicial) {
        actualizarUbicacionMonto(ubicacionInicial);
    }
    
    const fondoInicial = document.querySelector('input[name="fondo"]:checked')?.id;
    if (fondoInicial) {
        actualizarFondo(fondoInicial);
    } else {
        cuadradoDiv.classList.add('celeste'); 
    }
});