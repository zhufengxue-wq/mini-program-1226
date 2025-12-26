import React, { useState } from 'react';
import { ServiceItem, Order } from '../types';
import { X, ArrowLeft, Settings, Users, DollarSign, Star, Calendar, CheckCircle2, QrCode, Share2, TrendingUp, Clock, MapPin } from 'lucide-react';

interface ProviderDashboardProps {
  service: ServiceItem;
  onClose: () => void;
}

export const ProviderDashboard: React.FC<ProviderDashboardProps> = ({ service, onClose }) => {
  const [activeTab, setActiveTab] = useState<'orders' | 'stats'>('orders');
  
  // Mock logic to handle order completion
  const [orders, setOrders] = useState<Order[]>(service.orders || []);

  const handleCompleteOrder = (orderId: string) => {
    const updatedOrders = orders.map(o => 
      o.id === orderId ? { ...o, status: 'completed' } as Order : o
    );
    setOrders(updatedOrders);
  };

  const totalIncome = orders.reduce((acc, curr) => acc + curr.income, 0);
  const completedCount = orders.filter(o => o.status === 'completed').length;

  return (
    <div className="fixed inset-0 z-[10000] flex flex-col bg-gray-50 animate-in slide-in-from-right-10 duration-300 sm:max-w-md sm:mx-auto">
      
      {/* 1. Header Area (Service Context) */}
      <div className="bg-white px-6 pt-14 pb-6 border-b border-gray-100 shadow-sm relative">
        <div className="flex justify-between items-center mb-6">
           <button 
             onClick={onClose}
             className="w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center text-gray-600 hover:bg-gray-100 transition-colors"
           >
             <ArrowLeft size={20} />
           </button>
           <span className="text-xs font-bold text-gray-400 uppercase tracking-widest">主理人控制台</span>
           <button className="w-10 h-10 rounded-full flex items-center justify-center text-gray-400 hover:text-gray-900 transition-colors">
             <Settings size={20} />
           </button>
        </div>

        <div className="flex gap-4">
           <img src={service.image} className="w-20 h-20 rounded-2xl object-cover shadow-md" referrerPolicy="no-referrer" />
           <div className="flex-1 min-w-0 py-1">
              <div className="flex items-center gap-2 mb-1">
                 <span className="bg-green-100 text-green-700 text-[10px] px-2 py-0.5 rounded font-bold">运行中</span>
                 <span className="text-[10px] text-gray-400">ID: {service.id}</span>
              </div>
              <h1 className="text-lg font-bold text-gray-900 leading-tight truncate mb-2">{service.serviceTitle}</h1>
              <div className="flex items-center gap-4 text-xs font-medium text-gray-500">
                 <span className="flex items-center gap-1"><Star size={12} className="text-orange-400 fill-orange-400" /> 4.9</span>
                 <span className="flex items-center gap-1"><DollarSign size={12} /> ¥{service.price}/次</span>
              </div>
           </div>
        </div>
      </div>

      {/* 2. Stats Dashboard (Quick View) */}
      <div className="p-6 pb-2">
         <div className="grid grid-cols-2 gap-4">
            <div className="bg-black text-white p-5 rounded-[24px] shadow-lg relative overflow-hidden">
               <div className="absolute top-0 right-0 w-16 h-16 bg-white/10 rounded-full -mr-8 -mt-8 blur-xl"></div>
               <div className="relative z-10">
                  <p className="text-[10px] text-white/60 font-bold uppercase tracking-wider mb-1">总收入 (CNY)</p>
                  <h2 className="text-2xl font-bold">¥{totalIncome.toLocaleString()}</h2>
                  <div className="mt-3 flex items-center gap-1 text-[10px] text-green-400 bg-white/10 w-fit px-2 py-0.5 rounded-full">
                     <TrendingUp size={10} /> +15% 本周
                  </div>
               </div>
            </div>
            <div className="bg-white p-5 rounded-[24px] shadow-sm border border-gray-100 flex flex-col justify-between">
               <div>
                  <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wider mb-1">服务人数</p>
                  <h2 className="text-2xl font-bold text-gray-900">{completedCount} <span className="text-sm text-gray-400 font-normal">/ {orders.length}</span></h2>
               </div>
               <div className="flex -space-x-2 mt-2">
                  {orders.slice(0,3).map((o, i) => (
                    <img key={i} src={o.buyerAvatar} className="w-6 h-6 rounded-full border border-white" />
                  ))}
               </div>
            </div>
         </div>
      </div>

      {/* 3. Action Tabs */}
      <div className="px-6 mt-4">
         <div className="bg-gray-200 p-1 rounded-full flex">
            <button 
              onClick={() => setActiveTab('orders')}
              className={`flex-1 py-2 rounded-full text-xs font-bold transition-all ${activeTab === 'orders' ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-500'}`}
            >
               订单管理 ({orders.filter(o => o.status === 'paid').length})
            </button>
            <button 
              onClick={() => setActiveTab('stats')}
              className={`flex-1 py-2 rounded-full text-xs font-bold transition-all ${activeTab === 'stats' ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-500'}`}
            >
               服务数据
            </button>
         </div>
      </div>

      {/* 4. Order List */}
      <div className="flex-1 overflow-y-auto px-6 py-4 pb-24">
         {activeTab === 'orders' && (
           <div className="space-y-4">
              <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">待服务 / 进行中</h3>
              
              {orders.filter(o => o.status === 'paid').map(order => (
                 <div key={order.id} className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100 flex flex-col gap-3">
                    <div className="flex items-center justify-between">
                       <div className="flex items-center gap-3">
                          <img src={order.buyerAvatar} className="w-10 h-10 rounded-full bg-gray-100" />
                          <div>
                             <p className="text-sm font-bold text-gray-900">{order.buyerName}</p>
                             <div className="flex items-center gap-1 text-[10px] text-green-600 bg-green-50 px-1.5 py-0.5 rounded mt-0.5">
                                <CheckCircle2 size={10} /> 已支付
                             </div>
                          </div>
                       </div>
                       <div className="text-right">
                          <p className="text-sm font-bold text-gray-900">¥{order.income}</p>
                          <p className="text-[10px] text-gray-400">Order #{order.id.slice(-4)}</p>
                       </div>
                    </div>
                    
                    <div className="bg-gray-50 rounded-xl p-3 flex items-center justify-between">
                        <div className="flex items-center gap-2 text-xs text-gray-600">
                           <Clock size={14} className="text-primary" />
                           <span className="font-bold">{order.timeSlot}</span>
                        </div>
                        <div className="flex items-center gap-2 text-xs text-gray-400">
                           <MapPin size={14} /> 深圳 · 练习场
                        </div>
                    </div>

                    <div className="flex gap-2 mt-1">
                       <button className="flex-1 bg-gray-100 text-gray-600 py-2.5 rounded-xl text-xs font-bold hover:bg-gray-200 transition-colors">
                          联系学员
                       </button>
                       <button 
                         onClick={() => handleCompleteOrder(order.id)}
                         className="flex-1 bg-gray-900 text-white py-2.5 rounded-xl text-xs font-bold hover:bg-black transition-colors flex items-center justify-center gap-2"
                       >
                          <QrCode size={14} /> 核销 / 开始
                       </button>
                    </div>
                 </div>
              ))}

              <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest mt-6 mb-2">历史订单</h3>
              {orders.filter(o => o.status === 'completed').map(order => (
                  <div key={order.id} className="bg-white p-4 rounded-2xl border border-gray-100 opacity-60">
                    <div className="flex items-center justify-between">
                       <div className="flex items-center gap-3">
                          <img src={order.buyerAvatar} className="w-10 h-10 rounded-full bg-gray-100 grayscale" />
                          <div>
                             <p className="text-sm font-bold text-gray-700">{order.buyerName}</p>
                             <p className="text-[10px] text-gray-400">已完成 · {order.timeSlot}</p>
                          </div>
                       </div>
                       <span className="text-sm font-bold text-gray-400">¥{order.income}</span>
                    </div>
                 </div>
              ))}
           </div>
         )}
         
         {activeTab === 'stats' && (
            <div className="flex flex-col items-center justify-center h-48 text-gray-400">
               <TrendingUp size={48} className="mb-4 opacity-20" />
               <p className="text-sm font-bold">更多数据分析功能开发中...</p>
            </div>
         )}
      </div>

      {/* 5. Fixed Action Bar */}
      <div className="absolute bottom-0 left-0 right-0 bg-white border-t border-gray-100 px-6 py-4 pb-8 flex items-center gap-4 shadow-[0_-10px_40px_rgba(0,0,0,0.05)]">
         <button className="flex-1 h-12 rounded-full border border-gray-200 text-gray-900 font-bold flex items-center justify-center gap-2 hover:bg-gray-50 active:scale-95 transition-all">
             <Share2 size={18} /> 分享服务链接
         </button>
      </div>

    </div>
  );
};