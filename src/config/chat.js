/* ============================================
  SISTEMA DE CHAT
  ============================================
  - chatWithAI(mensaje, historial): Envía mensaje a OpenAI
  - generateFallbackResponse(mensaje): Respuesta local simulada
  - newMessageNotification(datos): Notifica nuevo mensaje directo
*/

import { myInfo, allProjects } from "./data.js";

const OPENAI_KEY = import.meta.env.VITE_OPENAI_API_KEY || "";
const GROQ_KEY = import.meta.env.VITE_GROQ_API_KEY || "";

/* ---- Construir contexto dinámico desde los datos ---- */
function buildSystemPrompt(lang) {
  const info = myInfo[0];
  const projects = allProjects;
  const featured = projects.filter((p) => p.featured);
  const others = projects.filter((p) => !p.featured);

  const statusMap = {
    es: { completed: "Completado", inDevelopment: "En Desarrollo", planned: "Planificado" },
    en: { completed: "Completed", inDevelopment: "In Development", planned: "Planned" },
  };

  const catMap = {
    es: { web: "Web", mobile: "Móvil", desktop: "Escritorio", game: "Juego", ai: "IA", components: "Componentes" },
    en: { web: "Web", mobile: "Mobile", desktop: "Desktop", game: "Game", ai: "AI", components: "Components" },
  };

  const s = statusMap[lang] || statusMap.en;
  const c = catMap[lang] || catMap.en;

  if (lang === "es") {
    return `Eres un asistente virtual del portafolio de ${info.name}.

## Información Personal
- Nombre: ${info.name}
- Título: ${info.title}
- Email: ${info.email}
- Teléfono: +57 ${info.phone}
- WhatsApp: https://wa.me/${info.phone}
- LinkedIn: ${info.linkedin}
- GitHub: ${info.github}

## Sobre Pedro
${info.about}

## Educación
${info.study.map((e) => `- ${e.institution}: ${e.degree}`).join("\n")}

## Tecnologías
${info.stack.join(", ")}

## Proyectos Destacados (${featured.length})
${featured
  .map(
    (p) =>
      `- ${p.name}: ${(lang === "es" ? p.description : p.description_en).split(".")[0]}. Stack: ${p.stack.join(", ")}. Estado: ${s[p.status]}.`
  )
  .join("\n")}

## Todos los Proyectos (${projects.length} en total)
${projects
  .map((p) => `- ${p.name} (${c[p.category]}) - ${s[p.status]}${p.isAI ? " - IA" : ""}`)
  .join("\n")}

## Contacto
- Si alguien quiere contactar a Pedro, guíalo al botón "Hablar con Pedro por WhatsApp".
- Si preguntan por email o redes sociales, proporciona los datos de arriba.

## Reglas
- Preséntate siempre como el asistente virtual de Pedro, NO te hagas pasar por él.
- Responde con precisión usando los datos proporcionados arriba.
- Si preguntan cuántos proyectos tiene, responde con el número exacto y menciónalos.
- Si preguntan sobre un proyecto específico, describe lo que sepas de él.
- Si no sabes algo, sé honesto y sugiere contactar a Pedro por WhatsApp.
- Responde en español.`;
  }

  return `You are a virtual assistant for the portfolio of ${info.name}.

## Personal Information
- Name: ${info.name}
- Title: ${info.title_en}
- Email: ${info.email}
- Phone: +57 ${info.phone}
- WhatsApp: https://wa.me/${info.phone}
- LinkedIn: ${info.linkedin}
- GitHub: ${info.github}

## About Pedro
${info.about_en}

## Education
${info.study.map((e) => `- ${e.institution}: ${e.degree_en}`).join("\n")}

## Technologies
${info.stack.join(", ")}

## Featured Projects (${featured.length})
${featured
  .map(
    (p) =>
      `- ${p.name}: ${(lang === "es" ? p.description : p.description_en).split(".")[0]}. Stack: ${p.stack.join(", ")}. Status: ${s[p.status]}.`
  )
  .join("\n")}

## All Projects (${projects.length} total)
${projects
  .map((p) => `- ${p.name} (${c[p.category]}) - ${s[p.status]}${p.isAI ? " - AI" : ""}`)
  .join("\n")}

## Contact
- If someone wants to contact Pedro, guide them to the "Talk to Pedro on WhatsApp" button.
- If asked about email or social media, provide the information above.

## Rules
- Always introduce yourself as Pedro's virtual assistant, do NOT pretend to be him.
- Answer accurately using the data provided above.
- If asked how many projects he has, answer with the exact number and mention them.
- If asked about a specific project, describe what you know about it.
- If you don't know something, be honest and suggest contacting Pedro via WhatsApp.
- Respond in English.`;
}

/* ---- Sistema de respuestas locales (fallback) ---- */
const FALLBACK_RESPONSES_ES = [
  {
    keywords: ["hola", "buenas", "hey", "saludos"],
    response:
      "¡Hola! ¿En qué puedo ayudarte? Puedes preguntarme sobre mis proyectos, habilidades, o si quieres contactar directamente con Pedro.",
  },
  {
    keywords: ["proyecto", "trabajo", "portfolio"],
    response:
      "Tengo varios proyectos interesantes. Puedes verlos en la sección de Proyectos más abajo. ¿Hay algún tipo de proyecto en particular que te interese?",
  },
  {
    keywords: ["skill", "habilidad", "tecnología", "lenguaje", "stack"],
    response:
      "Pedro trabaja con tecnologías como React, Node.js, Python, y bases de datos SQL y NoSQL. ¿Quieres saber más sobre alguna tecnología en específico?",
  },
  {
    keywords: ["contacto", "contactar", "hablar", "directo", "pedro"],
    response:
      "Puedes contactar a Pedro directamente presionando el botón 'Hablar con Pedro' que está arriba. Él recibirá una notificación y te responderá lo antes posible.",
  },
  {
    keywords: ["experiencia", "trayectoria", "años"],
    response:
      "Pedro tiene experiencia como desarrollador Full Stack. Ha trabajado en proyectos web, móviles y de escritorio. ¿Quieres conocer más detalles?",
  },
  {
    keywords: ["gracias", "thanks", "thank"],
    response: "¡De nada! Si tienes más preguntas, aquí estoy. No olvides ver los proyectos en la sección de abajo.",
  },
];

const FALLBACK_RESPONSES_EN = [
  {
    keywords: ["hello", "hi", "hey", "greetings"],
    response:
      "Hi! How can I help you? You can ask me about projects, skills, or if you want to contact Pedro directly.",
  },
  {
    keywords: ["project", "work", "portfolio"],
    response:
      "I have several interesting projects. You can check them in the Projects section below. Is there any particular type of project you're interested in?",
  },
  {
    keywords: ["skill", "technology", "language", "stack"],
    response:
      "Pedro works with technologies like React, Node.js, Python, and SQL/NoSQL databases. Would you like to know more about any specific technology?",
  },
  {
    keywords: ["contact", "talk", "direct", "pedro"],
    response:
      "You can contact Pedro directly by pressing the 'Talk to Pedro' button above. He'll receive a notification and will reply as soon as possible.",
  },
  {
    keywords: ["experience", "background", "years"],
    response:
      "Pedro has experience as a Full Stack developer. He has worked on web, mobile and desktop projects. Would you like to know more details?",
  },
  {
    keywords: ["thanks", "thank"],
    response: "You're welcome! If you have more questions, I'm here. Don't forget to check out the projects below.",
  },
];

/* ---- Función: respuesta local simulada ---- */
function generateFallbackResponse(message, lang) {
  const lower = message.toLowerCase();
  const responses = lang === "es" ? FALLBACK_RESPONSES_ES : FALLBACK_RESPONSES_EN;

  // Busca la respuesta que más keywords coincida
  let bestMatch = null;
  let maxScore = 0;

  for (const entry of responses) {
    let score = 0;
    for (const kw of entry.keywords) {
      if (lower.includes(kw)) score++;
    }
    if (score > maxScore) {
      maxScore = score;
      bestMatch = entry.response;
    }
  }

  // Si no hay match significativo, da respuesta genérica pero variada
  if (!bestMatch || maxScore === 0) {
    const genericResponses =
      lang === "es"
        ? [
            "No estoy seguro de entender tu pregunta. ¿Podrías ser más específico? Puedo hablar sobre proyectos, habilidades, o conectar con Pedro.",
            "¡Buena pregunta! Aunque no tengo una respuesta exacta, puedo ayudarte a explorar el portafolio o contactar a Pedro.",
            "Hmm, no tengo información sobre eso. ¿Quieres preguntar algo sobre los proyectos o habilidades de Pedro?",
          ]
        : [
            "I'm not sure I understand your question. Could you be more specific? I can talk about projects, skills, or connect with Pedro.",
            "Good question! Although I don't have an exact answer, I can help you explore the portfolio or contact Pedro.",
            "Hmm, I don't have information about that. Would you like to ask about Pedro's projects or skills?",
          ];
    bestMatch = genericResponses[Math.floor(Math.random() * genericResponses.length)];
  }

  return bestMatch;
}

/* ---- Función: enviar mensaje a OpenAI ---- */
async function callOpenAI(messages, lang) {
  const systemPrompt = buildSystemPrompt(lang);

  try {
    const response = await fetch(
      "https://api.openai.com/v1/chat/completions",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${OPENAI_KEY}`,
        },
        body: JSON.stringify({
          model: "gpt-4o-mini",
          messages: [
            { role: "system", content: systemPrompt },
            ...messages.slice(-10), // Últimos 10 mensajes de contexto
          ],
          temperature: 0.7,
          max_tokens: 300,
        }),
      }
    );

    if (!response.ok) throw new Error("API request failed");

    const data = await response.json();
    return data.choices?.[0]?.message?.content || null;
  } catch (error) {
    console.warn("OpenAI chat failed, using fallback:", error);
    return null;
  }
}

/* ---- Función: enviar mensaje a Groq (gratuito, rápido) ---- */
async function callGroq(messages, lang) {
  if (!GROQ_KEY) return null;

  const systemPrompt = buildSystemPrompt(lang);

  try {
    const response = await fetch(
      "https://api.groq.com/openai/v1/chat/completions",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${GROQ_KEY}`,
        },
        body: JSON.stringify({
          model: "llama-3.3-70b-versatile",
          messages: [
            { role: "system", content: systemPrompt },
            ...messages.slice(-10),
          ],
          temperature: 0.7,
          max_tokens: 300,
        }),
      }
    );

    if (!response.ok) throw new Error("Groq API request failed");

    const data = await response.json();
    return data.choices?.[0]?.message?.content || null;
  } catch (error) {
    console.warn("Groq chat failed, using fallback:", error);
    return null;
  }
}

/* ---- Función principal: chatear con IA ---- */
async function chatWithAI(message, history = [], lang = "es") {
  const allMessages = [...history, { role: "user", content: message }];

  // 1. Intentar Groq (gratuito, rápido)
  if (GROQ_KEY) {
    const groqResponse = await callGroq(allMessages, lang);
    if (groqResponse) return groqResponse;
  }

  // 2. Intentar OpenAI (si hay key configurada)
  if (OPENAI_KEY) {
    const openaiResponse = await callOpenAI(allMessages, lang);
    if (openaiResponse) return openaiResponse;
  }

  // 3. Fallback: respuesta local
  return generateFallbackResponse(message, lang);
}

/* ---- Notificación de nuevo mensaje para Pedro ---- */
function newMessageNotification(data) {
  // En un entorno real, esto enviaría un email, WebSocket, etc.
  console.log("=== NUEVO MENSAJE DIRECTO PARA PEDRO ===");
  console.log("De:", data.name);
  console.log("Email:", data.email);
  console.log("Mensaje:", data.message);
  console.log("Fecha:", new Date().toISOString());
  console.log("==========================================");

  // Simula guardar en localStorage
  const pendingMessages = JSON.parse(
    localStorage.getItem("pendingMessages") || "[]"
  );
  pendingMessages.push({
    ...data,
    timestamp: new Date().toISOString(),
    read: false,
  });
  localStorage.setItem("pendingMessages", JSON.stringify(pendingMessages));
}

/* ---- Generar resumen de la conversación para WhatsApp ---- */
function generateConversationSummary(messages, lang) {
  const userMessages = messages
    .filter((m) => m.role === "user")
    .filter((m) => m.content.length > 10);

  if (userMessages.length === 0) {
    return lang === "es"
      ? "Aún no habíamos conversado."
      : "We hadn't talked yet.";
  }

  const lines = userMessages.map((m, i) => {
    const text = m.content.length > 80 ? m.content.slice(0, 80) + "..." : m.content;
    return `• ${text}`;
  });

  return lines.join("\n");
}

export { chatWithAI, newMessageNotification, generateConversationSummary };
