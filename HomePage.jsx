import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FaChartLine, FaPlus, FaUser } from "react-icons/fa";
import ActivityMenu from "../components/ActivityMenu";
import NewMenu from "../components/NewMenu";
import '../styles/HomePage.css';

const HomePage = () => {
  const navigate = useNavigate();
  const [fadeIn, setFadeIn] = useState(false);
  const [showActivityMenu, setShowActivityMenu] = useState(false);
  const [showNewMenu, setShowNewMenu] = useState(false);
  const username = localStorage.getItem('username') || 'User';

  useEffect(() => {
    setFadeIn(true);
  }, []);

  return (
    <div className="page-wrapper">
      <div className="home-container">
        <div className="nav-container">
          <div 
            className="nav-item" 
            onMouseEnter={() => setShowActivityMenu(true)}
            onMouseLeave={() => setShowActivityMenu(false)}
            style={{ position: 'relative' }}
          >
            <FaChartLine className="nav-icon" />
            <span>Activity</span>
            {showActivityMenu && (
              <ActivityMenu 
                onClose={() => setShowActivityMenu(false)}
              />
            )}
          </div>
          <div 
            className="nav-item" 
            onMouseEnter={() => setShowNewMenu(true)}
            onMouseLeave={() => setShowNewMenu(false)}
            style={{ position: 'relative' }}
          >
            <FaPlus className="nav-icon" />
            <span>New</span>
            {showNewMenu && (
              <NewMenu 
                onClose={() => setShowNewMenu(false)}
              />
            )}
          </div>
          <div className="nav-item">
            <FaUser className="nav-icon" />
            <span>{username}</span>
          </div>
        </div>

        <div className="circle circle-1"></div>
        <div className="circle circle-2"></div>
        <div className="circle circle-3"></div>

        <div className="gold-accent accent-1"></div>
        <div className="gold-accent accent-2"></div>
        <div className="teal-accent accent-3"></div>
        <div className="teal-accent accent-4"></div>
        <div className="red-accent accent-5"></div>

        <div className={`logo ${fadeIn ? 'fadeIn' : ''}`}>
          <div className="logo-ring"></div>
          <div className="logo-inner">S</div>
        </div>

        <h1 className="title">Split Expenses Effortlessly</h1>
        <p className="subtitle">Keep track of shared expenses and balances with housemates, trips, groups, friends, and family.</p>

        <div className="button-container">
          <button 
            className="get-started-btn"
            onClick={() => {
              document.querySelector('.features-section').scrollIntoView({ 
                behavior: 'smooth'
              });
            }}
          >
            <span>Get Started</span>
          </button>
          
          <button 
            className="login-btn"
            onClick={() => navigate('/login')}
          >
            Login
          </button>
        </div>
      </div>

      <div className="features-wrapper">
        <div className="features-section">
          <h2 className="features-title">Why Choose Splitwise?</h2>
          <p className="features-subtitle">Simple, reliable, and trusted by millions</p>
          
          <div className="features-grid">
            <div className="feature-card">
              <div className="feature-icon teal"></div>
              <h3 className="feature-title">Easy Splitting</h3>
              <p className="feature-description">Split bills instantly with friends and family in just a few taps</p>
            </div>
      
            <div className="feature-card">
              <div className="feature-icon coral"></div>
              <h3 className="feature-title">Track Balances</h3>
              <p className="feature-description">Keep track of who owes who and settle up with ease</p>
            </div>
      
            <div className="feature-card">
              <div className="feature-icon gold"></div>
              <h3 className="feature-title">Smart Categories</h3>
              <p className="feature-description">Organize expenses by categories and get insight into your spending</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
