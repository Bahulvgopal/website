"use client";

import { useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import Cropper from "react-easy-crop";
import type { Area } from "react-easy-crop";

/* ================= ASPECT RATIO OPTIONS ================= */
const ASPECT_RATIOS = [
  { label: "Original", value: null },
  { label: "16:9",     value: 16 / 9 },
  { label: "4:3",      value: 4 / 3 },
  { label: "1:1",      value: 1 },
  { label: "3:4",      value: 3 / 4 },
  { label: "9:16",     value: 9 / 16 },
];

/* ================= CROP HELPER ================= */
async function getCroppedImg(imageSrc: string, pixelCrop: Area): Promise<string> {
  const image = await new Promise<HTMLImageElement>((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve(img);
    img.onerror = reject;
    img.src = imageSrc;
  });

  const canvas = document.createElement("canvas");
  canvas.width = pixelCrop.width;
  canvas.height = pixelCrop.height;
  const ctx = canvas.getContext("2d")!;

  ctx.drawImage(
    image,
    pixelCrop.x,
    pixelCrop.y,
    pixelCrop.width,
    pixelCrop.height,
    0,
    0,
    pixelCrop.width,
    pixelCrop.height
  );

  return canvas.toDataURL("image/jpeg", 0.95);
}

/* ================= MAIN PAGE ================= */
export default function AddEventPage() {
  const router = useRouter();

  const [form, setForm] = useState({
    title: "",
    description: "",
    image: "",
    location: "",
    eventDate: "",
    registrationDeadline: "",

    registrationType: "internal" as "internal" | "external",
    externalRegistrationUrl: "",

    // NEW
    eventMode: "solo" as "solo" | "team",
    minTeamMembers: 2,
    maxTeamMembers: 2,
});

  const [uploading, setUploading]   = useState(false);
  const [submitting, setSubmitting] = useState(false);

  /* --- Crop state --- */
  const [rawImage, setRawImage]                   = useState<string | null>(null);
  const [showCropper, setShowCropper]             = useState(false);
  const [crop, setCrop]                           = useState({ x: 0, y: 0 });
  const [zoom, setZoom]                           = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState<Area | null>(null);
  const [selectedRatio, setSelectedRatio]         = useState<number | null>(ASPECT_RATIOS[0].value);
  const [selectedRatioLabel, setSelectedRatioLabel] = useState("Original");

  /* ================= READ FILE ================= */
  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      setRawImage(reader.result as string);
      setCrop({ x: 0, y: 0 });
      setZoom(1);
      setShowCropper(true);
    };
    reader.readAsDataURL(file);
  }

  const onCropComplete = useCallback((_: Area, areaPixels: Area) => {
    setCroppedAreaPixels(areaPixels);
  }, []);

  /* ================= APPLY CROP & UPLOAD ================= */
  async function applyCropAndUpload() {
    if (!rawImage || !croppedAreaPixels) return;

    try {
      setUploading(true);
      setShowCropper(false);

      const croppedDataUrl = await getCroppedImg(rawImage, croppedAreaPixels);

      const res = await fetch("/api/upload", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ image: croppedDataUrl }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error("Upload failed");

      setForm((prev) => ({ ...prev, image: data.url }));
    } catch (error) {
      console.error(error);
      alert("Image upload failed");
      setShowCropper(true);
    } finally {
      setUploading(false);
    }
  }

  /* ================= SUBMIT ================= */
  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (!form.image) {
      alert("Please upload an event banner");
      return;
    }

    // 🔥 NEW: validate external URL if external mode selected
    if (form.registrationType === "external" && !form.externalRegistrationUrl.trim()) {
      alert("Please enter the External Registration URL");
      return;
    }

    if (form.eventMode === "team") {

  if (form.minTeamMembers < 2) {
    alert("Minimum team members must be at least 2.");
    return;
  }

  if (form.maxTeamMembers < form.minTeamMembers) {
    alert("Maximum team members cannot be less than minimum team members.");
    return;
  }
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

  /* ================= RENDER ================= */
  return (
    <>
      {/* ======================================================
          CROPPER MODAL
          – Full-screen on mobile, stays full-screen on all sizes.
          – On tall phones (portrait) the crop area still has
            flex-1 so it fills the space between the two fixed
            header/footer strips.
      ====================================================== */}
      {showCropper && rawImage && (
        <div className="fixed inset-0 z-50 bg-black flex flex-col overflow-hidden">

          {/* ── Header ── */}
          <div className="flex-shrink-0 flex items-center justify-between
                          px-4 sm:px-6 py-3 border-b border-gray-800">
            <h2 className="text-white font-bold text-base sm:text-lg">Crop Image</h2>
            <button
              onClick={() => { setShowCropper(false); setRawImage(null); }}
              className="text-gray-400 hover:text-white text-3xl leading-none p-1 -mr-1"
              aria-label="Close cropper"
            >
              ×
            </button>
          </div>

          {/* ── Aspect-ratio pills ──
              Scrollable row on very narrow phones so nothing wraps awkwardly */}
          <div className="flex-shrink-0 flex items-center gap-2
                          px-4 sm:px-6 py-10 border-b border-gray-800
                          overflow-x-auto scrollbar-none">
            {ASPECT_RATIOS.map((r) => (
              <button
                key={r.label}
                onClick={() => {
                  setSelectedRatio(r.value);
                  setSelectedRatioLabel(r.label);
                  setCrop({ x: 0, y: 0 });
                  setZoom(1);
                }}
                className={`flex-shrink-0 px-3 py-1.5 rounded-lg text-xs sm:text-sm
                            font-semibold transition-all border
                            ${selectedRatioLabel === r.label
                              ? "bg-yellow-500 text-black border-yellow-500"
                              : "bg-gray-800 text-gray-300 border-gray-700 hover:border-yellow-500/50"
                            }`}
              >
                {r.label}
              </button>
            ))}
          </div>

          {/* ── Crop canvas – grows to fill remaining height ── */}
          <div className="relative flex-1 min-h-0">
            <Cropper
              image={rawImage}
              crop={crop}
              zoom={zoom}
              aspect={selectedRatio ?? undefined}
              onCropChange={setCrop}
              onZoomChange={setZoom}
              onCropComplete={onCropComplete}
            />
          </div>

          {/* ── Zoom slider ── */}
          <div className="flex-shrink-0 flex items-center gap-3
                          px-4 sm:px-6 py-3 border-t border-gray-800">
            <span className="text-gray-400 text-xs sm:text-sm whitespace-nowrap">Zoom</span>
            <input
              type="range"
              min={1}
              max={3}
              step={0.05}
              value={zoom}
              onChange={(e) => setZoom(Number(e.target.value))}
              className="flex-1 accent-yellow-500 h-1.5"
            />
            <span className="text-gray-400 text-xs sm:text-sm w-9 text-right tabular-nums">
              {zoom.toFixed(1)}×
            </span>
          </div>

          {/* ── Action buttons ── */}
          <div className="flex-shrink-0 flex gap-3
                          px-4 sm:px-6 py-4 border-t border-gray-800
                          safe-bottom">
            <button
              onClick={() => { setShowCropper(false); setRawImage(null); }}
              className="flex-1 py-3 rounded-xl border border-gray-700 text-white
                         text-sm sm:text-base font-semibold hover:bg-gray-800 transition-all"
            >
              Cancel
            </button>
            <button
              onClick={applyCropAndUpload}
              className="flex-[2] py-3 rounded-xl bg-yellow-500 hover:bg-yellow-400
                         text-black text-sm sm:text-base font-bold transition-all
                         shadow-lg shadow-yellow-500/20 active:scale-[0.98]"
            >
              Apply &amp; Upload
            </button>
          </div>
        </div>
      )}

      {/* ======================================================
          MAIN FORM
      ====================================================== */}
      <main className="min-h-screen pt-16 sm:pt-20 md:pt-24 pb-10 sm:pb-12
                       px-4 sm:px-6 md:px-8
                       bg-black text-white
                       flex justify-center items-start">

        <div className="w-full max-w-2xl
                        bg-gray-900
                        p-5 sm:p-7 md:p-10
                        rounded-2xl shadow-2xl border border-gray-800">

          {/* ── Page header ── */}
          <header className="mb-6 sm:mb-8 text-center">
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold
                           bg-gradient-to-r from-yellow-400 to-yellow-600
                           bg-clip-text text-transparent leading-tight">
              Create New Event
            </h1>
            <p className="text-gray-400 mt-2 text-xs sm:text-sm md:text-base">
              Launch a new session or workshop for the community.
            </p>
          </header>

          <form onSubmit={handleSubmit} className="space-y-5 sm:space-y-6">

            {/* ── Banner upload ── */}
            <div className="flex flex-col gap-2 sm:gap-3">
              <label className="text-xs sm:text-sm font-medium text-gray-400 ml-1">
                Event Banner
              </label>
              {/* Height adapts: shorter on small phones, taller on tablets+ */}
              <div className="relative group w-full
                              h-36 xs:h-44 sm:h-52 md:h-64
                              bg-gray-800 rounded-xl overflow-hidden
                              border-2 border-dashed border-gray-700
                              flex flex-col items-center justify-center
                              transition-all hover:border-yellow-500/50">

                {form.image ? (
                  <>
                    <img
                      src={form.image}
                      className="w-full h-full object-cover"
                      alt="Banner preview"
                    />
                    <div className="absolute inset-0 bg-black/40 opacity-0
                                    group-hover:opacity-100 flex items-center
                                    justify-center transition-opacity">
                      <p className="text-white text-sm font-semibold">Change Image</p>
                    </div>
                  </>
                ) : (
                  <div className="flex flex-col items-center text-gray-500 select-none">
                    <span className="text-3xl sm:text-4xl mb-1.5 sm:mb-2">🖼️</span>
                    <p className="text-xs sm:text-sm">Tap to upload banner</p>
                  </div>
                )}

                {uploading && (
                  <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
                    <div className="w-8 h-8 border-[3px] border-yellow-500
                                    border-t-transparent animate-spin rounded-full" />
                  </div>
                )}

                <input
                  type="file"
                  accept="image/*"
                  className="absolute inset-0 opacity-0 cursor-pointer"
                  onChange={handleFileChange}
                  disabled={uploading || showCropper}
                />
              </div>
            </div>

            {/* ── Text fields ── */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">

              {/* Title – full width */}
              <div className="flex flex-col gap-1.5 sm:col-span-2">
                <label className="text-xs sm:text-sm font-medium text-gray-400 ml-1">
                  Event Title
                </label>
                <input
                  type="text"
                  placeholder="e.g. AI Workshop 2026"
                  required
                  className="p-3 sm:p-3.5 rounded-xl bg-gray-800 border border-gray-700
                             text-sm sm:text-base
                             focus:border-yellow-500 focus:ring-1 focus:ring-yellow-500
                             outline-none transition-all"
                  onChange={(e) => setForm({ ...form, title: e.target.value })}
                />
              </div>

              {/* Description – full width */}
              <div className="flex flex-col gap-1.5 sm:col-span-2">
                <label className="text-xs sm:text-sm font-medium text-gray-400 ml-1">
                  Description
                </label>
                <textarea
                  rows={4}
                  placeholder="What is this event about?"
                  required
                  className="p-3 sm:p-3.5 rounded-xl bg-gray-800 border border-gray-700
                             text-sm sm:text-base
                             focus:border-yellow-500 outline-none transition-all resize-none"
                  onChange={(e) => setForm({ ...form, description: e.target.value })}
                />
              </div>

              {/* Location – full width */}
              <div className="flex flex-col gap-1.5 sm:col-span-2">
                <label className="text-xs sm:text-sm font-medium text-gray-400 ml-1">
                  Location / Platform
                </label>
                <input
                  type="text"
                  placeholder="e.g. Main Auditorium or Google Meet"
                  required
                  className="p-3 sm:p-3.5 rounded-xl bg-gray-800 border border-gray-700
                             text-sm sm:text-base
                             focus:border-yellow-500 outline-none transition-all"
                  onChange={(e) => setForm({ ...form, location: e.target.value })}
                />
              </div>

              {/* Event date – half width on sm+ */}
              <div className="flex flex-col gap-1.5">
                <label className="text-xs sm:text-sm font-medium text-gray-400 ml-1">
                  Event Date
                </label>
                <input
                  type="date"
                  required
                  className="p-3 sm:p-3.5 rounded-xl bg-gray-800 border border-gray-700
                             text-sm sm:text-base w-full
                             focus:border-yellow-500 outline-none transition-all
                             [color-scheme:dark]"
                  onChange={(e) => setForm({ ...form, eventDate: e.target.value })}
                />
              </div>

              {/* Reg. deadline – half width on sm+ */}
              <div className="flex flex-col gap-1.5">
                <label className="text-xs sm:text-sm font-medium text-gray-400 ml-1">
                  Reg. Deadline
                </label>
                <input
                  type="date"
                  required
                  className="p-3 sm:p-3.5 rounded-xl bg-gray-800 border border-gray-700
                             text-sm sm:text-base w-full
                             focus:border-yellow-500 outline-none transition-all
                             [color-scheme:dark]"
                  onChange={(e) => setForm({ ...form, registrationDeadline: e.target.value })}
                />
              </div>

              {/* ── 🔥 NEW: Registration Type – full width ── */}
              <div className="flex flex-col gap-1.5 sm:col-span-2">
                <label className="text-xs sm:text-sm font-medium text-gray-400 ml-1">
                  Registration Type
                </label>
                <select
                  value={form.registrationType}
                  className="p-3 sm:p-3.5 rounded-xl bg-gray-800 border border-gray-700
                             text-sm sm:text-base
                             focus:border-yellow-500 outline-none transition-all
                             [color-scheme:dark]"
                  onChange={(e) =>
                    setForm({
                      ...form,
                      registrationType: e.target.value as "internal" | "external",
                    })
                  }
                >
                  <option value="internal">Internal</option>
                  <option value="external">External</option>
                </select>
              </div>

              {/* ── 🔥 NEW: External Registration URL – only if External selected ── */}
              {form.registrationType === "external" && (
                <div className="flex flex-col gap-1.5 sm:col-span-2">
                  <label className="text-xs sm:text-sm font-medium text-gray-400 ml-1">
                    External Registration URL
                  </label>
                  <input
                    type="url"
                    placeholder="https://makemypass.com/your-event"
                    required
                    value={form.externalRegistrationUrl}
                    className="p-3 sm:p-3.5 rounded-xl bg-gray-800 border border-gray-700
                               text-sm sm:text-base
                               focus:border-yellow-500 outline-none transition-all"
                    onChange={(e) =>
                      setForm({ ...form, externalRegistrationUrl: e.target.value })
                    }
                  />
                </div>
              )}

              {/* Participation Type */}
<div className="flex flex-col gap-1.5 sm:col-span-2">
  <label className="text-xs sm:text-sm font-medium text-gray-400 ml-1">
    Participation Type
  </label>

  <select
    value={form.eventMode}
    className="p-3 sm:p-3.5 rounded-xl bg-gray-800 border border-gray-700
    text-sm sm:text-base
    focus:border-yellow-500 outline-none transition-all
    [color-scheme:dark]"
    onChange={(e) =>
      setForm({
        ...form,
        eventMode: e.target.value as "solo" | "team",
      })
    }
  >
    <option value="solo">Solo Event</option>
    <option value="team">Team Event</option>
  </select>
</div>

{form.eventMode === "team" && (
  <>
    <div className="flex flex-col gap-1.5">
      <label className="text-xs sm:text-sm font-medium text-gray-400 ml-1">
        Minimum Team Members
      </label>

      <input
        type="number"
        min={2}
        value={form.minTeamMembers}
        className="p-3 sm:p-3.5 rounded-xl bg-gray-800 border border-gray-700
        text-sm sm:text-base
        focus:border-yellow-500 outline-none transition-all"
        onChange={(e) =>
          setForm({
            ...form,
            minTeamMembers: Number(e.target.value),
          })
        }
      />
    </div>

    <div className="flex flex-col gap-1.5">
      <label className="text-xs sm:text-sm font-medium text-gray-400 ml-1">
        Maximum Team Members
      </label>

      <input
        type="number"
        min={form.minTeamMembers}
        value={form.maxTeamMembers}
        className="p-3 sm:p-3.5 rounded-xl bg-gray-800 border border-gray-700
        text-sm sm:text-base
        focus:border-yellow-500 outline-none transition-all"
        onChange={(e) =>
          setForm({
            ...form,
            maxTeamMembers: Number(e.target.value),
          })
        }
      />
    </div>
  </>
)}
            </div>

            {/* ── Action buttons ── */}
            <div className="flex flex-col xs:flex-row gap-3 pt-3 sm:pt-4">
              <button
                type="button"
                onClick={() => router.back()}
                className="w-full xs:w-auto xs:flex-1 sm:flex-none sm:w-1/3
                           py-3 sm:py-3.5 rounded-xl font-semibold text-sm sm:text-base
                           border border-gray-700 hover:bg-gray-800 transition-all
                           active:scale-[0.98]"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={uploading || submitting}
                className="w-full xs:flex-[2] sm:flex-none sm:w-2/3
                           bg-yellow-500 hover:bg-yellow-400 disabled:opacity-50
                           text-black font-bold text-sm sm:text-base
                           py-3 sm:py-3.5 rounded-xl
                           shadow-lg shadow-yellow-500/20 transition-all
                           flex items-center justify-center gap-2
                           active:scale-[0.98]"
              >
                {submitting ? (
                  <>
                    <div className="w-4 h-4 border-2 border-black
                                    border-t-transparent animate-spin rounded-full" />
                    Publishing…
                  </>
                ) : (
                  "Create Event"
                )}
              </button>
            </div>
          </form>
        </div>
      </main>
    </>
  );
}