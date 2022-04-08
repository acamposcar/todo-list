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

function saveProject(target) {
  /*
  *  Creates new project using modal form data
  */
  const project = new Project(target['add-project-name'].value);
  return project;
}

export { Project, saveProject };
