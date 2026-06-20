import React, { useState, useEffect } from 'react';
import { Shield, Newspaper, Globe, AlertTriangle, RefreshCw, TrendingUp, Cpu, Compass } from 'lucide-react';

export default function App() {
  const [news, setNews] = useState([]);
  const [geopolitics, setGeopolitics] = useState([]);
  const [loading, setLoading] = useState(true);

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
      console.error("Error fetching data:", error);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchData();
    
    // Inject TradingView Ticker Widget Script Dynamically
    const script = document.createElement('script');
    script.src = 'https://s3.tradingview.com/external-embedding/embed-widget-ticker-tape.js';
    script.async = true;
    script.innerHTML = JSON.stringify({
      "symbols": [
        { "proName": "FOREXCOM:SPXUSD", "title": "S&P 500" },
        { "proName": "FOREXCOM:NSXUSD", "title": "Nasdaq 100" },
        { "proName": "FX_IDC:EURUSD", "title": "EUR/USD" },
        { "proName": "BITSTAMP:BTCUSD", "title": "Bitcoin" },
        { "proName": "COMEX:GC1!", "title": "Gold" },
        { "proName": "NYMEX:CL1!", "title": "Crude Oil" }
      ],
      "showSymbolLogo": true,
      "colorTheme": "dark",
      "isTransparent": true,
      "displayMode": "adaptive",
      "locale": "en"
    });
    
    const container = document.getElementById('tradingview-ticker-container');
    if (container) container.appendChild(script);

    return () => {
      if (container) container.innerHTML = '';
    };
  }, []);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans flex flex-col">
      {/* TradingView Top Live Ticker Tape */}
      <div className="w-full bg-slate-900/60 border-b border-slate-800 py-1" id="tradingview-ticker-container">
        {/* Dynamic ticker injected here */}
      </div>

      <div className="p-6 flex-1 flex flex-col max-w-[1600px] mx-auto w-full">
        {/* Header */}
        <header className="border-b border-slate-800 pb-4 mb-6 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-blue-950 border border-blue-800/40 rounded shadow-lg shadow-blue-500/10">
              <Shield className="w-8 h-8 text-blue-500 animate-pulse" />
            </div>
            <div>
              <h1 className="text-xl font-black tracking-widest text-white">GLOBERG INTELLIGENCE</h1>
              <p className="text-xs text-slate-400 flex items-center gap-1.5 font-mono">
                <Cpu className="w-3 h-3 text-emerald-500" /> SECURE STRATEGIC FEED // STABLE_v1.0
              </p>
            </div>
          </div>
          <button 
            onClick={fetchData}
            className="flex items-center gap-2 bg-slate-900 hover:bg-slate-800 text-xs font-mono px-3 py-2 rounded border border-slate-700 transition active:scale-95"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin' : ''}`} />
            REFRESH TERMINAL
          </button>
        </header>

        {loading ? (
          <div className="flex-1 flex flex-col items-center justify-center h-96 gap-3">
            <div className="w-12 h-12 border-4 border-blue-500/20 border-t-blue-500 rounded-full animate-spin"></div>
            <p className="text-xs text-slate-400 font-mono tracking-widest uppercase animate-pulse">Establishing handshake with secure servers...</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 xl:grid-cols-4 gap-6 flex-1">
            
            {/* Column 1 & 2: Terminal Bulletins & Global Feeds */}
            <div className="xl:col-span-2 space-y-5">
              <div className="flex items-center gap-2 border-b border-slate-800 pb-2">
                <Newspaper className="w-4 h-4 text-blue-400" />
                <h2 className="text-xs font-bold tracking-widest font-mono uppercase text-slate-400">Terminal Bulletins & Intel</h2>
              </div>
              
              <div className="space-y-4 max-h-[750px] overflow-y-auto pr-2 custom-scrollbar">
                {news.map((item) => (
                  <div key={item.id} className="bg-gradient-to-r from-slate-900 to-slate-900/40 border border-slate-800 p-4 rounded hover:border-slate-700 transition shadow-inner">
                    <div className="flex justify-between items-start mb-2">
                      <span className="text-[10px] font-mono px-2 py-0.5 bg-blue-950/80 text-blue-400 rounded border border-blue-900/60 uppercase">
                        {item.category}
                      </span>
                      <span className="text-[11px] text-slate-500 font-mono">{item.timestamp}</span>
                    </div>
                    <h3 className="text-sm font-semibold text-slate-200 mb-2 leading-snug">{item.title}</h3>
                    <div className="flex items-center justify-between text-[11px] font-mono text-slate-500 border-t border-slate-800/40 pt-2">
                      <span>SRC: {item.source}</span>
                      <span className="text-emerald-500 flex items-center gap-1"><TrendingUp className="w-3 h-3"/> FEED_OK</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Column 3: Geopolitical Risk Mapping & Radar */}
            <div className="space-y-5">
              <div className="flex items-center gap-2 border-b border-slate-800 pb-2">
                <Globe className="w-4 h-4 text-amber-400" />
                <h2 className="text-xs font-bold tracking-widest font-mono uppercase text-slate-400">Risk Radar Matrix</h2>
              </div>

              <div className="space-y-4 max-h-[750px] overflow-y-auto pr-1">
                {geopolitics.map((geo) => (
                  <div key={geo.id} className="bg-slate-900/80 border border-amber-900/20 p-4 rounded bg-gradient-to-b from-slate-900 to-amber-950/5 relative overflow-hidden group">
                    <div className="absolute top-0 left-0 w-[2px] h-full bg-amber-500/40"></div>
                    <div className="flex justify-between items-center mb-3">
                      <span className="text-xs font-bold tracking-wide text-amber-400 font-mono flex items-center gap-1">
                        <Compass className="w-3.5 h-3.5 animate-spin-slow"/> {geo.region}
                      </span>
                      <span className="flex items-center gap-1 text-[10px] font-bold text-red-500 bg-red-950/40 px-2 py-0.5 rounded border border-red-900/50 uppercase tracking-wider">
                        <AlertTriangle className="w-3 h-3" />
                        {geo.risk} RISK
                      </span>
                    </div>
                    <h3 className="text-xs font-bold text-slate-200 mb-2 font-mono uppercase">{geo.title}</h3>
                    <p className="text-xs text-slate-400 mb-3 leading-relaxed">{geo.summary}</p>
                    <div className="text-[10px] font-mono text-slate-500 border-t border-slate-800/60 pt-2 flex justify-between">
                      <span>LAT:{geo.lat} // LNG:{geo.lng}</span>
                      <span>{geo.timestamp}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Column 4: Live Interactive Tactical Tracking Map Frame */}
            <div className="space-y-5">
              <div className="flex items-center gap-2 border-b border-slate-800 pb-2">
                <Compass className="w-4 h-4 text-emerald-400" />
                <h2 className="text-xs font-bold tracking-widest font-mono uppercase text-slate-400">Tactical Satellite Overlay</h2>
              </div>
              <div className="w-full h-[400px] xl:h-[650px] bg-slate-900 border border-slate-800 rounded overflow-hidden relative shadow-2xl">
                {/* Tech style vector grid overlay using a clean dark web standard iframe map */}
                <iframe 
                  title="Satellite Radar Overlay"
                  src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d10000000!2d35.0!3d28.0!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e1!3m2!1sen!2sin!4v1718910000000!5m2!1sen!2sin" 
                  className="w-full h-full grayscale opacity-80 invert contrast-[1.2]" 
                  allowFullScreen="" 
                  loading="lazy" 
                  referrerPolicy="no-referrer-when-downgrade"
                ></iframe>
                <div className="absolute bottom-3 left-3 bg-slate-950/90 border border-emerald-950 px-2 py-1 rounded font-mono text-[10px] text-emerald-400 pointer-events-none flex items-center gap-1.5 shadow-lg">
                  <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-ping"></span>
                  LIVE SAT FEED: ACTV
                </div>
              </div>
            </div>

          </div>
        )}
      </div>
    </div>
  );
}
