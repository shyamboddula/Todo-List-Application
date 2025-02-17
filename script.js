document.addEventListener('DOMContentLoaded', () => {
    const taskInput = document.getElementById('task-input');
    const addTaskBtn = document.getElementById('add-task-btn');
    const taskList = document.getElementById('task-list');
    const themeSelect = document.getElementById('theme-select');

    const loadTasks = () => {
        const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
        taskList.innerHTML = '';
        tasks.forEach(task => {
            const li = document.createElement('li');
            li.textContent = task;
            const deleteBtn = document.createElement('span');
            deleteBtn.textContent = 'Delete';
            deleteBtn.classList.add('delete-btn');
            deleteBtn.onclick = () => {
                removeTask(task);
            };
            li.appendChild(deleteBtn);
            taskList.appendChild(li);
        });
    };

    const addTask = () => {
        const task = taskInput.value;
        if (task) {
            const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
            tasks.push(task);
            localStorage.setItem('tasks', JSON.stringify(tasks));
            taskInput.value = '';
            loadTasks();
        }
    };

    const removeTask = (task) => {
        let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
        tasks = tasks.filter(t => t !== task);
        localStorage.setItem('tasks', JSON.stringify(tasks));
        loadTasks();
    };

    const loadTheme = () => {
        const theme = localStorage.getItem('theme') || 'light';
        document.body.className = theme;
        themeSelect.value = theme;
    };

    const saveTheme = () => {
        const theme = themeSelect.value;
        localStorage.setItem('theme', theme);
        document.body.className = theme;
    };

    addTaskBtn.onclick = addTask;
    themeSelect.onchange = saveTheme;

    loadTasks();
    loadTheme();
});
