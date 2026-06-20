import React from 'react';
import Sidebar from './components/Sidebar';
import KPIHeader from './components/KPIHeader';
import MapComponent from './components/MapComponent';
import NewsEngine from './components/NewsEngine';
import TradingWidget from './components/TradingWidget';
import LiveBroadcast from './components/LiveBroadcast';

export default function App() {
  return (
    <div className="flex h-screen bg-[#050608] text-slate-300 font-mono overflow-hidden">
      <Sidebar />

      <main className="flex-1 flex flex-col overflow-hidden">

        {/* Top KPI ticker */}
        <KPIHeader />

        {/* Main content area */}
        <div className="flex flex-1 overflow-hidden">

          {/* LEFT: Map takes full left panel */}
          <div className="flex flex-col flex-1 overflow-hidden">

            {/* Map Panel */}
            <div className="flex-1 border border-white/10 bg-[#0a0d14] relative">
              <div className="absolute top-3 left-3 z-[1000] text-[10px] tracking-widest text-slate-400">
                TACTICAL SECTOR ANALYSIS // ACTIVE
              </div>
              <MapComponent />
            </div>

            {/* Bottom: Trading Widget */}
            <div className="h-[200px] border-t border-white/10">
              <TradingWidget />
            </div>

          </div>

          {/* RIGHT: Live Broadcast + News stacked */}
          <div className="w-[380px] flex flex-col border-l border-white/10">

            {/* Live Broadcast Player */}
            <div className="h-[320px] border-b border-white/10 bg-[#0a0d14]">
              <LiveBroadcast />
            </div>

            {/* News Engine fills the rest */}
            <div className="flex-1 overflow-y-auto bg-[#0a0d14]">
              <NewsEngine />
            </div>

          </div>

        </div>
      </main>
    </div>
  );
}
