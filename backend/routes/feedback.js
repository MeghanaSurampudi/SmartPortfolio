const router=require('express').Router(),db=require('../config/db');
const{authenticate,allowRoles}=require('../middleware/auth');
router.get('/me',authenticate,allowRoles('student'),async(req,res,next)=>{try{
 const[rows]=await db.execute('SELECT f.id,f.comment,f.created_at,u.name AS faculty_name FROM feedback f JOIN users u ON u.id=f.faculty_id WHERE f.student_id=? ORDER BY f.created_at DESC',[req.user.id]);res.json(rows);
}catch(e){next(e);}});
router.post('/',authenticate,allowRoles('faculty'),async(req,res,next)=>{try{
 const{studentId,comment}=req.body;if(!studentId||!comment||!comment.trim())return res.status(400).json({message:'Student ID and comment are required.'});
 const[students]=await db.execute('SELECT id FROM users WHERE id=? AND role=?',[studentId,'student']);
 if(!students.length)return res.status(404).json({message:'Student not found.'});
 await db.execute('INSERT INTO feedback(student_id,faculty_id,comment) VALUES(?,?,?)',[studentId,req.user.id,comment.trim()]);
 res.status(201).json({message:'Feedback submitted.'});
}catch(e){next(e);}});
module.exports=router;