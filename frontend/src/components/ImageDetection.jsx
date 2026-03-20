import { useRef, useState } from "react";
import * as tf from "@tensorflow/tfjs";

const COLORS = ["#00ffe7", "#a855f7", "#3b82f6", "#f59e0b", "#ec4899"];

export default function ImageDetection() {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const [results, setResults] = useState([]);
  const [status, setStatus] = useState("idle");
  const [errorMsg, setErrorMsg] = useState("");

  const startCamera = async () => {
    setStatus("streaming");
    setResults([]);
    setErrorMsg("");
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      videoRef.current.srcObject = stream;
    } catch (e) {
      setStatus("idle");
      setErrorMsg("⚠ Camera access denied.");
    }
  };

  const detect = async () => {
    setStatus("detecting");
    setResults([]);
    setErrorMsg("");

    try {
      // Load model directly from npm package (bundled locally, no internet needed)
      const cocoSsd = await import("@tensorflow-models/coco-ssd");
      // Local model use karo — internet ki zaroorat nahi
      const model = await cocoSsd.load({ modelUrl: "/coco-ssd/model.json" });

      const video = videoRef.current;
      const predictions = await model.detect(video);

      // Draw on canvas
      const canvas = canvasRef.current;
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      const ctx = canvas.getContext("2d");
      ctx.drawImage(video, 0, 0);

      predictions.forEach((pred, i) => {
        const color = COLORS[i % COLORS.length];
        const [x, y, w, h] = pred.bbox;
        ctx.strokeStyle = color;
        ctx.lineWidth = 2;
        ctx.strokeRect(x, y, w, h);
        ctx.fillStyle = color + "cc";
        ctx.fillRect(x, y - 22, w, 22);
        ctx.fillStyle = "#000";
        ctx.font = "bold 12px 'JetBrains Mono', monospace";
        ctx.fillText(`${pred.class} ${Math.round(pred.score * 100)}%`, x + 4, y - 6);
      });

      setResults(predictions);
      setStatus("done");
    } catch (e) {
      console.error(e);
      setStatus(videoRef.current?.srcObject ? "streaming" : "idle");
      setErrorMsg("⚠ Detection failed: " + e.message);
    }
  };

  return (
    <div className="det-root">
      <style>{`
        .det-root { display:flex; flex-direction:column; height:100%; font-family:'JetBrains Mono',monospace; gap:12px; }
        .det-viewport { position:relative; border:1px solid #00ffe730; border-radius:2px; overflow:hidden; background:#000; aspect-ratio:4/3; width:100%; }
        .det-viewport video { position:absolute; inset:0; width:100%; height:100%; object-fit:cover; }
        .det-viewport canvas { position:absolute; inset:0; width:100%; height:100%; object-fit:cover; z-index:2; }
        .scanline { position:absolute; inset:0; background:repeating-linear-gradient(0deg,transparent,transparent 2px,rgba(0,255,231,0.015) 2px,rgba(0,255,231,0.015) 4px); pointer-events:none; z-index:3; }
        .corner { position:absolute; width:16px; height:16px; border-color:#00ffe7; border-style:solid; z-index:4; }
        .corner.tl { top:6px; left:6px; border-width:2px 0 0 2px; }
        .corner.tr { top:6px; right:6px; border-width:2px 2px 0 0; }
        .corner.bl { bottom:6px; left:6px; border-width:0 0 2px 2px; }
        .corner.br { bottom:6px; right:6px; border-width:0 2px 2px 0; }
        .det-status { position:absolute; bottom:8px; right:10px; font-size:9px; letter-spacing:2px; text-transform:uppercase; z-index:4; color:#00ffe7; }
        .det-status.detecting { animation:blink 0.8s infinite; }
        @keyframes blink { 0%,100%{opacity:1} 50%{opacity:0.2} }
        .det-btn-row { display:flex; gap:8px; }
        .det-btn { flex:1; padding:9px; background:transparent; border:1px solid; font-family:'JetBrains Mono',monospace; font-size:10px; font-weight:700; letter-spacing:2px; text-transform:uppercase; cursor:pointer; border-radius:2px; transition:all 0.2s; }
        .det-btn.cam { border-color:#3b82f660; color:#3b82f6; }
        .det-btn.cam:hover { background:#3b82f620; }
        .det-btn.detect { border-color:#00ffe760; color:#00ffe7; }
        .det-btn.detect:hover:not(:disabled) { background:#00ffe720; }
        .det-btn:disabled { opacity:0.3; cursor:not-allowed; }
        .error-box { padding:10px 14px; border:1px solid #ef444440; border-left:3px solid #ef4444; background:rgba(239,68,68,0.05); border-radius:2px; font-size:10px; color:#fca5a5; line-height:1.7; }
        .error-box code { display:block; margin-top:6px; color:#f87171; background:rgba(0,0,0,0.3); padding:6px 10px; border-radius:2px; font-size:9px; letter-spacing:0.5px; }
        .det-results { flex:1; overflow-y:auto; display:flex; flex-direction:column; gap:6px; }
        .det-item { display:flex; align-items:center; gap:10px; padding:8px 12px; background:rgba(0,255,231,0.04); border-left:3px solid; border-radius:1px; animation:fadeSlide 0.3s ease forwards; }
        @keyframes fadeSlide { from{opacity:0;transform:translateX(-8px)} to{opacity:1;transform:translateX(0)} }
        .det-item-label { font-size:11px; font-weight:700; text-transform:uppercase; letter-spacing:1px; flex:1; }
        .det-item-score { font-size:10px; opacity:0.7; }
        .det-bar-bg { width:60px; height:3px; background:rgba(255,255,255,0.1); border-radius:2px; overflow:hidden; }
        .det-bar-fill { height:100%; border-radius:2px; transition:width 0.6s ease; }
        .det-empty { color:#334155; font-size:11px; letter-spacing:2px; text-transform:uppercase; text-align:center; padding:16px 0; }
      `}</style>

      <div className="det-viewport">
        <video ref={videoRef} autoPlay muted playsInline />
        <canvas ref={canvasRef} style={{ display: status === "done" ? "block" : "none" }} />
        <div className="scanline" />
        <div className="corner tl" /><div className="corner tr" />
        <div className="corner bl" /><div className="corner br" />
        <div className={`det-status ${status === "detecting" ? "detecting" : ""}`}>
          {status === "idle" && "◌ STANDBY"}
          {status === "streaming" && "● LIVE"}
          {status === "detecting" && "◉ SCANNING..."}
          {status === "done" && `✓ ${results.length} DETECTED`}
        </div>
      </div>

      <div className="det-btn-row">
        <button className="det-btn cam" onClick={startCamera}>⬡ INIT CAM</button>
        <button
          className="det-btn detect"
          onClick={detect}
          disabled={status === "idle" || status === "detecting"}
        >◈ SCAN</button>
      </div>

      {errorMsg && (
        <div className="error-box">
          {errorMsg}
          {errorMsg.includes("Detection failed") && (
            <code>
              Fix: npm install @tensorflow/tfjs @tensorflow-models/coco-ssd
            </code>
          )}
        </div>
      )}

      <div className="det-results">
        {results.length === 0 && !errorMsg
          ? <div className="det-empty">— No objects detected —</div>
          : results.map((item, i) => {
              const color = COLORS[i % COLORS.length];
              const pct = Math.round(item.score * 100);
              return (
                <div key={i} className="det-item" style={{ borderColor: color }}>
                  <div className="det-item-label" style={{ color }}>{item.class}</div>
                  <div className="det-bar-bg">
                    <div className="det-bar-fill" style={{ width: `${pct}%`, background: color }} />
                  </div>
                  <div className="det-item-score" style={{ color }}>{pct}%</div>
                </div>
              );
            })}
      </div>
    </div>
  );
}