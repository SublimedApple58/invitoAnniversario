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

  const { guestNames } = await req.json();

  if (!guestNames || typeof guestNames !== "string") {
    return NextResponse.json({ error: "guest_names is required" }, { status: 400 });
  }

  const code = nanoid(10);

  const [invitation] = await db
    .insert(invitations)
    .values({ code, guestNames })
    .returning();

  return NextResponse.json(invitation, { status: 201 });
}
