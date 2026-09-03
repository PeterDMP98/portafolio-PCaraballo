/* ============================================
   SISTEMA DE TRADUCCIÓN (ES / EN)
   ============================================
   - translations[idioma][clave] = texto
   - Soporta plurales simples con {count}
*/

const translations = {
  es: {
    /* ---- NAVEGACIÓN ---- */
    "nav.home": "Inicio",
    "nav.about": "Sobre Mí",
    "nav.skills": "Habilidades",
    "nav.projects": "Proyectos",
    "nav.contact": "Contacto",
    "nav.chat": "Chat",
    "nav.theme": "Tema",
    "nav.language": "Idioma",
    "nav.font": "Tipografía",
    "nav.cv": "CV",
    "nav.menu": "Menú",

    /* ---- HERO ---- */
    "hero.greeting": "Hola, soy",
    "hero.role": "Desarrollador Full Stack",
    "hero.description": "Construyo aplicaciones web modernas, escalables y con experiencia de usuario excepcional.",
    "hero.cta.projects": "Ver Proyectos",
    "hero.cta.contact": "Contactarme",

    /* ---- ABOUT ---- */
    "about.title": "Sobre Mí",
    "about.description": "Soy un desarrollador web apasionado por la tecnología y la programación. Me encanta aprender nuevas tecnologías y mejorar mis habilidades constantemente. Disfruto trabajar en proyectos desafiantes y colaborar con otros desarrolladores para crear soluciones innovadoras.",
    "about.study": "Formación",
    "about.experience": "Experiencia",

    /* ---- SKILLS ---- */
    "skills.title": "Mis Habilidades",
    "skills.subtitle": "Tecnologías y herramientas con las que trabajo",

    /* ---- PROJECTS ---- */
    "projects.title": "Proyectos",
    "projects.subtitle": "Algunos de mis trabajos recientes",
    "projects.viewAll": "Ver Todos",
    "projects.viewMore": "Ver Más",
    "projects.viewLess": "Ver Menos",
    "projects.showMore": "Mostrar todos los proyectos",
    "projects.showLess": "Mostrar menos",
    "projects.filter.all": "Todos",
    "projects.filter.completed": "Completados",
    "projects.filter.inDevelopment": "En Desarrollo",
    "projects.filter.planned": "Planificados",
    "projects.filter.web": "Web",
    "projects.filter.mobile": "Móvil",
    "projects.filter.desktop": "Escritorio",
    "projects.filter.game": "Juegos",
    "projects.filter.ai": "IA",
    "projects.filter.components": "Componentes",
    "projects.filter.madeWithAI": "Hechos con IA",
    "projects.filter.language": "Por Lenguaje",
    "projects.filter.category": "Por Categoría",
    "projects.filter.status": "Por Estado",
    "projects.empty": "No se encontraron proyectos con esos filtros.",
    "projects.demo": "Demo",
    "projects.code": "Código",
    "projects.download": "Descargar",
    "projects.features": "Funciones",
    "projects.updates": "Actualizaciones",
    "projects.viewDetails": "Ver más",
    "projects.prevImage": "Imagen anterior",
    "projects.nextImage": "Imagen siguiente",
    "projects.expandImage": "Ampliar imagen",
    "projects.addLinks": "Agregar enlaces próximamente",

    /* ---- CONTACT ---- */
    "contact.title": "Contacto",
    "contact.subtitle": "¿Tienes un proyecto en mente? Hablemos.",
    "contact.name": "Nombre",
    "contact.email": "Email",
    "contact.subject": "Asunto",
    "contact.message": "Mensaje",
    "contact.send": "Enviar Mensaje",
    "contact.sending": "Enviando...",
    "contact.success": "¡Mensaje enviado con éxito!",
    "contact.error": "Error al enviar el mensaje. Intenta de nuevo.",
    "contact.findMe": "Encuéntrame en",

    /* ---- CHAT ---- */
    "chat.title": "Chat Asistente",
    "chat.subtitle": "Pregúntame lo que quieras",
    "chat.placeholder": "Escribe tu mensaje...",
    "chat.send": "Enviar",
    "chat.speakingWith": "Hablando con",
    "chat.ai": "Asistente IA",
    "chat.direct": "WhatsApp",
    "chat.connectDirect": "Hablar con Pedro por WhatsApp",
    "chat.connectMessage": "¿Quieres hablar directamente con Pedro? Presiona el botón para contactarlo por WhatsApp.",
    "chat.connectRequested": "¡Gracias! Te redirigiré a WhatsApp con un resumen de la conversación.",
    "chat.requestSent": "Gracias. Te redirigiré a WhatsApp con un resumen de la conversación.",
    "chat.whatsappNamePlaceholder": "Tu nombre (opcional)",
    "chat.whatsappSend": "Abrir WhatsApp",
    "chat.aiThinking": "El asistente está escribiendo...",
    "chat.pedroThinking": "Pedro está escribiendo...",
    "chat.error": "Error al conectar con el asistente. Intenta de nuevo.",

    /* ---- THEME GENERATOR ---- */
    "themeGen.title": "Generador de Temas",
    "themeGen.apply": "Aplicar Tema",
    "themeGen.error": "Error al generar el tema",
    "themeGen.suggestions": "Elige un estilo",
    "themeGen.shuffle": "Aleatorizar",

    /* ---- COMMON ---- */
    "common.loading": "Cargando...",
    "common.error": "Error",
    "common.close": "Cerrar",
    "common.copy": "Copiar",
    "common.copied": "¡Copiado!",
    "common.theme": "Tema",
    "common.fonts": "Tipografía",
    "common.language": "Idioma",

    /* ---- FOOTER ---- */
    "footer.rights": "Todos los derechos reservados",
    "footer.madeWith": "Hecho con",
    "footer.by": "por",
  },

  en: {
    /* ---- NAVIGATION ---- */
    "nav.home": "Home",
    "nav.about": "About",
    "nav.skills": "Skills",
    "nav.projects": "Projects",
    "nav.contact": "Contact",
    "nav.chat": "Chat",
    "nav.theme": "Theme",
    "nav.language": "Language",
    "nav.font": "Font",
    "nav.cv": "CV",
    "nav.menu": "Menu",

    /* ---- HERO ---- */
    "hero.greeting": "Hi, I'm",
    "hero.role": "Full Stack Developer",
    "hero.description": "I build modern, scalable web applications with exceptional user experience.",
    "hero.cta.projects": "View Projects",
    "hero.cta.contact": "Contact Me",

    /* ---- ABOUT ---- */
    "about.title": "About Me",
    "about.description": "I'm a web developer passionate about technology and programming. I love learning new technologies and constantly improving my skills. I enjoy working on challenging projects and collaborating with other developers to create innovative solutions.",
    "about.study": "Education",
    "about.experience": "Experience",

    /* ---- SKILLS ---- */
    "skills.title": "My Skills",
    "skills.subtitle": "Technologies and tools I work with",

    /* ---- PROJECTS ---- */
    "projects.title": "Projects",
    "projects.subtitle": "Some of my recent work",
    "projects.viewAll": "View All",
    "projects.viewMore": "View More",
    "projects.viewLess": "View Less",
    "projects.showMore": "Show all projects",
    "projects.showLess": "Show less",
    "projects.filter.all": "All",
    "projects.filter.completed": "Completed",
    "projects.filter.inDevelopment": "In Development",
    "projects.filter.planned": "Planned",
    "projects.filter.web": "Web",
    "projects.filter.mobile": "Mobile",
    "projects.filter.desktop": "Desktop",
    "projects.filter.game": "Games",
    "projects.filter.ai": "AI",
    "projects.filter.components": "Components",
    "projects.filter.madeWithAI": "Made with AI",
    "projects.filter.language": "By Language",
    "projects.filter.category": "By Category",
    "projects.filter.status": "By Status",
    "projects.empty": "No projects found with those filters.",
    "projects.demo": "Demo",
    "projects.code": "Code",
    "projects.download": "Download",
    "projects.features": "Features",
    "projects.updates": "Updates",
    "projects.viewDetails": "View more",
    "projects.prevImage": "Previous image",
    "projects.nextImage": "Next image",
    "projects.expandImage": "Expand image",
    "projects.addLinks": "Links coming soon",

    /* ---- CONTACT ---- */
    "contact.title": "Contact",
    "contact.subtitle": "Have a project in mind? Let's talk.",
    "contact.name": "Name",
    "contact.email": "Email",
    "contact.subject": "Subject",
    "contact.message": "Message",
    "contact.send": "Send Message",
    "contact.sending": "Sending...",
    "contact.success": "Message sent successfully!",
    "contact.error": "Error sending message. Try again.",
    "contact.findMe": "Find me on",

    /* ---- CHAT ---- */
    "chat.title": "Chat Assistant",
    "chat.subtitle": "Ask me anything",
    "chat.placeholder": "Type your message...",
    "chat.send": "Send",
    "chat.speakingWith": "Speaking with",
    "chat.ai": "AI Assistant",
    "chat.direct": "WhatsApp",
    "chat.connectDirect": "Talk to Pedro on WhatsApp",
    "chat.connectMessage": "Do you want to talk directly with Pedro? Press the button to contact him on WhatsApp.",
    "chat.connectRequested": "Thank you! I'll redirect you to WhatsApp with a summary of the conversation.",
    "chat.requestSent": "Thank you. I'll redirect you to WhatsApp with a summary of the conversation.",
    "chat.whatsappNamePlaceholder": "Your name (optional)",
    "chat.whatsappSend": "Open WhatsApp",
    "chat.aiThinking": "Assistant is typing...",
    "chat.pedroThinking": "Pedro is typing...",
    "chat.error": "Error connecting to the assistant. Try again.",

    /* ---- THEME GENERATOR ---- */
    "themeGen.title": "Theme Generator",
    "themeGen.apply": "Apply Theme",
    "themeGen.error": "Error generating theme",
    "themeGen.suggestions": "Pick a style",
    "themeGen.shuffle": "Shuffle",

    /* ---- COMMON ---- */
    "common.loading": "Loading...",
    "common.error": "Error",
    "common.close": "Close",
    "common.copy": "Copy",
    "common.copied": "Copied!",
    "common.theme": "Theme",
    "common.fonts": "Font",
    "common.language": "Language",

    /* ---- FOOTER ---- */
    "footer.rights": "All rights reserved",
    "footer.madeWith": "Made with",
    "footer.by": "by",
  },
};

export default translations;
