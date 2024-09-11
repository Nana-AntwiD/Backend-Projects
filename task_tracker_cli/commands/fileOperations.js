import fs from 'fs/promises';

const TASKS_FILE = 'tasks.json';

export async function loadTasks(){
    try {
        const data = await fs.readFile(TASKS_FILE, 'utf8');
        return JSON.parse(data);
    } catch(error){
        if (error.code === 'ENOENT') {
            return [];
        }
        throw error;
    }
}

export async function saveTasks(tasks){
    await fs.writeFile(TASKS_FILE, JSON.stringify(tasks,null, 2));
}

