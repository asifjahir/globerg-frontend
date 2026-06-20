import React, { useState, useEffect } from 'react';
import { Shield, Newspaper, Globe, AlertTriangle, RefreshCw } from 'lucide-react';

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
  }, []);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans p-6">
      {/* Header */}
      <header className="border-b border-slate-800 pb-4 mb-8 flex justify-between items-center">
        <div className="flex items-center gap-3">
          <Shield className="w-8 h-8 text-blue-500 animate-pulse" />
          <div>
            <h1 className="text-xl font-bold tracking-wider text-white">GLOBERG INTELLIGENCE</h1>
            <p className="text-xs text-slate-400">Live Global Risk & News Monitor</p>
          </div>
        </div>
        <button 
          onClick={fetchData}
          className="flex items-center gap-2 bg-slate-900 hover:bg-slate-850 text-xs px-3 py-2 rounded border border-slate-700 transition"
        >
          <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin' : ''}`} />
          Refresh Feed
        </button>
      </header>

      {loading ? (
        <div className="flex items-center justify-center h-64">
          <p className="text-sm text-slate-400 tracking-widest animate-pulse">CONNECTING TO SECURE ENGINE...</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Columns - News Feed */}
          <div className="lg:col-span-2 space-y-6">
            <div className="flex items-center gap-2 border-b border-slate-800 pb-2">
              <Newspaper className="w-4 h-4 text-blue-400" />
              <h2 className="text-sm font-semibold tracking-wider uppercase text-slate-300">Terminal Bulletins</h2>
            </div>
            
            <div className="space-y-4">
              {news.map((item) => (
                <div key={item.id} className="bg-slate-900 border border-slate-800 p-4 rounded hover:border-slate-700 transition">
                  <div className="flex justify-between items-start mb-2">
                    <span className="text-xs font-mono px-2 py-0.5 bg-blue-950 text-blue-400 rounded border border-blue-900">
                      {item.category}
                    </span>
                    <span className="text-xs text-slate-500 font-mono">{item.timestamp}</span>
                  </div>
                  <h3 className="text-base font-medium text-slate-200 mb-2">{item.title}</h3>
                  <p className="text-xs text-slate-400 font-mono">Source: {item.source}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column - Geopolitical Watch */}
          <div className="space-y-6">
            <div className="flex items-center gap-2 border-b border-slate-800 pb-2">
              <Globe className="w-4 h-4 text-amber-400" />
              <h2 className="text-sm font-semibold tracking-wider uppercase text-slate-300">Geopolitical Alerts</h2>
            </div>

            <div className="space-y-4">
              {geopolitics.map((geo) => (
                <div key={geo.id} className="bg-slate-900 border border-amber-900/40 p-4 rounded bg-gradient-to-br from-slate-900 to-amber-950/10">
                  <div className="flex justify-between items-center mb-3">
                    <span className="text-xs font-semibold tracking-wide text-amber-400 uppercase font-mono">
                      📍 {geo.region}
                    </span>
                    <span className="flex items-center gap-1 text-xs font-bold text-red-500 bg-red-950/50 px-2 py-0.5 rounded border border-red-900/50 uppercase tracking-wider">
                      <AlertTriangle className="w-3 h-3" />
                      {geo.risk} Risk
                    </span>
                  </div>
                  <h3 className="text-sm font-medium text-slate-200 mb-2">{geo.title}</h3>
                  <p className="text-xs text-slate-400 mb-3 leading-relaxed">{geo.summary}</p>
                  <div className="text-[11px] font-mono text-slate-500 border-t border-slate-800/60 pt-2 flex justify-between">
                    <span>Lat: {geo.lat} | Lng: {geo.lng}</span>
                    <span>{geo.timestamp}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
