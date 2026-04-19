import { pgTable, serial, varchar, text, jsonb, timestamp } from "drizzle-orm/pg-core";

export type Guest = {
  firstName: string;
  lastName: string;
  gender: "M" | "F";
};

export const invitations = pgTable("invitations", {
  id: serial("id").primaryKey(),
  code: varchar("code", { length: 12 }).unique().notNull(),
  guests: jsonb("guests").$type<Guest[]>().notNull(),
  response: varchar("response", { length: 3 }),
  dietaryNotes: text("dietary_notes"),
  respondedAt: timestamp("responded_at"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});
