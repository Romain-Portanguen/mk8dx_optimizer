import React from 'react';
import { FaCar, FaCog, FaWind } from 'react-icons/fa';

const StatItem = ({ label, value }: { label: string; value: number }) => (
  <div className="flex justify-between items-center mb-2">
    <span className="text-sm text-gray-600">{label}</span>
    <span className="text-sm font-semibold text-gray-800">{value}</span>
  </div>
);

const ComponentCard = ({ title, icon, stats }: { title: string; icon: React.ReactNode; stats: Record<string, number> }) => (
  <div className="bg-white p-4 rounded-lg shadow">
    <h3 className="text-lg font-semibold text-indigo-600 flex items-center mb-4">
      {icon}
      <span className="ml-2">{title}</span>
    </h3>
    {Object.entries(stats).map(([key, value]) => (
      <StatItem key={key} label={key} value={value} />
    ))}
  </div>
);

export function ResultDisplay({ result }: { result: any }) {
  return (
    <div className="bg-indigo-50 p-6 rounded-xl">
      <h2 className="text-2xl font-bold text-indigo-800 mb-6">Optimal Configuration</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <ComponentCard title={result.body.name} icon={<FaCar className="text-red-500" />} stats={result.body.stats} />
        <ComponentCard title={result.tire.name} icon={<FaCog className="text-blue-500" />} stats={result.tire.stats} />
        <ComponentCard title={result.glider.name} icon={<FaWind className="text-green-500" />} stats={result.glider.stats} />
      </div>
    </div>
  );
}