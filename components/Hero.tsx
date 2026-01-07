
import React from 'react';
import Scene3D from './Scene3D';

const Hero: React.FC = () => {
  return (
    <section className="relative h-screen w-full flex items-center overflow-hidden">
      {/* 3D Background Layer */}
      <div className="absolute inset-0 z-0">
        <Scene3D />
      </div>

      {/* Cinematic Overlay Text */}
      <div className="relative z-10 container mx-auto px-6 flex flex-col md:flex-row items-center justify-between pointer-events-none">
        <div className="max-w-2xl text-center md:text-left">
          <div className="inline-block px-4 py-1.5 bg-blue-100/50 backdrop-blur-sm border border-blue-200/50 rounded-full mb-6">
            <span className="text-blue-600 text-xs font-bold uppercase tracking-widest italic">Introducing Version 2.0</span>
          </div>
          <h1 className="text-6xl md:text-8xl font-black text-blue-900 leading-[0.9] tracking-tight mb-8">
            Explore <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-500">
              Interesting
            </span> <br />
            Things.
          </h1>
          <p className="text-blue-900/60 text-lg md:text-xl font-medium max-w-md leading-relaxed mb-10">
            Meet GOGO, your hyper-curious mascot designed to bridge the gap between imagination and reality in the digital realm.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center gap-4 pointer-events-auto">
            <button className="w-full sm:w-auto px-10 py-5 bg-blue-900 text-white rounded-2xl font-bold shadow-2xl hover:bg-blue-800 transform hover:-translate-y-1 transition-all">
              Start Exploring
            </button>
            <button className="w-full sm:w-auto px-10 py-5 bg-white text-blue-900 rounded-2xl font-bold shadow-xl border border-blue-100 hover:bg-blue-50 transform hover:-translate-y-1 transition-all">
              Watch Cinematic
            </button>
          </div>
        </div>

        {/* Floating Side Info (Mascot Attributes) */}
        <div className="hidden lg:flex flex-col gap-8 text-right pointer-events-auto">
            <div className="space-y-1">
                <p className="text-[10px] font-bold text-blue-400 uppercase tracking-widest">Constellation</p>
                <p className="text-2xl font-black text-blue-900">Aquarius</p>
            </div>
            <div className="space-y-1">
                <p className="text-[10px] font-bold text-blue-400 uppercase tracking-widest">Character</p>
                <p className="text-2xl font-black text-blue-900">Infinite Energy</p>
            </div>
            <div className="space-y-1">
                <p className="text-[10px] font-bold text-blue-400 uppercase tracking-widest">Personality</p>
                <p className="text-2xl font-black text-blue-900">Optimistic</p>
            </div>
        </div>
      </div>

      {/* Cinematic Bars (Letterboxing) */}
      <div className="absolute top-0 left-0 w-full h-12 bg-sky-50 z-20 pointer-events-none opacity-50"></div>
      <div className="absolute bottom-0 left-0 w-full h-12 bg-sky-50 z-20 pointer-events-none opacity-50"></div>
    </section>
  );
};

export default Hero;
