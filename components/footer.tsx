import Link from "next/link";
import Image from "next/image";

export default function Footer() {
  return (
    <footer className="bg-gradient-to-b from-[#f4b518] to-[#e5a614] text-black relative overflow-hidden border-t border-black/10">
      {/* Decorative Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-10">
        <div className="absolute bottom-0 left-1/4 w-[400px] h-[400px] bg-black rounded-full blur-[150px]" />
        <div className="absolute bottom-0 right-1/4 w-[300px] h-[300px] bg-black rounded-full blur-[120px]" />
      </div>

      <div className="relative z-10">
        {/* Main Footer Content */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16 lg:py-20">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 md:gap-12 lg:gap-16">
            
            {/* Logo & Tagline */}
            <div className="space-y-6 lg:col-span-1">
              <div className="flex items-center gap-3">
                <Image 
                  src="/legacy.png" 
                  alt="Legacy IEDC" 
                  width={80} 
                  height={40} 
                  className="h-auto w-16 md:w-20 object-contain"
                  style={{ width: 'auto', height: 'auto' }}
                />
                <div className="h-10 w-[2px] bg-black/30" />
                <Image 
                  src="/iedc.png" 
                  alt="IEDC" 
                  width={120} 
                  height={40} 
                  className="h-auto w-28 md:w-36 object-contain"
                  style={{ width: 'auto', height: 'auto' }}
                />
              </div>
              <p className="text-black/70 text-sm md:text-base leading-relaxed font-semibold">
                Empowering the next generation of entrepreneurs at UCEK.
              </p>
              <div className="flex items-center gap-2">
                <div className="w-12 h-1 bg-black rounded-full" />
                <div className="w-6 h-1 bg-black/50 rounded-full" />
                <div className="w-3 h-1 bg-black/30 rounded-full" />
              </div>
            </div>

            {/* Pages */}
            <div className="space-y-6">
              <h3 className="text-lg md:text-xl font-black uppercase tracking-wider text-black">
                Pages
              </h3>
              <ul className="space-y-3">
                <li>
                  <Link 
                    href="/team/current" 
                    className="text-black/70 hover:text-black transition-colors duration-300 text-sm md:text-base font-bold flex items-center gap-2 group"
                  >
                    <span className="w-0 group-hover:w-2 h-0.5 bg-black transition-all duration-300" />
                    Team
                  </Link>
                </li>
                <li>
                  <Link 
                    href="/events/upcoming" 
                    className="text-black/70 hover:text-black transition-colors duration-300 text-sm md:text-base font-bold flex items-center gap-2 group"
                  >
                    <span className="w-0 group-hover:w-2 h-0.5 bg-black transition-all duration-300" />
                    Events
                  </Link>
                </li>
                <li>
                  <Link 
                    href="/about" 
                    className="text-black/70 hover:text-black transition-colors duration-300 text-sm md:text-base font-bold flex items-center gap-2 group"
                  >
                    <span className="w-0 group-hover:w-2 h-0.5 bg-black transition-all duration-300" />
                    About Us
                  </Link>
                </li>
              </ul>
            </div>

            {/* Address */}
            <div className="space-y-6">
              <h3 className="text-lg md:text-xl font-black uppercase tracking-wider text-black">
                Address
              </h3>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-lg bg-black/10 flex items-center justify-center flex-shrink-0 mt-1 border border-black/20">
                    <svg className="w-5 h-5 text-black" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <p className="text-black/70 text-sm md:text-base leading-relaxed font-semibold">
                    University College of Engineering<br />
                    Golden Jubilee Building, Karyavattam<br />
                    Thripadapuram Rd, Karyavattom<br />
                    Thiruvananthapuram, Kerala 695581
                  </p>
                </div>
              </div>
            </div>

            {/* Follow Us */}
            <div className="space-y-6">
              <h3 className="text-lg md:text-xl font-black uppercase tracking-wider text-black">
                Follow Us
              </h3>
              <div className="flex flex-wrap gap-3">
                {/* Instagram */}
                <a
                  href="https://www.instagram.com/legacyiedc?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw=="
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group w-12 h-12 rounded-xl bg-black/10 hover:bg-black border border-black/20 hover:border-black flex items-center justify-center transition-all duration-300 hover:scale-110"
                  aria-label="Instagram"
                >
                  <svg className="w-5 h-5 text-black group-hover:text-[#f4b518] transition-colors" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                  </svg>
                </a>

                {/* LinkedIn */}
                <a
                  href="https://www.linkedin.com/company/iedc-ucek/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group w-12 h-12 rounded-xl bg-black/10 hover:bg-black border border-black/20 hover:border-black flex items-center justify-center transition-all duration-300 hover:scale-110"
                  aria-label="LinkedIn"
                >
                  <svg className="w-5 h-5 text-black group-hover:text-[#f4b518] transition-colors" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                  </svg>
                </a>

                {/* Facebook */}
                <a
                  href="https://www.instagram.com/legacyiedc/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group w-12 h-12 rounded-xl bg-black/10 hover:bg-black border border-black/20 hover:border-black flex items-center justify-center transition-all duration-300 hover:scale-110"
                  aria-label="Facebook"
                >
                  <svg className="w-5 h-5 text-black group-hover:text-[#f4b518] transition-colors" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                  </svg>
                </a>

                {/* Utube/X */}
                <a
                  href="https://www.youtube.com/@iedcuce"
  target="_blank"
  rel="noopener noreferrer"
  className="group w-12 h-12 rounded-xl bg-black/10 hover:bg-black border border-black/20 hover:border-black flex items-center justify-center transition-all duration-300 hover:scale-110"
  aria-label="YouTube"
>
  <svg className="w-5 h-5 text-black group-hover:text-[#f4b518] transition-colors" fill="currentColor" viewBox="0 0 24 24">
    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
  </svg>
</a>
                
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-black/20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            <div className="flex flex-col md:flex-row justify-center items-center gap-4">
              <p className="text-black/70 text-sm md:text-base text-center md:text-left font-semibold">
                © 2026 Legacy IEDC UCEK. All Rights Reserved
              </p>
              
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}