"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowLeft, Calendar, Home, Lightbulb, Users } from "lucide-react";

export default function NotFound() {
  return (
    <section className="relative min-h-[calc(100vh-5rem)] -mt-4 bg-gradient-to-b from-black via-[#0a0a0a] to-black text-white flex items-center justify-center px-4 sm:px-6 lg:px-8 py-16 overflow-hidden">
      {/* Ambient gold glow blobs */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-72 sm:w-96 h-72 sm:h-96 bg-[#f4b518]/10 rounded-full blur-[140px] animate-pulse" />
        <div
          className="absolute bottom-1/4 right-1/4 w-72 sm:w-96 h-72 sm:h-96 bg-[#f4b518]/5 rounded-full blur-[140px] animate-pulse"
          style={{ animationDelay: "700ms" }}
        />
      </div>

      {/* Subtle gold grid pattern */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.04]"
        style={{
          backgroundImage:
            "linear-gradient(#f4b518 1px, transparent 1px), linear-gradient(90deg, #f4b518 1px, transparent 1px)",
          backgroundSize: "56px 56px",
        }}
      />

      <motion.div
        initial={{ opacity: 0, y: 28 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
        className="relative z-10 w-full max-w-2xl"
      >
        <div className="relative bg-gradient-to-br from-zinc-950 to-black border-2 border-[#f4b518]/40 rounded-3xl p-8 sm:p-12 md:p-14 text-center shadow-[0_0_80px_rgba(244,181,24,0.12)]">
          {/* Corner accents matching site cards */}
          <div className="absolute top-0 left-0 w-14 sm:w-16 h-14 sm:h-16 border-t-4 border-l-4 border-[#f4b518] rounded-tl-3xl pointer-events-none" />
          <div className="absolute bottom-0 right-0 w-14 sm:w-16 h-14 sm:h-16 border-b-4 border-r-4 border-[#f4b518] rounded-br-3xl pointer-events-none" />

          {/* Status badge */}
          <div className="inline-flex items-center gap-2 mb-6 px-4 py-1.5 bg-[#f4b518]/10 border border-[#f4b518]/30 rounded-full">
            <span className="w-2 h-2 bg-[#f4b518] rounded-full animate-pulse" />
            <span className="text-[#f4b518] text-xs font-bold tracking-[0.25em] uppercase">
              Error 404 • Route Not Found
            </span>
          </div>

          {/* 404 Display */}
          <div className="relative inline-block mb-4">
            <span className="absolute inset-0 bg-[#f4b518] blur-3xl opacity-30 rounded-full" />
            <h1 className="relative text-7xl sm:text-8xl md:text-9xl font-black tracking-tighter leading-none text-[#f4b518] drop-shadow-[0_0_30px_rgba(244,181,24,0.45)]">
              404
            </h1>
          </div>

          {/* Divider */}
          <div className="flex items-center justify-center gap-4 my-5">
            <div className="h-px w-14 sm:w-20 bg-gradient-to-r from-transparent to-[#f4b518]" />
            <div className="w-2 h-2 rotate-45 bg-[#f4b518] shadow-[0_0_15px_rgba(244,181,24,0.6)]" />
            <div className="h-px w-14 sm:w-20 bg-gradient-to-l from-transparent to-[#f4b518]" />
          </div>

          {/* Copy */}
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-black uppercase tracking-tight text-white mb-3">
            Off the <span className="text-[#f4b518]">Blueprint</span>
          </h2>
          <p className="text-gray-400 text-sm sm:text-base max-w-md mx-auto leading-relaxed mb-8">
            The page you&apos;re looking for doesn&apos;t exist, was moved, or is still an idea waiting to be built.
          </p>

          {/* Primary Actions */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 mb-8">
            <Link
              href="/"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-7 py-3.5 bg-[#f4b518] text-black font-black text-sm uppercase tracking-wider rounded-full transition-all duration-300 hover:bg-[#ffd24c] hover:scale-105 hover:shadow-[0_0_30px_rgba(244,181,24,0.5)] active:scale-95"
            >
              <Home className="w-4 h-4" />
              Back to Home
            </Link>

            <Link
              href="/events/upcoming"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-7 py-3.5 bg-zinc-900 text-white font-bold text-sm uppercase tracking-wider rounded-full border border-[#f4b518]/40 transition-all duration-300 hover:border-[#f4b518] hover:text-[#f4b518] hover:scale-105 active:scale-95"
            >
              <Calendar className="w-4 h-4" />
              Upcoming Events
            </Link>
          </div>

          {/* Quick Links */}
          <div className="pt-6 border-t border-white/10 flex flex-wrap items-center justify-center gap-x-6 gap-y-3 text-xs sm:text-sm font-semibold text-gray-400">
            <Link
              href="/team/current"
              className="inline-flex items-center gap-1.5 hover:text-[#f4b518] transition-colors"
            >
              <Users className="w-3.5 h-3.5 text-[#f4b518]" />
              Current Team
            </Link>
            <Link
              href="/submit-idea"
              className="inline-flex items-center gap-1.5 hover:text-[#f4b518] transition-colors"
            >
              <Lightbulb className="w-3.5 h-3.5 text-[#f4b518]" />
              Submit Idea
            </Link>
            <button
              type="button"
              onClick={() => window.history.back()}
              className="inline-flex items-center gap-1.5 hover:text-[#f4b518] transition-colors"
            >
              <ArrowLeft className="w-3.5 h-3.5 text-[#f4b518]" />
              Go Back
            </button>
          </div>
        </div>
      </motion.div>
    </section>
  );
}

