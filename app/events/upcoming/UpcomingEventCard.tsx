"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

interface UpcomingEventCardProps {
  event: {
    _id: string;
    title: string;
    description: string;
    location: string;
    eventDate: string;
    registrationDeadline: string;
    image?: string;
  };
  index: number;
}

export default function UpcomingEventCard({ event, index }: UpcomingEventCardProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [timeLeft, setTimeLeft] = useState("");

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

  // Calculate time left until event
  useEffect(() => {
    const calculateTimeLeft = () => {
      const eventDate = new Date(event.eventDate);
      const now = new Date();
      const difference = eventDate.getTime() - now.getTime();

      if (difference > 0) {
        const days = Math.floor(difference / (1000 * 60 * 60 * 24));
        const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        
        if (days > 0) {
          setTimeLeft(`${days} day${days > 1 ? 's' : ''} left`);
        } else if (hours > 0) {
          setTimeLeft(`${hours} hour${hours > 1 ? 's' : ''} left`);
        } else {
          setTimeLeft('Starting soon');
        }
      } else {
        setTimeLeft('Event started');
      }
    };

    calculateTimeLeft();
    const interval = setInterval(calculateTimeLeft, 60000); // Update every minute

    return () => clearInterval(interval);
  }, [event.eventDate]);

  const isRegistrationOpen = new Date(event.registrationDeadline) >= new Date();
  
  return (
    <div
      className="group relative bg-gradient-to-br from-[#1a1a1a] to-[#0a0a0a] rounded-3xl overflow-hidden border border-white/5 hover:border-[#f4b518]/30 transition-all duration-500 hover:shadow-[0_0_40px_rgba(244,181,24,0.15)] hover:scale-[1.02] "
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
          
          {/* Countdown Badge */}
          <div className="absolute top-4 left-4 z-20">
            <span className="bg-[#f4b518] text-black px-3 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider flex items-center gap-1.5">
              <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
              </svg>
              {timeLeft}
            </span>
          </div>

          {/* Registration Status Badge */}
          {!isRegistrationOpen && (
            <div className="absolute top-4 right-4 z-20">
              <span className="bg-red-500 text-white px-3 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider">
                Closed
              </span>
            </div>
          )}
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

          {/* Registration Deadline */}
          <div className="flex items-center gap-3 text-sm md:text-base">
            <div className="w-8 h-8 rounded-full bg-[#f4b518]/10 flex items-center justify-center flex-shrink-0">
              <svg className="w-4 h-4 text-[#f4b518]" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
              </svg>
            </div>
            <span className="text-gray-300 font-medium text-xs md:text-sm">
              Register by {new Date(event.registrationDeadline).toLocaleDateString('en-US', {
                month: 'short',
                day: 'numeric'
              })}
            </span>
          </div>
        </div>

        {/* Registration Button or Closed Message */}
        <div className="pt-4 mt-4 border-t border-white/5">
          {isRegistrationOpen ? (
            <Link
              href={`/events/register/${event._id}`}
              className="group/btn relative w-full py-4 rounded-xl font-bold text-sm uppercase tracking-widest transition-all text-center bg-[#f4b518] text-black hover:bg-white overflow-hidden flex items-center justify-center gap-2"
            >
              <span className="relative z-10">Register Now</span>
              <svg className="w-4 h-4 relative z-10 group-hover/btn:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </Link>
          ) : (
            <div className="flex items-center justify-center gap-2 text-red-400 font-semibold uppercase tracking-wider text-xs md:text-sm py-3">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
              </svg>
              Registration Closed
            </div>
          )}
        </div>
      </div>
    </div>
  );
}