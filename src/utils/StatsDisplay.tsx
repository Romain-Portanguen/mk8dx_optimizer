import React from 'react';

const StatBar = ({ value, max = 12 }: { value: number, max?: number }) => (
  <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
    <div
      className="bg-gradient-to-r from-blue-400 to-indigo-500 h-3 rounded-full transition-all duration-500 ease-out"
      style={{ width: `${(value / max) * 100}%` }}
    ></div>
  </div>
);

export function StatsDisplay({ stats }: { stats: Record<string, number> }) {
  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h3 className="text-2xl font-bold mb-6 text-center text-indigo-700">Component Stats</h3>
      <div className="space-y-4">
        {Object.entries(stats).map(([key, value]) => (
          <div key={key} className="flex items-center">
            <span className="w-1/3 text-sm font-medium text-gray-700">{key}:</span>
            <div className="w-1/2 mx-2">
              <StatBar value={value} />
            </div>
            <span className="w-8 text-right text-sm font-semibold text-indigo-600">{value}</span>
          </div>
        ))}
      </div>
    </div>
  );
}