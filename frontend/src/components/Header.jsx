import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

function Header() {
  const { isAuthenticated, logout } = useContext(AuthContext);

  return (
    <header>
      <h1>
        <Link to={isAuthenticated ? "/notes" : "/"} style={{ color: "white", textDecoration: "none" }}>
          Keeper
        </Link>
      </h1>
      {isAuthenticated && (
        <button onClick={logout} className="logout-btn">
          LOGOUT
        </button>
      )}
    </header>
  );
}

export default Header;