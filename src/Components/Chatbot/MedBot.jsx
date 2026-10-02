import React, { useState } from "react";
import "./MedBot.css";

const knowledgeBase = [
  {
    triggers: ["tax", "80g", "receipt", "deduction", "certificate"],
    answer: "You can generate an official Section 80G Tax Exemption Certificate right on our platform! Go to the 'Certificate' tab, enter your donation details, and download the verified PDF/Print receipt with a verification QR code."
  },
  {
    triggers: ["cold", "chain", "insulin", "refrigerated", "vaccine", "biologic"],
    answer: "Yes! Donated Insulin, Biologics, and Vaccines require 2°C - 8°C cold-chain transport. Please filter for 'Biologics & Cold-Chain' in our Donation Centers directory to locate certified facilities with active temperature monitors."
  },
  {
    triggers: ["expired", "expiry", "near", "waste", "disposal"],
    answer: "Medicines with at least 1 month remaining before expiry can be accepted. Expired medicines CANNOT be dispensed to patients; however, select centers accept expired medicines for safe pharmaceutical eco-incineration."
  },
  {
    triggers: ["opened", "strip", "syrup", "bottle", "loose"],
    answer: "Tablets and capsules must have intact blister packaging with the expiry date and batch number visible. Opened syrups, eye drops, or loose unsealed pills cannot be accepted due to safety guidelines."
  },
  {
    triggers: ["emergency", "sos", "shortage", "urgent", "icu"],
    answer: "For emergency hospital ICU shortages, visit our '🚨 Emergency SOS' portal. We use AI matching to dispatch available stockpiles within 45 minutes across regional donation centers."
  },
  {
    triggers: ["scan", "ocr", "camera", "photo", "label"],
    answer: "Our AI Medicine Scanner (`/scanner`) allows you to upload or capture any medicine label. It uses optical character recognition to read the batch code, expiry date, and issue an automated eligibility verdict!"
  }
];

function MedBot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      sender: "bot",
      text: "Hello! I am MedBot AI 🤖. How can I assist you with medicine donations, guidelines, 80G tax certificates, or emergency SOS today?"
    }
  ]);
  const [inputVal, setInputVal] = useState("");
  const [hasUnread, setHasUnread] = useState(true);

  const handleSend = (textToSend) => {
    const text = textToSend || inputVal;
    if (!text.trim()) return;

    const userMsg = { sender: "user", text };
    setMessages((prev) => [...prev, userMsg]);
    setInputVal("");

    // Find bot answer
    setTimeout(() => {
      const lower = text.toLowerCase();
      let match = knowledgeBase.find((kb) =>
        kb.triggers.some((trig) => lower.includes(trig))
      );

      let reply = match
        ? match.answer
        : "I can help with donation guidelines, finding nearby centers, 80G certificates, AI OCR scanning, and emergency SOS requests. Feel free to ask or click one of the quick options below!";

      setMessages((prev) => [...prev, { sender: "bot", text: reply }]);
    }, 450);
  };

  const handleToggle = () => {
    setIsOpen(!isOpen);
    if (!isOpen) setHasUnread(false);
  };

  return (
    <>
      {/* Floating Trigger Button */}
      <button className="medbot-trigger-btn" onClick={handleToggle} title="Ask MedBot AI">
        <span>🤖</span>
        {hasUnread && !isOpen && <span className="medbot-unread-dot"></span>}
      </button>

      {/* Chat Window */}
      {isOpen && (
        <div className="medbot-chat-window">
          <div className="medbot-header">
            <div className="medbot-header-info">
              <span style={{ fontSize: "1.4rem" }}>🤖</span>
              <div>
                <h4>MedBot AI Assistant</h4>
                <span>Online • Instant Donation Guide</span>
              </div>
            </div>
            <button className="medbot-close-btn" onClick={() => setIsOpen(false)}>
              ✕
            </button>
          </div>

          <div className="medbot-messages-area">
            {messages.map((m, idx) => (
              <div key={idx} className={`medbot-msg-bubble ${m.sender}`}>
                {m.text}
              </div>
            ))}

            {/* Quick Suggestions */}
            <div className="medbot-quick-pills">
              <button
                className="medbot-pill-btn"
                onClick={() => handleSend("How do I get an 80G Tax Exemption Certificate?")}
              >
                📜 80G Tax Exemption
              </button>
              <button
                className="medbot-pill-btn"
                onClick={() => handleSend("Can I donate opened syrup bottles or loose pills?")}
              >
                💊 Opened Medicines
              </button>
              <button
                className="medbot-pill-btn"
                onClick={() => handleSend("Where can I donate cold-chain insulin?")}
              >
                ❄️ Cold-Chain Insulin
              </button>
              <button
                className="medbot-pill-btn"
                onClick={() => handleSend("What is Emergency SOS dispatch?")}
              >
                🚨 Emergency SOS
              </button>
            </div>
          </div>

          <form
            className="medbot-input-bar"
            onSubmit={(e) => {
              e.preventDefault();
              handleSend();
            }}
          >
            <input
              type="text"
              className="medbot-input-field"
              placeholder="Ask anything about donations, centers..."
              value={inputVal}
              onChange={(e) => setInputVal(e.target.value)}
            />
            <button type="submit" className="medbot-send-btn">
              ➤
            </button>
          </form>
        </div>
      )}
    </>
  );
}

export default MedBot;
