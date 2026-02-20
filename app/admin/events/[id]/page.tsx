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
  }).sort({ createdAt: -1 });

  return (
    <main className="min-h-screen pt-24 pb-12 px-4 md:px-10 max-w-7xl mx-auto bg-black text-white">
      
      {/* HEADER / BACK BUTTON */}
      <div className="mb-6">
        <a href="/admin" className="text-blue-400 hover:text-blue-300 text-sm flex items-center gap-2 transition">
          ← Back to Dashboard
        </a>
      </div>

      {/* EVENT INFO CARD */}
      <div className="mb-10 bg-gray-900 border border-gray-800 rounded-2xl overflow-hidden shadow-2xl">
        <div className="flex flex-col md:flex-row">
          {event.image && (
            <div className="w-full md:w-1/3 h-48 md:h-auto">
              <img
                src={event.image}
                alt={event.title}
                className="w-full h-full object-cover"
              />
            </div>
          )}
          <div className="p-6 md:p-8 flex-grow">
            <h1 className="text-3xl md:text-4xl font-extrabold mb-4 text-white">
              {event.title}
            </h1>
            <div className="space-y-2 text-gray-400">
              <p className="flex items-center gap-2">
                <span className="text-xl">📍</span> {event.location}
              </p>
              <p className="flex items-center gap-2">
                <span className="text-xl">📅</span> {new Date(event.eventDate).toLocaleDateString('en-US', {
                  weekday: 'long',
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* REGISTRATIONS SECTION */}
      <div className="bg-gray-900 border border-gray-800 rounded-2xl shadow-xl overflow-hidden">
        <div className="p-6 md:p-8 border-b border-gray-800 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h2 className="text-2xl font-bold text-white">Registrations</h2>
            <p className="text-gray-500 text-sm mt-1">Total: {registrations.length} participants</p>
          </div>

          <a
            href={`/api/export/${id}`}
            className="w-full sm:w-auto bg-green-600 text-white text-center px-6 py-2.5 rounded-xl font-bold hover:bg-green-700 transition shadow-lg shadow-green-900/20 flex items-center justify-center gap-2"
          >
            📥 Export CSV
          </a>
        </div>

        <div className="p-0 md:p-4">
          {registrations.length === 0 ? (
            <div className="p-10 text-center text-gray-500">
              <p className="text-4xl mb-2">📋</p>
              <p>No registrations yet for this event.</p>
            </div>
          ) : (
            <>
              {/* DESKTOP TABLE VIEW */}
              <div className="hidden md:block overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="text-gray-400 text-xs uppercase tracking-widest border-b border-gray-800">
                      <th className="p-4 font-semibold">Name</th>
                      <th className="p-4 font-semibold">Contact Info</th>
                      <th className="p-4 font-semibold">Department</th>
                      <th className="p-4 font-semibold text-center">Year</th>
                    </tr>
                  </thead>
                  <tbody>
                    {registrations.map((reg: any) => (
                      <tr key={reg._id} className="border-b border-gray-800/50 hover:bg-gray-800/30 transition">
                        <td className="p-4 font-bold text-white">{reg.name}</td>
                        <td className="p-4">
                          <div className="text-sm text-blue-400">{reg.email}</div>
                          <div className="text-xs text-gray-500">{reg.phone}</div>
                        </td>
                        <td className="p-4 text-sm text-gray-300">{reg.department}</td>
                        <td className="p-4 text-sm text-center font-mono text-yellow-500">{reg.year}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* MOBILE CARD VIEW */}
              <div className="md:hidden divide-y divide-gray-800">
                {registrations.map((reg: any) => (
                  <div key={reg._id} className="p-5 space-y-3">
                    <div className="flex justify-between items-start">
                      <div>
                        <p className="font-bold text-white text-lg">{reg.name}</p>
                        <p className="text-blue-400 text-sm">{reg.email}</p>
                      </div>
                      <span className="bg-yellow-500/10 text-yellow-500 text-xs font-bold px-2 py-1 rounded">
                        Yr {reg.year}
                      </span>
                    </div>
                    <div className="grid grid-cols-2 gap-2 text-sm">
                      <div>
                        <p className="text-gray-500 text-[10px] uppercase font-bold tracking-tighter">Phone</p>
                        <p className="text-gray-300">{reg.phone}</p>
                      </div>
                      <div>
                        <p className="text-gray-500 text-[10px] uppercase font-bold tracking-tighter">Department</p>
                        <p className="text-gray-300">{reg.department}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}
        </div>
      </div>
    </main>
  );
}