import { v4 as uuidv4 } from 'uuid';

class Project {
  constructor(name) {
    this.name = name;
    this.tasks = [];
    this.id = uuidv4();
  }

  addTask = (task) => {
    if (this.tasks.includes(task)) return;
    this.tasks.push(task);
  };

  deleteTask = (task) => {
    this.tasks = this.tasks.filter((item) => item !== task);
  };
}

function createNewProject(target) {
  /*
  *  Creates new project using modal form data
  */
  const project = new Project(target['add-project-name'].value);
  return project;
}

const app = (() => {
  let projects = [];

  const clearAllProjects = () => {
    projects = [];
  };

  const addProject = (project) => {
    const projectNameExist = app.projects.some(
      (proj) => proj.name.toLowerCase() === project.name.toLowerCase(),
    );

    if (projectNameExist) {
      alert('Project exist with same name');
      return;
    }
    app.projects.push(project);
  };

  return { projects, clearAllProjects, addProject };
})();

export { app, Project, createNewProject };
