const API = "http://localhost:8000/tasks/";


async function loadTasks() {
    const res = await fetch(API);
    const tasks = await res.json();

    const list = document.getElementById("taskList");
    list.innerHTML = "";

    tasks.forEach(t => {
        const li = document.createElement("li");
        li.textContent = t.title + (t.completed ? " ✔️" : "");
        const delBtn = document.createElement("button");
        delBtn.textContent = "Delete";
        delBtn.className = "delete-btn";
        delBtn.onclick = () => deleteTask(t.id);
        li.appendChild(delBtn);
        list.appendChild(li);
    });
}

async function addTask() {
    const input = document.getElementById("taskInput");
    const title = input.value;

    await fetch(API, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title, completed: false })
    });

    input.value = "";
    loadTasks();
}

async function deleteTask(id) {
    await fetch(API + id, { method: "DELETE" });
    loadTasks();
}

async function addTask() {
    const input = document.getElementById("taskInput");
    const title = input.value.trim();

    if (!title) {
        input.classList.add("input-error");
        return;
    }

    await fetch(API, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title, completed: false })
    });

    input.value = "";
    input.classList.remove("input-error");
    loadTasks();
}

loadTasks();
