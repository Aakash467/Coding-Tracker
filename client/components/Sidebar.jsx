import React, { useState } from 'react';
import { motion } from 'framer-motion';

export default function Sidebar({ stats }) {
  const [activePlatform, setActivePlatform] = useState('leetcode');

  const platforms = [
    { name: 'LeetCode', key: 'leetcode' },
    { name: 'CodeChef', key: 'codechef' },
    { name: 'CodeForces', key: 'codeforces' },
    { name: 'GeeksforGeeks', key: 'gfg' },
  ];

  return (
    <div className="sidebar-container">
      <motion.div 
        className="sidebar"
        initial={{ x: -250 }}
        animate={{ x: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h2>Platforms</h2>
        {platforms.map((platform) => (
          <button 
            key={platform.key} 
            onClick={() => setActivePlatform(platform.key)}
            className={activePlatform === platform.key ? 'active' : ''}
          >
            {platform.name}
          </button>
        ))}
      </motion.div>

      <motion.div 
        className="stats-content"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <h2>{platforms.find(p => p.key === activePlatform)?.name} Stats</h2>
        <p><strong>Username:</strong> {stats[activePlatform] || 'N/A'}</p>
      </motion.div>
    </div>
  );
}