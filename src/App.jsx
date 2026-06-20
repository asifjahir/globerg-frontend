import React from 'react';
import { Shield, Newspaper, BarChart3, Radio, MapPin } from 'lucide-react';

export default function App() {
  return (
    <div className="min-h-screen bg-[#050608] text-slate-300 font-mono p-4 overflow-hidden">
      
      {/* 1. TOP STATUS BAR */}
      <header className="flex justify-between items-center pb-4 border-b border-white/10 mb-4">
        <h1 className="text-white text-xl font-black tracking-[0.3em]">GLOBERG.IO</h1>
        <div className="flex gap-6 text-[10px] uppercase tracking-widest text-slate-500">
          <span>SYSTEM: ONLINE</span>
          <span>LATENCY: 24MS</span>
          <button className="text-red-500 font-bold">REFRESH DATA</button>
        </div>
      </header>

      {/* 2. MAIN DASHBOARD GRID */}
      <div className="grid grid-cols-12 gap-4 h-[85vh]">
        
        {/* LEFT SIDEBAR (Navigation) */}
        <nav className="col-span-2 flex flex-col gap-4">
          {['Overview', 'News Desk', 'Markets', 'Oil Monitor', 'Geopolitics', 'Fraud'].map((item) => (
            <button key={item} className="text-left text-[11px] p-3 bg-white/5 border border-white/5 hover:border-red-500 transition uppercase tracking-widest">
              {item}
            </button>
          ))}
        </nav>

        {/* CENTER PANEL (Map + Stats) */}
        <section className="col-span-7 flex flex-col gap-4">
          {/* Market Ticker (TradingView Widget) */}
          <div className="h-[80px] bg-black border border-white/5 p-1">
             <iframe src="https://s.tradingview.com/embed-widget-ticker-tape/?locale=en&symbols=[{%22proName%22:%22NYMEX:CL1!%22,%22title%22:%22CRUDE%22},{%22proName%22:%22MCX:GC1!%22,%22title%22:%22GOLD%22},{%22proName%22:%22FOREXCOM:NSXUSD%22,%22title%22:%22NASDAQ%22}]&colorTheme=dark" className="w-full h-full border-0"/>
          </div>
          
          {/* Tactical Map */}
          <div className="flex-1 bg-[#0a0d14] border border-white/5 relative flex items-center justify-center">
            <MapPin className="w-12 h-12 text-red-500 opacity-20" />
            <span className="absolute bottom-4 left-4 text-[10px] uppercase">Global Conflict Heatmap // Live Telemetry</span>
          </div>
        </section>

        {/* RIGHT PANEL (News + Live Feed) */}
        <aside className="col-span-3 flex flex-col gap-4">
           {/* Live Feed */}
           <div className="h-[250px] bg-black border border-white/5 p-2 relative">
             <div className="text-[9px] uppercase text-red-500 mb-2 flex items-center gap-2"><Radio className="w-3 h-3 animate-pulse"/> Live Intelligence</div>
             <iframe src="https://www.youtube.com/embed/jfKfPfyJRdk?autoplay=1&mute=1" className="w-full h-full border-0"/>
           </div>
           
           {/* News Desk */}
           <div className="flex-1 bg-[#0a0d14] border border-white/5 p-4 overflow-y-auto">
             <h2 className="text-[10px] uppercase text-white mb-4 border-b border-white/10 pb-2">Intelligence Bulletins</h2>
             <div className="text-[10px] space-y-4 text-slate-500">
               <p>[17:40] Oil prices stabilize after regional intervention.</p>
               <p>[17:35] New fraud pattern detected in logistics sector.</p>
               <p>[17:30] Market fluctuations observed in tech indices.</p>
             </div>
           </div>
        </aside>
      </div>
    </div>
  );
}
