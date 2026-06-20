import React, { useState, useEffect } from 'react';
import { Shield, Newspaper, Globe, AlertTriangle, RefreshCw, Radio, Terminal, Eye, HeartCrack, Layers } from 'lucide-react';

export default function App() {
  const [news, setNews] = useState([]);
  const [geopolitics, setGeopolitics] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedRegion, setSelectedRegion] = useState('ALL');
  
  // Custom Live Webcams & Streaming Network Feeds that are fully embed-permissive
  const [activeChannel, setActiveChannel] = useState('global_news');
  const channels = {
    global_news: "https://www.youtube.com/embed/NetBCHZ4jN0?autoplay=1&mute=1", // Live Continuous News Feed
    timelapse_sat: "https://www.youtube.com/embed/9wMOfreN6Xg?autoplay=1&mute=1", // International Space Station Earth Feed
    financial_feed: "https://www.youtube.com/embed/coYw-MbcETo?autoplay=1&mute=1" // Tech & Financial News Radar
  };

  const BACKEND_URL = "https://globerg-backend.onrender.com";

  const fetchData = async () => {
    setLoading(true);
    try {
      const newsRes = await fetch(`${BACKEND_URL}/api/news`);
      const newsData = await newsRes.json();
      setNews(newsData);

      const geoRes = await fetch(`${BACKEND_URL}/api/geopolitics`);
      const geoData = await geoRes.json();
      setGeopolitics(geoData);
    } catch (error) {
      console.error("Error connecting with tactical nodes:", error);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchData();
    
    // Financial Tracking Tape Script
    const script = document.createElement('script');
    script.src = 'https://s3.tradingview.com/external-embedding/embed-widget-ticker-tape.js';
    script.async = true;
    script.innerHTML = JSON.stringify({
      "symbols": [
        { "proName": "FOREXCOM:SPXUSD", "title": "S&P 500" },
        { "proName": "FOREXCOM:NSXUSD", "title": "NASDAQ" },
        { "proName": "FX_IDC:USDINR", "title": "USD/INR" },
        { "proName": "COMEX:GC1!", "title": "GOLD" },
        { "proName": "NYMEX:CL1!", "title": "CRUDE OIL" }
      ],
      "showSymbolLogo": false,
      "colorTheme": "dark",
      "isTransparent": true,
      "displayMode": "adaptive",
      "locale": "en"
    });
    const container = document.getElementById('tv-tape');
    if (container) container.appendChild(script);

    return () => { if (container) container.innerHTML = ''; };
  }, []);

  // Filter systems on click events
  const filteredGeo = selectedRegion === 'ALL' ? geopolitics : geopolitics.filter(g => g.region === selectedRegion);
  const filteredNews = selectedRegion === 'ALL' ? news : news.filter(n => n.category.toUpperCase() === selectedRegion || (selectedRegion === 'MIDDLE EAST' && n.category.toUpperCase() === 'FINANCE'));

  return (
    <div className="min-h-screen bg-[#06090e] text-slate-300 font-mono text-[11px] flex flex-col antialiased select-none">
      
      {/* Realtime Terminal Control Strip */}
      <div className="w-full bg-[#0a0e14] border-b border-slate-800 px-4 py-2 flex flex-wrap justify-between items-center gap-2 z-20">
        <div className="flex items-center gap-3">
          <Shield className="w-5 h-5 text-red-500 animate-pulse" />
          <span className="font-sans font-black tracking-widest text-white text-sm">GLOBERG // OPERATIONS DESK</span>
          <div className="flex gap-1">
            <span className="bg-red-950/80 text-red-400 border border-red-900/60 px-1.5 py-0.5 text-[9px] font-bold tracking-wider animate-pulse">SITUATIONAL CRISIS MODE</span>
            {selectedRegion !== 'ALL' && (
              <button onClick={() => setSelectedRegion('ALL')} className="bg-blue-950 text-blue-400 border border-blue-900 px-1.5 py-0.5 text-[9px] font-bold uppercase hover:bg-blue-900 transition">
                RESET FILTER [X]
              </button>
            )}
          </div>
        </div>
        <div id="tv-tape" className="flex-1 max-w-xl mx-4 hidden lg:block"></div>
        <button onClick={fetchData} className="flex items-center gap-1.5 bg-slate-900 border border-slate-700/80 hover:bg-slate-800 px-2 py-1 rounded text-slate-200 transition">
          <RefreshCw className={`w-3 h-3 ${loading ? 'animate-spin' : ''}`} />
          <span>REFRESH MATRIX</span>
        </button>
      </div>

      {loading ? (
        <div className="flex-1 flex flex-col items-center justify-center gap-2">
          <Terminal className="w-6 h-6 text-red-500 animate-bounce" />
          <span className="tracking-widest text-slate-500 text-[10px]">SYNCING WITH STRATEGIC BACKEND INTELLIGENCE...</span>
        </div>
      ) : (
        /* War Room Workspace Grid */
        <div className="flex-1 grid grid-cols-1 xl:grid-cols-12 gap-2 p-2 overflow-hidden">
          
          {/* LEFT INTERACTIVE MODULE: Hotspot Vector Canvas Simulation (xl:col-span-7) */}
          <div className="xl:col-span-7 flex flex-col gap-2 min-h-[500px]">
            <div className="bg-[#0a0e14] border border-slate-800 rounded p-2 flex justify-between items-center">
              <div className="flex items-center gap-2">
                <Layers className="w-4 h-4 text-red-500" />
                <span className="text-slate-200 font-bold tracking-wider uppercase text-[10px]">Tactical Radar Filter Layer (CLICK REGIONS)</span>
              </div>
              <span className="text-slate-500 text-[10px]">ACTIVE FILTER: {selectedRegion}</span>
            </div>

            {/* Simulated Interactive World Vector Hotspots Grid */}
            <div className="flex-1 bg-[#090c12] border border-slate-800 rounded relative overflow-hidden flex flex-col justify-between p-4 bg-grid-pattern">
              <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[#05070a]/90 pointer-events-none"></div>
              
              {/* Tactical Simulation Banner */}
              <div className="z-10 flex justify-between items-start">
                <div className="bg-slate-950/95 border border-slate-800 p-2 rounded max-w-xs shadow-2xl">
                  <span className="text-red-500 font-bold block mb-1">🔴 CRITICAL CHOKEPOINTS IDENTIFIED</span>
                  <p className="text-[10px] text-slate-400 leading-normal">Click on any blinking strategic sector alert card below to filter real-time telemetry feeds instantaneously.</p>
                </div>
                <div className="text-right text-slate-500 text-[9px] space-y-0.5">
                  <div>LATENCY: 14ms // FEED STATUS: NOMINAL</div>
                  <div>SECURITY_PROTOCOL: HIGH_ENCRYPT</div>
                </div>
              </div>

              {/* Dynamic Map Clickable Target Nodes Layout */}
              <div className="z-10 grid grid-cols-1 sm:grid-cols-3 gap-3 my-auto pt-6">
                
                {/* Target Node 1: Middle East */}
                <div 
                  onClick={() => setSelectedRegion('MIDDLE EAST')}
                  className={`border p-3 rounded cursor-pointer transition transform active:scale-95 ${selectedRegion === 'MIDDLE EAST' ? 'bg-red-950/40 border-red-500 shadow-lg shadow-red-500/10' : 'bg-[#0e1422]/90 border-slate-800 hover:border-red-500/60'}`}
                >
                  <div className="flex justify-between items-center mb-1.5">
                    <span className="font-bold text-red-400 tracking-wider">📍 MIDDLE EAST</span>
                    <span className="w-2 'h-2 bg-red-500 rounded-full animate-ping"></span>
                  </div>
                  <div className="text-[10px] text-slate-400 font-sans mb-1">Strait of Hormuz Alert</div>
                  <div className="text-[9px] text-red-500 font-bold uppercase tracking-widest">HIGH THREAT INCIDENT</div>
                </div>

                {/* Target Node 2: Europe News Node */}
                <div 
                  onClick={() => setSelectedRegion('EUROPE')}
                  className={`border p-3 rounded cursor-pointer transition transform active:scale-95 ${selectedRegion === 'EUROPE' ? 'bg-blue-950/40 border-blue-500 shadow-lg shadow-blue-500/10' : 'bg-[#0e1422]/90 border-slate-800 hover:border-blue-500/60'}`}
                >
                  <div className="flex justify-between items-center mb-1.5">
                    <span className="font-bold text-blue-400 tracking-wider">📍 EUROPEAN NODE</span>
                    <span className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></span>
                  </div>
                  <div className="text-[10px] text-slate-400 font-sans mb-1">Logistics Matrix Analytics</div>
                  <div className="text-[9px] text-blue-400 font-bold uppercase tracking-widest">MONITORING SYSTEM</div>
                </div>

                {/* Target Node 3: Global Reset */}
                <div 
                  onClick={() => setSelectedRegion('ALL')}
                  className={`border p-3 rounded cursor-pointer transition transform active:scale-95 ${selectedRegion === 'ALL' ? 'bg-slate-900 border-slate-400' : 'bg-[#0e1422]/90 border-slate-800 hover:border-slate-500'}`}
                >
                  <div className="flex justify-between items-center mb-1.5">
                    <span className="font-bold text-slate-300 tracking-wider">🌐 ALL TARGETS</span>
                    <Eye className="w-3.5 h-3.5 text-slate-400" />
                  </div>
                  <div className="text-[10px] text-slate-400 font-sans mb-1">Clear active region parameter</div>
                  <div className="text-[9px] text-slate-500 font-bold uppercase tracking-widest">FULL MONITOR VIEW</div>
                </div>

              </div>

              {/* Decorative Terminal Line Metrics */}
              <div className="z-10 border-t border-slate-800/80 pt-2 flex justify-between text-[10px] text-slate-500">
                <span>SECTOR RANGE: GLOBAL_MATRIX_OVERLAY</span>
                <span>GRID ORIENTATION: TRANSVERSE_MERCATOR</span>
              </div>
            </div>
          </div>

          {/* RIGHT CONTROL COLUMN: News Feed Deck & Broadcast Array (xl:col-span-5) */}
          <div className="xl:col-span-5 flex flex-col gap-2 overflow-y-auto max-h-[82vh] pr-1">
            
            {/* Live Operational Broadcast Desk Module */}
            <div className="bg-[#0a0e14] border border-slate-800 rounded flex flex-col overflow-hidden">
              <div className="border-b border-slate-800 px-3 py-2 flex flex-wrap justify-between items-center bg-[#0e131b]">
                <span className="text-slate-200 font-bold flex items-center gap-1.5 uppercase tracking-wider text-[10px]">
                  <Radio className="w-3.5 h-3.5 text-red-500 animate-pulse" /> Permissive Broadcast Relay Array
                </span>
                <div className="flex gap-1 mt-1 sm:mt-0">
                  {Object.keys(channels).map((ch) => (
                    <button 
                      key={ch} 
                      onClick={() => setActiveChannel(ch)}
                      className={`px-2 py-0.5 rounded text-[9px] font-bold uppercase transition border ${activeChannel === ch ? 'bg-red-950 text-red-400 border-red-900' : 'bg-slate-900 border-slate-800 text-slate-500 hover:text-slate-300'}`}
                    >
                      {ch.replace('_', ' ')}
                    </button>
                  ))}
                </div>
              </div>
              
              <div className="w-full aspect-video bg-black relative">
                <iframe
                  className="w-full h-full border-0 absolute top-0 left-0"
                  src={channels[activeChannel]}
                  title="Live Strategic Video Link"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              </div>
            </div>

            {/* Split Screen Synchronized Telemetry Tables */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
              
              {/* Terminal Bulletins Column */}
              <div className="bg-[#0a0e14] border border-slate-800 rounded p-2 flex flex-col">
                <div className="border-b border-slate-800 pb-1.5 mb-2 flex items-center gap-1.5">
                  <Newspaper className="w-3.5 h-3.5 text-blue-400" />
                  <span className="font-bold uppercase tracking-wider text-slate-400 text-[10px]">Synchronized Bulletins</span>
                </div>
                <div className="space-y-2 max-h-[250px] overflow-y-auto pr-1">
                  {filteredNews.length === 0 ? (
                    <div className="text-slate-600 text-center py-4">NO ACTIVE NEWS AT NODE</div>
                  ) : (
                    filteredNews.map((item) => (
                      <div key={item.id} className="bg-[#0e1422]/60 border border-slate-800/80 p-2.5 rounded hover:border-slate-700 transition">
                        <div className="flex justify-between items-center text-[9px] text-slate-500 mb-1">
                          <span className="text-blue-400 font-bold uppercase">{item.category}</span>
                          <span>{item.timestamp}</span>
                        </div>
                        <h4 className="text-slate-300 font-medium leading-normal text-[11px] mb-1">{item.title}</h4>
                        <p className="text-[10px] text-slate-500">SOURCE: {item.source}</p>
                      </div>
                    ))
                  )}
                </div>
              </div>

              {/* Risk Management Analytics Column */}
              <div className="bg-[#0a0e14] border border-slate-800 rounded p-2 flex flex-col">
                <div className="border-b border-slate-800 pb-1.5 mb-2 flex items-center gap-1.5">
                  <AlertTriangle className="w-3.5 h-3.5 text-amber-500" />
                  <span className="font-bold uppercase tracking-wider text-slate-400 text-[10px]">Risk Radar Grid</span>
                </div>
                <div className="space-y-2 max-h-[250px] overflow-y-auto pr-1">
                  {filteredGeo.length === 0 ? (
                    <div className="text-slate-600 text-center py-4">NO SEGMENT THREAT MATRIX</div>
                  ) : (
                    filteredGeo.map((geo) => (
                      <div key={geo.id} className="bg-[#141110]/80 border border-amber-900/30 p-2.5 rounded relative overflow-hidden">
                        <div className="absolute top-0 left-0 w-[1.5px] h-full bg-amber-500"></div>
                        <div className="flex justify-between items-center text-[9px] mb-1">
                          <span className="text-amber-400 font-bold">📍 {geo.region}</span>
                          <span className="text-red-500 bg-red-950/40 px-1.5 py-0.2 rounded border border-red-900/40 font-bold text-[9px] uppercase">{geo.risk} RISK</span>
                        </div>
                        <h4 className="text-slate-200 font-bold text-[10px] uppercase mb-1">{geo.title}</h4>
                        <p className="text-[11px] text-slate-400 leading-relaxed mb-1.5">{geo.summary}</p>
                        <div className="text-[9px] text-slate-500 border-t border-slate-800/40 pt-1 flex justify-between font-sans">
                          <span>LAT:{geo.lat} // LNG:{geo.lng}</span>
                          <span>{geo.timestamp}</span>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>

            </div>

          </div>

        </div>
      )}
    </div>
  );
}
