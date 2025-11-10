const actividades = document.querySelectorAll('.actividad');
const popup = document.getElementById('popupCurso');
const nombreCurso = document.getElementById('nombreCurso');
const resumenCurso = document.getElementById('resumenCurso');
const btnDetalle = document.getElementById('btnDetalle');
const cerrar = document.querySelector('.popup .cerrar');

actividades.forEach(act => {
    act.addEventListener('click', () => {
        const nombre = act.getAttribute('data-curso');
        const resumen = act.getAttribute('data-resumen');
        const detalle = act.getAttribute('data-detalle');

        nombreCurso.textContent = nombre;
        resumenCurso.textContent = resumen;
        btnDetalle.href = detalle;

        popup.style.display = 'flex';
    });
});

cerrar.addEventListener('click', () => popup.style.display = 'none');

popup.addEventListener('click', e => {
    if(e.target === popup){
        popup.style.display = 'none';
    }
});