let tasks = JSON.parse(localStorage.getItem("dailyTasks")) || [];

const taskForm = document.getElementById("task-form");
const taskInput = document.getElementById("task-input");
const priorityInput = document.getElementById("priority-input");
const taskList = document.getElementById("task-list");

taskForm.addEventListener("submit", function(event) {
    event.preventDefault();

    const name = taskInput.value.trim();

    if (name === "") {
        alert("Nama kegiatan tidak boleh kosong!");
        return;
    }

    const task = {
        id: Date.now(),
        name: name,
        priority: priorityInput.value,
        completed: false
    };

    tasks.push(task);
    saveTasks();
    showTasks();
    taskForm.reset();
});

function saveTasks() {
    localStorage.setItem("dailyTasks", JSON.stringify(tasks));
}

function showTasks() {
    taskList.innerHTML = "";

    tasks.forEach(function(task) {
        const item = document.createElement("li");
        item.className = "task-item";

        if (task.completed) {
            item.classList.add("completed");
        }

        const name = document.createElement("span");
        name.className = "task-name";
        name.textContent = task.name;

        const priority = document.createElement("span");
        priority.className = "priority";
        priority.textContent = task.priority;

        const doneButton = document.createElement("button");
        doneButton.className = "complete-button";
        doneButton.textContent = task.completed ? "Batal" : "Selesai";
        doneButton.addEventListener("click", function() {
            task.completed = !task.completed;
            saveTasks();
            showTasks();
        });

        const deleteButton = document.createElement("button");
        deleteButton.className = "delete-button";
        deleteButton.textContent = "Hapus";
        deleteButton.addEventListener("click", function() {
            tasks = tasks.filter(function(item) {
                return item.id !== task.id;
            });
            saveTasks();
            showTasks();
        });

        item.appendChild(name);
        item.appendChild(priority);
        item.appendChild(doneButton);
        item.appendChild(deleteButton);
        taskList.appendChild(item);
    });

    updateSummary();
}

function updateSummary() {
    const total = tasks.length;
    const done = tasks.filter(function(task) {
        return task.completed;
    }).length;

    document.getElementById("total-count").textContent = total;
    document.getElementById("done-count").textContent = done;
    document.getElementById("active-count").textContent = total - done;

    document.getElementById("empty-message").style.display =
        total === 0 ? "block" : "none";
}

showTasks();