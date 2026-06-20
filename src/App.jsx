import React from 'react';
import Sidebar from './components/Sidebar';
import KPIHeader from './components/KPIHeader';
import MapComponent from './components/MapComponent';
import NewsEngine from './components/NewsEngine';
import TradingWidget from './components/TradingWidget';

export default function App() {
  return (
    <div className="flex h-screen bg-[#050608] text-slate-300 font-mono overflow-hidden">
      <Sidebar />
      <main className="flex-1 flex flex-col p-4 gap-4 overflow-y-auto">
        <KPIHeader />
        <div className="grid grid-cols-12 gap-4 flex-1">
          <div className="col-span-8 h-[60vh] border border-white/10 bg-[#0a0d14]">
            <MapComponent />
          </div>
          <div className="col-span-4 h-[60vh] border border-white/10 bg-[#0a0d14]">
            <NewsEngine />
          </div>
        </div>
        <div className="h-[25vh]">
          <TradingWidget />
        </div>
      </main>
    </div>
  );
}
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

export default function MapComponent() {
  return (
    <MapContainer center={[20, 0]} zoom={2} className="h-full w-full grayscale contrast-[1.5]">
      {/* Dark theme tile layer */}
      <TileLayer url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png" />
      <Marker position={[26.56, 56.25]}>
        <Popup>Strait of Hormuz - High Risk</Popup>
      </Marker>
    </MapContainer>
  );
}
