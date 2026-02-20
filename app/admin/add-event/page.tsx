"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AddEventPage() {
  const router = useRouter();

  const [form, setForm] = useState({
    title: "",
    description: "",
    image: "",
    location: "",
    eventDate: "",
    registrationDeadline: "",
  });

  const [uploading, setUploading] = useState(false);
  const [submitting, setSubmitting] = useState(false);

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
          body: JSON.stringify({ image: reader.result }),
        });

        const data = await res.json();
        if (!res.ok) throw new Error("Upload failed");

        setForm((prev) => ({ ...prev, image: data.url }));
      } catch (error) {
        console.error(error);
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

    if (!form.image) {
      alert("Please upload an event banner");
      return;
    }

    try {
      setSubmitting(true);
      const res = await fetch("/api/events", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (res.ok) {
        alert("Event created successfully");
        router.push("/admin");
        router.refresh();
      } else {
        alert("Failed to create event");
      }
    } catch (error) {
      console.error(error);
      alert("Something went wrong");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <main className="min-h-screen pt-24 pb-12 px-4 md:px-8 bg-black text-white flex justify-center items-start">
      <div className="w-full max-w-2xl bg-gray-900 p-6 md:p-10 rounded-2xl shadow-2xl border border-gray-800">
        
        <header className="mb-8 text-center">
          <h1 className="text-3xl md:text-4xl font-extrabold bg-gradient-to-r from-yellow-400 to-yellow-600 bg-clip-text text-transparent">
            Create New Event
          </h1>
          <p className="text-gray-400 mt-2 text-sm md:text-base">Launch a new session or workshop for the community.</p>
        </header>

        <form onSubmit={handleSubmit} className="space-y-6">
          
          {/* BANNER UPLOAD SECTION */}
          <div className="flex flex-col gap-3">
            <label className="text-sm font-medium text-gray-400 ml-1">Event Banner</label>
            <div className="relative group w-full h-48 md:h-64 bg-gray-800 rounded-xl overflow-hidden border-2 border-dashed border-gray-700 flex flex-col items-center justify-center transition-all hover:border-yellow-500/50">
              {form.image ? (
                <>
                  <img
                    src={form.image}
                    className="w-full h-full object-cover"
                    alt="preview"
                  />
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
                    <p className="text-white font-semibold">Change Image</p>
                  </div>
                </>
              ) : (
                <div className="flex flex-col items-center text-gray-500">
                  <span className="text-4xl mb-2">🖼️</span>
                  <p className="text-sm">Click to upload banner</p>
                </div>
              )}
              
              {uploading && (
                <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
                  <div className="w-8 h-8 border-3 border-yellow-500 border-t-transparent animate-spin rounded-full"></div>
                </div>
              )}

              <input
                type="file"
                accept="image/*"
                className="absolute inset-0 opacity-0 cursor-pointer"
                onChange={(e) => e.target.files && handleImageUpload(e.target.files[0])}
                disabled={uploading}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {/* TITLE */}
            <div className="flex flex-col gap-2 md:col-span-2">
              <label className="text-sm font-medium text-gray-400 ml-1">Event Title</label>
              <input
                type="text"
                placeholder="e.g. AI Workshop 2026"
                required
                className="p-3.5 rounded-xl bg-gray-800 border border-gray-700 focus:border-yellow-500 focus:ring-1 focus:ring-yellow-500 outline-none transition-all"
                onChange={(e) => setForm({ ...form, title: e.target.value })}
              />
            </div>

            {/* DESCRIPTION */}
            <div className="flex flex-col gap-2 md:col-span-2">
              <label className="text-sm font-medium text-gray-400 ml-1">Description</label>
              <textarea
                rows={4}
                placeholder="What is this event about?"
                required
                className="p-3.5 rounded-xl bg-gray-800 border border-gray-700 focus:border-yellow-500 outline-none transition-all resize-none"
                onChange={(e) => setForm({ ...form, description: e.target.value })}
              />
            </div>

            {/* LOCATION */}
            <div className="flex flex-col gap-2 md:col-span-2">
              <label className="text-sm font-medium text-gray-400 ml-1">Location / Platform</label>
              <input
                type="text"
                placeholder="e.g. Main Auditorium or Google Meet"
                required
                className="p-3.5 rounded-xl bg-gray-800 border border-gray-700 focus:border-yellow-500 outline-none transition-all"
                onChange={(e) => setForm({ ...form, location: e.target.value })}
              />
            </div>

            {/* EVENT DATE */}
            <div className="flex flex-col gap-2">
              <label className="text-sm font-medium text-gray-400 ml-1">Event Date</label>
              <input
                type="date"
                required
                className="p-3.5 rounded-xl bg-gray-800 border border-gray-700 focus:border-yellow-500 outline-none transition-all [color-scheme:dark]"
                onChange={(e) => setForm({ ...form, eventDate: e.target.value })}
              />
            </div>

            {/* DEADLINE */}
            <div className="flex flex-col gap-2">
              <label className="text-sm font-medium text-gray-400 ml-1">Reg. Deadline</label>
              <input
                type="date"
                required
                className="p-3.5 rounded-xl bg-gray-800 border border-gray-700 focus:border-yellow-500 outline-none transition-all [color-scheme:dark]"
                onChange={(e) => setForm({ ...form, registrationDeadline: e.target.value })}
              />
            </div>
          </div>

          {/* ACTION BUTTONS */}
          <div className="flex flex-col sm:flex-row gap-3 pt-4">
            <button
              type="button"
              onClick={() => router.back()}
              className="w-full sm:w-1/3 py-3.5 rounded-xl font-semibold border border-gray-700 hover:bg-gray-800 transition-all"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={uploading || submitting}
              className="w-full sm:w-2/3 bg-yellow-500 hover:bg-yellow-400 disabled:opacity-50 text-black font-bold py-3.5 rounded-xl shadow-lg shadow-yellow-500/20 transition-all flex items-center justify-center gap-2"
            >
              {submitting ? (
                <>
                  <div className="w-4 h-4 border-2 border-black border-t-transparent animate-spin rounded-full"></div>
                  Publishing...
                </>
              ) : (
                "Create Event"
              )}
            </button>
          </div>
        </form>
      </div>
    </main>
  );
}