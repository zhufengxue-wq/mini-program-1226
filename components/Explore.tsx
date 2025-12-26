import React, { useState } from 'react';
import { CategoryType } from '../types';
import { SERVICE_LIST, LIFE_ITEMS, INSPIRATION_PROJECTS } from '../services/mockData';
import { Sparkles, ArrowUpRight, Zap, Users, Search, LayoutGrid, Crown, ArrowRight, MapPin, Cpu, TrendingUp, Clock } from 'lucide-react';

// --- Types & Constants for School View ---
const SCHOOL_CATEGORIES: CategoryType[] = ['Mind', 'Body', 'Energy', 'Aesthetic'];
const SCHOOL_CAT_LABELS: Record<CategoryType, string> = {
  'Mind': '心智', 'Body': '身体', 'Energy': '能量', 'Aesthetic': '美学'
};

// --- Types & Constants for Inspiration View ---
const INSPIRATION_FILTERS = [
  { id: 'all', label: '全部', icon: LayoutGrid },
  { id: 'art', label: '科技艺术', icon: Cpu },
  { id: 'community', label: '商业社群', icon: Users },
  { id: 'business', label: '商业落地', icon: TrendingUp },
];

// --- Types & Constants for Life View ---
const LIFE_FILTERS = [
  { id: 'all', label: '全部', icon: Sparkles },
  { id: 'good', label: '好物', icon: Sparkles },
  { id: 'space', label: '能量场', icon: Zap },
  { id: 'event', label: '活动', icon: Users },
];

type ViewMode = 'school' | 'inspiration' | 'life';

interface ExploreProps {
  onOpenDetail: (item: any, type: 'service' | 'project' | 'life' | 'event') => void;
}

export const Explore: React.FC<ExploreProps> = ({ onOpenDetail }) => {
  const [viewMode, setViewMode] = useState<ViewMode>('school');
  
  // State for School View
  const [schoolCategory, setSchoolCategory] = useState<CategoryType | 'All'>('All');
  
  // State for Inspiration View
  const [inspirationFilter, setInspirationFilter] = useState('all');
  
  // State for Life View
  const [lifeFilter, setLifeFilter] = useState('all');

  // --- Derived State ---
  const filteredServices = schoolCategory === 'All'
    ? SERVICE_LIST
    : SERVICE_LIST.filter(s => s.category === schoolCategory);

  const filteredInspirationProjects = inspirationFilter === 'all'
    ? INSPIRATION_PROJECTS
    : INSPIRATION_PROJECTS.filter(p => {
        const tags = p.tags?.join(' ') || '';
        if (inspirationFilter === 'art') return tags.includes('艺术') || tags.includes('AIGC') || tags.includes('设计');
        if (inspirationFilter === 'community') return tags.includes('社区') || tags.includes('DAO') || tags.includes('Web3');
        if (inspirationFilter === 'business') return tags.includes('商业') || tags.includes('分红');
        return true;
      });

  const filteredLifeItems = lifeFilter === 'all' 
    ? LIFE_ITEMS 
    : LIFE_ITEMS.filter(item => {
        if (lifeFilter === 'good') return item.type === 'Good';
        if (lifeFilter === 'space') return item.type === 'Space';
        if (lifeFilter === 'event') return item.type === 'Event';
        return true;
      });

  return (
    <div className="min-h-full bg-bgLight pb-24">
      
      {/* --- Unified Header with Toggle --- */}
      <div className="bg-white/95 px-4 pt-14 pb-4 sticky top-0 z-20 shadow-sm backdrop-blur-md transition-all">
        <div className="flex justify-between items-center mb-4 px-2">
          {/* Main Title Updated */}
          <h1 className="text-2xl font-bold text-gray-900 tracking-tight">灵感经济</h1>
          <div className="w-10 h-10 bg-gray-50 rounded-full flex items-center justify-center text-gray-600">
            <Search size={20} />
          </div>
        </div>

        {/* Main View Toggle Pill (Level 1 Directory) */}
        <div className="bg-gray-100 p-1 rounded-full flex relative mb-2">
          <button 
            onClick={() => setViewMode('school')}
            className={`flex-1 py-2.5 text-[10px] sm:text-xs font-bold rounded-full transition-all duration-300 flex items-center justify-center gap-1 ${
              viewMode === 'school' 
              ? 'bg-white text-gray-900 shadow-sm' 
              : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            <Sparkles size={12} className={viewMode === 'school' ? 'text-primary' : 'text-gray-400'} />
            爱自己
          </button>
          
          <button 
            onClick={() => setViewMode('inspiration')}
            className={`flex-1 py-2.5 text-[10px] sm:text-xs font-bold rounded-full transition-all duration-300 flex items-center justify-center gap-1 ${
              viewMode === 'inspiration' 
              ? 'bg-white text-gray-900 shadow-sm' 
              : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            <LayoutGrid size={12} className={viewMode === 'inspiration' ? 'text-primary' : 'text-gray-400'} />
            做自己
          </button>

          <button 
            onClick={() => setViewMode('life')}
            className={`flex-1 py-2.5 text-[10px] sm:text-xs font-bold rounded-full transition-all duration-300 flex items-center justify-center gap-1 ${
              viewMode === 'life' 
              ? 'bg-white text-gray-900 shadow-sm' 
              : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            <Zap size={12} className={viewMode === 'life' ? 'text-primary' : 'text-gray-400'} />
            全景生活
          </button>
        </div>

        {/* --- Sub-Filters (Level 2 Directory) --- */}
        <div className="pt-2 overflow-hidden px-1">
          {viewMode === 'school' && (
             <div className="flex gap-2 overflow-x-auto scrollbar-hide animate-in slide-in-from-left-2 duration-300">
              <button onClick={() => setSchoolCategory('All')} className={`flex-shrink-0 px-4 py-1.5 rounded-full text-[10px] font-bold transition-all border ${schoolCategory === 'All' ? 'bg-gray-900 text-white border-gray-900' : 'bg-white text-gray-400 border-gray-200'}`}>全部</button>
              {SCHOOL_CATEGORIES.map(cat => (
                <button key={cat} onClick={() => setSchoolCategory(cat)} className={`flex-shrink-0 px-4 py-1.5 rounded-full text-[10px] font-bold transition-all border ${schoolCategory === cat ? 'bg-gray-900 text-white border-gray-900' : 'bg-white text-gray-400 border-gray-200'}`}>
                  {SCHOOL_CAT_LABELS[cat]}
                </button>
              ))}
            </div>
          )}
          
          {viewMode === 'inspiration' && (
            <div className="flex gap-2 overflow-x-auto scrollbar-hide animate-in slide-in-from-right-2 duration-300">
               {INSPIRATION_FILTERS.map(filter => (
                <button key={filter.id} onClick={() => setInspirationFilter(filter.id)} className={`flex-shrink-0 flex items-center gap-1.5 px-4 py-1.5 rounded-full text-[10px] font-bold border transition-all ${inspirationFilter === filter.id ? 'bg-gray-900 text-white border-gray-900' : 'bg-white text-gray-500 border-gray-200'}`}>
                  <filter.icon size={10} />
                  {filter.label}
                </button>
              ))}
             </div>
          )}
          
          {viewMode === 'life' && (
             <div className="flex gap-2 overflow-x-auto scrollbar-hide animate-in slide-in-from-right-2 duration-300">
               {LIFE_FILTERS.map(filter => (
                <button key={filter.id} onClick={() => setLifeFilter(filter.id)} className={`flex-shrink-0 flex items-center gap-1.5 px-4 py-1.5 rounded-full text-[10px] font-bold border transition-all ${lifeFilter === filter.id ? 'bg-gray-900 text-white border-gray-900' : 'bg-white text-gray-500 border-gray-200'}`}>
                  <filter.icon size={10} />
                  {filter.label}
                </button>
              ))}
             </div>
          )}
        </div>
      </div>

      {/* --- Main Content Area --- */}
      <div className="px-5 mt-4 min-h-[50vh]">
        
        {/* === SCHOOL CONTENT === */}
        {viewMode === 'school' && (
          <div className="grid grid-cols-1 gap-6 animate-in fade-in zoom-in-95 duration-300">
            {filteredServices.map(service => (
              <div 
                key={service.id} 
                className="bg-white rounded-[24px] overflow-hidden shadow-soft hover:shadow-lg transition-all group relative cursor-pointer"
                onClick={() => onOpenDetail(service, 'service')}
              >
                {/* 50/50 Split Image Header */}
                <div className="h-56 flex relative">
                   {/* Left: Provider */}
                   <div className="w-1/2 relative overflow-hidden bg-gray-100 border-r border-white/20">
                      <img src={service.providerAvatar} referrerPolicy="no-referrer" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-3 pt-8">
                         <p className="text-white text-xs font-bold tracking-wide">{service.providerName}</p>
                         <p className="text-[10px] text-white/80">Pro Mentor</p>
                      </div>
                   </div>
                   {/* Right: Service Context */}
                   <div className="w-1/2 relative overflow-hidden bg-gray-100">
                      <img src={service.image} referrerPolicy="no-referrer" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                      <div className="absolute inset-0 bg-black/10"></div>
                      <div className="absolute top-3 right-3 bg-white/90 backdrop-blur px-2 py-0.5 rounded text-[10px] font-bold text-gray-900 tracking-wide uppercase shadow-sm">
                        {service.category}
                      </div>
                   </div>
                   {/* Center Connector */}
                   <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white p-1.5 rounded-full shadow-lg z-10 text-primary">
                      <Zap size={14} fill="currentColor" />
                   </div>
                </div>

                <div className="p-5">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-bold text-gray-900 text-lg leading-tight">{service.serviceTitle}</h3>
                    <div className="flex items-center gap-1 bg-orange-50 text-primary px-2 py-0.5 rounded text-[10px] font-bold">
                      <Sparkles size={10} /> +{service.pointsGift} WP
                    </div>
                  </div>
                  <p className="text-sm text-slate-500 leading-relaxed mb-5 line-clamp-2">{service.description}</p>
                  <div className="flex items-end justify-between border-t border-gray-50 pt-4">
                    <div className="flex gap-1 flex-wrap max-w-[60%]">
                      {service.tags.map((tag, i) => (
                        <span key={i} className="text-[10px] text-slate-500 bg-slate-50 px-2 py-0.5 rounded font-medium">#{tag}</span>
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
        )}

        {/* === INSPIRATION ECONOMY CONTENT (Unified Card Style) === */}
        {viewMode === 'inspiration' && (
           <div className="grid grid-cols-1 gap-6 animate-in fade-in zoom-in-95 duration-300">
             {filteredInspirationProjects.map((project) => (
                <div 
                  key={project.id} 
                  className="bg-white rounded-[24px] overflow-hidden shadow-soft hover:shadow-lg transition-all group relative cursor-pointer"
                  onClick={() => onOpenDetail(project, 'project')}
                >
                  
                  {/* 50/50 Split Image Header - LEADER vs PROJECT SCENE */}
                  <div className="h-56 flex relative">
                     {/* Left: Leader */}
                     <div className="w-1/2 relative overflow-hidden bg-gray-100 border-r border-white/20">
                        <img src={project.leader.avatar} referrerPolicy="no-referrer" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-3 pt-8">
                           <p className="text-white text-xs font-bold tracking-wide">{project.leader.name}</p>
                           <p className="text-[10px] text-white/80">发起人</p>
                        </div>
                     </div>

                     {/* Right: Project Image */}
                     <div className="w-1/2 relative overflow-hidden bg-gray-100">
                        <img src={project.image} referrerPolicy="no-referrer" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                        <div className="absolute inset-0 bg-black/10"></div>
                        <div className="absolute top-3 right-3 bg-white/90 backdrop-blur px-2 py-0.5 rounded text-[10px] font-bold text-gray-900 tracking-wide uppercase shadow-sm flex items-center gap-1">
                          <MapPin size={10} /> {project.location.split(',')[0]}
                        </div>
                     </div>

                     {/* Center Connector */}
                     <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white p-1.5 rounded-full shadow-lg z-10 text-primary">
                        <Crown size={14} fill="currentColor" />
                     </div>
                  </div>

                  <div className="p-5">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="font-bold text-gray-900 text-lg leading-tight line-clamp-1">{project.title.split('·')[0]}</h3>
                      <div className="flex items-center gap-1 bg-orange-50 text-primary px-2 py-0.5 rounded text-[10px] font-bold">
                         <Zap size={10} /> 进度 {project.progress}%
                      </div>
                    </div>
                    
                    <p className="text-sm text-slate-500 leading-relaxed mb-5 line-clamp-2">
                      {project.description}
                    </p>

                    <div className="flex items-end justify-between border-t border-gray-50 pt-4">
                      <div className="flex gap-1 flex-wrap max-w-[60%]">
                         {project.tags?.slice(0, 2).map((tag, i) => (
                           <span key={i} className="text-[10px] text-slate-500 bg-slate-50 px-2 py-0.5 rounded font-medium">#{tag}</span>
                         ))}
                      </div>
                      
                      <div className="flex items-center gap-3">
                         <span className="text-[10px] font-bold text-gray-400">{project.estReturn}</span>
                         <button className="bg-gray-900 text-white p-2.5 rounded-full hover:bg-black transition-colors shadow-lg shadow-gray-200">
                            <ArrowUpRight size={16} />
                         </button>
                      </div>
                    </div>
                  </div>
                </div>
             ))}
           </div>
        )}

        {/* === LIFE CONTENT (Reverted to 50/50 Split) === */}
        {viewMode === 'life' && (
          <div className="grid grid-cols-1 gap-6 animate-in fade-in zoom-in-95 duration-300">
            {filteredLifeItems.map((item) => (
              <div 
                key={item.id} 
                className="bg-white rounded-[24px] overflow-hidden shadow-soft hover:shadow-lg transition-all group relative cursor-pointer"
                onClick={() => onOpenDetail(item, 'life')}
              >
                
                 {/* 50/50 Split Image Header */}
                <div className="h-56 flex relative">
                   {/* Left: Host */}
                   <div className="w-1/2 relative overflow-hidden bg-gray-100 border-r border-white/20">
                      <img src={item.hostAvatar} referrerPolicy="no-referrer" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-3 pt-8">
                         <p className="text-white text-xs font-bold tracking-wide">{item.hostName}</p>
                         <p className="text-[10px] text-white/80">发起人</p>
                      </div>
                   </div>

                   {/* Right: Item Image */}
                   <div className="w-1/2 relative overflow-hidden bg-gray-100">
                      <img src={item.image} referrerPolicy="no-referrer" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                      <div className="absolute inset-0 bg-black/10"></div>
                      <div className="absolute top-3 right-3 bg-white/90 backdrop-blur px-2 py-0.5 rounded text-[10px] font-bold text-gray-900 tracking-wide uppercase shadow-sm">
                        {item.tag}
                      </div>
                   </div>

                   {/* Center Connector */}
                   <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white p-1.5 rounded-full shadow-lg z-10 text-primary">
                      <Sparkles size={14} fill="currentColor" />
                   </div>
                </div>

                <div className="p-5">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-bold text-gray-900 text-lg leading-tight line-clamp-1">{item.title}</h3>
                  </div>
                  
                  <p className="text-sm text-slate-500 leading-relaxed mb-5 line-clamp-2">
                    {item.subTitle || item.title}
                  </p>

                  <div className="flex items-end justify-between border-t border-gray-50 pt-4">
                    <div className="flex flex-col gap-1.5">
                       <div className="flex items-center gap-2 text-[10px] text-slate-500">
                          <MapPin size={12} className="text-gray-400" />
                          <span>{item.location || '线上'}</span>
                       </div>
                       {item.time && (
                          <div className="flex items-center gap-2 text-[10px] text-orange-600 bg-orange-50 px-2 py-0.5 rounded-md w-fit">
                             <Clock size={12} />
                             <span>{item.time}</span>
                          </div>
                       )}
                    </div>
                    
                    <div className="flex items-center gap-3">
                       <span className="text-base font-bold text-gray-900">{typeof item.price === 'number' ? `¥${item.price}` : item.price}</span>
                       <button className="bg-gray-900 text-white p-2.5 rounded-full hover:bg-black transition-colors shadow-lg shadow-gray-200">
                          <ArrowUpRight size={16} />
                       </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};