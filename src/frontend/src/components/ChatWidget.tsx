import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Bot, Circle, MessageCircle, Minus, Send, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";

const CHAT_KEY = "tkmart_chat_messages";
const CUSTOMER_ID = "customer";

export interface ChatMessage {
  id: string;
  sender: "customer" | "agent";
  text: string;
  timestamp: number;
  customerId: string;
  customerName?: string;
  isAI?: boolean;
  imageData?: string;
}

function loadMessages(): ChatMessage[] {
  try {
    return JSON.parse(localStorage.getItem(CHAT_KEY) ?? "[]");
  } catch {
    return [];
  }
}

function saveMessages(msgs: ChatMessage[]) {
  localStorage.setItem(CHAT_KEY, JSON.stringify(msgs));
  window.dispatchEvent(new Event("tkmart_chat_updated"));
}

// ─── AI Reply Logic ───────────────────────────────────────────────────────────
const AI_SETTINGS_KEY = "tkmart_ai_settings";
interface AISetting {
  id: string;
  topic: string;
  keywords: string;
  reply: string;
}

function loadAISettings(): AISetting[] {
  try {
    const stored = JSON.parse(localStorage.getItem(AI_SETTINGS_KEY) ?? "null");
    return stored ?? [];
  } catch {
    return [];
  }
}

function getAIReply(userText: string): string {
  const t = userText.toLowerCase();
  const settings = loadAISettings();
  // Find first matching setting by keywords
  let fallback =
    "Thanks for your message! A support agent will reply shortly. For urgent help, contact us on WhatsApp: 9176580731 📞";
  for (const s of settings) {
    if (!s.keywords.trim()) {
      fallback = s.reply;
      continue;
    }
    const kws = s.keywords
      .split(",")
      .map((k) => k.trim().toLowerCase())
      .filter(Boolean);
    if (kws.some((kw) => t.includes(kw))) return s.reply;
  }
  return fallback;
}

export default function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [dismissed, setDismissed] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState("");
  const [aiTyping, setAiTyping] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);
  const imageInputRef = useRef<HTMLInputElement>(null);

  const myMessages = messages.filter((m) => m.customerId === CUSTOMER_ID);

  const loadFromStorage = () => {
    setMessages(loadMessages().filter((m) => m.customerId === CUSTOMER_ID));
  };

  // biome-ignore lint/correctness/useExhaustiveDependencies: intentional - loadFromStorage is stable
  useEffect(() => {
    loadFromStorage();
    const handler = () => loadFromStorage();
    window.addEventListener("tkmart_chat_updated", handler);
    const interval = setInterval(() => loadFromStorage(), 2000);
    return () => {
      window.removeEventListener("tkmart_chat_updated", handler);
      clearInterval(interval);
    };
  }, []);

  // biome-ignore lint/correctness/useExhaustiveDependencies: intentional scroll trigger
  useEffect(() => {
    if (open) {
      bottomRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [open, myMessages.length, aiTyping]);

  const sendMessage = (overrideText?: string, imageData?: string) => {
    const text = overrideText ?? input.trim();
    if (!text && !imageData) return;
    const all = loadMessages();
    const msg: ChatMessage = {
      id: `${Date.now()}-${Math.random()}`,
      sender: "customer",
      text: text || "📷 Photo",
      timestamp: Date.now(),
      customerId: CUSTOMER_ID,
      customerName: "Customer",
      imageData,
    };
    all.push(msg);
    saveMessages(all);
    setMessages(all.filter((m) => m.customerId === CUSTOMER_ID));
    if (!overrideText) setInput("");

    // AI auto-reply
    setAiTyping(true);
    setTimeout(() => {
      setAiTyping(false);
      const latestAll = loadMessages();
      const aiMsg: ChatMessage = {
        id: `ai-${Date.now()}-${Math.random()}`,
        sender: "agent",
        text: getAIReply(text),
        timestamp: Date.now(),
        customerId: CUSTOMER_ID,
        customerName: "TK Assistant",
        isAI: true,
      };
      latestAll.push(aiMsg);
      saveMessages(latestAll);
      setMessages(latestAll.filter((m) => m.customerId === CUSTOMER_ID));
    }, 1500);
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
      const dataUrl = ev.target?.result as string;
      sendMessage("", dataUrl);
    };
    reader.readAsDataURL(file);
    if (imageInputRef.current) imageInputRef.current.value = "";
  };

  const formatTime = (ts: number) =>
    new Date(ts).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });

  return (
    <>
      {/* Floating trigger */}
      {!open && !dismissed && (
        <button
          type="button"
          data-ocid="chat.open_modal_button"
          onClick={() => setOpen(true)}
          className="fixed bottom-24 right-4 z-50 flex items-center gap-2 bg-primary text-primary-foreground rounded-full px-4 py-2.5 shadow-lg hover:opacity-90 transition-all text-sm font-semibold"
          aria-label="Open chat support"
        >
          <MessageCircle className="h-4 w-4" />
          Chat Support
        </button>
      )}

      {/* Chat panel */}
      {open && (
        <div
          data-ocid="chat.dialog"
          className="fixed bottom-4 right-4 z-50 w-80 sm:w-96 flex flex-col bg-card border border-border rounded-2xl shadow-2xl overflow-hidden"
          style={{ height: "420px" }}
        >
          {/* Header */}
          <div className="flex items-center justify-between px-4 py-3 bg-primary/10 border-b border-border">
            <div className="flex items-center gap-2">
              <MessageCircle className="h-4 w-4 text-primary" />
              <span className="font-semibold text-sm">Chat Support</span>
              <span className="flex items-center gap-1 text-xs text-green-400">
                <Circle className="h-1.5 w-1.5 fill-green-400" /> Online
              </span>
            </div>
            <div className="flex items-center gap-1">
              <button
                type="button"
                data-ocid="chat.minimize_button"
                onClick={() => setOpen(false)}
                className="flex items-center justify-center w-7 h-7 rounded bg-muted hover:bg-primary/20 text-muted-foreground hover:text-foreground transition-colors border border-border"
                aria-label="Minimize chat"
                title="Minimize"
              >
                <Minus className="h-3.5 w-3.5" />
              </button>
              <button
                type="button"
                data-ocid="chat.close_button"
                onClick={() => {
                  setOpen(false);
                  setDismissed(true);
                }}
                className="flex items-center justify-center w-7 h-7 rounded bg-muted hover:bg-destructive/20 text-muted-foreground hover:text-destructive transition-colors border border-border"
                aria-label="Close chat"
                title="Close"
              >
                <X className="h-3.5 w-3.5" />
              </button>
            </div>
          </div>

          {/* Messages */}
          <ScrollArea className="flex-1 p-3">
            {myMessages.length === 0 && !aiTyping ? (
              <div
                data-ocid="chat.empty_state"
                className="text-center text-muted-foreground text-xs mt-8"
              >
                👋 Hi! How can we help you today?
              </div>
            ) : (
              <div className="space-y-2">
                {myMessages.map((m) => (
                  <div
                    key={m.id}
                    className={`flex ${
                      m.sender === "customer" ? "justify-end" : "justify-start"
                    }`}
                  >
                    <div className="max-w-[75%]">
                      {/* AI label */}
                      {m.isAI && (
                        <div className="flex items-center gap-1 mb-0.5 ml-1">
                          <Bot className="h-3 w-3 text-teal-400" />
                          <span className="text-[10px] text-teal-400 font-medium">
                            TK Assistant
                          </span>
                        </div>
                      )}
                      {/* Human agent label */}
                      {m.sender === "agent" && !m.isAI && (
                        <div className="flex items-center gap-1 mb-0.5 ml-1">
                          <span className="text-[10px] text-muted-foreground font-medium">
                            Support Agent
                          </span>
                        </div>
                      )}
                      <div
                        className={`rounded-2xl px-3 py-2 text-sm ${
                          m.sender === "customer"
                            ? "bg-primary text-primary-foreground rounded-br-sm"
                            : m.isAI
                              ? "bg-teal-500/15 text-foreground border border-teal-500/30 rounded-bl-sm"
                              : "bg-muted text-foreground rounded-bl-sm"
                        }`}
                      >
                        {m.imageData && (
                          <img
                            src={m.imageData}
                            aria-label="Sent image"
                            className="rounded-lg max-w-full mb-1 max-h-40 object-contain"
                          />
                        )}
                        {m.text !== "📷 Photo" && (
                          <p style={{ whiteSpace: "pre-line" }}>{m.text}</p>
                        )}
                        <p
                          className={`text-[10px] mt-0.5 ${
                            m.sender === "customer"
                              ? "text-primary-foreground/60"
                              : "text-muted-foreground"
                          }`}
                        >
                          {formatTime(m.timestamp)}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
                {/* Typing indicator */}
                {aiTyping && (
                  <div className="flex justify-start">
                    <div className="max-w-[75%]">
                      <div className="flex items-center gap-1 mb-0.5 ml-1">
                        <Bot className="h-3 w-3 text-teal-400" />
                        <span className="text-[10px] text-teal-400 font-medium">
                          TK Assistant
                        </span>
                      </div>
                      <div className="bg-teal-500/15 border border-teal-500/30 rounded-2xl rounded-bl-sm px-3 py-2">
                        <span className="text-xs text-teal-400 italic">
                          Typing...
                        </span>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}
            <div ref={bottomRef} />
          </ScrollArea>

          {/* Input */}
          <div className="flex gap-2 p-3 border-t border-border">
            <input
              ref={imageInputRef}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleImageUpload}
              data-ocid="chat.upload_button"
            />
            <button
              type="button"
              onClick={() => imageInputRef.current?.click()}
              className="h-9 w-9 flex items-center justify-center rounded-md border border-border bg-muted/40 hover:bg-muted text-muted-foreground hover:text-foreground transition-colors flex-shrink-0"
              title="Send photo"
              data-ocid="chat.image.upload_button"
            >
              📷
            </button>
            <Input
              data-ocid="chat.input"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && sendMessage()}
              placeholder="Type a message or send photo..."
              className="flex-1 h-9 text-sm"
            />
            <Button
              data-ocid="chat.submit_button"
              size="sm"
              onClick={() => sendMessage()}
              className="h-9 px-3"
            >
              <Send className="h-4 w-4" />
            </Button>
          </div>
        </div>
      )}
    </>
  );
}
