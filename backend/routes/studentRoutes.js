const router=require('express').Router();
const pool=require('../config/db');
const auth=require('../middleware/auth');
router.get('/',auth(['faculty','careerCell']),async(req,res,next)=>{
 try{const [rows]=await pool.execute('SELECT id,name,email FROM users WHERE role="student" ORDER BY name');res.json(rows);}catch(e){next(e);}
});
module.exports=router;
