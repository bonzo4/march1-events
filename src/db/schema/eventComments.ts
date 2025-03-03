import { pgTable, serial, text, timestamp } from "drizzle-orm/pg-core";
import { events } from "./events";

export const eventComments = pgTable("event_comments", {
  id: serial("id")
    .primaryKey()
    .references(() => events.id, { onDelete: "cascade" }),
  userId: text("user_id").primaryKey(),
  createdAt: timestamp("created_at").default(new Date()).notNull(),
  updatedAt: timestamp("updated_at").default(new Date()).notNull(),
  content: text("content").notNull(),
});
