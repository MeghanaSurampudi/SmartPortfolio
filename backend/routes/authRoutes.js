const router = require('express').Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const pool = require('../config/db');

// Public registration intentionally creates student accounts only.
router.post('/register', async (req, res, next) => {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password || password.length < 8) return res.status(400).json({ message: 'Name, valid email, and password (at least 8 characters) are required.' });
    const [existing] = await pool.execute('SELECT id FROM users WHERE email = ?', [email.toLowerCase()]);
    if (existing.length) return res.status(409).json({ message: 'An account with this email already exists.' });
    const hash = await bcrypt.hash(password, 12);
    const [result] = await pool.execute('INSERT INTO users (name,email,password_hash,role) VALUES (?,?,?,?)', [name.trim(), email.toLowerCase(), hash, 'student']);
    res.status(201).json({ message: 'Student account created.', userId: result.insertId });
  } catch (error) { next(error); }
});

router.post('/login', async (req, res, next) => {
  try {
    const { email, password, role } = req.body;
    if (!email || !password || !role) return res.status(400).json({ message: 'Email, password, and role are required.' });
    const [rows] = await pool.execute('SELECT id,name,email,password_hash,role FROM users WHERE email = ?', [email.toLowerCase()]);
    const user = rows[0];
    if (!user || user.role !== role || !(await bcrypt.compare(password, user.password_hash))) return res.status(401).json({ message: 'Invalid email, password, or role.' });
    const token = jwt.sign({ id: user.id, name: user.name, role: user.role }, process.env.JWT_SECRET, { expiresIn: '8h' });
    res.json({ token, user: { id: user.id, name: user.name, email: user.email, role: user.role } });
  } catch (error) { next(error); }
});
module.exports = router;
