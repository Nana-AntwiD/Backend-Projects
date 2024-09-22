import fs from 'fs/promises';
import {Command} from 'commander';

const program = new Command();

const DATA_FILE = 'expenses.json';
const BUDGET_FILE = 'budget.json';

const loadData = async (file) => {
    try {
        const data = await fs.readFile(file, 'utf8');
        return JSON.parse(data);
    } catch (error) {
        if (error.code === 'ENOENT') {
            return file === DATA_FILE ? [] : {};
        }
        throw error; 
    }
};

const saveData = async (file, data) => {
    await fs.writeFile(file, JSON.stringify(data, null, 2));
};

const formatCurrency = (amount) => `$${amount.toFixed(2)}`;

const formatDate = (date) => date.toISOString().split('T')[0];

const addExpense = async (description, amount, category) => {
    const expenses = await loadData(DATA_FILE);
    const newExpense = {
        id: expenses.length + 1,
        date: new Date(),
        description, 
        amount: parseFloat(amount),
        category
    };
    expenses.push(newExpense);
    await saveData(DATA_FILE, expenses);
    console.log(`Expense added successfully (ID: ${newExpense.id})`);
    await checkBudget(newExpense.date.getMonth() + 1, newExpense.amount);
};

const updateExpense = async (id, description, amount, category) => {
    const expenses = await loadData(DATA_FILE);
    const index = expenses.findIndex(e => e.id === parseInt(id));
    if (index === -1) {
        console.log(`Expense with ID ${id} not found`);
        return;
    }
    if (description) expenses[index].description = description;
    if (amount) expenses[index].amount = parseFloat(amount);
    if (category) expenses[index].category = category;
    await saveData(DATA_FILE, expenses);
    console.log(`Expense updated succesfully`);
};

const deleteExpense = async (id) => {
    let expenses = await loadData(DATA_FILE);
    const initialLength = expenses.length;
    expenses = expenses.filter(e => e.id !== parseInt(id));
    if (expenses.length === initialLength) {
        console.log(`Expense with ID ${id} not found`);
        return;
    }
    await saveData(DATA_FILE, expenses);
    console.log(`Expense deleted successfully`);
};

const listExpenses = async (category) => {
    const expenses = await loadData(DATA_FILE);
    console.log('ID Date     Description Amount   Category');
    expenses
       .filter(e => !category || e.category === category)
       .forEach(e => { 
        console.log(`${e.id.toString().padEnd(3)} ${formatDate(new Date(e.date))} ${e.description.padEnd(12)} ${formatCurrency(e.amount).padEnd(10)} ${e.category || 'NA'}`);
       });
};


const summarizeExpenses = async (month, category) => {
    const expenses = await loadData(DATA_FILE);
    let filteredExpenses = expenses;

    if (month) {
        const currentYear = new Date().getFullYear();
        filteredExpenses = expenses.filter(e => {
            const expenseDate = new Date(e.date);
            return expenseDate.getMonth() + 1 === parseInt(month) && expenseDate.getFullYear() === currentYear;
        });
    }

    if (category) {
        filteredExpenses = filteredExpenses.filter(e => e.category === category);
    }
    const total = filteredExpenses.reduce((sum, e) => sum + e.amount, 0);

    if (month) {
        console.log(`Total expenses for ${new Date(new Date().getFullYear(), month - 1).toLocaleString('default', {month: 'long'})}${category ? `in category '${category}'`:''}: ${formatCurrency(total)}`);
    } else {
        console.log(`Total expenses${category ? `in category '${category}'`:''}: ${formatCurrency(total)}`);
    }

    if (month) {
        await checkBudget(parseInt(month), total);
    }
};

const setBudget = async (month, amount) => {
    const budget = await loadData(BUDGET_FILE);
    budget[month] = parseFloat(amount);
    budget[month] = parseFloat(amount);
    await saveData(BUDGET_FILE, budget);
    console.log(`Budget for month ${month} set to ${formatCurrency(amount)}`);
};


const checkBudget = async (month, amount) => {
    const budget = await loadData(BUDGET_FILE);
    if (budget[month]) {
      const expenses = await loadData(DATA_FILE);
      const monthlyExpenses = expenses.filter(e => {
        const expenseDate = new Date(e.date);
        return expenseDate.getMonth() + 1 === month && expenseDate.getFullYear() === new Date().getFullYear();
      });
      const totalExpenses = monthlyExpenses.reduce((sum, e) => sum + e.amount, 0);
      if (totalExpenses > budget[month]) {
        console.log(`Warning: You have exceeded your budget of ${formatCurrency(budget[month])} for this month!`);
      } else {
        console.log(`Current monthly expenses: ${formatCurrency(totalExpenses)} (Budget: ${formatCurrency(budget[month])})`);
      }
    }
  };



const exportToCSV = async (month, category) => {
    const expenses = await loadData(DATA_FILE);
    let filteredExpenses = expenses;

    if (month) {
        const currentYear = new Date().getFullYear()
        filteredExpenses = expenses.filter(e => {
            const expenseDate = new Date(e.date);
            return expenseDate.getMonth() + 1 === parseInt(month) && expenseDate.getFullYear() === currentYear;
        });
    }

    if (category) {
        filteredExpenses = filteredExpenses.filter(e => e.category === category);
    }

    const csvContent = [
        ['ID', 'Date', 'Description', 'Amount', 'Category'],
        ...filteredExpenses.map(e => [e.id, formatDate(new Date(e.date)), e.description, e.amount, e.category || 'N/A'])
    ].map(row => row.join(',')).join('\n');

    const filename = `expenses${month ? `_${month}` : ''}${category ? `_${category}` : ''}.csv`;
    await fs.writeFile(filename, csvContent);
    console.log('Expenses exported to ${filename}');
};

program
  .name('expense-tracker')
  .description('A simple expense tracker application')
  .version('1.0.0');

program
  .command('add <description>')
  .description('Add a new expense')
  .option('-a, --amount <amount>', 'Amount of the expense', parseFloat)
  .option('-c, --category <category>', 'Category of the expense')
  .action(async (description, options) => {
    if (!options.amount) {
      console.log('Please provide an amount using the -a or --amount option.');
      return;
    }
    await addExpense(description, options.amount, options.category);
  });

program
  .command('update <id>')
  .description('Update an existing expense')
  .option('-d, --description <description>', 'New description of the expense')
  .option('-a, --amount <amount>', 'New amount of the expense', parseFloat)
  .option('-c, --category <category>', 'New category of the expense')
  .action(async (id, options) => {
    await updateExpense(id, options.description, options.amount, options.category);
  });

program
  .command('delete <id>')
  .description('Delete an expense')
  .action(async (id) => {
    await deleteExpense(id);
  });

program
  .command('list')
  .description('List all expenses')
  .option('-c, --category <category>', 'Filter expenses by category')
  .action(async (options) => {
    await listExpenses(options.category);
  });

program
  .command('summary')
  .description('Summarize expenses')
  .option('-m, --month <month>', 'Month to summarize (1-12)', parseInt)
  .option('-c, --category <category>', 'Category to summarize')
  .action(async (options) => {
    await summarizeExpenses(options.month, options.category);
  });

program
  .command('set-budget <month> <amount>')
  .description('Set a monthly budget')
  .action(async (month, amount) => {
    await setBudget(parseInt(month), parseFloat(amount));
  });

program
  .command('export')
  .description('Export expenses to CSV')
  .option('-m, --month <month>', 'Month to export (1-12)', parseInt)
  .option('-c, --category <category>', 'Category to export')
  .action(async (options) => {
    await exportToCSV(options.month, options.category);
  });

program.parseAsync(process.argv);