CREATE TABLE "invitations" (
	"id" serial PRIMARY KEY NOT NULL,
	"code" varchar(12) NOT NULL,
	"guests" jsonb NOT NULL,
	"gender" varchar(2) NOT NULL,
	"response" varchar(3),
	"responded_at" timestamp,
	"created_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "invitations_code_unique" UNIQUE("code")
);
