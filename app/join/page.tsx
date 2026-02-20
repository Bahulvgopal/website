export default function JoinPage() {
  // Replace these with your actual links
  const googleFormLink = "https://forms.google.com/your-form-link";
  
  const socialLinks = [
    {
      name: "Instagram",
      url: "https://instagram.com/your-handle",
      icon: (
        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
        </svg>
      ),
    },
    {
      name: "LinkedIn",
      url: "https://linkedin.com/company/your-company",
      icon: (
        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
          <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
        </svg>
      ),
    },
    {
      name: "Twitter",
      url: "https://twitter.com/your-handle",
      icon: (
        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
        </svg>
      ),
    },
    {
      name: "Facebook",
      url: "https://facebook.com/your-page",
      icon: (
        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
          <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
        </svg>
      ),
    },
    {
      name: "YouTube",
      url: "https://youtube.com/@your-channel",
      icon: (
        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
          <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
        </svg>
      ),
    },
    {
      name: "Discord",
      url: "https://discord.gg/your-server",
      icon: (
        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
          <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028c.462-.63.874-1.295 1.226-1.994a.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z"/>
        </svg>
      ),
    },
  ];

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
        @keyframes scaleIn {
          from {
            opacity: 0;
            transform: scale(0.9);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }
        @keyframes float {
          0%, 100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-10px);
          }
        }
      `}} />
      
      <main className="min-h-screen -mt-4 bg-black overflow-x-hidden">
        {/* Animated Background Elements */}
        <div className="fixed inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-64 sm:w-80 md:w-96 h-64 sm:h-80 md:h-96 bg-[#f4b518]/5 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-1/4 right-1/4 w-64 sm:w-80 md:w-96 h-64 sm:h-80 md:h-96 bg-[#f4b518]/5 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '700ms' }}></div>
        </div>

        {/* Content */}
        <div className="relative pt-16 sm:pt-20 md:pt-24 lg:pt-28 pb-12 sm:pb-16 md:pb-20 px-4 sm:px-6 md:px-8 lg:px-12 w-full">
          <div className="max-w-4xl mx-auto w-full">
            
            {/* Hero Section */}
            <header className="mb-12 sm:mb-16 md:mb-20 text-center" style={{ animation: 'fadeInUp 0.8s ease-out both' }}>
              <div className="inline-block mb-4 sm:mb-6">
                <span className="px-4 sm:px-5 py-2 sm:py-2.5 bg-[#f4b518]/10 border-2 border-[#f4b518]/30 rounded-full text-[#f4b518] text-xs sm:text-sm font-bold tracking-wider backdrop-blur-sm uppercase">
                  ★ Be Part of the Team ★
                </span>
              </div>

              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black text-white mb-4 sm:mb-6 tracking-tight">
                Join{" "}
                <span className="relative inline-block">
                  <span className="absolute inset-0 bg-[#f4b518] blur-2xl opacity-50"></span>
                  <span className="relative text-[#f4b518] drop-shadow-[0_0_30px_rgba(244,181,24,0.5)]">
                    Us
                  </span>
                </span>
              </h1>

              <div className="flex items-center justify-center gap-4 mb-6">
                <div className="h-px w-16 sm:w-20 bg-gradient-to-r from-transparent to-[#f4b518]"></div>
                <div className="w-2 h-2 rotate-45 bg-[#f4b518] shadow-[0_0_15px_rgba(244,181,24,0.6)]"></div>
                <div className="h-px w-16 sm:w-20 bg-gradient-to-l from-transparent to-[#f4b518]"></div>
              </div>

              <p className="text-base sm:text-lg md:text-xl text-gray-400 font-medium max-w-2xl mx-auto px-2">
                Ready to transform your ideas into reality? <span className="text-[#f4b518] font-bold">Join our community</span> of innovators and entrepreneurs
              </p>
            </header>

            {/* Application Form Section */}
            <section className="mb-12 sm:mb-16 md:mb-20" style={{ animation: 'scaleIn 0.8s ease-out 0.2s both' }}>
              <div className="relative bg-gradient-to-br from-zinc-950 to-black border-2 border-[#f4b518] rounded-2xl sm:rounded-3xl p-8 sm:p-10 md:p-12 shadow-[0_0_60px_rgba(244,181,24,0.2)] w-full">
                <div className="absolute inset-0 bg-[#f4b518]/5 rounded-2xl sm:rounded-3xl blur-2xl -z-10"></div>
                
                {/* Corner Accents */}
                <div className="absolute top-0 left-0 w-16 sm:w-20 h-16 sm:h-20 border-t-4 border-l-4 border-[#f4b518] rounded-tl-2xl sm:rounded-tl-3xl"></div>
                <div className="absolute bottom-0 right-0 w-16 sm:w-20 h-16 sm:h-20 border-b-4 border-r-4 border-[#f4b518] rounded-br-2xl sm:rounded-br-3xl"></div>

                <div className="text-center mb-6 sm:mb-8">
                  <div className="w-16 h-16 sm:w-20 sm:h-20 mx-auto mb-4 sm:mb-6 rounded-full bg-gradient-to-br from-[#f4b518] to-[#ffd700] flex items-center justify-center shadow-[0_0_30px_rgba(244,181,24,0.4)]" style={{ animation: 'float 3s ease-in-out infinite' }}>
                    <svg className="w-8 h-8 sm:w-10 sm:h-10 text-black" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z" />
                      <path fillRule="evenodd" d="M4 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v11a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm3 4a1 1 0 000 2h.01a1 1 0 100-2H7zm3 0a1 1 0 000 2h3a1 1 0 100-2h-3zm-3 4a1 1 0 100 2h.01a1 1 0 100-2H7zm3 0a1 1 0 100 2h3a1 1 0 100-2h-3z" clipRule="evenodd" />
                    </svg>
                  </div>

                  <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-white mb-3 sm:mb-4 uppercase tracking-tight">
                    Application Form
                  </h2>
                  
                  <p className="text-sm sm:text-base text-gray-400 mb-6 sm:mb-8 max-w-xl mx-auto">
                    Fill out our application form and take the first step towards joining the Legacy IEDC family
                  </p>

                  <a
                    href="https://docs.google.com/forms/d/e/1FAIpQLSc-BQ1SUNHhZlcaRX6lGMwjUj_DPGVyAN_ZlBbAsHTEs5HJ7Q/viewform?usp=sf_link"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group inline-flex items-center gap-3 bg-gradient-to-r from-[#f4b518] to-[#ffd700] px-8 sm:px-10 md:px-12 py-3.5 sm:py-4 rounded-full font-bold text-base sm:text-lg text-black uppercase tracking-wide transition-all duration-300 hover:scale-105 shadow-[0_0_40px_rgba(244,181,24,0.4)] hover:shadow-[0_0_60px_rgba(244,181,24,0.6)]"
                  >
                    <span>Apply Now</span>
                    <svg className="w-5 h-5 sm:w-6 sm:h-6 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                    </svg>
                  </a>
                </div>
              </div>
            </section>

            {/* Follow Us Section */}
            

            {/* Bottom Message */}
            <div className="mt-12 sm:mt-16 text-center" style={{ animation: 'fadeInUp 0.8s ease-out 0.6s both' }}>
              <div className="relative bg-gradient-to-br from-zinc-950 to-black border-2 border-[#f4b518]/30 rounded-2xl p-6 sm:p-8 shadow-[0_0_30px_rgba(244,181,24,0.1)] w-full">
                <div className="absolute inset-0 bg-[#f4b518]/3 rounded-2xl blur-xl -z-10"></div>
                
                <p className="text-sm sm:text-base md:text-lg text-gray-300 font-medium leading-relaxed">
                  Questions? Reach out to us at{" "}
                  <a href="mailto:contact@legacyiedc.com" className="text-[#f4b518] font-bold hover:underline">
                    iedc.uck@gmail.com
                  </a>
                </p>
              </div>
            </div>

          </div>
        </div>
      </main>
    </>
  );
}