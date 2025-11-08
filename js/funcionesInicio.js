const datosCursos = DATOS_CURSOS;
const containerCursos = document.getElementById("cursosContainerInicio");
const botonAgregar = document.getElementsByClassName("agregarCurso");

document.addEventListener("DOMContentLoaded", () => {
    containerCursos.innerHTML = "";

    datosCursos.forEach(curso => {
        const contenedorCurso = document.createElement("section");
        contenedorCurso.classList.add("curso");

        contenedorCurso.dataset.id = curso.id;

        const imgCurso = document.createElement("img");
        imgCurso.classList.add("imgCurso");
        imgCurso.src = curso.imagenUrl;
        imgCurso.alt = `Portada del curso ${curso.titulo}`;
        
        const nombreCurso = document.createElement("h3");
        nombreCurso.classList.add("nombreCurso");
        nombreCurso.textContent = curso.titulo;

        const duracionCurso = document.createElement("span");
        duracionCurso.classList.add("duracionCurso");
        duracionCurso.textContent = `Dedicación: ${curso.dedicacion}`;
        
        const precioCurso = document.createElement("span");
        precioCurso.classList.add("precioCurso");
        precioCurso.textContent = `Precio: $${curso.precio.valor} ${curso.precio.moneda}`;
        
        const detallesCurso = document.createElement("a");
        detallesCurso.classList.add("detallesCurso");
        detallesCurso.textContent = "Ver Detalles";
        detallesCurso.setAttribute('href', './detalleCurso.html');

        const agregarCurso = document.createElement("button");
        agregarCurso.classList.add("agregarCurso");
        agregarCurso.textContent = "Agregar al Carrito";

        containerCursos.appendChild(contenedorCurso);
        contenedorCurso.appendChild(imgCurso);
        contenedorCurso.appendChild(nombreCurso);
        contenedorCurso.appendChild(duracionCurso);
        contenedorCurso.appendChild(precioCurso);
        contenedorCurso.appendChild(detallesCurso);
        contenedorCurso.appendChild(agregarCurso);
    });

    //Slider
    const sliderWrapper = document.querySelector('.slider-wrapper');
    const slides = document.querySelectorAll('.imagenSlider');
    const nextBtn = document.getElementById('next-slide');
    const prevBtn = document.getElementById('prev-slide');
    let autoSlideTimer;
    let slideActual = 0;
    const totalSlides = slides.length;
    
    function actualizarSlider() {
        sliderWrapper.style.transform = `translateX(-${slideActual * 100}%)`;
    }

    function resetAutoSlideTimer() {
        clearInterval(autoSlideTimer);
        
        autoSlideTimer = setInterval(() => {
            nextBtn.click();
        }, 5000);
    }

    nextBtn.addEventListener('click', () => {
        if (slideActual < totalSlides - 1) {
            slideActual++;
        } else {
            slideActual = 0;
        }
        actualizarSlider();
        resetAutoSlideTimer();
    });

    prevBtn.addEventListener('click', () => {
        if (slideActual > 0) {
            slideActual--;
        } else {
            slideActual = totalSlides - 1;
        }
        actualizarSlider();
        resetAutoSlideTimer();
    });

    resetAutoSlideTimer();
})