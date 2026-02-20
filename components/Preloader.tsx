"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

export default function Preloader() {
  const [loading, setLoading] = useState(true);
  const pathname = usePathname();

  useEffect(() => {
    setLoading(true);

    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, [pathname]);

  if (!loading) return null;

  return (
    <div className="fixed top-0 left-0 w-screen h-screen bg-black z-[9999] flex items-center justify-center">
      <video
        src="/preloader.mp4"
        autoPlay
        muted
        playsInline
        className="w-48"
      />
    </div>
  );
}
