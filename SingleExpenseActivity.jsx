import { useNavigate } from "react-router-dom";
import "../styles/ActivityPage.css";

const SingleExpenseActivity = () => {
  const navigate = useNavigate();

  return (
    <div className="activity-container">
      <div className="activity-header">
        <button className="back-button" onClick={() => navigate("/")}>
          ←
        </button>
        <h1>Single Expense History</h1>
      </div>

      <div className="empty-state">
        <div className="empty-state-content">
          <span className="empty-icon">📊</span>
          <h2>No History Yet</h2>
          <p>Your expense history will appear here once you add expenses.</p>
          <button 
            className="add-expense-btn"
            onClick={() => navigate('/add-expense')}
          >
            Add Your First Expense
          </button>
        </div>
      </div>
    </div>
  );
};

export default SingleExpenseActivity;
