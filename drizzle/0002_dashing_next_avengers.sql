CREATE TABLE "event_comments" (
	"id" serial PRIMARY KEY NOT NULL,
	"event_id" integer NOT NULL,
	"user_id" text NOT NULL,
	"created_at" timestamp DEFAULT '2025-03-04 02:16:22.436' NOT NULL,
	"updated_at" timestamp DEFAULT '2025-03-04 02:16:22.436' NOT NULL,
	"content" text NOT NULL,
	CONSTRAINT "event_comments_event_id_user_id_pk" PRIMARY KEY("event_id","user_id")
);
--> statement-breakpoint
CREATE TABLE "event_locations" (
	"id" serial PRIMARY KEY NOT NULL,
	"event_id" integer NOT NULL,
	"state" text NOT NULL,
	"city" text NOT NULL,
	"address" text NOT NULL,
	"latitude" double precision NOT NULL,
	"longitude" double precision NOT NULL,
	"zip_code" text,
	"country" text DEFAULT 'US',
	"venue" text
);
--> statement-breakpoint
ALTER TABLE "events" ALTER COLUMN "id" SET DATA TYPE serial;--> statement-breakpoint
ALTER TABLE "events" ALTER COLUMN "created_at" SET DEFAULT '2025-03-04 02:16:22.433';--> statement-breakpoint
ALTER TABLE "events" ALTER COLUMN "updated_at" SET DEFAULT '2025-03-04 02:16:22.433';--> statement-breakpoint
/* 
    Unfortunately in current drizzle-kit version we can't automatically get name for primary key.
    We are working on making it available!

    Meanwhile you can:
        1. Check pk name in your database, by running
            SELECT constraint_name FROM information_schema.table_constraints
            WHERE table_schema = 'public'
                AND table_name = 'event_users'
                AND constraint_type = 'PRIMARY KEY';
        2. Uncomment code below and paste pk name manually
        
    Hope to release this update as soon as possible
*/

-- ALTER TABLE "event_users" DROP CONSTRAINT "<constraint_name>";--> statement-breakpoint
ALTER TABLE "event_users" ALTER COLUMN "event_id" SET DATA TYPE integer;--> statement-breakpoint
ALTER TABLE "event_users" ALTER COLUMN "created_at" SET DEFAULT '2025-03-04 02:16:22.403';--> statement-breakpoint
ALTER TABLE "event_users" ALTER COLUMN "updated_at" SET DEFAULT '2025-03-04 02:16:22.403';--> statement-breakpoint
ALTER TABLE "event_users" ADD CONSTRAINT "event_users_event_id_user_id_pk" PRIMARY KEY("event_id","user_id");--> statement-breakpoint
ALTER TABLE "events" ADD COLUMN "created_by" text NOT NULL;--> statement-breakpoint
ALTER TABLE "events" ADD COLUMN "description" text NOT NULL;--> statement-breakpoint
ALTER TABLE "events" ADD COLUMN "icon_url" text;--> statement-breakpoint
ALTER TABLE "events" ADD COLUMN "banner_url" text;--> statement-breakpoint
ALTER TABLE "event_comments" ADD CONSTRAINT "event_comments_event_id_events_id_fk" FOREIGN KEY ("event_id") REFERENCES "public"."events"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "event_locations" ADD CONSTRAINT "event_locations_event_id_events_id_fk" FOREIGN KEY ("event_id") REFERENCES "public"."events"("id") ON DELETE cascade ON UPDATE no action;