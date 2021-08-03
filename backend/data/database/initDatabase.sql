BEGIN;

-- Create tables
CREATE TABLE IF NOT EXISTS "user" (
    "id" INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    "firstname" TEXT NULL,
    "lastname" TEXT NULL,
    "email" TEXT UNIQUE NOT NULL,
    "password" TEXT NOT NULL,
    "created_at" TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS "profile" (
    "id" INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    "name" TEXT NOT NULL,
    "user_id" INT NOT NULL REFERENCES "user"("id") ON DELETE CASCADE,
    "created_at" TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS "provider" (
    "id" INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    "name" TEXT NOT NULL,
    "host" TEXT NOT NULL,
    "created_at" TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS "request_header" (
    "id" INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    "method" TEXT NOT NULL,
    "host" TEXT NOT NULL,
    "connection" TEXT NOT NULL,
    "accept" TEXT NOT NULL,
    "referer" TEXT NOT NULL,
    "sec_fetch_site" TEXT NOT NULL,
    "sec_fetch_mode" TEXT NOT NULL,
    "sec_fetch_user" TEXT NOT NULL,
    "sec_fetch_dest" TEXT NOT NULL,
    "cache_control" TEXT NOT NULL,
    "user_agent" TEXT NOT NULL,
    "upgrade_insecure_requests" TEXT NOT NULL,
    "accept_encoding" TEXT NOT NULL,
    "accept_language" TEXT NOT NULL,
    "profile_id" INT NOT NULL REFERENCES "profile"("id") ON DELETE CASCADE,
    "created_at" TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS "scrap_request" (
    "id" INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    "title" TEXT NOT NULL,
    "active" BOOLEAN NOT NULL DEFAULT false,
    "status" TEXT NOT NULL DEFAULT 'running',
    "fetch_only_once" BOOLEAN NOT NULL DEFAULT true,
    "poll_interval" INT NOT NULL DEFAULT 600000, -- 10 minutes in ms
    "url" TEXT NOT NULL,
    "method" TEXT NOT NULL default 'GET',
    "last_error" TEXT NULL,
    "profile_id" INT NOT NULL REFERENCES "profile"("id") ON DELETE CASCADE,
    "provider_id" INT NOT NULL REFERENCES "provider"("id") ON DELETE CASCADE,
    "request_header_id" INT NULL REFERENCES "request_header"("id") ON DELETE CASCADE,
    "created_at" TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS "offer" (
    "id" INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    "active" BOOLEAN DEFAULT false,
    "title" TEXT NOT NULL,
    "descripion" TEXT NOT NULL,
    "owner_name" TEXT NOT NULL,
    "owner_type" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "city_code" INT NOT NULL,
    "location" TEXT NOT NULL,
    "image_urls" TEXT NULL,
    "price" INT NULL,
    "including_charges" BOOLEAN NULL,
    "type" TEXT NOT NULL,
    "furnished" BOOLEAN NULL,
    "surface" INT NULL,
    "rooms" INT NULL,
    "energy" TEXT NULL,
    "ges" TEXT NULL,
    "assets" TEXT NULL,
    "contacted" BOOLEAN DEFAULT false,
    "publication_date" TIMESTAMP WITH TIME ZONE,
    "profile_id" INT NOT NULL REFERENCES "profile"("id") ON DELETE CASCADE,
    "created_at" TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE VIEW "scraping_view" AS
     SELECT "sr"."id",
            "sr"."title",
            "sr"."active",
            "sr"."status",
            "sr"."fetch_only_once" as "fetchOnlyOnce",
            "sr"."poll_interval" as "pollInterval",
            "sr"."url",
            "sr"."method",
            "sr"."last_error" as "lastError",
            json_build_object(
           		'id', "provider"."id", 
           		'name', "provider"."name",
           		'host', "provider"."host") AS "provider",
            json_build_object(
                'id', "profile"."id", 
                'name', "profile"."name") AS "profile",
            json_build_object(
                'id', "u"."id", 
                'firstname', "u"."firstname", 
                'lastname', "u"."lastname", 
                'email', "u"."email") AS "user",
            "sr"."request_header_id" AS "requestHeaderId",
            "sr"."created_at" as "createdAt",
            "sr"."updated_at" as "updatedAt"
      FROM "scrap_request" "sr"
      JOIN "provider" ON "provider"."id" = "sr"."provider_id"
      JOIN "profile"  ON "profile"."id" = "sr"."profile_id"
      JOIN "user" "u" ON "u"."id" = "profile"."user_id"
  ORDER BY "sr"."id" ASC;

-------------------------------------------------------------------------
--------------------------------- Seeds ---------------------------------
-------------------------------------------------------------------------

-- Users (plain text password: pokePass)
INSERT INTO "user"("firstname", "lastname", "email", "password") VALUES
('Quentin', 'Lemogodeuc', 'q.lemogodeuc@gmail.com', '$2y$10$qqU18ORqDHh6ivWjXv07ee2KiFpcsIFLxITRmvZqPL9n7ScjnBIeu');

-- Profiles
INSERT INTO "profile"("name", "user_id") VALUES
('Pepito', 1);

-- Providers
INSERT INTO "provider"("name", "host") VALUES
('Leboncoin', 'leboncoin');

-- Scrap Requests
INSERT INTO "scrap_request"("title", "url", "profile_id", "provider_id") VALUES
('Appart BAB', 'https://www.leboncoin.fr/recherche?category=10&text=appartement&locations=Bayonne_64100__43.49273_-1.4787_5005%2CAnglet_64600__43.48188_-1.5147_5380%2CBidart_64210__43.4391_-1.591_3996%2CBiarritz_64200__43.48285_-1.55883_4205&real_estate_type=2&price=500-750&rooms=2-2&square=40-max', 1, 1);

COMMIT;