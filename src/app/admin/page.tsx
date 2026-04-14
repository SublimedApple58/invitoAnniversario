"use client";

import { useState, useEffect, useCallback } from "react";
import AdminForm from "@/components/AdminForm";
import GuestTable from "@/components/GuestTable";

export default function AdminPage() {
  const [password, setPassword] = useState("");
  const [authenticated, setAuthenticated] = useState(false);
  const [invitations, setInvitations] = useState([]);
  const [error, setError] = useState("");

  const fetchInvitations = useCallback(async () => {
    const res = await fetch("/api/invitations", {
      headers: { "x-admin-password": password },
    });
    if (res.ok) {
      const data = await res.json();
      setInvitations(data);
    }
  }, [password]);

  useEffect(() => {
    if (authenticated) {
      fetchInvitations();
    }
  }, [authenticated, fetchInvitations]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await fetch("/api/invitations", {
      headers: { "x-admin-password": password },
    });
    if (res.ok) {
      setAuthenticated(true);
      setError("");
    } else {
      setError("Password errata");
    }
  };

  if (!authenticated) {
    return (
      <main className="min-h-dvh bg-background flex items-center justify-center px-4">
        <form onSubmit={handleLogin} className="w-full max-w-xs">
          <h1 className="font-serif text-2xl text-gold text-center mb-6">Admin</h1>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded text-cream
              placeholder:text-cream/40 focus:outline-none focus:border-gold/50 text-sm mb-3"
          />
          {error && <p className="text-red-400 text-xs mb-3">{error}</p>}
          <button
            type="submit"
            className="w-full py-3 bg-gold text-background rounded text-sm font-medium
              hover:bg-gold-light transition-colors cursor-pointer"
          >
            Accedi
          </button>
        </form>
      </main>
    );
  }

  return (
    <main className="min-h-dvh bg-background px-4 py-8">
      <div className="max-w-3xl mx-auto">
        <h1 className="font-serif text-3xl text-gold mb-8">
          Serena &amp; Tiziano — Inviti
        </h1>

        <AdminForm password={password} onCreated={fetchInvitations} />
        <GuestTable invitations={invitations} />
      </div>
    </main>
  );
}
