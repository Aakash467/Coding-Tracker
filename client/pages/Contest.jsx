import React from 'react';
import bgImage from '../src/assets/l5.jpg';

const ContestCard = ({ platform, link, borderColor, icon }) => (
  <div className={`bg-white/95 backdrop-blur-sm border-l-4 ${borderColor} rounded-xl shadow-lg p-6 transition-all duration-300 hover:shadow-xl hover:-translate-y-1`}>
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-4">
        <span className="text-3xl">{icon}</span>
        <h2 className="text-xl font-semibold text-gray-800">{platform}</h2>
      </div>
      <a
        href={link}
        target="_blank"
        rel="noopener noreferrer"
        className="px-5 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200"
      >
        View Contests
      </a>
    </div>
  </div>
);

export default function Contest() {
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
              Upcoming Contests
            </h1>
            <p className="text-lg text-gray-700 font-medium">
              Compete and improve your coding skills
            </p>
            <p className="italic text-sm text-purple-700 mt-2">"It's not about being the best. It's about being better than you were yesterday." – Roronoa Zoro</p>
          </div>
        </div>

        <div className="space-y-6">
          <ContestCard
            platform="LeetCode"
            icon="💻"
            borderColor="border-orange-400"
            link="https://leetcode.com/contest/"
          />

          <ContestCard
            platform="CodeChef"
            icon="🍪"
            borderColor="border-red-400"
            link="https://www.codechef.com/contests"
          />

          <ContestCard
            platform="Codeforces"
            icon="⚔️"
            borderColor="border-blue-400"
            link="https://codeforces.com/contests"
          />

          <ContestCard
            platform="GeeksforGeeks"
            icon="📚"
            borderColor="border-green-400"
            link="https://practice.geeksforgeeks.org/events/rec/gfg-weekly-coding-contest"
          />
        </div>
      </div>
    </div>
  );
}