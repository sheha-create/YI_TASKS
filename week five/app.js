'use strict';
const DATA_URL = './data/dashboard.json';
const $ = (selector, root = document) => root.querySelector(selector);
const $$ = (selector, root = document) => [...root.querySelectorAll(selector)];
let projects = [];
let currentData = null;

function formatDate(value) {
  const date = new Date(`${value}T12:00:00`);
  return new Intl.DateTimeFormat('en', { month: 'short', day: 'numeric' }).format(date);
}
function initials(name) {
  return name.split(/\s+/).slice(0, 2).map(part => part[0]).join('').toUpperCase();
}
function renderMetrics(summary) {
  const items = [
    ['Active projects', summary.activeProjects, 'Across all teams'],
    ['Tasks completed', summary.completedTasks, 'This reporting period'],
    ['Team utilization', `${summary.teamUtilization}%`, 'Healthy team capacity'],
    ['On-time delivery', `${summary.onTimeRate}%`, 'Delivery target: 90%']
  ];
  $('#metrics').replaceChildren(...items.map(([label, value, note]) => {
    const card = document.createElement('article');
    card.className = 'metric-card';
    const title = document.createElement('p'); title.textContent = label;
    const number = document.createElement('div'); number.className = 'metric-value'; number.textContent = value;
    const small = document.createElement('small'); small.textContent = note;
    card.append(title, number, small);
    return card;
  }));
}
function renderChart(trend) {
  const chart = $('#trend-chart');
  const max = Math.max(...trend.flatMap(item => [item.completed, item.created]));
  const fragment = document.createDocumentFragment();
  trend.forEach(item => {
    const column = document.createElement('div'); column.className = 'chart-column';
    const pair = document.createElement('div'); pair.className = 'bar-pair';
    [['completed', item.completed], ['created', item.created]].forEach(([kind, value]) => {
      const bar = document.createElement('div');
      bar.className = `bar ${kind}`;
      bar.style.height = `${Math.max(3, value / max * 100)}%`;
      bar.title = `${item.month}: ${value} ${kind} tasks`;
      bar.setAttribute('aria-hidden', 'true');
      pair.append(bar);
    });
    const month = document.createElement('span'); month.textContent = item.month;
    column.append(pair, month); fragment.append(column);
  });
  chart.replaceChildren(fragment);
  chart.setAttribute('aria-label', `Bar chart: ${trend.map(item => `${item.month}, ${item.completed} completed, ${item.created} created`).join('; ')}`);
}
function renderActivity(activity) {
  const list = $('#activity-list');
  const fragment = document.createDocumentFragment();
  activity.forEach(item => {
    const li = document.createElement('li');
    const avatar = document.createElement('span'); avatar.className = `activity-avatar tone-${item.tone}`; avatar.textContent = item.initials; avatar.setAttribute('aria-hidden', 'true');
    const copy = document.createElement('div'); copy.className = 'activity-copy';
    const action = document.createElement('div');
    const name = document.createElement('strong'); name.textContent = item.name;
    action.append(name, document.createTextNode(` ${item.action.replace(item.name, '').trim()}`));
    const time = document.createElement('time'); time.textContent = item.time;
    copy.append(action, time); li.append(avatar, copy); fragment.append(li);
  });
  list.replaceChildren(fragment);
}
function statusClass(status) {
  return `status-${status.toLowerCase().replace(/\s+/g, '-')}`;
}
function renderProjects() {
  const query = $('#project-search').value.trim().toLocaleLowerCase();
  const status = $('#status-filter').value;
  const sort = $('#sort-select').value;
  const visible = projects.filter(project =>
    (status === 'all' || project.status === status) &&
    [project.name, project.id, project.owner, project.team].some(value => value.toLocaleLowerCase().includes(query))
  );
  visible.sort((a, b) => sort === 'name' ? a.name.localeCompare(b.name) :
    sort === 'progress' ? b.progress - a.progress : a.dueDate.localeCompare(b.dueDate));
  const fragment = document.createDocumentFragment();
  visible.forEach(project => {
    const row = document.createElement('tr');
    const projectCell = document.createElement('td');
    const projectName = document.createElement('span'); projectName.className = 'project-name'; projectName.textContent = project.name;
    const projectId = document.createElement('span'); projectId.className = 'project-id'; projectId.textContent = project.id;
    projectCell.append(projectName, projectId);
    const ownerCell = document.createElement('td');
    const owner = document.createElement('span'); owner.className = 'owner';
    const ownerAvatar = document.createElement('span'); ownerAvatar.className = 'owner-avatar'; ownerAvatar.textContent = initials(project.owner); ownerAvatar.setAttribute('aria-hidden', 'true');
    const ownerName = document.createElement('span'); ownerName.textContent = project.owner;
    owner.append(ownerAvatar, ownerName); ownerCell.append(owner);
    const statusCell = document.createElement('td');
    const statusBadge = document.createElement('span'); statusBadge.className = `status ${statusClass(project.status)}`; statusBadge.textContent = project.status; statusCell.append(statusBadge);
    const progressCell = document.createElement('td'); progressCell.className = 'progress-cell';
    const progressLabel = document.createElement('div'); progressLabel.className = 'progress-label';
    const progressText = document.createElement('span'); progressText.textContent = `${project.progress}%`;
    const progress = document.createElement('span'); progress.textContent = 'complete';
    progressLabel.append(progressText, progress);
    const track = document.createElement('div'); track.className = 'progress-track'; track.setAttribute('role', 'progressbar');
    track.setAttribute('aria-label', `${project.name} completion`); track.setAttribute('aria-valuemin', '0'); track.setAttribute('aria-valuemax', '100'); track.setAttribute('aria-valuenow', String(project.progress));
    const fill = document.createElement('div'); fill.className = 'progress-fill'; fill.style.width = `${project.progress}%`; track.append(fill); progressCell.append(progressLabel, track);
    const dueCell = document.createElement('td'); dueCell.textContent = formatDate(project.dueDate);
    if (project.status === 'At risk') dueCell.className = 'due-soon';
    row.append(projectCell, ownerCell, statusCell, progressCell, dueCell); fragment.append(row);
  });
  $('#project-rows').replaceChildren(fragment);
  $('#project-total').textContent = `${visible.length} of ${projects.length} projects`;
  $('#table-status').textContent = `Showing ${visible.length} of ${projects.length} projects.`;
  $('#empty-state').hidden = visible.length > 0;
}
async function loadDashboard() {
  const refresh = $('#refresh-button');
  refresh.disabled = true;
  refresh.setAttribute('aria-busy', 'true');
  try {
    const response = await fetch(DATA_URL, { cache: 'no-cache' });
    if (!response.ok) throw new Error(`Data request failed: ${response.status}`);
    currentData = await response.json();
    projects = currentData.projects.slice();
    renderMetrics(currentData.summary);
    renderChart(currentData.summary.monthlyTrend);
    renderActivity(currentData.activity);
    renderProjects();
    $('#updated-label').textContent = `Data date: ${formatDate(currentData.meta.updated)}`;
  } catch (error) {
    $('#updated-label').textContent = 'Could not load dashboard data';
    $('#table-status').textContent = 'Dashboard data could not be loaded. Serve this folder with a local web server and try again.';
    $('#project-rows').innerHTML = '<tr><td colspan="5">Could not load data. Start a local server and reload.</td></tr>';
  } finally {
    refresh.disabled = false;
    refresh.removeAttribute('aria-busy');
  }
}
$('#project-search').addEventListener('input', renderProjects);
$('#status-filter').addEventListener('change', renderProjects);
$('#sort-select').addEventListener('change', renderProjects);
$('#refresh-button').addEventListener('click', loadDashboard);
$('#export-button').addEventListener('click', () => {
  const rows = [['ID','Project','Owner','Team','Status','Priority','Progress','Due Date','Tasks'], ...projects.map(p => [p.id,p.name,p.owner,p.team,p.status,p.priority,p.progress,p.dueDate,p.tasks])];
  const csv = rows.map(row => row.map(value => `"${String(value).replace(/"/g, '""')}"`).join(',')).join('\r\n');
  const url = URL.createObjectURL(new Blob([csv], {type:'text/csv;charset=utf-8;'}));
  const link = document.createElement('a'); link.href = url; link.download = 'pulseboard-projects.csv'; link.click();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
});
loadDashboard();
