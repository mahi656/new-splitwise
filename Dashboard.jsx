import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/Dashboard.css';

const Dashboard = () => {
  const navigate = useNavigate();
  const [transactions, setTransactions] = useState([]);

  return (
    <div className="dashboard-container">
      <header className="dashboard-header">
        <h1>Dashboard</h1>
        <nav className="dashboard-nav">
          <button onClick={() => navigate('/group-expense')}>Add Group Expense</button>
          <button onClick={() => navigate('/add-expense')}>Add Single Expense</button>
        </nav>
      </header>

      <main className="dashboard-main">
        <section className="transactions-section">
          <h2>Recent Transactions</h2>
          <div className="transactions-list">
            {transactions.length > 0 ? (
              transactions.map((transaction, index) => (
                <div key={index} className="transaction-card">
                  <div className="transaction-header">
                    <h3>{transaction.purpose}</h3>
                    <span className="amount">{transaction.currency}{transaction.amount}</span>
                  </div>
                  <div className="transaction-details">
                    <p>Date: {transaction.date}</p>
                    <p>Paid by: {transaction.paidBy}</p>
                  </div>
                </div>
              ))
            ) : (
              <p className="no-transactions">No transactions yet</p>
            )}
          </div>
        </section>
      </main>
    </div>
  );
};

export default Dashboard;