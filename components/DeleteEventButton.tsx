"use client";

export default function DeleteEventButton({ id }: { id: string }) {

  async function handleDelete() {
    const confirmDelete = confirm("Are you sure you want to delete this event?");
    if (!confirmDelete) return;

    const res = await fetch(`/api/events/${id}`, {
      method: "DELETE",
    });

    if (res.ok) {
      alert("Event deleted successfully");
      window.location.reload();
    } else {
      alert("Delete failed");
    }
  }

  return (
    <button
      onClick={handleDelete}
      className="bg-red-600 px-4 py-2 rounded hover:bg-red-700"
    >
      Delete
    </button>
  );
}
