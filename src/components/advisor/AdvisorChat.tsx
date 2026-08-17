import React, { useState, useEffect, useRef } from "react";
import { Send, Bot, User, RefreshCw, Sparkles } from "lucide-react";
import ReactMarkdown from "react-markdown";
import { askGeminiAdvisor, ChatMessage } from "@/services/geminiAdvisor";
import { Sticker } from "@/components/ui/Sticker";

interface UIHistoryItem {
  id: string;
  sender: "bot" | "user";
  text: string;
  timestamp: string;
}

export function AdvisorChat() {
  const [messages, setMessages] = useState<UIHistoryItem[]>([
    {
      id: "welcome-1",
      sender: "bot",
      text: "Hello! I am your CareerNova AI Advisor. Ask me anything about stream choices after Class 10, degree programs in J&K Government Degree Colleges, entrance exams, or PMSSS scholarships!",
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, loading]);

  const handleSend = async (customQuery?: string) => {
    const query = (customQuery || input).trim();
    if (!query || loading) return;

    const userMsg: UIHistoryItem = {
      id: `user-${Date.now()}`,
      sender: "user",
      text: query,
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    };

    setMessages((prev) => [...prev, userMsg]);
    if (!customQuery) setInput("");
    setLoading(true);

    try {
      const historyPayload: ChatMessage[] = messages
        .filter((m) => m.id !== "welcome-1")
        .map((m) => ({
          role: m.sender === "user" ? "user" : "model",
          text: m.text,
        }));

      const reply = await askGeminiAdvisor(query, historyPayload);

      setMessages((prev) => [
        ...prev,
        {
          id: `bot-${Date.now()}`,
          sender: "bot",
          text: reply,
          timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        },
      ]);
    } catch (err) {
      setMessages((prev) => [
        ...prev,
        {
          id: `bot-${Date.now()}`,
          sender: "bot",
          text: "I am ready to help! Please ask any question about J&K streams, degrees, or colleges.",
          timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const sampleQueries = [
    "Which stream should I choose after Class 10?",
    "What degree courses exist in J&K Government Degree Colleges?",
    "How to apply for PMSSS scholarship in J&K?",
    "What is the difference between B.Sc Computer Science and BCA?",
  ];

  return (
    <div className="bg-white rounded-3xl border border-slate-200/80 shadow-xl overflow-hidden flex flex-col h-[700px] max-w-5xl mx-auto font-sans">
      {/* Eduor Theme Header */}
      <div className="bg-[#0f2239] p-6 text-white flex items-center justify-between shadow-md border-b border-[#1a365d]">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-white/10 border border-white/20 flex items-center justify-center p-1.5 shadow-inner">
            <Sticker name="graduate" size="md" animate={false} />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="font-display font-extrabold text-xl text-white tracking-tight">CareerNova AI Advisor</h2>
              <span className="bg-[#4582ff]/20 text-[#4582ff] border border-[#4582ff]/40 text-[10px] font-black uppercase tracking-wider px-2.5 py-0.5 rounded-full flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-[#00d6d3] animate-pulse" />
                Live J&K Advisor
              </span>
            </div>
            <p className="text-xs text-slate-300">
              Source-backed education decision support for Jammu & Kashmir students
            </p>
          </div>
        </div>

        <button
          onClick={() => {
            setMessages([
              {
                id: "welcome-1",
                sender: "bot",
                text: "Chat reset. Ask me any question about J&K education, streams, or degree colleges!",
                timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
              },
            ]);
          }}
          className="text-xs font-bold text-slate-300 hover:text-white bg-white/10 hover:bg-white/20 border border-white/10 px-3 py-2 rounded-xl transition flex items-center gap-1.5 cursor-pointer"
          title="Reset Chat"
        >
          <RefreshCw className="h-3.5 w-3.5" />
          <span>Reset</span>
        </button>
      </div>

      {/* Suggestion Chips */}
      <div className="bg-[#f4f7fe] border-b border-slate-200/80 px-6 py-3 flex items-center gap-2 overflow-x-auto no-scrollbar">
        <span className="text-[11px] font-black uppercase tracking-wider text-[#0f2239] flex items-center gap-1 shrink-0 font-display">
          <Sparkles className="h-3.5 w-3.5 text-[#ff7f46]" />
          Suggested Questions:
        </span>
        {sampleQueries.map((q) => (
          <button
            key={q}
            onClick={() => handleSend(q)}
            className="text-xs font-bold bg-white hover:bg-[#ff7f46] text-[#0f2239] hover:text-white border border-slate-200/80 hover:border-[#ff7f46] px-3.5 py-1.5 rounded-full shadow-2xs transition-all duration-200 shrink-0 cursor-pointer"
          >
            {q}
          </button>
        ))}
      </div>

      {/* Chat Messages Container */}
      <div className="flex-1 p-6 overflow-y-auto space-y-6 bg-slate-50/50">
        {messages.map((m) => (
          <div
            key={m.id}
            className={`flex items-start gap-3 ${m.sender === "user" ? "flex-row-reverse" : "flex-row"}`}
          >
            <div
              className={`w-9 h-9 rounded-2xl flex items-center justify-center shrink-0 shadow-sm ${
                m.sender === "user"
                  ? "bg-[#ff7f46] text-white"
                  : "bg-[#0f2239] text-white border border-[#1a365d]"
              }`}
            >
              {m.sender === "user" ? <User className="h-5 w-5" /> : <Bot className="h-5 w-5" />}
            </div>

            <div className={`space-y-1 max-w-3xl ${m.sender === "user" ? "items-end" : "items-start"}`}>
              <div
                className={`p-5 rounded-2xl shadow-sm text-sm leading-relaxed ${
                  m.sender === "user"
                    ? "bg-[#ff7f46] text-white rounded-tr-xs font-medium"
                    : "bg-white text-[#0f2239] border border-slate-200/80 rounded-tl-xs"
                }`}
              >
                {m.sender === "user" ? (
                  <div className="whitespace-pre-line font-sans">{m.text}</div>
                ) : (
                  <div className="prose prose-slate prose-sm max-w-none text-[#0f2239] leading-relaxed font-sans [&>h3]:font-display [&>h3]:text-base [&>h3]:font-extrabold [&>h3]:text-[#0f2239] [&>h3]:mt-3 [&>h3]:mb-1 [&>ul]:list-disc [&>ul]:pl-4 [&>ul]:space-y-1 [&>p]:mb-2">
                    <ReactMarkdown>{m.text}</ReactMarkdown>
                  </div>
                )}
                <div
                  className={`text-[10px] mt-2 font-semibold ${
                    m.sender === "user" ? "text-white/80 text-right" : "text-slate-400"
                  }`}
                >
                  {m.timestamp}
                </div>
              </div>
            </div>
          </div>
        ))}

        {loading && (
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-2xl bg-[#0f2239] text-white flex items-center justify-center shrink-0">
              <Bot className="h-5 w-5" />
            </div>
            <div className="bg-white border border-slate-200/80 rounded-2xl rounded-tl-xs p-4 shadow-sm flex items-center gap-3 text-xs font-bold text-[#636363]">
              <div className="w-2.5 h-2.5 rounded-full bg-[#ff7f46] animate-ping" />
              <span>CareerNova AI is thinking...</span>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Input Box */}
      <div className="p-4 bg-white border-t border-slate-200/80">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSend();
          }}
          className="flex items-center gap-3"
        >
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask CareerNova AI anything about J&K streams, degree courses, or colleges..."
            className="flex-1 bg-slate-50 border border-slate-200/80 rounded-2xl px-5 py-3.5 text-sm font-medium text-[#0f2239] placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#ff7f46]/40 focus:bg-white transition font-sans"
          />
          <button
            type="submit"
            disabled={!input.trim() || loading}
            className="bg-[#ff7f46] hover:bg-[#e66c35] disabled:opacity-50 text-white font-extrabold text-xs uppercase tracking-wider px-6 py-3.5 rounded-2xl shadow-lg transition flex items-center gap-2 cursor-pointer shrink-0 font-display"
          >
            <span>Ask Advisor</span>
            <Send className="h-4 w-4" />
          </button>
        </form>
      </div>
    </div>
  );
}

