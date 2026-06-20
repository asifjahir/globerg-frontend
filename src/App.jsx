import React, { useState } from 'react';
import { Radio, Shield, Globe, TrendingUp } from 'lucide-react';

export default function GlobergDashboard() {
  // Yeh feeds permission-based hain aur dashboard mein direct load hongi
  const [activeFeed, setActiveFeed] = useState('https://www.youtube.com/embed/jfKfPfyJRdk?autoplay=1&mute=1&playsinline=1');

  return (
    <div className="bg-[#050608] text-slate-300 min-h-screen p-4 font-mono overflow-hidden">
      
      {/* 1. Header with Data */}
      <header className="flex justify-between items-center pb-4 border-b border-white/10">
        <h1 className="text-white text-2xl font-black">GLOBERG</h1>
        <div className="flex gap-8 text-[10px] uppercase">
          <span>CRUDE: $78.42</span>
          <span>GOLD: $2,350.0</span>
          <span>NASDAQ: 17,450.2</span>
        </div>
      </header>

      {/* 2. Main High-Tech Layout */}
      <div className="grid grid-cols-12 gap-4 mt-4 h-[75vh]">
        
        {/* Tactical Map Container (Cleaned) */}
        <div className="col-span-8 bg-[#0a0d14] border border-white/5 rounded-sm p-4 relative">
          <div className="absolute inset-0 flex items-center justify-center opacity-20">
             {/* Map ki jagah yahan hum ek high-tech Grid Map Overlay dikha rahe hain */}
             <div className="w-full h-full border border-slate-800 grid grid-cols-6 grid-rows-6">
                {[...Array(36)].map((_, i) => <div key={i} className="border border-white/5"></div>)}
             </div>
          </div>
          <div className="relative z-10 text-white font-bold tracking-widest text-[11px]">
            TACTICAL SECTOR ANALYSIS // ACTIVE
          </div>
        </div>

        {/* Live Feed Container (Fixed) */}
        <div className="col-span-4 flex flex-col gap-4">
          <div className="bg-black border border-white/10 h-[400px] relative overflow-hidden">
             <div className="absolute top-2 left-2 flex items-center gap-2 text-[9px] uppercase text-red-500">
                <Radio className="w-3 h-3 animate-pulse" /> Live Broadcast
             </div>
             <iframe 
                className="w-full h-full" 
                src={activeFeed} 
                allow="autoplay; encrypted-media"
             />
          </div>
          
          {/* Controls */}
          <div className="grid grid-cols-3 gap-2">
            <button onClick={() => setActiveFeed('https://www.youtube.com/embed/jfKfPfyJRdk?autoplay=1&mute=1')} className="bg-white/5 p-2 text-[9px] uppercase hover:bg-red-900">Al Jazeera</button>
            <button onClick={() => setActiveFeed('https://www.youtube.com/embed/Wmqiqumz_As?autoplay=1&mute=1')} className="bg-white/5 p-2 text-[9px] uppercase hover:bg-red-900">Bloomberg</button>
            <button onClick={() => setActiveFeed('https://www.youtube.com/embed/G6jWnQ-0T9g?autoplay=1&mute=1')} className="bg-white/5 p-2 text-[9px] uppercase hover:bg-red-900">CNN</button>
          </div>
        </div>
      </div>
    </div>
  );
}
