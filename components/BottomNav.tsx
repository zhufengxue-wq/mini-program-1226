import React from 'react';
import { TabType } from '../types';
import { Compass, UserCircle, LayoutGrid } from 'lucide-react';

interface BottomNavProps {
  activeTab: TabType;
  onTabChange: (tab: TabType) => void;
}

export const BottomNav: React.FC<BottomNavProps> = ({ activeTab, onTabChange }) => {
  const navItems: { id: TabType; label: string; icon: React.FC<{ size?: number; strokeWidth?: number; className?: string }> }[] = [
    { id: 'inspiration', label: '我最珍贵', icon: LayoutGrid },
    { id: 'explore', label: '灵感经济', icon: Compass },
    { id: 'traits', label: '独特的我', icon: UserCircle },
  ];

  return (
    <div className="absolute bottom-0 left-0 right-0 bg-white/95 backdrop-blur-md border-t border-gray-100 px-8 py-2 pb-6 flex justify-between items-center z-50 rounded-t-3xl shadow-[0_-5px_20px_rgba(0,0,0,0.03)]">
      {navItems.map((item) => {
        const isActive = activeTab === item.id;
        const Icon = item.icon;
        
        return (
          <button
            key={item.id}
            onClick={() => onTabChange(item.id)}
            className={`flex flex-1 flex-col items-center gap-1.5 p-2 transition-all duration-300 group ${
              isActive ? 'text-primary' : 'text-gray-400 hover:text-gray-600'
            }`}
          >
            <div className={`relative transition-transform duration-300 ${isActive ? 'scale-110 -translate-y-1' : 'group-hover:scale-105'}`}>
              <Icon size={26} strokeWidth={isActive ? 2.5 : 2} />
              {isActive && <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-1 h-1 bg-primary rounded-full"></div>}
            </div>
            <span className={`text-[10px] font-medium transition-colors ${isActive ? 'text-gray-900' : 'text-gray-400'}`}>
              {item.label}
            </span>
          </button>
        );
      })}
    </div>
  );
};