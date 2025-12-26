import React, { useState, useEffect } from 'react';
import { BottomNav } from './components/BottomNav';
import { TabType } from './types';
import { USER_PROFILE, NOURISH_SERVICES, INSPIRATION_PROJECTS, HIGH_VIBE_EVENTS, LIFE_ITEMS } from './services/mockData';
import { Sparkles, ArrowRight, ChevronRight, Grid, MapPin, Crown, TrendingUp } from 'lucide-react';

// Consolidated Explore Component
import { Explore } from './components/Explore';
import { MyTraits } from './components/MyTraits';
import { DetailView } from './components/DetailView'; // Import Detail View
import { HostProfile } from './components/HostProfile'; // Import Host Profile
import { ProviderDashboard } from './components/ProviderDashboard'; // Import Provider Dashboard
import { ProjectDashboard } from './components/ProjectDashboard'; // Import Project Dashboard

export default function App() {
  const [activeTab, setActiveTab] = useState<TabType>('inspiration');
  const [isLoaded, setIsLoaded] = useState(false);

  // --- Global Detail View State ---
  const [detailItem, setDetailItem] = useState<any>(null);
  const [detailType, setDetailType] = useState<'service' | 'project' | 'life' | 'event'>('service');

  // --- Global Host Profile State ---
  const [hostProfile, setHostProfile] = useState<any>(null);

  // --- Global Provider Dashboard State (Services) ---
  const [providerServiceItem, setProviderServiceItem] = useState<any>(null);

  // --- Global Project Dashboard State (Assets) ---
  const [projectDashboardItem, setProjectDashboardItem] = useState<any>(null);


  const handleOpenDetail = (item: any, type: 'service' | 'project' | 'life' | 'event') => {
    // For High Vibe Events (simplified in mockData), find full record in LIFE_ITEMS
    if (type === 'event' && item.id) {
       const fullItem = LIFE_ITEMS.find(l => l.id === item.id);
       setDetailItem(fullItem || item);
    } else {
       setDetailItem(item);
    }
    setDetailType(type);
  };

  const handleCloseDetail = () => {
    setDetailItem(null);
  };

  const handleOpenHostProfile = (host: any) => {
    setHostProfile(host);
  };

  const handleCloseHostProfile = () => {
    setHostProfile(null);
  };

  const handleOpenProviderDashboard = (service: any) => {
    setProviderServiceItem(service);
  };

  const handleCloseProviderDashboard = () => {
    setProviderServiceItem(null);
  };

  const handleOpenProjectDashboard = (project: any) => {
    setProjectDashboardItem(project);
  };

  const handleCloseProjectDashboard = () => {
    setProjectDashboardItem(null);
  };

  // Trigger a visual refresh animation on mount
  useEffect(() => {
    setIsLoaded(true);
  }, []);

  const renderContent = () => {
    switch (activeTab) {
      case 'inspiration': return <HomePage onNavigate={setActiveTab} onOpenDetail={handleOpenDetail} />;
      case 'explore': return <Explore onOpenDetail={handleOpenDetail} />;
      case 'traits': return <MyTraits onOpenProviderDashboard={handleOpenProviderDashboard} onOpenProjectDashboard={handleOpenProjectDashboard} />;
      default: return <HomePage onNavigate={setActiveTab} onOpenDetail={handleOpenDetail} />;
    }
  };

  return (
    <div className={`flex flex-col h-screen max-w-md mx-auto bg-[#FFFBF0] shadow-2xl overflow-hidden relative border-x border-gray-200 font-sans text-slate-800 transition-opacity duration-700 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}>
      {/* Global Ambient Glow - Animated */}
      <div className="absolute top-[-100px] right-[-100px] w-[400px] h-[400px] bg-orange-400/15 blur-[80px] rounded-full pointer-events-none z-0 animate-pulse"></div>

      {/* Content Area */}
      <main className="flex-1 overflow-y-auto scrollbar-hide relative z-10">
        {renderContent()}
      </main>

      {/* Fixed Bottom Navigation */}
      <BottomNav activeTab={activeTab} onTabChange={setActiveTab} />

      {/* Global Detail View Overlay - Rendered outside of scrollable/animated areas */}
      {detailItem && (
        <DetailView 
          item={detailItem} 
          type={detailType} 
          onClose={handleCloseDetail} 
          onOpenHostProfile={handleOpenHostProfile}
        />
      )}

      {/* Global Host Profile Overlay - Rendered on top of Detail View */}
      {hostProfile && (
        <HostProfile 
          host={hostProfile} 
          onClose={handleCloseHostProfile} 
        />
      )}

      {/* Global Provider Dashboard Overlay - Services */}
      {providerServiceItem && (
        <ProviderDashboard 
          service={providerServiceItem}
          onClose={handleCloseProviderDashboard}
        />
      )}

      {/* Global Project Dashboard Overlay - Assets */}
      {projectDashboardItem && (
        <ProjectDashboard 
          project={projectDashboardItem}
          onClose={handleCloseProjectDashboard}
        />
      )}

    </div>
  );
}

// Interface for HomePage Props
interface HomePageProps {
  onNavigate: (tab: TabType) => void;
  onOpenDetail: (item: any, type: 'service' | 'project' | 'life' | 'event') => void;
}

// The New Core Homepage Component
const HomePage: React.FC<HomePageProps> = ({ onNavigate, onOpenDetail }) => {
  const user = USER_PROFILE;
  // Get the specific project: Bali Ubud Designer Villa (Index 0 in mockData)
  const sovereignProject = INSPIRATION_PROJECTS[0];
  
  return (
    <div className="pb-24 animate-in fade-in slide-in-from-bottom-4 duration-500">
      
      {/* 1. Identity Mirror (灵魂名片) */}
      <section className="px-6 pt-16 mb-8 relative">
        <div className="bg-white/60 backdrop-blur-xl border border-white/80 rounded-[32px] p-6 shadow-soft relative overflow-hidden group">
          {/* Subtle inner glow */}
          <div className="absolute top-0 right-0 w-32 h-32 bg-purple-400/10 blur-[40px] rounded-full group-hover:bg-purple-400/20 transition-all duration-1000"></div>
          
          <div className="flex items-center gap-5 mb-6 relative z-10">
            <div className="relative cursor-pointer" onClick={() => onNavigate('traits')}>
              <img 
                src={user.avatar} 
                alt="Avatar" 
                referrerPolicy="no-referrer"
                className="w-16 h-16 rounded-full border-2 border-white shadow-sm object-cover" 
              />
              {/* Breathing Status Ring */}
              <div className="absolute inset-[-4px] rounded-full border border-orange-400/60 animate-pulse"></div>
            </div>
            <div className="flex-1">
              <div className="flex justify-between items-start mb-1">
                <h1 className="text-xl font-bold text-slate-900 leading-tight">
                  {user.nickname}，欢迎回到<br/>我的高能状态。
                </h1>
                {/* Location Badge */}
                {user.location && (
                  <div className="flex items-center gap-1 bg-white/50 backdrop-blur px-2 py-1 rounded-full border border-white/60 shadow-sm mt-1">
                     <MapPin size={10} className="text-slate-500" />
                     <span className="text-[10px] font-bold text-slate-600 tracking-wide">{user.location}</span>
                  </div>
                )}
              </div>
              <div className="flex gap-2">
                {user.tags.map((tag, i) => (
                  <span key={i} className="text-[10px] font-medium text-emerald-700 bg-emerald-50/80 px-2 py-0.5 rounded-md border border-emerald-100/50">
                    # {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>

          <div className="h-px w-full bg-slate-900/5 mb-4"></div>

          <div className="relative px-2">
            <span className="absolute -top-2 -left-1 text-4xl text-orange-400/40 font-serif leading-none">“</span>
            <p className="text-sm text-slate-700 italic leading-relaxed relative z-10 pl-4 pr-2">
              {user.flowDescription}
            </p>
            <span className="absolute -bottom-4 -right-1 text-4xl text-orange-400/40 font-serif leading-none rotate-180">“</span>
            <p className="text-[10px] text-slate-400 text-right mt-3 font-medium tracking-wide">—— 我的心流时刻</p>
          </div>
        </div>
      </section>

      {/* 2. Nourish You (支持你爱自己) - Now FIRST content section */}
      <section className="mb-10 px-6">
        <div className="mb-4 flex justify-between items-end">
          <div>
            <h2 className="text-lg font-bold text-slate-900">支持我爱自己</h2>
            <p className="text-[10px] uppercase tracking-widest text-slate-400 font-bold mt-0.5">Support System</p>
          </div>
          <button 
            onClick={() => onNavigate('explore')}
            className="text-xs font-bold text-slate-400 flex items-center hover:text-primary transition-colors bg-white/50 px-2 py-1 rounded-full"
          >
            全部 <ChevronRight size={14} />
          </button>
        </div>
        
        <div className="flex flex-col gap-4">
          {NOURISH_SERVICES.slice(0, 2).map((item) => (
            <div 
              key={item.id} 
              className="w-full aspect-[4/3] relative rounded-[32px] overflow-hidden shadow-soft group hover:shadow-lg transition-all cursor-pointer"
              onClick={() => onOpenDetail(item, 'service')}
            >
              {/* Full Background Image */}
              <img 
                src={item.image} 
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" 
              />
              
              {/* Floating Glass Panel at Bottom */}
              <div className="absolute bottom-4 left-4 right-4 bg-white/75 backdrop-blur-xl border border-white/50 rounded-[24px] p-5 shadow-lg">
                 <h4 className="text-lg font-bold text-slate-900 mb-3 tracking-tight leading-tight line-clamp-2">{item.title}</h4>
                 
                 <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1.5 text-slate-500">
                       <Sparkles size={12} className="text-orange-500" />
                       <span className="text-xs font-medium">{item.matchReason}</span>
                    </div>
                    <button className="bg-slate-900 text-white text-[10px] px-3 py-1.5 rounded-full font-bold hover:bg-black transition-colors shadow-sm">
                      预约
                    </button>
                 </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 3. High Vibe Tribe (你的高维生活方式) - Now SECOND content section */}
      <section className="px-6 mb-10">
        <div className="mb-4 flex justify-between items-end">
          <div>
            <h2 className="text-lg font-bold text-slate-900">我的高维生活方式</h2>
            <p className="text-[10px] uppercase tracking-widest text-slate-400 font-bold mt-0.5">High Vibe Tribe</p>
          </div>
          <button 
            onClick={() => onNavigate('explore')}
            className="text-xs font-bold text-slate-400 flex items-center hover:text-primary transition-colors bg-white/50 px-2 py-1 rounded-full"
          >
            去连接 <ChevronRight size={14} />
          </button>
        </div>

        <div className="flex flex-col gap-4">
          {HIGH_VIBE_EVENTS.map((event) => (
            <div 
              key={event.id} 
              className="relative aspect-[4/3] w-full rounded-[32px] overflow-hidden shadow-soft group cursor-pointer"
              onClick={() => onOpenDetail(event, 'event')}
            >
              {/* Full Image */}
              <img 
                src={event.image} 
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" 
              />
              
              {/* Floating Glass Panel at Bottom */}
              <div className="absolute bottom-4 left-4 right-4 bg-white/75 backdrop-blur-xl border border-white/50 rounded-[24px] p-5 shadow-lg">
                <h4 className="text-lg font-bold text-slate-900 mb-3 tracking-tight">{event.title}</h4>
                
                <div className="flex items-center gap-3">
                  {/* Avatar Stack */}
                  <div className="flex -space-x-2">
                    {event.joinedAvatars.map((url, idx) => (
                      <img 
                        key={idx} 
                        src={url} 
                        referrerPolicy="no-referrer"
                        className="w-8 h-8 rounded-full border-2 border-white shadow-sm" 
                      />
                    ))}
                    <div className="w-8 h-8 rounded-full border-2 border-white bg-white flex items-center justify-center">
                       <span className="text-[10px] text-gray-400">...</span>
                    </div>
                  </div>
                  {/* Text */}
                  <span className="text-xs text-slate-500 font-medium">已有5位同频伙伴加入</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 4. My Sovereign Talent Projects (我的主权天赋项目进展) - Now THIRD content section */}
      <section className="px-6 mb-10">
        <div className="mb-4 flex justify-between items-end">
          <div>
            <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
               我的主权天赋项目进展 <Crown size={16} className="text-yellow-500 fill-yellow-500" />
            </h2>
            <p className="text-[10px] uppercase tracking-widest text-slate-400 font-bold mt-0.5">Sovereign Assets</p>
          </div>
        </div>

        <div 
          className="relative aspect-[16/10] w-full rounded-[32px] overflow-hidden shadow-xl group border border-yellow-100 cursor-pointer hover:shadow-2xl transition-all"
          onClick={() => onOpenDetail(sovereignProject, 'project')}
        >
          {/* Background Image */}
          <img 
            src={sovereignProject.image} 
            alt={sovereignProject.title} 
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105" 
          />
          
          {/* Dark Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>

          {/* Top Tags */}
          <div className="absolute top-5 left-5 flex gap-2">
             <div className="bg-yellow-400 text-black px-3 py-1 rounded-full text-[10px] font-bold shadow-lg flex items-center gap-1">
                <Crown size={10} fill="currentColor" />
                主理人
             </div>
             <div className="bg-black/50 backdrop-blur-md text-white border border-white/20 px-3 py-1 rounded-full text-[10px] font-bold">
                权益 51%
             </div>
          </div>

          {/* Bottom Content */}
          <div className="absolute bottom-0 left-0 right-0 p-5">
             <div className="flex items-center gap-1 text-yellow-300 text-[10px] font-bold mb-1 uppercase tracking-wider">
                <MapPin size={10} /> {sovereignProject.location}
             </div>
             <h3 className="text-xl font-bold text-white mb-4 leading-tight">{sovereignProject.title.split('·')[0]}</h3>
             
             {/* Asset Stats */}
             <div className="bg-white/10 backdrop-blur-md border border-white/10 rounded-2xl p-3 flex justify-between items-center">
                <div className="flex-1 border-r border-white/10 pr-4">
                   <p className="text-[10px] text-gray-300 mb-0.5">项目当前估值</p>
                   <p className="text-sm font-bold text-white">¥ 4,500w</p>
                </div>
                <div className="flex-1 pl-4">
                   <p className="text-[10px] text-gray-300 mb-0.5">本季度分红</p>
                   <p className="text-sm font-bold text-green-400 flex items-center gap-1">
                     <TrendingUp size={12} /> +12.5%
                   </p>
                </div>
                <div className="pl-4">
                   <div className="w-8 h-8 rounded-full bg-white text-black flex items-center justify-center">
                      <ArrowRight size={14} />
                   </div>
                </div>
             </div>
          </div>
        </div>
      </section>

      {/* 5. Collective Wisdom (我还能支持谁) - Now FOURTH content section, Standardized Aspect Ratio */}
      <section className="px-6 mb-12">
        <div className="mb-4 flex justify-between items-end">
          <div>
            <h2 className="text-lg font-bold text-slate-900">我还能支持谁（集体智慧）？</h2>
            <p className="text-[10px] uppercase tracking-widest text-slate-400 font-bold mt-0.5">Collective Wisdom</p>
          </div>
          <button 
            onClick={() => onNavigate('explore')}
            className="text-xs font-bold text-slate-400 flex items-center hover:text-primary transition-colors bg-white/50 px-2 py-1 rounded-full"
          >
            查看更多 <ChevronRight size={14} />
          </button>
        </div>

        <div className="flex flex-col gap-6">
          {/* Display Project 3 (Happy Clinic) and Project 5 (High Dim Game) explicitly */}
          {[INSPIRATION_PROJECTS[2], INSPIRATION_PROJECTS[4]].filter(Boolean).map((project) => (
            <div 
              key={project.id}
              className="relative aspect-[4/3] w-full rounded-[32px] overflow-hidden shadow-xl group cursor-pointer" 
              onClick={() => onOpenDetail(project, 'project')}
            >
              {/* Background Image */}
              <img 
                src={project.image} 
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105" 
              />
              
              {/* Dark Gradient Overlay */}
              <div className="absolute inset-0 bg-black/10 group-hover:bg-black/20 transition-colors"></div>

              {/* Top Tag */}
              <div className="absolute top-6 left-6">
                <div className="bg-white/20 backdrop-blur-md border border-white/30 text-white px-4 py-1.5 rounded-full text-xs font-bold tracking-wide shadow-lg">
                  共建招募 · {project.location.split(',')[1] || project.location}
                </div>
              </div>

              {/* Middle/Bottom Content */}
              <div className="absolute inset-0 flex flex-col justify-end p-6 pb-8">
                {/* Title */}
                <h3 className="text-2xl font-bold text-white mb-6 leading-tight drop-shadow-md tracking-tight">
                  {project.title.split('·')[1] || project.title}
                </h3>

                {/* Description Box with Orange Accent */}
                <div className="bg-black/30 backdrop-blur-md border-l-4 border-primary rounded-r-2xl p-4 mb-6">
                  <p className="text-sm leading-relaxed text-white/90 line-clamp-2">
                    <span className="text-primary font-bold mr-1">@{project.leader?.name || user.nickname}</span>
                    {project.description ? project.description : `这里的自然光影缺一个懂 ${user.tags[0]} 的我，等我来定义。`}
                  </p>
                </div>

                {/* Main CTA Button */}
                <button className="w-full bg-primary hover:bg-orange-500 text-white font-bold h-14 rounded-full flex items-center justify-center gap-2 shadow-lg shadow-orange-900/20 transition-all active:scale-95 text-sm tracking-wide">
                  以天赋入股 / 共建
                  <ArrowRight size={18} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

    </div>
  );
};