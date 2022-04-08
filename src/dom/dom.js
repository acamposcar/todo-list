import { format } from 'date-fns';
import { taskModal } from './modal';
import { app } from '../logic/project';
import { saveLocalStorage } from '../logic/localStorage';

function appendTaskElement(task, container, project) {
  const element = document.createElement('div');
  element.classList.add('task');
  if (task.completed) element.classList.add('completed');

  const priorityText = { low: '!', medium: '!!', high: '!!!' };
  element.innerHTML = (`
      <input type="checkbox" ${task.completed ? 'checked' : ''}>
      <div class="title">${task.title}</div>
      <div class="due-date">${task.dueDate ? format(task.dueDate, 'MMM do yy') : ''}</div>
      <div class="priority ${task.priority ? task.priority : ''}">${task.priority ? priorityText[task.priority] : ''}</div>
      <span class="material-icons-outlined delete-task">
        delete
      </span>`);
  container.appendChild(element);
  element.querySelector('input').addEventListener('change', () => {
    task.toggleCompleted();
    element.classList.toggle('completed');
  });
  element.querySelector('.title').addEventListener('click', () => {
    taskModal.populateModal(task);
    taskModal.show();
  });
  element.querySelector('.delete-task').addEventListener('click', () => {
    project.deleteTask(task);
    saveLocalStorage();
    element.remove();
  });
}

function appendNewTaskElement(project, container) {
  const element = document.createElement('div');
  element.classList.add('task');
  element.id = 'add-task';
  element.dataset.project = project.name;
  element.innerHTML = (`
    <span id="add-task-icon" class="material-icons-outlined">
      add_circle
    </span>
    <div class="title">Add task</div>`);
  container.appendChild(element);
  element.addEventListener('click', () => {
    taskModal.show();
  });
}

function updateProjectList() {
  const projectsContainer = document.querySelector('#projects-list');

  projectsContainer.innerHTML = '';
  app.projects.forEach((project) => {
    if (project === app.getInboxProject()) return;
    appendProjectElement(project, projectsContainer);
  });
}

function updateTaskList(project) {
  updateProjectTitle(project);
  const tasksContainer = document.querySelector('#tasks-list');
  tasksContainer.innerHTML = '';
  project.tasks.forEach((task) => {
    appendTaskElement(task, tasksContainer, project);
  });
  appendNewTaskElement(project, tasksContainer);
}

function updateProjectTitle(project) {
  const container = document.querySelector('[data-project-title]');
  // If the project is Inbox, do not show Delete icon
  if (project === app.getInboxProject()) {
    container.innerHTML = (`
        <h1>${project.name}</h1>`);
  } else {
    container.innerHTML = (`
        <h1>${project.name}</h1>
        <div class="icon delete-project">
          <span class="material-icons-outlined">
              delete
          </span>
        </div>`);
    container.querySelector('.icon').addEventListener('click', () => {
      app.deleteProject(project);
      updateProjectList();
      const inboxProject = app.getProjectByName('Inbox');
      updateTaskList(inboxProject);
    });
  }
}
function changeActiveProject(activeProjectElement) {
  document.querySelectorAll('.nav-item').forEach((element) => {
    element.classList.remove('active');
  });
  activeProjectElement.classList.add('active');
}

function appendProjectElement(project, container) {
  const projectElement = document.createElement('li');
  projectElement.classList.add('nav-item', 'project');
  projectElement.innerHTML = (`
      <div class="icon">
          <span class="material-icons">
              checklist
          </span>
      </div>
      <div class="page">
          ${project.name}
      </div>`);
  projectElement.addEventListener('click', () => {
    updateTaskList(project);
    changeActiveProject(projectElement);
  });
  container.appendChild(projectElement);
}

export {
  updateTaskList, appendProjectElement, updateProjectList, changeActiveProject,
};
