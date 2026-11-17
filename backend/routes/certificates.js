const router=require('express').Router(),multer=require('multer'),path=require('path'),fs=require('fs'),db=require('../config/db');
const{authenticate,allowRoles}=require('../middleware/auth');
const dir=path.join(__dirname,'..','uploads');fs.mkdirSync(dir,{recursive:true});
const upload=multer({storage:multer.diskStorage({destination:(_r,_f,cb)=>cb(null,dir),filename:(req,file,cb)=>cb(null,`${req.user.id}-${Date.now()}${path.extname(file.originalname).toLowerCase()}`)}),limits:{fileSize:5*1024*1024,files:5},fileFilter:(_r,f,cb)=>['.pdf','.png','.jpg','.jpeg'].includes(path.extname(f.originalname).toLowerCase())?cb(null,true):cb(new Error('Only PDF, PNG and JPG files are allowed.'))});
router.post('/',authenticate,allowRoles('student'),upload.array('certificates',5),async(req,res,next)=>{try{
 if(!req.files?.length)return res.status(400).json({message:'Choose at least one file.'});
 const c=await db.getConnection();try{await c.beginTransaction();for(const f of req.files)await c.execute('INSERT INTO certificates(student_id,original_name,stored_name,mime_type,file_size) VALUES(?,?,?,?,?)',[req.user.id,f.originalname,f.filename,f.mimetype,f.size]);await c.commit();}catch(e){await c.rollback();throw e;}finally{c.release();}
 res.status(201).json({message:'Certificate(s) uploaded.',count:req.files.length});
}catch(e){next(e);}});
router.get('/me',authenticate,allowRoles('student'),async(req,res,next)=>{try{const[rows]=await db.execute('SELECT id,original_name,mime_type,file_size,created_at FROM certificates WHERE student_id=? ORDER BY created_at DESC',[req.user.id]);res.json(rows);}catch(e){next(e);}});
module.exports=router;