
import React from 'react';
import { ModuleType } from '../../types';

interface StatsHubProps {
  activeModule: ModuleType;
}

const StatsHub: React.FC<StatsHubProps> = ({ activeModule }) => {
  const warehouseStats = [
    { label: 'Total Occupancy', value: '78.4%', sub: '+2.1% from yesterday' },
    { label: 'Pending Putaway', value: '14', sub: 'Est. time: 42m' },
    { label: 'Dock Efficiency', value: '94%', sub: 'High workload' },
  ];

  const pipeStats = [
    { label: 'Avg Pressure', value: '142 PSI', sub: 'Range: 138-145' },
    { label: 'Flow Rate', value: '12.5 L/s', sub: 'Stable flow' },
    { label: 'Vibration Index', value: '0.04g', sub: 'Normal noise' },
  ];

  const stats = activeModule === 'warehouse' ? warehouseStats : pipeStats;

  return (
    <div className="px-6 py-8">
      <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-widest mb-6">Real-Time Core Metrics</h3>
      <div className="grid grid-cols-2 gap-4">
        {stats.map((stat, i) => (
          <div key={i} className={`p-4 rounded-xl bg-gradient-to-br from-gray-800/50 to-gray-900/50 border border-gray-800 transition-all hover:border-emerald-900/50 group ${i === 0 ? 'col-span-2' : ''}`}>
            <span className="text-[10px] text-gray-500 font-medium block mb-1 group-hover:text-emerald-500 transition-colors uppercase tracking-tight">
              {stat.label}
            </span>
            <div className="flex items-baseline gap-2">
              <span className="text-2xl font-mono font-bold text-white tracking-tighter">{stat.value}</span>
              <span className="text-[9px] text-gray-400 font-medium">{stat.sub}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default StatsHub;
