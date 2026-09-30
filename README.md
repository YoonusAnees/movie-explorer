# Movie Explorer — Discover Your Favorite Films

A full-stack Movie Explorer project using React, Redux Toolkit, MUI, Axios, Express and MongoDB. The implementation follows models, services, controllers and routes on the backend, and reusable components with Redux Toolkit on the frontend.

## Features

- Username/password registration and login, bcrypt password hashing and an HttpOnly session cookie.
- Trending movies, title search and movie details with overview, genres, cast and YouTube trailers.
- Mobile-first movie grid, desktop navbar and a mobile navigation menu that expands downward.
- Infinite scrolling for search, with an optional automatic-loading switch and a Load More fallback.
- Favorites stored locally per account, persistent last search and persistent light/dark theme.
- Genre/year/minimum-rating discovery, friendly API errors and retry controls.
- Request validation, API rate limits, restricted CORS and cross-site mutation protection.

This implementation  uses Redux Toolkit for State Management. CRA is retained to match the setup requirement. Authentication and the Node/MongoDB backend extend the original frontend brief.

## Requirements

Use Node.js 22 LTS or a compatible newer Node release, npm, a reachable MongoDB instance and a TMDb API Read Access Token. Never commit real `.env` files.

## Quick start

1. clone the system from 
2. Install dependencies from the repository root:

```bash
npm run install
```

Lockfiles are included. For repeatable installs, use `npm ci --prefix server` and `npm ci --prefix client` instead.

3. Copy `server/.env.example` to `server/.env` and `client/.env.example` to `client/.env`. Do this with VS Code or your file explorer; no operating-system-specific command is required.
4. Fill in the backend settings:

```dotenv
NODE_ENV=development
PORT=5000
CLIENT_URL=http://localhost:3000
MONGODB_URI=mongodb://127.0.0.1:27017/movie_explorer
JWT_SECRET=your-generated-random-secret
TMDB_ACCESS_TOKEN=your-real-tmdb-api-read-access-token
TRUST_PROXY=0
```

Generate a JWT secret locally:

```bash
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

For MongoDB Atlas, replace the local URI with your cluster connection string, include a database name, create a database user and allow your connection source in Atlas network access. Encode special characters in database credentials. The server does not start if MongoDB cannot connect.

For TMDb, sign in at https://www.themoviedb.org/settings/api and obtain the **API Read Access Token**, not a user login token. TMDb calls are authenticated on the backend. You do not need a YouTube API key: trailer video IDs come from TMDb.

Frontend local configuration:

```dotenv
REACT_APP_API_URL=http://localhost:5000/api/v1
```

5. Start two terminals from the root:

```bash
npm run dev:server
```

```bash
npm run dev:client
```

Open http://localhost:3000. Health endpoint: http://localhost:5000/api/v1/health. Environment changes require restarting the relevant development process.

## Architecture

```text
React components → Redux thunks → Axios → Express routes
→ validation/middleware → controllers → services → TMDb or MongoDB
```

MongoDB stores users, not a duplicate movie catalog. Password hashes never appear in API responses. Favorites and theme persistence are handled by Redux listener middleware, keeping reducers free of storage writes. Favorites do not synchronize across devices.

Movie reducers track request IDs so stale results cannot overwrite a newer query. Changing the search or filters resets pagination. Additional pages are deduplicated by TMDb movie ID. Requests started by page effects are canceled when the page or criteria change.

## Filter behavior

With an empty search, no filters means weekly trending movies. Selecting filters switches to TMDb discovery, where genre, primary release year and minimum rating apply to the complete discovery query. With text search, year is sent to TMDb; genre and rating apply to already fetched results. The UI explains this limitation and retains Load More even when a loaded page has no matching cards. This avoids pretending that local filtering covers all unseen pages.

## API

All paths start with `/api/v1`. JSON responses use `{ success, data }`, or `{ success: false, message }` for errors.

| Method | Path | Input |
| --- | --- | --- |
| GET | `/health` | None |
| POST | `/auth/register` | `{ username, password }` |
| POST | `/auth/login` | `{ username, password }` |
| POST | `/auth/logout` | None |
| GET | `/auth/me` | Session cookie |
| GET | `/movies/trending` | `page` |
| GET | `/movies/search` | `query`, `page`, optional `year` |
| GET | `/movies/discover` | `page`, optional `genre`, `year`, `rating` |
| GET | `/movies/genres` | None |
| GET | `/movies/:movieId` | Positive integer movie ID |


## Build and manual checks

```bash
npm run build
```

Before submitting, manually check registration, login, logout and session restoration; trending and search; filters and pagination; movie details and trailers; favorites and account switching; mobile navigation; theme persistence; and friendly errors when the backend is unavailable.

No remote GitLab repository or hosted demo has been created. Add your real repository and live demo URLs after publishing.

## Deployment

A static frontend host does not run this long-lived Express server. Deploy Express as a Node web service (for example Render), MongoDB on Atlas, and React on Vercel or Netlify. This code uses a same-origin `/api` proxy in production, allowing its Secure, HttpOnly, SameSite=Lax cookie to work without relying on third-party cookies.

### Backend

- Repository root directory: `server`.
- Build command: `npm ci`.
- Start command: `npm start`.
- Set `NODE_ENV=production`, real `MONGODB_URI`, `JWT_SECRET`, `TMDB_ACCESS_TOKEN`, and `CLIENT_URL` equal to the final frontend HTTPS origin.
- Let the provider supply `PORT`.
- Set `TRUST_PROXY=1` only when the provider places exactly one trusted proxy before Express; confirm the provider's topology rather than guessing.
- Allow backend outbound connectivity in Atlas network access.

### Netlify frontend

- Base directory: `client`; build command: `npm run build`; publish directory: `build` relative to that base.
- Set frontend environment `REACT_APP_API_URL=/api/v1`.
- In `client/public/_redirects`, replace `https://YOUR-BACKEND.example.com` with the deployed backend origin. Keep `/api/*` before the SPA fallback.
- Deploy and configure the backend `CLIENT_URL` to this frontend origin.

### Vercel frontend alternative

- Root directory: `client`; preset: Create React App; build command: `npm run build`; output: `build`.
- Set `REACT_APP_API_URL=/api/v1`.
- Replace the backend placeholder in `client/vercel.json`.
- Configure the backend `CLIENT_URL` to the final frontend origin.



## Official references

- React CRA deprecation: https://react.dev/blog/2025/02/14/sunsetting-create-react-app
- Redux async thunks: https://redux-toolkit.js.org/api/createAsyncThunk
- TMDb authentication: https://developer.themoviedb.org/docs/authentication-application
- TMDb details append: https://developer.themoviedb.org/docs/append-to-response
- TMDb discovery: https://developer.themoviedb.org/reference/discover-movie
- TMDb attribution: https://www.themoviedb.org/about/logos-attribution
- Netlify proxy rewrites: https://docs.netlify.com/manage/routing/redirects/rewrites-proxies/
- Vercel rewrites: https://vercel.com/docs/routing/rewrites
- Express deployment: https://render.com/docs/deploy-node-express-app

