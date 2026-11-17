const router = require('express').Router();
const pool = require('../config/db');
const auth = require('../middleware/auth');
router.use(auth());
router.get('/', async (req,res,next) => {
  try {
    const studentId = req.user.role === 'student' ? req.user.id : Number(req.query.studentId);
    if (!studentId) return res.status(400).json({message:'studentId is required.'});
    const [rows] = await pool.execute('SELECT f.id,f.comment,f.created_at,u.name AS faculty_name FROM feedback f JOIN users u ON u.id=f.faculty_id WHERE f.student_id=? ORDER BY f.created_at DESC',[studentId]);
    res.json(rows);
  } catch(e){next(e);}
});
router.post('/', auth(['faculty','careerCell']), async (req,res,next) => {
  try {
    const studentId=Number(req.body.studentId), comment=String(req.body.comment||'').trim();
    if(!Number.isInteger(studentId)||!comment||comment.length>3000) return res.status(400).json({message:'A valid studentId and feedback (up to 3000 characters) are required.'});
    const [students]=await pool.execute('SELECT id FROM users WHERE id=? AND role="student"',[studentId]);
    if(!students.length) return res.status(404).json({message:'Student not found.'});
    await pool.execute('INSERT INTO feedback(student_id,faculty_id,comment) VALUES(?,?,?)',[studentId,req.user.id,comment]);
    res.status(201).json({message:'Feedback submitted.'});
  } catch(e){next(e);}
});
module.exports=router;
