"use client";

import { useRouter } from "next/navigation";

export default function DeleteMemberButton({ id }: { id: string }) {
  const router = useRouter();

  async function handleDelete() {
    const confirmDelete = confirm(
      "Are you sure you want to delete this member?"
    );

    if (!confirmDelete) return;

    const res = await fetch(`/api/members/${id}`, {
      method: "DELETE",
    });

    if (res.ok) {
      alert("Member Deleted Successfully");
      router.refresh();
    } else {
      alert("Delete Failed");
    }
  }

  return (
    <button
      onClick={handleDelete}
      className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded text-white transition"
    >
      Delete
    </button>
  );
}
