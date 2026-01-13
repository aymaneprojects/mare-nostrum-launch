import { useState, useRef, useEffect, useCallback } from "react";
import { X, Send, User, MessageCircle, RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
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
  content: "Bonjour, je suis Brandy, votre assistante. Je suis là pour répondre à vos questions sur l'entrepreneuriat, les programmes éducatifs et l'accompagnement. Comment puis-je vous aider ?",
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
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Charger l'historique depuis localStorage au démarrage
  useEffect(() => {
    try {
      // Charger ou créer le session ID
      let storedSessionId = localStorage.getItem(CHAT_SESSION_KEY);
      if (!storedSessionId) {
        storedSessionId = `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
        localStorage.setItem(CHAT_SESSION_KEY, storedSessionId);
      }
      setSessionId(storedSessionId);

      // Charger l'historique des messages
      const storedHistory = localStorage.getItem(CHAT_HISTORY_KEY);
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
      localStorage.setItem(CHAT_HISTORY_KEY, JSON.stringify(toStore));
    } catch (error) {
      console.error("Error saving chat history:", error);
    }
  }, []);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  // Vérifier si l'utilisateur a déjà utilisé le chat
  useEffect(() => {
    const hasUsed = localStorage.getItem("brandy_chat_used") === "true";
    setHasUsedChat(hasUsed);
  }, []);

  // Afficher la notification périodiquement (max 3 fois par session)
  useEffect(() => {
    if (hasUsedChat || isOpen) return;

    const showNotificationWithDelay = () => {
      // Première notification après 8 secondes, puis toutes les 60 secondes
      const delay = notificationCount === 0 ? 8000 : 60000;
      
      const timer = setTimeout(() => {
        if (notificationCount < 3 && !hasUsedChat && !isOpen) {
          setShowNotification(true);
          setNotificationCount(prev => prev + 1);
        }
      }, delay);
      
      return () => clearTimeout(timer);
    };

    const cleanup = showNotificationWithDelay();
    return cleanup;
  }, [notificationCount, hasUsedChat, isOpen]);

  // Cacher la notification après 8 secondes
  useEffect(() => {
    if (showNotification) {
      const timer = setTimeout(() => {
        setShowNotification(false);
      }, 8000);
      
      return () => clearTimeout(timer);
    }
  }, [showNotification]);

  const handleOpenChat = () => {
    setIsOpen(true);
    setShowNotification(false);
  };

  const handleDismissNotification = (e: React.MouseEvent) => {
    e.stopPropagation();
    setShowNotification(false);
  };

  const markChatAsUsed = () => {
    setHasUsedChat(true);
    localStorage.setItem("brandy_chat_used", "true");
  };

  // Réinitialiser le chat
  const resetChat = () => {
    const newSessionId = `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    setSessionId(newSessionId);
    localStorage.setItem(CHAT_SESSION_KEY, newSessionId);
    setMessages([welcomeMessage]);
    localStorage.removeItem(CHAT_HISTORY_KEY);
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
      const response = await fetch(
        "https://n8n.srv1174483.hstgr.cloud/webhook/70b98a17-0409-4aa3-ad63-936b7e200e9f/chat",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          mode: "cors",
          body: JSON.stringify({
            message: userMessage.content,
            sessionId: sessionId,
          }),
        }
      );

      const data = await response.json();
      console.log("Webhook response:", data);

      // Handle different response formats from n8n
      let assistantContent = "";
      if (typeof data === "string") {
        assistantContent = data;
      } else if (data.output) {
        assistantContent = data.output;
      } else if (data.response) {
        assistantContent = data.response;
      } else if (data.message) {
        assistantContent = data.message;
      } else if (data.text) {
        assistantContent = data.text;
      } else if (Array.isArray(data) && data.length > 0) {
        assistantContent = data[0].output || data[0].response || data[0].message || JSON.stringify(data[0]);
      } else {
        assistantContent = JSON.stringify(data);
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
      setIsLoading(false);
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
        // Bold text
        line = line.replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>");
        // Italic text
        line = line.replace(/\*(.*?)\*/g, "<em>$1</em>");
        // Links
        line = line.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" target="_blank" class="text-primary underline">$1</a>');
        
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
          className="fixed bottom-24 right-4 sm:right-6 z-50 max-w-[280px] animate-in slide-in-from-right-5 fade-in duration-300"
          onClick={handleOpenChat}
        >
          <div className="bg-card border border-border rounded-xl shadow-lg p-4 cursor-pointer hover:shadow-xl transition-shadow relative">
            <button 
              onClick={handleDismissNotification}
              className="absolute -top-2 -right-2 w-6 h-6 bg-muted rounded-full flex items-center justify-center hover:bg-muted-foreground/20 transition-colors"
              aria-label="Fermer"
            >
              <X className="h-3 w-3 text-muted-foreground" />
            </button>
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center flex-shrink-0">
                <MessageCircle className="h-5 w-5 text-primary-foreground" />
              </div>
              <div>
                <p className="font-medium text-sm text-foreground">Besoin d'aide ?</p>
                <p className="text-xs text-muted-foreground mt-1">
                  Je suis Brandy, votre assistante. Posez-moi vos questions !
                </p>
              </div>
            </div>
            <div className="absolute bottom-0 right-6 translate-y-1/2 w-3 h-3 bg-card border-r border-b border-border rotate-45" />
          </div>
        </div>
      )}

      {/* Chat Toggle Button - Brandy */}
      <button
        onClick={() => isOpen ? setIsOpen(false) : handleOpenChat()}
        className={`fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-50 w-14 h-14 rounded-full shadow-lg 
          flex items-center justify-center transition-all duration-200 
          ${isOpen 
            ? "bg-muted-foreground" 
            : "bg-primary hover:bg-primary/90"
          }`}
        aria-label={isOpen ? "Fermer le chat" : "Discuter avec Brandy"}
      >
        {isOpen ? (
          <X className="h-6 w-6 text-white" />
        ) : (
          <MessageCircle className="h-6 w-6 text-white" />
        )}
      </button>

      {/* Chat Window */}
      <div
        className={`fixed z-50 transition-all duration-200 transform origin-bottom-right
          ${isOpen 
            ? "scale-100 opacity-100 pointer-events-auto" 
            : "scale-95 opacity-0 pointer-events-none"
          }
          /* Mobile: full width minus margins */
          bottom-20 right-2 left-2 sm:left-auto
          /* Desktop: fixed width */
          sm:bottom-24 sm:right-6 sm:w-[360px] sm:max-w-[calc(100vw-3rem)]`}
      >
        <div className="bg-card border border-border rounded-xl shadow-xl overflow-hidden flex flex-col h-[70vh] sm:h-[480px] max-h-[600px]">
          {/* Header */}
          <div className="bg-primary p-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">
                <MessageCircle className="h-5 w-5 text-white" />
              </div>
              <div>
                <h3 className="font-semibold text-white">Brandy</h3>
                <p className="text-xs text-white/70">Assistante virtuelle</p>
              </div>
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={resetChat}
              className="text-white/70 hover:text-white hover:bg-white/10 h-8 w-8"
              title="Nouvelle conversation"
            >
              <RotateCcw className="h-4 w-4" />
            </Button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-secondary/10">
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
                  <span className="text-[10px] opacity-50 mt-1 block">
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
                placeholder="Posez votre question..."
                className="flex-1 rounded-full border-border text-sm"
                disabled={isLoading}
              />
              <Button
                onClick={sendMessage}
                disabled={!input.trim() || isLoading}
                size="icon"
                className="rounded-full bg-primary hover:bg-primary/90 h-9 w-9"
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
