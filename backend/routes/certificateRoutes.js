const router = require('express').Router();
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const pool = require('../config/db');
const auth = require('../middleware/auth');
const uploadDir=path.join(__dirname,'..','uploads');
fs.mkdirSync(uploadDir,{recursive:true});
const storage=multer.diskStorage({destination:(req,file,cb)=>cb(null,uploadDir),filename:(req,file,cb)=>cb(null,Date.now()+'-'+Math.round(Math.random()*1e9)+path.extname(file.originalname).toLowerCase())});
const upload=multer({storage,limits:{fileSize:5*1024*1024},fileFilter:(req,file,cb)=>{
  if(['application/pdf','image/jpeg','image/png'].includes(file.mimetype)) return cb(null,true);
  cb(new Error('Only PDF, JPG, and PNG files are allowed.'));
}});
router.use(auth(['student']));
router.get('/',async(req,res,next)=>{
  try{const [rows]=await pool.execute('SELECT id,original_name,mime_type,created_at FROM certificates WHERE student_id=? ORDER BY created_at DESC',[req.user.id]);res.json(rows);}catch(e){next(e);}
});
router.post('/',upload.array('certificates',5),async(req,res,next)=>{
  try{
    if(!req.files||!req.files.length)return res.status(400).json({message:'Choose at least one certificate file.'});
    for(const file of req.files) await pool.execute('INSERT INTO certificates(student_id,original_name,stored_name,mime_type) VALUES(?,?,?,?)',[req.user.id,path.basename(file.originalname),file.filename,file.mimetype]);
    res.status(201).json({message:req.files.length+' certificate(s) uploaded.'});
  }catch(e){next(e);}
});
module.exports=router;
