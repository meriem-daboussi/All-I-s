
import React, { useState, useEffect } from 'react';
import { ChevronRight, Activity, Zap, Globe, RefreshCw, Share2 } from 'lucide-react';
import { ModuleType } from '../types';

interface HeaderProps {
  activeModule: ModuleType;
  latency: number;
}

const Header: React.FC<HeaderProps> = ({ activeModule, latency }) => {
  const [syncSeconds, setSyncSeconds] = useState(0);
  const [isSyncing, setIsSyncing] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setSyncSeconds(prev => {
        if (prev >= 15) {
          setIsSyncing(true);
          setTimeout(() => setIsSyncing(false), 2000);
          return 0;
        }
        return prev + 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <header className="h-16 border-b border-gray-800 px-8 flex items-center justify-between bg-[#141414] backdrop-blur-md z-40">
      <div className="flex items-center text-[11px] font-black space-x-2 text-gray-500 uppercase tracking-widest">
        <span className="hover:text-white cursor-pointer transition-colors">All I's Solutions</span>
        <ChevronRight size={12} className="text-gray-700" />
        <span className="text-emerald-500">
          {activeModule === 'warehouse' ? 'Warehouse Intelligence v3.1' : 'Conduit Integrity Monitor'}
        </span>
      </div>

      <div className="flex items-center gap-8">
        {/* Federated Sync Status */}
        <div className="flex items-center gap-3 bg-black/40 px-3 py-1.5 rounded-lg border border-gray-800/50">
          <div className="flex flex-col items-end">
            <span className="text-[9px] text-gray-600 uppercase font-black tracking-widest">Global Sync Pool</span>
            <div className="flex items-center gap-2">
               <span className={`text-[10px] font-mono font-bold tracking-tighter transition-colors duration-500 ${isSyncing ? 'text-blue-400' : 'text-emerald-400/70'}`}>
                 {isSyncing ? 'UPLOADING_VECTORS...' : `${syncSeconds}s SINCE CONTRIB`}
               </span>
               <div className="relative flex h-3 w-3 items-center justify-center">
                 <Share2 size={12} className={`${isSyncing ? 'animate-pulse text-blue-400' : 'text-emerald-800'}`} />
                 {isSyncing && (
                   <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-40"></span>
                 )}
               </div>
            </div>
          </div>
        </div>

        {/* AI Model Status */}
        <div className="flex items-center gap-3">
          <div className="flex flex-col items-end">
            <span className="text-[9px] text-gray-600 uppercase font-black tracking-widest">Model Engine</span>
            <div className="flex items-center gap-2">
               <span className="text-[10px] text-emerald-500 font-mono font-black">YOLO_v10.8_STABLE</span>
               <div className="relative flex h-2 w-2">
                 <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                 <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
               </div>
            </div>
          </div>
        </div>
        
        {/* Latency Status */}
        <div className="flex flex-col items-end min-w-[60px]">
          <span className="text-[9px] text-gray-600 uppercase font-black tracking-widest">Latency</span>
          <div className={`flex items-center gap-1 font-mono text-xs font-bold ${latency > 25 ? 'text-amber-500' : 'text-emerald-400'}`}>
            <Zap size={10} />
            <span>{latency}ms</span>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
