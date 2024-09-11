# Task Tracker CLI

## Description

Task Tracker CLI is a simple command-line interface application built with Node.js that helps you manage your tasks efficiently. With this tool, you can add, update, delete, and track the status of your tasks directly from the terminal.

Key features:
- Add new tasks
- Update existing tasks
- Delete tasks
- Mark tasks as in-progress or done
- List all tasks or filter by status
- Data persistence using JSON file storage

This project is perfect for developers who prefer command-line tools for task management or those learning about building CLI applications with Node.js.

## Prerequisites

Before you begin, ensure you have met the following requirements:
- You have installed Node.js (version 14.0.0 or later)
- You have a basic understanding of using terminal or command prompt

## Setup

Follow these steps to get your development environment set up:

1. Clone the repository or download the source code:
   ```
   git clone https://github.com/yourusername/task-tracker-cli.git
   ```
   or download and extract the ZIP file.

2. Navigate to the project directory:
   ```
   cd task-tracker-cli
   ```

3. Create a `package.json` file in the project root with the following content:
   ```json
   {
     "name": "task-tracker-cli",
     "version": "1.0.0",
     "type": "module",
     "main": "task_cli.js"
   }
   ```

4. Ensure you have three JavaScript files in your project directory:
   - `task_cli.js`
   - `taskManager.js`
   - `fileOperations.js`

## Usage

To use the Task Tracker CLI, run the following commands from your terminal in the project directory:

1. Add a new task:
   ```
   node task_cli.js add "Your task description"
   ```

2. List all tasks:
   ```
   node task_cli.js list
   ```

3. Update a task:
   ```
   node task_cli.js update <task_id> "Updated task description"
   ```

4. Delete a task:
   ```
   node task_cli.js delete <task_id>
   ```

5. Mark a task as in-progress:
   ```
   node task_cli.js mark-in-progress <task_id>
   ```

6. Mark a task as done:
   ```
   node task_cli.js mark-done <task_id>
   ```

7. List tasks by status:
   ```
   node task_cli.js list todo
   node task_cli.js list in-progress
   node task_cli.js list done
   ```

Replace `<task_id>` with the actual ID of the task you want to modify.

## File Structure

- `task_cli.js`: The main entry point of the application. It handles command-line arguments and executes the appropriate functions.
- `taskManager.js`: Contains the core functionality for managing tasks (add, update, delete, mark, list).
- `fileOperations.js`: Handles reading from and writing to the JSON file where tasks are stored.
- `tasks.json`: This file will be created automatically when you add your first task. It stores all your tasks in JSON format.

## Data Persistence

Your tasks are stored in a `tasks.json` file in the project directory. This file is created automatically when you add your first task. Do not modify this file manually to avoid data corruption.

## Error Handling

The application includes basic error handling. If you encounter any issues, an error message will be displayed in the console.

## Contributing

Contributions to the Task Tracker CLI are welcome. Please feel free to submit a Pull Request.

## Contact

If you have any questions or feedback, please contact me at nanadarkwa16@gmail.com.

Happy task tracking!
