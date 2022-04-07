/* eslint-disable max-classes-per-file */
import { createNewTask } from './logic/task';
import { app, createNewProject } from './logic/project';
import { updateTaskList, appendProjectElement } from './dom/dom';
import { taskModal, projectModal } from './dom/modal';
import { readLocalStorage, saveLocalStorage } from './logic/localStorage';

readLocalStorage(app);

function updateProjectList() {
  const projectsContainer = document.querySelector('#projects-list');

  projectsContainer.innerHTML = '';
  app.projects.forEach((project) => {
    appendProjectElement(project, projectsContainer);
  });
}

function getCurrentProject() {
  const currentProjectName = document.querySelector('#add-task').dataset.project;
  const [currentProject] = app.projects.filter((project) => project.name === currentProjectName);
  return currentProject;
}

document.querySelector('#add-task-popup').addEventListener('submit', (event) => {
  event.preventDefault();
  const task = createNewTask(event.target);
  const currentProject = getCurrentProject();
  currentProject.addTask(task);
  saveLocalStorage(app);
  taskModal.clearAndHide(event.target);
  updateTaskList(currentProject);
});

document.querySelector('#add-task-cancel').addEventListener('click', () => {
  const popup = document.querySelector('#add-task-popup');
  taskModal.clearAndHide(popup);
});

document.querySelector('#add-project').addEventListener('click', () => {
  projectModal.show();
});

document.querySelector('#add-project-popup').addEventListener('submit', (event) => {
  event.preventDefault();
  const project = createNewProject(event.target);
  app.addProject(project);
  saveLocalStorage(app);
  projectModal.clearAndHide(event.target);
  updateProjectList();
});

document.querySelector('#add-project-cancel').addEventListener('click', () => {
  const popup = document.querySelector('#add-project-popup');
  projectModal.clearAndHide(popup);
});

updateProjectList();
