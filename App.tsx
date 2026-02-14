
import React, { useState, useEffect } from 'react';
import { Activity } from 'lucide-react';
import { ModuleType } from './types';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import Warehouse3D from './components/DigitalTwin/Warehouse3D';
import Pipe3D from './components/DigitalTwin/Pipe3D';
import StatsHub from './components/InsightHub/StatsHub';
import AlertFeed from './components/InsightHub/AlertFeed';
import Spectrogram from './components/InsightHub/Spectrogram';
import CoordinateSearch from './components/InsightHub/CoordinateSearch';
import DynamicSlotting from './components/InsightHub/DynamicSlotting';

const App: React.FC = () => {
  const [activeModule, setActiveModule] = useState<ModuleType>('warehouse');
  const [latency, setLatency] = useState<number>(24);

  useEffect(() => {
    const interval = setInterval(() => {
      setLatency(Math.floor(Math.random() * 10) + 18);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex h-screen w-screen bg-[#1A1A1A] text-[#E5E5E5] overflow-hidden">
      {/* Sidebar - Navigation */}
      <Sidebar activeModule={activeModule} onModuleChange={setActiveModule} />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0">
        <Header activeModule={activeModule} latency={latency} />

        <main className="flex-1 flex overflow-hidden">
          {/* Left Panel: Insight & Alert Hub (35%) */}
          <div className="w-[35%] border-r border-gray-800 bg-[#141414] overflow-y-auto custom-scrollbar flex flex-col">
            <StatsHub activeModule={activeModule} />
            
            {activeModule === 'warehouse' && (
              <>
                <DynamicSlotting />
                <CoordinateSearch />
              </>
            )}

            {activeModule === 'pipes' && (
              <div className="px-6 py-4 mb-4">
                <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-widest mb-4">Acoustic Spectrogram</h3>
                <Spectrogram />
              </div>
            )}

            <div className="px-6 pb-6 flex-1">
              <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-widest mb-4 sticky top-0 bg-[#141414] py-2 z-10 border-b border-gray-800/50">
                Real-Time Alert Feed
              </h3>
              <AlertFeed activeModule={activeModule} />
            </div>
          </div>

          {/* Right Panel: 3D Digital Twin (65%) */}
          <div className="w-[65%] bg-[#0F0F0F] relative">
             <div className="absolute inset-0 pointer-events-none z-10 p-6 flex flex-col justify-between">
                <div className="flex justify-between items-start">
                    <div className="bg-black/70 border border-emerald-900/50 p-2 rounded backdrop-blur-md">
                        <span className="text-[10px] text-emerald-500 font-mono flex items-center gap-2">
                            <Activity size={10} className="animate-pulse" />
                            DIGITAL_TWIN_LIVE_STREAM
                        </span>
                    </div>
                </div>
                
                {activeModule === 'warehouse' && (
                  <div className="bg-black/80 border border-gray-700 p-3 rounded-lg w-52 shadow-2xl backdrop-blur-md">
                    <div className="flex justify-between items-center mb-2">
                      <h4 className="text-[10px] uppercase text-gray-400 font-bold tracking-tighter">AI Optical Recognition</h4>
                      <div className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
                    </div>
                    <div className="w-full h-24 bg-gray-900 rounded border border-gray-800 flex items-center justify-center mb-2 overflow-hidden relative">
                        <img src="https://picsum.photos/seed/scan-barcode/300/150" className="opacity-40 grayscale object-cover" alt="Barcode" />
                        <div className="absolute inset-0 border border-emerald-500/40 animate-scan"></div>
                        <div className="absolute top-0 left-0 w-full h-full bg-emerald-500/5 pointer-events-none" />
                    </div>
                    <div className="font-mono text-[9px] space-y-1">
                        <div className="flex justify-between"><span className="text-gray-500 uppercase">Batch:</span> <span className="text-emerald-400">LOT-0881-A</span></div>
                        <div className="flex justify-between"><span className="text-gray-500 uppercase">Weight:</span> <span>12.4 kg</span></div>
                        <div className="flex justify-between"><span className="text-gray-500 uppercase">Confidence:</span> <span className="text-emerald-500">99.2%</span></div>
                    </div>
                  </div>
                )}
             </div>

             {/* 3D Canvas rendering */}
             <div className="w-full h-full">
                {activeModule === 'warehouse' ? <Warehouse3D /> : <Pipe3D />}
             </div>
          </div>
        </main>
      </div>

      <style>{`
        .custom-scrollbar::-webkit-scrollbar { width: 6px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: #0F0F0F; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: #222; border-radius: 10px; border: 1px solid #333; }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover { background: #2E7D32; }
        
        @keyframes scan {
          0% { transform: translateY(-100%); }
          100% { transform: translateY(100%); }
        }
        .animate-scan {
          animation: scan 3s ease-in-out infinite;
        }

        @keyframes pulse-ring {
          0% { transform: scale(.33); opacity: 0.8; }
          80%, 100% { transform: scale(1); opacity: 0; }
        }
      `}</style>
    </div>
  );
};

export default App;
