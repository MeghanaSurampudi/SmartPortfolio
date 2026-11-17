const router=require('express').Router(),bcrypt=require('bcryptjs'),jwt=require('jsonwebtoken'),db=require('../config/db');
router.post('/register',async(req,res,next)=>{try{
 const{name,email,password}=req.body;
 if(!name||!email||!password||password.length<8)return res.status(400).json({message:'Name, email and password (8+ characters) are required.'});
 const[exists]=await db.execute('SELECT id FROM users WHERE email=?',[email.toLowerCase()]);
 if(exists.length)return res.status(409).json({message:'Email already registered.'});
 const hash=await bcrypt.hash(password,12);
 const[result]=await db.execute('INSERT INTO users(name,email,password_hash,role) VALUES(?,?,?,?)',[name.trim(),email.toLowerCase(),hash,'student']);
 res.status(201).json({message:'Student account created.',userId:result.insertId});
}catch(e){next(e);}});
router.post('/login',async(req,res,next)=>{try{
 const{email,password,role}=req.body;if(!email||!password||!role)return res.status(400).json({message:'Email, password and role are required.'});
 const[rows]=await db.execute('SELECT id,name,email,password_hash,role FROM users WHERE email=?',[email.toLowerCase()]);
 const u=rows[0];if(!u||u.role!==role||!(await bcrypt.compare(password,u.password_hash)))return res.status(401).json({message:'Incorrect email, password or role.'});
 const token=jwt.sign({id:u.id,role:u.role,name:u.name},process.env.JWT_SECRET,{expiresIn:'8h'});
 res.json({token,user:{id:u.id,name:u.name,email:u.email,role:u.role}});
}catch(e){next(e);}});
module.exports=router;