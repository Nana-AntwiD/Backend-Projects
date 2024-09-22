# Expense Tracker CLI Application

## Overview

This Expense Tracker is a command-line interface (CLI) application built with Node.js. It allows users to manage their expenses, set budgets, and export financial data. The application provides features such as adding, updating, and deleting expenses, categorizing expenses, setting monthly budgets, and exporting data to CSV format.

## Features

- Add, update, and delete expenses
- Categorize expenses
- List and filter expenses
- View expense summaries
- Set monthly budgets
- Export expenses to CSV
- User-friendly command-line interface

## Prerequisites

- Node.js (version 14.0.0 or higher recommended)
- npm (usually comes with Node.js)

## Installation

1. Clone the repository or download the source code.
2. Navigate to the project directory in your terminal.
3. Install the required dependencies:

   ```
   npm install
   ```

## Usage

The general syntax for using the expense tracker is:

```
node index.js <command> [options]
```

### Commands

1. **Add an expense**
   ```
   node index.js add <description> -a <amount> -c <category>
   ```
   Example:
   ```
   node index.js add "Lunch" -a 15.50 -c Food
   ```

2. **Update an expense**
   ```
   node index.js update <id> [-d <new description>] [-a <new amount>] [-c <new category>]
   ```
   Example:
   ```
   node index.js update 1 -d "Dinner" -a 25.00 -c Food
   ```

3. **Delete an expense**
   ```
   node index.js delete <id>
   ```
   Example:
   ```
   node index.js delete 1
   ```

4. **List expenses**
   ```
   node index.js list [-c <category>]
   ```
   Example (all expenses):
   ```
   node index.js list
   ```
   Example (filtered by category):
   ```
   node index.js list -c Food
   ```

5. **Summarize expenses**
   ```
   node index.js summary [-m <month>] [-c <category>]
   ```
   Example (all expenses):
   ```
   node index.js summary
   ```
   Example (specific month):
   ```
   node index.js summary -m 9
   ```
   Example (specific category):
   ```
   node index.js summary -c Food
   ```

6. **Set a monthly budget**
   ```
   node index.js set-budget <month> <amount>
   ```
   Example:
   ```
   node index.js set-budget 9 1000
   ```

7. **Export expenses to CSV**
   ```
   node index.js export [-m <month>] [-c <category>]
   ```
   Example (all expenses):
   ```
   node index.js export
   ```
   Example (specific month):
   ```
   node index.js export -m 9
   ```

## Data Storage

The application stores expense data in a file named `expenses.json` and budget data in `budget.json`. These files are created automatically in the same directory as the application.

## Contributing

Contributions to improve the Expense Tracker are welcome. Please feel free to submit issues and pull requests.

## License

This project is open source and available under the [MIT License](LICENSE).

## Support

If you encounter any problems or have any questions about using the Expense Tracker, please open an issue in the GitHub repository.

