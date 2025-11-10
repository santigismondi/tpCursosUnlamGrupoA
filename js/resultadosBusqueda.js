const datosCursos = DATOS_CURSOS;
document.addEventListener('DOMContentLoaded', () => {

    const container = document.getElementById('cursosContainerInicio');
    const titulo = document.getElementById('tituloResultados');
    
    const termino = sessionStorage.getItem('terminoBusqueda') || '';

    const resultados = DATOS_CURSOS.filter(curso => 
        curso.categoria === termino
    );

    renderizarResultados(resultados);

});

function renderizarResultados(cursos) {
    const container = document.getElementById('cursosContainerInicio');
    container.innerHTML = '';
    if (cursos.length === 0) {
        container.innerHTML = '<p class="noResultados">No se encontraron cursos para esta categoría.</p>';
        return;
    }

    cursos.forEach(curso => {
        const tarjetaCurso = document.createElement('section');
        tarjetaCurso.classList.add('curso');
        tarjetaCurso.dataset.id = curso.id;

        tarjetaCurso.innerHTML = `
            <img class="imgCurso" src="${curso.imagenUrl}" alt="Portada de ${curso.titulo}">
            <h3 class="nombreCurso">${curso.titulo}</h3>
            <span class="duracionCurso">Dedicación: ${curso.dedicacion}</span>
            <span class="precioCurso">Precio: $${curso.precio.valor} ${curso.precio.moneda}</span>
            <a class="detallesCurso" href="./detalleCurso.html?id=${curso.id}">Ver Detalles</a>
            <button class="agregarCurso">Agregar al Carrito</button>
        `;
        
        container.appendChild(tarjetaCurso);
    });
}