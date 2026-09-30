// Tiny JSON-file "database" for user accounts.
// Good enough for a small student project; swap this file for a real
// database client (Postgres, MongoDB, etc.) later without touching
// routes/auth.js — it only calls readUsers()/writeUsers().

const fs = require('fs');
const path = require('path');

const DB_PATH = path.join(__dirname, '..', 'data', 'users.json');

function readUsers() {
  try {
    const raw = fs.readFileSync(DB_PATH, 'utf8');
    return JSON.parse(raw || '[]');
  } catch (err) {
    if (err.code === 'ENOENT') return [];
    throw err;
  }
}

function writeUsers(users) {
  fs.mkdirSync(path.dirname(DB_PATH), { recursive: true });
  fs.writeFileSync(DB_PATH, JSON.stringify(users, null, 2), 'utf8');
}

module.exports = { readUsers, writeUsers };
