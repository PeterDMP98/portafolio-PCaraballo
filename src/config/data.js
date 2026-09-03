/*============================================
  DATOS DEL PORTAFOLIO
  ============================================
  - myInfo: Información personal y perfiles
  - myProjects: Proyectos destacados (3 principales)
  - allProjects: Todos los proyectos con filtros
*/

import fullTechnologyImg1 from "../assets/proyect-img/Full-Technology/full-technology-1.png";
import fullTechnologyImg2 from "../assets/proyect-img/Full-Technology/full-technology-2.png";
import fullTechnologyImg3 from "../assets/proyect-img/Full-Technology/full-technology-3.png";
import fullTechnologyImg4 from "../assets/proyect-img/Full-Technology/full-technology-4.png";
import fullTechnologyImg5 from "../assets/proyect-img/Full-Technology/full-technology-5.png";

const myInfo = [
  {
    name: "Pedro Luis Caraballo Banquez",
    title: "Desarrollador Web Full Stack",
    title_en: "Full Stack Web Developer",
    email: "peter.dmp.ca@gmail.com",
    phone: "3043583617",
    phone_two: "3187455555",
    about:
      "Soy un desarrollador web apasionado por la tecnología y la programación. Me encanta aprender nuevas tecnologías y mejorar mis habilidades constantemente. Disfruto trabajar en proyectos desafiantes y colaborar con otros desarrolladores para crear soluciones innovadoras.",
    about_en:
      "I'm a web developer passionate about technology and programming. I love learning new technologies and constantly improving my skills. I enjoy working on challenging projects and collaborating with other developers to create innovative solutions.",
    stack: [
      "HTML",
      "CSS",
      "JavaScript",
      "React",
      "Node.js",
      "Express",
      "PostgreSQL",
      "SQLite",
    ],
    whatsapp: "https://wa.me/573043583617",
    linkedin: "https://www.linkedin.com/in/pedro-luis-caraballo-banquez-5b1119b0/",
    github: "https://github.com/PeterDMP98?tab=repositories",
    cvUrl: "https://drive.google.com/uc?export=download&id=1nc9PDoX8Vrr1auFD8sqzbwLZtdowiMV_",
    study: [
      {
        institution: "SENA",
        degree: "Análisis y Desarrollo de Software",
        degree_en: "Analysis and Software Development",
        logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/0e/SENA_logo.svg/1200px-SENA_logo.svg.png",
      },
      {
        institution: "SENA",
        degree: "Manejo de Prueba de Software",
        degree_en: "Software Testing Management",
        logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/0e/SENA_logo.svg/1200px-SENA_logo.svg.png",
      },
      {
        institution: "ACADEMLO",
        degree: "Desarrollador Full Stack Web",
        degree_en: "Full Stack Web Developer",
        logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/0e/SENA_logo.svg/1200px-SENA_logo.svg.png",
      },
      {
        institution: "Alura Latam",
        degree: "Data Science",
        degree_en: "Data Science",
        logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/0e/SENA_logo.svg/1200px-SENA_logo.svg.png",
      },
    ],
  },
];

/* ---- PROYECTOS DESTACADOS (3 principales) ---- */
const myProjects = [
  {
    id: "softcamp",
    name: "SOFTCAMP",
    description:
      "Plataforma de gestión de información para campesinos y sus fincas donde se gestiona el ganado, siembra, insumos, empleados, etc. y sección para compradores y sus pedidos.",
    description_en:
      "Information management platform for farmers and their farms, managing livestock, crops, supplies, employees, etc., with a section for buyers and their orders.",
    stack: ["React", "Tailwind CSS", "Node.js", "Express", "PostgreSQL"],
    image: "https://placehold.co/600x400?text=SOFTCAMP",
    link: "",
    github: "",
    status: "completed",
    category: "web",
    type: "app",
    isAI: false,
    featured: true,
  },
  {
    id: "full-technology",
    name: "Full-Technology",
    description:
      "Aplicación de escritorio para la gestión de un negocio de reparación de equipos y venta de accesorios. Centraliza el registro de órdenes de servicio, clientes, inventario, punto de venta, gestión contable e historial de ventas, todo en una sola ventana tipo Excel con moneda configurable.",
    description_en:
      "Desktop application for managing an equipment repair and accessories sales business. It centralizes service orders, clients, inventory, point of sale, accounting management and sales history, all in a single Excel-style window with configurable currency.",
    stack: ["C#", ".NET 10", "WinForms", "SQLite"],
    image: fullTechnologyImg1,
    images: [
      fullTechnologyImg1,
      fullTechnologyImg2,
      fullTechnologyImg3,
      fullTechnologyImg4,
      fullTechnologyImg5,
    ],
    version: "2.2.0",
    features: [
      "Mantenimiento de equipos en una sola ventana (cliente, dispositivo, diagnóstico, costo/entrega)",
      "Cobro de pendientes con abonos, historial de pagos y opción de entrega",
      "Clientes compradores y proveedores con documento/celular únicos",
      "Inventario de repuestos y accesorios con control de stock",
      "Punto de venta de accesorios con carrito, descuentos y medios de pago",
      "Gestión contable con cierre del día y balances con gráficas",
      "Historial de ventas consultable por fechas, medio de pago y búsqueda",
      "Moneda configurable (COP por defecto, USD, EUR)",
    ],
    features_en: [
      "Equipment maintenance in a single window (client, device, diagnosis, cost/delivery)",
      "Pending payments with installments, payment history and delivery option",
      "Buyer and supplier clients with unique ID/phone",
      "Spare parts and accessories inventory with stock control",
      "Point of sale for accessories with cart, discounts and payment methods",
      "Accounting management with daily close and balance charts",
      "Queryable sales history by date, payment method and search",
      "Configurable currency (COP by default, USD, EUR)",
    ],
    updates: [
      {
        version: "2.2.0",
        date: "2026",
        label_es: "Actualización de gestión contable, clientes, venta y mantenimiento",
        label_en: "Accounting management, clients, sales and maintenance update",
        changes_es: [
          "Gestión contable: cierre del día desde una fecha hacia adelante y descarga del cierre en PDF",
          "Corrección del registro de clientes: solo se exige documento o celular (no ambos)",
          "Venta: corregido el layout del carrito y se agregó opción para volver a mostrar el carrito oculto",
          "Mantenimiento: botón Ver con historial de pagos y botón Editar solo de diagnóstico y reparación",
          "Columna 'Opciones' con los botones en las listas de mantenimiento",
        ],
        changes_en: [
          "Accounting: daily close from a date forward and PDF download of the close",
          "Client registration fix: only ID or phone is required (not both)",
          "Sales: fixed cart layout and added option to show a hidden cart again",
          "Maintenance: View button with payment history and Edit button only for diagnosis and repair",
          "'Options' column with buttons in the maintenance lists",
        ],
      },
      {
        version: "2.0.0",
        date: "2025",
        label_es: "Rediseño a una sola ventana y nuevos módulos",
        label_en: "Single-window redesign and new modules",
        changes_es: [
          "Ventana principal tipo Excel con barra superior contextual y navegación inferior de módulos",
          "Módulos de Clientes, Inventario, Venta, Gestión Contable e Historial de venta",
          "Moneda configurable desde el menú de Configuración",
          "Migración automática que preserva los datos de versiones anteriores",
        ],
        changes_en: [
          "Excel-style main window with contextual top bar and bottom module navigation",
          "Clients, Inventory, Sales, Accounting Management and Sales History modules",
          "Configurable currency from the Settings menu",
          "Automatic migration that preserves data from previous versions",
        ],
      },
    ],
    download: "https://drive.google.com/uc?export=download&id=1NUPjG3UUZYFXu8EKOviodpS-fDm_gt8_",
    link: "",
    github: "",
    status: "completed",
    category: "desktop",
    type: "app",
    isAI: false,
    featured: true,
  },
  {
    id: "biblia-multi",
    name: "Biblia Multiplataforma",
    description:
      "Biblia multiplataforma con diseño amigable, diferentes versiones y traducciones, con sección de lectura diaria, notas y marcadores, opción para transmitir en una segunda pantalla para iglesias.",
    description_en:
      "Cross-platform Bible with friendly design, different versions and translations, daily reading section, notes and bookmarks, option to cast to a second screen for churches.",
    stack: ["Flutter", "Dart", "SQLite", "PostgreSQL"],
    image: "https://placehold.co/600x400?text=Biblia+Multiplataforma",
    link: "",
    github: "",
    status: "inDevelopment",
    category: "mobile",
    type: "app",
    isAI: false,
    featured: true,
  },
  {
    id: "super-inventory",
    name: "SuperInventory",
    description:
      "Sistema de inventario para empresas, con control de productos, proveedores, clientes, ventas y reportes. Permite la gestión de inventario en tiempo real y la generación de reportes personalizados.",
    description_en:
      "Inventory system for businesses with product control, suppliers, clients, sales and reports. Allows real-time inventory management and custom report generation.",
    stack: ["JavaScript", "React", "Node.js", "Express", "PostgreSQL", "SQLite"],
    image: "https://placehold.co/600x400?text=SuperInventory",
    link: "",
    github: "",
    status: "completed",
    category: "web",
    type: "app",
    isAI: false,
    featured: true,
  },
];

/* ---- TODOS LOS PROYECTOS (incluye más para demostrar filtros) ---- */
const allProjects = [
  ...myProjects,
  {
    id: "ai-chat-app",
    name: "AI Chat App",
    description:
      "Aplicación de chat con IA integrada usando la API de OpenAI, con historial de conversaciones y respuestas contextuales.",
    description_en:
      "Chat application with integrated AI using the OpenAI API, with conversation history and contextual responses.",
    stack: ["React", "Node.js", "OpenAI", "Socket.io", "MongoDB"],
    image: "https://placehold.co/600x400?text=AI+Chat+App",
    link: "",
    github: "",
    status: "completed",
    category: "web",
    type: "app",
    isAI: true,
    featured: false,
  },
  {
    id: "pixel-quest",
    name: "Pixel Quest",
    description:
      "Juego 2D de plataformas estilo retro con niveles generados proceduralmente y sistema de puntuaciones online.",
    description_en:
      "Retro-style 2D platformer game with procedurally generated levels and online score system.",
    stack: ["JavaScript", "Phaser.js", "Node.js", "MongoDB"],
    image: "https://placehold.co/600x400?text=Pixel+Quest",
    link: "",
    github: "",
    status: "inDevelopment",
    category: "game",
    type: "game",
    isAI: false,
    featured: false,
  },
  {
    id: "invoice-flow",
    name: "InvoiceFlow",
    description:
      "Sistema de facturación electrónica con generación de PDF, envío por email y dashboard analítico.",
    description_en:
      "Electronic invoicing system with PDF generation, email sending and analytical dashboard.",
    stack: ["React", "Node.js", "Express", "PostgreSQL", "Tailwind CSS"],
    image: "https://placehold.co/600x400?text=InvoiceFlow",
    link: "",
    github: "",
    status: "completed",
    category: "web",
    type: "app",
    isAI: false,
    featured: false,
  },
  {
    id: "task-manager-pro",
    name: "TaskManager Pro",
    description:
      "Aplicación de escritorio para gestión de tareas con sincronización en la nube, arrastrar y soltar, y colaboración en equipo.",
    description_en:
      "Desktop application for task management with cloud sync, drag and drop, and team collaboration.",
    stack: ["Electron", "React", "SQLite", "Node.js"],
    image: "https://placehold.co/600x400?text=TaskManager+Pro",
    link: "",
    github: "",
    status: "completed",
    category: "desktop",
    type: "app",
    isAI: false,
    featured: false,
  },
  {
    id: "vision-ai",
    name: "Vision AI",
    description:
      "Herramienta de análisis de imágenes con IA que detecta objetos, texto y caras usando modelos pre-entrenados.",
    description_en:
      "AI image analysis tool that detects objects, text and faces using pre-trained models.",
    stack: ["Python", "TensorFlow", "React", "Flask"],
    image: "https://placehold.co/600x400?text=Vision+AI",
    link: "",
    github: "",
    status: "completed",
    category: "ai",
    type: "app",
    isAI: true,
    featured: false,
  },
  {
    id: "ui-kit-pro",
    name: "UI Kit Pro",
    description:
      "Colección de componentes React reutilizables con tema customizable, documentación interactiva y ejemplos en vivo.",
    description_en:
      "Collection of reusable React components with customizable theme, interactive documentation and live examples.",
    stack: ["React", "Storybook", "SCSS", "TypeScript"],
    image: "https://placehold.co/600x400?text=UI+Kit+Pro",
    link: "",
    github: "",
    status: "completed",
    category: "components",
    type: "library",
    isAI: false,
    featured: false,
  },
  {
    id: "ai-writer",
    name: "AI Writer",
    description:
      "Asistente de escritura con IA generativa que ayuda a crear contenido, corregir textos y sugerir mejoras.",
    description_en:
      "AI writing assistant that helps create content, correct texts and suggest improvements using generative AI.",
    stack: ["React", "OpenAI", "Node.js", "MongoDB"],
    image: "https://placehold.co/600x400?text=AI+Writer",
    link: "",
    github: "",
    status: "planned",
    category: "ai",
    type: "app",
    isAI: true,
    featured: false,
  },
  {
    id: "fit-track",
    name: "FitTrack",
    description:
      "App móvil para seguimiento de entrenamientos, dieta y progreso físico con gráficos y planes personalizados.",
    description_en:
      "Mobile app for tracking workouts, diet and physical progress with charts and personalized plans.",
    stack: ["React Native", "Node.js", "PostgreSQL", "Redis"],
    image: "https://placehold.co/600x400?text=FitTrack",
    link: "",
    github: "",
    status: "inDevelopment",
    category: "mobile",
    type: "app",
    isAI: false,
    featured: false,
  },
  {
    id: "code-pilot",
    name: "CodePilot",
    description:
      "Extensión de VS Code con IA que sugiere código, refactoriza y encuentra bugs en tiempo real.",
    description_en:
      "VS Code extension with AI that suggests code, refactors and finds bugs in real time.",
    stack: ["TypeScript", "OpenAI", "VS Code API", "Node.js"],
    image: "https://placehold.co/600x400?text=CodePilot",
    link: "",
    github: "",
    status: "planned",
    category: "desktop",
    type: "tool",
    isAI: true,
    featured: false,
  },
  {
    id: "job-finder",
    name: "Sistema Web de Búsqueda de Empleo",
    description:
      "Plataforma web diseñada para conectar empresas y candidatos mediante un sistema de publicación de vacantes, postulaciones, filtros inteligentes, perfiles profesionales y administración de usuarios con diferentes niveles de acceso.",
    description_en:
      "Web platform connecting companies and job seekers through job postings, applications, advanced filters, professional profiles, and role-based administration.",
    stack: [
      "React",
      "Node.js",
      "Express",
      "PostgreSQL",
      "JWT",
    ],
    image: "https://placehold.co/600x400?text=Job+Platform",
    link: "https://job-platform-demo.vercel.app",
    github: "",
    status: "planning",
    category: "web",
    type: "fullstack",
    isAI: false,
    featured: false,
  },

  {
    id: "audit-system",
    name: "Sistema de Auditoría Contable",
    description:
      "Sistema web orientado a la gestión de auditorías contables, control documental, seguimiento de hallazgos, generación de informes y administración de usuarios mediante una arquitectura escalable y segura.",
    description_en:
      "Accounting audit management platform featuring document control, findings tracking, report generation, and secure role-based user management.",
    stack: [
      "React",
      "Node.js",
      "Express",
      "PostgreSQL",
    ],
    image: "https://placehold.co/600x400?text=Audit+System",
    link: "https://audit-demo.vercel.app",
    github: "",
    status: "planning",
    category: "web",
    type: "fullstack",
    isAI: false,
    featured: false,
  },
  {
  id: "mi-iasd-app",
  name: "mi-IASD-app",
  description:
    "Plataforma integral para la gestión de información de la Iglesia Adventista del Séptimo Día. Centraliza la administración de miembros, departamentos, ministerios, asistencia, eventos, tesorería, inventario, comunicaciones y reportes, facilitando la organización y el seguimiento de las actividades de la iglesia.",
  description_en:
    "Comprehensive information management platform for the Seventh-day Adventist Church. It centralizes member management, departments, ministries, attendance, events, treasury, inventory, communications, and reporting to streamline church administration.",
  stack: [
    "React",
    "Tailwind CSS",
    "Node.js",
    "Express",
    "PostgreSQL",
    "JWT",
  ],
  image: "https://placehold.co/600x400?text=mi-IASD-app",
  link: "https://mi-iasd-app-demo.vercel.app",
  github: "",
  status: "planning",
  category: "web",
  type: "fullstack",
  isAI: false,
  featured: true,
},
];

/* ---- Función helper para obtener lenguajes únicos de todos los proyectos ---- */
function getUniqueLanguages() {
  const langSet = new Set();
  allProjects.forEach((p) => p.stack.forEach((tech) => langSet.add(tech)));
  return Array.from(langSet).sort();
}

export { myInfo, myProjects, allProjects, getUniqueLanguages };
