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
    createdAt: timestamp("created_at").default(new Date()).notNull(),
    updatedAt: timestamp("updated_at").default(new Date()).notNull(),
  },
  (t) => [primaryKey({ columns: [t.eventId, t.userId] })]
);

export const eventUserRelations = relations(eventUsers, ({ one }) => ({
  event: one(events, {
    fields: [eventUsers.eventId],
    references: [events.id],
  }),
  user: one(users, {
    fields: [eventUsers.userId],
    references: [users.id],
  }),
}));
