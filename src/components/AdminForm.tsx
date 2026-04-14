"use client";

import { useState } from "react";

interface AdminFormProps {
  password: string;
  onCreated: () => void;
}

export default function AdminForm({ password, onCreated }: AdminFormProps) {
  const [guestNames, setGuestNames] = useState("");
  const [link, setLink] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!guestNames.trim()) return;

    setLoading(true);
    setLink(null);
    try {
      const res = await fetch("/api/invitations", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-admin-password": password,
        },
        body: JSON.stringify({ guestNames: guestNames.trim() }),
      });
      const data = await res.json();
      if (res.ok) {
        const url = `${window.location.origin}/invite/${data.code}`;
        setLink(url);
        setGuestNames("");
        onCreated();
      }
    } finally {
      setLoading(false);
    }
  };

  const copyLink = async () => {
    if (!link) return;
    await navigator.clipboard.writeText(link);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="bg-white/5 border border-white/10 rounded-lg p-6 mb-8">
      <h2 className="text-lg font-serif text-gold mb-4">Crea nuovo invito</h2>
      <form onSubmit={handleSubmit} className="flex gap-3">
        <input
          type="text"
          value={guestNames}
          onChange={(e) => setGuestNames(e.target.value)}
          placeholder="Nome/i invitato/i"
          className="flex-1 px-4 py-2 bg-white/10 border border-white/20 rounded text-cream
            placeholder:text-cream/40 focus:outline-none focus:border-gold/50 text-sm"
        />
        <button
          type="submit"
          disabled={loading || !guestNames.trim()}
          className="px-6 py-2 bg-gold text-background rounded text-sm font-medium
            hover:bg-gold-light disabled:opacity-50 transition-colors cursor-pointer"
        >
          {loading ? "..." : "Crea"}
        </button>
      </form>

      {link && (
        <div className="mt-4 flex items-center gap-2">
          <input
            type="text"
            readOnly
            value={link}
            className="flex-1 px-3 py-2 bg-white/5 border border-gold/30 rounded text-cream text-xs"
          />
          <button
            onClick={copyLink}
            className="px-4 py-2 border border-gold/30 text-gold rounded text-xs
              hover:bg-gold/10 transition-colors cursor-pointer"
          >
            {copied ? "Copiato!" : "Copia"}
          </button>
        </div>
      )}
    </div>
  );
}
