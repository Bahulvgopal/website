"use client";

import { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";

export default function RegisterPage() {
  const { id } = useParams();
  const router = useRouter();

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    department: "",
    year: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const res = await fetch("/api/register", {
        method: "POST",
        body: JSON.stringify({ ...form, eventId: id }),
        headers: { "Content-Type": "application/json" },
      });

      if (res.ok) {
        alert("Registered Successfully 🚀");
        router.push("/events/upcoming");
        router.refresh();
      } else {
        alert("Something went wrong ❌");
      }
    } catch (error) {
      alert("Error submitting registration");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="min-h-screen bg-[#f4b518] flex items-center justify-center p-4 relative overflow-hidden">
      
      {/* Background Decorative Blobs for Glass Effect */}
      <div className="absolute top-20 left-10 w-64 h-64 bg-white/30 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute bottom-20 right-10 w-80 h-80 bg-black/10 rounded-full blur-3xl animate-bounce duration-[5000ms]"></div>

      <div className="w-full max-w-xl bg-white/20 backdrop-blur-xl border border-white/30 rounded-[2.5rem] shadow-2xl p-8 md:p-12 z-10">
        
        <header className="mb-10 text-center">
          <h1 className="text-4xl font-semibold font-black text-black ">
            Registration
          </h1>
        </header>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* NAME */}
          <div className="group">
            <input
              type="text"
              placeholder="Your Full Name"
              required
              className="w-full p-4 rounded-2xl bg-white/30 border border-white/20 placeholder-black/50 text-black font-bold outline-none focus:bg-white/50 focus:border-white transition-all shadow-inner"
              onChange={(e) => setForm({ ...form, name: e.target.value })}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <input
              type="email"
              placeholder="Email Address"
              required
              className="w-full p-4 rounded-2xl bg-white/30 border border-white/20 placeholder-black/50 text-black font-bold outline-none focus:bg-white/50 focus:border-white transition-all"
              onChange={(e) => setForm({ ...form, email: e.target.value })}
            />
            <input
              type="tel"
              placeholder="Phone Number"
              required
              className="w-full p-4 rounded-2xl bg-white/30 border border-white/20 placeholder-black/50 text-black font-bold outline-none focus:bg-white/50 focus:border-white transition-all"
              onChange={(e) => setForm({ ...form, phone: e.target.value })}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <input
              type="text"
              placeholder="Department"
              required
              className="w-full p-4 rounded-2xl bg-white/30 border border-white/20 placeholder-black/50 text-black font-bold outline-none focus:bg-white/50 focus:border-white transition-all"
              onChange={(e) => setForm({ ...form, department: e.target.value })}
            />
            <select
              required
              className="w-full p-4 rounded-2xl bg-white/30 border border-white/20 text-black font-bold outline-none focus:bg-white/50 transition-all appearance-none cursor-pointer"
              onChange={(e) => setForm({ ...form, year: e.target.value })}
            >
              <option value="" className="bg-[#f4b518]">Select Year</option>
              <option value="1" className="bg-[#f4b518]">1st Year</option>
              <option value="2" className="bg-[#f4b518]">2nd Year</option>
              <option value="3" className="bg-[#f4b518]">3rd Year</option>
              <option value="4" className="bg-[#f4b518]">4th Year</option>
            </select>
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full mt-4 bg-black text-white p-5 rounded-2xl font-black uppercase tracking-widest hover:bg-white hover:text-black transition-all duration-500 shadow-xl disabled:opacity-50 flex justify-center items-center gap-3"
          >
            {isSubmitting ? "Processing..." : "Register Now"}
          </button>

          <div className="text-center pt-2">
            <Link 
              href="/events/upcoming" 
              className="text-black/60 hover:text-black font-bold text-sm transition-colors"
            >
              ← Cancel Registration
            </Link>
          </div>
        </form>
      </div>
    </main>
  );
}