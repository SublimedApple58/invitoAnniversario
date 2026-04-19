"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface RsvpButtonsProps {
  code: string;
  currentResponse: string | null;
  isSingular: boolean;
}

export default function RsvpButtons({ code, currentResponse, isSingular }: RsvpButtonsProps) {
  const [response, setResponse] = useState<string | null>(currentResponse);
  const [loading, setLoading] = useState(false);
  const [pendingChoice, setPendingChoice] = useState<"yes" | "no" | null>(null);
  const [dietaryNotes, setDietaryNotes] = useState("");
  const [showModal, setShowModal] = useState(false);

  const openModal = (choice: "yes" | "no") => {
    setPendingChoice(choice);
    setShowModal(true);
  };

  const submitRsvp = async () => {
    if (!pendingChoice) return;
    setLoading(true);
    try {
      const res = await fetch("/api/rsvp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          code,
          response: pendingChoice,
          dietaryNotes: dietaryNotes.trim() || null,
        }),
      });
      if (res.ok) {
        setResponse(pendingChoice);
        setShowModal(false);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mt-8">
      <AnimatePresence mode="wait">
        {response ? (
          <motion.div
            key="confirmed"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center"
          >
            {response === "yes" ? (
              <>
                <p className="font-body text-xl text-gold uppercase tracking-wider mb-2">Grazie!</p>
                <p className="text-ink-light text-sm uppercase tracking-wider">
                  {isSingular
                    ? "Non vediamo l'ora di averti con noi!"
                    : "Non vediamo l'ora di avervi con noi!"}
                </p>
              </>
            ) : (
              <>
                <p className="font-body text-xl text-gold uppercase tracking-wider mb-2">
                  {isSingular ? "Ci mancherai!" : "Ci mancherete!"}
                </p>
                <p className="text-ink-light text-sm uppercase tracking-wider">
                  {isSingular
                    ? "Peccato, ci mancherai!"
                    : "Peccato, ci mancherete!"}
                </p>
              </>
            )}
          </motion.div>
        ) : (
          <motion.div
            key="buttons"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex flex-col gap-3"
          >
            <button
              onClick={() => openModal("yes")}
              disabled={loading}
              className="w-full py-3 px-6 rounded-sm font-body text-sm tracking-widest uppercase
                bg-gold text-cream transition-all duration-300
                hover:bg-gold-light disabled:opacity-50 cursor-pointer"
            >
              {isSingular ? "Ci sarò!" : "Ci saremo!"}
            </button>
            <button
              onClick={() => openModal("no")}
              disabled={loading}
              className="w-full py-3 px-6 rounded-sm font-body text-sm tracking-widest uppercase
                border border-ink/20 text-ink-light transition-all duration-300
                hover:border-gold/40 hover:text-ink disabled:opacity-50 cursor-pointer"
            >
              {isSingular ? "Purtroppo non posso" : "Purtroppo non possiamo"}
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Modal */}
      <AnimatePresence>
        {showModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center px-6"
            style={{ backgroundColor: "rgba(0,0,0,0.6)" }}
            onClick={() => setShowModal(false)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ duration: 0.25 }}
              className="bg-cream rounded-lg p-6 w-full max-w-sm shadow-xl"
              onClick={(e) => e.stopPropagation()}
            >
              <p className="font-body text-ink text-sm uppercase tracking-wider text-center mb-1">
                Un&apos;ultima cosa!
              </p>
              <p className="font-body text-ink-light text-xs text-center mb-4">
                {isSingular
                  ? "Hai intolleranze o preferenze alimentari che dovremmo sapere?"
                  : "Avete intolleranze o preferenze alimentari che dovremmo sapere?"}
              </p>

              <textarea
                value={dietaryNotes}
                onChange={(e) => setDietaryNotes(e.target.value)}
                placeholder="Es. celiaco, allergico ai crostacei, vegetariano..."
                rows={3}
                className="w-full px-3 py-2 bg-white border border-ink/10 rounded text-ink text-sm
                  placeholder:text-ink-light/50 focus:outline-none focus:border-gold/50 resize-none"
              />

              <div className="flex gap-3 mt-4">
                <button
                  onClick={submitRsvp}
                  disabled={loading}
                  className="flex-1 py-2.5 rounded-sm font-body text-sm tracking-wider uppercase
                    bg-gold text-cream hover:bg-gold-light disabled:opacity-50 transition-colors cursor-pointer"
                >
                  {loading ? "..." : "Conferma"}
                </button>
                <button
                  onClick={() => setShowModal(false)}
                  className="px-4 py-2.5 rounded-sm font-body text-xs tracking-wider uppercase
                    border border-ink/15 text-ink-light hover:border-ink/30 transition-colors cursor-pointer"
                >
                  Annulla
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
