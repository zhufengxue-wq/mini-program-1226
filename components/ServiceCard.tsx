import React from 'react';
import { ServiceItem } from '../types';

interface ServiceCardProps {
  service: ServiceItem;
}

export const ServiceCard: React.FC<ServiceCardProps> = ({ service }) => {
  return (
    <div className="bg-white rounded-2xl p-4 shadow-sm mb-4 flex items-center gap-4 transition-transform active:scale-[0.99] border border-gray-50 hover:shadow-md">
      {/* Left: Avatar */}
      <div className="flex-shrink-0 relative">
        <img
          src={service.providerAvatar}
          alt={service.providerName}
          className="w-16 h-16 rounded-full object-cover border-2 border-white shadow-sm"
        />
        <div className="absolute -bottom-1 -right-1 bg-secondary text-white text-[10px] px-1.5 py-0.5 rounded-full">
          PRO
        </div>
      </div>

      {/* Right: Content */}
      <div className="flex-1 min-w-0">
        <div className="flex justify-between items-start mb-1">
          <h3 className="font-bold text-gray-800 text-sm leading-tight truncate pr-2">
            {service.serviceTitle}
          </h3>
          <span className="text-primary font-bold text-sm whitespace-nowrap">
            ${service.price}
          </span>
        </div>
        
        <p className="text-xs text-gray-500 mb-2 truncate">{service.providerName}</p>
        
        <div className="flex justify-between items-end">
          <div className="flex gap-1 flex-wrap">
            {service.tags.map((tag, idx) => (
              <span key={idx} className="bg-orange-50 text-orange-600 text-[10px] px-2 py-0.5 rounded-md font-medium">
                {tag}
              </span>
            ))}
          </div>
          
          <button className="bg-primary text-white text-xs px-3 py-1.5 rounded-full font-medium shadow-sm hover:bg-orange-600 transition-colors">
            Book Now
          </button>
        </div>
      </div>
    </div>
  );
};