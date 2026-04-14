"use client";

interface Invitation {
  id: number;
  code: string;
  guestNames: string;
  response: string | null;
  respondedAt: string | null;
  createdAt: string;
}

interface GuestTableProps {
  invitations: Invitation[];
}

export default function GuestTable({ invitations }: GuestTableProps) {
  const total = invitations.length;
  const accepted = invitations.filter((i) => i.response === "yes").length;
  const declined = invitations.filter((i) => i.response === "no").length;
  const pending = invitations.filter((i) => !i.response).length;

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
          <p className="text-xs text-green-400/60 mt-1">Sì</p>
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

      {/* Table */}
      {invitations.length === 0 ? (
        <p className="text-cream/40 text-sm text-center py-8">
          Nessun invito creato ancora.
        </p>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-white/10 text-left">
                <th className="pb-3 text-cream/60 font-normal">Ospite</th>
                <th className="pb-3 text-cream/60 font-normal">Link</th>
                <th className="pb-3 text-cream/60 font-normal">Stato</th>
                <th className="pb-3 text-cream/60 font-normal">Data risposta</th>
              </tr>
            </thead>
            <tbody>
              {invitations.map((inv) => (
                <tr key={inv.id} className="border-b border-white/5">
                  <td className="py-3 text-cream">{inv.guestNames}</td>
                  <td className="py-3">
                    <code className="text-xs text-gold/70">/invite/{inv.code}</code>
                  </td>
                  <td className="py-3">{statusBadge(inv.response)}</td>
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
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
