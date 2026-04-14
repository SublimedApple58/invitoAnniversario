"use client";

import { motion } from "framer-motion";
import RsvpButtons from "./RsvpButtons";
import type { Guest } from "@/db/schema";

interface InvitationCardProps {
  guests: Guest[];
  code: string;
  currentResponse: string | null;
}

function getGreeting(guests: Guest[]) {
  if (guests.length === 1) {
    return guests[0].gender === "F" ? "Cara" : "Caro";
  }
  const allFemale = guests.every((g) => g.gender === "F");
  return allFemale ? "Care" : "Cari";
}

/**
 * Groups guests by last name and formats them.
 * Same surname: "Marco e Giulia Rossi"
 * Different surnames: separate lines
 */
function formatGuestLines(guests: Guest[]): string[] {
  const groups = new Map<string, string[]>();
  const order: string[] = [];

  for (const g of guests) {
    if (!groups.has(g.lastName)) {
      groups.set(g.lastName, []);
      order.push(g.lastName);
    }
    groups.get(g.lastName)!.push(g.firstName);
  }

  return order.map((lastName) => {
    const firstNames = groups.get(lastName)!;
    const joined =
      firstNames.length === 1
        ? firstNames[0]
        : firstNames.slice(0, -1).join(", ") + " e " + firstNames[firstNames.length - 1];
    return `${joined} ${lastName}`;
  });
}

export default function InvitationCard({
  guests,
  code,
  currentResponse,
}: InvitationCardProps) {
  const greeting = getGreeting(guests);
  const nameLines = formatGuestLines(guests);
  const isSingular = guests.length === 1;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8, delay: 0.3 }}
      className="w-full max-w-sm mx-auto"
    >
      <div
        className="relative bg-cream rounded-sm px-8 py-10 lace-border"
        style={{
          boxShadow: "0 8px 32px rgba(0,0,0,0.3), 0 2px 8px rgba(0,0,0,0.2)",
        }}
      >
        {/* Top decorative line */}
        <div className="flex items-center justify-center mb-6">
          <div className="h-px w-12 bg-ink/10" />
          <span className="mx-3 text-ink/30 text-xs tracking-[0.3em]">&#10043;</span>
          <div className="h-px w-12 bg-ink/10" />
        </div>

        {/* Guest greeting */}
        <p className="font-body text-ink-light text-sm tracking-wider text-center uppercase mb-1">
          {greeting}
        </p>
        {nameLines.map((line, i) => (
          <p key={i} className="font-serif text-ink text-2xl text-center italic">
            {line}
          </p>
        ))}

        {/* Divider */}
        <div className="h-px w-16 bg-ink/10 mx-auto my-6" />

        {/* Invitation text */}
        <p className="font-serif text-ink text-center text-lg italic mb-2">
          Serena &amp; Tiziano
        </p>
        <p className="font-body text-ink-light text-center text-sm leading-relaxed uppercase tracking-wider mb-1">
          {isSingular ? "ti invitano a festeggiare" : "vi invitano a festeggiare"}
        </p>
        <p className="font-body text-ink-light text-center text-sm leading-relaxed uppercase tracking-wider mb-6">
          il loro 1&#176; anniversario di matrimonio
        </p>

        {/* Date */}
        <div className="text-center mb-6">
          <p className="font-body text-gold text-xs tracking-[0.4em] uppercase mb-1">
            Sabato
          </p>
          <p className="font-body text-ink text-2xl uppercase tracking-wider">
            30 Maggio
          </p>
          <p className="font-body text-ink text-lg uppercase tracking-wider">2026</p>
        </div>

        {/* Time and Location */}
        <div className="text-center mb-4">
          <p className="font-body text-ink text-sm uppercase tracking-wider">
            ore 19:30
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
          <div className="h-px w-8 bg-ink/10" />
          <span className="mx-3 text-ink/30 text-xs tracking-[0.3em]">&#10043;</span>
          <div className="h-px w-8 bg-ink/10" />
        </div>

        {/* RSVP section */}
        <p className="font-body text-ink-light text-xs text-center tracking-widest uppercase mb-1">
          {isSingular ? "Conferma la tua presenza" : "Confermate la vostra presenza"}
        </p>

        <RsvpButtons code={code} currentResponse={currentResponse} isSingular={isSingular} />

        {/* Bottom decorative line */}
        <div className="flex items-center justify-center mt-8">
          <div className="h-px w-12 bg-ink/10" />
          <span className="mx-3 text-ink/30 text-xs tracking-[0.3em]">&#10043;</span>
          <div className="h-px w-12 bg-ink/10" />
        </div>
      </div>
    </motion.div>
  );
}
