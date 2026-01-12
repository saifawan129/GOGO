
import React, { useEffect, useRef, useState } from 'react';
import '@google/model-viewer';

/* 
 * Fix: Use a capitalized constant for the custom element to avoid 
 * intrinsic element type errors without shadowing the global JSX namespace.
 */
const ModelViewer = 'model-viewer' as any;

const ScrollExperience: React.FC = () => {
  const modelPath = "/gogo.glb.glb";
  const modelViewerRef = useRef<any>(null);
  const [scrollOffset, setScrollOffset] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrollOffset(window.scrollY);
    };
    
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="relative w-full">
      {/* 
          Fixed Container for GOGO Mascot 
          - z-40: Above content sections, below Navbar (z-50)
          - Adjusted top to 15% to clear the navbar reliably
      */}
      <div className="fixed top-[15%] right-0 w-full md:w-[45%] h-[70vh] pointer-events-none z-40 flex items-center justify-center overflow-visible">
        <div 
          className="w-full h-full flex items-center justify-center pointer-events-none transition-transform duration-500 ease-out"
          style={{ 
            // Parallax Y-translation 
            transform: `translateY(${scrollOffset * -0.06}px)` 
          }}
        >
          {modelPath && modelPath.trim() !== "" && (
            <ModelViewer
              ref={modelViewerRef}
              src={modelPath}
              alt="GOGO Cinematic Mascot"
              auto-rotate
              auto-rotate-delay={2000}
              camera-controls
              disable-zoom // Prevents mouse wheel / pinch zooming
              autoplay
              shadow-intensity="1.5"
              environment-image="neutral"
              exposure="1.1"
              interaction-prompt="none"
              interpolation-decay="200" 
              orbit-sensitivity="1.2"
              touch-action="pan-y"
              min-polar-angle="20deg" // Prevents looking directly from bottom
              max-polar-angle="160deg" // Prevents looking directly from top
              // Camera orbit distance fixed at 150% to maintain constant size
              camera-orbit="45deg 75deg 150%" 
              style={{ 
                width: '100%', 
                height: '100%', 
                backgroundColor: 'transparent',
                outline: 'none',
                cursor: 'grab',
                pointerEvents: 'auto' 
              }}
            />
          )}
        </div>
        
        {/* Dynamic Shadow underneath */}
        <div 
          className="absolute top-[80%] left-1/2 -translate-x-1/2 w-[25%] h-[4%] bg-blue-600/10 rounded-full blur-[40px] -z-1 pointer-events-none"
          style={{ transform: `translateX(-50%) translateY(${scrollOffset * -0.03}px)` }}
        ></div>
      </div>

      {/* Content Sections */}
      <div className="relative z-20">
        
        {/* Section 1: Hero Title */}
        <section className="min-h-screen flex flex-col justify-center px-6 md:px-24">
          <div className="w-full md:w-1/2 text-center md:text-left">
            <span className="text-blue-600 font-black text-xs uppercase mb-4 tracking-[0.3em] block">System Sequence Active</span>
            <h1 className="text-6xl md:text-[8.5rem] font-black text-blue-900 leading-[0.85] tracking-tighter mb-6">
              HELLO, <br /> I'M GOGO.
            </h1>
            <p className="text-blue-900/60 text-lg md:text-xl font-bold mb-10 max-w-md mx-auto md:mx-0">
              Your cinematic guide to the spatial intersection of curiosity and intelligence.
            </p>
            <div className="flex justify-center md:justify-start gap-3">
              <div className="bg-blue-600 rounded-full h-2 w-20"></div>
              <div className="bg-blue-600/20 rounded-full h-2 w-6"></div>
            </div>
          </div>
        </section>

        {/* Section 2: Beyond Surface */}
        <section className="min-h-screen flex flex-col justify-center px-6 md:px-24 bg-white/5 backdrop-blur-[2px]">
          <div className="w-full md:w-1/2 text-center md:text-left">
            <h2 className="text-5xl md:text-8xl font-black text-blue-950 mb-6 leading-none tracking-tighter">FIXED <br /> SCALE.</h2>
            <p className="text-blue-900/50 text-lg md:text-xl font-bold max-w-sm mx-auto md:mx-0">
              Zoom is disabled for a focused cinematic experience. Rotate freely without changing distance.
            </p>
          </div>
        </section>

        {/* Section 3: Vivid World */}
        <section className="min-h-screen flex flex-col justify-center px-6 md:px-24">
          <div className="w-full md:w-1/2 text-center md:text-left">
            <h2 className="text-5xl md:text-8xl font-black text-blue-950 mb-6 leading-none tracking-tighter">VIVID <br /> WORLD.</h2>
            <p className="text-blue-900/50 text-lg md:text-xl font-bold max-w-sm mx-auto md:mx-0">
              Where data flows into form and curiosity fuels the engine of discovery.
            </p>
            <button className="mt-12 px-10 py-4 bg-blue-600 hover:bg-blue-700 text-white font-black rounded-2xl shadow-2xl shadow-blue-500/30 transform hover:scale-105 active:scale-95 transition-all uppercase tracking-widest text-sm pointer-events-auto relative z-30">
              Launch Console
            </button>
          </div>
        </section>

        {/* Section 4: Final Call */}
        <section className="min-h-screen flex flex-col items-center justify-center text-center py-5">
           <div className="container">
              <h2 className="text-5xl font-black text-blue-950 mb-12 tracking-tighter">Ready to Begin?</h2>
              <div className="flex flex-wrap justify-center gap-8 w-100 px-4 mb-12">
                <div className="w-full sm:w-auto">
                  <div className="p-8 bg-white/40 backdrop-blur-xl rounded-[2.5rem] border border-white/60 shadow-xl text-left" style={{ minWidth: '280px' }}>
                    <p className="text-[10px] font-black text-blue-600 uppercase mb-3 tracking-widest">Core Integrity</p>
                    <p className="text-3xl font-black text-blue-900 mb-0">100% Stable</p>
                  </div>
                </div>
                <div className="w-full sm:w-auto">
                  <div className="p-8 bg-white/40 backdrop-blur-xl rounded-[2.5rem] border border-white/60 shadow-xl text-left" style={{ minWidth: '280px' }}>
                    <p className="text-[10px] font-black text-blue-600 uppercase mb-3 tracking-widest">Neural Link</p>
                    <p className="text-3xl font-black text-blue-900 mb-0">Gemini Active</p>
                  </div>
                </div>
              </div>
              <footer className="mt-32 py-10 opacity-30">
                <p className="text-[10px] font-black uppercase tracking-[1.5em] text-blue-600 mb-0">End of Transmission</p>
              </footer>
           </div>
        </section>

      </div>

      <style>{`
        section {
          position: relative;
          overflow: hidden;
        }
        model-viewer:active {
          cursor: grabbing !important;
        }
      `}</style>
    </div>
  );
};

export default ScrollExperience;
