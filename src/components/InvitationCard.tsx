"use client";

import { motion } from "framer-motion";
import RsvpButtons from "./RsvpButtons";

interface InvitationCardProps {
  guestNames: string;
  code: string;
  currentResponse: string | null;
}

export default function InvitationCard({
  guestNames,
  code,
  currentResponse,
}: InvitationCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8, delay: 0.3 }}
      className="w-full max-w-sm mx-auto"
    >
      <div
        className="relative bg-cream rounded-sm px-8 py-10 lace-border ornament-corner"
        style={{
          boxShadow: "0 8px 32px rgba(0,0,0,0.3), 0 2px 8px rgba(0,0,0,0.2)",
        }}
      >
        {/* Top decorative line */}
        <div className="flex items-center justify-center mb-6">
          <div className="h-px w-12 bg-gold/30" />
          <span className="mx-3 text-gold text-xs tracking-[0.3em]">✦</span>
          <div className="h-px w-12 bg-gold/30" />
        </div>

        {/* Guest greeting */}
        <p className="font-body text-ink-light text-sm tracking-wider text-center mb-1">
          {guestNames.split(" ").length > 2 ? "Cari" : "Caro/a"}
        </p>
        <p className="font-serif text-ink text-2xl text-center mb-6 italic">
          {guestNames}
        </p>

        {/* Divider */}
        <div className="h-px w-16 bg-gold/30 mx-auto mb-6" />

        {/* Invitation text */}
        <p className="font-body text-ink text-center text-base leading-relaxed mb-2">
          Serena &amp; Tiziano
        </p>
        <p className="font-body text-ink-light text-center text-sm leading-relaxed mb-6">
          vi invitano a festeggiare il loro
          <br />
          <span className="font-serif text-lg text-ink italic">
            1° Anniversario di Matrimonio
          </span>
        </p>

        {/* Date */}
        <div className="text-center mb-6">
          <p className="font-body text-gold text-xs tracking-[0.4em] uppercase mb-1">
            Sabato
          </p>
          <p className="font-serif text-ink text-3xl italic">30 Maggio</p>
          <p className="font-serif text-ink text-lg">2026</p>
        </div>

        {/* Time and Location */}
        <div className="text-center mb-4">
          <p className="font-body text-ink text-sm">
            ore <span className="font-serif text-lg italic">19:30</span>
          </p>
          <p className="font-body text-ink-light text-xs tracking-wider mt-2 uppercase">
            Luogo da confermare
          </p>
        </div>

        {/* Google Maps button */}
        <div className="flex justify-center mb-2">
          <a
            href="https://maps.google.com"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-xs text-gold tracking-wider uppercase
              border-b border-gold/30 pb-0.5 hover:border-gold/60 transition-colors"
          >
            <svg
              className="w-3 h-3"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
              />
            </svg>
            Apri in Google Maps
          </a>
        </div>

        {/* Divider before RSVP */}
        <div className="flex items-center justify-center my-6">
          <div className="h-px w-8 bg-gold/30" />
          <span className="mx-3 text-gold text-xs tracking-[0.3em]">✦</span>
          <div className="h-px w-8 bg-gold/30" />
        </div>

        {/* RSVP section */}
        <p className="font-body text-ink-light text-xs text-center tracking-widest uppercase mb-1">
          Conferma la tua presenza
        </p>

        <RsvpButtons code={code} currentResponse={currentResponse} />

        {/* Bottom decorative line */}
        <div className="flex items-center justify-center mt-8">
          <div className="h-px w-12 bg-gold/30" />
          <span className="mx-3 text-gold text-xs tracking-[0.3em]">✦</span>
          <div className="h-px w-12 bg-gold/30" />
        </div>
      </div>
    </motion.div>
  );
}
