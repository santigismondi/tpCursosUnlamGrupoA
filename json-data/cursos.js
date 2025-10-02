DATOS_CURSOS=[
  {
    "id": 1,
    "categoria": "FrontEnd",
    "imagenUrl": "../recursos/img/cursos/html.avif",
    "titulo": "Desarrollo Web: HTML y CSS desde Cero",
    "precio": {
      "valor": 50,
      "moneda": "USD"
    },
    "dedicacion": "5 horas semanales",
    "docente": {
      "nombre": "Alicia Rodriguez",
      "fotoUrl": "./recursos/img/cursos/docente-alicia.jpg",
      "extracto": "Ingeniera en Sistemas con más de 10 años de experiencia en desarrollo front-end.",
      "valoracion": 5
    },
    "descripcion": "Aprende a construir la estructura y el diseño de sitios web modernos y responsivos utilizando las tecnologías fundamentales de la web: HTML5 y CSS3.",
    "requisitos": [
      "Conocimientos básicos de computación.",
      "No se requiere experiencia previa en programación."
    ],
    "clases": [
      {
        "claseNumero": 1,
        "tituloClase": "Introducción a HTML",
        "duracionClase": "90 minutos",
        "videos": [
          {
            "titulo": "Etiquetas semánticas",
            "duracion": "15:30"
          },
          {
            "titulo": "Formularios y tablas",
            "duracion": "25:10"
          }
        ],
        "examenes": [
          {
            "titulo": "Examen Parcial de HTML",
            "duracionAproximada": "45 minutos"
          }
        ]
      },
      {
        "claseNumero": 2,
        "tituloClase": "Estilizando con CSS",
        "duracionClase": "120 minutos",
        "videos": [
          {
            "titulo": "Modelo de Caja y Flexbox",
            "duracion": "45:00"
          }
        ],
        "examenes": []
      }
    ]
  },
  {
    "id": 2,
    "categoria": "BackEnd",
    "imagenUrl": "../recursos/img/cursos/javascript.avif",
    "titulo": "JavaScript Desde Cero",
    "precio": {
      "valor": 75,
      "moneda": "USD"
    },
    "dedicacion": "8 horas semanales",
    "docente": {
      "nombre": "Juan Pérez",
      "fotoUrl": "./recursos/img/cursos/docente-juan.jpg",
      "extracto": "Desarrollador Full-Stack especializado en el ecosistema de JavaScript.",
      "valoracion": 4
    },
    "descripcion": "Domina el lenguaje que impulsa la web. Aprende desde las bases hasta conceptos avanzados como asincronía, manipulación del DOM y APIs del navegador.",
    "requisitos": [
      "Conocimientos sólidos de HTML y CSS."
    ],
    "clases": [
      {
        "claseNumero": 1,
        "tituloClase": "Fundamentos de JavaScript",
        "duracionClase": "150 minutos",
        "videos": [
          {
            "titulo": "Variables, Tipos de Datos y Operadores",
            "duracion": "35:45"
          },
          {
            "titulo": "Funciones y Objetos",
            "duracion": "50:20"
          }
        ],
        "examenes": [
          {
            "titulo": "Desafío de Lógica",
            "duracionAproximada": "60 minutos"
          }
        ]
      }
    ]
  },
  {
    "id": 3,
    "categoria": "BackEnd",
    "imagenUrl": "../recursos/img/cursos/nodeJs.avif",
    "titulo": "Backend con Node.js y Express",
    "precio": {
      "valor": 90,
      "moneda": "USD"
    },
    "dedicacion": "10 horas semanales",
    "docente": {
      "nombre": "Carlos Vega",
      "fotoUrl": "./recursos/img/cursos/docente-carlos.jpg",
      "extracto": "Arquitecto de Software experto en la creación de APIs RESTful de alto rendimiento.",
      "valoracion": 5
    },
    "descripcion": "Construye servidores y APIs potentes y escalables utilizando el entorno de ejecución de JavaScript del lado del servidor más popular del mundo.",
    "requisitos": [
      "Conocimientos sólidos de JavaScript.",
      "Comprensión del protocolo HTTP."
    ],
    "clases": [
      {
        "claseNumero": 1,
        "tituloClase": "Creando una API REST con Express",
        "duracionClase": "180 minutos",
        "videos": [
          {
            "titulo": "Rutas, Controladores y Middlewares",
            "duracion": "60:00"
          }
        ],
        "examenes": [
          {
            "titulo": "Examen Final: API Completa",
            "duracionAproximada": "120 minutos"
          }
        ]
      }
    ]
  },
  {
    "id": 4,
    "categoria": "BackEnd",
    "imagenUrl": "../recursos/img/cursos/django.avif",
    "titulo": "Python para Backend con Django",
    "precio": {
      "valor": 95,
      "moneda": "USD"
    },
    "dedicacion": "10 horas semanales",
    "docente": {
      "nombre": "Juanjo Ruiz",
      "fotoUrl": "./recursos/img/cursos/docente-juanjo.jpg",
      "extracto": "Desarrolladora Python con experiencia en aplicaciones web a gran escala.",
      "valoracion": 5
    },
    "descripcion": "Aprende a desarrollar aplicaciones web completas de forma rápida y segura con Django, el framework de Python que incluye 'baterías incluidas'.",
    "requisitos": [
      "Conocimientos básicos de Python."
    ],
    "clases": [
      {
        "claseNumero": 1,
        "tituloClase": "Modelos, Vistas y Templates",
        "duracionClase": "200 minutos",
        "videos": [
          {
            "titulo": "El ORM de Django",
            "duracion": "70:00"
          }
        ],
        "examenes": []
      }
    ]
  },
  {
    "id": 5,
    "categoria": "Base de Datos",
    "imagenUrl": "../recursos/img/cursos/sql.avif",
    "titulo": "Bases de Datos con SQL desde Cero",
    "precio": {
      "valor": 60,
      "moneda": "USD"
    },
    "dedicacion": "6 horas semanales",
    "docente": {
      "nombre": "Carlos Vega",
      "fotoUrl": "./recursos/img/cursos/docente-carlos.jpg",
      "extracto": "Arquitecto de Software experto en la creación de APIs RESTful de alto rendimiento.",
      "valoracion": 5
    },
    "descripcion": "Domina el lenguaje estándar para interactuar con bases de datos relacionales. Aprende a realizar consultas, joins y a modelar datos de forma eficiente.",
    "requisitos": [
      "No se requiere experiencia previa."
    ],
    "clases": [
      {
        "claseNumero": 1,
        "tituloClase": "Consultas con SELECT",
        "duracionClase": "90 minutos",
        "videos": [
          {
            "titulo": "Filtrando con WHERE",
            "duracion": "20:00"
          },
          {
            "titulo": "Agrupando con GROUP BY",
            "duracion": "25:00"
          }
        ],
        "examenes": []
      }
    ]
  },
  {
    "id": 6,
    "categoria": "Base de Datos",
    "imagenUrl": "../recursos/img/cursos/mongodb.avif",
    "titulo": "Bases de Datos NoSQL con MongoDB",
    "precio": {
      "valor": 70,
      "moneda": "USD"
    },
    "dedicacion": "6 horas semanales",
    "docente": {
      "nombre": "Sofía Rossi",
      "fotoUrl": "./recursos/img/cursos/docente-sofia.jpg",
      "extracto": "Desarrolladora Python con experiencia en aplicaciones web a gran escala.",
      "valoracion": 5
    },
    "descripcion": "Descubre el mundo de las bases de datos NoSQL. Aprende a trabajar con documentos flexibles tipo JSON y a escalar tus aplicaciones de forma horizontal.",
    "requisitos": [
      "Conocimientos básicos de programación y formato JSON."
    ],
    "clases": [
      {
        "claseNumero": 1,
        "tituloClase": "Operaciones CRUD",
        "duracionClase": "100 minutos",
        "videos": [
          {
            "titulo": "Búsquedas y Proyecciones",
            "duracion": "40:00"
          }
        ],
        "examenes": []
      }
    ]
  }
]