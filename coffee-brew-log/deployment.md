# Deployment

## Live URL

> Add your deployed URL here once live, e.g.:
> `https://coffee-brew-log.onrender.com`

---

## Deploying to Render (recommended — free tier)

### Backend

1. Go to [render.com](https://render.com) and create a new **Web Service**
2. Connect your GitHub repo
3. Set the following:
   - **Root directory:** `backend`
   - **Build command:** `npm install`
   - **Start command:** `npm start`
4. Add environment variables:
   - `NODE_ENV=production`
   - `PORT=5000`
   - `DATABASE_URL` — create a free PostgreSQL database on Render and paste the internal URL here
5. Deploy

### Frontend

1. Create a new **Static Site** on Render
2. Connect the same repo
3. Set:
   - **Root directory:** `frontend`
   - **Build command:** `npm install && npm run build`
   - **Publish directory:** `dist`
4. Add environment variable:
   - `VITE_API_URL` — your backend's Render URL (e.g. `https://coffee-brew-log-api.onrender.com`)
5. Deploy

---

## Troubleshooting notes

- If the backend crashes on Render, check the logs for database connection errors. Make sure `DATABASE_URL` is set correctly.
- If the frontend shows a blank screen, open the browser console. A CORS error usually means `VITE_API_URL` is pointing to the wrong address.
- Render's free tier spins down after 15 minutes of inactivity. The first request after sleep may take 30–60 seconds.
- SQLite is not suitable for Render (the filesystem is ephemeral). Always use PostgreSQL in production.
