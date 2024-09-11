import {addTask, updateTask, deleteTask, markTask, listTasks} from './commands/taskManager.js';

async function main() {
    const [,, command, ...args] = process.argv;

    try {
        switch (command) {
            case 'add':
                if (args.length !== 1 ) {
                    console.log("Usage: node task_cli.js add <description>");
                    return;
                }
                await addTask(args[0]);
                break;
            case 'update':
                if (args.length !== 2){
                    console.log("Usage: node task_cli.js update <task_id> <new_description>");
                    return;
                }
                await updateTask(parseInt(args[0], args[1]));
                break;
            case 'delete':
                if (args.length !== 1) {
                    console.log("Usage: node task_cli.js delete <task_id>");
                    return;
                }
                await deleteTask(parseInt(args[0]));
                break;
            case 'mark-in-progress':
                if (args.length !== 1) {
                    console.log("Usage: node task_cli.js mark-in-progress <task_id>");
                    return;
                }
                await markTask(parseInt(args[0]), 'in-progress');
                break;
            case 'mark-done':
                if (args.length !== 1) {
                    console.log("Usage: node task_cli.js mark-done <task_id>");
                    return;
                }
                await markTask(parseInt(args[0]), 'done');
                break;
            case 'list':
                await listTasks(args[0]);
                break;
            default:
                console.log("Unknown command. Availabel commands: add, update, delete, mark-in-progress, mark-done, list");
        }
    } catch (error) {
        console.error("An error occurred:", error.message);
    }
}

main();