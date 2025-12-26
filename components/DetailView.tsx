import React, { useState } from 'react';
import { X, MapPin, Sparkles, Clock, Crown, Zap, TrendingUp, Users, ArrowRight, Heart, Share2, Calendar, Star, ShoppingBag, Ticket, Loader2, CheckCircle2 } from 'lucide-react';

interface DetailViewProps {
  item: any;
  onClose: () => void;
  type: 'service' | 'project' | 'life' | 'event';
  onOpenHostProfile: (host: any) => void;
}

export const DetailView: React.FC<DetailViewProps> = ({ item, onClose, type, onOpenHostProfile }) => {
  const [actionStatus, setActionStatus] = useState<'idle' | 'loading' | 'success'>('idle');

  if (!item) return null;

  // --- Data Normalization Helpers ---
  const getHeaderImage = () => item.image;
  const getTitle = () => item.title || item.serviceTitle;
  
  const getSubTitle = () => {
    if (type === 'project') return "高维共建项目";
    if (type === 'service') return item.category ? `${item.category} · 能量疗愈` : '专业咨询';
    if (type === 'life' && item.type === 'Good') return "灵感好物";
    return "社交活动";
  };
  
  const getPriceDisplay = () => {
    if (type === 'project') return { label: '当前估值', value: `¥${(item.assets?.[0]?.value || 45000).toLocaleString()}` };
    if (item.price === 'Free' || item.price === 0 || item.price === '免费组队') return { label: '费用', value: 'Free' };
    if (item.price === undefined) return { label: '', value: '' };
    return { label: '价格', value: typeof item.price === 'number' ? `¥${item.price}` : item.price };
  };

  const getAvatar = () => {
    if (type === 'project') return item.leader?.avatar;
    if (type === 'service') return item.providerAvatar;
    return item.hostAvatar;
  };

  const getName = () => {
    if (type === 'project') return item.leader?.name;
    if (type === 'service') return item.providerName;
    return item.hostName;
  };

  const getRole = () => {
    if (type === 'project') return '发起人';
    if (type === 'service') return '导师';
    return '主理人';
  };

  const getHostData = () => {
    return {
      name: getName(),
      avatar: getAvatar(),
      role: getRole(),
      location: item.location
    };
  };

  // Dynamic Button Config
  const getActionConfig = () => {
    switch (type) {
      case 'service': 
        return { 
          label: '立即预约时段', 
          successLabel: '预约成功！',
          icon: Calendar, 
          color: 'bg-gray-900',
          successColor: 'bg-green-600'
        };
      case 'project': 
        return { 
          label: '以天赋入股', 
          successLabel: '申请已发送',
          icon: Crown, 
          color: 'bg-primary', // Orange
          successColor: 'bg-green-600'
        }; 
      case 'event': 
        return { 
          label: '抢占席位', 
          successLabel: '门票已出票',
          icon: Ticket, 
          color: 'bg-gray-900',
          successColor: 'bg-green-600'
        };
      case 'life': 
        return item.type === 'Good' 
          ? { label: '立即购买', successLabel: '已加入订单', icon: ShoppingBag, color: 'bg-gray-900', successColor: 'bg-green-600' }
          : { label: '加入聚会', successLabel: '报名成功', icon: Users, color: 'bg-gray-900', successColor: 'bg-green-600' };
      default: 
        return { 
          label: '查看详情', 
          successLabel: '完成',
          icon: ArrowRight, 
          color: 'bg-gray-900',
          successColor: 'bg-gray-900'
        };
    }
  };

  const action = getActionConfig();
  const priceInfo = getPriceDisplay();

  const handleActionClick = () => {
    if (actionStatus !== 'idle') return;
    setActionStatus('loading');
    // Simulate API call
    setTimeout(() => {
      setActionStatus('success');
    }, 1500);
  };

  return (
    <div className="fixed inset-0 z-[9999] flex flex-col bg-white animate-in slide-in-from-bottom-10 duration-300 sm:max-w-md sm:mx-auto">
      
      {/* 1. Immersive Header Image Area */}
      <div className="relative h-[45vh] w-full flex-shrink-0 group">
        <img 
          src={getHeaderImage()} 
          className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/60"></div>
        
        {/* Navigation Bar */}
        <div className="absolute top-0 left-0 right-0 p-4 pt-14 flex justify-between items-start z-20">
           <button 
             onClick={onClose}
             className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-md border border-white/30 flex items-center justify-center text-white hover:bg-white/40 transition-colors active:scale-90 duration-200"
           >
             <X size={20} />
           </button>
           <div className="flex gap-2">
             <button className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-md border border-white/30 flex items-center justify-center text-white hover:bg-white/40 transition-colors">
               <Heart size={18} />
             </button>
             <button className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-md border border-white/30 flex items-center justify-center text-white hover:bg-white/40 transition-colors">
               <Share2 size={18} />
             </button>
           </div>
        </div>

        {/* Title Overlay */}
        <div className="absolute bottom-0 left-0 right-0 p-6 pb-12">
           <div className="inline-flex items-center gap-1.5 bg-white/20 backdrop-blur-md border border-white/20 rounded-full px-3 py-1 mb-3">
              <Sparkles size={12} className="text-yellow-300 fill-current" />
              <span className="text-white text-xs font-bold tracking-wide">{getSubTitle()}</span>
           </div>
           
           <h1 className="text-3xl font-bold text-white leading-tight mb-2 drop-shadow-lg">
             {getTitle()}
           </h1>
           
           {/* Location/Tag Row */}
           <div className="flex items-center gap-3 text-white/90 text-sm font-medium">
              {item.location && (
                 <span className="flex items-center gap-1"><MapPin size={14} /> {item.location.split('·')[1] || item.location}</span>
              )}
              {(item.time || type === 'service') && (
                 <span className="flex items-center gap-1 text-white/60">|</span>
              )}
              {type === 'service' ? (
                  <span className="flex items-center gap-1"><Clock size={14} /> 60 mins</span>
              ) : item.time && (
                  <span className="flex items-center gap-1"><Clock size={14} /> {item.time}</span>
              )}
           </div>
        </div>
      </div>

      {/* 2. Content Scroll Area (Overlapping Card) */}
      <div className="flex-1 overflow-y-auto bg-[#F5F7FA] -mt-8 rounded-t-[32px] relative z-10 px-5 pt-8 pb-32">
        
        {/* Center Grab Handle (Visual Cue) */}
        <div className="w-12 h-1 bg-gray-300 rounded-full mx-auto mb-6 opacity-50"></div>

        {/* Fun Info Grid (Capsules) */}
        <div className="flex gap-3 mb-6 overflow-x-auto scrollbar-hide pb-2">
            <div className="flex-shrink-0 bg-white border border-gray-100 shadow-sm rounded-2xl p-3 min-w-[100px] flex flex-col items-center justify-center gap-1">
                <Zap size={18} className="text-primary mb-1" />
                <span className="text-[10px] text-gray-400 font-bold uppercase">能量指数</span>
                <span className="text-sm font-bold text-gray-800">High Vibe</span>
            </div>
            {/* Show WonderPoints if available, even for mapped events like Zumba/Golf which now have rewardPoints */}
            {(item.pointsGift || item.rewardPoints) && (
                <div className="flex-shrink-0 bg-white border border-gray-100 shadow-sm rounded-2xl p-3 min-w-[100px] flex flex-col items-center justify-center gap-1">
                    <Star size={18} className="text-purple-500 mb-1" />
                    <span className="text-[10px] text-gray-400 font-bold uppercase">WonderPoints</span>
                    <span className="text-sm font-bold text-gray-800">+{item.pointsGift || item.rewardPoints}</span>
                </div>
            )}
             {type === 'project' && (
                <div className="flex-shrink-0 bg-white border border-gray-100 shadow-sm rounded-2xl p-3 min-w-[100px] flex flex-col items-center justify-center gap-1">
                    <TrendingUp size={18} className="text-green-600 mb-1" />
                    <span className="text-[10px] text-gray-400 font-bold uppercase">回报率</span>
                    <span className="text-sm font-bold text-gray-800">Top 5%</span>
                </div>
            )}
            <div className="flex-shrink-0 bg-white border border-gray-100 shadow-sm rounded-2xl p-3 min-w-[100px] flex flex-col items-center justify-center gap-1">
                <Users size={18} className="text-blue-500 mb-1" />
                <span className="text-[10px] text-gray-400 font-bold uppercase">参与人数</span>
                <span className="text-sm font-bold text-gray-800">128+</span>
            </div>
        </div>

        {/* Host "Invite" Section - Card Style */}
        <div 
          onClick={() => onOpenHostProfile(getHostData())}
          className="bg-white rounded-[24px] p-5 mb-6 flex gap-4 items-start relative overflow-hidden group cursor-pointer shadow-sm border border-white/50 active:scale-[0.98] transition-transform"
        >
            {/* Decorative BG */}
            <div className="absolute top-0 right-0 w-24 h-24 bg-primary/5 rounded-full blur-2xl -mr-8 -mt-8"></div>

            <div className="relative">
                <img src={getAvatar()} className="w-14 h-14 rounded-full border-2 border-white shadow-md object-cover" referrerPolicy="no-referrer" />
                <div className="absolute -bottom-2 -right-1 bg-gray-900 text-white text-[9px] font-bold px-2 py-0.5 rounded-full border border-white">
                    {getRole()}
                </div>
            </div>
            <div className="flex-1 z-10">
                <p className="text-xs text-gray-400 mb-1 font-bold uppercase tracking-wider">来自 {getName()} 的邀请</p>
                <div className="text-sm text-gray-800 font-medium leading-relaxed italic relative">
                    <span className="text-primary text-xl leading-none mr-1">"</span>
                    {(item.description || "欢迎来到这个独特的体验空间，期待与你共频共振。").substring(0, 60)}...
                    <span className="text-primary text-xl leading-none ml-1">"</span>
                </div>
                <button className="text-[10px] font-bold text-primary mt-2 flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                    查看完整主页 <ArrowRight size={10} />
                </button>
            </div>
        </div>

        {/* Description & Tags - Card Style */}
        <div className="bg-white rounded-[24px] p-6 shadow-sm border border-white/50 mb-6">
            <h3 className="text-base font-bold text-gray-900 mb-4 flex items-center gap-2">
              <span className="w-1 h-5 bg-primary rounded-full"></span>
              详情介绍
            </h3>
            <p className="text-gray-600 leading-7 text-sm whitespace-pre-line text-justify mb-6">
              {item.description || "这是一个充满魔力的体验，专为追求生活品质与精神共鸣的你打造。在这里，我们不仅交换价值，更交换能量。"}
              <br/><br/>
              加入我们，链接全球高维智慧网络，开启属于你的无限可能。
            </p>
            
            {/* Visual Tags */}
            <div className="flex flex-wrap gap-2">
              {(item.tags || [item.tag]).map((tag: string, i: number) => (
                 <span key={i} className="px-3 py-1.5 bg-gray-50 text-gray-600 rounded-lg text-xs font-bold border border-gray-100">
                    # {tag}
                 </span>
              ))}
            </div>
        </div>

      </div>

      {/* 3. Enhanced Fixed Bottom Action Bar */}
      <div className="absolute bottom-0 left-0 right-0 bg-white/90 backdrop-blur-xl border-t border-gray-100 px-6 py-4 pb-8 flex items-center gap-6 shadow-[0_-10px_40px_rgba(0,0,0,0.05)] z-20">
         
         {/* Price / Value Display */}
         <div className="flex flex-col min-w-[30%]">
            <span className="text-[10px] text-gray-400 font-bold uppercase tracking-wider mb-0.5">{priceInfo.label}</span>
            <div className="flex items-baseline gap-1">
                <span className="text-2xl font-black text-gray-900 tracking-tight">{priceInfo.value}</span>
                {type === 'project' && <span className="text-xs font-bold text-green-500 bg-green-50 px-1.5 py-0.5 rounded">Trending</span>}
            </div>
         </div>

         {/* Big Fun Interactive Button */}
         <button 
           onClick={handleActionClick}
           disabled={actionStatus !== 'idle'}
           className={`flex-1 ${actionStatus === 'success' ? action.successColor : action.color} text-white font-bold h-14 rounded-full shadow-lg hover:shadow-xl hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-2 group relative overflow-hidden disabled:opacity-90 disabled:cursor-not-allowed`}
         >
            {/* Shine effect (only when idle) */}
            {actionStatus === 'idle' && (
              <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:animate-[shimmer_1.5s_infinite]"></div>
            )}
            
            {actionStatus === 'loading' ? (
              <Loader2 size={20} className="animate-spin" />
            ) : actionStatus === 'success' ? (
              <CheckCircle2 size={20} className="animate-in zoom-in spin-in-90 duration-300" />
            ) : (
              <action.icon size={20} className="group-hover:rotate-12 transition-transform duration-300" />
            )}
            
            <span className="text-base tracking-wide relative z-10 animate-in fade-in duration-200">
              {actionStatus === 'loading' ? 'Processing...' : actionStatus === 'success' ? action.successLabel : action.label}
            </span>
         </button>
      </div>

    </div>
  );
};