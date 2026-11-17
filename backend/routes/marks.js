const router=require('express').Router(),db=require('../config/db');
const{authenticate,allowRoles}=require('../middleware/auth');
router.get('/me',authenticate,allowRoles('student'),async(req,res,next)=>{try{const[rows]=await db.execute('SELECT id,semester,subject,marks,created_at FROM marks WHERE student_id=? ORDER BY semester,subject',[req.user.id]);res.json(rows);}catch(e){next(e);}});
router.post('/',authenticate,allowRoles('student'),async(req,res,next)=>{try{
 const{semester,subject,marks}=req.body,m=Number(marks),s=Number(semester);
 if(!Number.isInteger(s)||s<1||s>8||!subject||!Number.isFinite(m)||m<0||m>100)return res.status(400).json({message:'Provide semester 1–8, subject and marks 0–100.'});
 await db.execute('INSERT INTO marks(student_id,semester,subject,marks) VALUES(?,?,?,?) ON DUPLICATE KEY UPDATE marks=VALUES(marks)',[req.user.id,s,subject.trim(),m]);
 res.status(201).json({message:'Marks saved.'});
}catch(e){next(e);}});
router.get('/students',authenticate,allowRoles('faculty','careerCell'),async(req,res,next)=>{try{const[rows]=await db.execute('SELECT id,name,email FROM users WHERE role=? ORDER BY name',['student']);res.json(rows);}catch(e){next(e);}});\nrouter.get('/student/:studentId',authenticate,allowRoles('faculty','careerCell'),async(req,res,next)=>{try{const[rows]=await db.execute('SELECT semester,subject,marks FROM marks WHERE student_id=? ORDER BY semester,subject',[req.params.studentId]);res.json(rows);}catch(e){next(e);}});
module.exports=router;