# Coffee Brew Log

A full-stack app for logging and tracking coffee brews. Built for the XPL Full-stack Developer Bootcamp assessment.

## What it does

- Create a brew entry (beans, method, coffee grams, water grams, rating, tasting notes)
- View all brews in a list
- Filter brews by brew method
- Edit any brew entry
- Delete a brew entry
- Form validation on both frontend and backend

## Tech stack

| Layer | Technology |
|-------|-----------|
| Frontend | React 18 (Vite) |
| Styling | CSS Modules |
| Backend | Node.js + Express |
| ORM | Sequelize |
| Database | SQLite (dev) / PostgreSQL (prod) |
| API | REST JSON at `/api/brews` |

---

## Project structure

```
coffee-brew-log/
├── backend/
│   ├── src/
│   │   ├── index.js          # Express entry point
│   │   ├── database.js       # Sequelize connection
│   │   ├── models/
│   │   │   └── Brew.js       # Brew model
│   │   ├── routes/
│   │   │   └── brews.js      # CRUD route handlers
│   │   └── middleware/
│   │       └── validate.js   # Request validation
│   ├── .env.example
│   └── package.json
├── frontend/
│   ├── src/
│   │   ├── main.jsx          # React entry
│   │   ├── App.jsx           # Root component
│   │   ├── api/
│   │   │   └── brews.js      # API fetch helpers
│   │   └── components/
│   │       ├── BrewCard.jsx  # Single brew row
│   │       ├── BrewForm.jsx  # Add / Edit modal form
│   │       ├── FilterBar.jsx # Method filter dropdown
│   │       └── Toast.jsx     # Notification toast
│   ├── index.html
│   ├── vite.config.js
│   ├── .env.example
│   └── package.json
├── Documentation.md
├── deployment.md
└── .gitignore
```

---

## Local setup

### Prerequisites

- Node.js 18+
- npm 9+

### 1. Clone the repo

```bash
git clone https://github.com/YOUR_USERNAME/coffee-brew-log.git
cd coffee-brew-log
```

### 2. Set up the backend

```bash
cd backend
cp .env.example .env
npm install
npm run dev
```

The API will start on `http://localhost:5000`. SQLite is used by default — no database setup needed. A `brews.sqlite` file is created automatically.

### 3. Set up the frontend

Open a second terminal:

```bash
cd frontend
cp .env.example .env
npm install
npm run dev
```

The app will open at `http://localhost:5173`. Vite proxies `/api` requests to the backend automatically.

---

## API endpoints

All endpoints are at `/api/brews`.

| Method | Path | Description | Success | Error |
|--------|------|-------------|---------|-------|
| GET | `/api/brews` | List all brews (optional `?method=` filter) | 200 | 500 |
| GET | `/api/brews/:id` | Get a single brew | 200 | 404 |
| POST | `/api/brews` | Create a brew | 201 | 400 |
| PUT | `/api/brews/:id` | Update a brew | 200 | 400, 404 |
| DELETE | `/api/brews/:id` | Delete a brew | 200 | 404 |

### Brew object

```json
{
  "id": 1,
  "beans": "Ethiopian Yirgacheffe",
  "method": "V60",
  "coffeeGrams": 18,
  "waterGrams": 300,
  "rating": 4,
  "tastingNotes": "Fruity, bright, floral",
  "createdAt": "2025-01-01T10:00:00.000Z",
  "updatedAt": "2025-01-01T10:00:00.000Z"
}
```

### Validation rules

All fields are required. `rating` must be 0–5. `coffeeGrams` and `waterGrams` must be greater than 0. Invalid requests return HTTP 400 with an `errors` array:

```json
{
  "errors": [
    { "field": "beans", "message": "Beans field is required" }
  ]
}
```

---

## Using PostgreSQL instead of SQLite

Add to `backend/.env`:

```
DATABASE_URL=postgresql://user:password@localhost:5432/coffee_brew_log
```

Sequelize will switch to PostgreSQL automatically and sync the schema on startup.

---

## Running in production

### Backend

```bash
cd backend
npm start
```

### Frontend (build for static hosting)

```bash
cd frontend
npm run build
# Output is in frontend/dist/
```

Set `VITE_API_URL` in `frontend/.env` to your deployed backend URL before building.
