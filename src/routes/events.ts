import Elysia, { t } from "elysia";
import { db } from "../db";
import { events } from "../db/schema/events";
import { eq } from "drizzle-orm";
import { createInsertSchema } from "drizzle-typebox";

const createEventBody = createInsertSchema(events);

export const eventsRoutes = new Elysia({ prefix: "/events" })
  .get("/:id", async ({ params: { id } }) => {
    return await db
      .select()
      .from(events)
      .where(eq(events.id, Number(id)));
  })
  .post(
    "/",
    async ({ body }) => {
      await db.insert(events).values(body);
      return "Successfully event";
    },
    {
      body: t.Omit(createEventBody, [
        "id",
        "created_at",
        "updated_at",
        "deleted_at",
      ]),
    }
  )
  .patch(
    "/:id",
    async ({ params: { id }, body }) => {
      await db
        .update(events)
        .set(body)
        .where(eq(events.id, Number(id)));

      return `Successfully updated event ${id}`;
    },
    {
      body: t.Partial(createEventBody),
    }
  )
  .delete("/:id", async ({ params: { id } }) => {
    await db.delete(events).where(eq(events.id, Number(id)));
  });
