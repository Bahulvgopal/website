"use client";

import { signOut } from "next-auth/react";

export default function SignOutButton() {
  return (
    <button
      onClick={() => signOut({ callbackUrl: "/" })}
      className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg transition"
    >
      Sign Out
    </button>
  );
}
