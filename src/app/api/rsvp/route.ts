import { NextRequest, NextResponse } from "next/server";
import { db } from "@/db";
import { invitations } from "@/db/schema";
import { eq } from "drizzle-orm";

export async function POST(req: NextRequest) {
  const { code, response, dietaryNotes } = await req.json();

  if (!code || !response || !["yes", "no"].includes(response)) {
    return NextResponse.json(
      { error: "code and response (yes/no) are required" },
      { status: 400 }
    );
  }

  const [invitation] = await db
    .select()
    .from(invitations)
    .where(eq(invitations.code, code));

  if (!invitation) {
    return NextResponse.json({ error: "Invitation not found" }, { status: 404 });
  }

  const [updated] = await db
    .update(invitations)
    .set({
      response,
      dietaryNotes: dietaryNotes?.trim() || null,
      respondedAt: new Date(),
    })
    .where(eq(invitations.code, code))
    .returning();

  return NextResponse.json(updated);
}
