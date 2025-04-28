import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import TrailingCursor from "../components/TrailingCursor";
import "../styles/HomePage.css";

const HomePage = () => {
  const navigate = useNavigate();
  const [fadeIn, setFadeIn] = useState(false);
  const [showButtons, setShowButtons] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    // Start the fade-in animation after component mounts
    setFadeIn(true);
    
    // Show the buttons after 1.5 seconds
    const buttonTimer = setTimeout(() => {
      setShowButtons(true);
    }, 1500);
    
    return () => clearTimeout(buttonTimer);
  }, []);

  const handleNavigate = (path) => {
    navigate(path);
    setIsMenuOpen(false);
  };

  return (
    <div className="home-container custom-cursor">
      <div className="menu-container">
        <button 
          className="menu-toggle"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
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
      
      {/* Decorative elements */}
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
      
      <h1 className={`title ${fadeIn ? 'fadeIn' : ''}`}>SPLITWISE</h1>
      <p className={`subtitle ${fadeIn ? 'fadeIn' : ''}`}>Split expenses with friends and family</p>

      {showButtons && (
        <div className="tabs-container">
          <button 
            className="tab-button"
            onClick={() => handleNavigate("/single-expense")}
          >
            Single Expense
          </button>
          <button 
            className="tab-button"
            onClick={() => handleNavigate("/group-expense")}
          >
            Group Expense
          </button>
        </div>
      )}
      
      <TrailingCursor />
    </div>
  );
};

export default HomePage;
