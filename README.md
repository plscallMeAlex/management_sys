# Management System

For practicing a new stack before doing a real thing

## Setup For First Time

You need to create .env file inside the directory server in this format

```.env
SA_PASSWORD
DATABASE_SERVER
DATABASE_NAME
DATABASE_USER
DATABASE_PASSWORD
```

(Actually the field that start with DATABASE is for adminer to see a data in DB)

## Usage

**Step 1**\
By start with init the database first

```bash
docker compose up -d
```

**Step 2**\
After that migrate the database (One time Only)

```bash
npm run mg
```

**Step 3**\
Install Package both front and back

```bash
npm run int
```

**Step 4**\
Run the application

```bash
npm run dev
```

Testing Web hook commit
