import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import AuthContext from '../context/AuthContext';

export default function Navbar() {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleButtonClick = () => {
    logout();
    navigate('/');
  };

  return (
    <nav className="bg-gray-800 p-5 shadow-lg">
      <ul className="flex justify-between items-center text-white">
        <div className="flex space-x-6">
          <li>
            <Link to="/" className="px-4 py-2 text-lg font-semibold tracking-wide rounded-md hover:bg-gray-700 transition duration-300">
              Home
            </Link>
          </li>
          <li>
            <Link to="/profile" className="px-4 py-2 text-lg font-semibold tracking-wide rounded-md hover:bg-gray-700 transition duration-300">
              Profile
            </Link>
          </li>
          <li>
            <Link to="/leaderboard" className="px-4 py-2 text-lg font-semibold tracking-wide rounded-md hover:bg-gray-700 transition duration-300">
              Leaderboard
            </Link>
          </li>
          <li>
            <Link to="/problems" className="px-4 py-2 text-lg font-semibold tracking-wide rounded-md hover:bg-gray-700 transition duration-300">
              Problems
            </Link>
          </li>
          <li>
            <Link to="/contest" className="px-4 py-2 text-lg font-semibold tracking-wide rounded-md hover:bg-gray-700 transition duration-300">
              Contest
            </Link>
          </li>
        </div>
        {user && (
          <button 
            onClick={handleButtonClick} 
            className="bg-red-600 px-5 py-2 text-sm font-bold uppercase rounded-md hover:bg-red-700 transition duration-300"
          >
            Logout
          </button>
        )}
      </ul>
    </nav>
  );
}
