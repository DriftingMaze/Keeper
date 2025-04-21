import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/Home.css';

function Home() {
  return (
    <div className="home">
      <div className="hero">
        <h1>Keeper</h1>
        <p>A simple and elegant way to keep track of your notes</p>
        <div className="auth-buttons">
          <Link to="/login" className="btn">Login</Link>
          <Link to="/register" className="btn">Sign Up</Link>
        </div>
      </div>
      <div className="features">
        <div className="feature">
          <h3>Create Notes</h3>
          <p>Quickly create notes with titles and content</p>
        </div>
        <div className="feature">
          <h3>Access Anywhere</h3>
          <p>Your notes are saved and accessible from any device</p>
        </div>
        <div className="feature">
          <h3>Organize</h3>
          <p>Keep all your important thoughts in one place</p>
        </div>
      </div>
    </div>
  );
}

export default Home;