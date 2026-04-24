let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
let currentFilter = "all";

function saveTasks() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function addTask() {
  const input = document.getElementById("taskInput");
  const text = input.value.trim();

  if (text === "") return;

  tasks.push({
    text,
    done: false,
    id: Date.now()
  });

  input.value = "";
  saveTasks();
  renderTasks();
}

function toggleTask(id) {
  tasks = tasks.map(task =>
    task.id === id ? { ...task, done: !task.done } : task
  );

  saveTasks();
  renderTasks();
}

function deleteTask(id) {
  tasks = tasks.filter(task => task.id !== id);

  saveTasks();
  renderTasks();
}

function filterTasks(type) {
  currentFilter = type;
  renderTasks();
}

function renderTasks() {
  const list = document.getElementById("taskList");
  const counter = document.getElementById("counter");

  list.innerHTML = "";

  let filtered = tasks;

  if (currentFilter === "done") {
    filtered = tasks.filter(t => t.done);
  } else if (currentFilter === "not") {
    filtered = tasks.filter(t => !t.done);
  }

  filtered.forEach(task => {
    const li = document.createElement("li");

    li.innerHTML = `
      <span style="cursor:pointer; text-decoration:${task.done ? "line-through" : "none"}">
        ${task.text}
      </span>
      <button onclick="toggleTask(${task.id})">✔</button>
      <button onclick="deleteTask(${task.id})">🗑</button>
    `;

    list.appendChild(li);
  });

  const doneCount = tasks.filter(t => t.done).length;

  counter.textContent = `الكل: ${tasks.length} | المكتملة: ${doneCount}`;
}

renderTasks();