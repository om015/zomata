import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div>
      <h1>Welcome to Zomato Clone</h1>
      <nav>
        <Link to="/login">Login</Link> | 
        <Link to="/register">Sign Up</Link> | 
        <Link to="/investor">Investor Relations</Link> | 
        <Link to="/restaurant">Add Restaurant</Link>
      </nav>
    </div>
  );
};

export default Home;
