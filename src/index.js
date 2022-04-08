/* eslint-disable max-classes-per-file */
import { createNewTask, editTask } from './logic/task';
import { app, createNewProject } from './logic/project';
import { updateTaskList, updateProjectList } from './dom/dom';
import { taskModal, projectModal } from './dom/modal';
import { readLocalStorage, saveLocalStorage } from './logic/localStorage';

readLocalStorage(app);
app.addInbox();
console.log(app);
function getCurrentProject() {
  const currentProjectName = document.querySelector('#add-task').dataset.project;
  const [currentProject] = app.projects.filter((project) => project.name === currentProjectName);
  return currentProject;
}

document.querySelector('#add-task-popup').addEventListener('submit', (event) => {
  event.preventDefault();
  const currentProject = getCurrentProject();
  const taskID = event.target['task-id'].value;
  if (taskID) {
    createNewTask(event.target, taskID, currentProject);
  } else {
    const task = createNewTask(event.target);
    if (!task) return;
    currentProject.addTask(task);
  }
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

document.querySelector('[data-inbox]').addEventListener('click', () => {
  updateTaskList(app.getInboxProject());
});

// Load inbox when page loads
updateTaskList(app.getInboxProject());

updateProjectList();
