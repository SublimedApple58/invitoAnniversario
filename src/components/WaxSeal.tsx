"use client";

import { motion } from "framer-motion";

export default function WaxSeal({ onClick }: { onClick: () => void }) {
  return (
    <motion.button
      onClick={onClick}
      className="relative w-20 h-20 rounded-full cursor-pointer focus:outline-none"
      whileHover={{ scale: 1.08 }}
      whileTap={{ scale: 0.95 }}
      aria-label="Apri l'invito"
    >
      {/* Wax seal base */}
      <div
        className="absolute inset-0 rounded-full"
        style={{
          background:
            "radial-gradient(circle at 35% 35%, #d4b96a, #c9a84c 40%, #a8893d 70%, #8a6f30 100%)",
          boxShadow:
            "0 4px 15px rgba(0,0,0,0.5), inset 0 2px 4px rgba(255,255,255,0.3), inset 0 -2px 4px rgba(0,0,0,0.3)",
        }}
      />

      {/* Wax drip effect — irregular edges */}
      <div
        className="absolute -inset-1 rounded-full opacity-60"
        style={{
          background:
            "radial-gradient(ellipse at 30% 80%, #c9a84c 0%, transparent 50%), radial-gradient(ellipse at 70% 20%, #c9a84c 0%, transparent 40%)",
          filter: "blur(2px)",
        }}
      />

      {/* Inner ring */}
      <div
        className="absolute inset-2 rounded-full"
        style={{
          border: "1.5px solid rgba(255,255,255,0.2)",
        }}
      />

      {/* Monogram */}
      <div className="absolute inset-0 flex items-center justify-center">
        <span
          className="font-serif text-xl"
          style={{
            color: "#faf8f5",
            textShadow: "0 1px 2px rgba(0,0,0,0.4)",
          }}
        >
          S & T
        </span>
      </div>
    </motion.button>
  );
}
