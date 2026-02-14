
import React from 'react';
import { ChevronRight, Activity, Zap } from 'lucide-react';
import { ModuleType } from '../types';

interface HeaderProps {
  activeModule: ModuleType;
  latency: number;
}

const Header: React.FC<HeaderProps> = ({ activeModule, latency }) => {
  return (
    <header className="h-16 border-b border-gray-800 px-8 flex items-center justify-between bg-[#1A1A1A]/50 backdrop-blur-md z-40">
      <div className="flex items-center text-xs font-medium space-x-2 text-gray-400">
        <span>All I's Solutions</span>
        <ChevronRight size={14} className="text-gray-600" />
        <span className="text-white capitalize">
          {activeModule === 'warehouse' ? 'Smart Warehouse Control' : 'Pipe Leakage Control'}
        </span>
      </div>

      <div className="flex items-center space-x-8">
        <div className="flex items-center space-x-4">
          <div className="flex flex-col items-end">
            <span className="text-[10px] text-gray-500 uppercase font-bold tracking-tighter">AI Models Status</span>
            <div className="flex items-center space-x-2">
               <span className="text-[10px] text-emerald-500 font-mono">ONLINE</span>
               <div className="relative flex h-2 w-2">
                 <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                 <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
               </div>
            </div>
          </div>
          
          <div className="h-8 w-px bg-gray-800 mx-2" />

          <div className="flex flex-col items-end">
            <span className="text-[10px] text-gray-500 uppercase font-bold tracking-tighter">Latency</span>
            <div className="flex items-center space-x-1 text-emerald-400 font-mono text-xs">
              <Zap size={10} />
              <span>{latency} ms</span>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
