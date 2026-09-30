require('dotenv').config();
const express = require('express');
const path = require('path');
const authRoutes = require('./routes/auth');   // keep your original line if it differs

const app = express();
const PORT = process.env.PORT || 3000;
const FRONTEND_DIR = path.join(__dirname, '..', 'frontend');

app.use(express.json());

// New Supabase routes go first, so they take priority
app.use('/api', require('./routes/api'));

// Your old auth routes stay as a fallback for now
app.use('/api', authRoutes);

// Serve the site itself from the same server
app.use(express.static(FRONTEND_DIR));

app.listen(PORT, () => {
  console.log(`Goal2Govt running at http://localhost:${PORT}`);
});