"use client";

import Link from "next/link";
import Image from "next/image";

interface TeamMemberCardProps {
  member: {
    _id: string;
    name: string;
    image: string;
    role: string;
    year: string;
    bio?: string;
  };
  sectionIndex: number;
  memberIndex: number;
}

export default function TeamMemberCard({
  member,
  sectionIndex,
  memberIndex,
}: TeamMemberCardProps) {
  return (
    <Link
      href={`/team/member/${member._id}`}
      className="block group relative"
      style={{
        animation: `fadeInUp 0.5s ease-out ${memberIndex * 0.05}s both`,
      }}
      prefetch
    >
      <div className="relative bg-zinc-950 rounded-xl overflow-hidden border border-zinc-800 hover:border-[#f4b518] transition-all duration-500 hover:shadow-xl hover:shadow-[#f4b518]/30 hover:-translate-y-1">

        {/* Corner accents */}
        <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-[#f4b518]/0 group-hover:border-[#f4b518] transition-all duration-500 rounded-tl-xl z-10"></div>
        <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-[#f4b518]/0 group-hover:border-[#f4b518] transition-all duration-500 rounded-br-xl z-10"></div>

        {/* Image */}
        <div className="relative h-36 sm:h-40 md:h-44 overflow-hidden">

          <Image
            src={member.image}
            alt={member.name}
            fill
            sizes="(max-width: 768px) 100vw, 200px"
            className="object-cover group-hover:scale-110 transition-transform duration-700"
            priority={false}
          />

          {/* Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent"></div>

          {/* Role Badge */}
          {member.role && (
            <div className="absolute top-2 right-2 bg-black/90 backdrop-blur-sm px-1.5 py-0.5 rounded border border-[#f4b518]/50">
              <p className="text-[#f4b518] text-[8px] sm:text-[9px] font-bold uppercase tracking-wider line-clamp-1">
                {member.role}
              </p>
            </div>
          )}

          <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-[#f4b518] to-transparent transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500"></div>
        </div>

        {/* Content */}
        <div className="p-2 sm:p-2.5 bg-gradient-to-b from-zinc-950 to-black">
          <h3 className="text-xs sm:text-sm font-bold text-white mb-1 group-hover:text-[#f4b518] transition-colors duration-300 line-clamp-1">
            {member.name}
          </h3>

          <div className="flex items-center text-gray-500 text-[10px] sm:text-xs">
            <svg
              className="w-2.5 h-2.5 sm:w-3 sm:h-3 mr-1 text-[#f4b518] flex-shrink-0"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z"
                clipRule="evenodd"
              />
            </svg>

            <span className="group-hover:text-gray-300 transition-colors duration-300">
              {member.year}
            </span>
          </div>
        </div>

      </div>
    </Link>
  );
}
