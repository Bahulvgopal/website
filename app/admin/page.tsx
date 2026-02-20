import { connectDB } from "@/lib/mongodb";
import Event from "@/models/Event";
import Registration from "@/models/Registration";
import Member from "@/models/Member";
import { roleStructure } from "@/lib/roleStructure";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";
import DeleteEventButton from "@/components/DeleteEventButton";
import DeleteMemberButton from "@/components/DeleteMemberButton";
import SignOutButton from "@/components/SignOutButton";

export const revalidate = 5;

const allRolesInOrder = roleStructure.flatMap((section) => section.roles);

export default async function AdminDashboard({
  searchParams,
}: {
  searchParams: Promise<{
    year?: string;
    status?: string;
    role?: string;
    eventYear?: string;
  }>;
}) {
  const params = await searchParams;
  const session = await getServerSession(authOptions);

  if (!session) redirect("/login");

  if (
    !session?.user ||
    (session.user.role !== "admin" && session.user.role !== "mentor")
  ) {
    redirect("/");
  }

  await connectDB();

  /* ================= EVENTS ================= */
  const eventYearFilter = params.eventYear || "";

  const allEvents = await Event.find().sort({ eventDate: -1 }).lean();

  const eventYears = [
    ...new Set(
      allEvents.map((e: any) =>
        e.eventDate ? new Date(e.eventDate).getFullYear().toString() : null
      )
    ),
  ]
    .filter((year): year is string => Boolean(year))
    .sort()
    .reverse();

  const filteredEvents = eventYearFilter
    ? allEvents.filter(
        (e: any) =>
          e.eventDate &&
          new Date(e.eventDate).getFullYear().toString() === eventYearFilter
      )
    : allEvents;

  const eventData = await Promise.all(
    filteredEvents.map(async (event: any) => {
      const count = await Registration.countDocuments({ eventId: event._id });
      return {
        _id: event._id.toString(),
        title: event.title || "",
        description: event.description || "",
        location: event.location || "",
        eventDate: event.eventDate ? new Date(event.eventDate).toISOString() : null,
        registrationDeadline: event.registrationDeadline
          ? new Date(event.registrationDeadline).toISOString()
          : null,
        image: event.image || "",
        registrationCount: count,
      };
    })
  );

  /* ================= MEMBERS ================= */
  const allMembers = await Member.find().sort({ createdAt: -1 }).lean();

  const uniqueYears = [...new Set(allMembers.map((m: any) => m.year))]
    .filter((year): year is string => Boolean(year))
    .sort()
    .reverse();

  const selectedYear = params.year || "";
  const selectedStatus = params.status || "";
  const selectedRole = params.role || "";

  // Default to "current" when no filters applied at all
  const isFiltered = !!(selectedYear || selectedStatus || selectedRole);
  const effectiveStatus = !isFiltered ? "current" : selectedStatus;

  const filteredMembers = allMembers.filter((m: any) => {
    const yearMatch = selectedYear ? m.year === selectedYear : true;
    const statusMatch = effectiveStatus ? m.status === effectiveStatus : true;
    const roleMatch = selectedRole ? m.role === selectedRole : true;
    return yearMatch && statusMatch && roleMatch;
  });

  const serializedMembers = filteredMembers.map((member: any) => ({
    _id: member._id.toString(),
    name: member.name || "",
    image: member.image || "",
    role: member.role || "",
    year: member.year || "",
    status: member.status || "current",
    priority: member.priority || 0,
    isMentor: member.isMentor || false,
    bio: member.bio || "",
  }));

  // Group by roleStructure hierarchy order
  const membersBySection = roleStructure
    .map((section) => {
      const sectionMembers = serializedMembers.filter((m) =>
        section.roles.includes(m.role)
      );
      const sorted = section.roles.flatMap((role) =>
        sectionMembers.filter((m) => m.role === role)
      );
      return { ...section, members: sorted };
    })
    .filter((section) => section.members.length > 0);

  const categorizedRoles = new Set(allRolesInOrder);
  const uncategorizedMembers = serializedMembers.filter(
    (m) => !categorizedRoles.has(m.role)
  );

  return (
    <>
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      <link
        href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&family=Poppins:wght@600;700;800;900&display=swap"
        rel="stylesheet"
      />

      <main
        className="min-h-screen pt-16 sm:pt-20 pb-12 px-4 sm:px-6 lg:px-10 bg-[#f4b518]"
        style={{ fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, sans-serif" }}
      >
        <div className="max-w-[1800px] mx-auto space-y-10 md:space-y-14">

          {/* ================= HEADER ================= */}
          <header className="pb-6 md:pb-8 border-b-2 border-black/10">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 md:gap-6">
              <div>
                <h1
                  className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-black tracking-tight"
                  style={{ fontFamily: "'Poppins', sans-serif" }}
                >
                  Admin Dashboard
                </h1>
                <p className="mt-2 text-sm md:text-base text-black/70 font-semibold">
                  Manage events and team members
                </p>
              </div>
              <div className="w-full sm:w-auto">
                <SignOutButton />
              </div>
            </div>
          </header>

          {/* ================= EVENTS SECTION ================= */}
          <section>
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6 md:mb-8">
              <div className="flex items-center gap-3">
                <div className="w-1.5 sm:w-2 h-8 sm:h-10 md:h-12 bg-blue-600 rounded-full" />
                <div>
                  <h2
                    className="text-2xl sm:text-3xl md:text-4xl font-black text-black"
                    style={{ fontFamily: "'Poppins', sans-serif" }}
                  >
                    Events
                  </h2>
                  <p className="text-xs sm:text-sm text-black/60 font-semibold mt-1">
                    Manage and track all events
                  </p>
                </div>
              </div>
              <a
                href="/admin/add-event"
                className="w-full sm:w-auto bg-green-600 hover:bg-green-700 px-5 sm:px-6 md:px-8 py-2.5 sm:py-3 md:py-3.5 rounded-xl sm:rounded-2xl font-bold text-sm md:text-base text-white shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] text-center"
              >
                <span className="flex items-center justify-center gap-2">
                  <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
                  </svg>
                  Add Event
                </span>
              </a>
            </div>

            {/* Statistics Cards */}
            <div className="grid grid-cols-2 gap-3 md:gap-4 mb-6 md:mb-8">
              <div className="bg-white/90 backdrop-blur-sm border-2 border-black/5 rounded-xl sm:rounded-2xl p-3 sm:p-4 md:p-5 hover:shadow-lg transition-shadow duration-300">
                <div className="flex items-center gap-2 sm:gap-3">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 bg-blue-100 rounded-lg sm:rounded-xl flex items-center justify-center flex-shrink-0">
                    <svg className="w-5 h-5 sm:w-6 sm:h-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div className="min-w-0">
                    <p className="text-xl sm:text-2xl font-black text-black truncate">{allEvents.length}</p>
                    <p className="text-[10px] sm:text-xs md:text-sm font-bold text-black/60 truncate">Total Events</p>
                  </div>
                </div>
              </div>
              <div className="bg-white/90 backdrop-blur-sm border-2 border-black/5 rounded-xl sm:rounded-2xl p-3 sm:p-4 md:p-5 hover:shadow-lg transition-shadow duration-300">
                <div className="flex items-center gap-2 sm:gap-3">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 bg-purple-100 rounded-lg sm:rounded-xl flex items-center justify-center flex-shrink-0">
                    <svg className="w-5 h-5 sm:w-6 sm:h-6 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div className="min-w-0">
                    <p className="text-xl sm:text-2xl font-black text-black truncate">{eventData.length}</p>
                    <p className="text-[10px] sm:text-xs md:text-sm font-bold text-black/60 truncate">Filtered</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Event Filter Bar */}
            <form
              method="GET"
              className="bg-white/80 backdrop-blur-sm border-2 border-black/5 rounded-2xl md:rounded-3xl p-4 sm:p-5 md:p-6 mb-6 md:mb-8 shadow-lg"
            >
              {selectedYear && <input type="hidden" name="year" value={selectedYear} />}
              {selectedStatus && <input type="hidden" name="status" value={selectedStatus} />}
              {selectedRole && <input type="hidden" name="role" value={selectedRole} />}

              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
                <div className="flex-1 space-y-2">
                  <label className="block text-[10px] sm:text-xs font-black text-black/70 uppercase tracking-wider px-1">
                    Filter by Year
                  </label>
                  <div className="relative">
                    <select
                      name="eventYear"
                      defaultValue={eventYearFilter}
                      className="w-full px-3 sm:px-4 py-2.5 sm:py-3 md:py-3.5 rounded-lg sm:rounded-xl bg-white border-2 border-black/10 text-black text-sm font-semibold focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all appearance-none cursor-pointer hover:border-black/20"
                    >
                      <option value="">All Years</option>
                      {eventYears.map((year) => (
                        <option key={year} value={year}>{year}</option>
                      ))}
                    </select>
                    <svg className="absolute right-3 sm:right-4 top-1/2 -translate-y-1/2 w-4 h-4 sm:w-5 sm:h-5 text-black/40 pointer-events-none" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                </div>
                <div className="flex gap-2 sm:items-end">
                  <button type="submit" className="flex-1 sm:flex-none bg-blue-600 hover:bg-blue-700 text-white font-bold px-5 sm:px-6 md:px-10 py-2.5 sm:py-3 md:py-3.5 rounded-lg sm:rounded-xl transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] shadow-lg text-sm md:text-base whitespace-nowrap">
                    Apply
                  </button>
                  <a href="/admin" className="flex-1 sm:flex-none bg-black/5 hover:bg-black/10 border-2 border-black/10 text-black font-bold px-4 sm:px-5 md:px-8 py-2.5 sm:py-3 md:py-3.5 rounded-lg sm:rounded-xl text-center transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] text-sm md:text-base whitespace-nowrap">
                    Clear
                  </a>
                </div>
              </div>
              <div className="flex items-center gap-2 mt-4 pt-4 border-t-2 border-black/5">
                <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-blue-600 rounded-full" />
                <p className="text-xs sm:text-sm font-bold text-black/70">
                  Showing <span className="text-black text-sm sm:text-base">{eventData.length}</span>{" "}
                  {eventData.length === 1 ? "event" : "events"}
                  {eventYearFilter && (
                    <span className="hidden sm:inline"> from <span className="text-black text-sm sm:text-base">{eventYearFilter}</span></span>
                  )}
                </p>
              </div>
            </form>

            {/* Events Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-5 md:gap-6">
              {eventData.length > 0 ? (
                eventData.map((event: any) => (
                  <div key={event._id} className="group relative bg-white/90 backdrop-blur-sm border-2 border-black/5 hover:border-blue-500 rounded-2xl sm:rounded-3xl overflow-hidden transition-all duration-300 hover:shadow-2xl hover:-translate-y-1">
                    {event.image && (
                      <div className="relative h-40 sm:h-44 md:h-48 overflow-hidden">
                        <img src={event.image} alt={event.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
                        {event.eventDate && (
                          <div className="absolute top-2 sm:top-3 right-2 sm:right-3 bg-white/95 backdrop-blur-sm px-2 sm:px-3 py-1 sm:py-1.5 rounded-lg border border-black/5">
                            <p className="text-[10px] sm:text-xs font-black text-black">
                              {new Date(event.eventDate).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
                            </p>
                          </div>
                        )}
                      </div>
                    )}
                    <div className="p-4 sm:p-5 md:p-6 space-y-3 sm:space-y-4">
                      <div className="space-y-2">
                        <h3 className="text-base sm:text-lg md:text-xl font-extrabold text-black line-clamp-2 leading-tight group-hover:text-blue-600 transition-colors duration-300">
                          {event.title}
                        </h3>
                        {event.eventDate && (
                          <div className="flex items-center gap-1.5 sm:gap-2 text-black/60 text-xs sm:text-sm">
                            <span className="text-sm sm:text-base">📅</span>
                            <span className="font-medium truncate">{new Date(event.eventDate).toDateString()}</span>
                          </div>
                        )}
                      </div>
                      <div className="inline-flex items-center gap-1.5 sm:gap-2 bg-green-500/15 border-2 border-green-600/30 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full">
                        <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-green-600 rounded-full animate-pulse" />
                        <span className="text-green-700 text-[10px] sm:text-xs font-black uppercase tracking-wider">
                          {event.registrationCount} Registered
                        </span>
                      </div>
                      <div className="grid grid-cols-2 gap-2 pt-2">
                        <a href={`/admin/events/${event._id}`} className="bg-blue-600 hover:bg-blue-700 text-white text-center text-xs sm:text-sm font-bold py-2 sm:py-2.5 md:py-3 rounded-lg sm:rounded-xl transition-all duration-300 hover:scale-105 active:scale-95 shadow-md">
                          Details
                        </a>
                        <a href={`/admin/edit/${event._id}`} className="bg-yellow-500 hover:bg-yellow-600 text-black hover:text-white text-center text-xs sm:text-sm font-bold py-2 sm:py-2.5 md:py-3 rounded-lg sm:rounded-xl transition-all duration-300 hover:scale-105 active:scale-95">
                          Edit
                        </a>
                        <div className="col-span-2">
                          <DeleteEventButton id={event._id} />
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="col-span-full bg-white/80 backdrop-blur-sm border-2 border-black/5 rounded-2xl sm:rounded-3xl p-8 sm:p-10 md:p-12 text-center">
                  <svg className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 mx-auto mb-3 sm:mb-4 text-black/20" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  <h3 className="text-lg sm:text-xl font-bold text-black/70 mb-2">No Events Found</h3>
                  <p className="text-sm sm:text-base text-black/50 font-medium mb-4 sm:mb-6">
                    {eventYearFilter ? `No events found for ${eventYearFilter}` : "No events available"}
                  </p>
                  <a href="/admin/add-event" className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-bold px-5 sm:px-6 py-2.5 sm:py-3 rounded-xl transition-all duration-300 hover:scale-105 text-sm sm:text-base">
                    Create First Event
                  </a>
                </div>
              )}
            </div>
          </section>

          {/* ================= TEAM SECTION ================= */}
          <section>
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6 md:mb-8">
              <div className="flex items-center gap-3">
                <div className="w-1.5 sm:w-2 h-8 sm:h-10 md:h-12 bg-purple-600 rounded-full" />
                <div>
                  <h2
                    className="text-2xl sm:text-3xl md:text-4xl font-black text-black"
                    style={{ fontFamily: "'Poppins', sans-serif" }}
                  >
                    Team
                  </h2>
                  <p className="text-xs sm:text-sm text-black/60 font-semibold mt-1">
                    Manage team members
                  </p>
                </div>
              </div>
              <a
                href="/admin/add-member"
                className="w-full sm:w-auto bg-green-600 hover:bg-green-700 px-5 sm:px-6 md:px-8 py-2.5 sm:py-3 md:py-3.5 rounded-xl sm:rounded-2xl font-bold text-sm md:text-base text-white shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] text-center"
              >
                <span className="flex items-center justify-center gap-2">
                  <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
                  </svg>
                  Add Member
                </span>
              </a>
            </div>

            {/* Default state indicator */}
            {!isFiltered && (
              <div className="flex items-center gap-2 mb-4 px-1">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                <p className="text-xs sm:text-sm font-bold text-black/70">
                  Showing <span className="text-black">current team</span> by default —{" "}
                  use filters below to view all or ex-members
                </p>
              </div>
            )}

            {/* Team Filter Bar */}
            <form
              method="GET"
              className="bg-white/80 backdrop-blur-sm border-2 border-black/5 rounded-2xl md:rounded-3xl p-4 sm:p-5 md:p-6 mb-6 md:mb-8 shadow-lg"
            >
              {eventYearFilter && <input type="hidden" name="eventYear" value={eventYearFilter} />}

              <div className="flex flex-col lg:flex-row gap-3 sm:gap-4">
                {/* 3-column filters */}
                <div className="flex-1 grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4">

                  {/* Year Filter */}
                  <div className="space-y-2">
                    <label className="block text-[10px] sm:text-xs font-black text-black/70 uppercase tracking-wider px-1">
                      Filter by Year
                    </label>
                    <div className="relative">
                      <select
                        name="year"
                        defaultValue={selectedYear}
                        className="w-full px-3 sm:px-4 py-2.5 sm:py-3 md:py-3.5 rounded-lg sm:rounded-xl bg-white border-2 border-black/10 text-black text-sm font-semibold focus:ring-2 focus:ring-purple-500 focus:border-purple-500 outline-none transition-all appearance-none cursor-pointer hover:border-black/20"
                      >
                        <option value="">All Years</option>
                        {uniqueYears.map((year) => (
                          <option key={year} value={year}>{year}</option>
                        ))}
                      </select>
                      <svg className="absolute right-3 sm:right-4 top-1/2 -translate-y-1/2 w-4 h-4 sm:w-5 sm:h-5 text-black/40 pointer-events-none" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                      </svg>
                    </div>
                  </div>

                  {/* Status Filter */}
                  <div className="space-y-2">
                    <label className="block text-[10px] sm:text-xs font-black text-black/70 uppercase tracking-wider px-1">
                      Filter by Status
                    </label>
                    <div className="relative">
                      <select
                        name="status"
                        defaultValue={selectedStatus}
                        className="w-full px-3 sm:px-4 py-2.5 sm:py-3 md:py-3.5 rounded-lg sm:rounded-xl bg-white border-2 border-black/10 text-black text-sm font-semibold focus:ring-2 focus:ring-purple-500 focus:border-purple-500 outline-none transition-all appearance-none cursor-pointer hover:border-black/20"
                      >
                        <option value="">All Status</option>
                        <option value="current">Current Team</option>
                        <option value="ex">Ex Team</option>
                      </select>
                      <svg className="absolute right-3 sm:right-4 top-1/2 -translate-y-1/2 w-4 h-4 sm:w-5 sm:h-5 text-black/40 pointer-events-none" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                      </svg>
                    </div>
                  </div>

                  {/* ── Role Filter (NEW) ── */}
                  <div className="space-y-2">
                    <label className="block text-[10px] sm:text-xs font-black text-black/70 uppercase tracking-wider px-1">
                      Filter by Role
                    </label>
                    <div className="relative">
                      <select
                        name="role"
                        defaultValue={selectedRole}
                        className="w-full px-3 sm:px-4 py-2.5 sm:py-3 md:py-3.5 rounded-lg sm:rounded-xl bg-white border-2 border-black/10 text-black text-sm font-semibold focus:ring-2 focus:ring-purple-500 focus:border-purple-500 outline-none transition-all appearance-none cursor-pointer hover:border-black/20"
                      >
                        <option value="">All Roles</option>
                        {roleStructure.map((section) => (
                          <optgroup key={section.heading} label={`── ${section.heading}`}>
                            {section.roles.map((role) => (
                              <option key={role} value={role}>
                                {role}
                              </option>
                            ))}
                          </optgroup>
                        ))}
                      </select>
                      <svg className="absolute right-3 sm:right-4 top-1/2 -translate-y-1/2 w-4 h-4 sm:w-5 sm:h-5 text-black/40 pointer-events-none" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                      </svg>
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-2 lg:items-end">
                  <button
                    type="submit"
                    className="flex-1 lg:flex-none bg-purple-600 hover:bg-purple-700 text-white font-bold px-5 sm:px-6 md:px-10 py-2.5 sm:py-3 md:py-3.5 rounded-lg sm:rounded-xl transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] shadow-lg text-sm md:text-base whitespace-nowrap"
                  >
                    Apply
                  </button>
                  <a
                    href="/admin"
                    className="flex-1 lg:flex-none bg-black/5 hover:bg-black/10 border-2 border-black/10 text-black font-bold px-4 sm:px-5 md:px-8 py-2.5 sm:py-3 md:py-3.5 rounded-lg sm:rounded-xl text-center transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] text-sm md:text-base whitespace-nowrap"
                  >
                    Clear
                  </a>
                </div>
              </div>

              {/* Results Count + Active Filter Chips */}
              <div className="flex flex-wrap items-center gap-x-4 gap-y-2 mt-4 pt-4 border-t-2 border-black/5">
                <div className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-purple-600 rounded-full" />
                  <p className="text-xs sm:text-sm font-bold text-black/70">
                    Showing{" "}
                    <span className="text-black text-sm sm:text-base">{serializedMembers.length}</span>{" "}
                    {serializedMembers.length === 1 ? "member" : "members"}
                  </p>
                </div>
                <div className="flex flex-wrap gap-2">
                  {effectiveStatus && (
                    <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] sm:text-xs font-bold bg-purple-100 text-purple-700 border border-purple-300">
                      {effectiveStatus === "current" ? "Current Team" : "Ex Team"}
                      {!isFiltered && <span className="text-purple-400 font-normal"> (default)</span>}
                    </span>
                  )}
                  {selectedYear && (
                    <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] sm:text-xs font-bold bg-blue-100 text-blue-700 border border-blue-300">
                      {selectedYear}
                    </span>
                  )}
                  {selectedRole && (
                    <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] sm:text-xs font-bold bg-yellow-100 text-yellow-800 border border-yellow-400">
                      {selectedRole}
                    </span>
                  )}
                </div>
              </div>
            </form>

            {/* Members — Hierarchy View */}
            {serializedMembers.length === 0 ? (
              <div className="bg-white/80 backdrop-blur-sm border-2 border-black/5 rounded-2xl sm:rounded-3xl p-8 sm:p-10 md:p-12 text-center">
                <svg className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 mx-auto mb-3 sm:mb-4 text-black/20" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
                <h3 className="text-lg sm:text-xl font-bold text-black/70 mb-2">No Members Found</h3>
                <p className="text-sm sm:text-base text-black/50 font-medium">
                  Try adjusting your filters or add a new member.
                </p>
              </div>
            ) : (
              <div className="space-y-8 sm:space-y-10">
                {membersBySection.map((section) => (
                  <div key={section.heading}>
                    {/* Section Label */}
                    <div className="flex items-center gap-3 mb-4 sm:mb-5">
                      <div className="w-1 h-6 sm:h-7 bg-purple-500 rounded-full" />
                      <h3 className="text-base sm:text-lg md:text-xl font-black text-black uppercase tracking-tight">
                        {section.heading}
                      </h3>
                      <div className="flex-1 h-px bg-black/10" />
                      <span className="text-[10px] sm:text-xs font-bold text-black/40 uppercase tracking-wider whitespace-nowrap">
                        {section.members.length} {section.members.length === 1 ? "member" : "members"}
                      </span>
                    </div>

                    {/* Members Grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-5">
                      {section.members.map((member: any) => (
                        <div
                          key={member._id}
                          className="group relative bg-white/90 backdrop-blur-sm border-2 border-black/5 hover:border-purple-500 rounded-2xl sm:rounded-3xl p-4 sm:p-5 transition-all duration-300 hover:shadow-2xl hover:-translate-y-1"
                        >
                          {/* Member Image */}
                          <div className="relative w-full aspect-square mb-4 sm:mb-5 overflow-hidden rounded-xl sm:rounded-2xl border-2 border-black/5 group-hover:border-purple-500 transition-all duration-500">
                            <img
                              src={member.image}
                              alt={member.name}
                              className="w-full h-full object-cover object-top group-hover:scale-110 transition-transform duration-700"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                            {/* Status badge */}
                            <div className={`absolute top-2 left-2 px-2 py-0.5 rounded-full text-[9px] sm:text-[10px] font-black uppercase tracking-wider ${
                              member.status === "current"
                                ? "bg-green-500/90 text-white"
                                : "bg-zinc-600/90 text-white"
                            }`}>
                              {member.status === "current" ? "Current" : "Ex"}
                            </div>
                          </div>

                          {/* Member Info */}
                          <div className="text-center space-y-2 sm:space-y-3 mb-4 sm:mb-5">
                            <h3 className="text-base sm:text-lg md:text-xl font-extrabold text-black line-clamp-1 group-hover:text-purple-600 transition-colors duration-300">
                              {member.name}
                            </h3>
                            <div className="inline-flex items-center gap-1.5 sm:gap-2 bg-yellow-400/30 border-2 border-yellow-600/40 px-3 sm:px-4 py-1 sm:py-1.5 rounded-full">
                              <span className="text-yellow-900 text-[10px] sm:text-xs font-black uppercase tracking-wider">
                                {member.role}
                              </span>
                            </div>
                            <p className="text-black/60 text-xs sm:text-sm md:text-base font-semibold">
                              {member.year}
                            </p>
                          </div>

                          {/* Action Buttons */}
                          <div className="grid grid-cols-2 gap-2">
                            <a
                              href={`/admin/edit-member/${member._id}`}
                              className="bg-yellow-500 hover:bg-yellow-600 text-black hover:text-white text-center text-xs sm:text-sm font-bold py-2 sm:py-2.5 md:py-3 rounded-lg sm:rounded-xl transition-all duration-300 hover:scale-105 active:scale-95"
                            >
                              Edit
                            </a>
                            <DeleteMemberButton id={member._id} />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}

                {/* Uncategorized (roles not in roleStructure) */}
                {uncategorizedMembers.length > 0 && (
                  <div>
                    <div className="flex items-center gap-3 mb-4 sm:mb-5">
                      <div className="w-1 h-6 sm:h-7 bg-gray-400 rounded-full" />
                      <h3 className="text-base sm:text-lg md:text-xl font-black text-black uppercase tracking-tight">
                        Other
                      </h3>
                      <div className="flex-1 h-px bg-black/10" />
                      <span className="text-[10px] sm:text-xs font-bold text-black/40 uppercase tracking-wider whitespace-nowrap">
                        {uncategorizedMembers.length} members
                      </span>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-5">
                      {uncategorizedMembers.map((member: any) => (
                        <div
                          key={member._id}
                          className="group relative bg-white/90 backdrop-blur-sm border-2 border-black/5 hover:border-purple-500 rounded-2xl sm:rounded-3xl p-4 sm:p-5 transition-all duration-300 hover:shadow-2xl hover:-translate-y-1"
                        >
                          <div className="relative w-full aspect-square mb-4 overflow-hidden rounded-xl sm:rounded-2xl border-2 border-black/5">
                            <img src={member.image} alt={member.name} className="w-full h-full object-cover object-top group-hover:scale-110 transition-transform duration-700" />
                          </div>
                          <div className="text-center space-y-2 mb-4">
                            <h3 className="text-base sm:text-lg font-extrabold text-black line-clamp-1">{member.name}</h3>
                            <div className="inline-flex items-center gap-1.5 bg-yellow-400/30 border-2 border-yellow-600/40 px-3 py-1 rounded-full">
                              <span className="text-yellow-900 text-[10px] sm:text-xs font-black uppercase tracking-wider">{member.role}</span>
                            </div>
                            <p className="text-black/60 text-xs sm:text-sm font-semibold">{member.year}</p>
                          </div>
                          <div className="grid grid-cols-2 gap-2">
                            <a href={`/admin/edit-member/${member._id}`} className="bg-yellow-500 hover:bg-yellow-600 text-black hover:text-white text-center text-xs sm:text-sm font-bold py-2 sm:py-2.5 rounded-lg sm:rounded-xl transition-all duration-300 hover:scale-105 active:scale-95">
                              Edit
                            </a>
                            <DeleteMemberButton id={member._id} />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}
          </section>

        </div>
      </main>
    </>
  );
}