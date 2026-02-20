"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";

export default function Page() {
  const [events, setEvents] = useState<any[]>([]);
  const [index, setIndex] = useState(0);

  // 🔥 Fetch real events from DB
  useEffect(() => {
    async function fetchEvents() {
      try {
        const res = await fetch("/api/events/latest", {
          cache: "no-store",
        });
        const data = await res.json();
        if (Array.isArray(data)) {
          setEvents(data);
        }
      } catch (error) {
        console.error("Failed to fetch events:", error);
      }
    }
    fetchEvents();
  }, []);

  // 🔥 Auto rotate only if events exist
  useEffect(() => {
    if (events.length === 0) return;

    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % events.length);
    }, 4000);

    return () => clearInterval(timer);
  }, [events]);

  const columns = [
    { images: [7, 8, 9], offset: "pt-4 md:pt-8" },
    { images: [4, 5, 6], offset: "translate-y-10 md:translate-y-12 lg:translate-y-20" },
    { images: [1, 2, 3], offset: "pt-4 md:pt-8" },
  ];

  return (
    <div className="bg-gradient-to-br from-[#f4b518] via-[#f4b518] to-[#f4b518]">
      {/* HERO SECTION */}
      <main className="relative min-h-screen flex items-center overflow-hidden px-4 md:px-8 lg:px-20">

        <div className="w-full max-w-[1600px] mx-auto py-12 pb-32 lg:py-0 lg:pb-40">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 xl:gap-24 items-center">
            {/* LEFT SIDE - Text Content */}
            <motion.div
              initial={{ opacity: 0, x: -60 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="space-y-8 md:space-y-10 text-black z-10 order-1 lg:order-1"
            >
              <div className="space-y-4 md:mt-5 -mt-4 md:space-y-6">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3, duration: 0.6 }}
                  className="inline-block"
                >
                  <span className="text-xs md:text-sm font-bold tracking-[0.3em] uppercase bg-black text-[#f4b518] px-5 md:px-6 py-2 rounded-full">
                    Legacy IEDC
                  </span>
                </motion.div>
                
                <h1 className="text-[14vw] sm:text-[11vw] md:text-[9vw] lg:text-[6.5rem] xl:text-[8rem] font-black leading-[0.9] uppercase font-semibold tracking-tighter">
                  <motion.span 
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4, duration: 0.6 }}
                    className="block"
                  >
                    Create.
                  </motion.span>
                  <motion.span 
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5, duration: 0.6 }}
                    className="block"
                  >
                    Sustain.
                  </motion.span>
                  <motion.span 
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6, duration: 0.6 }}
                    className="block"
                  >
                    Thrive.
                  </motion.span>
                </h1>
              </div>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7, duration: 0.6 }}
                className="text-base md:text-lg lg:text-xl text-black/80 font-semibold max-w-xl leading-relaxed"
              >
                Empowering the next generation of entrepreneurs to transform bold ideas into thriving realities.
              </motion.p>

              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8, duration: 0.6 }}
                className="flex flex-wrap gap-4 md:gap-5 pt-2"
              >
                <Link 
                  href="/join" 
                  className="group relative bg-black text-[#f4b518] px-8 md:px-12 lg:px-14 py-3.5 md:py-4 lg:py-5 rounded-full font-bold text-sm md:text-base lg:text-lg overflow-hidden shadow-2xl shadow-black/30 transition-all hover:shadow-black/50"
                >
                  <span className="relative z-10">Join Our Community</span>
                  <motion.div 
                    className="absolute inset-0 bg-gradient-to-r from-black via-gray-900 to-black"
                    initial={{ x: "-100%" }}
                    whileHover={{ x: "100%" }}
                    transition={{ duration: 0.6 }}
                  />
                </Link>
                
                <Link 
                  href="/events/previous" 
                  className="group relative border-[3px] border-black text-black px-8 md:px-12 lg:px-14 py-3.5 md:py-4 lg:py-5 rounded-full font-bold text-sm md:text-base lg:text-lg overflow-hidden transition-all hover:scale-105"
                >
                  <span className="relative z-10 group-hover:text-[#e6e5e2] transition-colors">Explore Events</span>
                  <motion.div 
                    className="absolute inset-0 bg-black"
                    initial={{ scale: 0 }}
                    whileHover={{ scale: 1 }}
                    transition={{ duration: 0.4 }}
                  />
                </Link>
              </motion.div>
            </motion.div>
            
            {/* RIGHT SIDE - Image Grid */}
            <div className="order-2 lg:order-2 grid grid-cols-3 gap-3 md:gap-4 lg:gap-6 items-start">
              {columns.map((col, colIndex) => (
                <div key={colIndex} className={`flex flex-col gap-3 md:gap-4 lg:gap-6 ${col.offset}`}>
                  {col.images.map((num, imgIndex) => (
                    <motion.div 
                      key={num} 
                      initial={{ opacity: 0, y: 40, scale: 0.9 }} 
                      animate={{ opacity: 1, y: 0, scale: 1 }} 
                      transition={{ 
                        delay: (colIndex * 3 + imgIndex) * 0.08, 
                        duration: 0.7, 
                        ease: [0.25, 0.46, 0.45, 0.94]
                      }}
                    >
                      <HeroImage src={`/img${num}.jpg`} />
                    </motion.div>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>

      {/* BLACK CONTENT SECTIONS */}
      <div className="bg-gradient-to-b from-black via-[#0a0a0a] to-black text-white rounded-t-[60px] md:rounded-t-[100px] relative z-30 shadow-[0_-30px_60px_rgba(0,0,0,0.5)] overflow-hidden">
        
        {/* Decorative top accent */}
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[#f4b518] to-transparent" />

        {/* VISION & MISSION SECTION */}
        <motion.section 
          initial={{ opacity: 0, y: 100 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="py-24 md:py-32 px-6 md:px-12 lg:px-24 relative"
        >
          {/* Background decoration */}
          <div className="absolute inset-0 opacity-5">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#f4b518] rounded-full blur-[120px]" />
          </div>

          <div className="max-w-7xl mx-auto relative z-10">
            <Reveal>
              <div className="text-center mb-16 md:mb-20">
                <motion.span 
                  className="inline-block text-[#f4b518] font-bold text-sm md:text-base tracking-[0.3em] uppercase mb-4"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                >
                  Our Foundation
                </motion.span>
                <h2 className="text-3xl md:text-5xl lg:text-6xl font-black uppercase text-white tracking-tighter">
                  Driven by Purpose
                </h2>
              </div>
            </Reveal>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16 lg:gap-20 xl:gap-32">
              <Reveal>
                <InfoCard 
                  icon="/vision.svg" 
                  title="Vision" 
                  headline="We strive to help students have a vision of their own" 
                  description="Our vision is to inculcate amongst budding entrepreneurs, the rigor and conviction in their ideas to go out there to make a mark." 
                />
              </Reveal>
              <Reveal delay={0.2}>
                <InfoCard 
                  icon="/mission.png" 
                  title="Mission" 
                  headline="We grant a platform for innovators to express themselves and upscale" 
                  description="Our mission, put into perspective, is to lend a hand to emerging and struggling entrepreneurs to help them realize their vision." 
                />
              </Reveal>
            </div>
          </div>
        </motion.section>

        <div className="w-32 md:w-48 h-1 bg-gradient-to-r from-transparent via-[#f4b518] to-transparent mx-auto rounded-full" />

        {/* OUR SAGA SECTION */}
        <section className="py-24 md:py-32 px-6 md:px-12 lg:px-24 relative">
          <div className="max-w-7xl mx-auto space-y-24 md:space-y-32">
            <Reveal>
              <div className="text-center space-y-6">
                <motion.span 
                  className="inline-block text-[#f4b518] font-bold text-sm md:text-base tracking-[0.3em] uppercase"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                >
                  Our Story
                </motion.span>
                <h2 className="text-3xl md:text-5xl lg:text-7xl font-black uppercase text-[#f4b518] tracking-tighter">
                  The Saga
                </h2>
                <div className="w-24 h-1 bg-[#f4b518] mx-auto rounded-full" />
              </div>
            </Reveal>

            {/* Saga Items */}
            {[
              { 
                id: 1, 
                title: "Our Inception", 
                text: "University College of Engineering, Karivattom (UCEK) welcomed us as we graced the college by establishing the cell in 2020 and the investiture of the first executive committee. The incumbent exe-com proved their mettle, explored, and went on to leave a trail of legacy for the future members to tread upon.", 
                img: "/saga1.jpg", 
                reverse: false 
              },
              { 
                id: 2, 
                title: "Our Journey", 
                text: "We have displayed our worth on various fronts. We have successfully organized districtwide, statewide, and national events including hands-on workshops, hackathons, ideathons, talks, masterclasses, mentorship programmes, talent searches, and non-technical events. We take pride in being able to collaborate with other cells and communities of the college to have come so far and to keep going.", 
                img: "/saga2.jpg", 
                reverse: true 
              },
              { 
                id: 3, 
                title: "The Legacy Continues", 
                text: "The legacy will be preserved by our lineage. Legacy-IEDC-UCEK will revolutionize the startup ecosystem globally starting with Kerala. We will strive to identify, grow and produce entrepreneurs who will shape the world.", 
                img: "/saga3.jpg", 
                reverse: false 
              }
            ].map((saga, idx) => (
              <div key={saga.id} className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 xl:gap-20 items-center">
                <Reveal className={saga.reverse ? "lg:order-last" : ""}>
                  <div className="space-y-6 group">
                    <motion.div 
                      className="inline-block"
                      whileHover={{ x: 10 }}
                      transition={{ duration: 0.3 }}
                    >
                      <span className="text-[#f4b518]/40 font-black text-5xl md:text-6xl lg:text-8xl">
                        0{idx + 1}
                      </span>
                    </motion.div>
                    <h3 className="text-2xl md:text-3xl lg:text-4xl font-black text-white group-hover:text-[#f4b518] transition-colors duration-300">
                      {saga.title}
                    </h3>
                    <div className="w-20 h-1 bg-[#f4b518] rounded-full" />
                    <p className="text-gray-400 text-base md:text-lg lg:text-xl leading-relaxed font-light">
                      {saga.text}
                    </p>
                  </div>
                </Reveal>
                <Reveal delay={0.2} className={saga.reverse ? "lg:order-first" : ""}>
                  <motion.div 
                    className="relative rounded-2xl md:rounded-3xl overflow-hidden shadow-2xl border border-white/5 group"
                    whileHover={{ scale: 1.02 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="absolute inset-0 bg-gradient-to-br from-[#f4b518]/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10" />
                    <img 
                      src={saga.img} 
                      className="w-full h-auto object-cover transform group-hover:scale-110 transition-transform duration-700" 
                      alt={saga.title} 
                    />
                  </motion.div>
                </Reveal>
              </div>
            ))}
          </div>
        </section>

        {/* --- CAROUSEL EVENT CARDS --- */}
       {/* ===================== CAROUSEL EVENT CARDS ===================== */}
        <section className="py-24 md:py-32 px-6 md:px-12 lg:px-24 bg-gradient-to-b from-[#0a0a0a] to-black relative overflow-hidden">
          {/* Background decoration */}
          <div className="absolute inset-0 opacity-5">
            <div className="absolute top-1/4 right-1/4 w-[500px] h-[500px] bg-[#f4b518] rounded-full blur-[150px]" />
            <div className="absolute bottom-1/4 left-1/4 w-[500px] h-[500px] bg-[#f4b518] rounded-full blur-[150px]" />
          </div>

          <div className="max-w-7xl mx-auto relative z-10">
            <Reveal>
              <div className="text-center space-y-6 mb-20 md:mb-24">
                <motion.span
                  className="inline-block text-[#f4b518] font-bold text-sm md:text-base tracking-[0.3em] uppercase"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                >
                  What's Happening
                </motion.span>
                <h2 className="text-3xl md:text-5xl lg:text-7xl font-black uppercase text-[#f4b518] tracking-tighter">
                  RECENT Events
                </h2>
                <div className="w-24 h-1 bg-[#f4b518] mx-auto rounded-full" />
              </div>
            </Reveal>

            {events.length === 0 ? (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-center py-20"
              >
                <p className="text-gray-400 text-xl">No upcoming events at the moment.</p>
                <p className="text-gray-500 text-sm mt-2">Check back soon for exciting opportunities!</p>
              </motion.div>
            ) : (
              <>
                {/*
                  HOW THE ANIMATION WORKS
                  ══════════════════════════════════════════════════════════

                  3 cards always rendered: left (pos 0), center (pos 1), right (pos 2).

                  CENTER card → `position: relative`
                    Sits in normal document flow. The wrapper grows to fit it
                    exactly → no fixed height → no top/bottom clipping.

                  SIDE cards → `position: absolute`
                    Centered on the same point as center, then offset by x:
                      left  = x "-115%"  (peek from left edge)
                      right = x "115%"   (peek from right edge)
                    Scaled to 0.78 + blur(5px) = depth/shadow peek effect.

                  MOBILE:  overflow-hidden on wrapper clips side cards to a
                           subtle blurred peek behind the center card.
                  DESKTOP: overflow-visible reveals the full side cards.

                  EXIT ANIMATION — why it was broken before:
                  ──────────────────────────────────────────
                  Old code used `hidden md:block` on side cards.
                  `hidden` = display:none = element torn from DOM immediately.
                  AnimatePresence needs the element mounted to animate it out.

                  Fix: pointer-events-none keeps element mounted + animatable,
                  just not clickable. Exit fires cleanly:
                    opacity → 0, scale → 0.6, x slides further off-screen.
                  ══════════════════════════════════════════════════════════
                */}
                <div className="relative flex justify-center items-center    md:overflow-visible">
                  <AnimatePresence mode="popLayout">
                    {[
                      (index - 1 + events.length) % events.length,
                      index,
                      (index + 1) % events.length,
                    ].map((i, position) => {
                      const event = events[i];
                      if (!event) return null;

                      const isCenter = position === 1;
                      const isLeft   = position === 0;
                      const isRight  = position === 2;

                      return (
                        <motion.div
                          key={`${event._id}-${i}`}
                          initial={{
                            opacity: 0,
                            scale: 0.8,
                            x: isLeft ? "-115%" : isRight ? "115%" : "0%",
                          }}
                          animate={{
                            opacity: isCenter ? 1 : 0.35,
                            scale:   isCenter ? 1 : 0.78,
                            x:       isLeft ? "-115%" : isRight ? "115%" : "0%",
                            zIndex:  isCenter ? 20 : 10,
                            filter:  isCenter ? "blur(0px)" : "blur(5px)",
                          }}
                          exit={{
                            opacity: 0,
                            scale: 0.6,
                            x: isLeft ? "-140%" : isRight ? "140%" : "0%",
                            transition: { duration: 0.35, ease: "easeIn" },
                          }}
                          transition={{
                            duration: 0.7,
                            ease: [0.25, 0.46, 0.45, 0.94],
                          }}
                          className={[
                            "w-full max-w-[300px] md:max-w-[380px] lg:max-w-[420px]",
                            isCenter
                              ? "relative"                      // drives wrapper height, no clip
                              : "absolute pointer-events-none", // stays mounted for exit anim
                          ].join(" ")}
                        >
                          <EventCard event={event} highlighted={isCenter} />
                        </motion.div>
                      );
                    })}
                  </AnimatePresence>
                </div>

                {/* Pagination Dots */}
                <div className="flex justify-center gap-3 mt-12 md:mt-16">
                  {events.map((_, i) => (
                    <motion.button
                      key={i}
                      onClick={() => setIndex(i)}
                      whileHover={{ scale: 1.2 }}
                      whileTap={{ scale: 0.9 }}
                      className={`h-2.5 transition-all duration-500 rounded-full ${
                        i === index
                          ? "w-12 bg-[#f4b518] shadow-lg shadow-[#f4b518]/50"
                          : "w-2.5 bg-gray-700 hover:bg-gray-500"
                      }`}
                    />
                  ))}
                </div>
              </>
            )}
          </div>
        </section>

        {/* Call to Action Footer Section */}
<section className="py-20 md:py-24 px-6 md:px-12 lg:px-24 bg-gradient-to-br from-[#f4b518] to-[#e5a614] relative overflow-hidden">
  <div className="absolute inset-0 opacity-10">
    <div className="absolute top-0 right-0 w-96 h-96 bg-black rounded-full blur-3xl" />
    <div className="absolute bottom-0 left-0 w-96 h-96 bg-black rounded-full blur-3xl" />
  </div>

  <Reveal>
    <div className="max-w-4xl mx-auto text-center space-y-6 md:space-y-8 relative z-10">
      <h2 className="text-3xl md:text-5xl lg:text-6xl font-black uppercase text-black tracking-tighter leading-tight">
        Have a Groundbreaking <br /> Startup Idea?
      </h2>
      
      <p className="text-base md:text-lg lg:text-xl text-black/80 font-semibold max-w-2xl mx-auto">
        Don't let your vision stay on paper. Submit your idea today to receive expert mentorship, 
        strategic guidance, and a clear path to market.
      </p>

      <motion.div
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <Link 
          href="/submit-idea" // Make sure to update this route
          className="inline-block bg-black text-[#f4b518] px-10 md:px-12 py-4 md:py-5 rounded-full font-bold text-base md:text-lg shadow-2xl shadow-black/30 hover:shadow-black/50 transition-all uppercase tracking-tight"
        >
          Pitch Your Idea Now
        </Link>
      </motion.div>
      
      <p className="text-xs md:text-sm text-black/60 font-medium uppercase tracking-widest">
        Direct Mentorship • Strategic Roadmap • Network Access
      </p>
    </div>
  </Reveal>
</section>
      </div>
    </div>
  );
}

// --- SUB-COMPONENTS ---

function EventCard({ event, highlighted }: { event: any; highlighted: boolean }) {
  return (
    <motion.div 
      whileHover={highlighted ? { y: -10 } : {}}
      className={`relative bg-gradient-to-br from-[#1a1a1a] to-[#0a0a0a] backdrop-blur-xl p-5 md:p-6 rounded-[2rem] md:rounded-[2.5rem] border-2 transition-all duration-500 flex flex-col h-full overflow-hidden
      ${highlighted ? "border-[#f4b518] shadow-[0_0_60px_rgba(244,181,24,0.25)]" : "border-white/5"}`}
    >
      {/* Decorative corner accent */}
      {highlighted && (
        <motion.div 
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          className="absolute top-0 right-0 w-20 h-20 md:w-24 md:h-24 bg-[#f4b518]/20 rounded-bl-full"
        />
      )}

      <div className="relative w-full aspect-[4/5] rounded-[1.5rem] md:rounded-[2rem] overflow-hidden mb-5 md:mb-6 group">
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent z-10" />
        <img 
          src={event.image} 
          alt={event.title} 
          className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-110 transition-all duration-700"
        />
        
        {highlighted && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="absolute top-3 left-3 md:top-4 md:left-4 z-20"
          >
            <span className="bg-[#f4b518] text-black px-3 md:px-4 py-1 md:py-1.5 rounded-full text-xs font-bold uppercase tracking-wider">
              Featured
            </span>
          </motion.div>
        )}
      </div>

      <div className="flex-1 space-y-3 md:space-y-4 text-center relative z-10">
        <h3 className="text-lg md:text-xl lg:text-2xl font-black uppercase tracking-tight leading-tight min-h-[2.5rem] md:min-h-[3rem] text-white">
          {event.title}
        </h3>
        
        <div className="flex items-center justify-center gap-2">
          <svg className="w-4 h-4 text-[#f4b518]" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
          </svg>
          <p className="text-[#f4b518] font-bold text-xs md:text-sm tracking-wide">
            {event.eventDate ? new Date(event.eventDate).toDateString() : "Date TBD"}
          </p>
        </div>
      </div>

      <Link 
        href="/events/previous"
        className={`mt-5 md:mt-6 w-full py-3 md:py-4 rounded-xl font-bold text-xs md:text-sm uppercase tracking-widest transition-all text-center relative overflow-hidden group
          ${highlighted ? "bg-[#f4b518] text-black" : "bg-white/5 text-white hover:bg-white/10"}`}
      >
        <span className="relative z-10">{highlighted ? "Learn More" : "View Details"}</span>
        {highlighted && (
          <motion.div 
            className="absolute inset-0 bg-white"
            initial={{ x: "-100%" }}
            whileHover={{ x: "100%" }}
            transition={{ duration: 0.5 }}
          />
        )}
      </Link>
    </motion.div>
  );
}

function HeroImage({ src }: { src: string }) {
  return (
    <motion.div 
      whileHover={{ scale: 1.05, rotate: 2 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className="relative w-full aspect-square rounded-xl md:rounded-2xl lg:rounded-3xl overflow-hidden shadow-2xl border-2 border-black/10 group"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      <img 
        src={src} 
        alt="Legacy Event" 
        className="object-cover w-full h-full group-hover:scale-110 transition-transform duration-700 ease-out" 
      />
    </motion.div>
  );
}

function Reveal({ children, delay = 0, className = "" }: any) {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 60 }} 
      whileInView={{ opacity: 1, y: 0 }} 
      viewport={{ once: true, margin: "-80px" }} 
      transition={{ duration: 0.8, delay, ease: [0.25, 0.46, 0.45, 0.94] }} 
      className={className}
    >
      {children}
    </motion.div>
  );
}

function InfoCard({ icon, title, headline, description }: any) {
  return (
    <motion.div 
      whileHover={{ y: -15 }}
      transition={{ duration: 0.3 }}
      className="relative flex flex-col items-center text-center space-y-6 md:space-y-8 group"
    >
      {/* Decorative background */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#f4b518]/5 to-transparent rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      
      <motion.div 
        whileHover={{ rotate: 360, scale: 1.1 }}
        transition={{ duration: 0.6 }}
        className="relative w-24 h-24 md:w-36 md:h-36 lg:w-44 lg:h-44 flex items-center justify-center p-4 md:p-5 bg-gradient-to-br from-white/10 to-white/5 rounded-full backdrop-blur-sm border border-white/10 shadow-xl"
      >
        <div className="absolute inset-0 bg-[#f4b518]/10 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        <img src={icon} alt={title} className="w-full h-full object-contain relative z-10" />
      </motion.div>

      <div className="space-y-3 md:space-y-4 relative z-10">
        <h2 className="text-2xl md:text-4xl lg:text-5xl font-black uppercase tracking-tighter text-[#f4b518] group-hover:scale-105 transition-transform duration-300">
          {title}
        </h2>
        <motion.div 
          className="w-16 md:w-20 h-1 md:h-1.5 bg-[#f4b518] mx-auto rounded-full"
          initial={{ width: 64 }}
          whileInView={{ width: 80 }}
          transition={{ duration: 0.8, delay: 0.3 }}
        />
      </div>

      <div className="space-y-4 md:space-y-6 max-w-md relative z-10">
        <p className="text-lg md:text-xl lg:text-2xl font-bold leading-tight text-white">
          {headline}
        </p>
        <p className="text-gray-400 text-sm md:text-base lg:text-lg leading-relaxed font-light">
          {description}
        </p>
      </div>
    </motion.div>
  );
}