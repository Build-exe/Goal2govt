const express = require('express');
const jwt = require('jsonwebtoken');
const supabase = require('../db');

const router = express.Router();
const JWT_SECRET = process.env.JWT_SECRET;

// Same token format as routes/auth.js: { sub: userId }
function auth(req, res, next) {
  const header = req.headers.authorization || '';
  const token = header.startsWith('Bearer ') ? header.slice(7) : null;
  try {
    const payload = jwt.verify(token, JWT_SECRET);
    req.user = { id: payload.sub };
    next();
  } catch {
    res.status(401).json({ error: 'Please log in' });
  }
}

const shuffle = (a) => {
  const b = [...a];
  for (let i = b.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [b[i], b[j]] = [b[j], b[i]];
  }
  return b;
};

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

  const picked = shuffle(data).slice(0, limit).map((row) => {
    const correct = row.options[row.correct_index];
    const options = shuffle(row.options);
    return { ...row, options, correct_index: options.indexOf(correct) };
  });
  res.json(picked);
});

// GET /api/pool?tier=p10
// The whole question pool for one tier, in a stable order (by id) and in the
// shape the front-end already uses: { id, q, options, answer, category, explain }
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

  res.json(data.map((r) => ({
    id: r.id,
    q: r.question,
    options: r.options,
    answer: r.options[r.correct_index],
    category: r.subject,
    explain: r.explanation
  })));
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