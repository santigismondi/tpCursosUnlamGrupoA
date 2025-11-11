const cursosJson = localStorage.getItem("cursos");
const cursos = cursosJson ? JSON.parse(cursosJson) : DATOS_CURSOS;

// Obtener el valor de "id" desde la URL
const params = new URLSearchParams(window.location.search);
const id = params.get("id");

// Verificar si el parámetro existe y es válido
if (id !== null && !isNaN(id) && cursos[id - 1]) {
    AgregarContenidoCursos(parseInt(id - 1));
} else {
    // Si no hay id o es inválido, cargar por defecto el curso 0 o mostrar error
    console.warn("Curso no encontrado o ID inválido. Se cargará la primera por defecto.");
    AgregarContenidoCursos(0);
}

function AgregarContenidoCursos(cursoSeleccionado) {
    const curso = cursos[cursoSeleccionado];
    console.log(cursos);

    // Detalles del curso

    const imgCurso = document.getElementById("imagenUrl");
    imgCurso.src = curso.imagenUrl;
    imgCurso.alt = curso.titulo;

    document.getElementById("titulo").textContent = curso.titulo;
    document.getElementById("precio").textContent = `${curso.precio.valor} ${curso.precio.moneda}`;
    document.getElementById("dedicacion").textContent = curso.dedicacion;
    document.getElementById("descripcion").textContent = curso.descripcion;

    // Botón Agregar al Carrito
    const contenedorBoton = document.getElementById("contenedorBotonCarrito");
    contenedorBoton.innerHTML = ""; // limpiar por si se recarga la página

    const botonAgregar = document.createElement("a");
    botonAgregar.classList.add("agregarCurso");
    botonAgregar.textContent = "Inscribirse";
    botonAgregar.dataset.id = curso.id;

    botonAgregar.addEventListener("click", () => {
        agregarAlCarrito(curso);
    });

    contenedorBoton.appendChild(botonAgregar);

    // Requisitos del curso
    const listaRequisitos = document.getElementById("requisitos");
    listaRequisitos.innerHTML = "";

    if (curso.requisitos && curso.requisitos.length > 0) {
        curso.requisitos.forEach(req => {
            const li = document.createElement("li");
            li.textContent = req;
            listaRequisitos.appendChild(li);
        });
    } else {
        listaRequisitos.innerHTML = "<li>No hay requisitos previos.</li>";
    }

    // Clases del curso
    const seccionClases = document.getElementById("clasesCurso");
    seccionClases.innerHTML = "";

    // Acordeon
    const acordeon = document.createElement("details");
    acordeon.classList.add("acordeon");

    const resumenAcordeon = document.createElement("summary");
    resumenAcordeon.classList.add("contenido");
    resumenAcordeon.textContent = "Contenidos por clase";
    acordeon.appendChild(resumenAcordeon);

    // Recorrer las clases del curso
    curso.clases.forEach((clase) => {
        const detalleClase = document.createElement("details");
        detalleClase.classList.add("contenido");

        const resumenClase = document.createElement("summary");
        resumenClase.classList.add("contenido");
        resumenClase.textContent = `Clase ${clase.claseNumero} - ${clase.tituloClase}`;
        detalleClase.appendChild(resumenClase);

        const pDuracion = document.createElement("p");
        pDuracion.textContent = `Duración: ${clase.duracionClase}`;
        detalleClase.appendChild(pDuracion);

        // Videos
        if (clase.videos && clase.videos.length > 0) {
            clase.videos.forEach((video, index) => {
                const detalleVideo = document.createElement("details");
                const resumenVideo = document.createElement("summary");
                resumenVideo.classList.add("contenido");
                resumenVideo.textContent = `Video ${index + 1}`;
                detalleVideo.appendChild(resumenVideo);

                const pTituloVideo = document.createElement("p");
                pTituloVideo.textContent = video.titulo;
                const pDuracionVideo = document.createElement("p");
                pDuracionVideo.textContent = `Duración: ${video.duracion}`;

                detalleVideo.appendChild(pTituloVideo);
                detalleVideo.appendChild(pDuracionVideo);
                detalleClase.appendChild(detalleVideo);
            });
        }

        // Examenes
        if (clase.examenes && clase.examenes.length > 0) {
            const detalleExamen = document.createElement("details");
            const resumenExamen = document.createElement("summary");
            resumenExamen.classList.add("contenido");
            resumenExamen.textContent = "Exámenes";
            detalleExamen.appendChild(resumenExamen);

            clase.examenes.forEach((examen) => {
                const pTituloExamen = document.createElement("p");
                pTituloExamen.textContent = examen.titulo;
                const pDuracionExamen = document.createElement("p");
                pDuracionExamen.textContent = `Duración: ${examen.duracionAproximada}`;
                detalleExamen.appendChild(pTituloExamen);
                detalleExamen.appendChild(pDuracionExamen);
            });

            detalleClase.appendChild(detalleExamen);
        }

        acordeon.appendChild(detalleClase);
    });

    // Agregar el acordeón completo a la sección
    seccionClases.appendChild(acordeon);

    // Detalles del docente
    const imgDocente = document.getElementById("fotoUrl");
    imgDocente.src = curso.docente.fotoUrl;
    imgDocente.alt = curso.docente.nombre;

    document.getElementById("nombre").textContent = curso.docente.nombre;
    document.getElementById("extracto").textContent = curso.docente.extracto;

    // Generar estrellas de valoración
    const contenedorValoracion = document.getElementById("valoracion");
    contenedorValoracion.innerHTML = ""; // limpiar contenido previo

    for (let i = 0; i < 5; i++) {
        const estrella = document.createElement("span");
        estrella.textContent = i < curso.docente.valoracion ? "★" : "☆";
        estrella.classList.add("estrella");
        contenedorValoracion.appendChild(estrella);
    }

}
