const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const supabase = require('../db');

const router = express.Router();

const sign = (u) =>
  jwt.sign({ id: u.id, email: u.email }, process.env.JWT_SECRET, { expiresIn: '7d' });

const publicUser = (u) => ({ id: u.id, email: u.email, name: u.name || u.email.split('@')[0] });

function auth(req, res, next) {
  const token = (req.headers.authorization || '').replace('Bearer ', '');
  try {
    req.user = jwt.verify(token, process.env.JWT_SECRET);
    next();
  } catch {
    res.status(401).json({ error: 'Please log in' });
  }
}

/* ---------- Questions ---------- */

// GET /api/pool?tier=p10
// Returns the whole pool for a tier in the shape script.js expects:
// { q, options, answer, category, explain }. Order is stable (by id) because
// the mock exam sets are built with a seeded shuffle and must be repeatable.
router.get('/pool', async (req, res) => {
  const { tier } = req.query;
  if (!tier) return res.status(400).json({ error: 'tier is required' });

  const { data, error } = await supabase
    .from('questions')
    .select('id, subject, question, options, correct_index, explanation')
    .eq('tier', tier)
    .order('id', { ascending: true })
    .range(0, 999);

  if (error) return res.status(500).json({ error: error.message });

  res.json(
    data.map((r) => ({
      q: r.question,
      options: r.options,
      answer: r.options[r.correct_index],
      category: r.subject,
      explain: r.explanation,
    }))
  );
});

// GET /api/questions?tier=p10&subject=maths&limit=10  (random sample, raw format)
router.get('/questions', async (req, res) => {
  const { tier, subject } = req.query;
  const limit = Math.min(parseInt(req.query.limit) || 10, 100);
  if (!tier) return res.status(400).json({ error: 'tier is required' });

  let q = supabase
    .from('questions')
    .select('id, tier, subject, question, options, correct_index, explanation')
    .eq('tier', tier);
  if (subject) q = q.eq('subject', subject);

  const { data, error } = await q;
  if (error) return res.status(500).json({ error: error.message });
  res.json(data.sort(() => Math.random() - 0.5).slice(0, limit));
});

/* ---------- Accounts ---------- */

async function signup(req, res) {
  const { name, email, password } = req.body || {};
  if (!email || !password || password.length < 6)
    return res.status(400).json({ error: 'Email and a password of 6+ characters required' });

  const password_hash = await bcrypt.hash(password, 10);
  const { data, error } = await supabase
    .from('users')
    .insert({
      name: (name || '').trim() || null,
      email: email.trim().toLowerCase(),
      password_hash,
    })
    .select('id, email, name')
    .single();

  if (error)
    return res
      .status(400)
      .json({ error: error.code === '23505' ? 'Email already registered' : error.message });
  res.json({ token: sign(data), user: publicUser(data) });
}
router.post('/signup', signup);
router.post('/register', signup); // old name, kept so nothing breaks

router.post('/login', async (req, res) => {
  const { email, password } = req.body || {};
  const { data: user } = await supabase
    .from('users')
    .select('id, email, name, password_hash')
    .eq('email', (email || '').trim().toLowerCase())
    .maybeSingle();

  if (!user || !(await bcrypt.compare(password || '', user.password_hash)))
    return res.status(401).json({ error: 'Wrong email or password' });
  res.json({ token: sign(user), user: publicUser(user) });
});

// GET /api/me — used by the site to restore a login after a page reload
router.get('/me', auth, async (req, res) => {
  const { data: user } = await supabase
    .from('users')
    .select('id, email, name')
    .eq('id', req.user.id)
    .maybeSingle();
  if (!user) return res.status(401).json({ error: 'Please log in' });
  res.json({ user: publicUser(user) });
});

// POST /api/logout — tokens are stateless, the browser just discards its copy
router.post('/logout', (req, res) => res.json({ ok: true }));

/* ---------- Mock test attempts ---------- */

router.post('/attempts', auth, async (req, res) => {
  const { exam, set_number, score, answers } = req.body || {};
  const { error } = await supabase
    .from('attempts')
    .insert({ user_id: req.user.id, exam, set_number, score, answers });
  if (error) return res.status(500).json({ error: error.message });
  res.json({ ok: true });
});

router.get('/attempts', auth, async (req, res) => {
  const { data, error } = await supabase
    .from('attempts')
    .select('id, exam, set_number, score, taken_at')
    .eq('user_id', req.user.id)
    .order('taken_at', { ascending: false })
    .limit(50);
  if (error) return res.status(500).json({ error: error.message });
  res.json(data);
});

module.exports = router;
