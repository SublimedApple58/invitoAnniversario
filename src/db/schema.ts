import { pgTable, serial, varchar, text, timestamp } from "drizzle-orm/pg-core";

export const invitations = pgTable("invitations", {
  id: serial("id").primaryKey(),
  code: varchar("code", { length: 12 }).unique().notNull(),
  guestNames: text("guest_names").notNull(),
  response: varchar("response", { length: 3 }),
  respondedAt: timestamp("responded_at"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});
