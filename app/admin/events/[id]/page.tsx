import { connectDB } from "@/lib/mongodb";
import Registration from "@/models/Registration";
import Event from "@/models/Event";
import mongoose from "mongoose";
import { notFound } from "next/navigation";

export default async function EventDetailsPage(
  props: {
    params: Promise<{ id: string }>;
  }
) {
  await connectDB();

  const { id } = await props.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return notFound();
  }

  const eventId = new mongoose.Types.ObjectId(id);

  const event = await Event.findById(eventId);

  if (!event) return notFound();

  const registrations = await Registration.find({
    eventId,
  }).sort({
    createdAt: -1,
  });

  /* ===========================
        Statistics
  =========================== */

  const totalTeams = registrations.length;

  const totalParticipants =
    event.eventMode === "team"
      ? registrations.reduce(
          (sum: number, reg: any) =>
            sum + ((reg.members?.length || 0) + 1),
          0
        )
      : registrations.length;

  const averageTeamSize =
    event.eventMode === "team" && totalTeams
      ? (
          totalParticipants / totalTeams
        ).toFixed(1)
      : "1";

  const registrationOpen =
    new Date(event.registrationDeadline) >
    new Date();

  return (
    <main className="min-h-screen -mt-[4rem] bg-gradient-to-b from-black via-[#0a0a0a] to-black text-white pt-24 pb-16 px-4 md:px-10 relative overflow-hidden">

      {/* Ambient gold glows — same device used across the rest of the site */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[#f4b518] to-transparent" />
      <div className="absolute top-40 -left-40 w-[420px] h-[420px] bg-[#f4b518] rounded-full blur-[160px] opacity-[0.07] pointer-events-none" />
      <div className="absolute bottom-40 -right-40 w-[420px] h-[420px] bg-[#f4b518] rounded-full blur-[160px] opacity-[0.07] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">

        {/* ===========================
            Back Button
        =========================== */}

        <a
          href="/admin"
          className="inline-flex items-center gap-2 text-[#f4b518] hover:text-white transition font-bold text-sm uppercase tracking-widest mb-8"
        >
          ← Back to Dashboard
        </a>

        {/* ===========================
            Event Card
        =========================== */}

        <div className="bg-gradient-to-br from-[#141414] to-[#0a0a0a] border-2 border-[#f4b518]/20 rounded-[2rem] md:rounded-[2.5rem] overflow-hidden shadow-[0_0_60px_rgba(244,181,24,0.06)] mb-10">

          <div className="flex flex-col lg:flex-row">

            {event.image && (

              <div className="lg:w-[360px] h-72 lg:h-auto relative">
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent z-10 lg:bg-gradient-to-r" />
                <img
                  src={event.image}
                  alt={event.title}
                  className="w-full h-full object-cover"
                />

              </div>

            )}

            <div className="flex-1 p-8 md:p-10">

              <span className="inline-block text-[#f4b518] font-bold text-xs tracking-[0.3em] uppercase mb-3">
                Event Overview
              </span>

              <h1 className="text-3xl md:text-4xl font-black uppercase tracking-tighter mb-6">
                {event.title}
              </h1>

              <div className="space-y-3 text-gray-400 font-light">

                <p>
                  📍 {event.location}
                </p>

                <p>
                  📅{" "}
                  {new Date(
                    event.eventDate
                  ).toLocaleDateString(
                    "en-US",
                    {
                      weekday: "long",
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    }
                  )}
                </p>

                <p>
                  ⏰ Registration Deadline :
                  {" "}
                  {new Date(
                    event.registrationDeadline
                  ).toLocaleDateString()}
                </p>

              </div>

              {/* Badges */}

              <div className="flex flex-wrap gap-3 mt-8">

                <span className="bg-[#f4b518] text-black px-4 py-2 rounded-full font-bold text-xs uppercase tracking-wide">

                  {event.eventMode === "team"
                    ? "👥 Team Event"
                    : "👤 Solo Event"}

                </span>

                <span className="bg-white/10 border border-white/10 px-4 py-2 rounded-full font-bold text-xs uppercase tracking-wide">

                  {event.registrationType ===
                  "external"
                    ? "🌐 External Registration"
                    : "🏠 Internal Registration"}

                </span>

                {event.eventMode === "team" && (

                  <span className="bg-white/10 border border-white/10 px-4 py-2 rounded-full font-bold text-xs uppercase tracking-wide">

                    {event.minTeamMembers}
                    {" - "}
                    {event.maxTeamMembers}
                    {" Members"}

                  </span>

                )}

                <span
                  className={`px-4 py-2 rounded-full font-bold text-xs uppercase tracking-wide ${
                    registrationOpen
                      ? "bg-emerald-500/15 text-emerald-400 border border-emerald-500/30"
                      : "bg-red-500/15 text-red-400 border border-red-500/30"
                  }`}
                >
                  {registrationOpen
                    ? "🟢 Registration Open"
                    : "🔴 Registration Closed"}
                </span>

              </div>

            </div>

          </div>

        </div>

        {/* ===========================
              Statistics Cards
        =========================== */}

        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5 mb-10">

          <div className="bg-white/[0.03] border border-white/10 rounded-2xl p-6 hover:border-[#f4b518]/30 transition-colors">

            <p className="text-gray-500 text-xs uppercase tracking-[0.2em] font-bold">
              {event.eventMode === "team"
                ? "Teams"
                : "Participants"}
            </p>

            <h2 className="text-4xl font-black mt-3 text-[#f4b518]">

              {event.eventMode === "team"
                ? totalTeams
                : totalParticipants}

            </h2>

          </div>

          <div className="bg-white/[0.03] border border-white/10 rounded-2xl p-6 hover:border-[#f4b518]/30 transition-colors">

            <p className="text-gray-500 text-xs uppercase tracking-[0.2em] font-bold">
              Total Participants
            </p>

            <h2 className="text-4xl font-black mt-3 text-[#f4b518]">

              {totalParticipants}

            </h2>

          </div>

          <div className="bg-white/[0.03] border border-white/10 rounded-2xl p-6 hover:border-[#f4b518]/30 transition-colors">

            <p className="text-gray-500 text-xs uppercase tracking-[0.2em] font-bold">

              {event.eventMode === "team"
                ? "Average Team Size"
                : "Event Type"}

            </p>

            <h2 className="text-4xl font-black mt-3 text-[#f4b518]">

              {event.eventMode === "team"
                ? averageTeamSize
                : "Solo"}

            </h2>

          </div>

          <div className="bg-white/[0.03] border border-white/10 rounded-2xl p-6 hover:border-[#f4b518]/30 transition-colors">

            <p className="text-gray-500 text-xs uppercase tracking-[0.2em] font-bold">
              Registration
            </p>

            <h2
              className={`text-2xl font-black mt-4 ${
                registrationOpen
                  ? "text-emerald-400"
                  : "text-red-400"
              }`}
            >

              {registrationOpen
                ? "OPEN"
                : "CLOSED"}

            </h2>

          </div>

        </div>
        {/* ===========================
            Registrations
        =========================== */}

        <div className="bg-white/[0.03] border border-white/10 rounded-[2rem] md:rounded-[2.5rem] overflow-hidden">

          <div className="p-6 md:p-8 border-b border-white/10 flex flex-col lg:flex-row justify-between lg:items-center gap-5">

            <div>

              <span className="inline-block text-[#f4b518] font-bold text-xs tracking-[0.3em] uppercase mb-2">
                Participant Data
              </span>

              <h2 className="text-2xl md:text-3xl font-black uppercase tracking-tighter">
                Registrations
              </h2>

              <p className="text-gray-500 mt-2">

                {event.eventMode === "team"
                  ? `${totalTeams} Teams • ${totalParticipants} Participants`
                  : `${totalParticipants} Participants Registered`}

              </p>

            </div>

            <a
              href={`/api/export/${id}`}
              className="bg-[#f4b518] hover:bg-white text-black transition px-6 py-3 rounded-full font-bold text-sm uppercase tracking-wide flex items-center justify-center gap-2"
            >
              📥 Export CSV
            </a>

          </div>

          {registrations.length === 0 ? (

            <div className="py-20 text-center">

              <div className="text-6xl mb-4 opacity-60">
                📋
              </div>

              <h3 className="text-2xl font-black uppercase tracking-tight">
                No registrations yet
              </h3>

              <p className="text-gray-500 mt-3">
                Registrations will appear here once
                participants start registering.
              </p>

            </div>

          ) : (

            <>

              {/* ===========================
                    Desktop View
              =========================== */}

              {event.eventMode === "solo" ? (

                <div className="hidden lg:block overflow-x-auto">

                  <table className="w-full">

                    <thead>

                      <tr className="border-b border-white/10 text-left text-xs uppercase tracking-widest text-[#f4b518]/80">

                        <th className="p-5">
                          Name
                        </th>

                        <th className="p-5">
                          Email
                        </th>

                        <th className="p-5">
                          Phone
                        </th>

                        <th className="p-5">
                          Department
                        </th>

                        <th className="p-5">
                          Year
                        </th>

                        <th className="p-5">
                          Description
                        </th>

                      </tr>

                    </thead>

                    <tbody>

                      {registrations.map(
                        (reg: any) => (

                          <tr
                            key={reg._id}
                            className="border-b border-white/5 hover:bg-[#f4b518]/[0.04] transition"
                          >

                            <td className="p-5 font-bold">
                              {reg.name}
                            </td>

                            <td className="p-5 text-gray-300">
                              {reg.email}
                            </td>

                            <td className="p-5 text-gray-400">
                              {reg.phone}
                            </td>

                            <td className="p-5 text-gray-400">
                              {reg.department}
                            </td>

                            <td className="p-5">

                              <span className="bg-[#f4b518]/10 text-[#f4b518] px-3 py-1 rounded-full text-sm font-bold">

                                Year {reg.year}

                              </span>

                            </td>

                            <td className="p-5 text-gray-500 max-w-xs truncate">

                              {reg.description || "-"}

                            </td>

                          </tr>

                        )
                      )}

                    </tbody>

                  </table>

                </div>

              ) : (

                <div className="hidden lg:block overflow-x-auto">

                  <table className="w-full">

                    <thead>

                      <tr className="border-b border-white/10 text-left text-xs uppercase tracking-widest text-[#f4b518]/80">

                        <th className="p-5">
                          Team
                        </th>

                        <th className="p-5">
                          Leader
                        </th>

                        <th className="p-5">
                          Contact
                        </th>

                        <th className="p-5">
                          Members
                        </th>

                        <th className="p-5 text-center">
                          Team Size
                        </th>

                      </tr>

                    </thead>

                    <tbody>

                      {registrations.map(
                        (reg: any) => (

                          <tr
                            key={reg._id}
                            className="border-b border-white/5 hover:bg-[#f4b518]/[0.04] transition"
                          >

                            <td className="p-5">

                              <div className="font-black text-lg">

                                 {reg.teamName}

                              </div>

                            </td>

                            <td className="p-5">

                              <div className="font-bold">

                                {reg.name}

                              </div>

                              <div className="text-xs text-gray-500 mt-1">

                                {reg.department} • Year {reg.year}

                              </div>

                            </td>

                            <td className="p-5">

                              <div className="text-gray-300">

                                {reg.email}

                              </div>

                              <div className="text-gray-500 text-sm">

                                {reg.phone}

                              </div>

                            </td>

                            <td className="p-5">

                              <ul className="space-y-1 text-sm text-gray-300">

                                {reg.members?.map(
                                  (
                                    member: any,
                                    index: number
                                  ) => (

                                    <li key={index}>

                                      • {member.name}

                                      <span className="text-gray-500">

                                        {" "}
                                        ({member.department} • Year {member.year})

                                      </span>

                                    </li>

                                  )
                                )}

                              </ul>

                            </td>

                            <td className="text-center font-black text-[#f4b518] text-lg">

                              {(reg.members?.length || 0) + 1}

                            </td>

                          </tr>

                        )
                      )}

                    </tbody>

                  </table>

                </div>

              )}
              {/* ===========================
                    Mobile View
              =========================== */}

              <div className="lg:hidden divide-y divide-white/10">

                {registrations.map((reg: any) => (

                  <div
                    key={reg._id}
                    className="p-6"
                  >

                    {event.eventMode === "solo" ? (

                      <div className="space-y-4">

                        <div className="flex justify-between items-start">

                          <div>

                            <h3 className="font-black text-xl">

                              {reg.name}

                            </h3>

                            <p className="text-gray-400 text-sm mt-1">

                              {reg.email}

                            </p>

                          </div>

                          <span className="bg-[#f4b518]/10 text-[#f4b518] px-3 py-1 rounded-full text-xs font-bold">

                            Year {reg.year}

                          </span>

                        </div>

                        <div className="grid grid-cols-2 gap-4 text-sm">

                          <div>

                            <p className="text-gray-500 uppercase text-[10px] tracking-widest">

                              Phone

                            </p>

                            <p className="mt-1">{reg.phone}</p>

                          </div>

                          <div>

                            <p className="text-gray-500 uppercase text-[10px] tracking-widest">

                              Department

                            </p>

                            <p className="mt-1">{reg.department}</p>

                          </div>

                        </div>

                        <div>

                          <p className="text-gray-500 uppercase text-[10px] tracking-widest">

                            Description

                          </p>

                          <p className="text-gray-300 mt-1">

                            {reg.description || "-"}

                          </p>

                        </div>

                      </div>

                    ) : (

                      <div className="space-y-5">

                        <div className="flex justify-between">

                          <div>

                            <h3 className="text-2xl font-black">

                               {reg.teamName}

                            </h3>

                            <p className="text-gray-400 mt-1">

                              Team Size :{" "}
                              <span className="text-[#f4b518] font-bold">

                                {(reg.members?.length || 0) + 1}

                              </span>

                            </p>

                          </div>

                        </div>

                        {/* Leader */}

                        <div className="bg-white/[0.04] border border-white/10 rounded-2xl p-4">

                          <h4 className="font-bold text-[#f4b518] mb-3 text-xs uppercase tracking-[0.2em]">

                            Team Leader

                          </h4>

                          <div className="space-y-2 text-sm">

                            <p>

                              <strong>Name :</strong>{" "}
                              {reg.name}

                            </p>

                            <p>

                              <strong>Email :</strong>{" "}
                              <span className="text-gray-300">

                                {reg.email}

                              </span>

                            </p>

                            <p>

                              <strong>Phone :</strong>{" "}
                              {reg.phone}

                            </p>

                            <p>

                              <strong>Department :</strong>{" "}
                              {reg.department}

                            </p>

                            <p>

                              <strong>Year :</strong>{" "}
                              {reg.year}

                            </p>

                          </div>

                        </div>

                        {/* Members */}

                        <div className="bg-white/[0.04] border border-white/10 rounded-2xl p-4">

                          <h4 className="font-bold text-[#f4b518] mb-4 text-xs uppercase tracking-[0.2em]">

                            Team Members

                          </h4>

                          <div className="space-y-3">

                            {reg.members?.map(
                              (
                                member: any,
                                index: number
                              ) => (

                                <div
                                  key={index}
                                  className="border border-white/10 rounded-xl p-3"
                                >

                                  <p className="font-semibold text-sm">

                                    {index + 2}. {member.name}

                                  </p>

                                  <p className="text-gray-500 text-xs mt-1">

                                    {member.department} • Year {member.year}

                                  </p>

                                </div>

                              )
                            )}

                          </div>

                        </div>

                        {reg.description && (

                          <div className="bg-white/[0.04] border border-white/10 rounded-2xl p-4">

                            <p className="text-gray-500 uppercase text-[10px] tracking-widest">

                              Leader Description

                            </p>

                            <p className="mt-2 text-sm text-gray-300">

                              {reg.description}

                            </p>

                          </div>

                        )}

                      </div>

                    )}

                  </div>

                ))}

              </div>

            </>

          )}

        </div>
        {/* ===========================
              Admin Summary
        =========================== */}

        <div className="border-t border-white/10 mt-2 p-6">

          <div className="flex flex-col lg:flex-row justify-between lg:items-center gap-6">

            <div>

              <h3 className="text-lg font-black uppercase tracking-tight">
                Event Summary
              </h3>

              <p className="text-gray-500 mt-2">

                {event.eventMode === "team"
                  ? `${totalTeams} teams with ${totalParticipants} participants have registered.`
                  : `${totalParticipants} participants have registered for this event.`}

              </p>

            </div>

            <div className="flex flex-wrap gap-3">

              <a
                href={`/admin/edit/${id}`}
                className="bg-white/10 hover:bg-white/20 border border-white/10 transition px-5 py-3 rounded-full font-bold text-sm uppercase tracking-wide"
              >
                ✏️ Edit Event
              </a>

            </div>

          </div>

        </div>

      </div>

    </main>
  );
}