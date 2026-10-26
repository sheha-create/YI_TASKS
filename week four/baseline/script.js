const form = document.querySelector('#task-form');
const input = document.querySelector('#task-input');
const priority = document.querySelector('#priority');
const tasksEl = document.querySelector('#tasks');
const summary = document.querySelector('#summary');
const search = document.querySelector('#search');
let tasks = [];
let filter = 'all';

function render() {
  tasksEl.innerHTML = '';
  const visible = tasks.filter(task => {
    const matchesFilter = filter === 'all' || (filter === 'active' && !task.done) || (filter === 'done' && task.done);
    return matchesFilter && task.title.toLowerCase().includes(search.value.toLowerCase());
  });
  visible.forEach(task => {
    const li = document.createElement('li');
    li.className = 'task' + (task.done ? ' done' : '');
    const toggle = document.createElement('button');
    toggle.textContent = task.done ? 'Undo' : 'Complete';
    toggle.addEventListener('click', () => { task.done = !task.done; render(); });
    const title = document.createElement('span');
    title.textContent = task.title;
    const level = document.createElement('small');
    level.textContent = task.priority;
    const remove = document.createElement('button');
    remove.className = 'remove';
    remove.textContent = 'Delete';
    remove.addEventListener('click', () => { tasks = tasks.filter(item => item.id !== task.id); render(); });
    li.append(toggle, title, level, remove);
    tasksEl.append(li);
  });
  summary.textContent = `${tasks.length} tasks · ${tasks.filter(t => t.done).length} completed`;
}
form.addEventListener('submit', event => {
  event.preventDefault();
  const title = input.value.trim();
  if (!title) return;
  tasks.unshift({ id: Date.now() + Math.random(), title, priority: priority.value, done: false });
  input.value = '';
  render();
});
search.addEventListener('input', render);
document.querySelectorAll('[data-filter]').forEach(button => button.addEventListener('click', () => {
  filter = button.dataset.filter;
  render();
}));
render();
