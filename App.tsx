
import React, { Suspense, useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import ChatInterface from './components/ChatInterface';
import ScrollExperience from './components/ScrollExperience';

const App: React.FC = () => {
  const [showChat, setShowChat] = useState(false);

  useEffect(() => {
    // Add scroll tracking for potential parallax effects if needed in components
    const handleScroll = () => {
      const scrollY = window.scrollY;
      document.documentElement.style.setProperty('--scroll-y', `${scrollY}px`);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="relative min-h-screen bg-gradient-to-b from-[#EEF4FF] via-[#DDE8FF] to-[#A9BFFF] overflow-x-hidden">
      <Navbar onOpenChat={() => setShowChat(true)} />
      
      <main className="w-full relative">
        <Suspense fallback={
          <div className="h-screen w-full flex items-center justify-center">
            <div className="animate-pulse flex flex-col items-center">
              <div className="w-20 h-20 bg-blue-600 rounded-3xl mb-6 shadow-2xl shadow-blue-500/20"></div>
              <p className="text-blue-600 font-black tracking-widest text-xs uppercase">Initializing Universe...</p>
            </div>
          </div>
        }>
          <ScrollExperience />
        </Suspense>
      </main>

      <ChatInterface isOpen={showChat} onClose={() => setShowChat(false)} />
      
      {/* Persistent Cinematic Gradients */}
      <div className="fixed inset-0 pointer-events-none z-50">
        <div className="absolute top-0 w-full h-40 bg-gradient-to-b from-[#EEF4FF] via-[#EEF4FF]/40 to-transparent"></div>
        <div className="absolute bottom-0 w-full h-40 bg-gradient-to-t from-[#A9BFFF] via-[#A9BFFF]/40 to-transparent"></div>
      </div>

      <style>{`
        body {
          background-color: #EEF4FF;
          margin: 0;
          padding: 0;
        }
        * {
          box-sizing: border-box;
        }
      `}</style>
    </div>
  );
};

export default App;
