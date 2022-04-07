import { Task } from './task';
import { Project } from './project';

const recreateProjectsFromStorage = (app, savedProjects) => {
  /*
  *  Recreate projects and tasks stored in local storage
  */
  savedProjects.forEach((savedProject) => {
    const project = new Project(savedProject.name);
    app.addProject(project);

    savedProject.tasks.forEach((savedTask) => {
      const task = new Task();
      task.createTaskFromStorage(savedTask);
      project.addTask(task);
    });
  });
};

const readLocalStorage = (app) => {
  /*
  *  Read data stored in local storage
  */
  if (!localStorage.getItem('app')) return;
  try {
    const savedProjects = JSON.parse(localStorage.getItem('app'));
    recreateProjectsFromStorage(app, savedProjects);
  } catch (error) {
    // If there is any error, start with an empty TODO
    // app.clearAllProjects();
    console.log(error);
  }
};

const saveLocalStorage = (app) => {
  /*
  *  Save data to local storage
  */
  localStorage.setItem('app', JSON.stringify(app.projects));
};

export { saveLocalStorage, readLocalStorage };
