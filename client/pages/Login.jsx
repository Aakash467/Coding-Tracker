import React, { useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthContext from '../context/AuthContext';
import axios from 'axios';
import bgImage from '../src/assets/l5.jpg';
import API_URL from '../utils/api';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { user,login } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      navigate('/'); // Redirect to home if already logged in
    }
  }, [user, navigate]);

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${API_URL}/auth/login`, { email, password });
      login(response.data.token, response.data.user);
      navigate('/');
    } catch (error) {
      alert('Login failed! Check your credentials.');
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center px-4 bg-cover bg-center" style={{ backgroundImage: `url(${bgImage})` }}>
      <div className="bg-gray-100/30 backdrop-blur-sm p-8 rounded-lg shadow-lg w-full max-w-md border border-white/30">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">Login</h2>
        <form onSubmit={handleLogin} className="space-y-4">
          <input 
            type="email" 
            placeholder="Email" 
            value={email} 
            onChange={(e) => setEmail(e.target.value)} 
            required 
            className="w-full p-3 border border-gray-600/30 rounded focus:ring-2 focus:ring-blue-500 bg-white/50 placeholder:text-gray-600/80 text-gray-800"
          />
          <input 
            type="password" 
            placeholder="Password" 
            value={password} 
            onChange={(e) => setPassword(e.target.value)} 
            required 
            className="w-full p-3 border border-gray-600/30 rounded focus:ring-2 focus:ring-blue-500 bg-white/50 placeholder:text-gray-600/80 text-gray-800"
          />
          <button 
            type="submit" 
            className="w-full bg-blue-500/90 text-white py-3 rounded font-semibold hover:bg-blue-700 transition duration-200 border border-blue-500/30"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
}