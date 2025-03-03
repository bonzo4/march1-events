import { integer, pgTable, serial, text } from "drizzle-orm/pg-core";
import { events } from "./events";

export const eventLocations = pgTable("event_locations", {
  id: serial("id").primaryKey(),
  eventId: integer("event_id")
    .references(() => events.id, {
      onDelete: "cascade",
    })
    .notNull(),
  state: text("state").notNull(),
  city: text("city").notNull(),
  address: text("address").notNull(),
});
