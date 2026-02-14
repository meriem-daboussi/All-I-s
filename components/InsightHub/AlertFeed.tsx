
import React from 'react';
import { ModuleType, Severity, Alert } from '../../types';
import { ShieldAlert, AlertCircle, ChevronRight, CheckCircle2 } from 'lucide-react';

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
          border: 'border-l-red-600 border-2', 
          text: 'text-white', 
          bg: 'bg-red-600/20', 
          icon: AlertCircle,
          shadow: 'shadow-[0_0_15px_rgba(220,38,38,0.3)]',
          pulse: 'animate-pulse'
        };
      case Severity.WARNING: 
        return { 
          border: 'border-l-amber-500', 
          text: 'text-amber-500', 
          bg: 'bg-amber-500/10', 
          icon: ShieldAlert,
          shadow: '',
          pulse: ''
        };
      default: 
        return { 
          border: 'border-l-emerald-500', 
          text: 'text-emerald-500', 
          bg: 'bg-emerald-500/10', 
          icon: CheckCircle2,
          shadow: '',
          pulse: ''
        };
    }
  };

  return (
    <div className="space-y-4 pb-8">
      {alerts.map((alert) => {
        const styles = getSeverityStyles(alert.severity);
        const Icon = styles.icon;
        const isCritical = alert.severity === Severity.CRITICAL;

        return (
          <div 
            key={alert.id} 
            className={`p-4 rounded-xl transition-all duration-300 group cursor-pointer border ${styles.border} ${styles.shadow} ${isCritical ? 'bg-red-950/20' : 'bg-gray-900/40'} hover:bg-gray-800/80`}
          >
            <div className="flex justify-between items-start mb-3">
              <div className="flex items-center gap-2">
                <div className={`${styles.pulse} p-1 rounded-full ${isCritical ? 'bg-red-600' : ''}`}>
                  <Icon size={isCritical ? 16 : 14} className={isCritical ? 'text-white' : styles.text} />
                </div>
                <span className={`font-mono text-xs font-bold tracking-wider ${isCritical ? 'text-white underline' : 'text-gray-200'}`}>
                  {alert.id}
                </span>
              </div>
              <span className="text-[10px] text-gray-500 font-mono">{alert.timestamp}</span>
            </div>
            
            <div className="space-y-1 mb-4">
              <div className="flex justify-between items-center text-[11px]">
                <span className="text-gray-500 uppercase font-bold tracking-tighter">Location</span>
                <span className={`${isCritical ? 'text-white font-bold' : 'text-gray-300'} font-medium`}>{alert.location}</span>
              </div>
              <div className="flex justify-between items-center text-[11px]">
                <span className="text-gray-500 uppercase font-bold tracking-tighter">AI Confidence</span>
                <span className={`${isCritical ? 'text-red-400 font-bold' : 'text-emerald-400'} font-mono`}>{alert.confidence}%</span>
              </div>
            </div>

            <div className={`p-3 rounded-lg flex items-center justify-between transition-colors border ${isCritical ? 'border-red-500 bg-red-600/30' : 'border-transparent bg-black/20 group-hover:bg-black/40'}`}>
               <span className={`text-[11px] font-bold uppercase tracking-tight ${isCritical ? 'text-white' : styles.text}`}>
                 ACTION: {alert.action}
               </span>
               <ChevronRight size={14} className={isCritical ? 'text-white' : 'text-gray-600'} />
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default AlertFeed;
