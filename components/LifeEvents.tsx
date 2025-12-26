import React, { useState } from 'react';
import { LIFE_ITEMS } from '../services/mockData';
import { MapPin, Sparkles, Zap, Users, Send, Navigation, Plus } from 'lucide-react';

const FILTERS = [
  { id: 'all', label: '全部', icon: Sparkles },
  { id: 'good', label: '好物', icon: Sparkles },
  { id: 'space', label: '能量场', icon: Zap },
  { id: 'event', label: '活动', icon: Users },
];

export const LifeEvents: React.FC = () => {
  const [activeFilter, setActiveFilter] = useState('all');

  const filteredItems = activeFilter === 'all' 
    ? LIFE_ITEMS 
    : LIFE_ITEMS.filter(item => {
        if (activeFilter === 'good') return item.type === 'Good';
        if (activeFilter === 'space') return item.type === 'Space';
        if (activeFilter === 'event') return item.type === 'Event';
        return true;
      });

  return (
    <div className="min-h-full bg-bgLight pb-24">
      {/* Header */}
      <div className="bg-white/90 px-6 pt-14 pb-4 sticky top-0 z-20 shadow-sm backdrop-blur-md">
        <div className="flex justify-between items-start mb-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
               <Zap className="text-primary" size={20} fill="currentColor" />
               <h1 className="text-xl font-bold text-gray-900 tracking-tight">全景生活</h1>
            </div>
            <p className="text-xs text-slate-500 font-medium">寻找同频的搭子，无关金钱，只关乎热爱。</p>
          </div>
          <div className="flex items-center gap-1 bg-white border border-gray-200 px-3 py-1.5 rounded-full text-xs font-bold text-gray-800 shadow-sm">
             <MapPin size={12} className="text-primary" />
             深圳
          </div>
        </div>

        {/* Filter Tabs */}
        <div className="flex gap-2 overflow-x-auto scrollbar-hide pb-1">
          {FILTERS.map(filter => (
            <button
              key={filter.id}
              onClick={() => setActiveFilter(filter.id)}
              className={`flex-shrink-0 flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-bold border transition-all ${
                activeFilter === filter.id
                  ? 'bg-gray-900 text-white border-gray-900 shadow-md'
                  : 'bg-white text-gray-500 border-gray-200 hover:bg-gray-50'
              }`}
            >
              <filter.icon size={12} />
              {filter.label}
            </button>
          ))}
        </div>
      </div>

      {/* Grid Layout - Masonry feel */}
      <div className="px-4 py-4 grid grid-cols-2 gap-3">
        {filteredItems.map((item) => (
          <div key={item.id} className="bg-white rounded-[20px] overflow-hidden border border-gray-100 shadow-soft hover:shadow-lg transition-all group flex flex-col">
            {/* Image Container */}
            <div className="relative aspect-[4/3] overflow-hidden bg-gray-100">
              <img 
                src={item.image} 
                alt={item.title} 
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" 
              />
              <div className="absolute top-2 right-2 bg-white/90 backdrop-blur-sm px-2 py-1 rounded-lg text-[10px] font-bold text-gray-800 shadow-sm border border-gray-100">
                {item.tag}
              </div>
            </div>

            {/* Content */}
            <div className="p-3 flex-1 flex flex-col">
              <h3 className="font-bold text-gray-900 text-sm leading-snug mb-1 line-clamp-2">{item.title}</h3>
              <p className="text-[10px] text-slate-400 mb-3 line-clamp-1">{item.subTitle}</p>

              {/* Footer: Social Connection (No Money) */}
              <div className="mt-auto pt-2 border-t border-gray-50">
                 <div className="flex items-center justify-between mb-2">
                    <span className="text-[10px] font-bold text-primary bg-orange-50 px-2 py-0.5 rounded">
                      {item.price}
                    </span>
                    
                    {item.time && (
                      <span className="text-[10px] text-gray-400">{item.time}</span>
                    )}
                 </div>
                 
                 {/* Location / Host Row */}
                 <div className="flex items-center justify-between text-[10px] text-slate-400">
                   <div className="flex items-center gap-1">
                     <img 
                      src={item.hostAvatar} 
                      referrerPolicy="no-referrer"
                      className="w-4 h-4 rounded-full border border-gray-100" 
                    />
                     <span className="scale-90 origin-left">由 {item.hostName} 发起</span>
                   </div>
                 </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Floating Action Button - Initiate */}
      <div className="fixed bottom-24 right-5 z-30">
        <button className="bg-gray-900 text-white w-14 h-14 rounded-full shadow-2xl shadow-gray-900/40 flex items-center justify-center active:scale-95 transition-transform hover:bg-black group">
          <Plus size={24} className="group-hover:rotate-90 transition-transform duration-300" />
        </button>
      </div>
    </div>
  );
};