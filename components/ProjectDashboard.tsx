import React, { useState } from 'react';
import { Project, Investor } from '../types';
import { X, ArrowLeft, Settings, Crown, TrendingUp, Users, Calendar, MapPin, Building2, Wallet, Plus, ArrowUpRight, CheckCircle2 } from 'lucide-react';

interface ProjectDashboardProps {
  project: Project;
  onClose: () => void;
}

export const ProjectDashboard: React.FC<ProjectDashboardProps> = ({ project, onClose }) => {
  const [activeTab, setActiveTab] = useState<'shareholders' | 'progress'>('shareholders');
  const [investors, setInvestors] = useState<Investor[]>(project.investors || []);

  const handleApproveInvestor = (id: string) => {
    const updated = investors.map(inv => 
        inv.id === id ? { ...inv, status: 'active' as const } : inv
    );
    setInvestors(updated);
  };

  return (
    <div className="fixed inset-0 z-[10000] flex flex-col bg-gray-50 animate-in slide-in-from-right-10 duration-300 sm:max-w-md sm:mx-auto">
      
      {/* 1. Header Area (Project Context - High End Real Estate Vibe) */}
      <div className="bg-white relative overflow-hidden">
        {/* Background Image with Overlay */}
        <div className="h-48 relative">
             <img src={project.image} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
             <div className="absolute inset-0 bg-black/40 backdrop-blur-[1px]"></div>
             
             {/* Top Nav */}
             <div className="absolute top-0 left-0 right-0 p-4 pt-14 flex justify-between items-start z-20">
                <button 
                    onClick={onClose}
                    className="w-10 h-10 rounded-full bg-black/20 backdrop-blur-md border border-white/20 flex items-center justify-center text-white hover:bg-black/40 transition-colors"
                >
                    <ArrowLeft size={20} />
                </button>
                <div className="bg-yellow-400 text-black px-3 py-1.5 rounded-full text-[10px] font-bold shadow-lg flex items-center gap-1">
                    <Crown size={12} fill="currentColor" />
                    <span className="uppercase tracking-wide">主理人视图</span>
                </div>
                <button className="w-10 h-10 rounded-full bg-black/20 backdrop-blur-md border border-white/20 flex items-center justify-center text-white hover:bg-black/40 transition-colors">
                    <Settings size={20} />
                </button>
             </div>

             {/* Asset Title */}
             <div className="absolute bottom-6 left-6 right-6 text-white">
                 <div className="flex items-center gap-2 mb-2 text-white/80 text-xs font-medium">
                     <span className="flex items-center gap-1 bg-white/10 px-2 py-0.5 rounded backdrop-blur-md border border-white/10">
                        <MapPin size={10} /> {project.location}
                     </span>
                     <span className="flex items-center gap-1 bg-white/10 px-2 py-0.5 rounded backdrop-blur-md border border-white/10">
                        <Building2 size={10} /> 共建项目
                     </span>
                 </div>
                 <h1 className="text-xl font-bold leading-tight text-shadow-sm">{project.title.split('·')[0]}</h1>
             </div>
        </div>
      </div>

      {/* 2. Financial & Asset Stats */}
      <div className="px-6 -mt-6 relative z-10">
         <div className="bg-white rounded-[24px] p-6 shadow-xl shadow-gray-200/50 border border-gray-100 grid grid-cols-2 gap-6">
            <div className="border-r border-gray-100 pr-4">
                <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wider mb-1">当前估值 (Valuation)</p>
                <div className="flex items-baseline gap-1">
                    <h2 className="text-2xl font-black text-gray-900">{project.valuation || '¥4,500w'}</h2>
                </div>
                <div className="flex items-center gap-1 mt-2 text-[10px] font-bold text-green-600 bg-green-50 px-2 py-0.5 rounded w-fit">
                    <TrendingUp size={10} /> +5.2% 季度
                </div>
            </div>
            <div className="pl-2">
                <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wider mb-1">预期年化 (Yield)</p>
                <h2 className="text-2xl font-black text-gray-900">{project.yieldRate || '8-12%'}</h2>
                <div className="flex items-center gap-1 mt-2 text-[10px] text-gray-400">
                    <Wallet size={10} /> {project.estReturn}
                </div>
            </div>
         </div>
      </div>

      {/* 3. Action Tabs */}
      <div className="px-6 mt-6">
         <div className="bg-gray-200 p-1 rounded-full flex">
            <button 
              onClick={() => setActiveTab('shareholders')}
              className={`flex-1 py-2 rounded-full text-xs font-bold transition-all ${activeTab === 'shareholders' ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-500'}`}
            >
               共建者管理 ({investors.length})
            </button>
            <button 
              onClick={() => setActiveTab('progress')}
              className={`flex-1 py-2 rounded-full text-xs font-bold transition-all ${activeTab === 'progress' ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-500'}`}
            >
               项目进度 ({project.progress}%)
            </button>
         </div>
      </div>

      {/* 4. Content Area */}
      <div className="flex-1 overflow-y-auto px-6 py-4 pb-24">
         
         {/* --- Tab: Shareholders / Investors --- */}
         {activeTab === 'shareholders' && (
           <div className="space-y-4">
              <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-2 flex justify-between items-center">
                  <span>股东名册</span>
                  <button className="text-primary flex items-center gap-1 bg-orange-50 px-2 py-1 rounded-lg hover:bg-orange-100 transition-colors">
                      <Plus size={12} /> 邀请
                  </button>
              </h3>
              
              {investors.map((inv) => (
                 <div key={inv.id} className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100 flex flex-col gap-3">
                    <div className="flex items-center justify-between">
                       <div className="flex items-center gap-3">
                          <img src={inv.avatar} className="w-10 h-10 rounded-full bg-gray-100 object-cover" />
                          <div>
                             <div className="flex items-center gap-2">
                                <p className="text-sm font-bold text-gray-900">{inv.name}</p>
                                {inv.status === 'active' ? (
                                    <CheckCircle2 size={12} className="text-green-500" />
                                ) : (
                                    <span className="text-[9px] bg-gray-100 text-gray-500 px-1.5 py-0.5 rounded font-bold">待确认</span>
                                )}
                             </div>
                             <p className="text-[10px] text-gray-500 font-medium">{inv.role}</p>
                          </div>
                       </div>
                       <div className="text-right">
                          <p className="text-lg font-black text-gray-900">{inv.equity}</p>
                          <p className="text-[9px] text-gray-400 uppercase tracking-wider">股权占比</p>
                       </div>
                    </div>
                    
                    <div className="bg-gray-50 rounded-xl p-3 flex items-center justify-between border border-gray-100">
                        <div className="flex items-center gap-2">
                           {inv.contributionType === 'Money' ? (
                               <div className="w-6 h-6 rounded-full bg-green-100 flex items-center justify-center text-green-600">
                                   <DollarSign size={12} />
                               </div>
                           ) : (
                               <div className="w-6 h-6 rounded-full bg-purple-100 flex items-center justify-center text-purple-600">
                                   <Crown size={12} />
                               </div>
                           )}
                           <div className="flex flex-col">
                               <span className="text-[9px] text-gray-400 uppercase font-bold">投入方式</span>
                               <span className="text-xs font-bold text-gray-700">
                                   {inv.contributionType === 'Money' ? '资金入股' : '天赋入股'}
                               </span>
                           </div>
                        </div>
                        <div className="text-right">
                             <span className="text-[9px] text-gray-400 uppercase font-bold">估值/金额</span>
                             <p className="text-xs font-bold text-gray-900">{inv.contributionValue}</p>
                        </div>
                    </div>

                    {inv.status === 'pending' && (
                        <button 
                            onClick={() => handleApproveInvestor(inv.id)}
                            className="w-full bg-black text-white py-2.5 rounded-xl text-xs font-bold hover:bg-gray-800 transition-colors mt-1"
                        >
                            确认权益归属
                        </button>
                    )}
                 </div>
              ))}
           </div>
         )}
         
         {/* --- Tab: Progress --- */}
         {activeTab === 'progress' && (
            <div className="space-y-6">
               <div className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100">
                   <div className="flex justify-between items-end mb-2">
                       <span className="text-xs font-bold text-gray-500">总体完成度</span>
                       <span className="text-2xl font-black text-primary">{project.progress}%</span>
                   </div>
                   <div className="w-full bg-gray-100 rounded-full h-2 overflow-hidden">
                       <div className="bg-primary h-full rounded-full transition-all duration-1000" style={{ width: `${project.progress}%` }}></div>
                   </div>
               </div>

               <div className="relative border-l-2 border-gray-200 ml-3 space-y-8 pl-6 py-2">
                   {/* Milestone 1 */}
                   <div className="relative">
                       <div className="absolute -left-[31px] w-4 h-4 rounded-full bg-green-500 border-2 border-white shadow-sm"></div>
                       <p className="text-[10px] text-gray-400 font-bold mb-1">2023.10.01</p>
                       <h4 className="text-sm font-bold text-gray-900">土地所有权确权完成</h4>
                       <p className="text-xs text-gray-500 mt-1">已获得印尼当地政府批准，签署长期租赁协议。</p>
                   </div>
                   {/* Milestone 2 */}
                   <div className="relative">
                       <div className="absolute -left-[31px] w-4 h-4 rounded-full bg-green-500 border-2 border-white shadow-sm"></div>
                       <p className="text-[10px] text-gray-400 font-bold mb-1">2023.12.15</p>
                       <h4 className="text-sm font-bold text-gray-900">概念设计方案定稿</h4>
                       <p className="text-xs text-gray-500 mt-1">由 @Alex 主导的 Bamboo Flow 概念方案已通过股东会表决。</p>
                   </div>
                    {/* Milestone 3 (Current) */}
                    <div className="relative">
                       <div className="absolute -left-[31px] w-4 h-4 rounded-full bg-white border-2 border-primary shadow-sm animate-pulse"></div>
                       <p className="text-[10px] text-primary font-bold mb-1">进行中</p>
                       <h4 className="text-sm font-bold text-gray-900">一期工程施工图绘制</h4>
                       <p className="text-xs text-gray-500 mt-1">需要结构工程师介入，正在招募中。</p>
                   </div>
               </div>
            </div>
         )}
      </div>

      {/* 5. Fixed Action Bar */}
      <div className="absolute bottom-0 left-0 right-0 bg-white border-t border-gray-100 px-6 py-4 pb-8 flex items-center gap-4 shadow-[0_-10px_40px_rgba(0,0,0,0.05)]">
         <button className="flex-1 h-12 rounded-full bg-gray-900 text-white font-bold flex items-center justify-center gap-2 hover:bg-black active:scale-95 transition-all shadow-lg">
             <ArrowUpRight size={18} /> 发布项目更新
         </button>
      </div>

    </div>
  );
};

// Helper for DollarSign since it was missing in imports in previous chunks but used here
const DollarSign = ({ size, className }: { size: number, className?: string }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><line x1="12" x2="12" y1="1" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>
);