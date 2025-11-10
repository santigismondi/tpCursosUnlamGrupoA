document.addEventListener("DOMContentLoaded", () => {
  // Obtener los cursos desde localStorage o variable global
  const cursos = JSON.parse(localStorage.getItem("cursos")) || DATOS_CURSOS;

  // Obtener el id del curso actual (si estás en detalle)
  const params = new URLSearchParams(window.location.search);
  const idActual = parseInt(params.get("id"));

  // Elementos del carrusel
  const contenedor = document.getElementById("contenedor-cursos");
  const flechaIzq = document.getElementById("izquierda");
  const flechaDer = document.getElementById("derecha");

  // Si no hay cursos, salir
  if (!cursos || cursos.length === 0) return;

  // Filtrar para no incluir el curso actual
  let cursosFiltrados = cursos.filter(curso => curso.id !== idActual);

  // Mezclar aleatoriamente
  cursosFiltrados = cursosFiltrados.sort(() => Math.random() - 0.5);

  // Mostrar al menos 4 cursos
    const cursosMostrar = cursosFiltrados.slice(0, 4);

  // Limpiar contenedor
  contenedor.innerHTML = "";

  // Crear elementos del carrusel
  cursosMostrar.forEach(curso => {
    const cursoElem = document.createElement("section");
    cursoElem.classList.add("curso");
    cursoElem.innerHTML = `
      <img class="imgCurso" src="${curso.imagenUrl}" alt="${curso.titulo}">
      <h3 class="nombreCurso">${curso.titulo}</h3>
      <span class="duracionCurso">Dedicación: ${curso.dedicacion}</span>
      <span class="precioCurso">Precio: ${curso.precio.valor} ${curso.precio.moneda}</span>
      <a href="../html/detalleCurso.html?id=${curso.id}" class="detallesCurso">Ver Detalles</a>
    `;
    contenedor.appendChild(cursoElem);
  });

  // Configurar desplazamiento: 1 curso por clic
  const cursoAncho = contenedor.querySelector(".curso").offsetWidth + 24; // ancho + gap

  flechaDer.addEventListener("click", () => {
    contenedor.scrollBy({ left: cursoAncho * 2, behavior: "smooth" });
  });

  flechaIzq.addEventListener("click", () => {
    contenedor.scrollBy({ left: -cursoAncho, behavior: "smooth" });
  });
});
