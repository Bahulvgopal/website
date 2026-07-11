"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";

type EventDetails = {
  registrationType: "internal" | "external";
  externalRegistrationUrl?: string;

  eventMode: "solo" | "team";

  minTeamMembers: number;

  maxTeamMembers: number;
};

type TeamMember = {
  name: string;
  department: string;
  year: string;
};

export default function RegisterPage() {
  const { id } = useParams();
  const router = useRouter();

  const [event, setEvent] = useState<EventDetails | null>(null);

  const [checkingEvent, setCheckingEvent] = useState(true);

  const [isSubmitting, setIsSubmitting] =
    useState(false);

  /* ===========================
        Leader / Solo Form
  =========================== */

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    department: "",
    year: "",
    description: "",
  });

  /* ===========================
          Team Form
  =========================== */

  const [teamName, setTeamName] =
    useState("");

  const [members, setMembers] = useState<
    TeamMember[]
  >([]);

  /* ===========================
      Load Event
  =========================== */

  useEffect(() => {
    if (!id) return;

    async function loadEvent() {
      try {
        const res = await fetch(
          `/api/events/${id}`
        );

        if (!res.ok) {
          setCheckingEvent(false);
          return;
        }

        const data = await res.json();

        if (
          data.registrationType ===
            "external" &&
          data.externalRegistrationUrl
        ) {
          window.location.href =
            data.externalRegistrationUrl;
          return;
        }

        setEvent({
          registrationType:
            data.registrationType,

          externalRegistrationUrl:
            data.externalRegistrationUrl,

          eventMode:
            data.eventMode || "solo",

          minTeamMembers:
            data.minTeamMembers || 1,

          maxTeamMembers:
            data.maxTeamMembers || 1,
        });
      } catch (err) {
        console.error(err);
      } finally {
        setCheckingEvent(false);
      }
    }

    loadEvent();
  }, [id]);

  /* ===========================
      Add Member
  =========================== */

  function addMember() {
    if (!event) return;

    if (
      members.length + 1 >=
      event.maxTeamMembers
    )
      return;

    setMembers([
      ...members,
      {
        name: "",
        department: "",
        year: "",
      },
    ]);
  }

  /* ===========================
      Remove Member
  =========================== */

  function removeMember(index: number) {
    setMembers(
      members.filter(
        (_, i) => i !== index
      )
    );
  }

  /* ===========================
      Update Member
  =========================== */

  function updateMember(
    index: number,
    field: keyof TeamMember,
    value: string
  ) {
    const updated = [...members];

    updated[index][field] = value;

    setMembers(updated);
  }

  /* ===========================
      Submit
  =========================== */

  async function handleSubmit(
    e: React.FormEvent
  ) {
    e.preventDefault();

    if (!event) return;

    if (
      event.eventMode === "team"
    ) {
      const totalMembers =
        members.length + 1;

      if (
        totalMembers <
        event.minTeamMembers
      ) {
        alert(
          `Minimum team size is ${event.minTeamMembers}`
        );

        return;
      }

      if (!teamName.trim()) {
        alert(
          "Please enter a team name."
        );

        return;
      }

      for (const member of members) {
        if (
          !member.name ||
          !member.department ||
          !member.year
        ) {
          alert(
            "Please complete all team member details."
          );

          return;
        }
      }
    }

    setIsSubmitting(true);

    try {
      const payload =
        event.eventMode === "solo"
          ? {
              eventId: id,
              isTeam: false,
              ...form,
            }
          : {
              eventId: id,

              isTeam: true,

              teamName,

              ...form,

              members,
            };

      const res = await fetch(
        "/api/register",
        {
          method: "POST",

          headers: {
            "Content-Type":
              "application/json",
          },

          body: JSON.stringify(
            payload
          ),
        }
      );

      if (!res.ok) {
        throw new Error();
      }

      alert(
        "Registered Successfully 🚀"
      );

      router.push(
        "/events/upcoming"
      );

      router.refresh();
    } catch (err) {
      alert(
        "Registration failed."
      );
    } finally {
      setIsSubmitting(false);
    }
  }

  /* ===========================
        Shared field styles
  =========================== */

  const fieldClass =
    "w-full p-4 rounded-2xl bg-white/[0.04] border border-white/10 placeholder-white/30 text-white font-bold outline-none focus:bg-white/[0.07] focus:border-[#f4b518] transition-all duration-300";

  const selectClass =
    "w-full p-4 rounded-2xl bg-white/[0.04] border border-white/10 text-white font-bold outline-none focus:bg-white/[0.07] focus:border-[#f4b518] transition-all duration-300 appearance-none";

  /* ===========================
        Loading
  =========================== */

  if (checkingEvent) {
    return (
      <main className="min-h-screen bg-black flex items-center justify-center relative overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-[#f4b518] rounded-full blur-[150px] opacity-10" />
        <div className="w-12 h-12 border-4 border-[#f4b518] border-t-transparent rounded-full animate-spin relative z-10" />
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gradient-to-b from-black via-[#0a0a0a] to-black flex items-center justify-center p-4 md:p-8 relative overflow-hidden">
      {/* Decorative gold glows — same device used on the home page's dark sections */}
      {/* <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[#f4b518] to-transparent" /> */}
      {/* <div className="absolute top-1/4 -left-32 w-[420px] h-[420px] bg-[#f4b518] rounded-full blur-[150px] opacity-10 pointer-events-none" /> */}
      {/* <div className="absolute bottom-1/4 -right-32 w-[420px] h-[420px] bg-[#f4b518] rounded-full blur-[150px] opacity-10 pointer-events-none" /> */}
      <div
        className="absolute inset-0 opacity-[0.05] pointer-events-none"
        style={{
          backgroundImage:
            "radial-gradient(rgba(244,181,24,0.6) 1px, transparent 1px)",
          backgroundSize: "28px 28px",
        }}
      />

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
        className="w-full max-w-2xl bg-gradient-to-br from-[#1a1a1a] to-[#0a0a0a] border-2 border-[#f4b518]/20 rounded-[2rem] md:rounded-[2.5rem] shadow-[0_0_80px_rgba(244,181,24,0.08)] p-8 md:p-12 z-10 relative"
      >
        {/* corner accent, echoes the "Featured" event card treatment */}
        {/* <div className="absolute top-0 right-0 w-24 h-24 bg-[#f4b518]/10 rounded-bl-full rounded-tr-[2rem] md:rounded-tr-[2.5rem] pointer-events-none" /> */}

        <header className="mb-10 text-center relative z-10">
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="inline-block text-[#f4b518] font-bold text-xs md:text-sm tracking-[0.3em] uppercase mb-3"
          >
            {event?.eventMode === "team" ? "Team Registration" : "Event Registration"}
          </motion.span>

          <h1 className="text-4xl md:text-5xl font-black uppercase tracking-tighter text-white">
            Register
          </h1>

          <div className="w-16 h-1 bg-[#f4b518] mx-auto rounded-full mt-4" />

          {event?.eventMode === "team" && (
            <p className="mt-5 text-white/60 font-semibold text-sm md:text-base">
              Minimum Members: <span className="text-[#f4b518]">{event.minTeamMembers}</span>
              {"  •  "}
              Maximum Members: <span className="text-[#f4b518]">{event.maxTeamMembers}</span>
            </p>
          )}
        </header>

        <form
          onSubmit={
            handleSubmit
          }
          className="space-y-6 relative z-10"
        >
          {/* ===========================
                Team Name
          =========================== */}

          {event?.eventMode === "team" && (
            <div className="group">
              <input
                type="text"
                required
                value={teamName}
                placeholder="Team Name"
                className={fieldClass}
                onChange={(e) =>
                  setTeamName(e.target.value)
                }
              />
            </div>
          )}

          {/* ===========================
                  Leader
          =========================== */}

          {event?.eventMode === "team" && (
            <div className="flex items-center gap-3 pt-2">
              <span className="text-[#f4b518] font-black text-2xl leading-none">01</span>
              <h2 className="text-lg md:text-xl font-black uppercase tracking-tight text-white">
                Team Leader Details
              </h2>
            </div>
          )}

          {/* NAME */}

          <div className="group">
            <input
              type="text"
              required
              value={form.name}
              placeholder={
                event?.eventMode === "team"
                  ? "Leader Name"
                  : "Your Full Name"
              }
              className={fieldClass}
              onChange={(e) =>
                setForm({
                  ...form,
                  name: e.target.value,
                })
              }
            />
          </div>

          {/* Email + Phone */}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

            <input
              type="email"
              required
              value={form.email}
              placeholder="Email Address"
              className={fieldClass}
              onChange={(e) =>
                setForm({
                  ...form,
                  email: e.target.value,
                })
              }
            />

            <input
              type="tel"
              required
              value={form.phone}
              placeholder="Phone Number"
              className={fieldClass}
              onChange={(e) =>
                setForm({
                  ...form,
                  phone: e.target.value,
                })
              }
            />

          </div>

          {/* Department + Year */}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

            <select
              required
              value={form.department}
              className={selectClass}
              onChange={(e) =>
                setForm({
                  ...form,
                  department:
                    e.target.value,
                })
              }
            >
              <option value="" className="bg-[#111]">
                Select Department
              </option>

              <option value="CSE" className="bg-[#111]">
                Computer Science Engineering
              </option>

              <option value="ECE" className="bg-[#111]">
                Electronics &
                Communication
              </option>

              <option value="EEE" className="bg-[#111]">
                Information Technology
              </option>

            </select>

            <select
              required
              value={form.year}
              className={selectClass}
              onChange={(e) =>
                setForm({
                  ...form,
                  year:
                    e.target.value,
                })
              }
            >
              <option value="" className="bg-[#111]">
                Select Year
              </option>

              <option value="1" className="bg-[#111]">
                1st Year
              </option>

              <option value="2" className="bg-[#111]">
                2nd Year
              </option>

              <option value="3" className="bg-[#111]">
                3rd Year
              </option>

              <option value="4" className="bg-[#111]">
                4th Year
              </option>

            </select>

          </div>

          {/* Description */}

          <textarea
            rows={4}
            value={form.description}
            placeholder="Why are you interested / any notes..."
            className={fieldClass}
            onChange={(e) =>
              setForm({
                ...form,
                description:
                  e.target.value,
              })
            }
          />

          {/* ===========================
                Team Members
          =========================== */}

          {event?.eventMode === "team" && (
            <>
              <div className="flex justify-between items-center pt-4">

                <div className="flex items-center gap-3">
                  <span className="text-[#f4b518] font-black text-2xl leading-none">02</span>
                  <h2 className="text-lg md:text-xl font-black uppercase tracking-tight text-white">
                    Team Members
                  </h2>
                </div>

                {members.length + 1 <
                  event.maxTeamMembers && (
                  <motion.button
                    type="button"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={addMember}
                    className="bg-[#f4b518] text-black px-4 py-2 rounded-full font-bold text-sm uppercase tracking-wide hover:bg-white transition-colors"
                  >
                    + Add Member
                  </motion.button>
                )}

              </div>

              <AnimatePresence initial={false}>
                {members.map(
                  (member, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, height: 0 }}
                      className="bg-white/[0.03] rounded-3xl border border-white/10 p-6 space-y-5"
                    >
                      <div className="flex justify-between items-center">

                        <h3 className="font-black text-white text-base uppercase tracking-tight">
                          Member {index + 2}
                        </h3>

                        <button
                          type="button"
                          onClick={() =>
                            removeMember(
                              index
                            )
                          }
                          className="text-red-400 font-bold text-sm hover:underline"
                        >
                          Remove
                        </button>

                      </div>
                      {/* Member Name */}

                      <input
                        type="text"
                        required
                        value={member.name}
                        placeholder="Member Name"
                        className={fieldClass}
                        onChange={(e) =>
                          updateMember(
                            index,
                            "name",
                            e.target.value
                          )
                        }
                      />

                      {/* Department + Year */}

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

                        <select
                          required
                          value={member.department}
                          className={selectClass}
                          onChange={(e) =>
                            updateMember(
                              index,
                              "department",
                              e.target.value
                            )
                          }
                        >
                          <option value="" className="bg-[#111]">
                            Select Department
                          </option>

                          <option value="CSE" className="bg-[#111]">
                            Computer Science Engineering
                          </option>

                          <option value="ECE" className="bg-[#111]">
                            Electronics &
                            Communication
                          </option>

                          <option value="EEE" className="bg-[#111]">
                            Information Technology
                          </option>

                        </select>

                        <select
                          required
                          value={member.year}
                          className={selectClass}
                          onChange={(e) =>
                            updateMember(
                              index,
                              "year",
                              e.target.value
                            )
                          }
                        >
                          <option value="" className="bg-[#111]">
                            Select Year
                          </option>

                          <option value="1" className="bg-[#111]">
                            1st Year
                          </option>

                          <option value="2" className="bg-[#111]">
                            2nd Year
                          </option>

                          <option value="3" className="bg-[#111]">
                            3rd Year
                          </option>

                          <option value="4" className="bg-[#111]">
                            4th Year
                          </option>

                        </select>

                      </div>

                    </motion.div>
                  )
                )}
              </AnimatePresence>

              <div className="bg-[#f4b518]/10 border border-[#f4b518]/20 rounded-2xl p-4 text-white font-bold text-center text-sm md:text-base">

                Current Team Size :
                {" "}
                <span className="text-[#f4b518]">{members.length + 1}</span>
                {" / "}
                <span className="text-[#f4b518]">{event.maxTeamMembers}</span>

              </div>

            </>
          )}

          {/* Submit */}

          <motion.button
            type="submit"
            disabled={isSubmitting}
            whileHover={{ scale: isSubmitting ? 1 : 1.02 }}
            whileTap={{ scale: isSubmitting ? 1 : 0.98 }}
            className="w-full mt-4 bg-[#f4b518] text-black p-5 rounded-2xl font-black uppercase tracking-widest hover:bg-white transition-colors duration-300 shadow-xl shadow-[#f4b518]/10 disabled:opacity-50 flex justify-center items-center gap-3"
          >
            {isSubmitting && (
              <span className="w-4 h-4 border-2 border-black border-t-transparent rounded-full animate-spin" />
            )}
            {isSubmitting
              ? "Processing..."
              : event?.eventMode === "team"
              ? "Register Team"
              : "Register Now"}
          </motion.button>

          <div className="text-center pt-2">

            <Link
              href="/events/upcoming"
              className="text-white/50 hover:text-[#f4b518] font-bold text-sm transition-colors"
            >
              ← Cancel Registration
            </Link>

          </div>
        </form>

      </motion.div>

    </main>
  );
}