import React, { useState } from 'react';

export default function GlobergDashboard() {
  const [activeChannel, setActiveChannel] = useState('https://www.youtube.com/embed/jfKfPfyJRdk?autoplay=1&mute=1');

  return (
    <div className="bg-[#0b0e14] text-slate-300 min-h-screen p-2 font-mono flex flex-col gap-2">
      
      {/* HEADER */}
      <header className="flex justify-between items-center px-4 py-2 border-b border-white/10 bg-[#06090e]">
        <h1 className="text-white text-lg font-black tracking-[0.2em]">GLOBERG</h1>
        <div className="flex gap-4">
          <button onClick={() => setActiveChannel('https://www.youtube.com/embed/jfKfPfyJRdk?autoplay=1&mute=1')} className="text-[9px] hover:text-white uppercase">Al Jazeera</button>
          <button onClick={() => setActiveChannel('https://www.youtube.com/embed/Wmqiqumz_As?autoplay=1&mute=1')} className="text-[9px] hover:text-white uppercase">Bloomberg</button>
          <button onClick={() => window.open('https://tradingeconomics.com/commodity/crude-oil', '_blank')} className="text-[9px] hover:text-white uppercase text-blue-400">CRUDE DATA</button>
        </div>
      </header>

      {/* GRID */}
      <div className="grid grid-cols-12 gap-2 flex-1">
        <div className="col-span-8 bg-black border border-white/5 relative h-[50vh]">
          <iframe 
            src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d12000000!2d40!3d25!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e1!3m2!1sen!2sin" 
            className="w-full h-full grayscale opacity-50 brightness-50"
          />
        </div>
        <div className="col-span-4 bg-black border border-white/5 relative h-[50vh]">
          <iframe className="w-full h-full" src={activeChannel} allow="autoplay" allowFullScreen />
        </div>
      </div>

      {/* DUAL MARKET ANALYTICS DASHBOARD */}
      <div className="grid grid-cols-2 gap-2 h-[30vh]">
        {/* CRUDE OIL WIDGET */}
        <div className="bg-[#06090e] border border-white/5 p-2">
           <div className="text-[9px] mb-1 uppercase text-slate-500">Crude Oil (NYMEX)</div>
           <iframe src="https://s.tradingview.com/widgetembed/?symbol=NYMEX:CL1!&theme=dark&style=1&hide_volume=1" className="w-full h-full border-0" />
        </div>
        {/* GOLD WIDGET */}
        <div className="bg-[#06090e] border border-white/5 p-2">
           <div className="text-[9px] mb-1 uppercase text-slate-500">Gold Futures (MCX)</div>
           <iframe src="https://s.tradingview.com/widgetembed/?symbol=MCX:GC1!&theme=dark&style=1&hide_volume=1" className="w-full h-full border-0" />
        </div>
      </div>
    </div>
  );
}
