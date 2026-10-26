'use strict';
const form = document.querySelector('#task-form');
const input = document.querySelector('#task-input');
const priority = document.querySelector('#priority');
const tasksEl = document.querySelector('#tasks');
const summary = document.querySelector('#summary');
const search = document.querySelector('#search');
const error = document.querySelector('#task-error');
const emptyState = document.querySelector('#empty-state');
const filterButtons = [...document.querySelectorAll('[data-filter]')];
let tasks = [];
let filter = 'all';

function render() {
  const query = search.value.trim().toLocaleLowerCase();
  const visible = tasks.filter(task => {
    const matchesFilter = filter === 'all' || (filter === 'active' && !task.done) || (filter === 'done' && task.done);
    return matchesFilter && task.title.toLocaleLowerCase().includes(query);
  });
  const fragment = document.createDocumentFragment();
  for (const task of visible) {
    const li = document.createElement('li');
    li.className = `task${task.done ? ' done' : ''}`;
    const toggle = document.createElement('button');
    toggle.type = 'button';
    toggle.textContent = task.done ? 'Undo' : 'Complete';
    toggle.setAttribute('aria-label', `${task.done ? 'Reactivate' : 'Complete'} ${task.title}`);
    toggle.addEventListener('click', () => { task.done = !task.done; render(); });
    const title = document.createElement('span');
    title.className = 'task-title';
    title.textContent = task.title;
    const level = document.createElement('small');
    level.textContent = task.priority;
    const remove = document.createElement('button');
    remove.type = 'button';
    remove.className = 'remove';
    remove.textContent = 'Delete';
    remove.setAttribute('aria-label', `Delete ${task.title}`);
    remove.addEventListener('click', () => { tasks = tasks.filter(item => item.id !== task.id); render(); });
    li.append(toggle, title, level, remove);
    fragment.append(li);
  }
  tasksEl.replaceChildren(fragment);
  const completed = tasks.reduce((count, task) => count + Number(task.done), 0);
  summary.textContent = `${tasks.length} tasks · ${completed} completed · ${tasks.length - completed} remaining`;
  emptyState.hidden = visible.length !== 0;
  if (tasks.length && visible.length === 0) emptyState.textContent = 'No tasks match your search or filter.';
}
form.addEventListener('submit', event => {
  event.preventDefault();
  const title = input.value.trim();
  if (!title) {
    error.textContent = 'Enter a task name before adding it.';
    error.hidden = false;
    input.setAttribute('aria-invalid', 'true');
    input.focus();
    return;
  }
  if (tasks.some(task => task.title.toLocaleLowerCase() === title.toLocaleLowerCase())) {
    error.textContent = 'That task already exists. Try a different name.';
    error.hidden = false;
    input.setAttribute('aria-invalid', 'true');
    input.focus();
    return;
  }
  tasks.unshift({ id: crypto.randomUUID ? crypto.randomUUID() : String(Date.now()), title, priority: priority.value, done: false });
  error.hidden = true;
  input.removeAttribute('aria-invalid');
  input.value = '';
  render();
  input.focus();
});
input.addEventListener('input', () => { error.hidden = true; input.removeAttribute('aria-invalid'); });
search.addEventListener('input', render);
filterButtons.forEach(button => button.addEventListener('click', () => {
  filter = button.dataset.filter;
  filterButtons.forEach(item => item.setAttribute('aria-pressed', String(item === button)));
  render();
}));
render();
