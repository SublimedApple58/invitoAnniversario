"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface RsvpButtonsProps {
  code: string;
  currentResponse: string | null;
}

export default function RsvpButtons({ code, currentResponse }: RsvpButtonsProps) {
  const [response, setResponse] = useState<string | null>(currentResponse);
  const [loading, setLoading] = useState(false);

  const handleRsvp = async (value: "yes" | "no") => {
    setLoading(true);
    try {
      const res = await fetch("/api/rsvp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ code, response: value }),
      });
      if (res.ok) {
        setResponse(value);
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
                <p className="font-serif text-xl text-gold mb-2">Grazie!</p>
                <p className="text-ink-light text-sm">
                  Non vediamo l&apos;ora di festeggiare insieme a voi.
                </p>
              </>
            ) : (
              <>
                <p className="font-serif text-xl text-gold mb-2">Ci mancherai!</p>
                <p className="text-ink-light text-sm">
                  Grazie per averci fatto sapere. Vi penseremo.
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
              onClick={() => handleRsvp("yes")}
              disabled={loading}
              className="w-full py-3 px-6 rounded-sm font-body text-sm tracking-widest uppercase
                bg-gold text-cream transition-all duration-300
                hover:bg-gold-light disabled:opacity-50 cursor-pointer"
            >
              Con gioia, accetto
            </button>
            <button
              onClick={() => handleRsvp("no")}
              disabled={loading}
              className="w-full py-3 px-6 rounded-sm font-body text-sm tracking-widest uppercase
                border border-ink/20 text-ink-light transition-all duration-300
                hover:border-gold/40 hover:text-ink disabled:opacity-50 cursor-pointer"
            >
              Mi dispiace, non posso
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
