"use client";

import { useState } from "react";

interface AdminFormProps {
  password: string;
  onCreated: () => void;
}

interface GuestInput {
  firstName: string;
  lastName: string;
}

export default function AdminForm({ password, onCreated }: AdminFormProps) {
  const [guests, setGuests] = useState<GuestInput[]>([{ firstName: "", lastName: "" }]);
  const [gender, setGender] = useState<"M" | "F">("M");
  const [link, setLink] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);

  const updateGuest = (index: number, field: keyof GuestInput, value: string) => {
    setGuests((prev) =>
      prev.map((g, i) => (i === index ? { ...g, [field]: value } : g))
    );
  };

  const addGuest = () => {
    setGuests((prev) => [...prev, { firstName: "", lastName: "" }]);
  };

  const removeGuest = (index: number) => {
    if (guests.length <= 1) return;
    setGuests((prev) => prev.filter((_, i) => i !== index));
  };

  const isValid = guests.every((g) => g.firstName.trim() && g.lastName.trim());

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isValid) return;

    setLoading(true);
    setLink(null);
    try {
      const res = await fetch("/api/invitations", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-admin-password": password,
        },
        body: JSON.stringify({
          guests: guests.map((g) => ({
            firstName: g.firstName.trim(),
            lastName: g.lastName.trim(),
          })),
          gender,
        }),
      });
      const data = await res.json();
      if (res.ok) {
        const url = `${window.location.origin}/invite/${data.code}`;
        setLink(url);
        setGuests([{ firstName: "", lastName: "" }]);
        setGender("M");
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
      <form onSubmit={handleSubmit}>
        {/* Gender selector */}
        <div className="flex gap-3 mb-4">
          <label className="text-cream/60 text-sm self-center mr-2">Genere:</label>
          <button
            type="button"
            onClick={() => setGender("M")}
            className={`px-4 py-1.5 rounded text-sm transition-colors cursor-pointer ${
              gender === "M"
                ? "bg-gold text-background"
                : "bg-white/10 text-cream/60 hover:bg-white/15"
            }`}
          >
            Maschile
          </button>
          <button
            type="button"
            onClick={() => setGender("F")}
            className={`px-4 py-1.5 rounded text-sm transition-colors cursor-pointer ${
              gender === "F"
                ? "bg-gold text-background"
                : "bg-white/10 text-cream/60 hover:bg-white/15"
            }`}
          >
            Femminile
          </button>
        </div>

        {/* Guest inputs */}
        <div className="space-y-3 mb-4">
          {guests.map((guest, i) => (
            <div key={i} className="flex gap-2 items-center">
              <span className="text-cream/40 text-xs w-5 text-right">{i + 1}.</span>
              <input
                type="text"
                value={guest.firstName}
                onChange={(e) => updateGuest(i, "firstName", e.target.value)}
                placeholder="Nome"
                className="flex-1 px-3 py-2 bg-white/10 border border-white/20 rounded text-cream
                  placeholder:text-cream/40 focus:outline-none focus:border-gold/50 text-sm"
              />
              <input
                type="text"
                value={guest.lastName}
                onChange={(e) => updateGuest(i, "lastName", e.target.value)}
                placeholder="Cognome"
                className="flex-1 px-3 py-2 bg-white/10 border border-white/20 rounded text-cream
                  placeholder:text-cream/40 focus:outline-none focus:border-gold/50 text-sm"
              />
              {guests.length > 1 && (
                <button
                  type="button"
                  onClick={() => removeGuest(i)}
                  className="text-red-400/60 hover:text-red-400 text-lg px-1 cursor-pointer"
                >
                  &times;
                </button>
              )}
            </div>
          ))}
        </div>

        {/* Add guest + Submit */}
        <div className="flex gap-3">
          <button
            type="button"
            onClick={addGuest}
            className="px-4 py-2 border border-white/20 text-cream/60 rounded text-sm
              hover:border-gold/40 hover:text-cream transition-colors cursor-pointer"
          >
            + Aggiungi invitato
          </button>
          <button
            type="submit"
            disabled={loading || !isValid}
            className="px-6 py-2 bg-gold text-background rounded text-sm font-medium
              hover:bg-gold-light disabled:opacity-50 transition-colors cursor-pointer ml-auto"
          >
            {loading ? "..." : "Crea invito"}
          </button>
        </div>
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
