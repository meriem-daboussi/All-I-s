
import React from 'react';
import { ModuleType, Severity, Alert } from '../../types';
import { ShieldAlert, AlertCircle, ChevronRight, CheckCircle2, TriangleAlert } from 'lucide-react';

const mockWarehouseAlerts: Alert[] = [
  { id: 'ERR-W-104', location: 'Aisle 4, Rack B', confidence: 94, action: 'Verify manual pick', severity: Severity.WARNING, timestamp: '12:04:11' },
  { id: 'PUT-W-022', location: 'Dock 4, Lane 1', confidence: 99, action: 'Proceed to Rack C-12', severity: Severity.NORMAL, timestamp: '11:58:32' },
  { id: 'ERR-W-209', location: 'Section South-9', confidence: 82, action: 'Reroute AGV 4', severity: Severity.CRITICAL, timestamp: '11:52:10' },
];

const mockPipeAlerts: Alert[] = [
  { id: 'LEAK-P-02', location: 'North Sector, Line 12', confidence: 96, action: 'Engage bypass valve', severity: Severity.CRITICAL, timestamp: '12:05:01' },
  { id: 'VIB-P-401', location: 'Pump House B', confidence: 88, action: 'Check bearing seal', severity: Severity.WARNING, timestamp: '12:01:44' },
  { id: 'FLO-P-112', location: 'Main Conduit C', confidence: 98, action: 'Normal operation', severity: Severity.NORMAL, timestamp: '11:45:12' },
];

const AlertFeed: React.FC<{ activeModule: ModuleType }> = ({ activeModule }) => {
  const alerts = activeModule === 'warehouse' ? mockWarehouseAlerts : mockPipeAlerts;

  const getSeverityStyles = (severity: Severity) => {
    switch (severity) {
      case Severity.CRITICAL: 
        return { 
          border: 'border-red-600 border-2', 
          text: 'text-white', 
          accent: 'text-red-400',
          bg: 'bg-red-950/40', 
          icon: TriangleAlert,
          shadow: 'shadow-[0_0_25px_rgba(220,38,38,0.4)]',
          pulse: 'animate-pulse'
        };
      case Severity.WARNING: 
        return { 
          border: 'border-amber-500/50', 
          text: 'text-amber-500', 
          accent: 'text-amber-300',
          bg: 'bg-amber-950/20', 
          icon: ShieldAlert,
          shadow: 'shadow-[0_0_15px_rgba(245,158,11,0.1)]',
          pulse: ''
        };
      default: 
        return { 
          border: 'border-emerald-500/20', 
          text: 'text-emerald-500', 
          accent: 'text-emerald-400',
          bg: 'bg-emerald-950/10', 
          icon: CheckCircle2,
          shadow: '',
          pulse: ''
        };
    }
  };

  return (
    <div className="space-y-4 pb-12">
      {alerts.map((alert) => {
        const styles = getSeverityStyles(alert.severity);
        const Icon = styles.icon;
        const isCritical = alert.severity === Severity.CRITICAL;

        return (
          <div 
            key={alert.id} 
            className={`relative p-5 rounded-2xl transition-all duration-300 group cursor-pointer border ${styles.border} ${styles.shadow} ${styles.bg} hover:brightness-125`}
          >
            {isCritical && (
              <div className="absolute top-0 right-0 p-2">
                <div className="h-2 w-2 rounded-full bg-red-600 animate-ping" />
              </div>
            )}
            
            <div className="flex justify-between items-start mb-4">
              <div className="flex items-center gap-3">
                <div className={`${isCritical ? 'bg-red-600 p-1.5' : 'bg-gray-800 p-1'} rounded-lg`}>
                  <Icon size={isCritical ? 18 : 16} className={isCritical ? 'text-white' : styles.text} />
                </div>
                <div>
                  <span className={`font-mono text-xs font-black tracking-widest block ${isCritical ? 'text-white underline decoration-red-500' : 'text-gray-300'}`}>
                    {alert.id}
                  </span>
                  <span className="text-[9px] text-gray-500 font-mono">{alert.timestamp}</span>
                </div>
              </div>
              <div className={`px-2 py-0.5 rounded text-[8px] font-black tracking-widest border ${isCritical ? 'bg-red-600 text-white border-red-400' : 'bg-gray-800 text-gray-500 border-gray-700'}`}>
                {alert.severity}
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4 mb-5">
              <div className="space-y-0.5">
                <span className="text-[9px] text-gray-500 uppercase font-black tracking-widest block">Location</span>
                <span className={`${isCritical ? 'text-white' : 'text-gray-200'} text-xs font-bold`}>{alert.location}</span>
              </div>
              <div className="space-y-0.5 text-right">
                <span className="text-[9px] text-gray-500 uppercase font-black tracking-widest block">AI Confidence</span>
                <span className={`${isCritical ? 'text-red-400' : 'text-emerald-400'} text-xs font-mono font-black`}>{alert.confidence}%</span>
              </div>
            </div>

            <div className={`p-3 rounded-xl flex items-center justify-between transition-all border ${isCritical ? 'bg-red-600/50 border-red-400 shadow-inner' : 'bg-black/40 border-gray-700 group-hover:border-gray-500'}`}>
               <div className="flex flex-col">
                 <span className={`text-[8px] font-black uppercase tracking-[0.2em] ${isCritical ? 'text-red-200' : 'text-gray-500'} mb-1`}>Protocol Recommendation</span>
                 <span className={`text-[11px] font-black uppercase tracking-tight ${isCritical ? 'text-white' : styles.text}`}>
                   {alert.action}
                 </span>
               </div>
               <ChevronRight size={18} className={isCritical ? 'text-white animate-bounce-x' : 'text-gray-600'} />
            </div>
          </div>
        );
      })}
      
      <style>{`
        @keyframes bounce-x {
          0%, 100% { transform: translateX(0); }
          50% { transform: translateX(4px); }
        }
        .animate-bounce-x {
          animation: bounce-x 1s infinite;
        }
      `}</style>
    </div>
  );
};

export default AlertFeed;
