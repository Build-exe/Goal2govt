require('dotenv').config();
const path = require('path');
const express = require('express');
const authRoutes = require('./routes/auth');

const app = express();
const PORT = process.env.PORT || 3000;
const FRONTEND_DIR = path.join(__dirname, '..', 'frontend');

app.use(express.json());

// Auth API used by the Sign Up / Log In modal and the mock-test gate.
app.use('/api', authRoutes);

// Serve the site itself (HTML/CSS/JS) from the same server, so the whole
// project runs with a single command and there's no CORS to configure.
app.use(express.static(FRONTEND_DIR));

app.listen(PORT, () => {
  console.log(`Goal2Govt running at http://localhost:${PORT}`);
});
