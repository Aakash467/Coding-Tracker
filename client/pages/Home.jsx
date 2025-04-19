import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import AuthContext from '../context/AuthContext';
import bgImage from '../src/assets/l5.jpg';

export default function Home() {
  const { user, logout } = useContext(AuthContext);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-cover bg-center px-6" 
         style={{ backgroundImage: `url(${bgImage})` }}>
      <div className="bg-white/30 backdrop-blur-sm rounded-lg shadow-lg p-8 max-w-2xl w-full border border-white/20">
        <h1 className="text-4xl font-bold mb-6 text-gray-800 text-center">Welcome to Coding Tracker</h1>
        
        {user ? (
          <div className="space-y-6">
            <p className="text-xl text-center text-gray-700">
              Hello, <span className="font-semibold text-blue-600">{user.username}</span>! 
              Track your coding stats here.
            </p>
            <div className="flex justify-center space-x-4">
              <Link to="/dashboard">
                <button className="bg-blue-500/90 text-white px-8 py-3 rounded-lg font-semibold
                                  hover:bg-blue-500 transition duration-200 border border-blue-500/30
                                  shadow-md">
                  Go to Dashboard
                </button>
              </Link>
              <button 
                onClick={logout} 
                className="bg-red-500/90 text-white px-8 py-3 rounded-lg font-semibold
                          hover:bg-red-500 transition duration-200 border border-red-500/30
                          shadow-md">
                Logout
              </button>
            </div>
            <p className="italic text-center text-gray-600 mb-4">"Power isn't determined by your size, but the size of your heart and dreams." – Monkey D. Luffy</p>
          </div>
        ) : (
          <div className="space-y-6">
            <p className="text-lg text-center text-gray-700">
              Login to track your coding progress
            </p>
            <div className="flex justify-center space-x-4">
              <Link to="/login">
                <button className="bg-blue-500/90 text-white px-8 py-3 rounded-lg font-semibold
                                  hover:bg-blue-500 transition duration-200 border border-blue-500/30
                                  shadow-md">
                  Login
                </button>
              </Link>
              <Link to="/register">
                <button className="bg-green-500/90 text-white px-8 py-3 rounded-lg font-semibold
                                  hover:bg-green-500 transition duration-200 border border-green-500/30
                                  shadow-md">
                  Register
                </button>
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}