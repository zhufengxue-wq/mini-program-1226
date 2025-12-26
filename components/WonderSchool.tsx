import React, { useState } from 'react';
import { CategoryType } from '../types';
import { SERVICE_LIST } from '../services/mockData';
import { Sparkles, ArrowUpRight, Zap } from 'lucide-react';

const CATEGORIES: CategoryType[] = ['Mind', 'Body', 'Energy', 'Aesthetic'];
const CAT_LABELS: Record<CategoryType, string> = {
  'Mind': '心智', 'Body': '身体', 'Energy': '能量', 'Aesthetic': '美学'
};

export const WonderSchool: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<CategoryType | 'All'>('All');

  const filteredServices = selectedCategory === 'All'
    ? SERVICE_LIST
    : SERVICE_LIST.filter(s => s.category === selectedCategory);

  return (
    <div className="min-h-full bg-bgLight pb-24">
      
      {/* Clean Header */}
      <div className="px-6 pt-14 pb-2 bg-bgLight sticky top-0 z-10 backdrop-blur-xl">
        <h1 className="text-2xl font-bold text-gray-900 mb-2 tracking-tight">神奇学校</h1>
        <p className="text-xs text-slate-500 max-w-[90%] leading-relaxed">
          爱自己，是终身浪漫的开始。这里是你重塑身心、显化丰盛的能量补给站。
        </p>
      </div>

      {/* Content Container */}
      <div className="px-5 mt-4">
        
        {/* Filter Tabs */}
        <div className="flex gap-2 mb-6 overflow-x-auto scrollbar-hide">
          <button
             onClick={() => setSelectedCategory('All')}
             className={`flex-shrink-0 px-4 py-2 rounded-full text-xs font-bold transition-all border ${
               selectedCategory === 'All' 
               ? 'bg-gray-900 text-white border-gray-900' 
               : 'bg-white text-gray-400 border-gray-200 hover:border-gray-300'
             }`}
          >
            全部
          </button>
          {CATEGORIES.map(cat => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`flex-shrink-0 px-4 py-2 rounded-full text-xs font-bold transition-all border ${
                selectedCategory === cat 
                ? 'bg-gray-900 text-white border-gray-900' 
                : 'bg-white text-gray-400 border-gray-200 hover:border-gray-300'
              }`}
            >
              {CAT_LABELS[cat]}
            </button>
          ))}
        </div>

        {/* Course Grid */}
        <div className="grid grid-cols-1 gap-6">
          {filteredServices.map(service => (
            <div key={service.id} className="bg-white rounded-[24px] overflow-hidden shadow-soft hover:shadow-lg transition-all group relative">
              
              {/* New 50/50 Split Image Header */}
              <div className="h-56 flex relative">
                 {/* Left Half: Provider Avatar (The Talent) */}
                 <div className="w-1/2 relative overflow-hidden bg-gray-100 border-r border-white/20">
                    <img 
                      src={service.providerAvatar} 
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" 
                    />
                    {/* Gradient Overlay for Name */}
                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-3 pt-8">
                       <p className="text-white text-xs font-bold tracking-wide">{service.providerName}</p>
                       <p className="text-[10px] text-white/80">Pro Mentor</p>
                    </div>
                 </div>

                 {/* Right Half: Service Image (The Context) */}
                 <div className="w-1/2 relative overflow-hidden bg-gray-100">
                    <img 
                      src={service.image} 
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" 
                    />
                    <div className="absolute inset-0 bg-black/10"></div>
                    
                    {/* Floating Category Tag */}
                    <div className="absolute top-3 right-3 bg-white/90 backdrop-blur px-2 py-0.5 rounded text-[10px] font-bold text-gray-900 tracking-wide uppercase shadow-sm">
                      {service.category}
                    </div>
                 </div>

                 {/* Center Icon/Badge - Optional connector */}
                 <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white p-1.5 rounded-full shadow-lg z-10 text-primary">
                    <Zap size={14} fill="currentColor" />
                 </div>
              </div>

              <div className="p-5">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="font-bold text-gray-900 text-lg leading-tight">
                    {service.serviceTitle}
                  </h3>
                  <div className="flex items-center gap-1 bg-orange-50 text-primary px-2 py-0.5 rounded text-[10px] font-bold">
                    <Sparkles size={10} /> +{service.pointsGift} WP
                  </div>
                </div>
                
                <p className="text-sm text-slate-500 leading-relaxed mb-5 line-clamp-2">
                  {service.description}
                </p>

                {/* Footer now focuses on Tags and Action */}
                <div className="flex items-end justify-between border-t border-gray-50 pt-4">
                  <div className="flex gap-1 flex-wrap max-w-[60%]">
                    {service.tags.map((tag, i) => (
                      <span key={i} className="text-[10px] text-slate-500 bg-slate-50 px-2 py-0.5 rounded font-medium">
                        #{tag}
                      </span>
                    ))}
                  </div>
                  
                  <div className="flex items-center gap-3">
                     <span className="text-base font-bold text-gray-900">¥{service.price}</span>
                     <button className="bg-gray-900 text-white p-2.5 rounded-full hover:bg-black transition-colors shadow-lg shadow-gray-200">
                        <ArrowUpRight size={16} />
                     </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};