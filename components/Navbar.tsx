
import React from 'react';

interface NavbarProps {
  onOpenChat: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ onOpenChat }) => {
  return (
    <nav className="fixed top-0 left-0 w-full z-50 flex justify-center p-6">
      <div className="max-w-7xl w-full bg-white/40 backdrop-blur-xl border border-white/40 rounded-3xl px-8 py-4 flex items-center justify-between shadow-sm">
        <div className="flex items-center gap-2 group cursor-pointer">
          <div className="w-10 h-10 bg-blue-600 rounded-2xl flex items-center justify-center transform group-hover:rotate-12 transition-transform duration-300">
             <div className="w-2 h-2 bg-white rounded-full"></div>
          </div>
          <span className="text-2xl font-black text-blue-900 tracking-tighter">GOGO</span>
        </div>

        <div className="hidden md:flex items-center gap-10">
          <a href="#" className="text-sm font-semibold text-blue-900/70 hover:text-blue-900 transition-colors">Experience</a>
          <a href="#" className="text-sm font-semibold text-blue-900/70 hover:text-blue-900 transition-colors">World</a>
          <a href="#" className="text-sm font-semibold text-blue-900/70 hover:text-blue-900 transition-colors">Collectibles</a>
          <a href="#" className="text-sm font-semibold text-blue-900/70 hover:text-blue-900 transition-colors">Community</a>
        </div>

        <div className="flex items-center gap-4">
          <button 
            onClick={onOpenChat}
            className="px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-full text-sm font-bold shadow-lg shadow-blue-500/20 transform active:scale-95 transition-all"
          >
            Talk to GOGO
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
