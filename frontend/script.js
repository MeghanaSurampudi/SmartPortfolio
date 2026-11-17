// Demo-only browser storage; this script does not persist data to MySQL.
document.addEventListener('DOMContentLoaded', () => {
  const marksForm = document.getElementById('marksForm');
  const certificateForm = document.getElementById('certificateForm');
  const commentsList = document.getElementById('commentsList');
  const chartCanvas = document.getElementById('performanceChart');
  let marksData = JSON.parse(localStorage.getItem('marksData') || '[]');
  const commentsData = JSON.parse(localStorage.getItem('commentsData') || '[]');

  if (commentsList) {
    commentsList.replaceChildren();
    if (!commentsData.length) {
      const empty = document.createElement('p');
      empty.textContent = 'No comments yet.';
      commentsList.appendChild(empty);
    } else {
      commentsData.forEach((comment) => {
        const p = document.createElement('p');
        p.textContent = comment;
        commentsList.appendChild(p);
      });
    }
  }

  let chart;
  const updateChart = () => {
    if (!chartCanvas || typeof Chart === 'undefined') return;
    marksData.sort((a, b) => Number(a.semester) - Number(b.semester));
    if (chart) chart.destroy();
    chart = new Chart(chartCanvas.getContext('2d'), {
      type: 'line',
      data: {
        labels: marksData.map((item) => 'Sem ' + item.semester),
        datasets: [{label:'Semester Marks (%)',data:marksData.map((item)=>item.marks),borderColor:'#5C6AC4',backgroundColor:'rgba(92,106,196,.2)',fill:true,tension:.2,pointRadius:5}]
      },
      options: {responsive:true,scales:{y:{suggestedMin:0,suggestedMax:100}}}
    });
  };

  if (marksForm) {
    marksForm.addEventListener('submit', (event) => {
      event.preventDefault();
      const semester = marksForm.querySelector('#semester').value;
      const marks = Number(marksForm.querySelector('#marks').value);
      const existing = marksData.find((item) => item.semester === semester);
      if (existing) existing.marks = marks;
      else marksData.push({semester, marks});
      localStorage.setItem('marksData', JSON.stringify(marksData));
      updateChart();
      marksForm.reset();
    });
  }

  if (certificateForm) {
    certificateForm.addEventListener('submit', (event) => {
      event.preventDefault();
      alert('Demo only: the selected certificate has not been uploaded to a server.');
      certificateForm.reset();
    });
  }
  updateChart();
});