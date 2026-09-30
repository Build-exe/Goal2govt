const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const supabase = require('../db');

const router = express.Router();
const JWT_SECRET = process.env.JWT_SECRET;
if (!JWT_SECRET) {
  throw new Error('JWT_SECRET is missing. Add JWT_SECRET=... to backend/.env');
}
const TOKEN_EXPIRY = '7d';

function publicUser(user) {
  return { id: user.id, name: user.name, email: user.email };
}

function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function requireAuth(req, res, next) {
  const header = req.headers.authorization || '';
  const token = header.startsWith('Bearer ') ? header.slice(7) : null;
  if (!token) return res.status(401).json({ error: 'Not signed in.' });
  try {
    const payload = jwt.verify(token, JWT_SECRET);
    req.userId = payload.sub;
    next();
  } catch (err) {
    return res.status(401).json({ error: 'Session expired. Please log in again.' });
  }
}

// POST /api/signup  { name, email, password }
router.post('/signup', async (req, res) => {
  try {
    const { name, email, password } = req.body || {};
    if (!name || !name.trim()) {
      return res.status(400).json({ error: 'Full name is required.' });
    }
    if (!email || !isValidEmail(email)) {
      return res.status(400).json({ error: 'Enter a valid email address.' });
    }
    if (!password || password.length < 6) {
      return res.status(400).json({ error: 'Password must be at least 6 characters.' });
    }

    const passwordHash = await bcrypt.hash(password, 10);
    const { data: user, error } = await supabase
      .from('users')
      .insert({
        name: name.trim(),
        email: email.trim().toLowerCase(),
        password_hash: passwordHash
      })
      .select('id, name, email')
      .single();

    if (error) {
      if (error.code === '23505') {
        return res.status(409).json({ error: 'An account with this email already exists — try logging in instead.' });
      }
      throw error;
    }

    const token = jwt.sign({ sub: String(user.id) }, JWT_SECRET, { expiresIn: TOKEN_EXPIRY });
    res.status(201).json({ token, user: publicUser(user) });
  } catch (err) {
    console.error('Signup error:', err);
    res.status(500).json({ error: 'Something went wrong. Please try again.' });
  }
});

// POST /api/login  { email, password }
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body || {};
    if (!email || !password) {
      return res.status(400).json({ error: 'Email and password are required.' });
    }

    const { data: user, error } = await supabase
      .from('users')
      .select('id, name, email, password_hash')
      .eq('email', email.trim().toLowerCase())
      .maybeSingle();
    if (error) throw error;

    if (!user) {
      return res.status(401).json({ error: 'No account found with this email. Try signing up.' });
    }

    const matches = await bcrypt.compare(password, user.password_hash);
    if (!matches) {
      return res.status(401).json({ error: 'Incorrect password.' });
    }

    const token = jwt.sign({ sub: String(user.id) }, JWT_SECRET, { expiresIn: TOKEN_EXPIRY });
    res.json({ token, user: publicUser(user) });
  } catch (err) {
    console.error('Login error:', err);
    res.status(500).json({ error: 'Something went wrong. Please try again.' });
  }
});

// GET /api/me — returns the signed-in user for the given Bearer token
router.get('/me', requireAuth, async (req, res) => {
  try {
    const { data: user, error } = await supabase
      .from('users')
      .select('id, name, email')
      .eq('id', req.userId)
      .maybeSingle();
    if (error) throw error;
    if (!user) return res.status(401).json({ error: 'Session expired. Please log in again.' });
    res.json({ user: publicUser(user) });
  } catch (err) {
    console.error('Me error:', err);
    res.status(500).json({ error: 'Something went wrong. Please try again.' });
  }
});

// POST /api/logout — JWTs are stateless, so there's nothing to invalidate
router.post('/logout', (req, res) => {
  res.json({ ok: true });
});

module.exports = router;