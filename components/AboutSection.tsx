"use client";

import Link from "next/link";

const stats = [
  { label: "Established", value: "2020" },
  { label: "IN TVM", value: "# 1" },
  { label: "IN SOUTH ZONE", value: "# 2" },
  { label: "IN ALL KERALA", value: "# 14" },
  { label: "Members", value: "200+" },
  { label: "Event Hosted", value: "50+" },
];

export default function AboutSection() {
  return (
    <section className="relative bg-black py-16 sm:py-20 md:py-24 px-4 sm:px-6 lg:px-8 overflow-hidden">
      {/* Background glow effects */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-[#f4b518]/5 rounded-full blur-[120px]" />
        <div className="absolute top-0 left-0 w-64 h-64 bg-[#f4b518]/3 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-0 w-64 h-64 bg-[#f4b518]/3 rounded-full blur-3xl" />
      </div>

      {/* Grid pattern overlay */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.03]"
        style={{
          backgroundImage: `linear-gradient(#f4b518 1px, transparent 1px), linear-gradient(90deg, #f4b518 1px, transparent 1px)`,
          backgroundSize: "60px 60px",
        }}
      />

      <div className="relative max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">

          {/* Left — Text Content */}
          <div>
            {/* Badge */}
            <div className="inline-flex items-center gap-2 mb-5 px-3 py-1.5 bg-[#f4b518]/10 border border-[#f4b518]/30 rounded-full">
              <div className="w-1.5 h-1.5 bg-[#f4b518] rounded-full animate-pulse" />
              <span className="text-[#f4b518] text-[10px] font-bold tracking-widest uppercase">
                Who We Are
              </span>
            </div>

            {/* Heading */}
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-white leading-tight tracking-tight mb-5">
              Welcome to{" "}
              <span className="relative inline-block">
                <span className="absolute inset-0 bg-[#f4b518] blur-2xl opacity-40 rounded-full" />
                <span className="relative text-[#f4b518] drop-shadow-[0_0_20px_rgba(244,181,24,0.6)]">
                  Legacy IEDC
                </span>
              </span>
            </h2>

            {/* Description */}
            <p className="text-gray-400 text-sm sm:text-base leading-relaxed mb-4">
              IEDC-UCEK was set up by the Kerala Startup Mission in the University College of Engineering as part of establishing Innovation and Entrepreneurship Development Centres (IEDCs) all around Kerala in various colleges to promote the culture of startups and to instill the concept of entrepreneurship among students.
            </p>
            <p className="text-gray-500 text-sm leading-relaxed mb-8">
              We have been nurturing the next
              generation of entrepreneurs, builders, and change-makers —
              turning bold ideas into real-world impact.
            </p>

            {/* CTA Button */}
            <Link
              href="/about"
              className="group inline-flex items-center gap-3 px-6 py-3 bg-[#f4b518] text-black font-bold text-sm uppercase tracking-wider rounded-xl transition-all duration-300 hover:bg-[#f4b518]/90 hover:shadow-[0_0_30px_rgba(244,181,24,0.5)] hover:scale-105 active:scale-95"
            >
              Discover Our Story
              <svg
                className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2.5}
                  d="M17 8l4 4m0 0l-4 4m4-4H3"
                />
              </svg>
            </Link>
          </div>

          {/* Right — Stats */}
          <div className="grid grid-cols-2 gap-3 sm:gap-4">
            {stats.map((stat, i) => (
              <div
                key={stat.label}
                className="relative group p-5 sm:p-6 bg-zinc-900/80 border border-[#f4b518]/15 rounded-2xl overflow-hidden transition-all duration-300 hover:border-[#f4b518]/50 hover:bg-zinc-900"
                style={{ animationDelay: `${i * 100}ms` }}
              >
                {/* Corner accent */}
                <div className="absolute top-0 right-0 w-12 h-12 bg-[#f4b518]/5 rounded-bl-2xl transition-all duration-300 group-hover:bg-[#f4b518]/10" />
                <div className="absolute top-2 right-2 w-1.5 h-1.5 bg-[#f4b518]/40 rounded-full group-hover:bg-[#f4b518] transition-colors duration-300" />

                <p className="text-[#f4b518] text-2xl sm:text-3xl font-black mb-1 tracking-tight">
                  {stat.value}
                </p>
                <p className="text-gray-500 text-xs font-semibold uppercase tracking-wider">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>

        </div>

        {/* Bottom divider */}
        <div className="mt-16 h-px bg-gradient-to-r from-transparent via-[#f4b518]/30 to-transparent" />
      </div>
    </section>
  );
}
