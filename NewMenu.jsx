import { useNavigate } from 'react-router-dom';
import crowdIcon from '../crowd (1).png';
import heartIcon from '../heart.png'
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
        <span className="menu-icon">
            <img src={heartIcon} alt="friend" style={{ width: '30px', height: '30px' }}/>
        </span>
        <span>Add Expense</span>
      </div>
      <div 
        className="menu-item" 
        onClick={() => handleNavigation('/group-expense')}
      >
        <span className="menu-icon">
            <img src={crowdIcon} alt="group" style={{ width: '30px', height: '30px' }} />
        </span>
        <span>Group Expense</span>
      </div>
    </div>
  );
};

export default NewMenu;