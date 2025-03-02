import { foreignKey, pgTable, text, timestamp } from "drizzle-orm/pg-core";
import { events } from "./events";

export const eventUsers = pgTable("event_users", {
  eventId: text("event_id")
    .primaryKey()
    .notNull()
    .references(() => events.id, { onDelete: "cascade" }),
  userId: text("user_id").primaryKey().notNull(),
  createdAt: timestamp("created_at").notNull(),
  updatedAt: timestamp("updated_at").notNull(),
});
