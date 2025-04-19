import React, { useState, useEffect, useContext } from 'react';
import AuthContext from '../context/AuthContext';
import axios from 'axios';
import bgImage from '../src/assets/l5.jpg';

// Reusable Input Component
const PlatformInput = ({ label, name, value, onChange, currentValue, icon }) => (
  <div className="space-y-1">
    <label className="flex items-center text-sm font-medium text-gray-700 gap-1.5">
      <span className="text-lg">{icon}</span>
      {label}
      {currentValue && (
        <span className="text-xs font-normal text-gray-400 ml-1">
          (current: {currentValue})
        </span>
      )}
    </label>
    <input
      type="text"
      name={name}
      value={value}
      onChange={onChange}
      className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-300 focus:border-blue-400 transition-all outline-none"
      placeholder={`Enter ${label} username`}
    />
  </div>
);

export default function Profile() {
  const { user, token } = useContext(AuthContext);
  const [usernames, setUsernames] = useState({
    leetcode: '',
    codechef: '',
    codeforces: '',
    gfg: ''
  });

  const [status, setStatus] = useState({ type: null, message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (user) {
      setUsernames({
        leetcode: user.leetcodeUsername || '',
        codechef: user.codechefUsername || '',
        codeforces: user.codeforcesUsername || '',
        gfg: user.gfgUsername || ''
      });
    }
  }, [user]);

  const handleChange = (e) => {
    setUsernames(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setStatus({ type: null, message: '' });

    try {
      await axios.put('http://localhost:5001/api/users/profile', usernames, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setStatus({ type: 'success', message: 'Profile updated successfully!' });
    } catch (error) {
      console.error('Update error:', error);
      setStatus({
        type: 'error',
        message: error.response?.data?.message || 'Failed to update profile'
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div
      className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 py-12 px-4 sm:px-6 lg:px-8"
      style={{ backgroundImage: `url(${bgImage})`, backgroundSize: 'cover' }}
    >
      <div className="max-w-2xl mx-auto">
        <div className="bg-white/60 backdrop-blur-lg rounded-2xl shadow-xl p-8 sm:p-12 font-sans">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Developer Profile</h1>
            <p className="text-gray-500">Update your coding platform credentials</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <PlatformInput
                icon="💻"
                label="LeetCode"
                name="leetcode"
                value={usernames.leetcode}
                onChange={handleChange}
                currentValue={user?.leetcodeUsername}
              />
              <PlatformInput
                icon="🍪"
                label="CodeChef"
                name="codechef"
                value={usernames.codechef}
                onChange={handleChange}
                currentValue={user?.codechefUsername}
              />
              <PlatformInput
                icon="⚔️"
                label="Codeforces"
                name="codeforces"
                value={usernames.codeforces}
                onChange={handleChange}
                currentValue={user?.codeforcesUsername}
              />
              <PlatformInput
                icon="📚"
                label="GFG"
                name="gfg"
                value={usernames.gfg}
                onChange={handleChange}
                currentValue={user?.gfgUsername}
              />
            </div>

            {status.message && (
              <div
                className={`p-3 rounded-lg text-sm text-center ${
                  status.type === 'success'
                    ? 'bg-green-50 text-green-700'
                    : 'bg-red-50 text-red-700'
                }`}
              >
                {status.message}
              </div>
            )}

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-3.5 px-6 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-all duration-300 flex items-center justify-center gap-2"
            >
              {isSubmitting ? (
                <>
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                  Updating...
                </>
              ) : (
                'Save Changes'
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}