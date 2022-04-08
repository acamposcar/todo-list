import { Task } from './task';
import { Project } from './project';
import app from './appData';

const projectSampleData = () => {
  /*
  *  Create sample data
  */
  app.addInbox();
  const work = new Project('Work');
  const personal = new Project('Personal');
  const inbox = app.getInboxProject();
  let task;

  app.addProject(work);

  task = new Task('Buy groceries');
  task.addDueDate(new Date());
  task.priority = 'medium';
  personal.addTask(task);
  app.addProject(personal);

  task = new Task('Learn React');
  task.addDueDate(new Date());
  task.priority = 'high';
  inbox.addTask(task);
  task = new Task('Study algorithms');
  task.addDueDate(new Date());
  task.priority = 'medium';
  inbox.addTask(task);
};

const recreateProjectsFromStorage = (savedProjects) => {
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

const readLocalStorage = () => {
  /*
  *  Read data stored in local storage
  */
  app.clearAllProjects();
  if (localStorage.getItem('app')) {
    try {
      const savedProjects = JSON.parse(localStorage.getItem('app'));
      recreateProjectsFromStorage(savedProjects);
    } catch (error) {
    // If there is any error, clear all and load sample data
      app.clearAllProjects();
      projectSampleData();
    }
  } else {
    // Load sample data if data isn't available on local storage
    projectSampleData();
  }
};

const saveLocalStorage = () => {
  /*
  *  Save data to local storage
  */
  localStorage.setItem('app', JSON.stringify(app.projects));
};

export { saveLocalStorage, readLocalStorage };