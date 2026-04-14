import { NextRequest, NextResponse } from "next/server";
import { db } from "@/db";
import { invitations } from "@/db/schema";
import { eq } from "drizzle-orm";

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ code: string }> }
) {
  const { code } = await params;

  const [invitation] = await db
    .select()
    .from(invitations)
    .where(eq(invitations.code, code));

  if (!invitation) {
    return NextResponse.json({ error: "Invitation not found" }, { status: 404 });
  }

  return NextResponse.json(invitation);
}
