import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
// Add these imports at the top
import { FaHome, FaChartLine, FaPlus, FaHeart, FaUsers } from "react-icons/fa";

import TrailingCursor from "../components/TrailingCursor";
import "../styles/HomePage.css";

const HomePage = () => {
  const navigate = useNavigate();
  const [fadeIn, setFadeIn] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    setFadeIn(true);
  }, []);

  const handleNavigate = (path) => {
    navigate(path);
    setIsMenuOpen(false);
  };

  return (
    <>
      <div className="home-container custom-cursor">
        <div className="nav-container">
          <div className="nav-item">
            <FaHome className="nav-icon" />
            <span>Dashboard</span>
          </div>
          <div className="nav-item">
            <FaChartLine className="nav-icon" />
            <span>Activity</span>
          </div>
          <div className="nav-item">
            <FaPlus className="nav-icon" />
            <span>New</span>
          </div>
          <div className="nav-item">
            <FaHeart className="nav-icon" />
            <span>Friends</span>
          </div>
          <div className="nav-item">
            <FaUsers className="nav-icon" />
            <span>Groups</span>
          </div>
        </div>

        <div className="menu-container">
          <button className="menu-toggle" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            <span className="menu-line"></span>
            <span className="menu-line"></span>
            <span className="menu-line"></span>
          </button>
          {isMenuOpen && (
            <div className="menu-dropdown">
              <button onClick={() => handleNavigate('/single-expense')}>
                Single Expense
              </button>
              <button onClick={() => handleNavigate('/group-expense')}>
                Group Expense
              </button>
            </div>
          )}
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
          <button className="get-started">Get Started</button>
        </div>

        <TrailingCursor />
      </div>

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
    </>
  );
};

export default HomePage;
