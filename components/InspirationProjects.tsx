import React from 'react';
import { INSPIRATION_PROJECTS, USER_PROFILE } from '../services/mockData';
import { Users, TrendingUp, Sparkles, MapPin, Zap, Crown, ShieldCheck, ArrowRight } from 'lucide-react';

export const InspirationProjects: React.FC = () => {
  return (
    <div className="min-h-full bg-bgLight pb-24">
      {/* Header - Minimalist & High End */}
      <div className="bg-white/90 px-6 pt-14 pb-4 sticky top-0 z-10 border-b border-gray-100 backdrop-blur-md">
        <div className="flex justify-between items-end">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-2 tracking-tight">
              灵感经济
            </h1>
            <p className="text-xs text-slate-500 mt-1.5 font-medium tracking-wide leading-relaxed">
              发挥天赋参与项目，或发起愿景召集伙伴。<br/>
              <span className="text-primary flex items-center gap-1 mt-0.5">
                <ShieldCheck size={10} /> 联盟会员发起 · 51% 个人主权掌控
              </span>
            </p>
          </div>
          <button className="bg-gray-900 text-white text-xs font-bold px-4 py-2 rounded-lg hover:bg-black transition-colors shadow-lg shadow-gray-200">
             发起共创
          </button>
        </div>
      </div>

      <div className="px-5 py-6 space-y-8">
        {INSPIRATION_PROJECTS.map((project) => (
          <div 
            key={project.id} 
            className="relative h-[480px] w-full rounded-[32px] overflow-hidden shadow-xl group border border-gray-100"
          >
             {/* Background Image */}
            <img 
              src={project.image} 
              alt={project.title} 
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105" 
            />
            
            {/* Dark Gradient Overlay */}
            <div className="absolute inset-0 bg-black/10 transition-colors"></div>

            {/* Top Tag */}
            <div className="absolute top-6 left-6">
              <div className="bg-white/20 backdrop-blur-md border border-white/30 text-white px-4 py-1.5 rounded-full text-xs font-bold tracking-wide shadow-lg flex items-center gap-1">
                 <Crown size={12} className="text-yellow-300 fill-current" />
                 共建招募 · {project.location.split(',')[1] || project.location}
              </div>
            </div>

            {/* Top Right Progress */}
             <div className="absolute top-6 right-6">
                <div className="bg-black/40 backdrop-blur-md text-white px-3 py-1 rounded-full text-[10px] font-bold border border-white/10">
                   进度 {project.progress}%
                </div>
             </div>

            {/* Middle/Bottom Content */}
            <div className="absolute inset-0 flex flex-col justify-end p-6 pb-8">
              {/* Title */}
              <h3 className="text-3xl font-bold text-white mb-6 leading-tight drop-shadow-md tracking-tight">
                 {project.title.split('·')[1] || project.title}
              </h3>

              {/* Description Box with Orange Accent */}
              <div className="bg-black/30 backdrop-blur-md border-l-4 border-primary rounded-r-2xl p-4 mb-6">
                <p className="text-sm leading-relaxed text-white/90 line-clamp-2">
                  <span className="text-primary font-bold mr-1">@{project.leader.name}</span>
                  {project.description}
                </p>
                
                {/* Tags inside description box */}
                {project.tags && (
                  <div className="flex gap-2 mt-3">
                    {project.tags.map((tag, i) => (
                      <span key={i} className="text-[10px] text-white/80 bg-white/10 px-2 py-0.5 rounded">
                        #{tag}
                      </span>
                    ))}
                  </div>
                )}
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
    </div>
  );
};