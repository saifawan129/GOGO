import React from 'react';
import '@google/model-viewer';

// Register custom element for TypeScript
declare global {
  namespace React {
    namespace JSX {
      interface IntrinsicElements {
        'model-viewer': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement> & {
          src?: string;
          alt?: string;
          'auto-rotate'?: boolean;
          'camera-controls'?: boolean;
          autoplay?: boolean;
          loop?: boolean;
          ar?: boolean;
          'shadow-intensity'?: string;
          'shadow-softness'?: string;
          'environment-image'?: string;
          exposure?: string;
          'camera-orbit'?: string;
          'field-of-view'?: string;
          style?: React.CSSProperties;
        };
      }
    }
  }
}

const ScrollExperience: React.FC = () => {
  // Filename as specified by user
  const modelPath = "/gogo.glb.glb";

  return (
    <div className="w-100 overflow-x-hidden">
      {/* Section 1: Hero Scene with GOGO Mascot */}
      <section className="min-vh-100 d-flex flex-column flex-md-row align-items-center px-4 px-md-5 py-5">
        <div className="col-12 col-md-6 d-flex flex-column justify-content-center text-center text-md-start z-1">
          <span className="text-primary fw-bold small text-uppercase mb-3 tracking-widest d-block">System Online</span>
          <h1 className="display-1 fw-black text-dark mb-4" style={{ lineHeight: '0.85', letterSpacing: '-0.05em' }}>
            HELLO, <br /> I'M GOGO.
          </h1>
          <p className="text-secondary opacity-75 fs-5 fw-bold mb-5 mx-auto mx-md-0" style={{ maxWidth: '400px' }}>
            Your spatial guide to the intersection of art and intelligence.
          </p>
          <div className="d-flex justify-content-center justify-content-md-start gap-2">
            <div className="bg-primary rounded-pill" style={{ width: '60px', height: '6px' }}></div>
            <div className="bg-primary opacity-25 rounded-pill" style={{ width: '15px', height: '6px' }}></div>
          </div>
        </div>

        {/* 3D Model Display Area - Bootstrap Centered and Responsive */}
        <div className="col-12 col-md-6 vh-50 vh-md-100 d-flex justify-content-center align-items-center position-relative">
          <div className="container-fluid h-100 d-flex justify-content-center align-items-center">
            {/* Defensive check to prevent empty-string fetch error */}
            {modelPath && modelPath.trim() !== "" && (
              <model-viewer
                src={modelPath}
                alt="GOGO Cinematic Mascot"
                auto-rotate
                camera-controls
                autoplay
                ar
                shadow-intensity="1"
                environment-image="neutral"
                exposure="1.2"
                camera-orbit="0deg 75deg 105%"
                style={{ width: '100%', height: '100%', minHeight: '500px', backgroundColor: 'transparent' }}
              />
            )}
          </div>
          {/* Decorative cinematic glow */}
          <div className="position-absolute top-50 start-50 translate-middle w-75 h-75 bg-primary opacity-10 rounded-circle" style={{ filter: 'blur(120px)', zIndex: -1 }}></div>
        </div>
      </section>

      {/* Section 2: Beyond Surface */}
      <section className="min-vh-100 d-flex align-items-center justify-content-end px-4 px-md-5 bg-white bg-opacity-10 shadow-sm" style={{ backdropFilter: 'blur(10px)' }}>
        <div className="text-end" style={{ maxWidth: '600px' }}>
          <h2 className="display-2 fw-black text-dark mb-4">BEYOND <br /> SURFACE.</h2>
          <p className="text-secondary opacity-75 fs-5 fw-bold ms-auto" style={{ maxWidth: '400px' }}>
            Interactive spatial components designed for emotional resonance.
          </p>
        </div>
      </section>

      {/* Section 3: Interface Scene */}
      <section className="min-vh-100 d-flex align-items-center px-4 px-md-5">
        <div style={{ maxWidth: '600px' }}>
          <h2 className="display-2 fw-black text-dark mb-4">VIVID <br /> WORLD.</h2>
          <p className="text-secondary opacity-75 fs-5 fw-bold" style={{ maxWidth: '400px' }}>
            Where data takes shape and curiosity drives every pixel forward.
          </p>
          <button className="btn btn-primary btn-lg rounded-4 px-5 py-3 fw-bold text-uppercase mt-4 shadow-lg hover:scale-105 active:scale-95 transition-all">
            Launch Console
          </button>
        </div>
      </section>

      {/* Section 4: Final Call */}
      <section className="min-vh-100 d-flex flex-column align-items-center justify-content-center text-center py-5" style={{ background: 'linear-gradient(to top, rgba(169, 191, 255, 0.3), transparent)' }}>
        <h2 className="display-4 fw-black text-dark mb-5 tracking-tighter">Ready to Begin?</h2>
        <div className="row justify-content-center g-4 w-100 px-4 mb-5">
          <div className="col-12 col-sm-auto">
            <div className="p-5 bg-white bg-opacity-50 backdrop-blur rounded-5 border-white border shadow-sm text-start" style={{ minWidth: '260px' }}>
              <p className="small fw-black text-primary text-uppercase mb-3 tracking-widest">Core Status</p>
              <p className="h3 fw-black text-dark mb-0">Stable</p>
            </div>
          </div>
          <div className="col-12 col-sm-auto">
            <div className="p-5 bg-white bg-opacity-50 backdrop-blur rounded-5 border-white border shadow-sm text-start" style={{ minWidth: '260px' }}>
              <p className="small fw-black text-primary text-uppercase mb-3 tracking-widest">Intelligence</p>
              <p className="h3 fw-black text-dark mb-0">Gemini 3</p>
            </div>
          </div>
        </div>
        <footer className="mt-auto py-5 opacity-25">
          <p className="small fw-black text-uppercase tracking-[1em] text-primary mb-0">End of Transmission</p>
        </footer>
      </section>
    </div>
  );
};

export default ScrollExperience;