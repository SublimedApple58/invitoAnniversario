import { pgTable, serial, varchar, jsonb, timestamp } from "drizzle-orm/pg-core";

export type Guest = {
  firstName: string;
  lastName: string;
};

export const invitations = pgTable("invitations", {
  id: serial("id").primaryKey(),
  code: varchar("code", { length: 12 }).unique().notNull(),
  guests: jsonb("guests").$type<Guest[]>().notNull(),
  gender: varchar("gender", { length: 2 }).notNull(), // 'M' or 'F'
  response: varchar("response", { length: 3 }),
  respondedAt: timestamp("responded_at"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});
