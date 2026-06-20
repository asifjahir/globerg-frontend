import React, { useState } from 'react';
import { Play, TrendingUp, RefreshCw, Radio } from 'lucide-react';

export default function GlobergDashboard() {
  const [activeChannel, setActiveChannel] = useState('https://www.youtube.com/embed/5n9M962U5zA?autoplay=1&mute=1'); // Al Jazeera

  return (
    <div className="bg-[#0b0e14] text-slate-300 min-h-screen p-2 font-mono selection:bg-red-900/50">
      
      {/* 1. TOP Ticker Tape (TradingView) */}
      <div className="h-[40px] w-full bg-[#06090e] border border-white/5 mb-2 overflow-hidden">
        <iframe 
          src="https://s.tradingview.com/embed-widget-ticker-tape/?locale=en#%7B%22symbols%22%3A%5B%7B%22proName%22%3A%22NYMEX%3ACL1!%22%2C%22title%22%3A%22Crude%20Oil%22%7D%2C%7B%22proName%22%3A%22FOREXCOM%3ANSXUSD%22%2C%22title%22%3A%22NASDAQ%22%7D%2C%7B%22proName%22%3A%22FX_IDC%3AUSDINR%22%2C%22title%22%3A%22USD%2FINR%22%7D%5D%2C%22colorTheme%22%3A%22dark%22%2C%22isTransparent%22%3Atrue%2C%22displayMode%22%3A%22adaptive%22%7D" 
          className="w-full h-full border-0"
        />
      </div>

      <header className="flex justify-between items-center px-4 py-2 border-b border-white/5 mb-4">
        <h1 className="text-white text-lg font-black tracking-[0.2em]">GLOBERG</h1>
        <div className="flex gap-4">
          <button onClick={() => setActiveChannel('https://www.youtube.com/embed/5n9M962U5zA?autoplay=1&mute=1')} className="text-[9px] hover:text-white uppercase">Al Jazeera</button>
          <button onClick={() => setActiveChannel('https://www.youtube.com/embed/Wmqiqumz_As?autoplay=1&mute=1')} className="text-[9px] hover:text-white uppercase">Bloomberg</button>
          <button onClick={() => setActiveChannel('https://www.youtube.com/embed/G6jWnQ-0T9g?autoplay=1&mute=1')} className="text-[9px] hover:text-white uppercase">CNN</button>
        </div>
      </header>

      {/* 2. MAIN GRID (Map & Video) */}
      <div className="grid grid-cols-12 gap-4 h-[45vh]">
        <div className="col-span-8 bg-black border border-white/5 rounded-sm relative overflow-hidden">
          <iframe src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d12000000!2d40!3d25!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e1!3m2!1sen!2sin" className="w-full h-full grayscale opacity-50 brightness-50" />
          <div className="absolute top-4 left-4 text-white text-[10px] font-bold tracking-widest uppercase border-l border-red-500 pl-2">Tactical Map // Active</div>
        </div>
        
        <div className="col-span-4 bg-black border border-white/5 relative">
          <div className="absolute top-2 left-2 z-10 bg-black/50 px-2 py-0.5 text-[8px] uppercase text-red-500 flex items-center gap-1">
            <Radio className="w-3 h-3" /> Live Feed
          </div>
          <iframe className="w-full h-full" src={activeChannel} allow="autoplay" />
        </div>
      </div>

      {/* 3. TRADINGVIEW BOTTOM DASHBOARD */}
      <div className="mt-4 h-[30vh] bg-[#06090e] border border-white/5 p-2">
        <div className="flex justify-between items-center mb-2 px-2">
          <span className="text-[10px] font-bold uppercase text-slate-500">Market Analytics // Crude Oil & Indices</span>
          <TrendingUp className="w-4 h-4 text-green-500" />
        </div>
        <iframe 
          src="https://s.tradingview.com/embed-widget-advanced-chart/?locale=en#%7B%22symbol%22%3A%22NYMEX%3ACL1!%22%2C%22interval%22%3A%22D%22%2C%22timezone%22%3A%22Etc%2FUTC%22%2C%22theme%22%3A%22dark%22%2C%22style%22%3A%221%22%2C%22toolbar_bg%22%3A%22%2306090e%22%2C%22hide_top_toolbar%22%3Afalse%2C%22allow_symbol_change%22%3Atrue%2C%22save_image%22%3Afalse%2C%22calendar%22%3Afalse%2C%22hide_volume%22%3Atrue%2C%22support_host%22%3A%22https%3A%2F%2Fwww.tradingview.com%22%7D" 
          className="w-full h-full border-0"
        />
      </div>
    </div>
  );
}
