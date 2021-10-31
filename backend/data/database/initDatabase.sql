BEGIN;

-------------------------------------------------------------------------
-------------------------------- TABLES ---------------------------------
-------------------------------------------------------------------------

CREATE TABLE IF NOT EXISTS "user" (
    "id" INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    "firstname" TEXT NULL,
    "lastname" TEXT NULL,
    "email" TEXT UNIQUE NOT NULL,
    "password" TEXT NOT NULL,
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
    "created_at" TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS "request" (
    "id" INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    "title" TEXT NOT NULL,
    "active" BOOLEAN NOT NULL DEFAULT false,
    "status" TEXT NOT NULL DEFAULT 'inactive',
    "poll_interval" INT NULL DEFAULT 900000, -- 15 minutes in ms
    "url" TEXT NOT NULL,
    "method" TEXT NOT NULL DEFAULT 'GET',
    "last_error" TEXT NULL,
    "user_id" INT NOT NULL REFERENCES "user"("id") ON DELETE CASCADE,
    "provider_id" INT NOT NULL REFERENCES "provider"("id") ON DELETE CASCADE,
    "request_header_id" INT NULL REFERENCES "request_header"("id") ON DELETE CASCADE,
    "created_at" TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS "offer" (
    "id" INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    "active" BOOLEAN DEFAULT false,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
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
    "is_contacted" BOOLEAN DEFAULT false,
    "is_favorite" BOOLEAN DEFAULT false,
    "is_delete" BOOLEAN DEFAULT false,
    "publication_date" TIMESTAMP WITH TIME ZONE,
    "user_id" INT NOT NULL REFERENCES "user"("id") ON DELETE CASCADE,
    "created_at" TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-------------------------------------------------------------------------
--------------------------------- TYPES ---------------------------------
-------------------------------------------------------------------------
CREATE TYPE "user_type" AS ("id" INT, "username" TEXT, "firstname" TEXT, "lastname" TEXT, "created_at" TIMESTAMPTZ, "updated_at" TIMESTAMPTZ);

-------------------------------------------------------------------------
--------------------------------- VIEWS ---------------------------------
-------------------------------------------------------------------------

CREATE VIEW "user_login_view" AS
     SELECT "u"."id",
            "u"."firstname",
            "u"."lastname",
            "u"."email",
            "u"."password",
            "u"."created_at" AS "createdAt",
            "u"."updated_at" AS "updatedAt"
       FROM "user" "u";

CREATE VIEW "user_view" AS
     SELECT "u"."id",
            "u"."firstname",
            "u"."lastname",
            "u"."email",
            "u"."created_at" AS "createdAt",
            "u"."updated_at" AS "updatedAt"
       FROM "user" "u";

CREATE VIEW "request_view" AS
     SELECT "r"."id",
            "r"."title",
            "r"."active",
            "r"."status",
            "r"."poll_interval" AS "pollInterval",
            "r"."url",
            "r"."method",
            "r"."last_error" AS "lastError",
            "r"."user_id" AS "userId",
            "r"."provider_id" AS "providerId",
            "r"."request_header_id" AS "requestHeaderId",
            "r"."created_at" AS "createdAt",
            "r"."updated_at" AS "updatedAt"
       FROM "request" "r";

CREATE VIEW "provider_view" AS
     SELECT "p"."id",
            "p"."name",
            "p"."host",
            "p"."created_at" AS "createdAt",
            "p"."updated_at" AS "updatedAt"
       FROM "provider" "p";

CREATE VIEW "offer_view" AS
     SELECT "o"."id",
            "o"."active",
            "o"."title",
            "o"."description",
            "o"."owner_name" AS "ownerName",
            "o"."owner_type" AS "ownerType",
            "o"."url",
            "o"."city",
            "o"."city_code" AS "cityCode",
            "o"."location",
            "o"."image_urls" AS "imageUrls",
            "o"."price",
            "o"."including_charges" AS "includingCharges",
            "o"."type",
            "o"."furnished",
            "o"."surface",
            "o"."rooms",
            "o"."energy",
            "o"."ges",
            "o"."assets",
            "o"."is_contacted" AS "isContacted",
            "o"."is_favorite" AS "isFavorite",
            "o"."is_delete" AS "isDelete",
            "o"."publication_date" AS "publicationDate",
            "o"."user_id" AS "userId",
            "o"."created_at" AS "createdAt",
            "o"."updated_at" AS "updatedAt"
       FROM "offer" "o"
      WHERE "o"."is_delete" = 'false';

-------------------------------------------------------------------------
--------------------------------- Seeds ---------------------------------
-------------------------------------------------------------------------

-- Users (plain text password: pokepass)
INSERT INTO "user"("email", "firstname", "lastname", "password") VALUES
('q.lemogodeuc@gmail.com', 'Quentin', 'Lemogodeuc', '$2b$10$JkLq/6ecFPFANa9ZAVj1O.WO9RIYXn/qRoPK/TFitHkPSDier1Sa.');

-- Providers
INSERT INTO "provider"("name", "host") VALUES
('Leboncoin', 'leboncoin');

-- Scrap Requests
INSERT INTO "request"("title", "url", "user_id", "provider_id") VALUES
('Appart BAB', 'https://www.leboncoin.fr/recherche?category=10&text=appartement&locations=Bayonne_64100__43.49273_-1.4787_5005%2CAnglet_64600__43.48188_-1.5147_5380%2CBidart_64210__43.4391_-1.591_3996%2CBiarritz_64200__43.48285_-1.55883_4205&real_estate_type=2&price=500-750&rooms=2-2&square=40-max', 1, 1),
('Appart ANGLET', 'https://www.leboncoin.fr/recherche?category=10&text=appartement&locations=Bayonne_64100__43.49273_-1.4787_5005%2CAnglet_64600__43.48188_-1.5147_5380%2CBidart_64210__43.4391_-1.591_3996%2CBiarritz_64200__43.48285_-1.55883_4205&real_estate_type=2&price=500-750&rooms=2-2&square=40-max', 1, 1);

COMMIT;