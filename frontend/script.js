const API='http://localhost:5000/api';
const token=localStorage.getItem('spToken');
const user=JSON.parse(localStorage.getItem('spUser')||'null');
const headers={'Authorization':'Bearer '+token};
async function api(path,options={}){const response=await fetch(API+path,{...options,headers:{...headers,...(options.headers||{})}});const data=await response.json().catch(()=>({}));if(!response.ok)throw new Error(data.message||'Request failed');return data;}
document.addEventListener('DOMContentLoaded',async()=>{
 if(!token||!user){location.href='login.html';return;}
 if(user.role!=='student'){location.href='faculty.html';return;}
 document.getElementById('welcome').textContent='Welcome, '+user.name;
 document.getElementById('logoutLink').addEventListener('click',()=>{localStorage.removeItem('spToken');localStorage.removeItem('spUser');});
 const marksForm=document.getElementById('marksForm'), certForm=document.getElementById('certificateForm');
 let chart;
 async function loadMarks(){const rows=await api('/marks');if(typeof Chart!=='undefined'){if(chart)chart.destroy();chart=new Chart(document.getElementById('performanceChart'),{type:'line',data:{labels:rows.map(x=>'Semester '+x.semester),datasets:[{label:'Marks (%)',data:rows.map(x=>Number(x.marks)),borderColor:'#5C6AC4',tension:.2}]},options:{responsive:true,scales:{y:{min:0,max:100}}}});}}
 async function loadFeedback(){const rows=await api('/feedback');const list=document.getElementById('commentsList');list.replaceChildren();rows.forEach(x=>{const li=document.createElement('li');li.textContent=x.faculty_name+': '+x.comment;list.appendChild(li);});if(!rows.length)list.textContent='No feedback yet.';}
 async function loadCertificates(){const rows=await api('/certificates');const list=document.getElementById('certificateList');list.replaceChildren();rows.forEach(x=>{const li=document.createElement('li');li.textContent=x.original_name+' (uploaded '+new Date(x.created_at).toLocaleDateString()+')';list.appendChild(li);});}
 marksForm.addEventListener('submit',async e=>{e.preventDefault();const msg=document.getElementById('marksMessage');try{await api('/marks',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({semester:document.getElementById('semester').value,marks:document.getElementById('marks').value})});msg.textContent='Marks saved.';marksForm.reset();await loadMarks();}catch(err){msg.textContent=err.message;}});
 certForm.addEventListener('submit',async e=>{e.preventDefault();const msg=document.getElementById('certificateMessage');const data=new FormData();for(const file of document.getElementById('certificateFiles').files)data.append('certificates',file);try{const result=await api('/certificates',{method:'POST',body:data});msg.textContent=result.message;certForm.reset();await loadCertificates();}catch(err){msg.textContent=err.message;}});
 try{await Promise.all([loadMarks(),loadFeedback(),loadCertificates()]);}catch(err){document.getElementById('welcome').textContent='Unable to load dashboard: '+err.message;}
});