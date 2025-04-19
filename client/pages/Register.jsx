import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import AuthContext from '../context/AuthContext';
import bgImage from '../src/assets/l5.jpg';

export default function Register() {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    leetcodeUsername: '',
    codechefUsername: '',
    codeforcesUsername: '',
    gfgUsername: '',
  });

  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5001/api/auth/register', formData);
      navigate('/login');
    } catch (error) {
      alert('Registration failed! Try again.');
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center px-4 bg-cover bg-center" style={{ backgroundImage: `url(${bgImage})` }}>
      <div className="bg-gray-100/30 backdrop-blur-sm p-8 rounded-lg shadow-lg w-full max-w-md border border-white/30">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">Create an Account</h2>
        <form onSubmit={handleRegister} className="space-y-4">
          <input 
            type="text" 
            name="username" 
            placeholder="Username" 
            value={formData.username} 
            onChange={handleChange} 
            required 
            className="w-full p-3 border border-gray-600/30 rounded focus:ring-2 focus:ring-blue-500 bg-white/50 placeholder:text-gray-600/80 text-gray-800"
          />
          <input 
            type="email" 
            name="email" 
            placeholder="Email" 
            value={formData.email} 
            onChange={handleChange} 
            required 
            className="w-full p-3 border border-gray-600/30 rounded focus:ring-2 focus:ring-blue-500 bg-white/50 placeholder:text-gray-600/80 text-gray-800"
          />
          <input 
            type="password" 
            name="password" 
            placeholder="Password" 
            value={formData.password} 
            onChange={handleChange} 
            required 
            className="w-full p-3 border border-gray-600/30 rounded focus:ring-2 focus:ring-blue-500 bg-white/50 placeholder:text-gray-600/80 text-gray-800"
          />
          
          {/* Platform Username Fields */}
          <input 
            type="text" 
            name="leetcodeUsername" 
            placeholder="LeetCode Username" 
            value={formData.leetcodeUsername} 
            onChange={handleChange} 
            className="w-full p-3 border border-gray-600/30 rounded focus:ring-2 focus:ring-blue-500 bg-white/50 placeholder:text-gray-600/80 text-gray-800"
          />
          <input 
            type="text" 
            name="codechefUsername" 
            placeholder="CodeChef Username" 
            value={formData.codechefUsername} 
            onChange={handleChange} 
            className="w-full p-3 border border-gray-600/30 rounded focus:ring-2 focus:ring-blue-500 bg-white/50 placeholder:text-gray-600/80 text-gray-800"
          />
          <input 
            type="text" 
            name="codeforcesUsername" 
            placeholder="CodeForces Username" 
            value={formData.codeforcesUsername} 
            onChange={handleChange} 
            className="w-full p-3 border border-gray-600/30 rounded focus:ring-2 focus:ring-blue-500 bg-white/50 placeholder:text-gray-600/80 text-gray-800"
          />
          <input 
            type="text" 
            name="gfgUsername" 
            placeholder="GeeksforGeeks Username" 
            value={formData.gfgUsername} 
            onChange={handleChange} 
            className="w-full p-3 border border-gray-600/30 rounded focus:ring-2 focus:ring-blue-500 bg-white/50 placeholder:text-gray-600/80 text-gray-800"
          />

          <button 
            type="submit" 
            className="w-full bg-blue-500/90 text-white py-3 rounded font-semibold hover:bg-blue-700 transition duration-200 border border-blue-500/30"
          >
            Register
          </button>
        </form>
      </div>
    </div>
  );
}