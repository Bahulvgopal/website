import { connectDB } from "@/lib/mongodb";
import Event from "@/models/Event";
import EventCard from "./EventCard";

export const dynamic = "force-dynamic";

export default async function PreviousEventsPage() {
  await connectDB();

  const now = new Date();

  const events = await Event.find({
    eventDate: { $lt: now },
  }).sort({ eventDate: -1 });

  // Group events by year
  const eventsByYear = events.reduce((acc: any, event: any) => {
    const year = new Date(event.eventDate).getFullYear();
    if (!acc[year]) {
      acc[year] = [];
    }
    acc[year].push(event);
    return acc;
  }, {});

  // Get sorted years (most recent first)
  const sortedYears = Object.keys(eventsByYear).sort((a, b) => Number(b) - Number(a));

  return (
    <main className="min-h-screen bg-gradient-to-b from-black via-[#0a0a0a] to-black text-white relative overflow-hidden -mt-4">
      {/* Decorative Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-30">
        <div className="absolute top-20 right-10 w-[500px] h-[500px] bg-[#f4b518] rounded-full blur-[150px]" />
        <div className="absolute bottom-40 left-10 w-[400px] h-[400px] bg-[#f4b518] rounded-full blur-[120px]" />
      </div>

      {/* Content Container */}
      <div className="relative z-10 pt-28 md:pt-32 lg:pt-36 pb-16 md:pb-20 lg:pb-24 px-4 md:px-8 lg:px-12 xl:px-20">
        <div className="max-w-[1400px] mx-auto">
          {/* Page Header */}
          <div className="mb-12 md:mb-16 lg:mb-20 space-y-4 md:space-y-6">
            <div className="inline-block">
              <span className="text-xs md:text-sm font-bold tracking-[0.3em] uppercase text-[#f4b518] bg-[#f4b518]/10 px-5 md:px-6 py-2 rounded-full border border-[#f4b518]/20">
                Our Journey
              </span>
            </div>
            
            <h1 className="text-4xl md:text-6xl lg:text-7xl xl:text-8xl font-black uppercase tracking-tighter leading-[0.9] text-white">
              Previous<br />
              <span className="text-[#f4b518]">Events</span>
            </h1>
            
            <div className="w-24 h-1 bg-[#f4b518] rounded-full" />
            
            <p className="text-base md:text-lg lg:text-xl text-gray-400 font-light max-w-2xl leading-relaxed">
              Explore the milestones and memorable moments that have shaped our entrepreneurial community.
            </p>
          </div>

          {/* Events Grid */}
          {events.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-20 md:py-32">
              <div className="w-20 h-20 md:w-24 md:h-24 mb-6 md:mb-8 rounded-full bg-[#f4b518]/10 flex items-center justify-center border border-[#f4b518]/20">
                <svg className="w-10 h-10 md:w-12 md:h-12 text-[#f4b518]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
              <p className="text-xl md:text-2xl text-gray-400 font-semibold">No previous events yet.</p>
              <p className="text-sm md:text-base text-gray-500 mt-2">Check back soon to see our past achievements!</p>
            </div>
          ) : (
            <div className="space-y-16 md:space-y-20 lg:space-y-24">
              {sortedYears.map((year, yearIndex) => (
                <div key={year} className="space-y-8 md:space-y-10">
                  {/* Year Header */}
                  <div 
                    className="flex items-center gap-6"
                    style={{
                      animation: `fadeInUp 0.6s ease-out ${yearIndex * 0.2}s both`,
                    }}
                  >
                    <div className="relative">
                      <h2 className="text-5xl md:text-6xl lg:text-7xl font-black text-[#f4b518] tracking-tighter">
                        {year}
                      </h2>
                      <div className="absolute -bottom-2 left-0 w-full h-1 bg-[#f4b518] rounded-full" />
                    </div>
                    <div className="flex-1 h-px bg-gradient-to-r from-[#f4b518]/50 to-transparent" />
                  </div>

                  {/* Events Grid for this Year */}
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 lg:gap-10">
                    {eventsByYear[year].map((event: any, index: number) => (
                      <EventCard 
                        key={event._id.toString()} 
                        event={{
                          _id: event._id.toString(),
                          title: event.title,
                          description: event.description,
                          location: event.location,
                          eventDate: event.eventDate.toISOString(),
                          image: event.image,
                        }} 
                        index={index} 
                      />
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </main>
  );
}