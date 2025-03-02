import { pgEnum, pgTable, text, timestamp } from "drizzle-orm/pg-core";

export const eventType = pgEnum("event_type", ["online", "live"]);

export const events = pgTable("events", {
  id: text("id").primaryKey(),
  createdAt: timestamp("created_at").notNull(),
  updatedAt: timestamp("updated_at").notNull(),
  name: text("name").notNull(),
  startTime: timestamp("start_time").notNull(),
  type: eventType().notNull(),
});
