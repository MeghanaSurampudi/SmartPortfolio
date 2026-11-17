const jwt=require('jsonwebtoken');
function authenticate(req,res,next){
 const h=req.headers.authorization||'', token=h.startsWith('Bearer ')?h.slice(7):null;
 if(!token)return res.status(401).json({message:'Authentication required.'});
 try{req.user=jwt.verify(token,process.env.JWT_SECRET);next();}
 catch(_e){return res.status(401).json({message:'Invalid or expired token.'});}
}
function allowRoles(...roles){return(req,res,next)=>req.user&&roles.includes(req.user.role)?next():res.status(403).json({message:'Insufficient permissions.'});}
module.exports={authenticate,allowRoles};