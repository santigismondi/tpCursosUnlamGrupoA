document.addEventListener('DOMContentLoaded', () => {
    const formulario = document.getElementById('formRegistro');
    const btnRegistrar = document.getElementById('btnRegistrar');

    function esSoloLetras(texto) {
        const letrasValidas = "abcdefghijklmnopqrstuvwxyzáéíóúñ ";
        texto = texto.toLowerCase();
        for (let i = 0; i < texto.length; i++) {
            if (!letrasValidas.includes(texto[i])) {
                return false;
            }
        }
        return texto.length > 0;
    }

    function esLetrasYNumeros(texto) {
        for (let i = 0; i < texto.length; i++) {
            const c = texto[i];
            if (!(c >= 'a' && c <= 'z') && 
                !(c >= 'A' && c <= 'Z') && 
                !(c >= '0' && c <= '9')) {
                return false;
            }
        }
        return texto.length > 0;
    }

    function esContrasenaValida(pass) {
        if (pass.length < 8) return false;

        let letras = 0;
        let numeros = 0;
        let simbolos = 0;
        const simbolosValidos = "!@#$%^&*()_+={}[]:;\"'<>,.?~\\/-";

        for (let i = 0; i < pass.length; i++) {
            const c = pass[i];
            if ((c >= 'a' && c <= 'z') || (c >= 'A' && c <= 'Z')) letras++;
            else if (c >= '0' && c <= '9') numeros++;
            else if (simbolosValidos.includes(c)) simbolos++;
        }

        return letras >= 2 && numeros >= 2 && simbolos >= 2;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    const nombreInput = document.getElementById('nombre');
    const apellidoInput = document.getElementById('apellido');
    const emailInput = document.getElementById('email');
    const nombreUsuarioInput = document.getElementById('nombreUsuario');
    const contrasenaInput = document.getElementById('contrasena');
    const repetirContrasenaInput = document.getElementById('repetir_contrasena');

    const mostrarError = (input, mensaje) => {
        const contenedorCampo = input.parentElement;

        let error = contenedorCampo.nextElementSibling;

        if (!error || !error.classList.contains('error')) {
            error = document.createElement('div');
            error.classList.add('error');
            error.style.color = 'red';
            error.style.fontSize = '0.9rem';
            error.style.marginTop = '0.5em';
            error.style.marginBottom = '0.5em';
            contenedorCampo.insertAdjacentElement('afterend', error);
        }

        error.textContent = mensaje;
    };
    const limpiarError = (input) => {
        const error = input.nextElementSibling;
        if (error && error.classList.contains('error')) {
            error.remove();
        }
    };

    function limpiarTodosLosErrores() {
        const errores = document.querySelectorAll('.error');
        errores.forEach(error => error.remove());
    }

    const validarFormulario = () => {
        limpiarTodosLosErrores();
        let esValido = true;

        if (!esSoloLetras(nombreInput.value.trim())) {
            mostrarError(nombreInput, 'Solo se permiten letras');
            esValido = false;
        }

        if (!esSoloLetras(apellidoInput.value.trim())) {
            mostrarError(apellidoInput, 'Solo se permiten letras');
            esValido = false;
        }

        if (!emailRegex.test(emailInput.value.trim())) {
            mostrarError(emailInput, 'Email inválido');
            esValido = false;
        }

        if (!esLetrasYNumeros(nombreUsuarioInput.value.trim())) {
            mostrarError(nombreUsuarioInput, 'Solo letras y números');
            esValido = false;
        }

        if (!esContrasenaValida(contrasenaInput.value.trim())) {
            mostrarError(contrasenaInput, 'La contraseña debe tener mínimo 8 caracteres, 2 letras, 2 números y 2 símbolos');
            esValido = false;
        }

        if (repetirContrasenaInput.value.trim() !== contrasenaInput.value.trim()) {
            mostrarError(repetirContrasenaInput, 'Las contraseñas no coinciden');
            esValido = false;
        }

        return esValido;
    };

    formulario.addEventListener('submit', (e) => {
        e.preventDefault();

        if (!validarFormulario()) return;

        const nuevoUsuario = {
            nombreUsuario: nombreUsuarioInput.value.trim(),
            contrasena: contrasenaInput.value.trim(),
            nombre: nombreInput.value.trim(),
            apellido: apellidoInput.value.trim(),
            email: emailInput.value.trim(),
            carrito: []
        };
        const usuariosGuardados = JSON.parse(localStorage.getItem('usuarios')) || [];

        const yaExiste = usuariosGuardados.some(user => user.nombreUsuario === nuevoUsuario.nombreUsuario);
        if (yaExiste) {
            alert('Ese nombre de usuario ya está registrado');
            return;
        }

        const emailYaExiste = usuariosGuardados.some(user => user.email === nuevoUsuario.email);
        if (emailYaExiste) {
            alert('Ese email ya está registrado');
            return;
        }

        usuariosGuardados.push(nuevoUsuario);
        localStorage.setItem('usuarios', JSON.stringify(usuariosGuardados));

        alert('Registro exitoso! Ahora podés iniciar sesión.');
        window.location.href = '../index.html';
    });    
});