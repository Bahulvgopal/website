"use client";

import { useState } from "react";

export default function SubmitIdeaPage() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    department: "",
    year: "",
    ideaTitle: "",
    ideaDescription: "",
  });

  const [loading, setLoading] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);

    const res = await fetch("/api/submit-idea", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(form),
    });

    if (res.ok) {
      setShowSuccess(true);
      setForm({
        name: "",
        email: "",
        phone: "",
        department: "",
        year: "",
        ideaTitle: "",
        ideaDescription: "",
      });
      
      // Hide success message after 5 seconds
      setTimeout(() => {
        setShowSuccess(false);
      }, 5000);
    } else {
      alert("Submission failed. Please try again.");
    }

    setLoading(false);
  }

  return (
    <>
      <style dangerouslySetInnerHTML={{__html: `
        body, html {
          overflow-x: hidden;
          max-width: 100vw;
        }
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        @keyframes slideDown {
          from {
            opacity: 0;
            transform: translateY(-20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}} />

      <main className="min-h-screen -mt-4 bg-black overflow-x-hidden">
        {/* Animated Background Elements */}
        <div className="fixed inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-64 sm:w-80 md:w-96 h-64 sm:h-80 md:h-96 bg-[#f4b518]/5 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-1/4 right-1/4 w-64 sm:w-80 md:w-96 h-64 sm:h-80 md:h-96 bg-[#f4b518]/5 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '700ms' }}></div>
        </div>

        {/* Success Message */}
        {showSuccess && (
          <div 
            className="fixed top-20 sm:top-24 left-1/2 transform -translate-x-1/2 z-50 w-11/12 sm:w-auto max-w-md"
            style={{ animation: 'slideDown 0.5s ease-out' }}
          >
            <div className="bg-gradient-to-r from-[#f4b518] to-[#ffd700] text-black px-6 py-4 rounded-xl shadow-2xl flex items-center gap-3 border-2 border-[#f4b518]">
              <svg className="w-6 h-6 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              <span className="font-bold">Idea submitted successfully! We'll get back to you soon.</span>
            </div>
          </div>
        )}

        {/* Content */}
        <div className="relative pt-16 sm:pt-20 md:pt-24 lg:pt-28 pb-12 sm:pb-16 md:pb-20 px-4 sm:px-6 md:px-8 lg:px-12 w-full">
          <div className="max-w-4xl mx-auto w-full">
            
            {/* Hero Section */}
            <header className="mb-10 sm:mb-12 md:mb-16 text-center" style={{ animation: 'fadeInUp 0.8s ease-out both' }}>
              <div className="inline-block mb-4 sm:mb-5">
                <span className="px-3 sm:px-4 py-1.5 sm:py-2 bg-[#f4b518]/10 border-2 border-[#f4b518]/30 rounded-full text-[#f4b518] text-xs sm:text-sm font-bold tracking-wider backdrop-blur-sm uppercase">
                  ★ Innovation Starts Here ★
                </span>
              </div>

              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-white mb-3 sm:mb-4 tracking-tight">
                Submit Your{" "}
                <span className="relative inline-block">
                  <span className="absolute inset-0 bg-[#f4b518] blur-2xl opacity-50"></span>
                  <span className="relative text-[#f4b518] drop-shadow-[0_0_30px_rgba(244,181,24,0.5)]">
                    Startup Idea
                  </span>
                </span>
              </h1>

              <div className="flex items-center justify-center gap-4 mb-4 sm:mb-6">
                <div className="h-px w-12 sm:w-16 bg-gradient-to-r from-transparent to-[#f4b518]"></div>
                <div className="w-2 h-2 rotate-45 bg-[#f4b518] shadow-[0_0_15px_rgba(244,181,24,0.6)]"></div>
                <div className="h-px w-12 sm:w-16 bg-gradient-to-l from-transparent to-[#f4b518]"></div>
              </div>

              <p className="text-sm sm:text-base md:text-lg text-gray-400 font-medium max-w-2xl mx-auto px-2">
                Share your innovative ideas with us. We're here to help you turn your vision into reality.
              </p>
            </header>

            {/* Form Section */}
            <div style={{ animation: 'fadeInUp 0.8s ease-out 0.2s both' }}>
              <div className="relative bg-gradient-to-br from-zinc-950 to-black border-2 border-[#f4b518] rounded-2xl sm:rounded-3xl p-6 sm:p-8 md:p-10 lg:p-12 shadow-[0_0_60px_rgba(244,181,24,0.2)] w-full">
                <div className="absolute inset-0 bg-[#f4b518]/5 rounded-2xl sm:rounded-3xl blur-2xl -z-10"></div>
                
                {/* Corner Accents */}
                <div className="absolute top-0 left-0 w-12 sm:w-16 md:w-20 h-12 sm:h-16 md:h-20 border-t-4 border-l-4 border-[#f4b518] rounded-tl-2xl sm:rounded-tl-3xl"></div>
                <div className="absolute bottom-0 right-0 w-12 sm:w-16 md:w-20 h-12 sm:h-16 md:h-20 border-b-4 border-r-4 border-[#f4b518] rounded-br-2xl sm:rounded-br-3xl"></div>

                {/* Form Icon */}
                <div className="text-center mb-6 sm:mb-8">
                  <div className="w-16 h-16 sm:w-20 sm:h-20 mx-auto mb-4 sm:mb-6 rounded-full bg-gradient-to-br from-[#f4b518] to-[#ffd700] flex items-center justify-center shadow-[0_0_30px_rgba(244,181,24,0.4)]">
                    <svg className="w-8 h-8 sm:w-10 sm:h-10 text-black" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z" />
                      <path fillRule="evenodd" d="M4 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v11a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm3 4a1 1 0 000 2h.01a1 1 0 100-2H7zm3 0a1 1 0 000 2h3a1 1 0 100-2h-3zm-3 4a1 1 0 100 2h.01a1 1 0 100-2H7zm3 0a1 1 0 100 2h3a1 1 0 100-2h-3z" clipRule="evenodd" />
                    </svg>
                  </div>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-5">
                  {/* Name */}
                  <div>
                    <label className="block text-sm font-bold text-white mb-2">
                      Full Name <span className="text-[#f4b518]">*</span>
                    </label>
                    <input
                      type="text"
                      placeholder="Enter your full name"
                      required
                      value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                      className="w-full bg-zinc-900 border-2 border-zinc-700 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:border-[#f4b518] focus:outline-none transition-colors"
                    />
                  </div>

                  {/* Email */}
                  <div>
                    <label className="block text-sm font-bold text-white mb-2">
                      Email Address <span className="text-[#f4b518]">*</span>
                    </label>
                    <input
                      type="email"
                      placeholder="your.email@example.com"
                      required
                      value={form.email}
                      onChange={(e) => setForm({ ...form, email: e.target.value })}
                      className="w-full bg-zinc-900 border-2 border-zinc-700 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:border-[#f4b518] focus:outline-none transition-colors"
                    />
                  </div>

                  {/* Phone */}
                  <div>
                    <label className="block text-sm font-bold text-white mb-2">
                      Phone Number <span className="text-[#f4b518]">*</span>
                    </label>
                    <input
                      type="text"
                      placeholder="+91 98765 43210"
                      required
                      value={form.phone}
                      onChange={(e) => setForm({ ...form, phone: e.target.value })}
                      className="w-full bg-zinc-900 border-2 border-zinc-700 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:border-[#f4b518] focus:outline-none transition-colors"
                    />
                  </div>

                  {/* Department and Year - Grid on larger screens */}
                  <div className="grid sm:grid-cols-2 gap-4 sm:gap-5">
                    {/* Department */}
                    <div>
                      <label className="block text-sm font-bold text-white mb-2">
                        Department <span className="text-[#f4b518]">*</span>
                      </label>
                      <input
                        type="text"
                        placeholder="e.g., Computer Science"
                        required
                        value={form.department}
                        onChange={(e) => setForm({ ...form, department: e.target.value })}
                        className="w-full bg-zinc-900 border-2 border-zinc-700 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:border-[#f4b518] focus:outline-none transition-colors"
                      />
                    </div>

                    {/* Year */}
                    <div>
                      <label className="block text-sm font-bold text-white mb-2">
                        Year <span className="text-[#f4b518]">*</span>
                      </label>
                      <input
                        type="text"
                        placeholder="e.g., 2nd Year"
                        required
                        value={form.year}
                        onChange={(e) => setForm({ ...form, year: e.target.value })}
                        className="w-full bg-zinc-900 border-2 border-zinc-700 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:border-[#f4b518] focus:outline-none transition-colors"
                      />
                    </div>
                  </div>

                  {/* Idea Title */}
                  <div>
                    <label className="block text-sm font-bold text-white mb-2">
                      Idea Title <span className="text-[#f4b518]">*</span>
                    </label>
                    <input
                      type="text"
                      placeholder="Give your startup idea a catchy name"
                      required
                      value={form.ideaTitle}
                      onChange={(e) => setForm({ ...form, ideaTitle: e.target.value })}
                      className="w-full bg-zinc-900 border-2 border-zinc-700 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:border-[#f4b518] focus:outline-none transition-colors"
                    />
                  </div>

                  {/* Idea Description */}
                  <div>
                    <label className="block text-sm font-bold text-white mb-2">
                      Describe Your Idea <span className="text-[#f4b518]">*</span>
                    </label>
                    <textarea
                      placeholder="Describe your startup idea in detail. Include the problem you're solving, your solution, and what makes it unique..."
                      required
                      rows={6}
                      value={form.ideaDescription}
                      onChange={(e) => setForm({ ...form, ideaDescription: e.target.value })}
                      className="w-full bg-zinc-900 border-2 border-zinc-700 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:border-[#f4b518] focus:outline-none transition-colors resize-none"
                    />
                    <p className="text-xs text-gray-500 mt-2">
                      Minimum 50 characters recommended
                    </p>
                  </div>

                  {/* Submit Button */}
                  <div className="pt-4">
                    <button
                      type="submit"
                      disabled={loading}
                      className="w-full bg-gradient-to-r from-[#f4b518] to-[#ffd700] text-black font-black py-3 sm:py-4 rounded-lg uppercase tracking-wider text-sm sm:text-base hover:shadow-lg hover:shadow-[#f4b518]/50 transition-all duration-300 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 flex items-center justify-center gap-2"
                    >
                      {loading ? (
                        <>
                          <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                          </svg>
                          <span>Submitting...</span>
                        </>
                      ) : (
                        <>
                          <span>Submit Idea</span>
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                          </svg>
                        </>
                      )}
                    </button>
                  </div>
                </form>
              </div>
            </div>

            {/* Info Card */}
            <div className="mt-8 sm:mt-10 text-center" style={{ animation: 'fadeInUp 0.8s ease-out 0.4s both' }}>
              <div className="relative bg-gradient-to-br from-zinc-950 to-black border-2 border-[#f4b518]/30 rounded-2xl p-6 sm:p-8 shadow-[0_0_30px_rgba(244,181,24,0.1)] w-full">
                <div className="absolute inset-0 bg-[#f4b518]/3 rounded-2xl blur-xl -z-10"></div>
                
                <div className="flex flex-col sm:flex-row items-center justify-center gap-4 text-sm sm:text-base text-gray-300">
                  <div className="flex items-center gap-2">
                    <svg className="w-5 h-5 text-[#f4b518]" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                    </svg>
                    <span className="font-medium">We review all submissions</span>
                  </div>
                  <span className="hidden sm:inline text-gray-600">•</span>
                  <div className="flex items-center gap-2">
                    <svg className="w-5 h-5 text-[#f4b518]" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                      <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                    </svg>
                    <span className="font-medium">Response within 5-7 days</span>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </main>
    </>
  );
}