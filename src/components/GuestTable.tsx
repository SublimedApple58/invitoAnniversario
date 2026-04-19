"use client";

import { useState } from "react";
import type { Guest } from "@/db/schema";

interface Invitation {
  id: number;
  code: string;
  guests: Guest[];
  response: string | null;
  dietaryNotes: string | null;
  respondedAt: string | null;
  createdAt: string;
}

interface GuestTableProps {
  invitations: Invitation[];
  password: string;
  onDeleted: () => void;
}

function formatNames(guests: Guest[]) {
  return guests.map((g) => g.lastName ? `${g.firstName} ${g.lastName}` : g.firstName).join(", ");
}

function CopyLinkButton({ code }: { code: string }) {
  const [copied, setCopied] = useState(false);
  const url = typeof window !== "undefined"
    ? `${window.location.origin}/invite/${code}`
    : `/invite/${code}`;

  const copy = async () => {
    await navigator.clipboard.writeText(url);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <button
      onClick={copy}
      className="text-xs text-gold/70 hover:text-gold transition-colors cursor-pointer flex items-center gap-1.5"
    >
      <svg className="w-3 h-3 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
          d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
      </svg>
      {copied ? "Copiato!" : "Copia link"}
    </button>
  );
}

type Filter = "all" | "yes" | "no" | "pending";

export default function GuestTable({ invitations, password, onDeleted }: GuestTableProps) {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState<Filter>("all");
  const [deleting, setDeleting] = useState<number | null>(null);

  const total = invitations.length;
  const accepted = invitations.filter((i) => i.response === "yes").length;
  const declined = invitations.filter((i) => i.response === "no").length;
  const pending = invitations.filter((i) => !i.response).length;

  const filtered = invitations.filter((inv) => {
    const matchesSearch = search === "" ||
      formatNames(inv.guests).toLowerCase().includes(search.toLowerCase());

    const matchesFilter =
      filter === "all" ||
      (filter === "yes" && inv.response === "yes") ||
      (filter === "no" && inv.response === "no") ||
      (filter === "pending" && !inv.response);

    return matchesSearch && matchesFilter;
  });

  const handleDelete = async (id: number) => {
    if (!confirm("Sei sicuro di voler eliminare questo invito?")) return;
    setDeleting(id);
    try {
      await fetch("/api/invitations", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          "x-admin-password": password,
        },
        body: JSON.stringify({ id }),
      });
      onDeleted();
    } finally {
      setDeleting(null);
    }
  };

  const statusBadge = (response: string | null) => {
    switch (response) {
      case "yes":
        return (
          <span className="px-2 py-0.5 rounded-full text-xs bg-green-500/20 text-green-400">
            Confermato
          </span>
        );
      case "no":
        return (
          <span className="px-2 py-0.5 rounded-full text-xs bg-red-500/20 text-red-400">
            Rifiutato
          </span>
        );
      default:
        return (
          <span className="px-2 py-0.5 rounded-full text-xs bg-yellow-500/20 text-yellow-400">
            In attesa
          </span>
        );
    }
  };

  const filterBtn = (label: string, value: Filter, count: number) => (
    <button
      onClick={() => setFilter(filter === value ? "all" : value)}
      className={`px-3 py-1.5 rounded text-xs transition-colors cursor-pointer ${
        filter === value
          ? "bg-gold text-background"
          : "bg-white/5 text-cream/50 hover:bg-white/10"
      }`}
    >
      {label} ({count})
    </button>
  );

  return (
    <div>
      {/* Counters */}
      <div className="grid grid-cols-4 gap-3 mb-6">
        <div className="bg-white/5 border border-white/10 rounded-lg p-4 text-center">
          <p className="text-2xl font-serif text-cream">{total}</p>
          <p className="text-xs text-cream/50 mt-1">Totale</p>
        </div>
        <div className="bg-green-500/5 border border-green-500/20 rounded-lg p-4 text-center">
          <p className="text-2xl font-serif text-green-400">{accepted}</p>
          <p className="text-xs text-green-400/60 mt-1">Si</p>
        </div>
        <div className="bg-red-500/5 border border-red-500/20 rounded-lg p-4 text-center">
          <p className="text-2xl font-serif text-red-400">{declined}</p>
          <p className="text-xs text-red-400/60 mt-1">No</p>
        </div>
        <div className="bg-yellow-500/5 border border-yellow-500/20 rounded-lg p-4 text-center">
          <p className="text-2xl font-serif text-yellow-400">{pending}</p>
          <p className="text-xs text-yellow-400/60 mt-1">In attesa</p>
        </div>
      </div>

      {/* Search + Filters */}
      <div className="flex flex-col sm:flex-row gap-3 mb-4">
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Cerca invitato..."
          className="flex-1 px-4 py-2 bg-white/10 border border-white/20 rounded text-cream text-sm
            placeholder:text-cream/40 focus:outline-none focus:border-gold/50"
        />
        <div className="flex gap-2">
          {filterBtn("Confermati", "yes", accepted)}
          {filterBtn("Rifiutati", "no", declined)}
          {filterBtn("In attesa", "pending", pending)}
        </div>
      </div>

      {/* Table */}
      {invitations.length === 0 ? (
        <p className="text-cream/40 text-sm text-center py-8">
          Nessun invito creato ancora.
        </p>
      ) : filtered.length === 0 ? (
        <p className="text-cream/40 text-sm text-center py-8">
          Nessun risultato.
        </p>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-white/10 text-left">
                <th className="pb-3 text-cream/60 font-normal">Ospiti</th>
                <th className="pb-3 text-cream/60 font-normal">Link</th>
                <th className="pb-3 text-cream/60 font-normal">Stato</th>
                <th className="pb-3 text-cream/60 font-normal">Note alimentari</th>
                <th className="pb-3 text-cream/60 font-normal">Data risposta</th>
                <th className="pb-3 text-cream/60 font-normal"></th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((inv) => (
                <tr key={inv.id} className="border-b border-white/5">
                  <td className="py-3 text-cream">{formatNames(inv.guests)}</td>
                  <td className="py-3">
                    <CopyLinkButton code={inv.code} />
                  </td>
                  <td className="py-3">{statusBadge(inv.response)}</td>
                  <td className="py-3 text-cream/50 text-xs max-w-[150px]">
                    {inv.dietaryNotes || "—"}
                  </td>
                  <td className="py-3 text-cream/40 text-xs">
                    {inv.respondedAt
                      ? new Date(inv.respondedAt).toLocaleDateString("it-IT", {
                          day: "numeric",
                          month: "short",
                          year: "numeric",
                          hour: "2-digit",
                          minute: "2-digit",
                        })
                      : "—"}
                  </td>
                  <td className="py-3">
                    <button
                      onClick={() => handleDelete(inv.id)}
                      disabled={deleting === inv.id}
                      className="text-red-400/40 hover:text-red-400 transition-colors cursor-pointer disabled:opacity-30"
                      title="Elimina invito"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
                          d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
