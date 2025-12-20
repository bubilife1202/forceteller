'use client';

import MainMenu from '@/components/MainMenu';

export default function Home() {
  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Starry Night Background */}
      <div className="starry-bg" />

      {/* Content */}
      <div className="relative z-10">
        <MainMenu />
      </div>
    </div>
  );
}
