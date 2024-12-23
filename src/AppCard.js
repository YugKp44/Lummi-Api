import React from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate for redirection
import "./App.css"; // Optional: If you want to add custom styles

const AppCard = () => {

  const navigate = useNavigate(); // Hook for navigation

  // Fetch random images from an API when search term changes


  const handleClick = () => {
    
    navigate("/lummiapp"); // Redirect to another page when card is clicked
  };

  return (
    <div className="app-container">
      <div className="app-card" onClick={handleClick}>
        <img
          src="https://www.lummi.ai/apple-icon.png?ecde11f55b11e587/64"
          alt="Lummi.ai Logo"
          className="app-logo"
        />
        <div className="app-info">
          <h3 className="app-title">Lummi.ai</h3>
          <p className="app-description">
            Your personal AI content creator and assistant for smarter
            storytelling.
          </p>
        </div>
      </div>

     

     
    </div>
  );
};

export default AppCard;
