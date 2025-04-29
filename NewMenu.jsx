import { useNavigate } from 'react-router-dom';
import '../styles/ActivityMenu.css';

const NewMenu = ({ onClose }) => {
  const navigate = useNavigate();

  const handleNavigation = (path) => {
    navigate(path);
    if (onClose) onClose();
  };

  return (
    <div className="activity-menu">
      <div 
        className="menu-item" 
        onClick={() => handleNavigation('/add-expense')}
      >
        <span className="menu-icon">👤</span>
        <span>Add Expense</span>
      </div>
      <div 
        className="menu-item" 
        onClick={() => handleNavigation('/group-expense')}
      >
        <span className="menu-icon">👥</span>
        <span>Group Expense</span>
      </div>
    </div>
  );
};

export default NewMenu;