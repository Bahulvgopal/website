"use client";

import Link from "next/link";
import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { usePathname } from "next/navigation"; // ✅ Step 1: Import usePathname

export default function Navbar() {
  const pathname = usePathname(); // ✅ Step 2: Get current route
  
  const [menuOpen, setMenuOpen] = useState(false);
  const [teamOpen, setTeamOpen] = useState(false);
  const [eventsOpen, setEventsOpen] = useState(false);
  const [mobileTeamOpen, setMobileTeamOpen] = useState(false);
  const [mobileEventsOpen, setMobileEventsOpen] = useState(false);

  const teamRef = useRef<HTMLDivElement | null>(null);
  const eventsRef = useRef<HTMLDivElement | null>(null);

  // Helper function to check if a link is active
  const isActive = (path: string) => pathname === path;

  // Close desktop dropdowns when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (teamRef.current && !teamRef.current.contains(event.target as Node)) {
        setTeamOpen(false);
      }
      if (eventsRef.current && !eventsRef.current.contains(event.target as Node)) {
        setEventsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "auto";
  }, [menuOpen]);

  return (
    <nav className="bg-[#f4b518]  fixed top-0 left-0 w-full z-[1000] shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 md:h-24 flex justify-between items-center">
        
        {/* LOGOS */}
        <div className="flex items-center gap-3 sm:gap-6">
          <Image src="/legacy.png" alt="Legacy" width={120} height={60} className="w-14 sm:w-20 md:w-24 h-auto object-contain" />
          <div className="h-8 w-[2px] bg-black/20 hidden sm:block"></div>
          <Image src="/iedc.png" alt="IEDC" width={200} height={60} className="w-32 sm:w-44 md:w-48 lg:w-52 h-auto object-contain" />
        </div>

        {/* DESKTOP MENU */}
        <div className="hidden md:flex items-center gap-6 lg:gap-10 text-black text-[1rem] font-bold">
          
          {/* ✅ Step 3: Conditional Styling for HOME */}
          <Link 
            href="/" 
            className={`transition-all duration-300 ${isActive("/") ? "text-white scale-110 border-b-2" : "hover:opacity-60"}`}
          >
            Home
          </Link>

          {/* TEAM DROPDOWN */}
          <div ref={teamRef} className="relative">
            <button
              onClick={() => setTeamOpen((prev) => !prev)}
              className={`flex items-center gap-1 transition-all ${pathname.startsWith("/team") ? "text-white border-b-2" : "hover:opacity-60"}`}
            >
              Team
              <span className={`text-[10px] transition-transform duration-300 ${teamOpen ? "rotate-180" : ""}`}>▼</span>
            </button>
            <div className={`absolute left-0 mt-4 w-40 bg-[#f4b518] rounded-2xl shadow-2xl overflow-hidden transition-all duration-300 origin-top ${teamOpen ? "opacity-100 scale-100 translate-y-0" : "opacity-0 scale-95 -translate-y-2 pointer-events-none"}`}>
              <div className="flex flex-col py-2">
                <Link href="/team/current" className={`px-6 py-3 hover:bg-black/5 ${isActive("/team/current") ? "text-white" : ""}`}>Current</Link>
                <Link href="/team/ex" className={`px-6 py-3 hover:bg-black/5 ${isActive("/team/ex") ? "text-white" : ""}`}>Previous</Link>
              </div>
            </div>
          </div>

          <Link href="/about" className={`transition-all ${isActive("/about") ? "text-white border-b-2" : "hover:opacity-60"}`}>About</Link>

          {/* EVENTS DROPDOWN */}
          <div ref={eventsRef} className="relative">
            <button
              onClick={() => setEventsOpen((prev) => !prev)}
              className={`flex items-center gap-1 transition-all ${pathname.startsWith("/events") ? "text-white border-b-2" : "hover:opacity-60"}`}
            >
              Events
              <span className={`text-[10px] transition-transform duration-300 ${eventsOpen ? "rotate-180" : ""}`}>▼</span>
            </button>
            <div className={`absolute left-0 mt-4 w-40 bg-[#f4b518] rounded-2xl shadow-2xl overflow-hidden transition-all duration-300 origin-top ${eventsOpen ? "opacity-100 scale-100 translate-y-0" : "opacity-0 scale-95 -translate-y-2 pointer-events-none"}`}>
              <div className="flex flex-col py-2">
                <Link href="/events/upcoming" className={`px-6 py-3 hover:bg-black/5 ${isActive("/events/upcoming") ? "text-white" : ""}`}>Upcoming</Link>
                <Link href="/events/previous" className={`px-6 py-3 hover:bg-black/5 ${isActive("/events/previous") ? "text-white" : ""}`}>Previous</Link>
              </div>
            </div>
          </div>

          <Link href="/join" className={`bg-black text-[#f4b518] px-5 py-2 rounded-full hover:scale-105 transition-transform text-sm ${isActive("/join") ? "ring-2 ring-white" : ""}`}>Join</Link>
        </div>

        {/* MOBILE HAMBURGER */}
        <button onClick={() => setMenuOpen((prev) => !prev)} className="md:hidden relative w-10 h-10 flex flex-col justify-center items-center gap-1.5 z-[1100]">
          <span className={`block w-7 h-0.5 bg-black rounded-full transition-all duration-300 ${menuOpen ? "rotate-45 translate-y-2" : ""}`} />
          <span className={`block w-7 h-0.5 bg-black rounded-full transition-all duration-300 ${menuOpen ? "opacity-0" : ""}`} />
          <span className={`block w-7 h-0.5 bg-black rounded-full transition-all duration-300 ${menuOpen ? "-rotate-45 -translate-y-2" : ""}`} />
        </button>
      </div>

      {/* MOBILE OVERLAY MENU */}
      <div className={`md:hidden fixed inset-0 bg-[#f4b518] z-[1050] transition-all duration-500 ease-in-out px-8 pt-32 ${menuOpen ? "opacity-100 translate-x-0" : "opacity-0 translate-x-full pointer-events-none"}`}>
        <div className="flex flex-col gap-8 text-xl font-semibold text-black">
          <Link href="/" onClick={() => setMenuOpen(false)} className={isActive("/") ? "text-white" : ""}>Home</Link>
          
          <div>
            <button onClick={() => setMobileTeamOpen(!mobileTeamOpen)} className={`flex items-center justify-between w-full ${pathname.startsWith("/team") ? "text-white" : ""}`}>
              Team <span>▼</span>
            </button>
            <div className={`overflow-hidden transition-all duration-300 flex flex-col gap-4 ml-4 font-medium text-lg ${mobileTeamOpen ? "max-h-40 mt-4" : "max-h-0"}`}>
              <Link href="/team/current" onClick={() => setMenuOpen(false)} className={isActive("/team/current") ? "text-white" : ""}>Current Team</Link>
              <Link href="/team/ex" onClick={() => setMenuOpen(false)} className={isActive("/team/ex") ? "text-white" : ""}>Previous Team</Link>
            </div>
          </div>

          <Link href="/about" onClick={() => setMenuOpen(false)} className={isActive("/about") ? "text-white" : ""}>About Us</Link>

          <div>
            <button onClick={() => setMobileEventsOpen(!mobileEventsOpen)} className={`flex items-center justify-between w-full ${pathname.startsWith("/events") ? "text-white" : ""}`}>
              Events <span>▼</span>
            </button>
            <div className={`overflow-hidden transition-all duration-300 flex flex-col gap-4 ml-4 font-medium text-lg ${mobileEventsOpen ? "max-h-40 mt-4" : "max-h-0"}`}>
              <Link href="/events/upcoming" onClick={() => setMenuOpen(false)} className={isActive("/events/upcoming") ? "text-white" : ""}>Upcoming Events</Link>
              <Link href="/events/previous" onClick={() => setMenuOpen(false)} className={isActive("/events/previous") ? "text-white" : ""}>Previous Events</Link>
            </div>
          </div>

          <Link href="/join" onClick={() => setMenuOpen(false)} className={isActive("/join") ? "text-white" : ""}>Join Community</Link>
        </div>
      </div>
    </nav>
  );
}