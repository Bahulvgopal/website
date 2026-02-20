"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
// Note: If you don't have lucide-react, you can replace these with SVG strings or emojis
import { Calendar, MapPin, AlignLeft, Image as ImageIcon, ArrowLeft, Save } from "lucide-react";

export default function EditEventPage() {
  const router = useRouter();
  const params = useParams();

  const id =
    typeof params?.id === "string"
      ? params.id
      : Array.isArray(params?.id)
      ? params.id[0]
      : "";

  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const [form, setForm] = useState({
    title: "",
    description: "",
    image: "",
    location: "",
    eventDate: "",
    registrationDeadline: "",
  });

  /* ================= FETCH EVENT ================= */
  useEffect(() => {
    if (!id) return;
    async function fetchEvent() {
      try {
        const res = await fetch(`/api/events/${id}`);
        if (!res.ok) throw new Error();
        const event = await res.json();
        setForm({
          title: event.title || "",
          description: event.description || "",
          image: event.image || "",
          location: event.location || "",
          eventDate: event.eventDate?.slice(0, 10) || "",
          registrationDeadline: event.registrationDeadline?.slice(0, 10) || "",
        });
      } catch (err) {
        console.error(err);
        alert("Could not load event.");
        router.push("/admin");
      } finally {
        setLoading(false);
      }
    }
    fetchEvent();
  }, [id, router]);

  /* ================= IMAGE UPLOAD ================= */
  async function handleImageUpload(file: File) {
    if (!file) return;
    const reader = new FileReader();
    reader.onloadend = async () => {
      try {
        setUploading(true);
        const res = await fetch("/api/upload", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            image: reader.result,
            folder: "events",
          }),
        });
        const data = await res.json();
        if (!res.ok) throw new Error();
        setForm((prev) => ({ ...prev, image: data.url }));
      } catch (err) {
        console.error(err);
        alert("Image upload failed");
      } finally {
        setUploading(false);
      }
    };
    reader.readAsDataURL(file);
  }

  /* ================= SUBMIT ================= */
  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    try {
      setSubmitting(true);
      const res = await fetch(`/api/events/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error();
      alert("Event updated successfully");
      router.push("/admin");
      router.refresh();
    } catch {
      alert("Update failed");
    } finally {
      setSubmitting(false);
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-black text-white">
        <div className="w-12 h-12 border-4 border-[#f4b518] border-t-transparent animate-spin rounded-full mb-4"></div>
        <p className="text-gray-400 animate-pulse">Loading event details...</p>
      </div>
    );
  }

  return (
    <main className="min-h-screen -mt-4 bg-black text-white py-12 px-4 sm:px-6 lg:px-8 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-zinc-900 via-black to-black">
      <div className="max-w-4xl mx-auto">
        
        {/* Header Section */}
        <div className="flex items-center justify-between mb-8">
          <button 
            onClick={() => router.back()}
            className="group flex items-center text-gray-400 hover:text-[#f4b518] transition-colors"
          >
            <ArrowLeft className="w-5 h-5 mr-2 group-hover:-translate-x-1 transition-transform" />
            <span>Back to Dashboard</span>
          </button>
          <h1 className="text-2xl md:text-4xl font-black uppercase tracking-tighter text-[#f4b518]">
            Edit <span className="text-white">Event</span>
          </h1>
        </div>

        <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Left Column: Media & Meta */}
          <div className="lg:col-span-5 space-y-6">
            <div className="group relative aspect-video lg:aspect-square bg-zinc-900 rounded-3xl overflow-hidden border-2 border-dashed border-zinc-800 hover:border-[#f4b518]/50 transition-all">
              {form.image ? (
                <img
                  src={form.image}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  alt="Event"
                />
              ) : (
                <div className="w-full h-full flex flex-col items-center justify-center text-zinc-500">
                  <ImageIcon className="w-12 h-12 mb-2 opacity-20" />
                  <p className="text-sm">No Preview Available</p>
                </div>
              )}

              {/* Upload Overlay */}
              <div className="absolute inset-0 bg-black/40 backdrop-blur-[2px] opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center cursor-pointer">
                <div className="bg-[#f4b518] text-black p-3 rounded-full mb-2">
                  <ImageIcon className="w-6 h-6" />
                </div>
                <span className="text-sm font-bold uppercase tracking-wider">Change Cover Image</span>
              </div>

              {uploading && (
                <div className="absolute inset-0 bg-black/80 flex items-center justify-center z-10">
                  <div className="flex flex-col items-center">
                    <div className="w-8 h-8 border-2 border-[#f4b518] border-t-transparent animate-spin rounded-full mb-2"></div>
                    <span className="text-xs font-bold text-[#f4b518] uppercase">Uploading...</span>
                  </div>
                </div>
              )}

              <input
                type="file"
                accept="image/*"
                className="absolute inset-0 opacity-0 cursor-pointer"
                onChange={(e) => e.target.files && handleImageUpload(e.target.files[0])}
              />
            </div>

            <div className="bg-zinc-900/50 p-6 rounded-3xl border border-zinc-800 space-y-4">
               <label className="block text-xs font-bold text-zinc-500 uppercase tracking-[0.2em]">Quick Details</label>
               <div className="flex items-center text-zinc-300">
                  <MapPin className="w-4 h-4 mr-3 text-[#f4b518]" />
                  <span className="text-sm">{form.location || "Location not set"}</span>
               </div>
               <div className="flex items-center text-zinc-300">
                  <Calendar className="w-4 h-4 mr-3 text-[#f4b518]" />
                  <span className="text-sm">{form.eventDate || "Date not set"}</span>
               </div>
            </div>
          </div>

          {/* Right Column: Form Fields */}
          <div className="lg:col-span-7 space-y-6">
            <div className="bg-zinc-900/50 p-8 rounded-3xl border border-zinc-800 shadow-2xl backdrop-blur-sm">
              <div className="space-y-5">
                
                {/* Title */}
                <div className="space-y-2">
                  <label className="text-xs font-bold text-[#f4b518] uppercase tracking-widest ml-1">Event Title</label>
                  <input
                    type="text"
                    value={form.title}
                    required
                    placeholder="Grand Opening 2024"
                    className="w-full p-4 bg-black border border-zinc-800 rounded-2xl focus:border-[#f4b518] focus:ring-1 focus:ring-[#f4b518] outline-none transition-all placeholder:text-zinc-700"
                    onChange={(e) => setForm({ ...form, title: e.target.value })}
                  />
                </div>

                {/* Description */}
                <div className="space-y-2">
                  <label className="text-xs font-bold text-[#f4b518] uppercase tracking-widest ml-1">Description</label>
                  <textarea
                    value={form.description}
                    required
                    rows={4}
                    placeholder="Tell people about your event..."
                    className="w-full p-4 bg-black border border-zinc-800 rounded-2xl focus:border-[#f4b518] focus:ring-1 focus:ring-[#f4b518] outline-none transition-all placeholder:text-zinc-700 resize-none"
                    onChange={(e) => setForm({ ...form, description: e.target.value })}
                  />
                </div>

                {/* Location */}
                <div className="space-y-2">
                  <label className="text-xs font-bold text-[#f4b518] uppercase tracking-widest ml-1">Venue / Location</label>
                  <div className="relative">
                    <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-600" />
                    <input
                      type="text"
                      value={form.location}
                      required
                      placeholder="Street, City, Country"
                      className="w-full p-4 pl-12 bg-black border border-zinc-800 rounded-2xl focus:border-[#f4b518] focus:ring-1 focus:ring-[#f4b518] outline-none transition-all"
                      onChange={(e) => setForm({ ...form, location: e.target.value })}
                    />
                  </div>
                </div>

                {/* Dates */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-[#f4b518] uppercase tracking-widest ml-1 text-[10px]">Event Date</label>
                    <input
                      type="date"
                      value={form.eventDate}
                      required
                      className="w-full p-4 bg-black border border-zinc-800 rounded-2xl focus:border-[#f4b518] outline-none transition-all [color-scheme:dark]"
                      onChange={(e) => setForm({ ...form, eventDate: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-[#f4b518] uppercase tracking-widest ml-1 text-[10px]">Registration Deadline</label>
                    <input
                      type="date"
                      value={form.registrationDeadline}
                      required
                      className="w-full p-4 bg-black border border-zinc-800 rounded-2xl focus:border-[#f4b518] outline-none transition-all [color-scheme:dark]"
                      onChange={(e) => setForm({ ...form, registrationDeadline: e.target.value })}
                    />
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="mt-10 flex flex-col sm:flex-row gap-4">
                <button
                  type="button"
                  onClick={() => router.back()}
                  className="flex-1 order-2 sm:order-1 px-6 py-4 rounded-2xl border border-zinc-800 font-bold hover:bg-zinc-800 transition-colors uppercase tracking-widest text-sm"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={uploading || submitting}
                  className="flex-1 order-1 sm:order-2 bg-[#f4b518] text-black font-black py-4 rounded-2xl hover:bg-yellow-400 disabled:opacity-50 disabled:cursor-not-allowed transition-all uppercase tracking-[0.15em] text-sm flex items-center justify-center shadow-[0_0_20px_rgba(244,181,24,0.3)]"
                >
                  {submitting ? (
                    <div className="w-5 h-5 border-2 border-black border-t-transparent animate-spin rounded-full"></div>
                  ) : (
                    <>
                      <Save className="w-4 h-4 mr-2" />
                      Save Changes
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </main>
  );
}