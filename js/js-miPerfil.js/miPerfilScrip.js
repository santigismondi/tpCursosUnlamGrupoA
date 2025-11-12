document.addEventListener("DOMContentLoaded", () => {
    const nombreGuardado = sessionStorage.getItem('usuarioLogueado');
    const usuarios = JSON.parse(nombreGuardado);

    
    const nombre = usuarios.nombre;
    const apellido = usuarios.apellido;
    const email = usuarios.email;
    const password = usuarios.password

    document.querySelector("#nombre").textContent = nombre;
    document.querySelector("#apellido").textContent = apellido;
    document.querySelector("#email").textContent = email;
    document.querySelector("#password").textContent = password;







})





