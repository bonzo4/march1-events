import { relations } from "drizzle-orm";
import {
  numeric,
  pgEnum,
  pgTable,
  serial,
  text,
  timestamp,
} from "drizzle-orm/pg-core";
import { eventUsers } from "./eventUsers";
import { eventLocations } from "./eventLocations";
import { eventComments } from "./eventComments";

export const eventType = pgEnum("event_type", ["online", "live"]);

export const events = pgTable("events", {
  id: serial("id").primaryKey(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at"),
  deletedAt: timestamp("deleted_at"),
  createdBy: text("created_by").notNull(),
  name: text("name").notNull(),
  description: text("description").notNull(),
  iconUrl: text("icon_url"),
  bannerUrl: text("banner_url"),
  startTime: timestamp("start_time").notNull(),
  type: eventType().notNull(),
});

export const eventsRelation = relations(events, ({ many }) => ({
  eventUsers: many(eventUsers),
  eventLocations: many(eventLocations),
  eventComments: many(eventComments),
}));
