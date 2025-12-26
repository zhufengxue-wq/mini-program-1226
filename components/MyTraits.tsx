import React, { useState, useEffect } from 'react';
import { USER_PROFILE, LOVE_FUN_PROFILE, SERVICE_LIST, LIFE_ITEMS, INSPIRATION_PROJECTS, MIFFY_GOLF_SERVICE } from '../services/mockData';
import { Zap, Heart, Palette, MapPin, Music, Activity, Compass, Cpu, Eye, Settings, Sparkles, Gamepad2, Pencil, Check, X, Plus, Trash2, ArrowLeft, Image as ImageIcon, Share2, ArrowRight } from 'lucide-react';
import { UserProfile, LoveFunProfile, LoveFunSection, ServiceItem, Project } from '../types';

interface MyTraitsProps {
    onOpenProviderDashboard: (service: ServiceItem) => void;
    onOpenProjectDashboard: (project: Project) => void;
}

const IconMap: Record<string, React.FC<any>> = {
  Palette: Palette,
  MapPin: MapPin,
  Music: Music,
  Activity: Activity,
  Compass: Compass,
  Cpu: Cpu,
  Eye: Eye,
  Gamepad2: Gamepad2,
  Sparkles: Sparkles
};

// Visual Themes for different lifestyle sections
const SECTION_THEMES: Record<string, { tagBg: string, tagText: string, tagBorder: string, iconColor: string, iconBg: string, lightBg: string }> = {
  style: { tagBg: 'bg-pink-50', tagText: 'text-pink-600', tagBorder: 'border-pink-100', iconColor: 'text-pink-500', iconBg: 'bg-pink-50', lightBg: 'bg-pink-50/30' },
  energy: { tagBg: 'bg-orange-50', tagText: 'text-orange-700', tagBorder: 'border-orange-100', iconColor: 'text-orange-500', iconBg: 'bg-orange-50', lightBg: 'bg-orange-50/30' },
  joy: { tagBg: 'bg-violet-50', tagText: 'text-violet-600', tagBorder: 'border-violet-100', iconColor: 'text-violet-500', iconBg: 'bg-violet-50', lightBg: 'bg-violet-50/30' },
  bgm: { tagBg: 'bg-purple-50', tagText: 'text-purple-600', tagBorder: 'border-purple-100', iconColor: 'text-purple-500', iconBg: 'bg-purple-50', lightBg: 'bg-purple-50/30' },
  body: { tagBg: 'bg-emerald-50', tagText: 'text-emerald-700', tagBorder: 'border-emerald-100', iconColor: 'text-emerald-500', iconBg: 'bg-emerald-50', lightBg: 'bg-emerald-50/30' },
  entertainment: { tagBg: 'bg-sky-50', tagText: 'text-sky-600', tagBorder: 'border-sky-100', iconColor: 'text-sky-500', iconBg: 'bg-sky-50', lightBg: 'bg-sky-50/30' },
  default: { tagBg: 'bg-slate-50', tagText: 'text-slate-600', tagBorder: 'border-slate-200', iconColor: 'text-slate-500', iconBg: 'bg-slate-50', lightBg: 'bg-slate-50' },
};

// Mock Gallery Images for Detail Pages
const MOCK_GALLERY: Record<string, string[]> = {
  style: [
    "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=400&h=400&fit=crop",
    "https://images.unsplash.com/photo-1529139574466-a302d2052574?w=400&h=400&fit=crop",
    "https://images.unsplash.com/photo-1483985988355-763728e1935b?w=400&h=400&fit=crop"
  ],
  body: [
    "https://images.unsplash.com/photo-1518611012118-696072aa579a?w=400&h=400&fit=crop",
    "https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=400&h=400&fit=crop",
    "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=400&h=400&fit=crop"
  ],
  joy: [
    "https://images.unsplash.com/photo-1523580494863-6f3031224c94?w=400&h=400&fit=crop",
    "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=400&h=400&fit=crop",
    "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=400&h=400&fit=crop"
  ]
};

// Local Helper Component for Activity Lists
const ItemCard = ({ item, badgeLabel, badgeColor, onClick }: { item: any, badgeLabel: string, badgeColor: string, onClick?: () => void }) => (
  <div onClick={onClick} className="flex gap-4 p-3 rounded-2xl border border-gray-100 shadow-sm bg-white hover:shadow-md transition-shadow cursor-pointer active:scale-[0.99] transition-transform">
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

export const MyTraits: React.FC<MyTraitsProps> = ({ onOpenProviderDashboard, onOpenProjectDashboard }) => {
  // --- Local State ---
  const [profile, setProfile] = useState<UserProfile>(USER_PROFILE);
  const [loveFun, setLoveFun] = useState<LoveFunProfile>(LOVE_FUN_PROFILE);
  const [geniusEasyText, setGeniusEasyText] = useState("敏锐捕捉稍纵即逝的审美趋势与视觉通感。快速整合资源并建立系统。");

  // Edit State
  const [editingId, setEditingId] = useState<string | null>(null);
  const [draftData, setDraftData] = useState<any>(null);

  // Navigation State: If not null, show detail page
  const [selectedSection, setSelectedSection] = useState<LoveFunSection | null>(null);

  // --- Mock Data for Initiated & Joined ---
  // Updated: Include Miffy's Golf Service as the first item
  const myInitiatedItems = [
    MIFFY_GOLF_SERVICE, // Service Item
    INSPIRATION_PROJECTS[0], // Project Item (Ubud Villa)
  ];

  const myJoinedItems = [
    ...SERVICE_LIST.slice(1, 2), // A service they bought
    ...LIFE_ITEMS.slice(3, 5) // Events they joined
  ];

  // --- Handlers ---
  const startEditing = (e: React.MouseEvent, id: string, initialData: any) => {
    e.stopPropagation(); // Prevent opening detail view
    setEditingId(id);
    setDraftData(JSON.parse(JSON.stringify(initialData)));
  };

  const cancelEditing = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    setEditingId(null);
    setDraftData(null);
  };

  const saveHeader = () => {
    setProfile({ ...profile, ...draftData });
    setEditingId(null);
  };

  const saveGenius = () => {
    setProfile({ ...profile, flowDescription: draftData.flowDescription });
    setGeniusEasyText(draftData.geniusEasyText);
    setEditingId(null);
  };

  const saveIntro = () => {
    setLoveFun({ ...loveFun, intro: draftData });
    setEditingId(null);
  };

  const saveSection = (sectionId: string) => {
    const updatedSections = loveFun.sections.map(s => 
      s.id === sectionId ? draftData : s
    );
    setLoveFun({ ...loveFun, sections: updatedSections });
    setEditingId(null);
  };

  // Helper to handle input changes
  const updateDraft = (field: string, value: any) => {
    setDraftData((prev: any) => ({ ...prev, [field]: value }));
  };

  const updateDraftItem = (index: number, field: 'label' | 'text', value: string) => {
    const newItems = [...(draftData.items || [])];
    newItems[index] = { ...newItems[index], [field]: value };
    setDraftData({ ...draftData, items: newItems });
  };

  const addDraftItem = () => {
    const newItems = [...(draftData.items || []), { label: '新标签', text: '' }];
    setDraftData({ ...draftData, items: newItems });
  };

  const removeDraftItem = (index: number) => {
    const newItems = [...(draftData.items || [])];
    newItems.splice(index, 1);
    setDraftData({ ...draftData, items: newItems });
  };

  // --- RENDER: Detail View ---
  if (selectedSection) {
    const theme = SECTION_THEMES[selectedSection.id] || SECTION_THEMES.default;
    const Icon = IconMap[selectedSection.iconType] || Sparkles;
    const galleryImages = MOCK_GALLERY[selectedSection.id] || MOCK_GALLERY.joy;

    return (
      <div className={`min-h-full bg-white animate-in slide-in-from-right-10 duration-300 relative z-50 pb-24`}>
        {/* Sticky Header */}
        <div className="sticky top-0 left-0 right-0 bg-white/80 backdrop-blur-md z-50 px-4 py-4 border-b border-gray-100 flex items-center justify-between">
          <button 
            onClick={() => setSelectedSection(null)}
            className="w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center text-gray-600 hover:bg-gray-100 transition-colors"
          >
            <ArrowLeft size={20} />
          </button>
          <span className="text-xs font-bold text-gray-400 uppercase tracking-widest">Detail View</span>
          <button className="w-10 h-10 rounded-full flex items-center justify-center text-gray-400 hover:text-gray-900 transition-colors">
            <Share2 size={20} />
          </button>
        </div>

        {/* Hero Section */}
        <div className={`px-8 pt-8 pb-10 ${theme.lightBg}`}>
           <div className={`w-16 h-16 rounded-[24px] ${theme.iconBg} ${theme.iconColor} flex items-center justify-center mb-6 shadow-sm`}>
              <Icon size={32} />
           </div>
           <h1 className="text-3xl font-bold text-gray-900 leading-tight mb-4">{selectedSection.title}</h1>
           <p className="text-sm text-gray-500 font-medium">
             这里记录了我关于「{selectedSection.title.replace('让我', '').replace('是', '')}」的所有美好瞬间与定义。
           </p>
        </div>

        {/* Content Section */}
        <div className="px-6 -mt-6">
           <div className="bg-white rounded-[32px] p-8 shadow-xl shadow-gray-100/50 border border-gray-100">
              
              {/* Tags */}
              <div className="mb-10">
                <h3 className="text-sm font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <Sparkles size={14} className={theme.iconColor} /> 我的关键词
                </h3>
                <div className="flex flex-wrap gap-3">
                  {selectedSection.items?.map((item, idx) => (
                    <span 
                       key={idx} 
                       className={`text-sm font-medium ${theme.tagText} ${theme.tagBg} ${theme.tagBorder} border px-4 py-2 rounded-xl`}
                    >
                        {item.label}
                    </span>
                  ))}
                </div>
              </div>

              {/* Gallery */}
              <div>
                <h3 className="text-sm font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <ImageIcon size={14} className={theme.iconColor} /> 灵感瞬间
                </h3>
                <div className="grid grid-cols-2 gap-3">
                   <div className="space-y-3">
                      <img src={galleryImages[0]} className="w-full aspect-[3/4] object-cover rounded-2xl" />
                      <div className={`w-full aspect-square rounded-2xl ${theme.lightBg} flex items-center justify-center`}>
                        <span className={`text-2xl font-bold ${theme.tagText}`}>+</span>
                      </div>
                   </div>
                   <div className="space-y-3 pt-6">
                      <img src={galleryImages[1]} className="w-full aspect-square object-cover rounded-2xl" />
                      <img src={galleryImages[2]} className="w-full aspect-[3/4] object-cover rounded-2xl" />
                   </div>
                </div>
              </div>

           </div>
        </div>
      </div>
    );
  }

  // --- RENDER: Main Profile View ---
  return (
    <div className="min-h-full bg-[#f8f9fa] pb-32">
      
      {/* --- 1. Header Profile Card --- */}
      <div className="bg-white px-6 pt-14 pb-8 border-b border-gray-100 relative group shadow-sm rounded-b-[40px] mb-6 z-10">
        
        {/* Edit Controls */}
        <div className="absolute top-6 right-6 flex gap-2">
          {editingId === 'header' ? (
            <div className="flex gap-2 bg-white shadow-lg rounded-full p-1 border border-gray-100 animate-in fade-in zoom-in duration-200">
              <button onClick={saveHeader} className="p-2 bg-emerald-50 text-emerald-600 rounded-full hover:bg-emerald-100 transition-colors"><Check size={16} /></button>
              <button onClick={(e) => cancelEditing(e)} className="p-2 bg-rose-50 text-rose-600 rounded-full hover:bg-rose-100 transition-colors"><X size={16} /></button>
            </div>
          ) : (
            <button 
              onClick={(e) => startEditing(e, 'header', { nickname: profile.nickname, flowDescription: profile.flowDescription })}
              className="p-2.5 text-gray-400 hover:text-primary hover:bg-orange-50 rounded-full transition-all opacity-100 sm:opacity-0 sm:group-hover:opacity-100"
            >
              <Pencil size={16} />
            </button>
          )}
        </div>
        
        <div className="flex items-center justify-between mb-8">
           <h1 className="text-2xl font-bold text-gray-900 tracking-tight">独特的我</h1>
        </div>
        
        <div className="flex items-start gap-5">
          <div className="relative group/avatar">
            <div className="w-[72px] h-[72px] rounded-full p-[3px] bg-gradient-to-tr from-orange-400 to-purple-500 shadow-md">
              <img 
                src={profile.avatar} 
                referrerPolicy="no-referrer"
                className="w-full h-full rounded-full object-cover border-2 border-white" 
              />
            </div>
            <div className="absolute -bottom-1 -right-1 bg-gray-900 text-white text-[10px] font-bold px-2 py-0.5 rounded-full border-2 border-white shadow-sm">
              Lv.3
            </div>
          </div>
          
          <div className="flex-1 min-w-0 pt-1">
            {editingId === 'header' ? (
              <div className="flex flex-col gap-3 animate-in fade-in slide-in-from-left-2 duration-300">
                 <input 
                    value={draftData.nickname}
                    onChange={(e) => updateDraft('nickname', e.target.value)}
                    className="text-2xl font-bold text-gray-900 border-b-2 border-orange-100 focus:border-primary focus:outline-none bg-transparent w-full pb-1"
                    placeholder="昵称"
                 />
                 <textarea 
                    value={draftData.flowDescription}
                    onChange={(e) => updateDraft('flowDescription', e.target.value)}
                    className="text-sm text-gray-600 leading-relaxed font-medium border border-gray-200 rounded-xl p-3 focus:border-primary focus:ring-2 focus:ring-orange-50 focus:outline-none w-full bg-gray-50 resize-none h-24"
                    placeholder="你的心流状态描述..."
                 />
              </div>
            ) : (
              <div className="space-y-2">
                <div className="flex items-center gap-3">
                  <h2 className="text-2xl font-bold text-gray-900 tracking-tight">{profile.nickname}</h2>
                  <span className="bg-gradient-to-r from-purple-500 to-indigo-500 text-white text-[10px] px-2.5 py-1 rounded-md font-bold shadow-sm shadow-purple-200 tracking-wide">
                    超级个体
                  </span>
                </div>
                <p className="text-sm text-slate-500 leading-relaxed font-medium">
                  {profile.flowDescription}
                </p>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="px-5 space-y-6">
        
        {/* --- 2. Zone of Genius Card --- */}
        <div className="bg-white rounded-[32px] p-8 shadow-soft border border-gray-100/50 relative group transition-all hover:shadow-lg">
           {/* Edit Controls */}
           <div className="absolute top-5 right-5 flex gap-2">
            {editingId === 'genius' ? (
              <div className="flex gap-2 bg-white shadow-lg rounded-full p-1 border border-gray-100 animate-in fade-in zoom-in duration-200">
                <button onClick={saveGenius} className="p-1.5 bg-emerald-50 text-emerald-600 rounded-full hover:bg-emerald-100"><Check size={14} /></button>
                <button onClick={(e) => cancelEditing(e)} className="p-1.5 bg-rose-50 text-rose-600 rounded-full hover:bg-rose-100"><X size={14} /></button>
              </div>
            ) : (
              <button 
                onClick={(e) => startEditing(e, 'genius', { flowDescription: profile.flowDescription, geniusEasyText })}
                className="p-2 text-gray-300 hover:text-primary hover:bg-orange-50 rounded-full opacity-100 sm:opacity-0 sm:group-hover:opacity-100 transition-all"
              >
                <Pencil size={14} />
              </button>
            )}
          </div>

           <div className="flex items-center gap-3 mb-6">
             <div className="w-10 h-10 rounded-2xl bg-purple-50 flex items-center justify-center text-purple-600 shadow-sm">
                <Zap size={20} fill="currentColor" fillOpacity={0.2} />
             </div>
             <div>
                <h3 className="font-bold text-gray-900 text-lg">Zone of Genius</h3>
                <p className="text-[10px] font-bold text-purple-400 tracking-wider uppercase">天赋流心流</p>
             </div>
           </div>
           
           <div className="space-y-6 pl-2">
             <div className="flex gap-4 group/item">
               <div className="flex flex-col items-center gap-1 mt-1">
                  <div className="w-2.5 h-2.5 rounded-full bg-pink-400 shadow-sm shadow-pink-200"></div>
                  <div className="w-0.5 h-full bg-gray-100 rounded-full group-hover/item:bg-pink-100 transition-colors"></div>
               </div>
               <div className="flex-1 pb-2">
                 <p className="text-xs font-bold text-gray-400 mb-1.5 uppercase tracking-wide">我享受的是...</p>
                 {editingId === 'genius' ? (
                    <textarea 
                      value={draftData.flowDescription}
                      onChange={(e) => updateDraft('flowDescription', e.target.value)}
                      className="w-full text-sm text-gray-700 bg-gray-50 border border-gray-200 rounded-xl p-3 focus:border-primary focus:ring-2 focus:ring-orange-50 focus:outline-none resize-none"
                      rows={3}
                    />
                 ) : (
                    <p className="text-sm text-gray-700 leading-relaxed font-medium">{profile.flowDescription}</p>
                 )}
               </div>
             </div>
             <div className="flex gap-4 group/item">
               <div className="flex flex-col items-center gap-1 mt-1">
                  <div className="w-2.5 h-2.5 rounded-full bg-orange-400 shadow-sm shadow-orange-200"></div>
               </div>
               <div className="flex-1">
                 <p className="text-xs font-bold text-gray-400 mb-1.5 uppercase tracking-wide">做起来轻而易举的是...</p>
                 {editingId === 'genius' ? (
                    <textarea 
                      value={draftData.geniusEasyText}
                      onChange={(e) => updateDraft('geniusEasyText', e.target.value)}
                      className="w-full text-sm text-gray-700 bg-gray-50 border border-gray-200 rounded-xl p-3 focus:border-primary focus:ring-2 focus:ring-orange-50 focus:outline-none resize-none"
                      rows={3}
                    />
                 ) : (
                    <p className="text-sm text-gray-700 leading-relaxed font-medium">{geniusEasyText}</p>
                 )}
               </div>
             </div>
           </div>
        </div>

        {/* --- Header for Sections --- */}
        <div className="flex items-center gap-2 px-2 pt-2 pb-1">
            <Heart className="text-rose-500 fill-current animate-pulse" size={20} />
            <h2 className="text-lg font-bold text-gray-900">Love & Fun 生活方式</h2>
        </div>

        {/* --- 3. Intro Card --- */}
        <div className="bg-gradient-to-br from-white to-rose-50/50 rounded-[32px] p-8 shadow-soft border border-rose-100/50 relative overflow-hidden group">
             <div className="absolute top-0 right-0 p-8 opacity-10 text-rose-300 pointer-events-none">
                <Sparkles size={80} strokeWidth={1} />
             </div>
             
             {/* Edit Controls */}
             <div className="absolute bottom-5 right-5 flex gap-2 z-20">
              {editingId === 'intro' ? (
                <div className="flex gap-2 bg-white/80 backdrop-blur shadow-lg rounded-full p-1 border border-rose-100 animate-in fade-in zoom-in duration-200">
                  <button onClick={saveIntro} className="p-1.5 bg-white text-emerald-600 rounded-full hover:bg-emerald-50 shadow-sm"><Check size={14} /></button>
                  <button onClick={(e) => cancelEditing(e)} className="p-1.5 bg-white text-rose-600 rounded-full hover:bg-rose-50 shadow-sm"><X size={14} /></button>
                </div>
              ) : (
                <button 
                  onClick={(e) => startEditing(e, 'intro', loveFun.intro)}
                  className="p-2 bg-white/60 text-rose-400 hover:text-rose-600 hover:bg-white rounded-full opacity-100 sm:opacity-0 sm:group-hover:opacity-100 transition-all shadow-sm backdrop-blur-sm"
                >
                  <Pencil size={14} />
                </button>
              )}
            </div>

            {editingId === 'intro' ? (
              <textarea 
                value={draftData}
                onChange={(e) => setDraftData(e.target.value)}
                className="w-full text-sm text-gray-800 font-medium bg-white/80 border border-rose-200 rounded-xl p-4 focus:border-rose-400 focus:ring-4 focus:ring-rose-50 focus:outline-none resize-none relative z-10 shadow-inner"
                rows={3}
              />
            ) : (
              <div className="relative z-10 pr-4">
                 <span className="text-4xl text-rose-300 font-serif absolute -top-3 -left-2 opacity-50">“</span>
                 <p className="text-sm text-gray-700 font-medium leading-loose italic pl-6 relative">
                    {loveFun.intro}
                 </p>
                 <span className="text-4xl text-rose-300 font-serif absolute -bottom-6 right-8 opacity-50 rotate-180">“</span>
              </div>
            )}
        </div>

        {/* --- 4. Unified Love & Fun Sections Card (Clickable List) --- */}
        <div className="bg-white rounded-[32px] p-8 shadow-[0_10px_40px_rgba(0,0,0,0.03)] border border-gray-100/50 relative mb-8">
          
          {loveFun.sections.map((section, index) => {
              const Icon = IconMap[section.iconType] || Sparkles;
              const isEditing = editingId === section.id;
              const theme = SECTION_THEMES[section.id] || SECTION_THEMES.default;
              
              // Only add margin-bottom if it's not the last item
              const wrapperClass = index === loveFun.sections.length - 1 ? "relative group cursor-pointer" : "relative group mb-10 cursor-pointer";

              return (
                  <div 
                    key={section.id} 
                    className={wrapperClass}
                    onClick={() => {
                      if (!isEditing) setSelectedSection(section);
                    }}
                  >
                      {/* Edit Controls for this section */}
                      <div className="absolute -top-1 right-0 flex gap-2 z-20">
                        {isEditing ? (
                          <div className="flex gap-2 bg-white shadow-lg rounded-full p-1 border border-gray-100 animate-in fade-in zoom-in duration-200">
                            <button onClick={() => saveSection(section.id)} className="p-1.5 bg-emerald-50 text-emerald-600 rounded-full hover:bg-emerald-100"><Check size={14} /></button>
                            <button onClick={(e) => cancelEditing(e)} className="p-1.5 bg-rose-50 text-rose-600 rounded-full hover:bg-rose-100"><X size={14} /></button>
                          </div>
                        ) : (
                          <button 
                            onClick={(e) => startEditing(e, section.id, section)}
                            className="p-1.5 text-gray-300 hover:text-primary hover:bg-orange-50 rounded-full opacity-100 sm:opacity-0 sm:group-hover:opacity-100 transition-all"
                          >
                            <Pencil size={14} />
                          </button>
                        )}
                      </div>

                      {/* Section Header with Icon */}
                      <div className="flex items-center gap-3 mb-4 pr-12">
                          <div className={`w-9 h-9 rounded-2xl ${theme.iconBg} flex items-center justify-center ${theme.iconColor} shadow-sm transition-transform group-hover:scale-105 duration-300`}>
                               <Icon size={16} />
                          </div>
                          {isEditing ? (
                             <input 
                                value={draftData.title}
                                onChange={(e) => updateDraft('title', e.target.value)}
                                onClick={(e) => e.stopPropagation()} // Focus input, don't open detail
                                className="font-bold text-gray-900 text-sm border-b-2 border-gray-200 focus:border-primary focus:outline-none w-full pb-1 bg-transparent"
                             />
                          ) : (
                             <h3 className="font-bold text-gray-800 text-sm tracking-wide group-hover:text-primary transition-colors">{section.title}</h3>
                          )}
                          {!isEditing && <ArrowLeft size={14} className="text-gray-300 rotate-180 opacity-0 group-hover:opacity-100 transition-opacity -ml-1" />}
                      </div>

                      {/* Items List (Horizontal Tags with Indentation) */}
                      <div className="pl-12">
                          {/* If Editing: Render Editable List */}
                          {isEditing && draftData.items ? (
                            <div className="flex flex-wrap gap-2" onClick={(e) => e.stopPropagation()}>
                              {draftData.items.map((item: any, idx: number) => (
                                <div key={idx} className="flex items-center gap-1 bg-gray-50 px-2 py-1 rounded-lg border border-gray-200 shadow-sm animate-in zoom-in duration-200">
                                     <input 
                                        value={item.label}
                                        onChange={(e) => updateDraftItem(idx, 'label', e.target.value)}
                                        className="text-xs font-bold text-gray-700 bg-transparent focus:outline-none w-20"
                                        placeholder="标签"
                                     />
                                     <button 
                                        onClick={() => removeDraftItem(idx)}
                                        className="text-gray-400 hover:text-rose-500 transition-colors"
                                     >
                                        <Trash2 size={12} />
                                     </button>
                                </div>
                              ))}
                              <button 
                                onClick={addDraftItem}
                                className="px-3 py-1.5 border border-dashed border-gray-300 rounded-lg text-xs font-bold text-gray-400 hover:text-primary hover:border-primary hover:bg-orange-50 transition-all flex items-center gap-1 bg-white"
                              >
                                 <Plus size={12} /> 添加
                              </button>
                            </div>
                          ) : (
                            /* View Mode - Colored Pills */
                            <div className="flex flex-wrap gap-2.5 pointer-events-none"> {/* Pass through clicks to parent */}
                                {section.items && section.items.map((item, idx) => (
                                   <span 
                                      key={idx} 
                                      className={`text-xs font-medium ${theme.tagText} ${theme.tagBg} ${theme.tagBorder} border px-3.5 py-1.5 rounded-full transition-all`}
                                   >
                                       {item.label}
                                   </span>
                                ))}
                                
                                {/* Fallback Content if no items */}
                                {!section.items && section.content && (
                                    <p className="text-xs text-gray-500">{section.content}</p>
                                )}
                            </div>
                          )}
                      </div>
                  </div>
              );
          })}
        </div>

         {/* --- 5. Initiated by Me (Updated with Provider Logic) --- */}
         <div className="mb-8">
            <div className="flex items-center justify-between mb-4 px-1">
               <div className="flex items-center gap-2">
                 <div className="w-1 h-5 bg-gray-900 rounded-full"></div>
                 <h3 className="text-base font-bold text-gray-900">我发起的</h3>
                 <span className="text-xs font-bold text-gray-400 bg-gray-100 px-2 py-0.5 rounded-full">{myInitiatedItems.length}</span>
               </div>
               <button className="text-[10px] font-bold text-white bg-gray-900 px-3 py-1.5 rounded-full flex items-center gap-1 hover:bg-black transition-colors shadow-sm">
                  <Plus size={12} /> 发布服务
               </button>
            </div>
            <div className="space-y-3">
                {myInitiatedItems.map((item: any, idx) => (
                    <ItemCard 
                        key={`init-${idx}`} 
                        item={item} 
                        badgeLabel={item.serviceTitle ? '服务' : (item.estReturn ? '项目' : '活动')} 
                        badgeColor={item.isOwner ? "bg-green-600" : "bg-black"}
                        onClick={() => {
                           // Check if it's a Service (ProviderDashboard) or a Project (ProjectDashboard)
                           if (item.isOwner) {
                               if (item.serviceTitle) {
                                   onOpenProviderDashboard(item);
                               } else {
                                   onOpenProjectDashboard(item);
                               }
                           }
                        }}
                    />
                ))}
            </div>
         </div>

         {/* --- 6. Joined by Me --- */}
         <div className="mb-4">
            <div className="flex items-center gap-2 mb-4 px-1">
               <div className="w-1 h-5 bg-gray-300 rounded-full"></div>
               <h3 className="text-base font-bold text-gray-900">我参与的</h3>
               <span className="text-xs font-bold text-gray-400 bg-gray-100 px-2 py-0.5 rounded-full">{myJoinedItems.length}</span>
            </div>
            <div className="space-y-3">
                 {myJoinedItems.map((item: any, idx) => (
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
    </div>
  );
};