"use client";

import { useMemo, useState } from "react";
import TeamMemberCard from "./current/TeamMemberCard";
import { roleStructure } from "@/lib/roleStructure";

export interface TeamMemberItem {
  _id: string;
  slug: string;
  name: string;
  image: string;
  role: string;
  year: string;
  status: string;
  priority: number;
  isMentor: boolean;
  bio: string;
}

interface TeamByYearClientProps {
  members: TeamMemberItem[];
}

const orderedRolesLower = roleStructure.flatMap((section) =>
  section.roles.map((r) => r.toLowerCase())
);

function parseYearSortKey(year: string): number {
  const match = year.match(/\d{4}/);
  return match ? Number(match[0]) : 0;
}

function sortByRoleOrder(list: TeamMemberItem[]): TeamMemberItem[] {
  return [...list].sort((a, b) => {
    const aIdx = orderedRolesLower.indexOf(a.role.toLowerCase());
    const bIdx = orderedRolesLower.indexOf(b.role.toLowerCase());

    const normA = aIdx === -1 ? Number.MAX_SAFE_INTEGER : aIdx;
    const normB = bIdx === -1 ? Number.MAX_SAFE_INTEGER : bIdx;

    if (normA !== normB) return normA - normB;
    if (a.priority !== b.priority) return a.priority - b.priority;
    return a.name.localeCompare(b.name);
  });
}

export default function TeamByYearClient({ members }: TeamByYearClientProps) {
  const [selectedYear, setSelectedYear] = useState<string>("all");

  const years = useMemo(() => {
    const unique = Array.from(
      new Set(members.map((m) => (m.year || "").trim()).filter(Boolean))
    );
    return unique.sort((a, b) => {
      const diff = parseYearSortKey(b) - parseYearSortKey(a);
      return diff !== 0 ? diff : b.localeCompare(a);
    });
  }, [members]);

  const hasUnspecifiedYear = useMemo(
    () => members.some((m) => !(m.year || "").trim()),
    [members]
  );

  const visibleYears = useMemo(() => {
    if (selectedYear !== "all") return [selectedYear];
    return hasUnspecifiedYear ? [...years, "Other"] : years;
  }, [selectedYear, years, hasUnspecifiedYear]);

  const membersByYear = useMemo(() => {
    const grouped: Record<string, TeamMemberItem[]> = {};

    for (const member of members) {
      const key = (member.year || "").trim() || "Other";
      if (!grouped[key]) grouped[key] = [];
      grouped[key].push(member);
    }

    for (const key of Object.keys(grouped)) {
      grouped[key] = sortByRoleOrder(grouped[key]);
    }

    return grouped;
  }, [members]);

  const displayedCount =
    selectedYear === "all"
      ? members.length
      : (membersByYear[selectedYear] || []).length;

  return (
    <main className="min-h-screen -mt-4 bg-black overflow-x-hidden">
      {/* Ambient Background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-60 sm:w-72 h-60 sm:h-72 bg-[#f4b518]/5 rounded-full blur-3xl animate-pulse" />
        <div
          className="absolute bottom-1/4 right-1/4 w-60 sm:w-72 h-60 sm:h-72 bg-[#f4b518]/5 rounded-full blur-3xl animate-pulse"
          style={{ animationDelay: "700ms" }}
        />
      </div>

      <div className="relative pt-16 sm:pt-20 md:pt-24 lg:pt-28 pb-12 sm:pb-16 md:pb-20 px-3 sm:px-4 md:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <header className="mb-8 sm:mb-12 text-center">
            <div className="inline-block mb-4 sm:mb-5">
              <span className="px-3 sm:px-4 py-1.5 sm:py-2 bg-[#f4b518]/10 border border-[#f4b518]/30 rounded-full text-[#f4b518] text-[10px] sm:text-xs font-bold tracking-wider backdrop-blur-sm uppercase">
                ★ Legacy IEDC Directory ★
              </span>
            </div>

            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-white mb-3 sm:mb-4 tracking-tight">
              Our{" "}
              <span className="relative inline-block">
                <span className="absolute inset-0 bg-[#f4b518] blur-xl sm:blur-2xl opacity-50" />
                <span className="relative text-[#f4b518] drop-shadow-[0_0_20px_rgba(244,181,24,0.5)]">
                  Team
                </span>
              </span>
            </h1>

            <p className="text-gray-400 text-xs sm:text-sm md:text-base max-w-xl mx-auto px-2 mb-6 sm:mb-8">
              Every changemaker, leader, and contributor across all IEDC UCEK tenures
            </p>

            {members.length > 0 && (
              <div className="inline-flex items-center gap-2 bg-zinc-900/80 border border-[#f4b518]/20 px-4 py-2 rounded-full">
                <div className="w-1.5 h-1.5 bg-[#f4b518] rounded-full animate-pulse" />
                <p className="text-gray-400 text-xs font-medium">
                  {displayedCount} Member{displayedCount !== 1 ? "s" : ""}
                  {selectedYear !== "all" ? ` in ${selectedYear}` : " Across All Years"}
                </p>
              </div>
            )}
          </header>

          {/* Year Filter Tabs */}
          {years.length > 0 && (
            <div className="flex flex-wrap justify-center gap-2 sm:gap-3 mb-12 sm:mb-16">
              <button
                type="button"
                onClick={() => setSelectedYear("all")}
                className={`px-4 sm:px-5 py-1.5 sm:py-2 rounded-full text-xs sm:text-sm font-bold uppercase tracking-wide transition-all duration-300 border ${
                  selectedYear === "all"
                    ? "bg-[#f4b518] text-black border-[#f4b518] shadow-[0_0_20px_rgba(244,181,24,0.4)]"
                    : "bg-zinc-900/80 text-gray-400 border-[#f4b518]/20 hover:border-[#f4b518]/50 hover:text-[#f4b518]"
                }`}
              >
                All Years
              </button>

              {years.map((year) => (
                <button
                  key={year}
                  type="button"
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

          {/* Empty State */}
          {displayedCount === 0 ? (
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
                No Members Found
              </h3>
              <p className="text-gray-500 text-sm sm:text-base">
                Team members will appear here once added.
              </p>
            </div>
          ) : (
            <div className="space-y-14 sm:space-y-20">
              {visibleYears.map((yearKey, sectionIndex) => {
                const yearMembers = membersByYear[yearKey] || [];
                if (yearMembers.length === 0) return null;

                return (
                  <section key={yearKey}>
                    {/* Year Section Header */}
                    <div className="relative mb-6 sm:mb-10">
                      <div className="flex items-center justify-center gap-3 sm:gap-4">
                        <div className="h-px flex-1 bg-gradient-to-r from-transparent via-[#f4b518]/50 to-[#f4b518]/20" />

                        <div className="relative">
                          <div className="absolute inset-0 bg-[#f4b518]/20 blur-xl rounded-full scale-150" />
                          <div className="relative bg-gradient-to-br from-zinc-900 to-black px-5 sm:px-8 py-2 sm:py-3 rounded-xl border-2 border-[#f4b518] shadow-xl shadow-[#f4b518]/30">
                            <h2 className="text-xl sm:text-2xl md:text-3xl font-black text-[#f4b518] tracking-tight uppercase">
                              {yearKey}
                            </h2>
                            <div className="absolute -top-1 -right-1 w-2 h-2 bg-[#f4b518] rounded-full animate-ping" />
                            <div className="absolute -top-1 -right-1 w-2 h-2 bg-[#f4b518] rounded-full" />
                          </div>
                        </div>

                        <div className="h-px flex-1 bg-gradient-to-l from-transparent via-[#f4b518]/50 to-[#f4b518]/20" />
                      </div>

                      <div className="flex justify-center mt-3">
                        <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-zinc-900/80 border border-[#f4b518]/20 rounded-full">
                          <div className="w-1.5 h-1.5 bg-[#f4b518] rounded-full animate-pulse" />
                          <p className="text-gray-400 text-xs font-medium">
                            {yearMembers.length} Member{yearMembers.length !== 1 ? "s" : ""}
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Members Grid */}
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 xl:grid-cols-5 gap-2 sm:gap-3 md:gap-4">
                      {yearMembers.map((member, memberIndex) => (
                        <TeamMemberCard
                          key={member._id}
                          member={member}
                          sectionIndex={sectionIndex}
                          memberIndex={memberIndex}
                        />
                      ))}
                    </div>
                  </section>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </main>
  );
}

