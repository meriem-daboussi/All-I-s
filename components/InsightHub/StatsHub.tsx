
import React from 'react';
import { ModuleType } from '../../types';
import { Globe, Cpu } from 'lucide-react';

interface StatsHubProps {
  activeModule: ModuleType;
}

const StatsHub: React.FC<StatsHubProps> = ({ activeModule }) => {
  const warehouseStats = [
    { label: 'Total Occupancy', value: '78.4%', sub: '+2.1% from yesterday', color: 'emerald' },
    { label: 'Pending Putaway', value: '14', sub: 'Est. time: 42m', color: 'amber' },
    { label: 'Dock Efficiency', value: '94%', sub: 'High workload', color: 'emerald' },
    { label: 'Global Intel Contrib.', value: '1,242', sub: 'Model updates today', color: 'blue' },
  ];

  const pipeStats = [
    { label: 'Avg Pressure', value: '142 PSI', sub: 'Range: 138-145', color: 'emerald' },
    { label: 'Flow Rate', value: '12.5 L/s', sub: 'Stable flow', color: 'emerald' },
    { label: 'Vibration Index', value: '0.04g', sub: 'Normal noise', color: 'amber' },
    { label: 'Pool Leak Vectors', value: '8.4k', sub: 'Global reference points', color: 'blue' },
  ];

  const stats = activeModule === 'warehouse' ? warehouseStats : pipeStats;

  return (
    <div className="px-6 py-8">
      <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-widest mb-6 flex items-center gap-2">
        <Cpu size={14} className="text-emerald-500" />
        Real-Time Core Metrics
      </h3>
      <div className="grid grid-cols-2 gap-4">
        {stats.map((stat, i) => (
          <div 
            key={i} 
            className={`p-4 rounded-xl bg-[#1A1A1A] border border-gray-800 transition-all hover:border-emerald-500/30 group ${i === 0 ? 'col-span-2' : ''}`}
          >
            <span className="text-[10px] text-gray-500 font-bold block mb-1 group-hover:text-white transition-colors uppercase tracking-widest">
              {stat.label}
            </span>
            <div className="flex items-baseline gap-2">
              <span className={`text-2xl font-mono font-black tracking-tighter ${stat.color === 'emerald' ? 'text-emerald-500' : stat.color === 'amber' ? 'text-amber-500' : 'text-blue-400'}`}>
                {stat.value}
              </span>
              <span className="text-[9px] text-gray-500 font-mono font-bold uppercase">{stat.sub}</span>
            </div>
            {stat.color === 'blue' && (
              <div className="mt-2 flex items-center gap-1.5">
                <div className="h-1 flex-1 bg-gray-800 rounded-full overflow-hidden">
                  <div className="h-full bg-blue-500 w-2/3 animate-pulse" />
                </div>
                <Globe size={10} className="text-blue-500" />
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default StatsHub;
