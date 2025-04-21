import { integer, pgTable, serial, varchar, timestamp } from "drizzle-orm/pg-core";

export const recordsTable = pgTable("records", {
    id: serial("id").primaryKey(),
    userId: varchar("user_id", { length: 255 }).notNull(),
    amount: integer("amount").notNull(), // amount in cents
    title: varchar("title", { length: 255 }).notNull(),
    date: timestamp("date").notNull(),
    createdAt: timestamp("created_at").notNull().defaultNow(),
})