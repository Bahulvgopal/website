"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AddMemberPage() {
  const router = useRouter();

  const [form, setForm] = useState({
    name: "",
    image: "",
    role: "",
    year: "",
    status: "current",
    bio: "",
  });

  const [uploading, setUploading] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const roles = [
    "Nodal Officer", "Project Coordinator", "Mentor",
    "Chief Executive Officer", "Women Lead",
    "Chief Quality And Operation Officer", "Quality And Operation Officer",
    "Chief Technology Officer", "Technology Officer",
    "Chief Branding And Marketing Officer", "Branding And Marketing Officer",
    "Chief Finance Officer", "Finance Officer",
    "Chief Women Innovation Officer", "Women Innovation Officer",
    "Chief IPR And Research Officer", "IPR And Research Officer",
    "Chief Community Officer", "Community Officer",
    "Chief Creative And Innovation Officer", "Creative And Innovation Officer",
    "Executive Curator", "Member",
  ];

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
        if (!res.ok) throw new Error("Image upload failed");

        setForm((prev) => ({ ...prev, image: data.url }));
      } catch (error) {
        console.error(error);
        alert("Upload error");
      } finally {
        setUploading(false);
      }
    };
    reader.readAsDataURL(file);
  }

  /* ================= SUBMIT page ================= */
  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!form.image) {
      alert("Please upload image");
      return;
    }

    try {
      setSubmitting(true);
      const res = await fetch("/api/members", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (res.ok) {
        alert("Member added successfully");
        router.push("/admin");
        router.refresh();
      } else {
        const err = await res.json();
        alert(err.message || "Failed to add member");
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
            Add New Member
          </h1>
          <p className="text-gray-400 mt-2 text-sm md:text-base">Enter the details to add a team member to the portal.</p>
        </header>

        <form onSubmit={handleSubmit} className="space-y-6">
          
          {/* PHOTO UPLOAD SECTION */}
          <div className="flex flex-col items-center gap-4 bg-gray-800/50 p-6 rounded-xl border border-dashed border-gray-700">
            <div className="relative group">
              {form.image ? (
                <img
                  src={form.image}
                  className="w-32 h-32 md:w-40 md:h-40 rounded-full object-cover border-4 border-yellow-500 shadow-xl"
                  alt="preview"
                />
              ) : (
                <div className="w-32 h-32 md:w-40 md:h-40 rounded-full bg-gray-700 flex items-center justify-center text-gray-500 border-2 border-gray-600">
                  <span className="text-xs uppercase tracking-widest text-center px-2">No Photo<br/>Selected</span>
                </div>
              )}
              {uploading && (
                <div className="absolute inset-0 bg-black/60 rounded-full flex items-center justify-center">
                  <div className="w-6 h-6 border-2 border-yellow-500 border-t-transparent animate-spin rounded-full"></div>
                </div>
              )}
            </div>

            <label className="cursor-pointer bg-gray-700 hover:bg-gray-600 px-4 py-2 rounded-lg text-sm transition-colors border border-gray-600">
              {uploading ? "Uploading..." : form.image ? "Change Photo" : "Upload Photo"}
              <input
                type="file"
                accept="image/*"
                className="hidden"
                onChange={(e) => e.target.files && handleImageUpload(e.target.files[0])}
                disabled={uploading}
              />
            </label>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {/* NAME */}
            <div className="flex flex-col gap-2 md:col-span-2">
              <label className="text-sm font-medium text-gray-400 ml-1">Full Name</label>
              <input
                type="text"
                placeholder="John Doe"
                required
                className="p-3.5 rounded-xl bg-gray-800 border border-gray-700 focus:border-yellow-500 focus:ring-1 focus:ring-yellow-500 outline-none transition-all"
                onChange={(e) => setForm({ ...form, name: e.target.value })}
              />
            </div>

            {/* ROLE */}
            <div className="flex flex-col gap-2">
              <label className="text-sm font-medium text-gray-400 ml-1">Designation</label>
              <select
                required
                value={form.role}
                className="p-3.5 rounded-xl bg-gray-800 border border-gray-700 focus:border-yellow-500 outline-none transition-all appearance-none cursor-pointer"
                onChange={(e) => setForm({ ...form, role: e.target.value })}
              >
                <option value="">Select Role</option>
                {roles.map((role, index) => (
                  <option key={index} value={role}>{role}</option>
                ))}
              </select>
            </div>

            {/* YEAR */}
            <div className="flex flex-col gap-2">
              <label className="text-sm font-medium text-gray-400 ml-1">Tenure / Year</label>
              <input
                type="text"
                placeholder="e.g. 2024-2025"
                required
                className="p-3.5 rounded-xl bg-gray-800 border border-gray-700 focus:border-yellow-500 outline-none transition-all"
                onChange={(e) => setForm({ ...form, year: e.target.value })}
              />
            </div>

            {/* STATUS */}
            <div className="flex flex-col gap-2 md:col-span-2">
              <label className="text-sm font-medium text-gray-400 ml-1">Team Status</label>
              <select
                value={form.status}
                className="p-3.5 rounded-xl bg-gray-800 border border-gray-700 focus:border-yellow-500 outline-none transition-all cursor-pointer"
                onChange={(e) => setForm({ ...form, status: e.target.value })}
              >
                <option value="current">Current Team</option>
                <option value="ex">Ex-Team (Alumni)</option>
              </select>
            </div>

            {/* BIO */}
            <div className="flex flex-col gap-2 md:col-span-2">
              <label className="text-sm font-medium text-gray-400 ml-1">Bio (Optional)</label>
              <textarea
                rows={3}
                placeholder="Brief introduction..."
                className="p-3.5 rounded-xl bg-gray-800 border border-gray-700 focus:border-yellow-500 outline-none transition-all resize-none"
                onChange={(e) => setForm({ ...form, bio: e.target.value })}
              />
            </div>
          </div>

          {/* ACTIONS */}
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
              className="w-full sm:w-2/3 bg-yellow-500 hover:bg-yellow-400 disabled:bg-gray-600 text-black font-bold py-3.5 rounded-xl shadow-lg shadow-yellow-500/20 transition-all flex items-center justify-center gap-2"
            >
              {submitting ? (
                <>
                  <div className="w-4 h-4 border-2 border-black border-t-transparent animate-spin rounded-full"></div>
                  Saving Member...
                </>
              ) : (
                "Save Member Profile"
              )}
            </button>
          </div>
        </form>
      </div>
    </main>
  );
}