document.addEventListener('DOMContentLoaded', () => {
  const tasks = JSON.parse(localStorage.getItem('tasks') || '[]');
  const taskContainer = document.getElementById('taskContainer');
  const nowMarker = document.getElementById('now-marker');
  const manageBtn = document.getElementById('manageBtn');
  const managePanel = document.getElementById('managePanel');
  const addTaskBtn = document.getElementById('addTaskBtn');
  const taskTitle = document.getElementById('taskTitle');
  const taskEmoji = document.getElementById('taskEmoji');
  const taskTime = document.getElementById('taskTime');

  function renderTasks() {
    taskContainer.innerHTML = '';
    tasks.forEach(task => {
      const icon = document.createElement('div');
      icon.className = 'task-icon';
      icon.textContent = task.emoji;
      const leftPercent = (task.time / 24) * 100;
      icon.style.left = 'calc(' + leftPercent + '% - 12px)';
      icon.title = task.title;
      taskContainer.appendChild(icon);
    });
  }

  function updateNowMarker() {
    const date = new Date();
    const hours = date.getHours() + date.getMinutes()/60;
    const leftPercent = (hours / 24) * 100;
    nowMarker.style.left = leftPercent + '%';
  }

  renderTasks();
  updateNowMarker();
  setInterval(updateNowMarker, 60000);

  manageBtn.addEventListener('click', () => {
    managePanel.classList.toggle('hidden');
  });

  addTaskBtn.addEventListener('click', () => {
    const title = taskTitle.value.trim();
    const emoji = taskEmoji.value.trim() || '🔔';
    const time = parseInt(taskTime.value);
    if (title && !isNaN(time) && time >= 0 && time <= 23) {
      tasks.push({ title, emoji, time });
      localStorage.setItem('tasks', JSON.stringify(tasks));
      renderTasks();
      taskTitle.value = '';
      taskEmoji.value = '';
      taskTime.value = '';
    } else {
      alert('Vul alle velden correct in (tijd 0-23).');
    }
  });
});
