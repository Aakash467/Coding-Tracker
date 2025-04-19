import React from 'react';
import bgImage from '../src/assets/l5.jpg';

const ProblemCard = ({ platform, title, link, borderColor, icon }) => (
  <div className={`mb-6 bg-white/95 backdrop-blur-sm border-l-4 ${borderColor} rounded-xl shadow-lg p-6 transition-all duration-300 hover:shadow-xl hover:-translate-y-1`}>
    <div className="flex items-center gap-3 mb-4">
      <span className="text-2xl">{icon}</span>
      <h2 className="text-xl font-semibold text-gray-800">{platform}</h2>
    </div>
    <div className="space-y-3">
      <p className="text-gray-700 flex items-center gap-2">
        <span className="text-green-500">●</span>
        <strong>Today's Problem:</strong> 
        <em className="text-gray-600">{title}</em>
      </p>
      <a
        href={link}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-block px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200"
      >
        Solve on {platform}
      </a>
    </div>
  </div>
);

export default function Problems() {
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
      <div className="relative z-10 max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <div className="inline-block bg-white/95 backdrop-blur-sm px-8 py-4 rounded-2xl shadow-xl border border-gray-100">
            <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-2">
              Daily Practice Problems
            </h1>
            <p className="text-lg text-gray-700 font-medium">
              Sharpen your skills with today's challenges
            </p>
            <p className="italic text-sm text-purple-700 mt-2">"No matter how hard or impossible it is, never lose sight of your goal." – Monkey D. Luffy</p>
          </div>
        </div>

        <div className="space-y-8">
          <ProblemCard
            platform="LeetCode"
            icon="💻"
            borderColor="border-orange-400"
            title="Visit LeetCode Daily Challenge"
            link="https://leetcode.com/explore/challenge/card/30-day-leetcoding-challenge/"
          />

          <ProblemCard
            platform="GeeksforGeeks"
            icon="📚"
            borderColor="border-green-400"
            title="Count the triplets"
            link="https://practice.geeksforgeeks.org/problem-of-the-day"
          />
        </div>
      </div>
    </div>
  )
}