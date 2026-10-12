import { useState, useRef, useEffect, useCallback } from "react";
import { X, Send, User, MessageCircle, RotateCcw, CalendarDays, Phone, Mail, Bot } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { supabase } from "@/integrations/supabase/client";
import { Link, useLocation } from "react-router-dom";
import { getMember, telHref } from "@/data/team";
import { lireStockage, ecrireStockage, urlSure } from "@/lib/safe";
interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
}

interface StoredMessage {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: string;
}

const CHAT_HISTORY_KEY = "brandy_chat_history";
const CHAT_SESSION_KEY = "brandy_session_id";

// Composant pour l'indicateur de frappe avec points animés
const TypingIndicator = () => (
  <div className="flex items-center gap-1 px-2">
    <span className="w-2 h-2 bg-primary/60 rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
    <span className="w-2 h-2 bg-primary/60 rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
    <span className="w-2 h-2 bg-primary/60 rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
  </div>
);

const welcomeMessage: Message = {
  id: "welcome",
  role: "assistant",
  content: "Bonjour, je suis Inès, votre assistante. Je suis là pour répondre à vos questions sur l'entrepreneuriat, les programmes éducatifs et l'accompagnement. Comment puis-je vous aider ?",
  timestamp: new Date(),
};

const ChatBot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [showNotification, setShowNotification] = useState(false);
  const [hasUsedChat, setHasUsedChat] = useState(false);
  const [messages, setMessages] = useState<Message[]>([welcomeMessage]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [notificationCount, setNotificationCount] = useState(0);
  const [sessionId, setSessionId] = useState<string>("");
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLButtonElement>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Charger l'historique depuis localStorage au démarrage
  useEffect(() => {
    try {
      // Charger ou créer le session ID
      let storedSessionId = lireStockage(CHAT_SESSION_KEY);
      if (!storedSessionId) {
        storedSessionId = `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
        ecrireStockage(CHAT_SESSION_KEY, storedSessionId);
      }
      setSessionId(storedSessionId);

      // Charger l'historique des messages
      const storedHistory = lireStockage(CHAT_HISTORY_KEY);
      if (storedHistory) {
        const parsedHistory: StoredMessage[] = JSON.parse(storedHistory);
        // Convertir les timestamps string en Date
        const restoredMessages = parsedHistory.map(msg => ({
          ...msg,
          timestamp: new Date(msg.timestamp),
        }));
        // S'assurer que le message de bienvenue est présent
        if (restoredMessages.length > 0 && restoredMessages[0].id !== "welcome") {
          setMessages([welcomeMessage, ...restoredMessages]);
        } else if (restoredMessages.length > 0) {
          setMessages(restoredMessages);
        }
      }
    } catch (error) {
      console.error("Error loading chat history:", error);
    }
  }, []);

  // Sauvegarder l'historique dans localStorage à chaque changement
  const saveHistory = useCallback((msgs: Message[]) => {
    try {
      const toStore: StoredMessage[] = msgs.map(msg => ({
        ...msg,
        timestamp: msg.timestamp.toISOString(),
      }));
      ecrireStockage(CHAT_HISTORY_KEY, JSON.stringify(toStore));
    } catch (error) {
      console.error("Error saving chat history:", error);
    }
  }, []);

  // Le serveur fait foi. Quand le relais d'Inès est lent (septembre 2026 : réponses
  // arrivées après plusieurs minutes, voire jours), la réponse finissait en base sans
  // jamais s'afficher : le visiteur ne voyait que le message d'attente. On recharge donc
  // la conversation du serveur dès que son dernier message est une réponse d'Inès.
  const [enAttente, setEnAttente] = useState(false);
  const monte = useRef(true);
  useEffect(() => { monte.current = true; return () => { monte.current = false; }; }, []);
  const syncFromServer = useCallback(async (): Promise<"repondu" | "en_attente" | "vide"> => {
    if (!sessionId) return "vide";
    try {
      const { data } = await supabase.functions.invoke(
        `chatbot-webhook?action=history&sessionId=${sessionId}`,
        { method: "GET" }
      );
      const server = (data?.messages ?? []) as { role: "user" | "assistant"; content: string; created_at: string }[];
      if (!server.length) return "vide";
      if (server[server.length - 1].role !== "assistant") return "en_attente";
      const synced: Message[] = [
        welcomeMessage,
        ...server.map((m, i) => ({ id: `srv_${i}`, role: m.role, content: m.content, timestamp: new Date(m.created_at) })),
      ];
      setMessages(synced);
      saveHistory(synced);
      return "repondu";
    } catch {
      return "vide";
    }
  }, [sessionId, saveHistory]);

  // À l'ouverture : rattrape une réponse arrivée pendant l'absence du visiteur.
  useEffect(() => {
    if (!isOpen || !sessionId) return;
    void syncFromServer().then((etat) => setEnAttente(etat === "en_attente"));
  }, [isOpen, sessionId, syncFromServer]);

  // Question restée sans réponse : on continue d'écouter, fenêtre ouverte, jusqu'à 10 min.
  useEffect(() => {
    if (!isOpen || !enAttente) return;
    const debut = Date.now();
    const id = window.setInterval(async () => {
      const etat = await syncFromServer();
      if (etat !== "en_attente" || Date.now() - debut > 10 * 60_000) setEnAttente(false);
    }, 5000);
    return () => window.clearInterval(id);
  }, [isOpen, enAttente, syncFromServer]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if (!isOpen) return;
    // Léger délai : la fenêtre fermée est `invisible`, le champ n'est focalisable qu'une fois affichée.
    const id = window.setTimeout(() => inputRef.current?.focus(), 50);
    return () => window.clearTimeout(id);
  }, [isOpen]);

  // Vérifier si l'utilisateur a déjà utilisé le chat
  useEffect(() => {
    const hasUsed = lireStockage("brandy_chat_used") === "true";
    setHasUsedChat(hasUsed);
  }, []);

  // Afficher la notification périodiquement (max 3 fois par session).
  // Jamais sur /club : on n'interrompt pas quelqu'un en train de décider d'un
  // paiement. La bulle reste cliquable, elle ne se manifeste simplement plus.
  const { pathname } = useLocation();
  useEffect(() => {
    if (hasUsedChat || isOpen || pathname === "/club") return;

    const showNotificationWithDelay = () => {
      // Première notification après 8 secondes, puis toutes les 60 secondes
      // Une seule bulle par session, après 30 s, jamais pendant la saisie dans un champ.
      const delay = 30000;
      
      const timer = setTimeout(() => {
        const a = document.activeElement;
        const saisie = a instanceof HTMLElement && (a.isContentEditable || /^(INPUT|TEXTAREA|SELECT)$/.test(a.tagName));
        if (notificationCount < 1 && !hasUsedChat && !isOpen && !saisie) {
          setShowNotification(true);
          setNotificationCount(prev => prev + 1);
        }
      }, delay);
      
      return () => clearTimeout(timer);
    };

    const cleanup = showNotificationWithDelay();
    return cleanup;
  }, [notificationCount, hasUsedChat, isOpen, pathname]);

  // Cacher la notification après 8 secondes
  useEffect(() => {
    if (showNotification) {
      const timer = setTimeout(() => {
        setShowNotification(false);
      }, 8000);
      
      return () => clearTimeout(timer);
    }
  }, [showNotification]);

  // Menu « Parler à quelqu'un » : Échap ferme (focus rendu au bouton), clic extérieur ferme.
  useEffect(() => {
    if (!menuOpen && !isOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== "Escape") return;
      setMenuOpen(false);
      setIsOpen(false);
      ctaRef.current?.focus();
    };
    const onDown = (e: MouseEvent) => {
      const n = e.target as Node;
      if (!menuRef.current?.contains(n) && !ctaRef.current?.contains(n)) setMenuOpen(false);
    };
    document.addEventListener("keydown", onKey);
    document.addEventListener("mousedown", onDown);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("mousedown", onDown);
    };
  }, [menuOpen, isOpen]);

  useEffect(() => {
    if (menuOpen) menuRef.current?.querySelector<HTMLElement>("a,button")?.focus();
  }, [menuOpen]);

  const handleOpenChat = () => {
    setMenuOpen(false);
    setIsOpen(true);
    setShowNotification(false);
  };

  const handleDismissNotification = (e: React.MouseEvent) => {
    e.stopPropagation();
    setShowNotification(false);
  };

  const markChatAsUsed = () => {
    setHasUsedChat(true);
    ecrireStockage("brandy_chat_used", "true");
  };

  // Réinitialiser le chat
  const resetChat = () => {
    const newSessionId = `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    setSessionId(newSessionId);
    ecrireStockage(CHAT_SESSION_KEY, newSessionId);
    setMessages([welcomeMessage]);
    try { localStorage.removeItem(CHAT_HISTORY_KEY); } catch { /* stockage indisponible */ }
  };

  const sendMessage = async () => {
    if (!input.trim() || isLoading) return;

    // Marquer le chat comme utilisé dès le premier message
    if (!hasUsedChat) {
      markChatAsUsed();
    }

    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content: input.trim(),
      timestamp: new Date(),
    };

    const newMessages = [...messages, userMessage];
    setMessages(newMessages);
    saveHistory(newMessages);
    setInput("");
    setIsLoading(true);

    try {
      // Réponses d'Inès déjà présentes : on attend une réponse POSTÉRIEURE à cette
      // question, sinon le deuxième message afficherait la réponse du premier.
      const lireHistorique = async () => {
        const { data, error: histError } = await supabase.functions.invoke(
          `chatbot-webhook?action=history&sessionId=${sessionId}`,
          { method: "GET" }
        );
        if (histError) throw histError;
        return ((data?.messages ?? []) as { role: string; content: string }[]).filter(m => m.role === "assistant");
      };
      const dejaRepondu = (await lireHistorique()).length;

      // Envoyer le message au webhook
      const { error: fnError } = await supabase.functions.invoke("chatbot-webhook", {
        body: {
          message: userMessage.content,
          sessionId: sessionId,
        },
      });

      if (fnError) throw fnError;

      // Polling pour récupérer la réponse d'Inès (jusqu'à ~75 secondes : l'agent peut réfléchir)
      let assistantContent = "";
      let attempts = 0;
      const maxAttempts = 50;

      let erreursDeSuite = 0;
      while (attempts < maxAttempts && monte.current && erreursDeSuite < 5) {
        // Délai progressif : 1,5 s puis jusqu'à 4 s
        await new Promise(resolve => setTimeout(resolve, Math.min(1500 + attempts * 100, 4000)));
        attempts++;
        if (!monte.current) return;

        let reponses: { role: string; content: string }[];
        try {
          reponses = await lireHistorique();
          erreursDeSuite = 0;
        } catch {
          erreursDeSuite++;
          continue;
        }
        if (reponses.length > dejaRepondu) {
          assistantContent = reponses[reponses.length - 1].content;
          break;
        }
      }

      if (!monte.current) return;
      if (!assistantContent) {
        assistantContent = "Merci pour ton message ! Inès va te répondre dès que possible. 💬";
        setEnAttente(true); // la vraie réponse remplacera ce message dès qu'elle arrive
      }

      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: assistantContent,
        timestamp: new Date(),
      };

      const updatedMessages = [...newMessages, assistantMessage];
      setMessages(updatedMessages);
      saveHistory(updatedMessages);
    } catch (error) {
      console.error("Error sending message:", error);
      if (!monte.current) return;
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: "Désolé, une erreur s'est produite. Veuillez réessayer.",
        timestamp: new Date(),
      };
      const updatedMessages = [...newMessages, errorMessage];
      setMessages(updatedMessages);
      saveHistory(updatedMessages);
    } finally {
      if (monte.current) setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const formatContent = (content: string) => {
    // Handle markdown-like formatting
    return content
      .split("\n")
      .map((line, index) => {
        // Le texte est échappé AVANT les balises de mise en forme : aucun HTML brut ne passe.
        line = line.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
        // Bold text
        line = line.replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>");
        // Italic text
        line = line.replace(/\*(.*?)\*/g, "<em>$1</em>");
        // Links
        line = line.replace(/\[([^\]]+)\]\(([^)]+)\)/g, (_m, texte: string, url: string) =>
          urlSure(url.replace(/&quot;/g, '"').replace(/&amp;/g, "&"))
            ? `<a href="${url}" target="_blank" rel="noopener noreferrer" class="text-primary underline">${texte}</a>`
            : texte
        );
        
        return (
          <span key={index} dangerouslySetInnerHTML={{ __html: line }} className="block" />
        );
      });
  };

  return (
    <>
      {/* Notification Bubble */}
      {showNotification && !isOpen && (
        <div 
          className="mn-flottant fixed bottom-[calc(9rem+env(safe-area-inset-bottom))] right-4 sm:bottom-24 sm:right-6 z-50 max-w-[280px] animate-in slide-in-from-right-5 fade-in duration-300"
          onClick={handleOpenChat}
        >
          <div className="mn-card hover-lift p-4 cursor-pointer relative">
            <button 
              onClick={handleDismissNotification}
              className="absolute -top-5 -right-5 w-11 h-11 flex items-center justify-center group"
              aria-label="Fermer"
            >
              <span className="w-8 h-8 bg-muted border border-border rounded-full flex items-center justify-center group-hover:bg-muted-foreground/20 transition-colors">
                <X className="h-4 w-4 text-muted-foreground" />
              </span>
            </button>
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center flex-shrink-0">
                <MessageCircle className="h-5 w-5 text-primary-foreground" />
              </div>
              <div>
                <p className="font-medium text-sm text-foreground">Besoin d'aide ?</p>
                <p className="text-sm text-muted-foreground mt-1">
                  Je suis Inès, votre assistante. Posez-moi vos questions !
                </p>
              </div>
            </div>
            <div className="absolute bottom-0 right-6 translate-y-1/2 w-3 h-3 bg-card border-r border-b border-border rotate-45" />
          </div>
        </div>
      )}

      {/* Chat Toggle Button - Inès */}
      {/* Appel à l'action permanent « Parler à quelqu'un » ; bottom-20 mobile pour rester au-dessus de la BottomNav. */}
      {isOpen ? (
        <button
          ref={ctaRef}
          onClick={() => setIsOpen(false)}
          className="mn-flottant fixed bottom-[calc(5rem+env(safe-area-inset-bottom))] right-4 sm:bottom-6 sm:right-6 z-50 w-14 h-14 rounded-[10px] shadow-[var(--shadow-medium)] flex items-center justify-center bg-muted-foreground transition-colors duration-200"
          aria-label="Fermer le chat"
        >
          <X className="h-6 w-6 text-primary-foreground" />
        </button>
      ) : (
        <button
          ref={ctaRef}
          onClick={() => setMenuOpen((v) => !v)}
          aria-haspopup="menu"
          aria-expanded={menuOpen}
          className="mn-flottant fixed bottom-[calc(5rem+env(safe-area-inset-bottom))] right-4 sm:bottom-6 sm:right-6 z-50 min-h-12 px-5 rounded-[10px] shadow-[var(--shadow-medium)] flex items-center gap-2 bg-primary hover:bg-primary/90 text-primary-foreground font-medium text-base transition-colors duration-200"
        >
          <MessageCircle className="h-5 w-5" aria-hidden="true" />
          Parler à quelqu'un
        </button>
      )}

      {menuOpen && !isOpen && (
        <div
          ref={menuRef}
          role="menu"
          aria-label="Parler à quelqu'un"
          className="mn-flottant fixed bottom-[calc(9rem+env(safe-area-inset-bottom))] right-4 sm:bottom-24 sm:right-6 z-50 w-[min(18rem,calc(100vw-2rem))] mn-card shadow-[var(--shadow-lift)] p-2 animate-in fade-in slide-in-from-bottom-2 duration-200"
        >
          {[
            // Rendez-vous : le Meet de l'équipe (même lien que /contact). Appel : la ligne d'Alexis,
            // lue dans sa fiche d'équipe pour suivre un changement de numéro.
            { Icon: CalendarDays, label: "Prendre rendez-vous", href: "https://meet.marenostrum.tech/rdv-equipe", external: true },
            { Icon: Phone, label: "Appeler", href: telHref(getMember("alexis")?.telephone ?? "+33617358167") },
            { Icon: Mail, label: "Envoyer un message", to: "/contact" },
          ].map(({ Icon, label, to, href, external }) => {
            const cls = "flex w-full items-center gap-3 rounded-lg px-3 min-h-12 text-base text-foreground text-left hover:bg-secondary focus-visible:bg-secondary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring";
            const inner = (<><Icon className="h-5 w-5 text-primary" aria-hidden="true" />{label}</>);
            return href ? (
              <a key={label} role="menuitem" href={href} className={cls} onClick={() => setMenuOpen(false)}
                {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}>{inner}</a>
            ) : (
              <Link key={label} role="menuitem" to={to!} className={cls} onClick={() => setMenuOpen(false)}>{inner}</Link>
            );
          })}
          <button
            role="menuitem"
            onClick={handleOpenChat}
            className="flex w-full items-center gap-3 rounded-lg px-3 min-h-12 text-base text-foreground text-left hover:bg-secondary focus-visible:bg-secondary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          >
            <Bot className="h-5 w-5 text-primary" aria-hidden="true" />
            Assistant virtuel
          </button>
        </div>
      )}

      {/* Chat Window */}
      <div
        className={`fixed z-50 transition-[transform,opacity,visibility] duration-200 transform origin-bottom-right motion-reduce:transition-none
          ${isOpen 
            ? "scale-100 opacity-100 visible pointer-events-auto" 
            : "scale-95 opacity-0 invisible pointer-events-none"
          }
          /* Mobile: full width minus margins */
          bottom-[calc(9rem+env(safe-area-inset-bottom))] right-2 left-2 sm:left-auto
          /* Desktop: fixed width */
          sm:bottom-24 sm:right-6 sm:w-[360px] sm:max-w-[calc(100vw-3rem)]`}
      >
        <div className="mn-card rounded-2xl shadow-[var(--shadow-lift)] overflow-hidden flex flex-col h-[60vh] sm:h-[480px] max-h-[600px]">
          {/* Header */}
          <div className="bg-primary p-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-primary-foreground/20 flex items-center justify-center">
                <MessageCircle className="h-5 w-5 text-primary-foreground" />
              </div>
              <div>
                <h3 className="font-semibold text-primary-foreground">Inès</h3>
                <p className="text-sm text-primary-foreground/70">Assistante virtuelle</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Button
                variant="ghost"
                size="sm"
                onClick={resetChat}
                className="text-primary-foreground/70 hover:text-primary-foreground hover:bg-primary-foreground/10 h-8 px-2 flex items-center gap-1.5"
                title="Réinitialiser la conversation"
              >
                <RotateCcw className="h-4 w-4" />
                <span className="text-sm hidden sm:inline">Réinitialiser</span>
              </Button>
            </div>
          </div>

          {/* Messages */}
          <div role="log" aria-live="polite" className="flex-1 overflow-y-auto p-4 space-y-3 bg-secondary/10">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex items-start gap-2 ${
                  message.role === "user" ? "flex-row-reverse" : ""
                }`}
              >
                <div
                  className={`w-7 h-7 rounded-full flex-shrink-0 flex items-center justify-center ${
                    message.role === "user"
                      ? "bg-accent text-accent-foreground"
                      : "bg-primary text-primary-foreground"
                  }`}
                >
                  {message.role === "user" ? (
                    <User className="h-4 w-4" />
                  ) : (
                    <MessageCircle className="h-3.5 w-3.5" />
                  )}
                </div>
                <div
                  className={`max-w-[80%] rounded-xl px-3 py-2 ${
                    message.role === "user"
                      ? "bg-accent text-accent-foreground rounded-tr-sm"
                      : "bg-card border border-border text-foreground rounded-tl-sm"
                  }`}
                >
                  <div className="text-sm leading-relaxed">
                    {formatContent(message.content)}
                  </div>
                  <span className="text-sm opacity-50 mt-1 block">
                    {message.timestamp.toLocaleTimeString("fr-FR", {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </span>
                </div>
              </div>
            ))}
            
            {isLoading && (
              <div className="flex items-start gap-2">
                <div className="w-7 h-7 rounded-full bg-primary text-primary-foreground flex items-center justify-center">
                  <MessageCircle className="h-3.5 w-3.5" />
                </div>
                <div className="bg-card border border-border rounded-xl rounded-tl-sm px-3 py-3">
                  <TypingIndicator />
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div className="p-3 bg-card border-t border-border">
            <div className="flex items-center gap-2">
              <Input
                ref={inputRef}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={handleKeyPress}
                aria-label="Votre message"
                placeholder="Posez votre question..."
                className="flex-1 rounded-[10px] border-border text-sm"
                disabled={isLoading}
              />
              <Button
                onClick={sendMessage}
                disabled={!input.trim() || isLoading}
                size="icon"
                className="rounded-[10px] bg-primary hover:bg-primary/90 h-11 w-11"
                aria-label="Envoyer le message"
              >
                <Send className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ChatBot;
