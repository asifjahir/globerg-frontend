import React, { useState } from 'react';
import { RefreshCw, Radio } from 'lucide-react';

export default function App() {
  const [activeChannel, setActiveChannel] = useState('global_intel');

  return (
    <div className="min-h-screen bg-[#030508] text-slate-400 font-mono overflow-hidden selection:bg-red-900/30">
      
      {/* 1. CLEAN HIGH-TECH HEADER */}
      <header className="flex justify-between items-center px-8 py-4 border-b border-white/5">
        <h1 className="text-white text-xl font-black tracking-[0.3em]">GLOBERG</h1>
        <div className="flex gap-8 text-[10px] uppercase tracking-widest text-slate-500">
          <span>NASDAQ: 30,337.5</span>
          <span>USD/INR: 94.3100</span>
          <span>S&P 500: 7,491.6</span>
          <button className="flex items-center gap-2 text-white hover:text-red-500 transition">
            <RefreshCw className="w-3 h-3" /> REFRESH
          </button>
        </div>
      </header>

      {/* 2. DYNAMIC GRID LAYOUT */}
      <main className="p-6 grid grid-cols-12 gap-6 h-[85vh]">
        
        {/* MAP MODULE (Left Large) */}
        <div className="col-span-8 bg-[#06090e] border border-white/5 rounded-sm relative overflow-hidden group">
          <iframe 
            src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d45000000!2d35.0!3d24.0!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e1!3m2!1sen!2sin!4v1718910000000!5m2!1sen!2sin"
            className="w-full h-full grayscale contrast-[1.2] brightness-[0.4] opacity-60"
          />
          <div className="absolute bottom-6 left-6 text-[10px] font-bold text-white uppercase tracking-widest border-l-2 border-red-500 pl-3">
            Tactical Satellite Layer // Active
          </div>
        </div>

        {/* 3. FLOATING VIDEO CONTAINER (Right side but movable) */}
        {/* Is div ko aap CSS grid mein kahi bhi move kar sakte hain */}
        <div className="col-span-4 flex flex-col gap-6">
          <div className="bg-black border border-white/5 h-[300px] relative overflow-hidden">
            <div className="absolute top-2 left-3 z-10 flex items-center gap-2 text-[9px] uppercase tracking-widest text-red-500">
              <Radio className="w-3 h-3 animate-pulse" /> Live Matrix Feed
            </div>
            <iframe
              className="w-full h-full opacity-80 hover:opacity-100 transition-opacity"
              src="https://www.youtube.com/embed/jfKfPfyJRdk?autoplay=1&mute=1&controls=0&modestbranding=1"
              allow="autoplay"
            ></iframe>
          </div>

          {/* BULLETINS SECTION */}
          <div className="bg-[#06090e] border border-white/5 p-6 flex-1">
            <h2 className="text-[10px] text-white uppercase tracking-widest mb-6">Synchronized Bulletins</h2>
            <div className="space-y-4">
              <div className="border-l border-white/10 pl-4">
                <p className="text-[11px] leading-relaxed">Federal Reserve Signposts Extended Rate Stabilization Windows.</p>
                <span className="text-[9px] text-slate-600">3m AGO // SOURCE: DESK</span>
              </div>
            </div>
          </div>
        </div>

      </main>
    </div>
  );
}
