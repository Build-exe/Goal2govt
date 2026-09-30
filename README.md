# Goal2Govt

A government-exam-prep site: previous year papers, study material, a timed
mock test, and career/job info — split into a `frontend/` (static site) and
a `backend/` (Node.js/Express API for Sign Up, Log In and sessions).

## Folder structure

```
project/
├── frontend/          Static site — HTML, CSS, JS, question data
│   ├── index.html
│   ├── examprep.html
│   ├── jobsdetails.html
│   ├── mocktest.html
│   ├── about.html
│   ├── style.css
│   ├── script.js
│   └── questions-data.js
│
└── backend/            Express server: auth API + serves the frontend
    ├── server.js
    ├── package.json
    ├── .env.example
    ├── lib/db.js        JSON-file user storage (bcrypt-hashed passwords)
    ├── routes/auth.js   /api/signup, /api/login, /api/me, /api/logout
    └── data/users.json  Created/updated automatically — real accounts live here
```

## Running it

You only need to run the backend — it also serves the frontend files, so
there's a single server and no CORS setup required.

```bash
cd backend
npm install
cp .env.example .env      # optional: edit PORT or set your own JWT_SECRET
npm start
```

Then open **http://localhost:3000** — that's the whole site, home page
first.

## How auth works now

Previously, "Sign Up" / "Log In" just wrote to the browser's `localStorage`
— nothing was ever sent anywhere, so it wasn't real authentication.

Now:
- The **frontend** (`script.js`) calls the API — `/api/signup`, `/api/login`,
  `/api/me`, `/api/logout` — and stores only a signed session token
  (a JWT) in `localStorage`, not any account data.
- The **backend** hashes every password with bcrypt before saving it to
  `backend/data/users.json`, checks credentials on login, and issues a
  7-day JWT that the frontend sends back as `Authorization: Bearer <token>`
  on every request.
- Everything that already worked client-side (the auth modal, the "Hi,
  Name ▾" menu, gating the timed Mock Test behind sign-in) is unchanged —
  only what happens *after* you submit the form is now real.

## Swapping in a real database later

`backend/lib/db.js` is the only file that touches storage
(`readUsers()` / `writeUsers()`). To move off the JSON file and onto
Postgres, MongoDB, etc., rewrite those two functions — `routes/auth.js`
and the frontend don't need to change.

## Notes

- `backend/data/users.json` holds real (hashed) user accounts once people
  sign up — don't commit it if you push this to a public repo (it's
  already in `.gitignore`).
- Set a real `JWT_SECRET` in `.env` before deploying anywhere public; the
  default in the code is only a placeholder for local testing.
