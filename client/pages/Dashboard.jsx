import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import AuthContext from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import bgImage from '../src/assets/l5.jpg';

const StatCard = ({ title, children, borderColor = 'border-indigo-200', icon }) => (
  <div className={`relative bg-white/90 backdrop-blur-sm border-l-4 ${borderColor} rounded-xl shadow-lg p-6 transition-all duration-300 hover:shadow-xl hover:-translate-y-1.5`}>
    <div className="absolute top-4 right-4 text-3xl opacity-20">
      {icon}
    </div>
    <h4 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
      {title}
    </h4>
    <div className="space-y-3 text-gray-600">
      {children}
    </div>
  </div>
);

const PLATFORM_ICONS = {
  leetcode: '💻',
  codechef: '🍪',
  codeforces: '⚔️',
  gfg: '📚'
};

export default function Dashboard() {
  const { user, token } = useContext(AuthContext);
  const [stats, setStats] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (!token) navigate('/login');
    else fetchStats();
  }, [token, navigate]);

  const fetchStats = async () => {
    try {
      const response = await axios.get('http://localhost:5001/api/stats', {
        headers: { Authorization: `Bearer ${token}` },
      });
      setStats(response.data);
      console.log('Fetched stats:', response.data);
    } catch (error) {
      console.error('Error fetching stats:', error);
    }
  };

  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8 relative" style={{ backgroundImage: `url(${bgImage})`, backgroundSize: 'cover' }}>
      <div className="absolute inset-0 bg-gradient-to-br from-blue-100/30 to-purple-100/30 backdrop-blur-[2px] z-0" />
      <div className="relative z-10 max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <div className="inline-block bg-white/80 backdrop-blur-sm px-8 py-4 rounded-2xl shadow-lg">
            <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-2">
              Developer Dashboard
            </h1>
            <p className="text-lg text-gray-600 font-medium">
              {stats ? `Welcome back, ${user.username}! 👋` : 'Crunching your stats...'}
            </p>
            <p className="italic text-sm text-purple-700 mt-2">"When do you think people die? When they are shot with a bullet? No! It's when they are forgotten!" – Dr. Hiluluk</p>
          </div>
        </div>

        {stats ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
            <a
              href={`https://leetcode.com/${user.leetcodeUsername}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              <StatCard title="LeetCode" borderColor="border-orange-400" icon={PLATFORM_ICONS.leetcode}>
                {stats.leetcode ? (
                  <div className="space-y-3">
                    
                    <StatItem label="Easy" 
                      value={stats.leetcode.matchedUser?.submitStatsGlobal?.acSubmissionNum?.find(item => item.difficulty === "Easy")?.count || 0}
                      color="text-green-500" />
                    <StatItem label="Medium" 
                      value={stats.leetcode.matchedUser?.submitStatsGlobal?.acSubmissionNum?.find(item => item.difficulty === "Medium")?.count || 0}
                      color="text-yellow-500" />
                    <StatItem label="Hard" 
                      value={stats.leetcode.matchedUser?.submitStatsGlobal?.acSubmissionNum?.find(item => item.difficulty === "Hard")?.count || 0}
                      color="text-red-500" />
                  </div>
                ) : <EmptyState />}
              </StatCard>
            </a>

            <a
              href={`https://www.codechef.com/users/${user.codechefUsername}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              <StatCard title="CodeChef" borderColor="border-red-400" icon={PLATFORM_ICONS.codechef}>
                {stats.codechef ? (
                  <div className="space-y-3">
                    <StatItem label="Rating" value={stats.codechef.currentRating} />
                    <StatItem label="Highest Rating" value={stats.codechef.highestRating} />
                    <StatItem label="Stars" value={stats.codechef.stars} color="text-yellow-500" />
                  </div>
                ) : <EmptyState />}
              </StatCard>
            </a>

            <a
              href={`https://codeforces.com/profile/${user.codeforcesUsername}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              <StatCard title="CodeForces" borderColor="border-blue-400" icon={PLATFORM_ICONS.codeforces}>
                {stats.codeforces ? (
                  <div className="space-y-3">
                    <StatItem label="Problems Solved" value={stats.codeforces.problemsSolved} />
                    <StatItem label="Rank" value={stats.codeforces.rank} />
                    <StatItem label="Contribution" value={stats.codeforces.contribution} />
                  </div>
                ) : <EmptyState />}
              </StatCard>
            </a>

            <a
              href={`https://auth.geeksforgeeks.org/user/${user.gfgUsername}/`}
              target="_blank"
              rel="noopener noreferrer"
            >
              <StatCard title="GeeksforGeeks" borderColor="border-green-400" icon={PLATFORM_ICONS.gfg}>
                {stats.gfg ? (
                  <div className="space-y-3">
                    <StatItem label="Coding Score" value={stats.gfg.userInfo.score} />
                    <StatItem label="Problems Solved" value={stats.gfg.userInfo.total_problems_solved} />
                    <StatItem label="Monthly Score" value={stats.gfg.userInfo.monthly_score} />
                  </div>
                ) : <EmptyState />}
              </StatCard>
            </a>
          </div>
        ) : <LoadingState />}
      </div>
    </div>
  );
}

const StatItem = ({ label, value, color = "text-gray-900" }) => (
  <div className="flex justify-between items-center py-1.5 px-3 rounded-lg bg-gray-50/50">
    <span className="font-medium text-gray-600">{label}</span>
    <span className={`font-semibold ${color}`}>{value || 'N/A'}</span>
  </div>
);

const EmptyState = () => (
  <div className="text-center py-4">
    <p className="text-gray-400 italic">No data available</p>
  </div>
);

const LoadingState = () => (
  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
    {[1, 2, 3, 4].map((i) => (
      <div key={i} className="h-40 bg-white/80 rounded-xl shadow-lg animate-pulse">
        <div className="h-5 bg-gray-200 rounded w-1/3 mb-4 mt-6 ml-6" />
        <div className="space-y-3 px-6">
          <div className="h-4 bg-gray-200 rounded w-full" />
          <div className="h-4 bg-gray-200 rounded w-4/5" />
          <div className="h-4 bg-gray-200 rounded w-3/4" />
        </div>
      </div>
    ))}
  </div>
);