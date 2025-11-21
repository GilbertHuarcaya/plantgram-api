# Plantgram API
Quick start

1. Copy `.env.example` to `.env` and set `MONGO_URI` and optionally `PORT`.

2. Install dependencies:

```bash
npm install
```

3. Run the server:

```bash
npm start
# or for development
npm run dev
```

Endpoints

- GET `/` => health
- Users: `/api/users` (GET, POST), `/api/users/:id` (GET, PUT, DELETE)
- Posts: `/api/posts` (GET, POST) with `?page=&limit=` pagination
- Species: `/api/species` (GET, POST)
