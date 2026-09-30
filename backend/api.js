const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const supabase = require('../db');

const router = express.Router();

const sign = (u) =>
  jwt.sign({ id: u.id, email: u.email }, process.env.JWT_SECRET, { expiresIn: '7d' });

function auth(req, res, next) {
  const token = (req.headers.authorization || '').replace('Bearer ', '');
  try {
    req.user = jwt.verify(token, process.env.JWT_SECRET);
    next();
  } catch {
    res.status(401).json({ error: 'Please log in' });
  }
}

// GET /api/questions?tier=p10&subject=maths&limit=10
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

// POST /api/register
router.post('/register', async (req, res) => {
  const { email, password } = req.body || {};
  if (!email || !password || password.length < 6)
    return res.status(400).json({ error: 'Email and a password of 6+ characters required' });

  const password_hash = await bcrypt.hash(password, 10);
  const { data, error } = await supabase
    .from('users')
    .insert({ email: email.toLowerCase(), password_hash })
    .select('id, email')
    .single();

  if (error)
    return res.status(400).json({ error: error.code === '23505' ? 'Email already registered' : error.message });
  res.json({ token: sign(data), user: data });
});

// POST /api/login
router.post('/login', async (req, res) => {
  const { email, password } = req.body || {};
  const { data: user } = await supabase
    .from('users')
    .select('id, email, password_hash')
    .eq('email', (email || '').toLowerCase())
    .maybeSingle();

  if (!user || !(await bcrypt.compare(password || '', user.password_hash)))
    return res.status(401).json({ error: 'Wrong email or password' });
  res.json({ token: sign(user), user: { id: user.id, email: user.email } });
});

// POST /api/attempts  (logged-in users)
router.post('/attempts', auth, async (req, res) => {
  const { exam, set_number, score, answers } = req.body || {};
  const { error } = await supabase
    .from('attempts')
    .insert({ user_id: req.user.id, exam, set_number, score, answers });
  if (error) return res.status(500).json({ error: error.message });
  res.json({ ok: true });
});

// GET /api/attempts  (logged-in users)
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
