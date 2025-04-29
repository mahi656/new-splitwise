import { useNavigate } from 'react-router-dom';
import '../styles/ActivityMenu.css';

const ActivityMenu = ({ onClose }) => {
  const navigate = useNavigate();

  const handleNavigation = (path) => {
    navigate(path);
    if (onClose) onClose();
  };

  return (
    <div className="activity-menu">
      <div 
        className="menu-item" 
        onClick={() => handleNavigation('/single-expense-activity')}
      >
        <span className="menu-icon">👤</span>
        <span>Single Expense Activity</span>
      </div>
      <div 
        className="menu-item" 
        onClick={() => handleNavigation('/group-expense-activity')}
      >
        <span className="menu-icon">👥</span>
        <span>Group Expense Activity</span>
      </div>
    </div>
  );
};

export default ActivityMenu;