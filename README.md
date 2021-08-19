# HomePoke

Stay informed on time of new announcements in the real estate market.

## Prepare configs ⚙️

Before running the app you have to create a new file named `.env` at the root folder level.

This file will setup environment variables. You can check the `.env-example` file to get the structure of each one you need.

If you don't want to make it by your own, you can just copy/paste this:

```text
# Redis Cache
REDIS_URL=redis://:getMyHome@redis:6379
REDIS_PASSWORD=getMyHome

# Postgres Database
PGHOST=db
PGUSER=postgres
PGPASSWORD=password
PGDATABASE=homepoke
PGPORT=5432

# Express Server
EXPRESS_PORT=4000

# React (Informative - No effect)
REACT_PORT=3000
```

❗ _You maybe face some issue if you have other programms runnning on one those ports._

---

## Run the app 🚀

To run the app you need to have docker installed on your machine.

Once done, move to the root folder of the project and please run:

```bash
docker compose up
```

## Frontend

You can access frontend APP at http://localhost:3000/

## Backend

You can access backend API at http://localhost:4000/
