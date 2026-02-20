"use client";

import { useState, useEffect } from "react";

interface EventCardProps {
  event: {
    _id: string;
    title: string;
    description: string;
    location: string;
    eventDate: string;
    image?: string;
  };
  index: number;
}

export default function EventCard({ event, index }: EventCardProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  // Inject keyframe animation styles once
  useEffect(() => {
    if (typeof document !== 'undefined') {
      const styleId = 'fadeInUp-animation';
      if (!document.getElementById(styleId)) {
        const style = document.createElement('style');
        style.id = styleId;
        style.textContent = `
          @keyframes fadeInUp {
            from {
              opacity: 0;
              transform: translateY(30px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }
        `;
        document.head.appendChild(style);
      }
    }
  }, []);
  
  return (
    <div
      className="group relative bg-gradient-to-br from-[#1a1a1a] to-[#0a0a0a] rounded-3xl overflow-hidden border border-white/5 hover:border-[#f4b518]/30 transition-all duration-500 hover:shadow-[0_0_40px_rgba(244,181,24,0.15)] hover:scale-[1.02]"
      style={{
        animation: `fadeInUp 0.6s ease-out ${index * 0.1}s both`,
      }}
    >
      {/* Decorative Corner Accent */}
      <div className="absolute top-0 right-0 w-20 h-20 bg-[#f4b518]/10 rounded-bl-full opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

      {/* Event Image */}
      {event.image && (
        <div className="relative w-full aspect-[4/3] overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent z-10" />
          <img
            src={event.image}
            alt={event.title}
            className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-110 transition-all duration-700"
          />
          
          {/* Completed Badge */}
          <div className="absolute top-4 left-4 z-20">
            <span className="bg-[#f4b518] text-black px-3 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider flex items-center gap-1.5">
              <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
              Completed
            </span>
          </div>
        </div>
      )}

      {/* Event Content */}
      <div className="p-6 md:p-7 lg:p-8 space-y-4 md:space-y-5 relative z-10">
        <div className="space-y-3">
          <h2 className="text-xl md:text-2xl font-black uppercase tracking-tight leading-tight text-white group-hover:text-[#f4b518] transition-colors duration-300">
            {event.title}
          </h2>
          
          <div className="w-16 h-0.5 bg-[#f4b518] rounded-full" />
        </div>

        <div className="space-y-3">
          <p className={`text-sm md:text-base text-gray-400 leading-relaxed font-light transition-all duration-300 ${
            isExpanded ? '' : 'line-clamp-3'
          }`}>
            {event.description}
          </p>
          
          {event.description && event.description.length > 150 && (
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className="text-[#f4b518] text-sm font-semibold hover:text-[#f4b518]/80 transition-colors flex items-center gap-1.5 group/btn"
            >
              <span>{isExpanded ? 'Show Less' : 'View More'}</span>
              <svg 
                className={`w-4 h-4 transition-transform duration-300 ${isExpanded ? 'rotate-180' : ''}`} 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
          )}
        </div>

        {/* Event Details */}
        <div className="space-y-2.5 pt-2">
          <div className="flex items-center gap-3 text-sm md:text-base">
            <div className="w-8 h-8 rounded-full bg-[#f4b518]/10 flex items-center justify-center flex-shrink-0">
              <svg className="w-4 h-4 text-[#f4b518]" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
              </svg>
            </div>
            <span className="text-gray-300 font-medium">{event.location}</span>
          </div>

          <div className="flex items-center gap-3 text-sm md:text-base">
            <div className="w-8 h-8 rounded-full bg-[#f4b518]/10 flex items-center justify-center flex-shrink-0">
              <svg className="w-4 h-4 text-[#f4b518]" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
              </svg>
            </div>
            <span className="text-gray-300 font-medium">
              {new Date(event.eventDate).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
              })}
            </span>
          </div>
        </div>

        {/* Archive Label */}
        <div className="pt-4 mt-4 border-t border-white/5">
          <div className="flex items-center gap-2 text-xs md:text-sm text-gray-500 font-semibold uppercase tracking-wider">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4" />
            </svg>
            Archived Event
          </div>
        </div>
      </div>
    </div>
  );
}