import React from "react";
import { Link } from "react-router-dom";

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div className="flex flex-col min-h-screen">

      <header className="bg-gray-800 text-white p-4">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-xl font-bold">Grimoire</h1>
          <nav>
            <Link to="/" className="mr-4">Home</Link>
            <Link to="/login" className="mr-4">Login</Link>
            <Link to="/register">Register</Link>
          </nav>
        </div>
      </header>

      <main className="flex-grow">
        {children}
      </main>

      <footer className="bg-gray-800 text-white p-4 text-center">
        <p>&copy; 2025 Grimoire. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default Layout;