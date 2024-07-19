document.addEventListener('DOMContentLoaded', () => {
    const expenseDescriptionInput = document.getElementById('expense-description');
    const expenseAmountInput = document.getElementById('expense-amount');
    const addExpenseButton = document.getElementById('add-expense');
    const expensesList = document.getElementById('expenses');
    const totalAmountDisplay = document.getElementById('total-amount');
    const clearAllButton = document.getElementById('clear-all');
    
    let totalAmount = 0;

    // Function to add an expense
    function addExpense() {
        const description = expenseDescriptionInput.value.trim();
        const amount = parseFloat(expenseAmountInput.value.trim());

        if (description && !isNaN(amount) && amount > 0) {
            const expense = { description, amount };
            
            // Save to localStorage
            const expenses = JSON.parse(localStorage.getItem('expenses')) || [];
            expenses.push(expense);
            localStorage.setItem('expenses', JSON.stringify(expenses));
            
            addExpenseToList(description, amount);
            
            // Update total amount
            totalAmount += amount;
            totalAmountDisplay.textContent = `₹${totalAmount.toFixed(2)}`;

            // Clear input fields
            expenseDescriptionInput.value = '';
            expenseAmountInput.value = '';
        } else {
            alert('Please enter a valid description and amount.');
        }
    }

    // Function to add an expense to the list
    function addExpenseToList(description, amount) {
        const listItem = document.createElement('li');
        listItem.innerHTML = `${description} <span>₹${amount.toFixed(2)}</span>`;
        expensesList.appendChild(listItem);
    }

    // Function to load expenses from localStorage
    function loadExpenses() {
        const expenses = JSON.parse(localStorage.getItem('expenses')) || [];
        totalAmount = 0;
        expenses.forEach(expense => {
            addExpenseToList(expense.description, expense.amount);
            totalAmount += expense.amount;
        });
        totalAmountDisplay.textContent = `₹${totalAmount.toFixed(2)}`;
    }

    // Function to clear all expenses
    function clearAllExpenses() {
        localStorage.removeItem('expenses');
        expensesList.innerHTML = '';
        totalAmount = 0;
        totalAmountDisplay.textContent = `₹${totalAmount.toFixed(2)}`;
    }

    // Event listeners
    addExpenseButton.addEventListener('click', addExpense);
    clearAllButton.addEventListener('click', clearAllExpenses);
    
    // Allow pressing Enter to add an expense
    expenseAmountInput.addEventListener('keypress', (event) => {
        if (event.key === 'Enter') {
            addExpense();
        }
    });

    // Load expenses when the page loads
    loadExpenses();
});
