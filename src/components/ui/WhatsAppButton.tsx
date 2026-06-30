"use client";

import { MessageCircle, X } from "lucide-react";
import { useState } from "react";

const WHATSAPP_NUMBER = "2349038171393";

export default function WhatsAppButton() {
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");

  const handleSend = () => {
    const text = message || "Hello! I'm interested in your fabrics.";
    const encoded = encodeURIComponent(text);
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encoded}`, "_blank");
    setOpen(false);
    setMessage("");
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {open && (
        <div className="mb-4 bg-white rounded-2xl shadow-2xl border border-border w-80 overflow-hidden">
          <div className="bg-[#075E54] text-white p-4 flex items-center justify-between">
            <div>
              <p className="font-bold text-sm">Aba Premium Net Fabrics</p>
              <p className="text-xs text-white/70">Usually replies instantly</p>
            </div>
            <button onClick={() => setOpen(false)} className="text-white/80 hover:text-white">
              <X className="w-5 h-5" />
            </button>
          </div>
          <div className="p-4 bg-[#ECE5DD]">
            <div className="bg-white p-3 rounded-lg shadow-sm text-sm text-foreground/80">
              Hello! How can we help you today?
            </div>
          </div>
          <div className="p-3 border-t border-border">
            <div className="flex gap-2">
              <input
                type="text"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSend()}
                placeholder="Type a message..."
                className="flex-1 px-3 py-2 border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-green-500/20"
              />
              <button
                onClick={handleSend}
                className="bg-[#25D366] text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-[#20BD5A] transition-colors"
              >
                Send
              </button>
            </div>
          </div>
        </div>
      )}

      <button
        onClick={() => setOpen(!open)}
        className={`w-14 h-14 rounded-full flex items-center justify-center shadow-lg transition-all duration-300 ${
          open ? "bg-red-500 hover:bg-red-600" : "bg-[#25D366] hover:bg-[#20BD5A] animate-bounce"
        }`}
      >
        {open ? (
          <X className="w-6 h-6 text-white" />
        ) : (
          <MessageCircle className="w-7 h-7 text-white" />
        )}
      </button>
    </div>
  );
}
