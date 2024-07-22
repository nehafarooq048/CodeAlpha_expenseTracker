document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('expense-form');
    const expenseDescriptionInput = document.getElementById('expense-description');
    const expenseAmountInput = document.getElementById('expense-amount');
    const expenseCategoryInput = document.getElementById('expense-category');
    const expenseList = document.getElementById('expense-list');

    let expenses = JSON.parse(localStorage.getItem('expenses')) || [];

    const renderExpenses = () => {
        expenseList.innerHTML = '';
        expenses.forEach((expense, index) => {
            const tr = document.createElement('tr');
            tr.innerHTML = `
                <td>${expense.description}</td>
                <td>$${expense.amount}</td>
                <td>${expense.category}</td>
                <td>
                    <button class="edit" data-index="${index}">Edit</button>
                    <button class="delete" data-index="${index}">Delete</button>
                </td>
            `;
            expenseList.appendChild(tr);
        });
    };

    const saveExpenses = () => {
        localStorage.setItem('expenses', JSON.stringify(expenses));
    };

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        const description = expenseDescriptionInput.value.trim();
        const amount = parseFloat(expenseAmountInput.value.trim());
        const category = expenseCategoryInput.value;

        if (description && amount && category) {
            expenses.push({ description, amount, category });
            saveExpenses();
            renderExpenses();
            form.reset();
        }
    });

    expenseList.addEventListener('click', (e) => {
        if (e.target.classList.contains('edit')) {
            const index = e.target.dataset.index;
            const expense = expenses[index];
            expenseDescriptionInput.value = expense.description;
            expenseAmountInput.value = expense.amount;
            expenseCategoryInput.value = expense.category;
            expenses.splice(index, 1);
            saveExpenses();
            renderExpenses();
        } else if (e.target.classList.contains('delete')) {
            const index = e.target.dataset.index;
            expenses.splice(index, 1);
            saveExpenses();
            renderExpenses();
        }
    });

    renderExpenses();
});
