"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import WaxSeal from "./WaxSeal";
import InvitationCard from "./InvitationCard";
import type { Guest } from "@/db/schema";

interface EnvelopeProps {
  guests: Guest[];
  code: string;
  currentResponse: string | null;
}

export default function Envelope({ guests, code, currentResponse }: EnvelopeProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative flex flex-col items-center justify-center min-h-dvh">
      <AnimatePresence mode="wait">
        {!isOpen ? (
          <motion.div
            key="envelope"
            className="flex flex-col items-center"
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.4 }}
          >
            {/* Envelope */}
            <div className="relative w-72 h-48 sm:w-80 sm:h-52">
              <div
                className="absolute inset-0 rounded-sm"
                style={{
                  background: "linear-gradient(180deg, #f5f0e8 0%, #ede7db 100%)",
                  boxShadow: "0 8px 30px rgba(0,0,0,0.4), 0 2px 8px rgba(0,0,0,0.2)",
                }}
              />
              <div
                className="absolute -top-0.5 left-0 right-0"
                style={{
                  height: "50%",
                  clipPath: "polygon(0 0, 100% 0, 50% 100%)",
                  background: "linear-gradient(180deg, #ede7db 0%, #e8e0d2 100%)",
                  borderBottom: "1px solid rgba(0, 0, 0, 0.1)",
                }}
              />
              <div
                className="absolute inset-0 rounded-sm"
                style={{
                  background: "linear-gradient(0deg, transparent 60%, rgba(0,0,0,0.03) 100%)",
                }}
              />
            </div>

            <div className="-mt-12 z-10">
              <WaxSeal onClick={() => setIsOpen(true)} />
            </div>

            <motion.p
              className="mt-6 font-body text-cream/60 text-xs tracking-[0.3em] uppercase"
              animate={{ opacity: [0.4, 0.8, 0.4] }}
              transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
            >
              Tocca il sigillo per aprire
            </motion.p>
          </motion.div>
        ) : (
          <motion.div
            key="card"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="w-full flex justify-center"
          >
            <InvitationCard
              guests={guests}
              code={code}
              currentResponse={currentResponse}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
