ALTER TABLE "event_comments" ALTER COLUMN "created_at" DROP DEFAULT;--> statement-breakpoint
ALTER TABLE "event_comments" ALTER COLUMN "updated_at" DROP DEFAULT;--> statement-breakpoint
ALTER TABLE "events" ALTER COLUMN "created_at" DROP DEFAULT;--> statement-breakpoint
ALTER TABLE "events" ALTER COLUMN "updated_at" DROP DEFAULT;--> statement-breakpoint
ALTER TABLE "event_users" ALTER COLUMN "created_at" DROP DEFAULT;--> statement-breakpoint
ALTER TABLE "event_users" ALTER COLUMN "updated_at" DROP DEFAULT;--> statement-breakpoint
ALTER TABLE "event_locations" ADD COLUMN "created_at" timestamp NOT NULL;--> statement-breakpoint
ALTER TABLE "event_locations" ADD COLUMN "updated_at" timestamp NOT NULL;