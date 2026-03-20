import { useState, useRef, useEffect } from "react";

export default function Chat() {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([
    { role: "bot", text: "Neural link established. How can I assist you today?" },
  ]);
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const sendMessage = async () => {
    if (!input.trim() || loading) return;

    const userMessage = { role: "user", text: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setLoading(true);

    try {
      const res = await fetch("http://localhost:3001/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt: input }),
      });
      const data = await res.json();
      setMessages((prev) => [...prev, { role: "bot", text: data.reply }]);
    } catch {
      setMessages((prev) => [
        ...prev,
        { role: "bot", text: "⚠️ Connection error. Server unreachable." },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="chat-root">
      <style>{`
        .chat-root {
          display: flex;
          flex-direction: column;
          height: 100%;
          font-family: 'JetBrains Mono', 'Fira Code', monospace;
        }

        .chat-messages {
          flex: 1;
          overflow-y: auto;
          display: flex;
          flex-direction: column;
          gap: 12px;
          padding: 8px 4px;
          scrollbar-width: thin;
          scrollbar-color: #00ffe740 transparent;
        }

        .chat-messages::-webkit-scrollbar { width: 4px; }
        .chat-messages::-webkit-scrollbar-thumb { background: #00ffe740; border-radius: 4px; }

        .msg-wrapper {
          display: flex;
          animation: fadeSlide 0.3s ease forwards;
        }
        .msg-wrapper.user { justify-content: flex-end; }
        .msg-wrapper.bot  { justify-content: flex-start; }

        @keyframes fadeSlide {
          from { opacity: 0; transform: translateY(8px); }
          to   { opacity: 1; transform: translateY(0); }
        }

        .msg-bubble {
          max-width: 78%;
          padding: 10px 14px;
          border-radius: 2px;
          font-size: 13px;
          line-height: 1.6;
          position: relative;
        }

        .msg-bubble.user {
          background: linear-gradient(135deg, #a855f720, #3b82f620);
          border: 1px solid #a855f740;
          border-right: 3px solid #a855f7;
          color: #e2e8f0;
        }

        .msg-bubble.bot {
          background: linear-gradient(135deg, #00ffe710, #0ea5e910);
          border: 1px solid #00ffe730;
          border-left: 3px solid #00ffe7;
          color: #cbd5e1;
        }

        .msg-label {
          font-size: 9px;
          font-weight: 700;
          letter-spacing: 2px;
          text-transform: uppercase;
          margin-bottom: 4px;
          opacity: 0.5;
        }

        .typing-indicator {
          display: flex;
          gap: 4px;
          padding: 6px 0;
          align-items: center;
        }
        .typing-dot {
          width: 6px; height: 6px;
          border-radius: 50%;
          background: #00ffe7;
          animation: pulse 1.2s infinite;
        }
        .typing-dot:nth-child(2) { animation-delay: 0.2s; }
        .typing-dot:nth-child(3) { animation-delay: 0.4s; }

        @keyframes pulse {
          0%, 60%, 100% { opacity: 0.2; transform: scale(0.8); }
          30% { opacity: 1; transform: scale(1); }
        }

        .chat-input-row {
          display: flex;
          gap: 8px;
          margin-top: 12px;
          align-items: stretch;
        }

        .chat-input {
          flex: 1;
          background: rgba(0,255,231,0.04);
          border: 1px solid #00ffe730;
          border-bottom: 2px solid #00ffe760;
          color: #e2e8f0;
          padding: 10px 14px;
          font-family: 'JetBrains Mono', monospace;
          font-size: 13px;
          outline: none;
          border-radius: 2px;
          transition: border-color 0.2s;
        }
        .chat-input:focus {
          border-color: #00ffe780;
          background: rgba(0,255,231,0.07);
        }
        .chat-input::placeholder { color: #475569; }

        .chat-send-btn {
          padding: 10px 18px;
          background: transparent;
          border: 1px solid #00ffe760;
          color: #00ffe7;
          font-family: 'JetBrains Mono', monospace;
          font-size: 11px;
          font-weight: 700;
          letter-spacing: 2px;
          text-transform: uppercase;
          cursor: pointer;
          border-radius: 2px;
          transition: all 0.2s;
          clip-path: polygon(8px 0%, 100% 0%, calc(100% - 8px) 100%, 0% 100%);
        }
        .chat-send-btn:hover:not(:disabled) {
          background: #00ffe720;
          box-shadow: 0 0 20px #00ffe730;
        }
        .chat-send-btn:disabled { opacity: 0.4; cursor: not-allowed; }
      `}</style>

      <div className="chat-messages">
        {messages.map((msg, i) => (
          <div key={i} className={`msg-wrapper ${msg.role}`}>
            <div className={`msg-bubble ${msg.role}`}>
              <div className="msg-label">
                {msg.role === "user" ? "▶ YOU" : "◈ AI CORE"}
              </div>
              {msg.text}
            </div>
          </div>
        ))}

        {loading && (
          <div className="msg-wrapper bot">
            <div className="msg-bubble bot">
              <div className="msg-label">◈ AI CORE</div>
              <div className="typing-indicator">
                <div className="typing-dot" />
                <div className="typing-dot" />
                <div className="typing-dot" />
              </div>
            </div>
          </div>
        )}
        <div ref={bottomRef} />
      </div>

      <div className="chat-input-row">
        <input
          className="chat-input"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && sendMessage()}
          placeholder="Enter neural query..."
          disabled={loading}
        />
        <button className="chat-send-btn" onClick={sendMessage} disabled={loading}>
          SEND
        </button>
      </div>
    </div>
  );
}
