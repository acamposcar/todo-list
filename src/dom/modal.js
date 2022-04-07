const newTaskModal = () => {
  const show = () => {
    document.querySelector('#add-task-popup').style.display = 'flex';
  };

  const clearAndHide = (target) => {
    target['add-task-title'].value = '';
    target['add-task-description'].value = '';
    target['add-task-date'].value = '';
    target.querySelectorAll('input[type="radio"]').forEach((radio) => {
      radio.checked = false;
    });
    document.querySelector('#add-task-popup').style.display = 'none';
  };
  return { show, clearAndHide };
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
