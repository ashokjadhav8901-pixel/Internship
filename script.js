let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

function saveTasks() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function renderTasks() {
  const taskList = document.getElementById("taskList");
  taskList.innerHTML = "";

  tasks.forEach((task, index) => {
    const li = document.createElement("li");
    li.className = task.completed ? "completed" : "";

    li.innerHTML = `
      <span onclick="toggleComplete(${index})">${task.text}</span>
      <div>
        <button onclick="editTask(${index})">Edit</button>
        <button onclick="deleteTask(${index})">Delete</button>
      </div>
    `;
    taskList.appendChild(li);
  });
}

function addTask() {
  const input = document.getElementById("taskInput");
  if (input.value.trim() === "") return;

  tasks.push({ text: input.value, completed: false });
  input.value = "";
  saveTasks();
  renderTasks();
}

function editTask(index) {
  const newText = prompt("Edit task:", tasks[index].text);
  if (newText) {
    tasks[index].text = newText;
    saveTasks();
    renderTasks();
  }
}

function deleteTask(index) {
  tasks.splice(index, 1);
  saveTasks();
  renderTasks();
}

function toggleComplete(index) {
  tasks[index].completed = !tasks[index].completed;
  saveTasks();
  renderTasks();
}

function searchTasks() {
  const query = document.getElementById("searchInput").value.toLowerCase();
  document.querySelectorAll("#taskList li").forEach(li => {
    li.style.display = li.textContent.toLowerCase().includes(query) ? "flex" : "none";
  });
}

function filterTasks() {
  const filter = document.getElementById("filter").value;
  document.querySelectorAll("#taskList li").forEach((li, index) => {
    if (filter === "all") {
      li.style.display = "flex";
    } else if (filter === "completed" && tasks[index].completed) {
      li.style.display = "flex";
    } else if (filter === "pending" && !tasks[index].completed) {
      li.style.display = "flex";
    } else {
      li.style.display = "none";
    }
  });
}

// Initial render
renderTasks();
