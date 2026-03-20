import { useState } from "react";
import ThreeBackground from "./components/ThreeBackground";
import Chat from "./components/Chat";
import ImageDetection from "./components/ImageDetection";

export default function App() {
  const [activeTab, setActiveTab] = useState("chat"); // for mobile

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@300;400;700&family=Orbitron:wght@400;700;900&display=swap');

        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

        :root {
          --cyan: #00ffe7;
          --purple: #a855f7;
          --blue: #3b82f6;
          --bg: #030712;
          --glass: rgba(3, 7, 18, 0.7);
          --border: rgba(0,255,231,0.15);
        }

        body {
          background: var(--bg);
          color: #e2e8f0;
          font-family: 'JetBrains Mono', monospace;
          overflow: hidden;
          height: 100vh;
        }

        /* Noise texture overlay */
        body::after {
          content: '';
          position: fixed;
          inset: 0;
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.04'/%3E%3C/svg%3E");
          pointer-events: none;
          z-index: 100;
          opacity: 0.4;
        }

        .canvas-wrap {
          position: fixed;
          inset: 0;
          z-index: 0;
        }

        .ui-layer {
          position: fixed;
          inset: 0;
          z-index: 10;
          display: flex;
          flex-direction: column;
          padding: 0;
        }

        /* ── TOP BAR ── */
        .topbar {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 12px 24px;
          border-bottom: 1px solid var(--border);
          background: rgba(3,7,18,0.6);
          backdrop-filter: blur(12px);
          flex-shrink: 0;
        }

        .logo {
          font-family: 'Orbitron', monospace;
          font-weight: 900;
          font-size: 15px;
          letter-spacing: 4px;
          text-transform: uppercase;
          background: linear-gradient(90deg, var(--cyan), var(--purple));
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .logo-sub {
          font-size: 8px;
          letter-spacing: 3px;
          color: #475569;
          text-transform: uppercase;
          margin-top: 1px;
        }

        .topbar-right {
          display: flex;
          align-items: center;
          gap: 20px;
        }

        .status-pill {
          display: flex;
          align-items: center;
          gap: 6px;
          font-size: 9px;
          letter-spacing: 2px;
          text-transform: uppercase;
          color: #64748b;
        }

        .status-dot {
          width: 6px; height: 6px;
          border-radius: 50%;
          background: var(--cyan);
          box-shadow: 0 0 8px var(--cyan);
          animation: statusPulse 2s infinite;
        }

        @keyframes statusPulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.3; }
        }

        .time-display {
          font-family: 'Orbitron', monospace;
          font-size: 11px;
          color: #334155;
          letter-spacing: 2px;
        }

        /* ── MAIN PANELS ── */
        .panels {
          flex: 1;
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 0;
          overflow: hidden;
        }

        .panel {
          display: flex;
          flex-direction: column;
          overflow: hidden;
          position: relative;
          padding: 20px;
          backdrop-filter: blur(16px);
          background: var(--glass);
        }

        .panel:first-child {
          border-right: 1px solid var(--border);
        }

        /* Glow accent top */
        .panel::before {
          content: '';
          position: absolute;
          top: 0; left: 20px; right: 20px;
          height: 1px;
          background: linear-gradient(90deg, transparent, var(--cyan), transparent);
          opacity: 0.6;
        }

        .panel:last-child::before {
          background: linear-gradient(90deg, transparent, var(--purple), transparent);
        }

        .panel-header {
          display: flex;
          align-items: center;
          gap: 10px;
          margin-bottom: 16px;
          flex-shrink: 0;
        }

        .panel-icon {
          width: 28px; height: 28px;
          border: 1px solid;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 12px;
          border-radius: 2px;
          flex-shrink: 0;
        }

        .panel-icon.chat {
          border-color: var(--cyan);
          color: var(--cyan);
          box-shadow: 0 0 12px #00ffe720;
        }

        .panel-icon.cam {
          border-color: var(--purple);
          color: var(--purple);
          box-shadow: 0 0 12px #a855f720;
        }

        .panel-title {
          font-family: 'Orbitron', monospace;
          font-size: 10px;
          font-weight: 700;
          letter-spacing: 3px;
          text-transform: uppercase;
        }

        .panel-title.chat { color: var(--cyan); }
        .panel-title.cam { color: var(--purple); }

        .panel-line {
          flex: 1;
          height: 1px;
          background: var(--border);
        }

        .panel-badge {
          font-size: 8px;
          letter-spacing: 2px;
          padding: 2px 8px;
          border: 1px solid;
          border-radius: 1px;
          text-transform: uppercase;
        }

        .panel-badge.chat {
          border-color: #00ffe730;
          color: #00ffe770;
        }

        .panel-badge.cam {
          border-color: #a855f730;
          color: #a855f770;
        }

        .panel-content {
          flex: 1;
          overflow: hidden;
          display: flex;
          flex-direction: column;
        }

        /* ── BOTTOM BAR ── */
        .bottombar {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 8px 24px;
          border-top: 1px solid var(--border);
          background: rgba(3,7,18,0.6);
          backdrop-filter: blur(12px);
          flex-shrink: 0;
        }

        .bottom-info {
          font-size: 8px;
          letter-spacing: 2px;
          text-transform: uppercase;
          color: #1e293b;
        }

        .bottom-info span {
          color: #334155;
        }

        /* Decorative corner brackets on panels */
        .panel-corner {
          position: absolute;
          width: 10px; height: 10px;
          border-color: var(--cyan);
          border-style: solid;
          opacity: 0.4;
        }
        .panel:last-child .panel-corner { border-color: var(--purple); }

        .panel-corner.tl { top: 8px; left: 8px; border-width: 1px 0 0 1px; }
        .panel-corner.tr { top: 8px; right: 8px; border-width: 1px 1px 0 0; }
        .panel-corner.bl { bottom: 8px; left: 8px; border-width: 0 0 1px 1px; }
        .panel-corner.br { bottom: 8px; right: 8px; border-width: 0 1px 1px 0; }

        /* Scrollbar global */
        * { scrollbar-width: thin; scrollbar-color: #1e293b transparent; }
      `}</style>

      {/* 3D Background */}
      <div className="canvas-wrap">
        <ThreeBackground />
      </div>

      {/* UI Layer */}
      <div className="ui-layer">

        {/* Top Bar */}
        <header className="topbar">
          <div>
            <div className="logo">PERSONAL·AI</div>
            <div className="logo-sub">Neural Interface v2.0</div>
          </div>
          <div className="topbar-right">
            <div className="status-pill">
              <div className="status-dot" />
              SYSTEM ONLINE
            </div>
            <div className="time-display">
              {new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
            </div>
          </div>
        </header>

        {/* Panels */}
        <main className="panels">

          {/* Chat Panel */}
          <div className="panel">
            <div className="panel-corner tl" />
            <div className="panel-corner tr" />
            <div className="panel-corner bl" />
            <div className="panel-corner br" />

            <div className="panel-header">
              <div className="panel-icon chat">◈</div>
              <div className="panel-title chat">Neural Chat</div>
              <div className="panel-line" />
              <div className="panel-badge chat">LLM ACTIVE</div>
            </div>

            <div className="panel-content">
              <Chat />
            </div>
          </div>

          {/* Camera Panel */}
          <div className="panel">
            <div className="panel-corner tl" />
            <div className="panel-corner tr" />
            <div className="panel-corner bl" />
            <div className="panel-corner br" />

            <div className="panel-header">
              <div className="panel-icon cam">⬡</div>
              <div className="panel-title cam">Vision Scan</div>
              <div className="panel-line" />
              <div className="panel-badge cam">COCO-SSD</div>
            </div>

            <div className="panel-content">
              <ImageDetection />
            </div>
          </div>

        </main>

        {/* Bottom Bar */}
        <footer className="bottombar">
          <div className="bottom-info">
            SYS · <span>NODE_ENV: PRODUCTION</span>
          </div>
          <div className="bottom-info">
            POWERED BY <span>TENSORFLOW + ANTHROPIC</span>
          </div>
          <div className="bottom-info">
            <span>© 2025 NEXUS AI SYSTEMS</span>
          </div>
        </footer>

      </div>
    </>
  );
}
