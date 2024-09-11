Task Tracker CLI

Description

Task tracker CLI is a simple command-line interface application built with Node.js that helps you manage your tasks efficiently. With this tool, you can add, update, delete, and track the status of your tasks directly from the terminal. 

Key features: 
1. Add new tasks
2. Update existing tasks
3. Delete tasks
4. Mark tasks as in-progress or done
5. List all tasks or filter by status
6. Data persistence using JSON file storage

This project is perfect for developer who prefer command-line tools for task management or those learning about building CLI applications with NOde.js. 

Prerequisites 

Before you begin, ensure you have met the following requirements:
1. You have installed Node.js(versino 14.0.0 or later)
2. You have a basic understanding of using terminal or command prompt

Setup
Follow these steps to get your development environment set up:

1. Clone the repository or download the source code:
git clone https://github.com/yourusername/task-tracker-cli.git or download and extract the ZIP file.

2. Navigate to the project directory:
cd task-tracker-cli

3. Create a package.json file in the project root with the following content:
{
  "name": "task-tracker-cli",
  "version": "1.0.0",
  "type": "module",
  "main": "task_cli.js"
}

4. Ensure you have three JavaScript files in your project directory
 i. task_cli.js
 ii. taskManager.js
 iii. fileOperations.js


Usage

To use the Task Tracker CLI, run the following commands from your terminal in the project directory:

1. Add a new task:
node task_cli.js add "Your task description"

2. List all tasks:
node task_cli.js list

3. Update a task:
node task_cli.js update <task_id> "Updated task description"

4. Delete a task:
node task_cli.js delete <task_id>

5. Mark a task as in-progress:
node task_cli.js mark-in-progress <task_id>

6. Mark a task as done:
node task_cli.js mark-done <task_id>

7. List tasks by status:
node task_cli.js list todo
node task_cli.js list in-progress
node task_cli.js list done

Replace <task_id> with the actual ID of the task you want to modify.


