"use client";

import { useState } from "react";
import TeamMemberCard from "../current/TeamMemberCard";
import { roleStructure } from "@/lib/roleStructure";

interface Member {
  _id: string;
  name: string;
  image: string;
  role: string;
  year: string;
  status: string;
  priority: number;
  isMentor: boolean;
  bio: string;
}

interface ExMembersClientProps {
  members: Member[];
}

export default function ExMembersClient({ members }: ExMembersClientProps) {
  const years = [...new Set(members.map((m) => m.year))]
    .filter(Boolean)
    .sort((a, b) => Number(b) - Number(a));

  const [selectedYear, setSelectedYear] = useState<string>("all");

  const filteredMembers =
    selectedYear === "all"
      ? members
      : members.filter((m) => m.year === selectedYear);

  const totalMembers = filteredMembers.length;

  return (
    <>
      <style
        dangerouslySetInnerHTML={{
          __html: `
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `,
        }}
      />
      <main className="min-h-screen -mt-4 bg-black overflow-x-hidden">
        {/* Animated Background Elements */}
        <div className="fixed inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-60 sm:w-72 h-60 sm:h-72 bg-[#f4b518]/5 rounded-full blur-3xl animate-pulse"></div>
          <div
            className="absolute bottom-1/4 right-1/4 w-60 sm:w-72 h-60 sm:h-72 bg-[#f4b518]/5 rounded-full blur-3xl animate-pulse"
            style={{ animationDelay: "700ms" }}
          ></div>
        </div>

        {/* Content Container */}
        <div className="relative pt-16 sm:pt-20 md:pt-24 lg:pt-28 pb-12 sm:pb-16 md:pb-20 px-3 sm:px-4 md:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">

            {/* Page Header */}
            <header className="mb-8 sm:mb-12 text-center">
              <div className="inline-block mb-4 sm:mb-5">
                <span className="px-3 sm:px-4 py-1.5 sm:py-2 bg-[#f4b518]/10 border border-[#f4b518]/30 rounded-full text-[#f4b518] text-[10px] sm:text-xs font-bold tracking-wider backdrop-blur-sm uppercase">
                  ★ Alumni ★
                </span>
              </div>

              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-white mb-3 sm:mb-4 tracking-tight">
                Ex{" "}
                <span className="relative inline-block">
                  <span className="absolute inset-0 bg-[#f4b518] blur-xl sm:blur-2xl opacity-50"></span>
                  <span className="relative text-[#f4b518] drop-shadow-[0_0_20px_rgba(244,181,24,0.5)]">
                    Members
                  </span>
                </span>
              </h1>

              <p className="text-gray-400 text-xs sm:text-sm md:text-base max-w-xl mx-auto px-2 mb-6 sm:mb-8">
                Honoring the trailblazers who built the foundation of our mission
              </p>

              {members.length > 0 && (
                <div className="inline-flex items-center gap-2 bg-zinc-900/80 border border-[#f4b518]/20 px-4 py-2 rounded-full">
                  <div className="w-1.5 h-1.5 bg-[#f4b518] rounded-full animate-pulse"></div>
                  <p className="text-gray-400 text-xs font-medium">
                    {totalMembers} Alumni Member{totalMembers !== 1 ? "s" : ""}
                  </p>
                </div>
              )}
            </header>

            {/* Year Filter Tabs */}
            {years.length > 0 && (
              <div className="flex flex-wrap justify-center gap-2 sm:gap-3 mb-12 sm:mb-16">
                <button
                  onClick={() => setSelectedYear("all")}
                  className={`px-4 sm:px-5 py-1.5 sm:py-2 rounded-full text-xs sm:text-sm font-bold uppercase tracking-wide transition-all duration-300 border ${
                    selectedYear === "all"
                      ? "bg-[#f4b518] text-black border-[#f4b518] shadow-[0_0_20px_rgba(244,181,24,0.4)]"
                      : "bg-zinc-900/80 text-gray-400 border-[#f4b518]/20 hover:border-[#f4b518]/50 hover:text-[#f4b518]"
                  }`}
                >
                  All
                </button>
                {years.map((year) => (
                  <button
                    key={year}
                    onClick={() => setSelectedYear(year)}
                    className={`px-4 sm:px-5 py-1.5 sm:py-2 rounded-full text-xs sm:text-sm font-bold uppercase tracking-wide transition-all duration-300 border ${
                      selectedYear === year
                        ? "bg-[#f4b518] text-black border-[#f4b518] shadow-[0_0_20px_rgba(244,181,24,0.4)]"
                        : "bg-zinc-900/80 text-gray-400 border-[#f4b518]/20 hover:border-[#f4b518]/50 hover:text-[#f4b518]"
                    }`}
                  >
                    {year}
                  </button>
                ))}
              </div>
            )}

            {/* Team Sections */}
            {filteredMembers.length === 0 ? (
              <div className="text-center py-12 sm:py-16">
                <div className="inline-block p-6 bg-zinc-900 rounded-xl mb-4 border border-[#f4b518]/30">
                  <svg
                    className="w-12 h-12 sm:w-16 sm:h-16 text-[#f4b518]/50"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
                    />
                  </svg>
                </div>
                <h3 className="text-xl sm:text-2xl font-bold text-white mb-2">
                  No Alumni Yet
                </h3>
                <p className="text-gray-500 text-sm sm:text-base">
                  Past members will be showcased here.
                </p>
              </div>
            ) : (
              <div className="space-y-12 sm:space-y-16 md:space-y-20">
                {roleStructure.map((section, sectionIndex) => {
                  const sectionMembers = filteredMembers.filter((m) =>
                    section.roles.includes(m.role)
                  );

                  if (sectionMembers.length === 0) return null;

                  return (
                    <section
                      key={section.heading}
                      style={{
                        animation: `fadeInUp 0.6s ease-out ${sectionIndex * 0.15}s both`,
                      }}
                    >
                      {/* Section Header */}
                      <div className="relative mb-6 sm:mb-10">
                        <div className="flex items-center justify-center gap-3 sm:gap-4">
                          <div className="h-px flex-1 bg-gradient-to-r from-transparent via-[#f4b518]/50 to-[#f4b518]/20"></div>

                          <div className="relative group">
                            <div className="absolute inset-0 bg-[#f4b518]/20 blur-xl rounded-full scale-150"></div>
                            <div className="relative bg-gradient-to-br from-zinc-900 to-black px-4 sm:px-6 md:px-8 py-2 sm:py-3 rounded-xl border-2 border-[#f4b518] shadow-xl shadow-[#f4b518]/30">
                              <h2 className="text-xl sm:text-2xl md:text-3xl font-black text-[#f4b518] tracking-tight uppercase">
                                {section.heading}
                              </h2>
                              <div className="absolute -top-1 -right-1 w-2 h-2 bg-[#f4b518] rounded-full animate-ping"></div>
                              <div className="absolute -top-1 -right-1 w-2 h-2 bg-[#f4b518] rounded-full"></div>
                            </div>
                          </div>

                          <div className="h-px flex-1 bg-gradient-to-l from-transparent via-[#f4b518]/50 to-[#f4b518]/20"></div>
                        </div>

                        {/* Member count */}
                        <div className="flex justify-center mt-3">
                          <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-zinc-900/80 border border-[#f4b518]/20 rounded-full">
                            <div className="w-1.5 h-1.5 bg-[#f4b518] rounded-full animate-pulse"></div>
                            <p className="text-gray-400 text-xs font-medium">
                              {sectionMembers.length} Member
                              {sectionMembers.length !== 1 ? "s" : ""}
                            </p>
                          </div>
                        </div>
                      </div>

                      {/* Members Grid */}
                      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 xl:grid-cols-5 gap-2 sm:gap-3 md:gap-4">
                        {section.roles.map((role) =>
                          sectionMembers
                            .filter((m) => m.role === role)
                            .map((member, memberIndex) => (
                              <TeamMemberCard
                                key={member._id}
                                member={member}
                                sectionIndex={sectionIndex}
                                memberIndex={memberIndex}
                              />
                            ))
                        )}
                      </div>
                    </section>
                  );
                })}
              </div>
            )}

          </div>
        </div>
      </main>
    </>
  );
}