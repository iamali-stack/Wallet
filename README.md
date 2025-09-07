# My Wallet - Personal Finance Tracker

A modern, user-friendly web application for tracking personal finances, built with React and styled with Tailwind CSS.

## Features

- 💰 Track Income & Expenses
- 📊 View Transaction History
- 📈 Analytics Dashboard
- 📱 Responsive Design
- 🎨 Clean and Modern UI
- 💾 Local State Management

## Technologies Used

- React.js
- React Router for navigation
- Tailwind CSS for styling
- React Select for dropdown components
- Context API for state management

## Getting Started

### Prerequisites

Make sure you have Node.js and npm installed on your machine.

### Installation

1. Clone the repository
```bash
git clone [your-repo-url]
cd my-app
```

2. Install dependencies
```bash
npm install
```

3. Run the development server
```bash
npm run dev
```

The app will be available at `http://localhost:5173`

## Usage

### Adding Transactions

1. Click on "Add Transaction" button
2. Select transaction type (Income/Expense)
3. Enter the amount
4. Choose a category
5. Add date and optional note
6. Click "Add" to save the transaction

### Viewing Transactions

- Navigate to "Recent Transactions" to view your transaction history
- Transactions are organized chronologically
- Each transaction shows:
  - Amount
  - Category with icon
  - Date
  - Type (Income/Expense)

### Analytics

Visit the Analytics section to view:
- Income vs Expenses breakdown
- Spending by category
- Transaction history

## Project Structure

```
my-app/
├── src/
│   ├── components/
│   ├── Context/
│   │   ├── BalanceContext.jsx      # Global state management
│   │   └── UserContext.jsx
│   ├── App.jsx                     # Main application component
│   ├── Home.jsx                    # Home page
│   ├── Transactions.jsx            # Transaction form
│   ├── RecentTransactions.jsx      # Transaction history
│   ├── Analytics.jsx               # Analytics dashboard
│   └── Layout.jsx                  # Common layout wrapper
```

## Customization

### Adding New Categories

Edit the category arrays in `Transactions.jsx`:
- `incomeCategories` for income categories
- `expenseCategories` for expense categories

### Styling

The project uses Tailwind CSS for styling. You can customize:
- Colors in `tailwind.config.js`
- Component styles in individual component files

## Contributing

Feel free to contribute to this project:
1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Open a Pull Request

## License

This project is open source and available under the MIT License.

---

Made with ❤️ by [Your Name]
