import React, { useState, useEffect } from 'react';
import { Shield, Newspaper, Globe, AlertTriangle, RefreshCw, Radio, Terminal, Eye, Layers } from 'lucide-react';

export default function App() {
  const [news, setNews] = useState([]);
  const [geopolitics, setGeopolitics] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedRegion, setSelectedRegion] = useState('ALL');
  const [activeChannel, setActiveChannel] = useState('global_intel');

  // Fully unrestricted web players - no youtube blocks
  const channels = {
    global_intel: "https://www.ustream.tv/embed/17074538?html5=1&autoplay=1&mute=1", // Live Space/Earth Telemetry Desk
    live_radar: "https://www.rainviewer.com/map.html?loc=23.3642,57.4805,4&o=1&c=3&o=1&g=1&s=1&v=0", // Live Cyber Weather & Satellite Grid Tracker
    naval_feed: "https://www.marinetraffic.com/en/ais/embed/zoom:4/centery:25/centerx:55/maptype:3/shownames:false/mmsi:0/shipid:0/fleet:/fleet_id:/vessel:0/container:true/show_track:false" // Direct Live Persian Gulf / Strait of Hormuz naval traffic radar
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
      console.error("Connection error:", error);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchData();
    
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

  const filteredGeo = selectedRegion === 'ALL' ? geopolitics : geopolitics.filter(g => g.region === selectedRegion);
  const filteredNews = selectedRegion === 'ALL' ? news : news.filter(n => n.category.toUpperCase() === selectedRegion || (selectedRegion === 'MIDDLE EAST' && n.category.toUpperCase() === 'FINANCE'));

  return (
    <div className="min-h-screen bg-[#06090e] text-slate-300 font-mono text-[11px] flex flex-col antialiased select-none">
      
      {/* Realtime Terminal Control Strip */}
      <div className="w-full bg-[#0a0e14] border-b border-slate-800 px-4 py-2 flex flex-wrap justify-between items-center gap-2 z-20">
        <div className="flex items-center gap-3">
          <Shield className="w-5 h-5 text-red-500 animate-pulse" />
          <span className="font-sans font-black tracking-[0.15em] text-white text-base">GLOBERG</span>
          <div className="flex gap-1">
            <span className="bg-red-950/80 text-red-400 border border-red-900/60 px-1.5 py-0.5 text-[9px] font-bold tracking-wider animate-pulse font-mono">LIVE OPERATIONS DESK</span>
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
          <RefreshCw className="w-6 h-6 text-red-500 animate-spin" />
          <span className="tracking-widest text-slate-500 text-[10px]">SYNCING STRATEGIC PROTOCOLS...</span>
        </div>
      ) : (
        <div className="flex-1 grid grid-cols-1 xl:grid-cols-12 gap-2 p-2 overflow-hidden">
          
          {/* LEFT INTERACTIVE DARK MAP MODULE */}
          <div className="xl:col-span-7 flex flex-col gap-2 min-h-[550px]">
            <div className="bg-[#0a0e14] border border-slate-800 rounded p-2 flex justify-between items-center">
              <div className="flex items-center gap-2">
                <Layers className="w-4 h-4 text-red-500" />
                <span className="text-slate-200 font-bold tracking-wider uppercase text-[10px]">Interactive Tactical Satellite Map Layer</span>
              </div>
              <span className="text-slate-500 text-[10px]">ACTIVE TARGET: {selectedRegion}</span>
            </div>

            <div className="flex-1 bg-[#090c12] border border-slate-800 rounded relative overflow-hidden flex flex-col justify-between">
              
              {/* Actual Fully Operational Dark-Themed Matrix Map Interface */}
              <iframe 
                title="Tactical Strategic Map"
                src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d45000000!2d35.0!3d24.0!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e1!3m2!1sen!2sin!4v1718910000000!5m2!1sen!2sin" 
                className="absolute inset-0 w-full h-full grayscale opacity-40 invert contrast-[1.6] brightness-[0.5] pointer-events-auto"
                allowFullScreen="" 
                loading="lazy"
              ></iframe>

              {/* Floating Dashboard Quick Filter Controls over the Map */}
              <div className="z-10 grid grid-cols-1 sm:grid-cols-3 gap-2 p-3 mt-auto bg-gradient-to-t from-[#06090e] via-[#06090e]/80 to-transparent pt-12">
                <div 
                  onClick={() => setSelectedRegion('MIDDLE EAST')}
                  className={`border p-2.5 rounded cursor-pointer backdrop-blur-sm transition transform active:scale-95 ${selectedRegion === 'MIDDLE EAST' ? 'bg-red-950/70 border-red-500 shadow-lg shadow-red-500/20' : 'bg-[#0a0e14]/90 border-slate-800 hover:border-red-500/60'}`}
                >
                  <div className="flex justify-between items-center mb-1">
                    <span className="font-bold text-red-400 tracking-wider">📍 MIDDLE EAST NODE</span>
                    <span className="w-2 h-2 bg-red-500 rounded-full animate-ping"></span>
                  </div>
                  <div className="text-[10px] text-slate-400">Filter Strait of Hormuz Intel</div>
                </div>

                <div 
                  onClick={() => setSelectedRegion('EUROPE')}
                  className={`border p-2.5 rounded cursor-pointer backdrop-blur-sm transition transform active:scale-95 ${selectedRegion === 'EUROPE' ? 'bg-blue-950/70 border-blue-500 shadow-lg shadow-blue-500/20' : 'bg-[#0a0e14]/90 border-slate-800 hover:border-blue-500/60'}`}
                >
                  <div className="flex justify-between items-center mb-1">
                    <span className="font-bold text-blue-400 tracking-wider">📍 EUROPEAN NODE</span>
                    <span className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></span>
                  </div>
                  <div className="text-[10px] text-slate-400">Filter Logistics Telemetry</div>
                </div>

                <div 
                  onClick={() => setSelectedRegion('ALL')}
                  className={`border p-2.5 rounded cursor-pointer backdrop-blur-sm transition transform active:scale-95 ${selectedRegion === 'ALL' ? 'bg-slate-900/90 border-slate-400' : 'bg-[#0a0e14]/90 border-slate-800 hover:border-slate-500'}`}
                >
                  <div className="flex justify-between items-center mb-1">
                    <span className="font-bold text-slate-300 tracking-wider">🌐 GLOBAL COMBINED</span>
                    <Eye className="w-3.5 h-3.5 text-slate-400" />
                  </div>
                  <div className="text-[10px] text-slate-400">Show Full Global Monitor</div>
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN: Video Streams & Text Analytics */}
          <div className="xl:col-span-5 flex flex-col gap-2 overflow-y-auto max-h-[82vh] pr-1">
            
            {/* Unrestricted Embed-Friendly Stream Desk */}
            <div className="bg-[#0a0e14] border border-slate-800 rounded flex flex-col overflow-hidden">
              <div className="border-b border-slate-800 px-3 py-2 flex flex-wrap justify-between items-center bg-[#0e131b]">
                <span className="text-slate-200 font-bold flex items-center gap-1.5 uppercase tracking-wider text-[10px]">
                  <Radio className="w-3.5 h-3.5 text-red-500 animate-pulse" /> LIVE STREAM MATRICES (BYPASS)
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
                  className="w-full h-full border-0 absolute top-0 left-0 bg-slate-950"
                  src={channels[activeChannel]}
                  title="Unrestricted Strategic Link"
                  allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              </div>
            </div>

            {/* Split Tables */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
              <div className="bg-[#0a0e14] border border-slate-800 rounded p-2 flex flex-col">
                <div className="border-b border-slate-800 pb-1.5 mb-2 flex items-center gap-1.5">
                  <Newspaper className="w-3.5 h-3.5 text-blue-400" />
                  <span className="font-bold uppercase tracking-wider text-slate-400 text-[10px]">Synchronized Bulletins</span>
                </div>
                <div className="space-y-2 max-h-[250px] overflow-y-auto pr-1">
                  {filteredNews.map((item) => (
                    <div key={item.id} className="bg-[#0e1422]/60 border border-slate-800/80 p-2.5 rounded">
                      <div className="flex justify-between items-center text-[9px] text-slate-500 mb-1">
                        <span className="text-blue-400 font-bold uppercase">{item.category}</span>
                        <span>{item.timestamp}</span>
                      </div>
                      <h4 className="text-slate-300 font-medium leading-normal text-[11px] mb-1">{item.title}</h4>
                      <p className="text-[10px] text-slate-500">SOURCE: {item.source}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-[#0a0e14] border border-slate-800 rounded p-2 flex flex-col">
                <div className="border-b border-slate-800 pb-1.5 mb-2 flex items-center gap-1.5">
                  <AlertTriangle className="w-3.5 h-3.5 text-amber-500" />
                  <span className="font-bold uppercase tracking-wider text-slate-400 text-[10px]">Risk Radar Grid</span>
                </div>
                <div className="space-y-2 max-h-[250px] overflow-y-auto pr-1">
                  {filteredGeo.map((geo) => (
                    <div key={geo.id} className="bg-[#141110]/80 border border-amber-900/30 p-2.5 rounded relative overflow-hidden">
                      <div className="absolute top-0 left-0 w-[1.5px] h-full bg-amber-500"></div>
                      <div className="flex justify-between items-center text-[9px] mb-1">
                        <span className="text-amber-400 font-bold">📍 {geo.region}</span>
                        <span className="text-red-500 bg-red-950/40 px-1.5 py-0.2 rounded border border-red-900/40 font-bold text-[9px] uppercase">{geo.risk} RISK</span>
                      </div>
                      <h4 className="text-slate-200 font-bold text-[10px] uppercase mb-1">{geo.title}</h4>
                      <p className="text-[11px] text-slate-400 leading-relaxed mb-1.5">{geo.summary}</p>
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
