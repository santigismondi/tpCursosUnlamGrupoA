// Carrusel de cursos similares
document.addEventListener("DOMContentLoaded", () => {
  const params = new URLSearchParams(window.location.search);
  const idCursoActual = parseInt(params.get("id"));

  const cursoSeleccionado = cursos.find(c => c.id === idCursoActual);
  const contenedorCarrusel = document.getElementById("carruselSimilares");

  if (!cursoSeleccionado || !contenedorCarrusel) {
    console.warn("No se encontró el curso actual o el contenedor del carrusel.");
    return;
  }

  // Seleccionar hasta 5 cursos distintos al actual
  const cursosSimilares = cursos.filter(c => c.id !== idCursoActual);
  const mezcladas = cursosSimilares.sort(() => Math.random() - 0.5).slice(0, 5);

  mezcladas.forEach(curso => {
    const link = document.createElement("a");
    link.href = `detalleCurso.html?id=${curso.id}`;
    link.classList.add("itemCarrusel");

    const imagen = document.createElement("img");
    imagen.src = curso.imagenUrl;
    imagen.alt = curso.titulo;

    link.appendChild(imagen);
    contenedorCarrusel.appendChild(link);
  });

  // Flechas de navegación
  const btnIzquierda = document.getElementById("btnIzquierda");
  const btnDerecha = document.getElementById("btnDerecha");

  if (btnIzquierda && btnDerecha) {
    btnIzquierda.addEventListener("click", () => {
      contenedorCarrusel.scrollBy({ left: -300, behavior: "smooth" });
    });

    btnDerecha.addEventListener("click", () => {
      contenedorCarrusel.scrollBy({ left: 300, behavior: "smooth" });
    });
  }
});