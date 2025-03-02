CREATE TYPE "public"."event_type" AS ENUM('online', 'live');--> statement-breakpoint
CREATE TABLE "events" (
	"id" text PRIMARY KEY NOT NULL,
	"created_at" timestamp NOT NULL,
	"updated_at" timestamp NOT NULL,
	"name" text NOT NULL,
	"start_time" timestamp NOT NULL,
	"eventType" "event_type" NOT NULL
);
--> statement-breakpoint
CREATE TABLE "event_users" (
	"event_id" text PRIMARY KEY NOT NULL,
	"user_id" text PRIMARY KEY NOT NULL,
	"created_at" timestamp NOT NULL,
	"updated_at" timestamp NOT NULL
);
--> statement-breakpoint
ALTER TABLE "event_users" ADD CONSTRAINT "event_users_event_id_events_id_fk" FOREIGN KEY ("event_id") REFERENCES "public"."events"("id") ON DELETE cascade ON UPDATE no action;