
import React from 'react';
import { Eye, Signal, LayoutDashboard, Database, Settings } from 'lucide-react';
import { ModuleType } from '../types';
import { Logo } from '../constants';

interface SidebarProps {
  activeModule: ModuleType;
  onModuleChange: (module: ModuleType) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ activeModule, onModuleChange }) => {
  const NavItem = ({ id, icon: Icon, label }: { id: ModuleType; icon: any; label: string }) => (
    <button
      onClick={() => onModuleChange(id)}
      className={`relative w-12 h-12 flex items-center justify-center rounded-xl transition-all duration-300 group ${
        activeModule === id 
          ? 'bg-[#2E7D32] text-white shadow-lg shadow-emerald-900/20' 
          : 'text-gray-500 hover:text-white hover:bg-gray-800'
      }`}
      title={label}
    >
      <Icon size={20} />
      {activeModule === id && (
        <div className="absolute -right-3 w-1 h-6 bg-[#2E7D32] rounded-full" />
      )}
      <div className="absolute left-16 bg-black text-white px-2 py-1 rounded text-[10px] opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap z-50 border border-gray-700">
        {label}
      </div>
    </button>
  );

  return (
    <aside className="w-20 border-r border-gray-800 bg-[#0F0F0F] flex flex-col items-center py-8 z-50">
      <div className="mb-12 cursor-pointer transform hover:scale-110 transition-transform">
        <Logo />
      </div>

      <nav className="flex flex-col gap-6">
        <NavItem id="warehouse" icon={Eye} label="Smart Warehouse Management" />
        <NavItem id="pipes" icon={Signal} label="Pipe Leakage Control" />
      </nav>

      <div className="mt-auto flex flex-col gap-6 pb-4">
        <button className="text-gray-600 hover:text-gray-300 transition-colors">
          <Database size={20} />
        </button>
        <button className="text-gray-600 hover:text-gray-300 transition-colors">
          <Settings size={20} />
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
