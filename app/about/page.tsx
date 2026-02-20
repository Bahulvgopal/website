export default function AboutPage() {
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
        @keyframes slideInLeft {
          from {
            opacity: 0;
            transform: translateX(-30px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
        @keyframes slideInRight {
          from {
            opacity: 0;
            transform: translateX(30px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
      `}} />
      
      <main className="min-h-screen -mt-4 bg-black overflow-x-hidden">
        {/* Animated Background Elements */}
        <div className="fixed inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-64 sm:w-80 md:w-96 h-64 sm:h-80 md:h-96 bg-[#f4b518]/5 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-1/4 right-1/4 w-64 sm:w-80 md:w-96 h-64 sm:h-80 md:h-96 bg-[#f4b518]/5 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '700ms' }}></div>
          <div className="absolute top-1/2 left-1/2 w-48 sm:w-56 md:w-72 h-48 sm:h-56 md:h-72 bg-[#f4b518]/3 rounded-full blur-2xl animate-pulse" style={{ animationDelay: '1400ms' }}></div>
        </div>

        {/* Content */}
        <div className="relative pt-16 sm:pt-20 md:pt-24 lg:pt-28 pb-12 sm:pb-16 md:pb-20 px-4 sm:px-6 md:px-8 lg:px-12 w-full">
          <div className="max-w-6xl mx-auto w-full">
            
            {/* Hero Section */}
            <header className="mb-12 sm:mb-16 md:mb-20 text-center" style={{ animation: 'fadeInUp 0.8s ease-out both' }}>
              <div className="inline-block mb-4 sm:mb-6">
                <span className="px-4 sm:px-5 py-2 sm:py-2.5 bg-[#f4b518]/10 border-2 border-[#f4b518]/30 rounded-full text-[#f4b518] text-xs sm:text-sm font-bold tracking-wider backdrop-blur-sm uppercase">
                  ★ Our Story ★
                </span>
              </div>

              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black text-white mb-4 sm:mb-6 tracking-tight">
                About{" "}
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

              <p className="text-base sm:text-lg md:text-xl text-gray-400 font-medium max-w-3xl mx-auto">
                We are the <span className="text-[#f4b518] font-bold">change-makers</span> of UCEK
              </p>
            </header>

            {/* Who We Are Section */}
            <section className="mb-16 sm:mb-20 md:mb-24" style={{ animation: 'fadeInUp 0.8s ease-out 0.2s both' }}>
              <div className="relative bg-gradient-to-br from-zinc-950 to-black border-2 border-[#f4b518] rounded-2xl sm:rounded-3xl p-6 sm:p-8 md:p-10 lg:p-12 shadow-[0_0_60px_rgba(244,181,24,0.15)]">
                <div className="absolute inset-0 bg-[#f4b518]/5 rounded-2xl sm:rounded-3xl blur-2xl -z-10"></div>
                
                {/* Corner Accents */}
                <div className="absolute top-0 left-0 w-16 sm:w-20 h-16 sm:h-20 border-t-4 border-l-4 border-[#f4b518] rounded-tl-2xl sm:rounded-tl-3xl"></div>
                <div className="absolute bottom-0 right-0 w-16 sm:w-20 h-16 sm:h-20 border-b-4 border-r-4 border-[#f4b518] rounded-br-2xl sm:rounded-br-3xl"></div>

                <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-[#f4b518] mb-4 sm:mb-6 uppercase tracking-tight">
                  Who We Are
                </h2>
                
                <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-white mb-4 sm:mb-6">
                  Legacy - Innovation and Entrepreneurship Development Centre – UCEK
                </h3>

                <div className="space-y-4 sm:space-y-5 text-sm sm:text-base md:text-lg text-gray-300 leading-relaxed">
                  <p>
                    <span className="text-[#f4b518] font-bold">IEDC-UCEK</span> was set up by the Kerala Startup Mission in the University College of Engineering as part of establishing Innovation and Entrepreneurship Development Centres (IEDCs) all around Kerala in various colleges to promote the culture of startups and to instill the concept of entrepreneurship among students.
                  </p>
                  
                  <p>
                    We branded our IEDC as <span className="text-[#f4b518] font-bold">'Legacy-IEDC-UCEK'</span> and it serves primarily as a <span className="text-white font-semibold">catalyst for entrepreneurship</span> at the institute.
                  </p>
                </div>
              </div>
            </section>

            {/* Scenario Comparison */}
            <section className="mb-16 sm:mb-20 md:mb-24">
              <div className="grid md:grid-cols-2 gap-6 sm:gap-8">
                
                {/* Without IEDC */}
                <div 
                  className="relative bg-gradient-to-br from-zinc-950 to-black border-2 border-zinc-800 rounded-2xl p-6 sm:p-8 hover:border-zinc-700 transition-all duration-500"
                  style={{ animation: 'slideInLeft 0.8s ease-out 0.3s both' }}
                >
                  <div className="absolute top-4 right-4 w-10 h-10 bg-zinc-900 rounded-full flex items-center justify-center">
                    <svg className="w-5 h-5 text-gray-600" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                  </div>

                  <h3 className="text-xl sm:text-2xl font-bold text-white mb-4 pr-12">
                    Without <span className="text-gray-500">IEDC</span>
                  </h3>
                  
                  <ul className="space-y-3 text-sm sm:text-base text-gray-400">
                    <li className="flex items-start gap-3">
                      <span className="text-gray-600 mt-1">•</span>
                      <span>Confined to classrooms and academics</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-gray-600 mt-1">•</span>
                      <span>Limited exposure to real-world skills</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-gray-600 mt-1">•</span>
                      <span>Uncertainty about career paths</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-gray-600 mt-1">•</span>
                      <span>Settling for conventional 9-5 jobs</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-gray-600 mt-1">•</span>
                      <span>Unrealized potential and dreams</span>
                    </li>
                  </ul>
                </div>

                {/* With IEDC */}
                <div 
                  className="relative bg-gradient-to-br from-zinc-950 to-black border-2 border-[#f4b518] rounded-2xl p-6 sm:p-8 shadow-[0_0_40px_rgba(244,181,24,0.2)] hover:shadow-[0_0_60px_rgba(244,181,24,0.3)] transition-all duration-500"
                  style={{ animation: 'slideInRight 0.8s ease-out 0.4s both' }}
                >
                  <div className="absolute inset-0 bg-[#f4b518]/5 rounded-2xl blur-xl -z-10"></div>
                  
                  <div className="absolute top-4 right-4 w-10 h-10 bg-[#f4b518] rounded-full flex items-center justify-center">
                    <svg className="w-5 h-5 text-black" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>

                  <h3 className="text-xl sm:text-2xl font-bold text-white mb-4 pr-12">
                    With <span className="text-[#f4b518]">IEDC</span>
                  </h3>
                  
                  <ul className="space-y-3 text-sm sm:text-base text-gray-300">
                    <li className="flex items-start gap-3">
                      <span className="text-[#f4b518] mt-1">✓</span>
                      <span>Workshops on topics of your interest</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-[#f4b518] mt-1">✓</span>
                      <span>Opportunities to hone and deliver your potential</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-[#f4b518] mt-1">✓</span>
                      <span>World beyond four classroom walls</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-[#f4b518] mt-1">✓</span>
                      <span>Learn to thrive in any environment</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-[#f4b518] mt-1">✓</span>
                      <span>Build, empower, and revolutionize the world</span>
                    </li>
                  </ul>
                </div>
              </div>
            </section>

            {/* What We Offer */}
            <section className="mb-16 sm:mb-20 md:mb-24" style={{ animation: 'fadeInUp 0.8s ease-out 0.5s both' }}>
              <div className="relative bg-gradient-to-br from-[#f4b518]/10 to-black border-2 border-[#f4b518] rounded-2xl sm:rounded-3xl p-8 sm:p-10 md:p-12 lg:p-16 text-center shadow-[0_0_80px_rgba(244,181,24,0.2)]">
                <div className="absolute inset-0 bg-[#f4b518]/5 rounded-2xl sm:rounded-3xl blur-3xl -z-10"></div>

                <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-white mb-6 sm:mb-8 uppercase tracking-tight">
                  What We <span className="text-[#f4b518]">Offer</span>
                </h2>

                <div className="max-w-4xl mx-auto space-y-5 sm:space-y-6 text-base sm:text-lg md:text-xl text-gray-300 leading-relaxed font-medium">
                  <p>
                    We help you <span className="text-[#f4b518] font-bold">create a choice</span> instead of choosing
                  </p>
                  <p>
                    We encompass your dreams with <span className="text-[#f4b518] font-bold">wings to let them fly</span>
                  </p>
                  <p>
                    We enable you to <span className="text-[#f4b518] font-bold">break the boundaries</span>, to make, to sustain, and to leave a mark
                  </p>
                </div>
              </div>
            </section>

            {/* Three Ideals */}
            <section className="mb-16 sm:mb-20 md:mb-24" style={{ animation: 'fadeInUp 0.8s ease-out 0.6s both' }}>
              <div className="text-center mb-10 sm:mb-12">
                <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-white mb-4 uppercase tracking-tight">
                  Built On Three <span className="text-[#f4b518]">Ideals</span>
                </h2>
                <div className="h-1 w-24 sm:w-32 bg-gradient-to-r from-transparent via-[#f4b518] to-transparent mx-auto"></div>
              </div>

              <div className="grid sm:grid-cols-3 gap-6 sm:gap-8">
                {/* CREATE */}
                <div className="group relative bg-gradient-to-br from-zinc-950 to-black border-2 border-[#f4b518] rounded-2xl p-6 sm:p-8 text-center hover:shadow-[0_0_60px_rgba(244,181,24,0.3)] transition-all duration-500 hover:-translate-y-2">
                  <div className="absolute inset-0 bg-[#f4b518]/5 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10"></div>
                  
                  <div className="w-16 h-16 sm:w-20 sm:h-20 mx-auto mb-4 sm:mb-6 rounded-full bg-gradient-to-br from-[#f4b518] to-[#ffd700] flex items-center justify-center shadow-[0_0_30px_rgba(244,181,24,0.4)]">
                    <svg className="w-8 h-8 sm:w-10 sm:h-10 text-black" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z" clipRule="evenodd" />
                    </svg>
                  </div>
                  
                  <h3 className="text-2xl sm:text-3xl font-black text-[#f4b518] mb-3 uppercase tracking-tight">
                    Create
                  </h3>
                  
                  <p className="text-sm sm:text-base text-gray-400">
                    Innovate and build solutions that matter
                  </p>
                </div>

                {/* SUSTAIN */}
                <div className="group relative bg-gradient-to-br from-zinc-950 to-black border-2 border-[#f4b518] rounded-2xl p-6 sm:p-8 text-center hover:shadow-[0_0_60px_rgba(244,181,24,0.3)] transition-all duration-500 hover:-translate-y-2">
                  <div className="absolute inset-0 bg-[#f4b518]/5 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10"></div>
                  
                  <div className="w-16 h-16 sm:w-20 sm:h-20 mx-auto mb-4 sm:mb-6 rounded-full bg-gradient-to-br from-[#f4b518] to-[#ffd700] flex items-center justify-center shadow-[0_0_30px_rgba(244,181,24,0.4)]">
                    <svg className="w-8 h-8 sm:w-10 sm:h-10 text-black" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                  </div>
                  
                  <h3 className="text-2xl sm:text-3xl font-black text-[#f4b518] mb-3 uppercase tracking-tight">
                    Sustain
                  </h3>
                  
                  <p className="text-sm sm:text-base text-gray-400">
                    Maintain and grow what you create
                  </p>
                </div>

                {/* THRIVE */}
                <div className="group relative bg-gradient-to-br from-zinc-950 to-black border-2 border-[#f4b518] rounded-2xl p-6 sm:p-8 text-center hover:shadow-[0_0_60px_rgba(244,181,24,0.3)] transition-all duration-500 hover:-translate-y-2 sm:col-span-1">
                  <div className="absolute inset-0 bg-[#f4b518]/5 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10"></div>
                  
                  <div className="w-16 h-16 sm:w-20 sm:h-20 mx-auto mb-4 sm:mb-6 rounded-full bg-gradient-to-br from-[#f4b518] to-[#ffd700] flex items-center justify-center shadow-[0_0_30px_rgba(244,181,24,0.4)]">
                    <svg className="w-8 h-8 sm:w-10 sm:h-10 text-black" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  </div>
                  
                  <h3 className="text-2xl sm:text-3xl font-black text-[#f4b518] mb-3 uppercase tracking-tight">
                    Thrive
                  </h3>
                  
                  <p className="text-sm sm:text-base text-gray-400">
                    Excel and make a lasting impact
                  </p>
                </div>
              </div>
            </section>

            {/* Closing Statement */}
            <section className="text-center" style={{ animation: 'fadeInUp 0.8s ease-out 0.7s both' }}>
              <div className="relative bg-gradient-to-br from-zinc-950 to-black border-2 border-[#f4b518] rounded-2xl sm:rounded-3xl p-8 sm:p-10 md:p-12 shadow-[0_0_60px_rgba(244,181,24,0.2)]">
                <div className="absolute inset-0 bg-[#f4b518]/5 rounded-2xl sm:rounded-3xl blur-2xl -z-10"></div>
                
                <p className="text-lg sm:text-xl md:text-2xl text-gray-300 font-medium leading-relaxed max-w-4xl mx-auto">
                  Every member of <span className="text-[#f4b518] font-bold">Legacy IEDC UCEK</span> believes in this ideology. We are a club of <span className="text-white font-semibold">simple yet powerful human beings</span> working passionately to make it happen.
                </p>
              </div>
            </section>

          </div>
        </div>
      </main>
    </>
  );
}