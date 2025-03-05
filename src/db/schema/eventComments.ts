import {
  integer,
  pgTable,
  primaryKey,
  serial,
  text,
  timestamp,
} from "drizzle-orm/pg-core";
import { events } from "./events";
import { relations } from "drizzle-orm";

export const eventComments = pgTable("event_comments", {
  id: serial("id").primaryKey(),
  eventId: integer("event_id")
    .notNull()
    .references(() => events.id, {
      onDelete: "cascade",
    }),
  userId: text("user_id").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at"),
  deletedAt: timestamp("deleted_at"),
  content: text("content").notNull(),
});

export const eventCommentsRelations = relations(eventComments, ({ one }) => ({
  event: one(events, {
    fields: [eventComments.eventId],
    references: [events.id],
  }),
}));
