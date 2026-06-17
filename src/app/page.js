"use client";

import dynamic from "next/dynamic";

const SolarSystem = dynamic(() => import("@/components/SolarSystem"), {
  ssr: false,
  loading: () => (
    <div className="w-screen h-screen bg-black flex flex-col items-center justify-center text-white">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-amber-500 mb-4"></div>
      <p className="text-amber-400 font-medium tracking-widest">
        Loading Solar System...
      </p>
    </div>
  ),
});

export default function Home() {
  return (
    <main>
      <SolarSystem />
    </main>
  );
}
