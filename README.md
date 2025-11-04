Image Search App — MERN + OAuth + Unsplash
A full‑stack image search application built with the MERN stack (MongoDB, Express, React, Node) featuring secure OAuth login (Google, Facebook, GitHub), Unsplash image search, a responsive multi‑select grid, a global “Top 5 Searches” banner, and per‑user search history.​

Features
OAuth login with Google, Facebook, and GitHub via Passport.js.​

Search Unsplash photos and browse results in a responsive multi‑select grid.​

Personal search history with timestamps and one‑click re‑search.​

Global “Top 5 Searches” banner aggregated across all users.​

Clean MERN separation (client/server) with REST API endpoints.​

Tech Stack
Frontend: React, Axios, CSS.​

Backend: Node.js, Express, Passport.js, Axios.​

Database: MongoDB + Mongoose.​

External APIs: Unsplash + OAuth (Google, Facebook, GitHub).​

Project Structure
text
image-search-app/
│
├── README.md
├── .gitignore
│
├── server/                          # Backend (Node + Express)
│   ├── config/
│   │   └── passport.js              # OAuth strategies
│   ├── models/
│   │   ├── User.js                  # OAuth user model
│   │   └── Search.js                # Search history model
│   ├── routes/
│   │   ├── auth.js                  # /auth routes
│   │   └── api.js                   # /api routes
│   ├── server.js                    # App entry
│   ├── package.json
│   ├── .env                         # Backend env (DO NOT COMMIT)
│   └── .env.example                 # Template for env
│
└── client/                          # Frontend (React)
    ├── public/
    │   └── index.html
    ├── src/
    │   ├── components/
    │   │   ├── Login.js / .css
    │   │   ├── SearchBar.js / .css
    │   │   ├── TopSearches.js / .css
    │   │   ├── ImageGrid.js / .css
    │   │   └── SearchHistory.js / .css
    │   ├── App.js / App.css
    │   └── index.js / index.css
    ├── package.json
    ├── .env                         # Frontend env (DO NOT COMMIT)
    └── .env.example                 # Template for env
Prerequisites
Node.js 16+ (recommended 18+) and npm.​

MongoDB (local or Atlas).​

OAuth credentials: Google, Facebook, GitHub.​

Unsplash Developer Access Key.​

Environment Variables
Create two .env files using the provided templates.

server/.env
text
PORT=5000
CLIENT_URL=http://localhost:3000

# Mongo
MONGODB_URI=mongodb://localhost:27017/image-search
# or Atlas:
# MONGODB_URI=mongodb+srv://<user>:<pass>@cluster0.xxxxx.mongodb.net/image-search?retryWrites=true&w=majority

# Sessions
SESSION_SECRET=<generate 32+ char random string>

# Google OAuth
GOOGLE_CLIENT_ID=<from Google Cloud Console>
GOOGLE_CLIENT_SECRET=<from Google Cloud Console>

# Facebook OAuth
FACEBOOK_APP_ID=<from Facebook Developers>
FACEBOOK_APP_SECRET=<from Facebook Developers>

# GitHub OAuth
GITHUB_CLIENT_ID=<from GitHub Developer Settings>
GITHUB_CLIENT_SECRET=<from GitHub Developer Settings>

# Unsplash
UNSPLASH_ACCESS_KEY=<from Unsplash Developers>
Tip: Generate a secure SESSION_SECRET with:

text
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
client/.env
text
REACT_APP_API_URL=http://localhost:5000
Note: React env vars must start with REACT_APP_.​

OAuth Configuration
Ensure callback URLs match exactly.

Google
Console: Google Cloud → APIs & Services → OAuth consent screen → Credentials → Create OAuth client (Web).​

Authorized JavaScript origins:

http://localhost:3000

http://localhost:5000

Authorized redirect URIs:

http://localhost:5000/auth/google/callback

Put values into server/.env as GOOGLE_CLIENT_ID and GOOGLE_CLIENT_SECRET.​

Facebook
Console: developers.facebook.com → My Apps → Create App (Consumer) → Add Facebook Login (Web).​

Valid OAuth Redirect URIs:

http://localhost:5000/auth/facebook/callback

Put values into server/.env as FACEBOOK_APP_ID and FACEBOOK_APP_SECRET.​

GitHub
Console: GitHub → Settings → Developer settings → OAuth Apps → New OAuth App.​

Homepage URL: http://localhost:3000

Authorization callback URL: http://localhost:5000/auth/github/callback

Generate client secret and add to server/.env.​

Unsplash
Console: unsplash.com/developers → New Application.​

Copy Access Key into server/.env as UNSPLASH_ACCESS_KEY.​

Install & Run
1) Install dependencies
text
# Backend
cd server
npm install

# Frontend
cd ../client
npm install
2) Run locally (two terminals)
text
# Terminal 1 (backend)
cd server
npm start

# Terminal 2 (frontend)
cd client
npm start
Backend at http://localhost:5000, frontend at http://localhost:3000.​

3) Build frontend (optional production build)
text
cd client
npm run build
This outputs static assets to client/build. You can serve them with any static server or integrate with Express if desired.​

API Endpoints
Base URL: http://localhost:5000

Auth

GET /auth/google — Start Google OAuth.​

GET /auth/facebook — Start Facebook OAuth.​

GET /auth/github — Start GitHub OAuth.​

GET /auth/logout — Destroy session and logout.​

GET /auth/current-user — Returns current authenticated user.​

Application

GET /api/top-searches — Returns top 5 search terms across all users.​

POST /api/search — Body: { term } → Saves search and returns Unsplash results.​

GET /api/history — Returns the current user’s last 20 searches with timestamps.​

All /api routes require an authenticated session.​

Frontend Overview
Login page with buttons for Google, Facebook, and GitHub.​

Top Searches banner at the top of the app.​

Search bar to query Unsplash API via backend.​

Multi‑select image grid with hover checkbox overlay.​

Search history list with clickable terms to re-run searches.​

Common Errors & Fixes
npm run build error at project root:

Run build from client folder: cd client && npm run build.​

400 redirect_uri_mismatch:

Ensure Google/Facebook/GitHub callback URL exactly matches:

http://localhost:5000/auth/google/callback

http://localhost:5000/auth/facebook/callback

http://localhost:5000/auth/github/callback.​

Undefined env vars:

Ensure .env files are in server/ and client/ and you restarted both processes.​

Not authenticated on API calls:

Make sure requests include credentials (handled by axios with withCredentials: true) and you completed login.​

Session issues:

Set a strong SESSION_SECRET and do not rotate it while sessions are active (or allow multiple secrets).​

Security Notes
Do not commit .env files; use .env.example templates.​

Use strong, unique SESSION_SECRET in production.​

For production, update OAuth origins/redirects to your domain and set REACT_APP_API_URL accordingly.​

License
MIT.​

Acknowledgements
Unsplash API for images.​

Passport.js for OAuth strategies.
