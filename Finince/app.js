// Personal Finance Tracker JavaScript

class FinanceTracker {
    constructor() {
        this.transactions = JSON.parse(localStorage.getItem('transactions')) || [];
        this.pieChart = null;
        this.barChart = null;
        
        this.init();
    }

    init() {
        this.loadTransactions();
        this.setupEventListeners();
        this.updateUI();
        this.initCharts();
    }

    setupEventListeners() {
        // Form submission
        document.getElementById('transactionForm').addEventListener('submit', (e) => {
            e.preventDefault();
            this.addTransaction();
        });

        // Filter events
        document.getElementById('filterCategory').addEventListener('change', () => {
            this.filterTransactions();
        });

        document.getElementById('filterType').addEventListener('change', () => {
            this.filterTransactions();
        });
    }

    addTransaction() {
        const title = document.getElementById('title').value.trim();
        const amount = parseFloat(document.getElementById('amount').value);
        const category = document.getElementById('category').value;
        const type = document.getElementById('type').value;

        if (!title || !amount || !category || !type) {
            this.showAlert('Please fill in all fields', 'danger');
            return;
        }

        if (amount <= 0) {
            this.showAlert('Amount must be greater than 0', 'danger');
            return;
        }

        const transaction = {
            id: Date.now(),
            title,
            amount,
            category,
            type,
            date: new Date().toISOString()
        };

        this.transactions.unshift(transaction);
        this.saveTransactions();
        this.updateUI();
        this.updateCharts();
        this.resetForm();
        this.showAlert('Transaction added successfully!', 'success');
    }

    deleteTransaction(id) {
        if (confirm('Are you sure you want to delete this transaction?')) {
            this.transactions = this.transactions.filter(t => t.id !== id);
            this.saveTransactions();
            this.updateUI();
            this.updateCharts();
            this.showAlert('Transaction deleted successfully!', 'success');
        }
    }

    resetForm() {
        document.getElementById('transactionForm').reset();
    }

    saveTransactions() {
        localStorage.setItem('transactions', JSON.stringify(this.transactions));
    }

    loadTransactions() {
        this.transactions = JSON.parse(localStorage.getItem('transactions')) || [];
    }

    updateUI() {
        this.updateBalance();
        this.updateTransactionList();
    }

    updateBalance() {
        const income = this.transactions
            .filter(t => t.type === 'income')
            .reduce((sum, t) => sum + t.amount, 0);

        const expense = this.transactions
            .filter(t => t.type === 'expense')
            .reduce((sum, t) => sum + t.amount, 0);

        const balance = income - expense;

        document.getElementById('balance').textContent = this.formatCurrency(balance);
        document.getElementById('income').textContent = this.formatCurrency(income);
        document.getElementById('expense').textContent = this.formatCurrency(expense);
    }

    updateTransactionList() {
        const transactionList = document.getElementById('transactionList');
        const filteredTransactions = this.getFilteredTransactions();

        if (filteredTransactions.length === 0) {
            transactionList.innerHTML = `
                <tr>
                    <td colspan="6" class="empty-state">
                        <i class="fas fa-receipt"></i>
                        <p>No transactions found</p>
                    </td>
                </tr>
            `;
            return;
        }

        transactionList.innerHTML = filteredTransactions.map(transaction => `
            <tr class="transaction-row">
                <td>${this.formatDate(transaction.date)}</td>
                <td>${transaction.title}</td>
                <td><span class="category-badge category-${transaction.category}">${transaction.category}</span></td>
                <td><span class="badge-${transaction.type}">${transaction.type}</span></td>
                <td class="${transaction.type === 'income' ? 'text-success' : 'text-danger'}">
                    ${transaction.type === 'income' ? '+' : '-'}${this.formatCurrency(transaction.amount)}
                </td>
                <td>
                    <button class="btn btn-delete" onclick="financeTracker.deleteTransaction(${transaction.id})">
                        <i class="fas fa-trash"></i>
                    </button>
                </td>
            </tr>
        `).join('');
    }

    getFilteredTransactions() {
        const categoryFilter = document.getElementById('filterCategory').value;
        const typeFilter = document.getElementById('filterType').value;

        return this.transactions.filter(transaction => {
            const categoryMatch = !categoryFilter || transaction.category === categoryFilter;
            const typeMatch = !typeFilter || transaction.type === typeFilter;
            return categoryMatch && typeMatch;
        });
    }

    filterTransactions() {
        this.updateTransactionList();
    }

    initCharts() {
        this.initPieChart();
        this.initBarChart();
    }

    initPieChart() {
        const ctx = document.getElementById('pieChart').getContext('2d');
        this.pieChart = new Chart(ctx, {
            type: 'pie',
            data: {
                labels: ['Income', 'Expenses'],
                datasets: [{
                    data: [0, 0],
                    backgroundColor: ['#28a745', '#dc3545'],
                    borderWidth: 2,
                    borderColor: '#fff'
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        position: 'bottom'
                    }
                }
            }
        });
    }

    initBarChart() {
        const ctx = document.getElementById('barChart').getContext('2d');
        this.barChart = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: this.getLast6Months(),
                datasets: [{
                    label: 'Income',
                    data: [0, 0, 0, 0, 0, 0],
                    backgroundColor: '#28a745',
                    borderColor: '#28a745',
                    borderWidth: 1
                }, {
                    label: 'Expenses',
                    data: [0, 0, 0, 0, 0, 0],
                    backgroundColor: '#dc3545',
                    borderColor: '#dc3545',
                    borderWidth: 1
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                    y: {
                        beginAtZero: true
                    }
                },
                plugins: {
                    legend: {
                        position: 'bottom'
                    }
                }
            }
        });
    }

    updateCharts() {
        this.updatePieChart();
        this.updateBarChart();
    }

    updatePieChart() {
        const income = this.transactions
            .filter(t => t.type === 'income')
            .reduce((sum, t) => sum + t.amount, 0);

        const expense = this.transactions
            .filter(t => t.type === 'expense')
            .reduce((sum, t) => sum + t.amount, 0);

        this.pieChart.data.datasets[0].data = [income, expense];
        this.pieChart.update();
    }

    updateBarChart() {
        const monthlyData = this.getMonthlyData();
        const labels = this.getLast6Months();
        
        const incomeData = labels.map(month => monthlyData[month]?.income || 0);
        const expenseData = labels.map(month => monthlyData[month]?.expense || 0);

        this.barChart.data.labels = labels;
        this.barChart.data.datasets[0].data = incomeData;
        this.barChart.data.datasets[1].data = expenseData;
        this.barChart.update();
    }

    getMonthlyData() {
        const monthlyData = {};
        
        this.transactions.forEach(transaction => {
            const date = new Date(transaction.date);
            const monthKey = date.toLocaleDateString('en-US', { year: 'numeric', month: 'short' });
            
            if (!monthlyData[monthKey]) {
                monthlyData[monthKey] = { income: 0, expense: 0 };
            }
            
            if (transaction.type === 'income') {
                monthlyData[monthKey].income += transaction.amount;
            } else {
                monthlyData[monthKey].expense += transaction.amount;
            }
        });
        
        return monthlyData;
    }

    getLast6Months() {
        const months = [];
        for (let i = 5; i >= 0; i--) {
            const date = new Date();
            date.setMonth(date.getMonth() - i);
            months.push(date.toLocaleDateString('en-US', { year: 'numeric', month: 'short' }));
        }
        return months;
    }

    formatCurrency(amount) {
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD'
        }).format(amount);
    }

    formatDate(dateString) {
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    }

    showAlert(message, type) {
        // Remove existing alerts
        const existingAlert = document.querySelector('.alert');
        if (existingAlert) {
            existingAlert.remove();
        }

        // Create new alert
        const alertDiv = document.createElement('div');
        alertDiv.className = `alert alert-${type} alert-dismissible fade show`;
        alertDiv.innerHTML = `
            ${message}
            <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
        `;

        // Insert alert at the top of the container
        const container = document.querySelector('.container');
        container.insertBefore(alertDiv, container.firstChild);

        // Auto-remove after 3 seconds
        setTimeout(() => {
            if (alertDiv.parentNode) {
                alertDiv.remove();
            }
        }, 3000);
    }

    // Export functionality
    exportToCSV() {
        const headers = ['Date', 'Description', 'Category', 'Type', 'Amount'];
        const csvContent = [
            headers.join(','),
            ...this.transactions.map(t => [
                this.formatDate(t.date),
                `"${t.title}"`,
                t.category,
                t.type,
                t.amount
            ].join(','))
        ].join('\n');

        const blob = new Blob([csvContent], { type: 'text/csv' });
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `finance-tracker-${new Date().toISOString().split('T')[0]}.csv`;
        a.click();
        window.URL.revokeObjectURL(url);
    }

    // Clear all data
    clearAllData() {
        if (confirm('Are you sure you want to clear all transaction data? This action cannot be undone.')) {
            this.transactions = [];
            this.saveTransactions();
            this.updateUI();
            this.updateCharts();
            this.showAlert('All data cleared successfully!', 'success');
        }
    }
}

// Initialize the finance tracker when the page loads
let financeTracker;
document.addEventListener('DOMContentLoaded', () => {
    financeTracker = new FinanceTracker();
});

// Add export and clear buttons to the UI
document.addEventListener('DOMContentLoaded', () => {
    const transactionHeader = document.querySelector('.card-header h5');
    if (transactionHeader) {
        const buttonContainer = document.createElement('div');
        buttonContainer.className = 'd-flex gap-2';
        buttonContainer.innerHTML = `
            <button class="btn btn-sm btn-outline-success" onclick="financeTracker.exportToCSV()">
                <i class="fas fa-download"></i> Export CSV
            </button>
            <button class="btn btn-sm btn-outline-danger" onclick="financeTracker.clearAllData()">
                <i class="fas fa-trash"></i> Clear All
            </button>
        `;
        
        const headerContainer = transactionHeader.parentElement;
        headerContainer.appendChild(buttonContainer);
    }
}); 