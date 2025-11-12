document.addEventListener('DOMContentLoaded', () => {
    const tipoInscripcion = document.getElementById('tipoInscripcion');
    const formularioPersonal = document.getElementById('formularioPersonal');
    const formularioEmpresa = document.getElementById('formularioEmpresa');
    const contenedorPersonas = document.getElementById('contenedorPersonas');
    const btnAgregarPersona = document.getElementById('btnAgregarPersona');
    const montoTotalPersonas = document.getElementById('montoTotalPersonas');
    const formularioInscripcion = document.getElementById('formularioInscripcion');
    const modalResumen = document.getElementById('modalResumen');
    const cerrarModal = document.getElementsByClassName('cerrar-modal')[0];
    const resumenPersonasDiv = document.getElementById('resumenPersonas');
    const totalModalSpan = document.getElementById('totalModal');
    const inputsPersonal = formularioPersonal.querySelectorAll('input[required]');
    const inputsEmpresa = formularioEmpresa.querySelectorAll('input[required]');

    const COSTO_FIJO_PERSONA = 2000;
    let contadorPersonas = 1;



    function crearFilaPersona(esPrimeraFila = false) {
        contadorPersonas++;
        const nuevaFila = document.createElement('div');
        nuevaFila.classList.add('fila-persona');
        nuevaFila.setAttribute('data-id', contadorPersonas); 
        
        const inputsHTML = `
            <input type="text" name="nombre[]" placeholder="Nombre" required>
            <input type="text" name="apellido[]" placeholder="Apellido" required>
            <input type="number" name="dni[]" placeholder="DNI" min="0" required>
            <input type="email" name="email[]" placeholder="Email" required>
            <input type="tel" name="telefono[]" placeholder="Teléfono" required>
            <button type="button" class="btn-eliminar"><i class="fas fa-minus-circle"></i></button>
        `;
        
        nuevaFila.innerHTML = inputsHTML;

        const btnEliminar = nuevaFila.querySelector('.btn-eliminar');
        btnEliminar.addEventListener('click', () => eliminarPersona(nuevaFila, esPrimeraFila));

        return nuevaFila;
    }


    function agregarPersona() {
        const nuevaFila = crearFilaPersona();
        contenedorPersonas.appendChild(nuevaFila);
        recalcularTotal();
        actualizarBotonesEliminar(); 
    }


    function eliminarPersona(filaAEliminar) {
        const filas = contenedorPersonas.querySelectorAll('.fila-persona');
        
        if (filaAEliminar === filas[0]) {
            filaAEliminar.querySelectorAll('input').forEach(input => input.value = '');
            alert("No se puede eliminar la primera persona, se han limpiado los campos.");
        } else {
            filaAEliminar.remove();
        }

        recalcularTotal();
        actualizarBotonesEliminar();
    }


    function actualizarBotonesEliminar() {
        const filas = contenedorPersonas.querySelectorAll('.fila-persona');
        if (filas.length > 0) {
            const btnPrimeraFila = filas[0].querySelector('.btn-eliminar');
            if (btnPrimeraFila) {
                btnPrimeraFila.style.visibility = (filas.length === 1) ? 'hidden' : 'visible';
            }
            
            for (let i = 1; i < filas.length; i++) {
                const btnOtrasFilas = filas[i].querySelector('.btn-eliminar');
                if (btnOtrasFilas) {
                    btnOtrasFilas.style.visibility = 'visible';
                }
            }
        }
    }


    function recalcularTotal() {
        if (tipoInscripcion.value !== 'empresa') return;

        const numPersonas = contenedorPersonas.querySelectorAll('.fila-persona').length;
        const total = numPersonas * COSTO_FIJO_PERSONA;
        
        montoTotalPersonas.textContent = `$${total.toLocaleString('es-AR')}.-`;
    }






    function alternarFormulario() {
        if (tipoInscripcion.value === 'personal') {
            formularioPersonal.classList.remove('hidden');
            formularioEmpresa.classList.add('hidden');
            
            inputsPersonal.forEach(input => input.setAttribute('required', ''));

            inputsEmpresa.forEach(input => input.removeAttribute('required'));

            inicializarFormularioEmpresa(); 
        } else {
            formularioPersonal.classList.add('hidden');
            formularioEmpresa.classList.remove('hidden');


            inputsPersonal.forEach(input => input.removeAttribute('required'));

            inputsEmpresa.forEach(input => input.setAttribute('required', ''));

            recalcularTotal();
        }
    }




    function inicializarFormularioEmpresa() {
        let filas = contenedorPersonas.querySelectorAll('.fila-persona');
        for (let i = 1; i < filas.length; i++) {
            filas[i].remove();
        }
        filas[0].querySelectorAll('input').forEach(input => input.value = '');
        contadorPersonas = 1;
        
        recalcularTotal();
        actualizarBotonesEliminar();
    }



    alternarFormulario(); 
    

    tipoInscripcion.addEventListener('change', alternarFormulario);
    btnAgregarPersona.addEventListener('click', agregarPersona);

    contenedorPersonas.querySelectorAll('.btn-eliminar').forEach(btn => {
        btn.addEventListener('click', (e) => eliminarPersona(e.target.closest('.fila-persona')));
    });

    contenedorPersonas.addEventListener('input', recalcularTotal); 




    formularioInscripcion.addEventListener('submit', (e) => {
        e.preventDefault(); 

        resumenPersonasDiv.innerHTML = ''; 


        if (tipoInscripcion.value === 'personal') {
            const nombre = document.getElementById('nombrePersonal').value;
            const apellido = document.getElementById('apellidoPersonal').value;
            const dni = document.getElementById('dniPersonal').value;
            const email = document.getElementById('emailPersonal').value;
            const telefono = document.getElementById('telefonoPersonal').value;
            const total = formularioPersonal.querySelector('.monto-total').textContent;

            resumenPersonasDiv.innerHTML = `
                <p><strong>Tipo:</strong> Personal</p>
                <p><strong>Nombre:</strong> ${nombre} ${apellido}</p>
                <p><strong>DNI:</strong> ${dni}</p>
                <p><strong>Email:</strong> ${email}</p>
                <p><strong>Teléfono:</strong> ${telefono}</p>
            `;
            totalModalSpan.textContent = total;


        } else if (tipoInscripcion.value === 'empresa') {
            const filas = contenedorPersonas.querySelectorAll('.fila-persona');
            let resumenHTML = '<p><strong>Tipo:</strong> Empresa</p><h4>Personas Inscritas:</h4>';

            filas.forEach((fila, index) => {
                const nombre = fila.querySelector('input[name="nombre[]"]').value;
                const apellido = fila.querySelector('input[name="apellido[]"]').value;
                const dni = fila.querySelector('input[name="dni[]"]').value;

                if (nombre.trim() !== '' || apellido.trim() !== '' || dni.trim() !== '') {
                    resumenHTML += `<p><strong>${index + 1}.</strong> ${nombre} ${apellido} (DNI: ${dni})</p>`;
                }
            });
            
            resumenPersonasDiv.innerHTML = resumenHTML;
            totalModalSpan.textContent = montoTotalPersonas.textContent;
        }

        modalResumen.style.display = 'block';
    });

    const redirigirAPagos = () => {
        window.location.href = './pantallaPagos.html';
    };


    cerrarModal.onclick = function() {
        modalResumen.style.display = 'none';
        redirigirAPagos(); 
    }

    window.onclick = function(event) {
        if (event.target == modalResumen) {
            modalResumen.style.display = 'none';
            redirigirAPagos(); 
        }
    }
    
    actualizarBotonesEliminar();
});