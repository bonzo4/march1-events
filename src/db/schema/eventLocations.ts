import {
  doublePrecision,
  integer,
  pgTable,
  serial,
  text,
  timestamp,
} from "drizzle-orm/pg-core";
import { events } from "./events";
import { relations } from "drizzle-orm";

export const eventLocations = pgTable("event_locations", {
  id: serial("id").primaryKey(),
  eventId: integer("event_id")
    .references(() => events.id, {
      onDelete: "cascade",
    })
    .notNull(),
  createdAt: timestamp("created_at")
    .$defaultFn(() => new Date())
    .notNull(),
  updatedAt: timestamp("updated_at")
    .$defaultFn(() => new Date())
    .notNull(),
  state: text("state").notNull(),
  city: text("city").notNull(),
  address: text("address").notNull(),
  latitude: doublePrecision("latitude").notNull(),
  longitude: doublePrecision("longitude").notNull(),
  zipCode: text("zip_code"),
  country: text("country").default("US"),
  venue: text("venue"),
});

export const eventLocationsRelations = relations(eventLocations, ({ one }) => ({
  event: one(events, {
    fields: [eventLocations.eventId],
    references: [events.id],
  }),
}));
