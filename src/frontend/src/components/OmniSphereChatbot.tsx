import { useEffect, useRef, useState } from "react";

const SYSTEM_PROMPT = `Tu OmniSphere ka AI assistant hai — ek Hinglish tech blog jo phones aur gadgets ke baare mein hai (omnishpere.in).

Tu Hinglish mein baat karta hai (Hindi + English mix). Friendly, casual aur helpful tone rakho.

Tera kaam:
1. Phone aur gadget questions answer karna (specs, comparisons, recommendations)
2. OmniSphere ke blog articles recommend karna (topics: budget phones, flagship phones, phone comparisons, EMI tips, best deals)
3. General tech Q&A — accessories, apps, tips & tricks
4. User ka budget aur need samajh ke best phone suggest karna

Popular articles on OmniSphere:
- "Budget ke andar best phones 2026"
- "iPhone vs Samsung 2026 — kaunsa lena chahiye?"
- "5G phones under 20,000 in 2026"
- "Best camera phone under 30k 2026"
- "EMI pe phone lena sahi hai ya nahi?"
- "OnePlus vs Realme 2026 comparison"

RESPONSE FORMAT — STRICT RULES:
- Hamesha structured format mein jawab do
- Sections clearly alag karo with labels jaise: 📌 Answer:, ✅ Best Options:, 💡 Tip:, 🔗 OmniSphere Article:
- Ek section mein sirf ek cheez likho, sab mix mat karo
- Bullet points use karo jab multiple options ho
- Har response ke end mein ek follow-up question zaroor pucho
- Short paragraphs rakho, wall of text mat likho

Example format:
📌 Answer:
[Main jawab yahan]

✅ Best Options:
• Option 1 — reason
• Option 2 — reason

💡 Tip:
[Ek helpful tip]

🔗 OmniSphere pe padho:
[Relevant article naam]

❓ [Follow-up question]`;

const suggestedQuestions = [
  "Best phone under ₹15,000?",
  "iPhone ya Android — kya loon?",
  "5G phone recommend karo",
  "Camera ke liye best phone?",
];

export default function OmniSphereChatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      role: "assistant",
      content:
        "Namaste! 👋 Main OmniSphere ka AI assistant hoon. Phone ya gadget ke baare mein kuch bhi pucho — main help karunga! 🚀",
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(true);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  // biome-ignore lint/correctness/useExhaustiveDependencies: scroll on message/loading change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  useEffect(() => {
    if (isOpen) setTimeout(() => inputRef.current?.focus(), 300);
  }, [isOpen]);

  const sendMessage = async (text?: string) => {
    const userMsg = text || input.trim();
    if (!userMsg || loading) return;

    setInput("");
    setShowSuggestions(false);
    const newMessages = [...messages, { role: "user", content: userMsg }];
    setMessages(newMessages);
    setLoading(true);

    try {
      const response = await fetch("https://api.anthropic.com/v1/messages", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          model: "claude-sonnet-4-20250514",
          max_tokens: 1000,
          system: SYSTEM_PROMPT,
          messages: newMessages.map((m) => ({
            role: m.role,
            content: m.content,
          })),
        }),
      });
      const data = await response.json();
      const reply =
        data.content?.[0]?.text || "Kuch problem aa gayi, dobara try karo!";
      setMessages([...newMessages, { role: "assistant", content: reply }]);
    } catch {
      setMessages([
        ...newMessages,
        {
          role: "assistant",
          content: "Network error aa gaya bhai! Thodi der baad try karo. 🙏",
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleKey = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const formatMessage = (text: string) => {
    const lines = text.split("\n");
    return lines.map((line, i) => {
      const lk = String(i);
      if (!line.trim()) return <br key={lk} />;
      if (/^[📌✅💡🔗❓🎯📱💰⚡🏆]/u.test(line)) {
        return (
          <div
            key={lk}
            style={{
              marginTop: i === 0 ? 0 : "10px",
              marginBottom: "4px",
              fontWeight: 600,
              color: "#FF8C5A",
              fontSize: "13px",
            }}
          >
            {line}
          </div>
        );
      }
      if (line.trim().startsWith("•") || line.trim().startsWith("-")) {
        return (
          <div
            key={lk}
            style={{
              display: "flex",
              gap: "6px",
              paddingLeft: "6px",
              marginBottom: "3px",
            }}
          >
            <span style={{ color: "#FF6B35", flexShrink: 0 }}>•</span>
            <span>{line.replace(/^[\s•\-]+/, "")}</span>
          </div>
        );
      }
      if (/^\d+\./.test(line.trim())) {
        return (
          <div
            key={lk}
            style={{
              display: "flex",
              gap: "6px",
              paddingLeft: "6px",
              marginBottom: "3px",
            }}
          >
            <span style={{ color: "#FF6B35", flexShrink: 0, fontWeight: 600 }}>
              {line.match(/^\d+/)![0]}.
            </span>
            <span>{line.replace(/^\d+\.\s*/, "")}</span>
          </div>
        );
      }
      return (
        <div key={lk} style={{ marginBottom: "2px" }}>
          {line}
        </div>
      );
    });
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=DM+Sans:wght@300;400;500&display=swap');
        .omni-chat * { box-sizing: border-box; margin: 0; padding: 0; font-family: 'DM Sans', sans-serif; }

        /* FAB pill button — same style as Find My Phone, just above it */
        .omni-fab {
          position: fixed;
          bottom: 152px;
          right: 20px;
          z-index: 9999;
          display: flex;
          align-items: center;
          gap: 8px;
          background: linear-gradient(135deg, #FF6B35, #FF3CAC);
          color: #fff;
          font-weight: 700;
          font-size: 14px;
          padding: 12px 16px;
          border-radius: 9999px;
          border: none;
          cursor: pointer;
          box-shadow: 0 6px 24px rgba(255,107,53,0.45);
          transition: all 0.25s cubic-bezier(0.34,1.56,0.64,1);
          animation: fabPulse 3s ease-in-out infinite;
          white-space: nowrap;
        }
        .omni-fab:hover { transform: scale(1.05); box-shadow: 0 10px 32px rgba(255,107,53,0.6); }
        .omni-fab:active { transform: scale(0.96); }
        @keyframes fabPulse {
          0%,100% { box-shadow: 0 6px 24px rgba(255,107,53,0.45), 0 0 0 0 rgba(255,107,53,0.3); }
          50% { box-shadow: 0 6px 24px rgba(255,107,53,0.45), 0 0 0 8px rgba(255,107,53,0); }
        }

        /* Chat window — opens above the FAB pill */
        .omni-window {
          position: fixed;
          bottom: 220px;
          right: 20px;
          z-index: 9998;
          width: 370px;
          height: 540px;
          border-radius: 24px;
          overflow: hidden;
          background: #0F0F13;
          border: 1px solid rgba(255,255,255,0.08);
          box-shadow: 0 24px 80px rgba(0,0,0,0.6), 0 0 0 1px rgba(255,107,53,0.1);
          display: flex;
          flex-direction: column;
          transform-origin: bottom right;
          animation: windowIn 0.4s cubic-bezier(0.34,1.56,0.64,1) forwards;
        }
        @keyframes windowIn {
          from { opacity: 0; transform: scale(0.85) translateY(16px); }
          to { opacity: 1; transform: scale(1) translateY(0); }
        }

        .omni-header {
          padding: 18px 20px 14px;
          background: linear-gradient(135deg, rgba(255,107,53,0.15), rgba(255,60,172,0.1));
          border-bottom: 1px solid rgba(255,255,255,0.06);
          display: flex; align-items: center; gap: 12px;
        }
        .omni-avatar {
          width: 40px; height: 40px; border-radius: 50%;
          background: linear-gradient(135deg, #FF6B35, #FF3CAC);
          display: flex; align-items: center; justify-content: center;
          font-size: 18px; flex-shrink: 0;
          box-shadow: 0 4px 16px rgba(255,107,53,0.4);
        }
        .omni-header-text { flex: 1; }
        .omni-header-name { font-family: 'Syne', sans-serif; font-weight: 700; color: #fff; font-size: 15px; line-height: 1; }
        .omni-header-sub { font-size: 11px; color: rgba(255,255,255,0.45); margin-top: 3px; display: flex; align-items: center; gap: 5px; }
        .omni-dot { width: 6px; height: 6px; border-radius: 50%; background: #22c55e; animation: dotBlink 2s ease-in-out infinite; }
        @keyframes dotBlink { 0%,100%{opacity:1} 50%{opacity:0.4} }
        .omni-close { background: rgba(255,255,255,0.08); border: none; cursor: pointer; width: 30px; height: 30px; border-radius: 50%; display: flex; align-items: center; justify-content: center; color: rgba(255,255,255,0.6); transition: all 0.2s; }
        .omni-close:hover { background: rgba(255,255,255,0.15); color: #fff; }
        .omni-messages { flex: 1; overflow-y: auto; padding: 16px; display: flex; flex-direction: column; gap: 10px; scrollbar-width: thin; scrollbar-color: rgba(255,107,53,0.2) transparent; }
        .omni-messages::-webkit-scrollbar { width: 4px; }
        .omni-messages::-webkit-scrollbar-thumb { background: rgba(255,107,53,0.2); border-radius: 4px; }
        .omni-msg { display: flex; gap: 8px; animation: msgIn 0.3s ease-out; }
        @keyframes msgIn { from { opacity:0; transform:translateY(8px); } to { opacity:1; transform:translateY(0); } }
        .omni-msg.user { flex-direction: row-reverse; }
        .omni-msg-avatar { width: 28px; height: 28px; border-radius: 50%; flex-shrink: 0; margin-top: 2px; background: linear-gradient(135deg, #FF6B35, #FF3CAC); display: flex; align-items: center; justify-content: center; font-size: 13px; }
        .omni-msg.user .omni-msg-avatar { background: rgba(255,255,255,0.1); }
        .omni-bubble { max-width: 82%; padding: 10px 14px; border-radius: 16px; font-size: 13.5px; line-height: 1.55; color: rgba(255,255,255,0.88); background: rgba(255,255,255,0.07); border: 1px solid rgba(255,255,255,0.06); }
        .omni-msg.user .omni-bubble { background: linear-gradient(135deg, rgba(255,107,53,0.25), rgba(255,60,172,0.2)); border-color: rgba(255,107,53,0.25); color: #fff; border-radius: 16px 4px 16px 16px; }
        .omni-msg.assistant .omni-bubble { border-radius: 4px 16px 16px 16px; }
        .omni-typing { display: flex; gap: 5px; padding: 14px; background: rgba(255,255,255,0.07); border-radius: 4px 16px 16px 16px; border: 1px solid rgba(255,255,255,0.06); width: fit-content; }
        .omni-typing span { width: 7px; height: 7px; border-radius: 50%; background: rgba(255,107,53,0.7); animation: bounce 1.2s ease-in-out infinite; }
        .omni-typing span:nth-child(2) { animation-delay: 0.2s; }
        .omni-typing span:nth-child(3) { animation-delay: 0.4s; }
        @keyframes bounce { 0%,60%,100%{transform:translateY(0)} 30%{transform:translateY(-6px)} }
        .omni-suggestions { padding: 0 16px 12px; display: flex; flex-wrap: wrap; gap: 7px; }
        .omni-suggestion { background: rgba(255,107,53,0.1); border: 1px solid rgba(255,107,53,0.25); color: rgba(255,255,255,0.75); font-size: 12px; padding: 6px 12px; border-radius: 20px; cursor: pointer; transition: all 0.2s; white-space: nowrap; }
        .omni-suggestion:hover { background: rgba(255,107,53,0.25); color: #fff; border-color: rgba(255,107,53,0.5); }
        .omni-input-area { padding: 12px 16px 16px; border-top: 1px solid rgba(255,255,255,0.06); background: rgba(0,0,0,0.2); display: flex; gap: 10px; align-items: flex-end; }
        .omni-input { flex: 1; background: rgba(255,255,255,0.07); border: 1px solid rgba(255,255,255,0.1); border-radius: 14px; padding: 10px 14px; color: #fff; font-size: 13.5px; resize: none; outline: none; font-family: 'DM Sans', sans-serif; line-height: 1.4; max-height: 100px; min-height: 42px; transition: border 0.2s; }
        .omni-input::placeholder { color: rgba(255,255,255,0.25); }
        .omni-input:focus { border-color: rgba(255,107,53,0.5); }
        .omni-send { width: 42px; height: 42px; border-radius: 12px; border: none; cursor: pointer; background: linear-gradient(135deg, #FF6B35, #FF3CAC); display: flex; align-items: center; justify-content: center; transition: all 0.2s; flex-shrink: 0; box-shadow: 0 4px 16px rgba(255,107,53,0.35); }
        .omni-send:hover:not(:disabled) { transform: scale(1.08); box-shadow: 0 6px 20px rgba(255,107,53,0.5); }
        .omni-send:disabled { opacity: 0.45; cursor: not-allowed; }

        @media (max-width: 420px) {
          .omni-window { width: calc(100vw - 24px); right: 12px; bottom: 216px; }
          .omni-fab { bottom: 148px; right: 12px; font-size: 13px; padding: 10px 14px; }
        }
      `}</style>

      <div className="omni-chat">
        {/* biome-ignore lint/a11y/useButtonType: floating action button */}
        <button
          className="omni-fab"
          onClick={() => setIsOpen(!isOpen)}
          data-ocid="chatbot.toggle"
          aria-label={isOpen ? "Close chat" : "Open OmniBot chat"}
        >
          <svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#fff"
            strokeWidth="2.2"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            {isOpen ? (
              <>
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </>
            ) : (
              <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
            )}
          </svg>
          {isOpen ? "Close" : "OmniBot AI"}
        </button>

        {isOpen && (
          <div className="omni-window">
            <div className="omni-header">
              <div className="omni-avatar">🤖</div>
              <div className="omni-header-text">
                <div className="omni-header-name">OmniBot</div>
                <div className="omni-header-sub">
                  <div className="omni-dot" />
                  OmniSphere AI Assistant
                </div>
              </div>
              {/* biome-ignore lint/a11y/useButtonType: close button */}
              <button
                className="omni-close"
                onClick={() => setIsOpen(false)}
                data-ocid="chatbot.close_button"
                aria-label="Close chat"
              >
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  aria-hidden="true"
                >
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="18" y1="18" x2="6" y2="6" />
                </svg>
              </button>
            </div>

            <div className="omni-messages">
              {messages.map((msg, i) => (
                // biome-ignore lint/suspicious/noArrayIndexKey: stable message list
                <div key={i} className={`omni-msg ${msg.role}`}>
                  <div className="omni-msg-avatar">
                    {msg.role === "assistant" ? "🤖" : "👤"}
                  </div>
                  <div className="omni-bubble">
                    {msg.role === "assistant"
                      ? formatMessage(msg.content)
                      : msg.content}
                  </div>
                </div>
              ))}
              {loading && (
                <div className="omni-msg assistant">
                  <div className="omni-msg-avatar">🤖</div>
                  <div className="omni-typing">
                    <span />
                    <span />
                    <span />
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {showSuggestions && (
              <div className="omni-suggestions">
                {suggestedQuestions.map((q, idx) => (
                  // biome-ignore lint/a11y/useButtonType: suggestion pill button
                  <button
                    key={q}
                    className="omni-suggestion"
                    onClick={() => sendMessage(q)}
                    data-ocid={`chatbot.suggestion.${idx + 1}`}
                  >
                    {q}
                  </button>
                ))}
              </div>
            )}

            <div className="omni-input-area">
              <textarea
                ref={inputRef}
                className="omni-input"
                placeholder="Phone ke baare mein kuch pucho..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKey}
                rows={1}
                data-ocid="chatbot.input"
              />
              {/* biome-ignore lint/a11y/useButtonType: send button */}
              <button
                className="omni-send"
                onClick={() => sendMessage()}
                disabled={!input.trim() || loading}
                data-ocid="chatbot.submit_button"
                aria-label="Send message"
              >
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#fff"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <line x1="22" y1="2" x2="11" y2="13" />
                  <polygon points="22 2 15 22 11 13 2 9 22 2" />
                </svg>
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
