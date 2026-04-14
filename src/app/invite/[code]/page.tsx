import { db } from "@/db";
import { invitations } from "@/db/schema";
import { eq } from "drizzle-orm";
import { notFound } from "next/navigation";
import Envelope from "@/components/Envelope";

export default async function InvitePage({
  params,
}: {
  params: Promise<{ code: string }>;
}) {
  const { code } = await params;

  const [invitation] = await db
    .select()
    .from(invitations)
    .where(eq(invitations.code, code));

  if (!invitation) {
    notFound();
  }

  return (
    <main className="min-h-dvh bg-background">
      <Envelope
        guests={invitation.guests}
        gender={invitation.gender}
        code={invitation.code}
        currentResponse={invitation.response}
      />
    </main>
  );
}
