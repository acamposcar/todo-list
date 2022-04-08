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
  const inboxName = 'Inbox';

  const clearAllProjects = () => {
    projects = [];
  };

  const deleteProject = (project) => {
    app.projects = app.projects.filter((proj) => proj !== project);
  };

  const getProjectByName = (projectName) => {
    const [project] = app.projects.filter((proj) => proj.name === projectName);
    return project;
  };

  const getTaskById = (taskID, project) => {
    const [task] = project.tasks.filter((taskItem) => taskID === taskItem.id);
    return task;
  };

  const getInboxProject = () => {
    const [project] = app.projects.filter((proj) => proj.name === inboxName);
    return project;
  };

  const addInbox = () => {
    if (getProjectByName(inboxName)) return;
    app.projects.push(new Project(inboxName));
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

  return {
    projects,
    clearAllProjects,
    addProject,
    deleteProject,
    getProjectByName,
    addInbox,
    getInboxProject,
    getTaskById,
  };
})();

export { app, Project, createNewProject };
