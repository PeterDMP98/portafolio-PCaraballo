/* ============================================
   CHAT / ASISTENTE VIRTUAL
   ============================================
   - Modo IA: responde preguntas sobre el portafolio
   - Modo Directo: envía mensaje a Pedro (notificación)
   - Alterna entre modos según solicitud del usuario
*/

import { useState, useRef, useEffect } from "react";
import { useLanguage } from "../hooks/useLanguage";
import { chatWithAI, generateConversationSummary } from "../config/chat";
import { myInfo } from "../config/data";
import "../styles/chat.css";

// Mensaje inicial del asistente
function getInitialMessage(lang) {
  return lang === "es"
    ? {
        role: "assistant",
        content:
          "¡Hola! Soy el asistente virtual de Pedro. Puedo contarte sobre sus proyectos, habilidades y experiencia. ¿En qué puedo ayudarte? Si prefieres hablar directamente con él, solo pídemelo.",
      }
    : {
        role: "assistant",
        content:
          "Hi! I'm Pedro's virtual assistant. I can tell you about his projects, skills, and experience. How can I help you? If you prefer to talk directly with him, just ask.",
      };
}

const WHATSAPP_NUMBER = myInfo[0]?.whatsapp?.replace("https://wa.me/", "") || "573043583617";

function Chat() {
  const { t, lang } = useLanguage();

  // ---- Estados ----
  const [isOpen, setIsOpen] = useState(false);
  const [mode, setMode] = useState("ai"); // "ai" | "direct" | "requested"
  const [messages, setMessages] = useState([getInitialMessage(lang)]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [directForm, setDirectForm] = useState({
    name: "",
    email: "",
    message: "",
  });

  const messagesEndRef = useRef(null);

  // Scroll automático al último mensaje
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Reinicia mensajes al cambiar idioma
  const prevLang = useRef(lang);
  useEffect(() => {
    if (prevLang.current !== lang && messages.length === 1 && messages[0].role === "assistant") {
      prevLang.current = lang;
      // Actualiza mensaje inicial con nuevo idioma
      const timer = setTimeout(() => {
        setMessages([getInitialMessage(lang)]);
      }, 0);
      return () => clearTimeout(timer);
    }
    prevLang.current = lang;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lang]);

  // Restaurar historial desde localStorage (máximo 1 hora)
  useEffect(() => {
    try {
      const saved = localStorage.getItem("chat_state");
      if (saved) {
        const { messages: savedMessages, timestamp } = JSON.parse(saved);
        if (Date.now() - timestamp < 3600000 && savedMessages.some(m => m.role === "user")) {
          setMessages(savedMessages);
        } else {
          localStorage.removeItem("chat_state");
        }
      }
    } catch {}
  }, []);

  // Guardar historial en localStorage cuando cambien los mensajes
  useEffect(() => {
    if (messages.some(m => m.role === "user")) {
      localStorage.setItem(
        "chat_state",
        JSON.stringify({ messages, timestamp: Date.now() })
      );
    }
  }, [messages]);

  // ---- Enviar mensaje en modo IA ----
  const handleSendAI = async () => {
    const text = input.trim();
    if (!text || isLoading) return;

    const userMessage = { role: "user", content: text };
    const updatedMessages = [...messages, userMessage];
    setMessages(updatedMessages);
    setInput("");
    setIsLoading(true);

    try {
      const response = await chatWithAI(text, updatedMessages, lang);

      // Detecta si el usuario pide hablar directamente
      const lower = text.toLowerCase();
      const wantsDirect =
        lower.includes("hablar con pedro") ||
        lower.includes("talk to pedro") ||
        lower.includes("directamente") ||
        lower.includes("directly") ||
        lower.includes("contactar con pedro") ||
        lower.includes("contact pedro");

      if (wantsDirect) {
        setMode("direct");
        setMessages([
          ...updatedMessages,
          {
            role: "assistant",
            content:
              lang === "es"
                ? "¡Claro! ¿Cuál es tu nombre para que Pedro sepa quién eres?"
                : "Sure! What's your name so Pedro knows who you are?",
          },
        ]);
      } else {
        setMessages([
          ...updatedMessages,
          { role: "assistant", content: response },
        ]);
      }
    } catch {
      setMessages([
        ...updatedMessages,
        {
          role: "assistant",
          content: t("chat.error"),
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  // ---- Solicitar hablar por WhatsApp ----
  const handleRequestDirect = () => {
    setMode("direct");
    setMessages((prev) => [
      ...prev,
      {
        role: "assistant",
        content:
          lang === "es"
            ? "Has solicitado hablar con Pedro. ¿Cuál es tu nombre para que sepa quién eres?"
            : "You've requested to talk with Pedro. What's your name so he knows who you are?",
      },
    ]);
  };

  // ---- Enviar a WhatsApp con resumen ----
  const handleSendWhatsApp = () => {
    const name = directForm.name.trim();
    const summary = generateConversationSummary(messages, lang);

    const greeting = lang === "es"
      ? "Hola Pedro! 👋 Vengo de tu portafolio."
      : "Hi Pedro! 👋 I'm visiting from your portfolio.";

    const summaryLabel = lang === "es"
      ? "📝 Resumen de lo que hablamos:"
      : "📝 Summary of our conversation:";

    const fromLabel = lang === "es" ? "De:" : "From:";
    const nameText = name || (lang === "es" ? "No especificado" : "Not specified");

    const fullMessage = `${greeting}\n\n${summaryLabel}\n${summary}\n\n${fromLabel} ${nameText}`;
    const encoded = encodeURIComponent(fullMessage);

    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encoded}`, "_blank");

    setMode("requested");
    setMessages((prev) => [
      ...prev,
      {
        role: "assistant",
        content: t("chat.requestSent"),
      },
    ]);
    setDirectForm({ name: "", email: "", message: "" });
  };

  // ---- Alternar visibilidad del chat ----
  const toggleChat = () => {
    setIsOpen((prev) => !prev);
  };

  // ---- Volver al modo IA ----
  const backToAI = () => {
    setMode("ai");
    setMessages([getInitialMessage(lang)]);
  };

  // ---- Manejar tecla Enter ----
  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      if (mode === "ai") handleSendAI();
    }
  };

  return (
    <>
      {/* Botón flotante del chat */}
      <button
        className={`chat-fab ${isOpen ? "chat-fab-open" : ""}`}
        onClick={toggleChat}
        aria-label={t("chat.title")}
      >
        {isOpen ? (
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        ) : (
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z" />
          </svg>
        )}
      </button>

      {/* Panel del chat */}
      <div className={`chat-panel ${isOpen ? "chat-panel-open" : ""}`}>
        {/* Header */}
        <div className="chat-header">
          <div className="chat-header-info">
            <div className="chat-header-avatar">
              {mode === "ai" ? (
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M12 2a4 4 0 014 4c0 2-2 4-4 4s-4-2-4-4a4 4 0 014-4z" />
                  <path d="M16 16c2 0 4-2 4-4M8 16c-2 0-4-2-4-4" />
                  <path d="M12 22c-4 0-8-2-8-6v-2h16v2c0 4-4 6-8 6z" />
                </svg>
              ) : (
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2" />
                  <circle cx="12" cy="7" r="4" />
                </svg>
              )}
            </div>
            <div>
              <span className="chat-header-title">
                {mode === "ai" ? t("chat.ai") : t("chat.direct")}
              </span>
              <span className="chat-header-status">
                {mode === "requested"
                  ? lang === "es"
                    ? "Solicitud enviada"
                    : "Request sent"
                  : lang === "es"
                  ? "En línea"
                  : "Online"}
              </span>
            </div>
          </div>
          <div className="chat-header-actions">
            {mode !== "ai" && (
              <button className="chat-btn-icon" onClick={backToAI} title={lang === "es" ? "Volver al asistente" : "Back to assistant"}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M21 12H3M12 3l-9 9 9 9" />
                </svg>
              </button>
            )}
            <button className="chat-btn-icon" onClick={toggleChat}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>
          </div>
        </div>

        {/* Mensajes */}
        <div className="chat-messages">
          {messages.map((msg, idx) => (
            <div
              key={idx}
              className={`chat-message ${
                msg.role === "user" ? "chat-message-user" : "chat-message-ai"
              }`}
            >
              <div className="chat-message-content">
                <p>{msg.content}</p>
              </div>
            </div>
          ))}

          {isLoading && (
            <div className="chat-message chat-message-ai">
              <div className="chat-message-content">
                <div className="chat-typing">
                  <span />
                  <span />
                  <span />
                </div>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Footer / Input */}
        <div className="chat-footer">
          {mode === "ai" && !isLoading && (
            <div className="chat-input-area">
              <input
                type="text"
                className="chat-input"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder={t("chat.placeholder")}
                disabled={isLoading}
              />
              <button
                className="chat-send-btn"
                onClick={handleSendAI}
                disabled={!input.trim() || isLoading}
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <line x1="22" y1="2" x2="11" y2="13" />
                  <polygon points="22 2 15 22 11 13 2 9 22 2" />
                </svg>
              </button>
            </div>
          )}

          {mode === "ai" && !isLoading && (
            <div className="chat-direct-request">
              <button className="chat-direct-btn" onClick={handleRequestDirect}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2" />
                  <circle cx="12" cy="7" r="4" />
                </svg>
                {t("chat.connectDirect")}
              </button>
            </div>
          )}

          {mode === "direct" && (
            <div className="chat-whatsapp-form">
              <input
                type="text"
                className="chat-whatsapp-input"
                placeholder={t("chat.whatsappNamePlaceholder")}
                value={directForm.name}
                onChange={(e) =>
                  setDirectForm((p) => ({ ...p, name: e.target.value }))
                }
              />
              <button
                className="chat-whatsapp-btn"
                onClick={handleSendWhatsApp}
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                </svg>
                {t("chat.whatsappSend")}
              </button>
            </div>
          )}

          {mode === "requested" && (
            <div className="chat-requested-msg">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#25D366" strokeWidth="2">
                <path d="M22 11.08V12a10 10 0 11-5.93-9.14" />
                <polyline points="22 4 12 14.01 9 11.01" />
              </svg>
              <span>{t("chat.requestSent")}</span>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default Chat;
