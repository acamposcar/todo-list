import { Project } from './project';

const app = (() => {
  /*
  *  Object with all project data
  */
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
      alert('There is a project with the same name');
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

export default app;
