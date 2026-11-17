require('dotenv').config();
const express = require('express');
const cors = require('cors');
const path = require('path');
const fs = require('fs');
const pool = require('./config/db');

const app = express();
app.use(cors({ origin: process.env.CLIENT_ORIGIN || true }));
app.use(express.json({ limit: '1mb' }));
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.get('/api/health', async (req, res) => {
  try {
    await pool.query('SELECT 1');
    res.json({ status: 'ok', database: 'connected' });
  } catch (error) {
    res.status(503).json({ status: 'error', database: 'unavailable' });
  }
});
app.get('/', (req, res) => res.send('Smart Portfolio API is running'));

app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/marks', require('./routes/marksRoutes'));
app.use('/api/feedback', require('./routes/feedbackRoutes'));
app.use('/api/certificates', require('./routes/certificateRoutes'));

app.use((err, req, res, next) => {
  console.error(err.message);
  if (err.code === 'LIMIT_FILE_SIZE') return res.status(413).json({ message: 'File exceeds the 5 MB limit.' });
  if (err.message === 'Only PDF, JPG, and PNG files are allowed.') return res.status(400).json({ message: err.message });
  res.status(500).json({ message: 'An unexpected server error occurred.' });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Smart Portfolio API listening on port ${PORT}`));
