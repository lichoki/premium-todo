// 1. Select Elements
const input = document.getElementById('todo-input');
const addBtn = document.getElementById('add-btn');
const todoList = document.getElementById('todo-list');

// 2. The Data (Model)
// This looks for saved tasks. If none exist, it starts with an empty list [].
let tasks = JSON.parse(localStorage.getItem('myTasks')) || [];

// Immediately show the saved tasks when the page loads
renderTasks();

// 3. The Logic (Controller)
function addTask() {
    const taskText = input.value.trim();
    
    if (taskText !== "") {
        tasks.push(taskText); // Add task to our list
        input.value = "";     // Clear input
        renderTasks();        // Update the screen
    }
}

function deleteTask(index) {
    tasks.splice(index, 1);   // Remove 1 item at the specific index
    renderTasks();            // Update the screen
}

// 4. The View (Updating the UI)
function renderTasks() {
    todoList.innerHTML = ""; // Clear the current list
    
    tasks.forEach((task, index) => {
        const li = document.createElement('li');
        li.innerHTML = `
            <span>${task}</span>
            <button class="delete-btn" onclick="deleteTask(${index})">Delete</button>
        `;
        todoList.appendChild(li);
    });
    localStorage.setItem('myTasks', JSON.stringify(tasks));
}

// 5. Listeners
addBtn.addEventListener('click', addTask);

// Bonus: Allow pressing "Enter" to add a task
input.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') addTask();
});