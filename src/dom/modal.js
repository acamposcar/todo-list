const newTaskModal = () => {
  const show = () => {
    document.querySelector('#add-task-popup').style.display = 'flex';
  };

  const populateModal = (task) => {
    document.querySelector('#add-task-title').value = task.title;
    document.querySelector('#add-task-description').value = task.description ? task.description : '';
    document.querySelector('#add-task-date').value = task.dueDate ? task.dueDate.toISOString().substring(0, 10) : '';
    document.querySelector('#task-id').value = task.id;
    if (!task.priority) return;
    document.querySelector(`#add-task-${task.priority}`).checked = true;
  };

  const clearAndHide = (target) => {
    target['add-task-title'].value = '';
    target['add-task-description'].value = '';
    target['add-task-date'].value = '';
    target['task-id'].value = '';
    target.querySelectorAll('input[type="radio"]').forEach((radio) => {
      radio.checked = false;
    });
    document.querySelector('#add-task-popup').style.display = 'none';
  };
  return { show, clearAndHide, populateModal };
};

const newProjectModal = () => {
  const show = () => {
    document.querySelector('#add-project-popup').style.display = 'flex';
  };
  const clearAndHide = (target) => {
    target['add-project-name'].value = '';
    document.querySelector('#add-project-popup').style.display = 'none';
  };
  return { show, clearAndHide };
};

const taskModal = newTaskModal();
const projectModal = newProjectModal();

export { taskModal, projectModal };
