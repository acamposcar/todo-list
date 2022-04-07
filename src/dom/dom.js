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
  element.querySelector('.delete-task').addEventListener('click', () => {
    project.deleteTask(task);
    saveLocalStorage(app);
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

function updateTaskList(project) {
  document.querySelector('[data-project-title]').textContent = project.name;
  const tasksContainer = document.querySelector('#tasks-list');
  tasksContainer.innerHTML = '';
  project.tasks.forEach((task) => {
    appendTaskElement(task, tasksContainer, project);
  });
  appendNewTaskElement(project, tasksContainer);
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
  });
  container.appendChild(projectElement);
}

export {
  updateTaskList, appendProjectElement,
};
