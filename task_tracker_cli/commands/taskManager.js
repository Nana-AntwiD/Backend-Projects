import { loadTasks, saveTasks } from "./fileOperations.js";

export async function addTask(description) {
    const tasks = await loadTasks();
    const newTask = {
        id: tasks.length + 1,
        description,
        status: 'todo',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
    };
    tasks.push(newTask);
    await saveTasks(tasks);
    console.log(`Task added successfully (ID: ${newTask.id})`);
}

export async function updateTask(taskId, newDescripttion) {
    const tasks = await loadTasks();
    const task = tasks.find(t => t.id === taskId);
    if (task) {
        task.description = newDescripttion;
        task.updatedAt = new Date().toISOString();
        await saveTasks(tasks);
        console.log(`Task ${taskId} updated successfully`);
    } else {
        console.log(`Task with ID ${taskId} not found`);
    }
}

export async function deleteTask(taskId) {
    let tasks = await loadTasks();
    tasks = tasks.filter(t => t.id !== taskId);
    await saveTasks(tasks);
    console.log(`Task ${taskId} deleted successfully`);
}

export async function markTask(taskId, status) {
    const tasks = await loadTasks();
    const task =  tasks.find(t => t.id === taskId);
    if (task) {
        task.status = status;
        task.updatedAt = new Date().toISOString();
        await saveTasks(tasks);
        console.log(`Task ${taskId} marked as ${status}`);
    } else {
        console.log(`Task with ID ${taskId} not found`);
    }
}


export async function listTasks(status){
    let tasks = await loadTasks();
    if (status) {
        tasks = tasks.filter(t => t.status === status);
    }
    tasks.forEach(task => {
        console.log(`ID: ${task.id}, Description: ${task.description}, Status: ${task.status}`);
    });
}