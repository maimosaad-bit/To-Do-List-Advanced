const taskInput = document.getElementById("taskInput");
const addBtn = document.getElementById("addBtn");
const clear = document.getElementById("clear");
const taskList = document.getElementById("taskList");

window.onload = () => {
  const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  tasks.forEach(task => renderTask(task.text, task.completed));
};

addBtn.addEventListener("click", () => {
  const taskText = taskInput.value.trim();
  if (taskText !== "") {
    renderTask(taskText);
    saveTasks();
    taskInput.value = "";
  }
});

function renderTask(text, completed = false) {
  const li = document.createElement("li"); 
  const span = document.createElement("span"); 
  span.textContent = text; 

  if (completed) li.classList.add("completed");

  span.addEventListener("click", () => {
    li.classList.toggle("completed");
    saveTasks();
  });

  
  const deleteBtn = document.createElement("button");
  deleteBtn.textContent = "x";
  deleteBtn.className = "delete";
  deleteBtn.addEventListener("click", () => {
    li.remove();
    saveTasks();
  });

  li.appendChild(span);
  li.appendChild(deleteBtn);
  taskList.appendChild(li);
}

function saveTasks() {
  const tasks = [];
  document.querySelectorAll("#taskList li").forEach(li => {
    tasks.push({
      text: li.querySelector("span").textContent,
      completed: li.classList.contains("completed")
    });
  });
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

clear.addEventListener("click", () => {
  taskList.innerHTML = "";
  localStorage.removeItem("tasks");
});
