const router = require('express').Router();
const pool = require('../config/db');
const auth = require('../middleware/auth');
router.use(auth());
router.get('/', async (req,res,next) => {
  try {
    const studentId = req.user.role === 'student' ? req.user.id : Number(req.query.studentId);
    if (!studentId) return res.status(400).json({message:'studentId is required.'});
    const [rows] = await pool.execute('SELECT id,semester,marks,created_at,updated_at FROM marks WHERE student_id=? ORDER BY semester',[studentId]);
    res.json(rows);
  } catch(e){next(e);}
});
router.post('/', auth(['student']), async (req,res,next) => {
  try {
    const semester=Number(req.body.semester), marks=Number(req.body.marks);
    if(!Number.isInteger(semester)||semester<1||semester>8||!Number.isFinite(marks)||marks<0||marks>100) return res.status(400).json({message:'Semester must be 1–8 and marks must be between 0 and 100.'});
    await pool.execute('INSERT INTO marks(student_id,semester,marks) VALUES(?,?,?) ON DUPLICATE KEY UPDATE marks=VALUES(marks)',[req.user.id,semester,marks]);
    res.json({message:'Marks saved successfully.'});
  } catch(e){next(e);}
});
module.exports=router;
