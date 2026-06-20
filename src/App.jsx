<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
<title>GLOBERG // Intelligence Platform</title>
<link rel="stylesheet" href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css" />
<script src="https://unpkg.com/leaflet@1.9.4/dist/leaflet.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/Chart.js/4.4.1/chart.umd.min.js"></script>
<style>
  @import url('https://fonts.googleapis.com/css2?family=IBM+Plex+Mono:wght@300;400;500;600&family=IBM+Plex+Sans:wght@300;400;500&display=swap');

  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

  :root {
    --bg0: #04050a;
    --bg1: #080c14;
    --bg2: #0c1220;
    --bg3: #101828;
    --border: rgba(255,255,255,0.06);
    --border-hi: rgba(255,255,255,0.12);
    --accent: #00d4ff;
    --accent2: #ff4d4d;
    --accent3: #00ff88;
    --accent4: #ffaa00;
    --text0: #e8edf5;
    --text1: #8892a4;
    --text2: #4a5568;
    --red: #ff3b3b;
    --green: #00e676;
    --amber: #ffa726;
  }

  html, body { height: 100%; overflow: hidden; background: var(--bg0); }

  body {
    font-family: 'IBM Plex Mono', monospace;
    color: var(--text0);
    display: flex;
    flex-direction: column;
  }

  /* ── SCROLLBAR ── */
  ::-webkit-scrollbar { width: 4px; }
  ::-webkit-scrollbar-track { background: var(--bg1); }
  ::-webkit-scrollbar-thumb { background: var(--border-hi); border-radius: 2px; }

  /* ── TOP BAR ── */
  #topbar {
    height: 44px;
    background: var(--bg1);
    border-bottom: 1px solid var(--border);
    display: flex;
    align-items: center;
    padding: 0 20px;
    gap: 0;
    flex-shrink: 0;
    position: relative;
    z-index: 100;
  }

  #logo {
    font-size: 15px;
    font-weight: 600;
    letter-spacing: 0.15em;
    color: var(--text0);
    margin-right: 32px;
    display: flex;
    align-items: center;
    gap: 8px;
  }

  #logo::before {
    content: '';
    width: 6px; height: 6px;
    background: var(--accent);
    border-radius: 50%;
    box-shadow: 0 0 8px var(--accent);
    animation: pulse-dot 2s infinite;
  }

  @keyframes pulse-dot {
    0%,100% { opacity: 1; box-shadow: 0 0 8px var(--accent); }
    50% { opacity: 0.5; box-shadow: 0 0 2px var(--accent); }
  }

  .nav-item {
    font-size: 10px;
    letter-spacing: 0.12em;
    color: var(--text2);
    padding: 0 14px;
    height: 44px;
    display: flex;
    align-items: center;
    cursor: pointer;
    border-bottom: 2px solid transparent;
    transition: all 0.15s;
  }
  .nav-item:hover { color: var(--text1); }
  .nav-item.active { color: var(--accent); border-bottom-color: var(--accent); }

  #topbar-right {
    margin-left: auto;
    display: flex;
    align-items: center;
    gap: 24px;
  }

  .kpi-pill {
    display: flex;
    align-items: center;
    gap: 6px;
    font-size: 10px;
    letter-spacing: 0.08em;
  }
  .kpi-pill .label { color: var(--text2); }
  .kpi-pill .val { color: var(--text0); font-weight: 500; }
  .kpi-pill .chg { font-size: 9px; }
  .chg.up { color: var(--green); }
  .chg.dn { color: var(--red); }

  .system-time {
    font-size: 11px;
    color: var(--accent);
    letter-spacing: 0.1em;
    font-weight: 500;
  }

  /* ── MAIN LAYOUT ── */
  #app {
    display: flex;
    flex: 1;
    overflow: hidden;
  }

  /* ── SIDEBAR ── */
  #sidebar {
    width: 52px;
    background: var(--bg1);
    border-right: 1px solid var(--border);
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 12px 0;
    gap: 4px;
    flex-shrink: 0;
  }

  .sb-btn {
    width: 36px; height: 36px;
    display: flex; align-items: center; justify-content: center;
    border-radius: 6px;
    cursor: pointer;
    color: var(--text2);
    font-size: 14px;
    transition: all 0.15s;
    position: relative;
  }
  .sb-btn:hover { background: var(--bg2); color: var(--text1); }
  .sb-btn.active { background: rgba(0,212,255,0.1); color: var(--accent); }
  .sb-btn.alert-dot::after {
    content: '';
    position: absolute;
    top: 6px; right: 6px;
    width: 5px; height: 5px;
    background: var(--red);
    border-radius: 50%;
  }
  .sb-sep { width: 24px; height: 1px; background: var(--border); margin: 6px 0; }

  /* ── CONTENT ── */
  #content {
    flex: 1;
    display: flex;
    overflow: hidden;
  }

  /* ── LEFT PANEL ── */
  #left-panel {
    flex: 1;
    display: flex;
    flex-direction: column;
    overflow: hidden;
  }

  /* ── MAP SECTION ── */
  #map-section {
    flex: 1;
    position: relative;
    overflow: hidden;
    border-bottom: 1px solid var(--border);
  }

  #map-label {
    position: absolute;
    top: 12px; left: 12px;
    z-index: 500;
    font-size: 9px;
    letter-spacing: 0.2em;
    color: var(--text1);
    display: flex;
    align-items: center;
    gap: 8px;
  }
  #map-label::before {
    content: '';
    width: 5px; height: 5px;
    background: var(--accent3);
    border-radius: 50%;
    animation: pulse-dot 1.5s infinite;
    box-shadow: 0 0 6px var(--accent3);
  }

  #map-controls {
    position: absolute;
    top: 12px; right: 12px;
    z-index: 500;
    display: flex;
    gap: 6px;
  }
  .map-ctrl-btn {
    background: rgba(8,12,20,0.85);
    border: 1px solid var(--border-hi);
    color: var(--text1);
    font-family: 'IBM Plex Mono', monospace;
    font-size: 9px;
    letter-spacing: 0.1em;
    padding: 4px 10px;
    cursor: pointer;
    transition: all 0.15s;
  }
  .map-ctrl-btn:hover { color: var(--accent); border-color: var(--accent); }
  .map-ctrl-btn.active { color: var(--accent); border-color: var(--accent); background: rgba(0,212,255,0.08); }

  #map { width: 100%; height: 100%; }

  /* Leaflet overrides */
  .leaflet-container { background: #04050a !important; }
  .leaflet-control-zoom { display: none; }
  .leaflet-control-attribution { display: none; }

  .custom-marker {
    width: 10px; height: 10px;
    border-radius: 50%;
    border: 2px solid;
    animation: ping 2s infinite;
    position: relative;
  }
  @keyframes ping {
    0% { box-shadow: 0 0 0 0 currentColor; }
    70% { box-shadow: 0 0 0 8px transparent; }
    100% { box-shadow: 0 0 0 0 transparent; }
  }
  .leaflet-popup-content-wrapper {
    background: rgba(8,12,20,0.95) !important;
    border: 1px solid var(--border-hi) !important;
    border-radius: 0 !important;
    box-shadow: none !important;
    color: var(--text0) !important;
    font-family: 'IBM Plex Mono', monospace !important;
    font-size: 11px !important;
  }
  .leaflet-popup-tip { background: rgba(8,12,20,0.95) !important; }
  .leaflet-popup-close-button { color: var(--text1) !important; }

  /* ── BOTTOM STRIP ── */
  #bottom-strip {
    height: 130px;
    background: var(--bg1);
    border-top: 1px solid var(--border);
    display: flex;
    gap: 0;
    flex-shrink: 0;
    overflow: hidden;
  }

  .chart-cell {
    flex: 1;
    border-right: 1px solid var(--border);
    padding: 10px 12px;
    display: flex;
    flex-direction: column;
    position: relative;
    overflow: hidden;
  }
  .chart-cell:last-child { border-right: none; }

  .cell-label {
    font-size: 8px;
    letter-spacing: 0.15em;
    color: var(--text2);
    margin-bottom: 2px;
  }
  .cell-val {
    font-size: 16px;
    font-weight: 500;
    line-height: 1.1;
    margin-bottom: 2px;
  }
  .cell-sub {
    font-size: 9px;
    color: var(--text2);
  }
  .cell-canvas {
    position: absolute;
    bottom: 0; left: 0; right: 0;
    height: 55px;
    opacity: 0.7;
  }

  /* ── RIGHT PANEL ── */
  #right-panel {
    width: 360px;
    flex-shrink: 0;
    border-left: 1px solid var(--border);
    display: flex;
    flex-direction: column;
    background: var(--bg1);
    overflow: hidden;
  }

  /* ── LIVE BROADCAST ── */
  #broadcast-section {
    flex-shrink: 0;
    border-bottom: 1px solid var(--border);
  }

  #broadcast-header {
    height: 32px;
    display: flex;
    align-items: center;
    padding: 0 12px;
    gap: 8px;
    border-bottom: 1px solid var(--border);
  }
  .live-dot {
    width: 6px; height: 6px;
    background: var(--red);
    border-radius: 50%;
    animation: pulse-dot 1s infinite;
    box-shadow: 0 0 6px var(--red);
  }
  .section-title {
    font-size: 9px;
    letter-spacing: 0.18em;
    color: var(--text1);
  }

  #broadcast-player {
    width: 100%;
    aspect-ratio: 16/9;
    background: #000;
    position: relative;
    overflow: hidden;
  }
  #broadcast-player iframe {
    width: 100%; height: 100%;
    border: none;
    display: block;
  }
  #broadcast-player .placeholder {
    position: absolute;
    inset: 0;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 8px;
    background: var(--bg2);
    color: var(--text2);
    font-size: 10px;
    letter-spacing: 0.1em;
  }
  #broadcast-player .placeholder svg {
    width: 32px; height: 32px;
    opacity: 0.3;
  }

  #channel-tabs {
    display: flex;
    border-top: 1px solid var(--border);
  }
  .ch-tab {
    flex: 1;
    height: 28px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 8px;
    letter-spacing: 0.15em;
    color: var(--text2);
    cursor: pointer;
    border-right: 1px solid var(--border);
    transition: all 0.15s;
  }
  .ch-tab:last-child { border-right: none; }
  .ch-tab:hover { color: var(--text1); background: var(--bg2); }
  .ch-tab.active { color: var(--accent); background: rgba(0,212,255,0.06); }

  /* ── NEWS ENGINE ── */
  #news-section {
    flex: 1;
    overflow: hidden;
    display: flex;
    flex-direction: column;
  }

  #news-header {
    height: 32px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 12px;
    border-bottom: 1px solid var(--border);
    flex-shrink: 0;
  }

  #news-filter {
    display: flex;
    gap: 8px;
    align-items: center;
  }
  .filter-btn {
    font-size: 8px;
    letter-spacing: 0.1em;
    color: var(--text2);
    cursor: pointer;
    padding: 2px 6px;
    border: 1px solid transparent;
    transition: all 0.15s;
  }
  .filter-btn:hover { color: var(--text1); }
  .filter-btn.active { color: var(--accent); border-color: rgba(0,212,255,0.3); }

  #news-feed {
    flex: 1;
    overflow-y: auto;
    padding: 8px 0;
  }

  .news-item {
    padding: 10px 12px;
    border-bottom: 1px solid var(--border);
    cursor: pointer;
    transition: background 0.1s;
  }
  .news-item:hover { background: var(--bg2); }

  .news-meta {
    display: flex;
    align-items: center;
    gap: 8px;
    margin-bottom: 4px;
  }
  .news-tag {
    font-size: 8px;
    letter-spacing: 0.12em;
    padding: 1px 6px;
    border: 1px solid;
  }
  .tag-red { color: var(--red); border-color: rgba(255,59,59,0.3); background: rgba(255,59,59,0.05); }
  .tag-amber { color: var(--amber); border-color: rgba(255,167,38,0.3); background: rgba(255,167,38,0.05); }
  .tag-blue { color: var(--accent); border-color: rgba(0,212,255,0.3); background: rgba(0,212,255,0.05); }
  .tag-green { color: var(--green); border-color: rgba(0,230,118,0.3); background: rgba(0,230,118,0.05); }

  .news-time {
    font-size: 8px;
    color: var(--text2);
    margin-left: auto;
  }
  .news-headline {
    font-size: 10px;
    line-height: 1.5;
    color: var(--text0);
    margin-bottom: 3px;
    font-family: 'IBM Plex Sans', sans-serif;
  }
  .news-source {
    font-size: 8px;
    color: var(--text2);
    letter-spacing: 0.05em;
  }

  /* ── ALERT TICKER ── */
  #ticker-bar {
    height: 26px;
    background: var(--bg0);
    border-top: 1px solid var(--border);
    overflow: hidden;
    display: flex;
    align-items: center;
    flex-shrink: 0;
    position: relative;
  }
  #ticker-bar::after {
    content: '';
    position: absolute;
    right: 0; top: 0; bottom: 0;
    width: 60px;
    background: linear-gradient(to right, transparent, var(--bg0));
    pointer-events: none;
    z-index: 2;
  }
  .ticker-label {
    flex-shrink: 0;
    background: var(--accent2);
    color: #fff;
    font-size: 8px;
    letter-spacing: 0.15em;
    padding: 0 10px;
    height: 100%;
    display: flex;
    align-items: center;
    font-weight: 600;
  }
  .ticker-scroll-wrap {
    flex: 1;
    overflow: hidden;
    height: 100%;
    display: flex;
    align-items: center;
  }
  .ticker-scroll {
    display: flex;
    gap: 60px;
    font-size: 9px;
    color: var(--text1);
    letter-spacing: 0.06em;
    white-space: nowrap;
    animation: ticker 40s linear infinite;
  }
  @keyframes ticker {
    from { transform: translateX(0); }
    to { transform: translateX(-50%); }
  }
  .ticker-item { display: flex; align-items: center; gap: 8px; }
  .ticker-sep { color: var(--text2); }

  /* ── SCAN LINES OVERLAY ── */
  #scanlines {
    position: fixed;
    inset: 0;
    pointer-events: none;
    z-index: 9999;
    background: repeating-linear-gradient(
      to bottom,
      transparent 0px,
      transparent 2px,
      rgba(0,0,0,0.03) 2px,
      rgba(0,0,0,0.03) 4px
    );
  }

  /* ── THREAT INTEL PANEL ── */
  #intel-panel {
    position: absolute;
    top: 40px; left: 12px;
    z-index: 500;
    display: flex;
    flex-direction: column;
    gap: 6px;
    pointer-events: none;
  }
  .intel-card {
    background: rgba(4,5,10,0.88);
    border: 1px solid var(--border-hi);
    padding: 8px 12px;
    min-width: 160px;
    backdrop-filter: blur(4px);
  }
  .intel-title {
    font-size: 8px;
    letter-spacing: 0.15em;
    color: var(--text2);
    margin-bottom: 6px;
  }
  .intel-row {
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 10px;
    margin-bottom: 4px;
  }
  .intel-row:last-child { margin-bottom: 0; }
  .intel-name { color: var(--text1); font-size: 9px; }
  .threat-bar-wrap {
    flex: 1;
    height: 2px;
    background: var(--border);
    margin: 0 8px;
    position: relative;
  }
  .threat-bar {
    height: 100%;
    transition: width 1s ease;
  }

  /* ── SIGNAL STRENGTH ── */
  .signal-item {
    display: flex;
    align-items: center;
    gap: 6px;
    margin-bottom: 4px;
    font-size: 9px;
  }
  .signal-item:last-child { margin-bottom: 0; }
  .signal-label { color: var(--text1); flex: 1; }
  .signal-bars {
    display: flex;
    gap: 2px;
    align-items: flex-end;
  }
  .bar {
    width: 3px;
    background: var(--border);
    border-radius: 1px;
  }
  .bar.filled { background: var(--accent3); }
  .bar.warn { background: var(--amber); }
  .bar.crit { background: var(--red); }

</style>
</head>
<body>

<div id="scanlines"></div>

<!-- TOP BAR -->
<div id="topbar">
  <div id="logo">GLOBERG</div>
  <div class="nav-item active">OVERVIEW</div>
  <div class="nav-item">SECTORS</div>
  <div class="nav-item">INTEL</div>
  <div class="nav-item">RISK</div>
  <div class="nav-item">ALERTS</div>

  <div id="topbar-right">
    <div class="kpi-pill">
      <span class="label">CRUDE</span>
      <span class="val" id="kpi-crude">$82.14</span>
      <span class="chg up" id="kpi-crude-chg">+0.42%</span>
    </div>
    <div class="kpi-pill">
      <span class="label">GOLD</span>
      <span class="val" id="kpi-gold">$2,384.50</span>
      <span class="chg dn" id="kpi-gold-chg">-0.18%</span>
    </div>
    <div class="kpi-pill">
      <span class="label">NASDAQ</span>
      <span class="val" id="kpi-nasdaq">17,812.6</span>
      <span class="chg up" id="kpi-nasdaq-chg">+1.12%</span>
    </div>
    <div class="kpi-pill">
      <span class="label">DXY</span>
      <span class="val" id="kpi-dxy">104.32</span>
      <span class="chg dn" id="kpi-dxy-chg">-0.09%</span>
    </div>
    <div class="kpi-pill">
      <span class="label">VIX</span>
      <span class="val" id="kpi-vix">18.74</span>
      <span class="chg up" id="kpi-vix-chg">+2.31%</span>
    </div>
    <div class="system-time" id="clock">--:--:-- UTC</div>
  </div>
</div>

<!-- APP -->
<div id="app">

  <!-- SIDEBAR -->
  <div id="sidebar">
    <div class="sb-btn active" title="Map">
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><polygon points="1 6 1 22 8 18 16 22 23 18 23 2 16 6 8 2 1 6"/><line x1="8" y1="2" x2="8" y2="18"/><line x1="16" y1="6" x2="16" y2="22"/></svg>
    </div>
    <div class="sb-btn alert-dot" title="Alerts">
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 0 1-3.46 0"/></svg>
    </div>
    <div class="sb-btn" title="Intel Feed">
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/></svg>
    </div>
    <div class="sb-sep"></div>
    <div class="sb-btn" title="Sectors">
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/></svg>
    </div>
    <div class="sb-btn" title="Analytics">
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/></svg>
    </div>
    <div class="sb-sep"></div>
    <div class="sb-btn" title="Settings">
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"/></svg>
    </div>
  </div>

  <!-- CONTENT -->
  <div id="content">

    <!-- LEFT PANEL -->
    <div id="left-panel">

      <!-- MAP -->
      <div id="map-section">
        <div id="map-label">TACTICAL SECTOR ANALYSIS // ACTIVE</div>

        <div id="map-controls">
          <button class="map-ctrl-btn active" onclick="setLayer('dark')">DARK</button>
          <button class="map-ctrl-btn" onclick="setLayer('satellite')">SAT</button>
          <button class="map-ctrl-btn" onclick="setLayer('terrain')">TERRAIN</button>
        </div>

        <!-- Threat Intel overlay -->
        <div id="intel-panel">
          <div class="intel-card">
            <div class="intel-title">THREAT INDEX</div>
            <div class="intel-row">
              <span class="intel-name">Middle East</span>
              <div class="threat-bar-wrap"><div class="threat-bar" style="width:78%;background:var(--red)"></div></div>
              <span style="font-size:9px;color:var(--red)">78</span>
            </div>
            <div class="intel-row">
              <span class="intel-name">E. Europe</span>
              <div class="threat-bar-wrap"><div class="threat-bar" style="width:65%;background:var(--amber)"></div></div>
              <span style="font-size:9px;color:var(--amber)">65</span>
            </div>
            <div class="intel-row">
              <span class="intel-name">S. China Sea</span>
              <div class="threat-bar-wrap"><div class="threat-bar" style="width:52%;background:var(--amber)"></div></div>
              <span style="font-size:9px;color:var(--amber)">52</span>
            </div>
            <div class="intel-row">
              <span class="intel-name">West Africa</span>
              <div class="threat-bar-wrap"><div class="threat-bar" style="width:41%;background:var(--accent3)"></div></div>
              <span style="font-size:9px;color:var(--accent3)">41</span>
            </div>
          </div>

          <div class="intel-card">
            <div class="intel-title">SIGNAL STATUS</div>
            <div class="signal-item">
              <span class="signal-label">SATCOM A</span>
              <div class="signal-bars">
                <div class="bar filled" style="height:6px"></div>
                <div class="bar filled" style="height:9px"></div>
                <div class="bar filled" style="height:12px"></div>
                <div class="bar filled" style="height:15px"></div>
                <div class="bar" style="height:18px"></div>
              </div>
            </div>
            <div class="signal-item">
              <span class="signal-label">SIGINT-7</span>
              <div class="signal-bars">
                <div class="bar filled" style="height:6px"></div>
                <div class="bar filled warn" style="height:9px"></div>
                <div class="bar warn" style="height:12px"></div>
                <div class="bar" style="height:15px"></div>
                <div class="bar" style="height:18px"></div>
              </div>
            </div>
            <div class="signal-item">
              <span class="signal-label">RELAY-NET</span>
              <div class="signal-bars">
                <div class="bar filled" style="height:6px"></div>
                <div class="bar filled" style="height:9px"></div>
                <div class="bar filled" style="height:12px"></div>
                <div class="bar filled" style="height:15px"></div>
                <div class="bar filled" style="height:18px"></div>
              </div>
            </div>
          </div>
        </div>

        <div id="map"></div>
      </div>

      <!-- BOTTOM STRIP: Mini Charts -->
      <div id="bottom-strip">
        <div class="chart-cell">
          <div class="cell-label">CRUDE OIL (WTI)</div>
          <div class="cell-val" style="color:var(--accent)">$82.14</div>
          <div class="cell-sub" style="color:var(--green)">▲ +0.42% today</div>
          <canvas class="cell-canvas" id="chart-crude"></canvas>
        </div>
        <div class="chart-cell">
          <div class="cell-label">GOLD SPOT</div>
          <div class="cell-val" style="color:var(--accent4)">$2,384.50</div>
          <div class="cell-sub" style="color:var(--red)">▼ -0.18% today</div>
          <canvas class="cell-canvas" id="chart-gold"></canvas>
        </div>
        <div class="chart-cell">
          <div class="cell-label">NASDAQ COMP.</div>
          <div class="cell-val" style="color:var(--accent3)">17,812.6</div>
          <div class="cell-sub" style="color:var(--green)">▲ +1.12% today</div>
          <canvas class="cell-canvas" id="chart-nasdaq"></canvas>
        </div>
        <div class="chart-cell">
          <div class="cell-label">USD INDEX (DXY)</div>
          <div class="cell-val" style="color:var(--text0)">104.32</div>
          <div class="cell-sub" style="color:var(--red)">▼ -0.09% today</div>
          <canvas class="cell-canvas" id="chart-dxy"></canvas>
        </div>
        <div class="chart-cell">
          <div class="cell-label">VIX VOLATILITY</div>
          <div class="cell-val" style="color:var(--accent2)">18.74</div>
          <div class="cell-sub" style="color:var(--red)">▲ +2.31% today</div>
          <canvas class="cell-canvas" id="chart-vix"></canvas>
        </div>
      </div>

    </div>

    <!-- RIGHT PANEL -->
    <div id="right-panel">

      <!-- LIVE BROADCAST -->
      <div id="broadcast-section">
        <div id="broadcast-header">
          <div class="live-dot"></div>
          <div class="section-title">LIVE BROADCAST</div>
        </div>
        <div id="broadcast-player">
          <div class="placeholder">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1"><rect x="2" y="7" width="20" height="15" rx="2"/><polyline points="17 2 12 7 7 2"/></svg>
            <span>SELECT CHANNEL BELOW</span>
          </div>
        </div>
        <div id="channel-tabs">
          <div class="ch-tab" onclick="loadChannel('h3MuIUNCCLI', this)">AL JAZEERA</div>
          <div class="ch-tab" onclick="loadChannel('dp8PhLsUcFE', this)">BLOOMBERG</div>
          <div class="ch-tab" onclick="loadChannel('g_MLSNaML-M', this)">CNN</div>
          <div class="ch-tab" onclick="loadChannel('nu7MDzuS8wc', this)">BBC</div>
        </div>
      </div>

      <!-- NEWS ENGINE -->
      <div id="news-section">
        <div id="news-header">
          <div class="section-title">INTEL FEED</div>
          <div id="news-filter">
            <span class="filter-btn active" onclick="filterNews('ALL', this)">ALL</span>
            <span class="filter-btn" onclick="filterNews('CRITICAL', this)">CRITICAL</span>
            <span class="filter-btn" onclick="filterNews('MARKET', this)">MARKET</span>
            <span class="filter-btn" onclick="filterNews('GEO', this)">GEO</span>
          </div>
        </div>
        <div id="news-feed"></div>
      </div>

    </div>

  </div>

</div>

<!-- TICKER -->
<div id="ticker-bar">
  <div class="ticker-label">FLASH</div>
  <div class="ticker-scroll-wrap">
    <div class="ticker-scroll" id="ticker"></div>
  </div>
</div>

<script>
// ── CLOCK ──
function updateClock() {
  const now = new Date();
  const h = String(now.getUTCHours()).padStart(2,'0');
  const m = String(now.getUTCMinutes()).padStart(2,'0');
  const s = String(now.getUTCSeconds()).padStart(2,'0');
  document.getElementById('clock').textContent = `${h}:${m}:${s} UTC`;
}
setInterval(updateClock, 1000);
updateClock();

// ── MAP ──
const map = L.map('map', { zoomControl: false, attributionControl: false }).setView([20, 15], 2);

const layers = {
  dark: L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', { maxZoom: 19 }),
  satellite: L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', { maxZoom: 19 }),
  terrain: L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_nolabels/{z}/{x}/{y}{r}.png', { maxZoom: 19 })
};

layers.dark.addTo(map);
let currentLayer = 'dark';

window.setLayer = function(name) {
  map.removeLayer(layers[currentLayer]);
  layers[name].addTo(map);
  currentLayer = name;
  document.querySelectorAll('.map-ctrl-btn').forEach(b => b.classList.remove('active'));
  event.target.classList.add('active');
};

// Hotspots
const hotspots = [
  { lat: 26.56, lng: 56.25, label: 'Strait of Hormuz', risk: 'CRITICAL', color: '#ff3b3b', detail: 'Naval activity ↑ 34% · Tanker disruptions reported' },
  { lat: 48.5, lng: 31.2, label: 'Ukraine Frontline', risk: 'CRITICAL', color: '#ff3b3b', detail: 'Active conflict zone · Air defense active' },
  { lat: 14.1, lng: 121.0, label: 'S. China Sea', risk: 'HIGH', color: '#ffa726', detail: 'Maritime patrol vessels · Territorial disputes ongoing' },
  { lat: 31.5, lng: 34.8, label: 'Gaza Corridor', risk: 'CRITICAL', color: '#ff3b3b', detail: 'Humanitarian crisis · Supply routes disrupted' },
  { lat: 13.5, lng: 2.1, label: 'Sahel Region', risk: 'ELEVATED', color: '#ffa726', detail: 'Insurgency activity · 3 incidents this week' },
  { lat: 1.3, lng: 103.8, label: 'Singapore Strait', risk: 'MONITOR', color: '#00d4ff', detail: 'Shipping chokepoint · Traffic nominal' },
  { lat: 43.2, lng: 76.8, label: 'Central Asia', risk: 'ELEVATED', color: '#ffa726', detail: 'Border tensions · Resource competition' },
  { lat: -1.3, lng: 36.8, label: 'East Africa', risk: 'MONITOR', color: '#00d4ff', detail: 'Economic corridors · Monitoring ongoing' },
];

hotspots.forEach(h => {
  const icon = L.divIcon({
    className: '',
    html: `<div style="width:10px;height:10px;border-radius:50%;border:2px solid ${h.color};background:${h.color}22;animation:ping 2s infinite;box-shadow:0 0 8px ${h.color}44"></div>`,
    iconSize: [10, 10],
    iconAnchor: [5, 5]
  });

  L.marker([h.lat, h.lng], { icon })
    .addTo(map)
    .bindPopup(`
      <div style="min-width:180px">
        <div style="font-size:11px;font-weight:600;color:${h.color};letter-spacing:0.1em;margin-bottom:4px">${h.label}</div>
        <div style="font-size:9px;letter-spacing:0.12em;color:${h.color};margin-bottom:6px;padding:2px 6px;border:1px solid ${h.color}44;display:inline-block">${h.risk}</div>
        <div style="font-size:10px;color:#8892a4;line-height:1.5">${h.detail}</div>
      </div>
    `, { maxWidth: 220 });
});

// ── LIVE KPI TICKER (simulated) ──
const kpiData = {
  crude: { val: 82.14, el: 'kpi-crude', chg: 'kpi-crude-chg', fmt: v => `$${v.toFixed(2)}` },
  gold:  { val: 2384.50, el: 'kpi-gold', chg: 'kpi-gold-chg', fmt: v => `$${v.toLocaleString('en-US',{minimumFractionDigits:2,maximumFractionDigits:2})}` },
  nasdaq:{ val: 17812.6, el: 'kpi-nasdaq', chg: 'kpi-nasdaq-chg', fmt: v => v.toLocaleString('en-US',{minimumFractionDigits:1,maximumFractionDigits:1}) },
  dxy:   { val: 104.32, el: 'kpi-dxy', chg: 'kpi-dxy-chg', fmt: v => v.toFixed(2) },
  vix:   { val: 18.74, el: 'kpi-vix', chg: 'kpi-vix-chg', fmt: v => v.toFixed(2) },
};

const kpiBase = {};
Object.entries(kpiData).forEach(([k,d]) => kpiBase[k] = d.val);

function tickKPIs() {
  Object.entries(kpiData).forEach(([k, d]) => {
    const delta = (Math.random() - 0.495) * d.val * 0.0008;
    d.val += delta;
    const pct = ((d.val - kpiBase[k]) / kpiBase[k] * 100);
    const sign = pct >= 0 ? '+' : '';
    document.getElementById(d.el).textContent = d.fmt(d.val);
    const chgEl = document.getElementById(d.chg);
    chgEl.textContent = `${sign}${pct.toFixed(2)}%`;
    chgEl.className = `chg ${pct >= 0 ? 'up' : 'dn'}`;
  });
}
setInterval(tickKPIs, 2000);

// ── MINI CHARTS ──
function makeSparkline(id, color, data, fill) {
  const ctx = document.getElementById(id);
  if (!ctx) return;
  return new Chart(ctx, {
    type: 'line',
    data: {
      labels: data.map((_,i) => i),
      datasets: [{
        data,
        borderColor: color,
        borderWidth: 1.5,
        fill: fill ? { target: 'origin', above: color + '18' } : false,
        tension: 0.4,
        pointRadius: 0,
      }]
    },
    options: {
      responsive: false,
      animation: false,
      plugins: { legend: { display: false }, tooltip: { enabled: false } },
      scales: { x: { display: false }, y: { display: false } },
      layout: { padding: 0 },
    }
  });
}

function randWalk(start, steps, vol) {
  const arr = [start];
  for (let i = 1; i < steps; i++) arr.push(arr[i-1] + (Math.random()-0.495)*vol);
  return arr;
}

const charts = {
  crude:  makeSparkline('chart-crude',  '#00d4ff', randWalk(80, 60, 0.4), true),
  gold:   makeSparkline('chart-gold',   '#ffaa00', randWalk(2380, 60, 3), true),
  nasdaq: makeSparkline('chart-nasdaq', '#00ff88', randWalk(17600, 60, 40), true),
  dxy:    makeSparkline('chart-dxy',    '#8892a4', randWalk(104, 60, 0.1), true),
  vix:    makeSparkline('chart-vix',    '#ff4d4d', randWalk(18, 60, 0.3), true),
};

// Live-update charts
setInterval(() => {
  const pairs = [
    ['crude', kpiData.crude, 0.4],
    ['gold',  kpiData.gold, 3],
    ['nasdaq',kpiData.nasdaq, 40],
    ['dxy',   kpiData.dxy, 0.1],
    ['vix',   kpiData.vix, 0.3],
  ];
  pairs.forEach(([key, kpi, vol]) => {
    const ch = charts[key];
    if (!ch) return;
    ch.data.datasets[0].data.push(kpi.val);
    if (ch.data.datasets[0].data.length > 80) ch.data.datasets[0].data.shift();
    ch.data.labels = ch.data.datasets[0].data.map((_,i)=>i);
    ch.update('none');
  });
}, 2000);

// ── BROADCAST ──
window.loadChannel = function(videoId, el) {
  document.querySelectorAll('.ch-tab').forEach(t => t.classList.remove('active'));
  el.classList.add('active');
  const player = document.getElementById('broadcast-player');
  player.innerHTML = `<iframe src="https://www.youtube.com/embed/${videoId}?autoplay=1&mute=1&rel=0" allow="autoplay; encrypted-media" allowfullscreen></iframe>`;
};

// ── NEWS DATA ──
const newsItems = [
  { tag: 'CRITICAL', tagClass: 'tag-red', headline: 'Iran-backed forces claim attack on Israeli northern border positions — IDF confirms response underway', source: 'Reuters Intelligence', time: '2m ago', cat: 'CRITICAL' },
  { tag: 'MARKET', tagClass: 'tag-blue', headline: 'Fed signals one more rate hold; markets price in September cut with 68% probability', source: 'Bloomberg Terminal', time: '5m ago', cat: 'MARKET' },
  { tag: 'GEO', tagClass: 'tag-amber', headline: 'Russia redirects pipeline flows via Turkstream; EU energy reserves at 74% capacity ahead of winter', source: 'Energy Intel Group', time: '9m ago', cat: 'GEO' },
  { tag: 'MARKET', tagClass: 'tag-blue', headline: 'OPEC+ emergency call scheduled for Thursday — Saudi Arabia pushes for 500k bpd additional cut', source: 'S&P Global Commodity', time: '14m ago', cat: 'MARKET' },
  { tag: 'CRITICAL', tagClass: 'tag-red', headline: 'Three commercial vessels diverted from Strait of Hormuz — Lloyd\'s of London raises war risk premium', source: 'Lloyd\'s Intelligence', time: '18m ago', cat: 'CRITICAL' },
  { tag: 'GEO', tagClass: 'tag-amber', headline: 'Taiwan Strait: PLA Navy conducts unannounced drills; US Carrier Strike Group repositions to South China Sea', source: 'PACOM Watch', time: '22m ago', cat: 'GEO' },
  { tag: 'MARKET', tagClass: 'tag-blue', headline: 'Gold breaks $2,400/oz as safe-haven flows accelerate; central bank purchases hit decade high in Q1', source: 'World Gold Council', time: '31m ago', cat: 'MARKET' },
  { tag: 'GEO', tagClass: 'tag-amber', headline: 'Niger junta expels French diplomatic mission; ECOWAS emergency session called for next week', source: 'Africa Intelligence', time: '38m ago', cat: 'GEO' },
  { tag: 'CRITICAL', tagClass: 'tag-red', headline: 'Ukraine strikes Russian oil refinery in Ryazan — Brent crude spikes 1.8% in after-hours trading', source: 'Kyiv Post / TASS', time: '45m ago', cat: 'CRITICAL' },
  { tag: 'MARKET', tagClass: 'tag-green', headline: 'NVIDIA reports Q2 revenue of $28.6B, beats estimates by 12%; AI chip demand remains at historic high', source: 'EDGAR / IR Direct', time: '52m ago', cat: 'MARKET' },
  { tag: 'GEO', tagClass: 'tag-amber', headline: 'Pakistan-India LoC: Three incidents in 48 hours — UN peacekeeping force put on standby alert', source: 'UN DPPA Monitor', time: '1h ago', cat: 'GEO' },
  { tag: 'CRITICAL', tagClass: 'tag-red', headline: 'Houthi missile launch intercepted over Red Sea; USS Carney fires 2 SM-2 interceptors, crew safe', source: 'CENTCOM Release', time: '1h 14m ago', cat: 'CRITICAL' },
];

let activeFilter = 'ALL';
window.filterNews = function(cat, el) {
  activeFilter = cat;
  document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
  el.classList.add('active');
  renderNews();
};

function renderNews() {
  const feed = document.getElementById('news-feed');
  const filtered = activeFilter === 'ALL' ? newsItems : newsItems.filter(n => n.cat === activeFilter);
  feed.innerHTML = filtered.map(n => `
    <div class="news-item">
      <div class="news-meta">
        <span class="news-tag ${n.tagClass}">${n.tag}</span>
        <span class="news-time">${n.time}</span>
      </div>
      <div class="news-headline">${n.headline}</div>
      <div class="news-source">${n.source}</div>
    </div>
  `).join('');
}
renderNews();

// ── TICKER ──
const tickerItems = [
  'CRUDE +0.42% · $82.14/bbl',
  'GOLD SPOT -0.18% · $2,384/oz',
  'NASDAQ +1.12% · 17,812',
  'EUR/USD 1.0823 · -0.11%',
  'USD/JPY 157.42 · +0.24%',
  'BTC/USD $67,240 · +2.1%',
  'BRENT CRUDE $84.90 · +0.38%',
  'S&P 500 5,341 · +0.78%',
  'GERMAN BUND 2.48% · -3bps',
  'US 10Y YIELD 4.28% · +2bps',
  '⚠ HORMUZ ALERT: Vessel diversions reported',
  'OPEC+ meeting Thursday — cut expected',
  '⚠ RED SEA: Houthi missile intercepted 02:14 UTC',
  'IMF: Global growth 3.1% forecast maintained',
  'CHINA CPI: -0.1% YoY · Deflation concerns mount',
];

function buildTicker() {
  const t = document.getElementById('ticker');
  const items = [...tickerItems, ...tickerItems];
  t.innerHTML = items.map(item =>
    `<span class="ticker-item">${item}<span class="ticker-sep">·</span></span>`
  ).join('');
}
buildTicker();

// ── LIVE NEWS INJECTION ──
const liveAlerts = [
  { tag: 'FLASH', tagClass: 'tag-red', headline: 'Breaking: US Treasury announces new sanctions package targeting Iranian oil intermediaries', source: 'US Treasury Dept.', cat: 'CRITICAL' },
  { tag: 'MARKET', tagClass: 'tag-blue', headline: 'ECB holds rates at 3.75%; Lagarde signals data-dependent approach through Q3 2026', source: 'ECB Press Release', cat: 'MARKET' },
  { tag: 'GEO', tagClass: 'tag-amber', headline: 'South Korea raises DEFCON advisory level as North Korea tests ICBM trajectory', source: 'ROK Joint Chiefs', cat: 'GEO' },
];

let alertIdx = 0;
setInterval(() => {
  const alert = liveAlerts[alertIdx % liveAlerts.length];
  const item = { ...alert, time: 'just now' };
  newsItems.unshift(item);
  if (newsItems.length > 30) newsItems.pop();
  renderNews();
  alertIdx++;
}, 45000);

</script>
</body>
</html>
