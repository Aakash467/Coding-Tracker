import React, { useEffect, useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthContext from '../context/AuthContext';
import axios from 'axios';
import bgImage from '../src/assets/l5.jpg';

const PLATFORM_ICONS = {
  leetcode: '💻',
  codechef: '🍪',
  codeforces: '⚔️',
  gfg: '📚'
};

export default function Leaderboard() {
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
    } catch (error) {
      console.error('Error fetching stats:', error);
    }
  };

  return (
    <div 
      className="min-h-screen py-12 px-4 sm:px-6 lg:px-8 relative"
      style={{ 
        backgroundImage: `url(${bgImage})`,
        backgroundSize: 'cover',
        backgroundAttachment: 'fixed',
        backgroundBlendMode: 'soft-light'
      }}
    >
      <div className="relative z-10 max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <div className="inline-block bg-white/95 backdrop-blur-sm px-8 py-4 rounded-2xl shadow-xl border border-gray-100">
            <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-2">
              Platform Rankings
            </h1>
            <p className="text-lg text-gray-700 font-medium">
              {stats ? `Hello ${user.username}! Your competitive standings` : 'Loading rankings...'}
            </p>
            <p className="italic text-sm text-indigo-700 mt-2">"A true leader doesn't seek respect. A true leader earns respect by giving it." – Monkey D. Luffy</p>
          </div>
        </div>

        {stats ? (
          <div className="bg-white/95 backdrop-blur-sm rounded-xl shadow-xl border border-gray-100 overflow-hidden">
            <table className="w-full">
              <thead className="bg-gray-50/80 border-b border-gray-200">
                <tr>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">Platform</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">Rank</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">Rating</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100/70">
                <TableRow 
                  platform="LeetCode" 
                  icon={PLATFORM_ICONS.leetcode}
                  rank={stats.leetcode?.userContestRanking?.globalRanking ?? 'N/A'} 
                  rating={stats.leetcode?.userContestRanking?.rating?.toFixed(0) ?? 'N/A'}
                  borderColor="border-orange-400"
                />
                <TableRow 
                  platform="CodeChef" 
                  icon={PLATFORM_ICONS.codechef}
                  rank={stats.codechef?.globalRank ?? 'N/A'} 
                  rating={stats.codechef?.currentRating ?? 'N/A'}
                  borderColor="border-red-400"
                />
                <TableRow 
                  platform="Codeforces" 
                  icon={PLATFORM_ICONS.codeforces}
                  rank={stats.codeforces?.rank ?? 'N/A'} 
                  rating={stats.codeforces?.rating ?? 'N/A'}
                  borderColor="border-blue-400"
                />
                <TableRow 
                  platform="GeeksforGeeks" 
                  icon={PLATFORM_ICONS.gfg}
                  rank={stats.gfg?.userInfo?.institute_rank ?? 'N/A'} 
                  rating={stats.gfg?.userInfo?.score ?? 'N/A'}
                  borderColor="border-green-400"
                />
              </tbody>
            </table>
          </div>
        ) : (
          <LoadingState />
        )}
      </div>
    </div>
  );
}

const TableRow = ({ platform, icon, rank, rating, borderColor }) => (
  <tr className={`hover:bg-gray-50/50 transition-colors border-l-4 ${borderColor}`}>
    <td className="px-6 py-4">
      <div className="flex items-center gap-3">
        <span className="text-2xl">{icon}</span>
        <span className="font-medium text-gray-700">{platform}</span>
      </div>
    </td>
    <td className="px-6 py-4">
      <span className="inline-block px-3 py-1 rounded-full bg-blue-100/50 text-blue-800 text-sm font-medium">
        #{rank}
      </span>
    </td>
    <td className="px-6 py-4">
      <div className="flex items-center gap-2">
        <span className="text-lg font-semibold text-gray-800">{rating}</span>
        <span className="text-sm text-gray-500">points</span>
      </div>
    </td>
  </tr>
);

const LoadingState = () => (
  <div className="animate-pulse bg-white/95 rounded-xl shadow-xl border border-gray-100 overflow-hidden">
    <div className="space-y-4 p-6">
      {[1, 2, 3, 4].map((i) => (
        <div key={i} className="flex justify-between items-center py-4 border-b border-gray-100">
          <div className="flex items-center gap-3">
            <div className="h-8 w-8 bg-gray-200 rounded-full" />
            <div className="h-4 bg-gray-200 rounded w-24" />
          </div>
          <div className="h-6 bg-gray-200 rounded w-16" />
          <div className="h-6 bg-gray-200 rounded w-20" />
        </div>
      ))}
    </div>
  </div>
);