require('dotenv').config();
const express = require('express');
const cors = require('cors');
const authRoutes = require('./routes/auth');
const marksRoutes = require('./routes/marks');
const feedbackRoutes = require('./routes/feedback');
const certificateRoutes = require('./routes/certificates');
const app = express();
app.use(cors({ origin: process.env.CLIENT_ORIGIN || true }));
app.use(express.json({ limit: '1mb' }));
app.get('/api/health', async (_req, res) => {
  try { await require('./config/db').query('SELECT 1'); res.json({status:'ok',database:'connected'}); }
  catch (_error) { res.status(503).json({status:'error',database:'unavailable'}); }
});
app.use('/api/auth', authRoutes);
app.use('/api/marks', marksRoutes);
app.use('/api/feedback', feedbackRoutes);
app.use('/api/certificates', certificateRoutes);
app.use((err,_req,res,_next)=>{ console.error(err.message); res.status(err.status||500).json({message:err.message||'Internal server error'}); });
const PORT=process.env.PORT||5000;
if(require.main===module) app.listen(PORT,()=>console.log(`Smart Portfolio API listening on port ${PORT}`));
module.exports=app;