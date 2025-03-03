import { integer, pgTable, serial, text } from "drizzle-orm/pg-core";
import { eventComments } from "./eventComments";

export const eventCommentLikes = pgTable("event_comment_likes", {
  id: serial("id").primaryKey(),
  commentId: integer("comment_id")
    .references(() => eventComments.id, {
      onDelete: "cascade",
    })
    .notNull(),
});
