import React, { useState } from 'react';
import { X, MapPin, Sparkles, Zap, Star, ShieldCheck, MessageCircle, UserPlus, ArrowRight, LayoutGrid, Award, Crown, Ticket, Heart } from 'lucide-react';
import { SERVICE_LIST, LIFE_ITEMS, INSPIRATION_PROJECTS } from '../services/mockData';

interface HostProfileProps {
  host: {
    name: string;
    avatar: string;
    role: string;
    location?: string;
  };
  onClose: () => void;
}

export const HostProfile: React.FC<HostProfileProps> = ({ host, onClose }) => {
  const [isFollowing, setIsFollowing] = useState(false);

  // --- Mock Data Generator ---
  const getHostStats = () => ({
    followers: 1208,
    rating: 4.9,
    served: 356,
    tags: ['高维智慧', '跨界艺术家', '长期主义', 'INFP'],
    energyType: 'Manifestor 显示者',
    // Mock Flow Description (Zone of Genius)
    flowDescription: "在数字游民的旅途中，寻找一种让灵魂安住的建筑语言。当我将自然光影引入室内时，我感到与宇宙同频。",
    // Mock Love & Fun Tags
    loveFunTags: ["极简主义穿搭", "深潜", "爵士乐", "黑胶收藏", "山居生活", "冥想"]
  });

  const stats = getHostStats();

  // 1. 我发起的 (Initiated) - Mock Logic
  const initiatedItems = [
    ...SERVICE_LIST.slice(0, 1),
    ...LIFE_ITEMS.slice(2, 3),
    ...INSPIRATION_PROJECTS.slice(0, 1)
  ];

  // 2. 我参与的 (Joined) - Mock Logic
  const joinedItems = [
    ...LIFE_ITEMS.slice(0, 1),
    ...HIGH_VIBE_EVENTS_MOCK.slice(0, 2)
  ];

  return (
    <div className="fixed inset-0 z-[10001] flex flex-col bg-white animate-in slide-in-from-right-10 duration-300 sm:max-w-md sm:mx-auto">
      
      {/* 1. Immersive Header (Energy Field) */}
      <div className="relative h-[35vh] w-full flex-shrink-0 bg-slate-900 overflow-hidden group">
        {/* Abstract Background Art */}
        <div className="absolute inset-0 opacity-80 group-hover:scale-105 transition-transform duration-1000">
            <img 
              src="https://images.unsplash.com/photo-1614850523459-c2f4c699c52e?w=800&q=80" 
              className="w-full h-full object-cover" 
            />
            <div className="absolute inset-0 bg-black/40 backdrop-blur-[2px]"></div>
        </div>
        
        {/* Navigation */}
        <div className="absolute top-0 left-0 right-0 p-4 pt-14 flex justify-between items-start z-20">
           <button 
             onClick={onClose}
             className="w-10 h-10 rounded-full bg-black/20 backdrop-blur-md border border-white/20 flex items-center justify-center text-white hover:bg-black/40 transition-colors"
           >
             <X size={20} />
           </button>
           <div className="bg-black/20 backdrop-blur-md border border-white/20 px-3 py-1.5 rounded-full flex items-center gap-1.5">
              <ShieldCheck size={14} className="text-green-400" />
              <span className="text-[10px] font-bold text-white tracking-wide uppercase">已实名认证</span>
           </div>
        </div>

        {/* Profile Info Overlay */}
        <div className="absolute bottom-0 left-0 right-0 px-6 pb-8 flex items-end gap-5 translate-y-8 z-10">
            <div className="relative">
                <div className="w-24 h-24 rounded-[32px] p-1 bg-white shadow-xl">
                    <img src={host.avatar} className="w-full h-full object-cover rounded-[28px]" referrerPolicy="no-referrer" />
                </div>
                <div className="absolute -bottom-2 -right-2 bg-gradient-to-r from-orange-500 to-pink-500 text-white text-[10px] font-black px-2 py-0.5 rounded-full border-2 border-white shadow-sm flex items-center gap-1">
                    <Star size={10} fill="currentColor" /> 4.9
                </div>
            </div>
            <div className="flex-1 pb-9 text-white">
                <h1 className="text-2xl font-bold leading-tight mb-1 text-shadow-sm">{host.name}</h1>
                <div className="flex items-center gap-2 text-white/80 text-xs font-medium">
                    <span className="bg-white/20 px-2 py-0.5 rounded text-[10px] backdrop-blur-sm border border-white/10">{host.role}</span>
                    {host.location && (
                        <span className="flex items-center gap-0.5"><MapPin size={10} /> {host.location.split('·')[1] || host.location}</span>
                    )}
                </div>
            </div>
        </div>
      </div>

      {/* 2. Scrollable Content */}
      <div className="flex-1 overflow-y-auto bg-[#f8f9fa] relative z-10 -mt-6 rounded-t-[32px] pt-12 px-5 pb-32">
         
         {/* --- 独特的我 (Unique Me) Section --- */}
         <div className="mb-8">
            <div className="flex items-center gap-2 mb-4 px-1">
               <div className="w-1 h-5 bg-primary rounded-full"></div>
               <h3 className="text-lg font-bold text-gray-900">独特的我</h3>
            </div>
            
            {/* Zone of Genius Card */}
            <div className="bg-white p-5 rounded-[24px] shadow-sm border border-gray-100 mb-4 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-20 h-20 bg-purple-50 rounded-full -mr-10 -mt-10 blur-xl"></div>
                <div className="flex items-center gap-2 mb-3 relative z-10">
                    <div className="w-8 h-8 rounded-full bg-purple-50 flex items-center justify-center text-purple-500">
                       <Zap size={16} fill="currentColor" />
                    </div>
                    <span className="text-xs font-bold text-purple-900 uppercase tracking-wider">Zone of Genius</span>
                </div>
                <p className="text-sm text-gray-700 leading-relaxed font-medium relative z-10">
                   "{stats.flowDescription}"
                </p>
            </div>

            {/* Love & Fun Tags Card */}
            <div className="bg-white p-5 rounded-[24px] shadow-sm border border-gray-100 relative overflow-hidden">
                <div className="absolute bottom-0 left-0 w-20 h-20 bg-pink-50 rounded-full -ml-10 -mb-10 blur-xl"></div>
                <div className="flex items-center gap-2 mb-3 relative z-10">
                    <div className="w-8 h-8 rounded-full bg-pink-50 flex items-center justify-center text-pink-500">
                       <Heart size={16} fill="currentColor" />
                    </div>
                    <span className="text-xs font-bold text-pink-900 uppercase tracking-wider">Love & Fun Lifestyle</span>
                </div>
                <div className="flex flex-wrap gap-2 relative z-10">
                    {stats.loveFunTags.map((tag, i) => (
                        <span key={i} className="px-3 py-1.5 bg-gray-50 text-gray-600 rounded-lg text-xs font-bold border border-gray-100 hover:bg-pink-50 hover:text-pink-600 hover:border-pink-100 transition-colors cursor-default">
                            {tag}
                        </span>
                    ))}
                </div>
            </div>
         </div>

         {/* --- 我发起的 (Initiated) --- */}
         <div className="mb-8">
            <div className="flex items-center gap-2 mb-4 px-1">
               <div className="w-1 h-5 bg-gray-900 rounded-full"></div>
               <h3 className="text-base font-bold text-gray-900">我发起的</h3>
               <span className="text-xs font-bold text-gray-400 bg-gray-100 px-2 py-0.5 rounded-full">{initiatedItems.length}</span>
            </div>
            <div className="space-y-3">
                {initiatedItems.map((item: any, idx) => (
                    <ItemCard 
                        key={`init-${idx}`} 
                        item={item} 
                        badgeLabel={item.serviceTitle ? '服务' : (item.estReturn ? '项目' : '活动')} 
                        badgeColor="bg-black"
                    />
                ))}
            </div>
         </div>

         {/* --- 我参与的 (Joined) --- */}
         <div className="mb-4">
            <div className="flex items-center gap-2 mb-4 px-1">
               <div className="w-1 h-5 bg-gray-300 rounded-full"></div>
               <h3 className="text-base font-bold text-gray-900">我参与的</h3>
               <span className="text-xs font-bold text-gray-400 bg-gray-100 px-2 py-0.5 rounded-full">{joinedItems.length}</span>
            </div>
            <div className="space-y-3">
                 {joinedItems.map((item: any, idx) => (
                    <ItemCard 
                        key={`join-${idx}`} 
                        item={item} 
                        badgeLabel="共建者" 
                        badgeColor="bg-gray-400"
                    />
                ))}
            </div>
         </div>

      </div>

      {/* 3. Bottom Action Bar */}
      <div className="absolute bottom-0 left-0 right-0 bg-white border-t border-gray-100 px-6 py-4 pb-8 flex items-center gap-4 z-20 shadow-[0_-10px_40px_rgba(0,0,0,0.05)]">
         <button className="w-12 h-12 rounded-full border border-gray-200 flex items-center justify-center text-gray-600 hover:bg-gray-50 active:scale-95 transition-all">
            <MessageCircle size={20} />
         </button>
         
         <button 
           onClick={() => setIsFollowing(!isFollowing)}
           className={`flex-1 h-12 rounded-full font-bold flex items-center justify-center gap-2 shadow-lg transition-all active:scale-95 ${
             isFollowing 
             ? 'bg-gray-100 text-gray-900 hover:bg-gray-200' 
             : 'bg-black text-white hover:bg-gray-900'
           }`}
         >
           {isFollowing ? (
             <>已关注</>
           ) : (
             <><UserPlus size={18} /> 关注主理人</>
           )}
         </button>
      </div>

    </div>
  );
};

// --- Helper Components & Data for HostProfile ---

const ItemCard = ({ item, badgeLabel, badgeColor }: { item: any, badgeLabel: string, badgeColor: string }) => (
  <div className="flex gap-4 p-3 rounded-2xl border border-gray-100 shadow-sm bg-white hover:shadow-md transition-shadow cursor-pointer">
      <img src={item.image} className="w-16 h-16 rounded-xl object-cover bg-gray-100" referrerPolicy="no-referrer" />
      <div className="flex-1 flex flex-col justify-between py-0.5">
          <div>
              <div className="flex items-center gap-2 mb-1">
                  <span className={`text-[9px] font-bold text-white px-1.5 py-0.5 rounded-md ${badgeColor}`}>
                      {badgeLabel}
                  </span>
                  {item.price && (
                     <span className="text-[10px] font-bold text-gray-400">
                        {typeof item.price === 'number' ? `¥${item.price}` : item.price}
                     </span>
                  )}
              </div>
              <h4 className="text-sm font-bold text-gray-900 leading-tight line-clamp-1">
                  {item.title || item.serviceTitle}
              </h4>
          </div>
          <div className="flex items-center justify-between">
              <span className="text-[10px] font-bold text-gray-400 flex items-center gap-1">
                  <MapPin size={10} /> {item.location ? (item.location.split('·')[1] || item.location) : '线上'}
              </span>
              <ArrowRight size={12} className="text-gray-300" />
          </div>
      </div>
  </div>
);

// Local Mock Data for "Joined" events if not fully available in global mocks
const HIGH_VIBE_EVENTS_MOCK = [
  {
    id: 'e_mock_1',
    title: "深圳湾 · 日落颂钵音疗会",
    image: "https://images.unsplash.com/photo-1596766723236-02a8eb3c7c3b?w=400&h=400&fit=crop",
    location: "深圳 · 深圳湾"
  },
  {
    id: 'e_mock_2',
    title: "数字游民早餐会",
    image: "https://images.unsplash.com/photo-1525610553991-2bede1a236e2?w=400&h=400&fit=crop",
    location: "大理 · 古城"
  }
];