let tasks = [];
let filterType = "all";

function addTask() {
    const input = document.getElementById("taskInput");
    const error = document.getElementById("error");

    if (input.value.trim() === "") {
        error.textContent = "Task cannot be empty ❌";
        return;
    }

    error.textContent = "";

    tasks.push({
        text: input.value,
        completed: false
    });

    input.value = "";
    displayTasks();
}

function displayTasks() {
    const list = document.getElementById("taskList");
    list.innerHTML = "";

    let filteredTasks = tasks;

    if (filterType === "completed") {
        filteredTasks = tasks.filter(t => t.completed);
    } else if (filterType === "pending") {
        filteredTasks = tasks.filter(t => !t.completed);
    }

    filteredTasks.forEach((task, index) => {
        const li = document.createElement("li");
        li.className = "list-group-item d-flex justify-content-between align-items-center";

        const span = document.createElement("span");
        span.textContent = task.text;
        span.className = task.completed ? "completed" : "";
        span.onclick = () => toggleComplete(index);

        const btnGroup = document.createElement("div");

        const editBtn = document.createElement("button");
        editBtn.textContent = "Edit";
        editBtn.className = "btn btn-sm btn-warning me-2";
        editBtn.onclick = () => editTask(index);

        const delBtn = document.createElement("button");
        delBtn.textContent = "Delete";
        delBtn.className = "btn btn-sm btn-danger";
        delBtn.onclick = () => deleteTask(index);

        btnGroup.append(editBtn, delBtn);
        li.append(span, btnGroup);
        list.appendChild(li);
    });

    updateCounter();
}

function deleteTask(index) {
    tasks.splice(index, 1);
    displayTasks();
}

function editTask(index) {
    const newTask = prompt("Edit task:", tasks[index].text);
    if (newTask !== null && newTask.trim() !== "") {
        tasks[index].text = newTask;
        displayTasks();
    }
}

function toggleComplete(index) {
    tasks[index].completed = !tasks[index].completed;
    displayTasks();
}

function updateCounter() {
    const total = tasks.length;
    const completed = tasks.filter(t => t.completed).length;
    document.getElementById("counter").textContent =
        `Total: ${total} | Completed: ${completed}`;
}

function filterTasks(type) {
    filterType = type;
    displayTasks();
}

function toggleTheme() {
    document.body.classList.toggle("dark-mode");
}
