import {
  integer,
  pgTable,
  primaryKey,
  text,
  timestamp,
} from "drizzle-orm/pg-core";
import { events } from "./events";
import { users } from "march1-auth";
import { relations } from "drizzle-orm";

export const eventUsers = pgTable(
  "event_users",
  {
    eventId: integer("event_id")
      .notNull()
      .references(() => events.id, {
        onDelete: "cascade",
      }),
    userId: text("user_id").notNull(),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at"),
    deletedAt: timestamp("deleted_at"),
  },
  (t) => [primaryKey({ columns: [t.eventId, t.userId] })]
);

export const eventUserRelations = relations(eventUsers, ({ one }) => ({
  event: one(events, {
    fields: [eventUsers.eventId],
    references: [events.id],
  }),
}));
