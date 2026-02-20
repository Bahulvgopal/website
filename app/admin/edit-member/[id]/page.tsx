"use client";

import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";

export default function EditMemberPage() {
  const router = useRouter();
  const params = useParams();

  // ✅ Safe ID extraction
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
    name: "",
    image: "",
    imagePublicId: "", // ⭐ IMPORTANT
    role: "",
    year: "",
    status: "current",
    bio: "",
  });

  const roles = [
    "Nodal Officer",
    "Project Coordinator",
    "Mentor",
    "Chief Executive Officer",
    "Women Lead",
    "Chief Quality And Operation Officer",
    "Quality And Operation Officer",
    "Chief Technology Officer",
    "Technology Officer",
    "Chief Branding And Marketing Officer",
    "Branding And Marketing Officer",
    "Chief Finance Officer",
    "Finance Officer",
    "Chief Women Innovation Officer",
    "Women Innovation Officer",
    "Chief IPR And Research Officer",
    "IPR And Research Officer",
    "Chief Community Officer",
    "Community Officer",
    "Chief Creative And Innovation Officer",
    "Creative And Innovation Officer",
    "Executive Curator",
    "Member",
  ];

  /* ================= FETCH MEMBER ================= */
  useEffect(() => {
    if (!id) return;

    async function fetchMember() {
      try {
        const res = await fetch(`/api/members/${id}`);

        if (!res.ok) throw new Error("Failed");

        const data = await res.json();

        // ⭐ SAFE MAPPING
        setForm({
          name: data.name || "",
          image: data.image || "",
          imagePublicId: data.imagePublicId || "",
          role: data.role || "",
          year: data.year || "",
          status: data.status || "current",
          bio: data.bio || "",
        });
      } catch (err) {
        console.error("Failed to fetch member", err);
        alert("Member not found");
        router.push("/admin");
      } finally {
        setLoading(false);
      }
    }

    fetchMember();
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
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            image: reader.result, // ⭐ base64
            folder: "members",
          }),
        });

        const data = await res.json();

        if (!res.ok) throw new Error();

        // ⭐ INSTANT PREVIEW + SAVE PUBLIC ID
        setForm((prev) => ({
          ...prev,
          image: data.url,
          imagePublicId: data.public_id,
        }));
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

      const res = await fetch(`/api/members/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (!res.ok) throw new Error();

      alert("Member updated successfully");

      router.push("/admin");
      router.refresh();
    } catch {
      alert("Update failed");
    } finally {
      setSubmitting(false);
    }
  }

  /* ================= LOADING ================= */
  if (loading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-black text-white">
        <div className="w-10 h-10 border-4 border-yellow-500 border-t-transparent animate-spin rounded-full mb-4"></div>
        <p className="text-gray-400 animate-pulse">
          Fetching member details...
        </p>
      </div>
    );
  }

  return (
    <main className="min-h-screen pt-24 pb-12 px-4 md:px-8 bg-black text-white flex justify-center items-start">
      <div className="w-full max-w-2xl bg-gray-900 p-6 md:p-10 rounded-2xl shadow-2xl border border-gray-800">

        {/* HEADER */}
        <header className="mb-8 text-center">
          <h1 className="text-3xl md:text-4xl font-extrabold text-white">
            Edit Member <span className="text-yellow-500">|</span>
          </h1>
          <p className="text-gray-400 mt-2 text-sm">
            Update profile for {form.name}
          </p>
        </header>

        <form onSubmit={handleSubmit} className="space-y-6">

          {/* IMAGE */}
          <div className="flex flex-col items-center gap-4 bg-gray-800/30 p-6 rounded-xl border border-gray-800">
            <div className="relative">
              <img
                src={`${form.image}?t=${Date.now()}`} // ⭐ CACHE FIX
                className="w-32 h-32 rounded-full object-cover border-4 border-gray-700"
                alt="preview"
              />

              {uploading && (
                <div className="absolute inset-0 bg-black/60 rounded-full flex items-center justify-center">
                  <div className="w-6 h-6 border-2 border-yellow-500 border-t-transparent animate-spin rounded-full"></div>
                </div>
              )}
            </div>

            <label className="cursor-pointer bg-gray-800 px-5 py-2 rounded-full text-xs border border-gray-600">
              {uploading ? "UPLOADING..." : "REPLACE PHOTO"}
              <input
                type="file"
                accept="image/*"
                className="hidden"
                onChange={(e) =>
                  e.target.files &&
                  handleImageUpload(e.target.files[0])
                }
              />
            </label>
          </div>

          {/* FORM */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

            <input
              type="text"
              value={form.name}
              required
              placeholder="Name"
              className="p-3 rounded-xl bg-gray-800 border border-gray-700"
              onChange={(e) =>
                setForm({ ...form, name: e.target.value })
              }
            />

            <input
              type="text"
              value={form.year}
              required
              placeholder="Year"
              className="p-3 rounded-xl bg-gray-800 border border-gray-700"
              onChange={(e) =>
                setForm({ ...form, year: e.target.value })
              }
            />

            <select
              value={form.role}
              required
              className="p-3 rounded-xl bg-gray-800 border border-gray-700"
              onChange={(e) =>
                setForm({ ...form, role: e.target.value })
              }
            >
              <option value="">Select Role</option>
              {roles.map((role, i) => (
                <option key={i}>{role}</option>
              ))}
            </select>

            <select
              value={form.status}
              className="p-3 rounded-xl bg-gray-800 border border-gray-700"
              onChange={(e) =>
                setForm({ ...form, status: e.target.value })
              }
            >
              <option value="current">Current</option>
              <option value="ex">Ex</option>
            </select>

            <textarea
              value={form.bio}
              rows={3}
              placeholder="Bio"
              className="p-3 rounded-xl bg-gray-800 border border-gray-700 md:col-span-2"
              onChange={(e) =>
                setForm({ ...form, bio: e.target.value })
              }
            />
          </div>

          {/* BUTTONS */}
          <div className="flex gap-3 pt-4">
            <button
              type="button"
              onClick={() => router.back()}
              className="flex-1 py-3 rounded-xl border border-gray-700"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={uploading || submitting}
              className="flex-1 bg-yellow-500 text-black font-bold py-3 rounded-xl"
            >
              {submitting ? "Saving..." : "Update Member"}
            </button>
          </div>

        </form>
      </div>
    </main>
  );
}
