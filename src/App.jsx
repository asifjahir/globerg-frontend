import React, { useState, useEffect } from 'react';
import { Shield, Newspaper, Globe, AlertTriangle, RefreshCw, Radio, Terminal, Grid, Activity, BarChart2 } from 'lucide-react';

export default function App() {
  const [news, setNews] = useState([]);
  const [geopolitics, setGeopolitics] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeChannel, setActiveChannel] = useState('bloomberg');

  const BACKEND_URL = "https://globerg-backend.onrender.com";

  // Live Streams Mapping
  const channels = {
    bloomberg: "https://www.youtube.com/embed/dp8PhLsUcFE?autoplay=1&mute=1", // Bloomberg Global Live
    skynews: "https://www.youtube.com/embed/9AuqeyvFioY?autoplay=1&mute=1",   // Sky News Live
    dw: "https://www.youtube.com/embed/v79itvYvGf4?autoplay=1&mute=1"         // DW News Live
  };

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
      console.error("Error fetching intel:", error);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchData();
    
    // TradingView Market Ticker Tape Integration
    const script = document.createElement('script');
    script.src = 'https://s3.tradingview.com/external-embedding/embed-widget-ticker-tape.js';
    script.async = true;
    script.innerHTML = JSON.stringify({
      "symbols": [
        { "proName": "FOREXCOM:SPXUSD", "title": "S&P 500" },
        { "proName": "FOREXCOM:NSXUSD", "title": "NASDAQ" },
        { "proName": "FX_IDC:USDINR", "title": "USD/INR" },
        { "proName": "COMEX:GC1!", "title": "GOLD" },
        { "proName": "NYMEX:CL1!", "title": "CRUDE OIL" },
        { "proName": "BITSTAMP:BTCUSD", "title": "BITCOIN" }
      ],
      "showSymbolLogo": false,
      "colorTheme": "dark",
      "isTransparent": true,
      "displayMode": "adaptive",
      "locale": "en"
    });
    const container = document.getElementById('tv-ticker');
    if (container) container.appendChild(script);

    return () => { if (container) container.innerHTML = ''; };
  }, []);

  return (
    <div className="min-h-screen bg-[#070a0f] text-slate-200 font-mono text-xs flex flex-col antialiased selection:bg-blue-500/30 selection:text-white">
      
      {/* Top Header Controls */}
      <div className="w-full bg-[#0b0f17] border-b border-slate-800/80 px-4 py-2 flex justify-between items-center z-10">
        <div className="flex items-center gap-3">
          <Shield className="w-5 h-5 text-blue-500 animate-pulse" />
          <span className="font-sans font-black tracking-[0.2em] text-white text-sm">GLOBERG // MONITOR v2.1</span>
          <span className="bg-red-950/60 border border-red-950 text-red-500 px-1.5 py-0.5 text-[10px] uppercase font-bold tracking-wider animate-pulse">DEFCON 3</span>
        </div>
        <div id="tv-ticker" className="flex-1 max-w-2xl mx-4 hidden md:block"></div>
        <button onClick={fetchData} className="flex items-center gap-1.5 bg-slate-900 border border-slate-700/60 hover:bg-slate-800 px-2 py-1 rounded text-slate-300 transition">
          <RefreshCw className={`w-3 h-3 ${loading ? 'animate-spin' : ''}`} />
          <span>SYNC FEED</span>
        </button>
      </div>

      {loading ? (
        <div className="flex-1 flex flex-col items-center justify-center gap-3 bg-[#070a0f]">
          <Activity className="w-8 h-8 text-blue-500 animate-spin" />
          <span className="tracking-[0.3em] text-slate-400 text-[10px]">INITIALIZING COMMS PROTOCOL...</span>
        </div>
      ) : (
        /* Ultimate Multi-Grid Matrix Layout */
        <div className="flex-1 grid grid-cols-1 xl:grid-cols-12 gap-2 p-2 overflow-hidden h-full">
          
          {/* LEFT AREA: Global Map Layer (xl:col-span-7) */}
          <div className="xl:col-span-7 flex flex-col gap-2 min-h-[500px]">
            <div className="bg-[#0b0f17] border border-slate-800/80 rounded p-2 flex items-center justify-between">
              <span className="text-slate-400 font-bold flex items-center gap-1.5 uppercase tracking-wider text-[11px]">
                <Globe className="w-3.5 h-3.5 text-blue-400" /> Situational Global Overlay Matrix
              </span>
              <span className="text-[10px] text-slate-500">SYSTEM STATUS: OPERATIONAL</span>
            </div>
            
            <div className="flex-1 bg-[#090d14] border border-slate-800/60 rounded relative overflow-hidden group min-h-[450px]">
              {/* Dark Military Tactical Vector Styled Map */}
              <iframe 
                title="Tactical Cyber Map"
                src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d45000000!2d20.0!3d15.0!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e1!3m2!1sen!2sin!4v1718910000000!5m2!1sen!2sin" 
                className="w-full h-full grayscale opacity-70 invert contrast-[1.4] brightness-[0.7] absolute inset-0" 
                allowFullScreen="" 
                loading="lazy"
              ></iframe>
              {/* Map UI Borders / Crosshairs Decoration */}
              <div className="absolute top-4 left-4 bg-slate-950/90 border border-slate-800 px-2 py-1 rounded text-[10px] text-blue-400 pointer-events-none flex items-center gap-1.5 shadow-xl">
                <span className="w-1.5 h-1.5 bg-red-500 rounded-full animate-ping"></span>
                RADAR: ONLINE // SCANNING CHOKEPOINTS
              </div>
            </div>
          </div>

          {/* RIGHT AREA: Control Room, Live Video Streams & Intel (xl:col-span-5) */}
          <div className="xl:col-span-5 flex flex-col gap-2 overflow-y-auto max-h-[85vh] pr-1">
            
            {/* BOX 1: High-Tech Broadcast Player */}
            <div className="bg-[#0b0f17] border border-slate-800/80 rounded flex flex-col overflow-hidden">
              <div className="border-b border-slate-800/80 px-3 py-2 flex justify-between items-center bg-[#0d121c]">
                <span className="text-slate-300 font-bold flex items-center gap-1.5 uppercase tracking-wider text-[11px]">
                  <Radio className="w-3.5 h-3.5 text-red-500 animate-pulse" /> Live Intel Broadcast Desk
                </span>
                {/* Channel Selector Chips */}
                <div className="flex gap-1">
                  {Object.keys(channels).map((ch) => (
                    <button 
                      key={ch} 
                      onClick={() => setActiveChannel(ch)} 
                      className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase transition border ${activeChannel === ch ? 'bg-red-950/60 border-red-800 text-red-400' : 'bg-slate-900 border-slate-800 text-slate-500 hover:text-slate-300'}`}
                    >
                      {ch}
                    </button>
                  ))}
                </div>
              </div>
              
              {/* Responsive Iframe Video Wrapper */}
              <div className="w-full aspect-video bg-black relative">
                <iframe
                  className="w-full h-full border-0 absolute top-0 left-0"
                  src={channels[activeChannel]}
                  title="Live News Channel Feed"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                ></iframe>
              </div>
            </div>

            {/* BOX 2: Split Layout Intel Feeds */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
              
              {/* Intel Bulletins Column */}
              <div className="bg-[#0b0f17] border border-slate-800/80 rounded p-2 flex flex-col">
                <div className="border-b border-slate-800/60 pb-1.5 mb-2 flex items-center gap-1.5">
                  <Newspaper className="w-3.5 h-3.5 text-blue-400" />
                  <span className="font-bold uppercase tracking-wider text-slate-400 text-[10px]">Terminal Bulletins</span>
                </div>
                <div className="space-y-2 max-h-[260px] overflow-y-auto pr-1">
                  {news.map((item) => (
                    <div key={item.id} className="bg-[#0e1420]/70 border border-slate-800/60 p-2.5 rounded hover:border-slate-700 transition">
                      <div className="flex justify-between items-center text-[10px] text-slate-500 mb-1">
                        <span className="text-blue-400 font-bold uppercase font-mono">{item.category}</span>
                        <span>{item.timestamp}</span>
                      </div>
                      <h4 className="text-slate-300 font-medium leading-normal text-[11px] mb-1">{item.title}</h4>
                      <p className="text-[10px] text-slate-500 font-mono">SRC: {item.source}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Threat Matrix Vectors Column */}
              <div className="bg-[#0b0f17] border border-slate-800/80 rounded p-2 flex flex-col">
                <div className="border-b border-slate-800/60 pb-1.5 mb-2 flex items-center gap-1.5">
                  <Terminal className="w-3.5 h-3.5 text-amber-400" />
                  <span className="font-bold uppercase tracking-wider text-slate-400 text-[10px]">Risk Analytics Matrix</span>
                </div>
                <div className="space-y-2 max-h-[260px] overflow-y-auto pr-1">
                  {geopolitics.map((geo) => (
                    <div key={geo.id} className="bg-[#13100f]/60 border border-amber-900/20 p-2.5 rounded relative overflow-hidden">
                      <div className="absolute top-0 left-0 w-[1.5px] h-full bg-amber-600/50"></div>
                      <div className="flex justify-between items-center text-[10px] mb-1">
                        <span className="text-amber-400 font-bold tracking-wide font-mono">📍 {geo.region}</span>
                        <span className="text-red-500 bg-red-950/40 px-1 py-0.2 rounded border border-red-900/40 font-bold text-[9px]">{geo.risk} RISK</span>
                      </div>
                      <h4 className="text-slate-300 font-bold font-mono text-[10px] uppercase mb-1">{geo.title}</h4>
                      <p className="text-[11px] text-slate-400 leading-snug mb-2">{geo.summary}</p>
                      <div className="text-[9px] text-slate-500 font-mono flex justify-between border-t border-slate-800/40 pt-1">
                        <span>LAT:{geo.lat} // LNG:{geo.lng}</span>
                        <span>{geo.timestamp}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

            </div>

          </div>

        </div>
      )}
    </div>
  );
}
