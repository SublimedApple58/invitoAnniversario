import { NextRequest, NextResponse } from "next/server";
import { db } from "@/db";
import { invitations } from "@/db/schema";
import { nanoid } from "nanoid";

function checkAdmin(req: NextRequest) {
  const pw = req.headers.get("x-admin-password");
  return pw === process.env.ADMIN_PASSWORD;
}

export async function GET(req: NextRequest) {
  if (!checkAdmin(req)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const all = await db.select().from(invitations).orderBy(invitations.createdAt);
  return NextResponse.json(all);
}

export async function POST(req: NextRequest) {
  if (!checkAdmin(req)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { guests } = await req.json();

  if (!Array.isArray(guests) || guests.length === 0) {
    return NextResponse.json({ error: "guests array is required" }, { status: 400 });
  }

  for (const g of guests) {
    if (!g.firstName?.trim() || !g.lastName?.trim()) {
      return NextResponse.json({ error: "Each guest needs firstName and lastName" }, { status: 400 });
    }
    if (!["M", "F"].includes(g.gender)) {
      return NextResponse.json({ error: "Each guest needs gender (M or F)" }, { status: 400 });
    }
  }

  const code = nanoid(10);

  const [invitation] = await db
    .insert(invitations)
    .values({ code, guests })
    .returning();

  return NextResponse.json(invitation, { status: 201 });
}

export async function DELETE(req: NextRequest) {
  if (!checkAdmin(req)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await req.json();

  if (!id) {
    return NextResponse.json({ error: "id is required" }, { status: 400 });
  }

  const { eq } = await import("drizzle-orm");

  await db.delete(invitations).where(eq(invitations.id, id));

  return NextResponse.json({ ok: true });
}
