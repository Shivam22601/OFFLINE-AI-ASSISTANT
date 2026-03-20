# 🧠 Offline AI Assistant

> A fully local, privacy-first AI system powered by Ollama + Mistral — no cloud, no cost, no compromise.

![Status](https://img.shields.io/badge/Status-Active-brightgreen?style=flat-square)
![React](https://img.shields.io/badge/Frontend-React.js-61DAFB?style=flat-square&logo=react)
![Node](https://img.shields.io/badge/Backend-Node.js-339933?style=flat-square&logo=node.js)
![Ollama](https://img.shields.io/badge/AI_Runtime-Ollama-black?style=flat-square)
![License](https://img.shields.io/badge/License-MIT-yellow?style=flat-square)
![PRs Welcome](https://img.shields.io/badge/PRs-Welcome-brightgreen?style=flat-square)
![Offline](https://img.shields.io/badge/Works-Offline-blue?style=flat-square)

---

## 🖼️ Preview

![Offline AI Assistant UI](./PHOTO-2026-03-20-22-44-33.jpg)

> Left: **Neural Chat** with Mistral LLM | Right: **Vision Scan** with real-time object detection (COCO-SSD)

---
---

## 🎥 Demo Video

<p align="center">
  <a href="https://youtu.be/zapYIX-w0ds?si=Ynq1uRGe-mBz0_lR">
    <img src="https://img.youtube.com/vi/zapYIX-w0ds/maxresdefault.jpg" alt="Watch Demo Video" width="80%" />
  </a>
</p>

<p align="center">
  <b>▶️ Click above to watch the full demo on YouTube</b>
</p>

---

## 📌 What Is This?

**Offline AI Assistant** is a self-hosted AI application that runs entirely on your local machine. It combines a React-based frontend with a Node.js backend and uses **Ollama** to serve the **Mistral LLM** — giving you a powerful conversational AI without sending a single byte to the cloud.

It also includes a **real-time object detection** module powered by TensorFlow.js (COCO-SSD), accessible directly from your browser camera.

---

## ✨ Features

| Feature | Description | Status |
|---|---|---|
| 💬 **AI Chat** | Real-time conversation with Mistral LLM via Ollama | ✅ Live |
| 👁️ **Vision Scan** | Live object detection using your webcam + TensorFlow.js | ✅ Live |
| 🔒 **100% Private** | All processing happens on your machine — nothing leaves it | ✅ Live |
| ⚡ **No API Cost** | Completely free to run after initial setup | ✅ Live |
| 🌐 **Works Offline** | No internet required after model download | ✅ Live |
| 🎤 **Voice Input** | Speech-to-Text support | 🔜 Coming |
| 📱 **Mobile PWA** | Progressive Web App for mobile | 🔜 Coming |

---

## 🏗️ Tech Stack

| Layer | Technology | Purpose |
|---|---|---|
| Frontend | React.js | UI components & state management |
| Styling | Tailwind CSS | Responsive design |
| Backend | Node.js + Express.js | API server & request routing |
| AI Runtime | Ollama | Local LLM process manager |
| Language Model | Mistral 7B | Natural language responses |
| Vision Runtime | TensorFlow.js | In-browser ML inference |
| Vision Model | COCO-SSD | Real-time object detection |
| 3D Background | Three.js | Animated UI background |

---

## 🌐 Offline vs Online AI — Why It Matters

| Factor | ☁️ Cloud AI (ChatGPT, Gemini) | 💻 This Project (Offline AI) |
|---|---|---|
| 💸 Cost | Paid API per request | Free after setup |
| 🔒 Privacy | Data sent to external servers | 100% on your machine |
| 🌐 Internet | Required always | Only for setup |
| ⚡ Latency | Depends on network | Local — no network delay |
| 🧠 Model Control | Fixed by provider | You choose the model |
| 📦 Data Ownership | Provider stores logs | You own everything |
| 🔌 Availability | Server downtime possible | Always available |
| 🛠️ Customization | Limited | Full control |

---

## 🔄 System Architecture

```
┌─────────────────────────────────────────────────────────┐
│                         USER                            │
│           Interacts via browser at localhost:5173       │
└────────────────┬────────────────────────┬───────────────┘
                 │                        │
                 ▼                        ▼
┌───────────────────────┐   ┌───────────────────────────┐
│      NEURAL CHAT      │   │       VISION SCAN         │
│   React.js + Tailwind │   │   React.js + Tailwind     │
└──────────┬────────────┘   └────────────┬──────────────┘
           │                             │
           ▼                             ▼
┌───────────────────────┐   ┌───────────────────────────┐
│   NODE.JS BACKEND     │   │      TENSORFLOW.JS        │
│  Express + ollama     │   │  Runs entirely in-browser │
│     Service.js        │   │     (no server needed)    │
└──────────┬────────────┘   └────────────┬──────────────┘
           │                             │
           ▼                             ▼
┌───────────────────────┐   ┌───────────────────────────┐
│   OLLAMA RUNTIME      │   │      COCO-SSD MODEL       │
│  Local AI process     │   │  Object detection, local  │
└──────────┬────────────┘   └───────────────────────────┘
           │
           ▼
┌───────────────────────┐
│     MISTRAL LLM       │
│  Offline language     │
│       model           │
└───────────────────────┘

← ← ← Response flows back up the same chain ← ← ←
```

---

## 💬 Chat Request Flow

```
User types message
       │
       ▼
React Frontend (Chat.jsx)
       │
       │  POST /api/chat
       ▼
Express Backend (server.js)
       │
       │  HTTP request to Ollama
       ▼
ollamaService.js
       │
       │  localhost:11434/api/generate
       ▼
Ollama Runtime
       │
       │  inference
       ▼
Mistral LLM Model
       │
       │  generated text (streamed)
       ▼
Back to Frontend → Displayed in Chat UI
```

---

## 👁️ Vision Scan Flow

```
User clicks "Init Cam"
       │
       ▼
Browser asks camera permission
       │
       ▼
Webcam stream starts (MediaDevices API)
       │
       ▼
User clicks "Scan"
       │
       ▼
TensorFlow.js loads COCO-SSD model
       │  (from /public/coco-ssd — fully local)
       ▼
Model runs inference on video frame
       │
       ▼
Detected objects + confidence % returned
       │
       ▼
Bounding boxes drawn on canvas
       │
       ▼
Labels shown below (e.g. PERSON 91%)

⚠️  No data leaves the browser at any point
```

---

## 🧠 Offline Use Cases

| Use Case | Description |
|---|---|
| 🔐 Sensitive Data Analysis | Analyze private documents without cloud exposure |
| 🏥 Medical / Legal Queries | Ask sensitive questions with zero data leak risk |
| ✈️ Travel / No Internet Zones | Full AI access on flights, remote areas |
| 🏫 Education & Learning | Students using AI without subscription costs |
| 🏭 Enterprise Air-Gap Env | Orgs where internet access is restricted |
| 👨‍💻 Local Dev Assistant | Code help without sending proprietary code to APIs |
| 🎥 Offline Vision Detection | Security camera analysis without cloud upload |
| 🧪 AI Research & Testing | Run and modify models freely without API limits |

---

## 📂 Project Structure

```
offline-ai-assistant/
│
├── backend/
│   ├── services/
│   │   └── ollamaService.js       # Handles Ollama API calls
│   ├── utils/
│   │   └── server.js              # Express server entry point
│   └── package.json
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── Chat.jsx           # AI chat interface
│   │   │   ├── ImageDetection.jsx # Webcam + object detection
│   │   │   └── ThreeBackground.jsx# 3D animated background
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── index.css
│   └── package.json
│
├── public/
│   └── coco-ssd/                  # Local TensorFlow model files
│
├── screenshot.png                 # Preview image
└── README.md
```

---

## ⚙️ Getting Started

### 📋 Prerequisites

| Requirement | Version | Link |
|---|---|---|
| Node.js | v18+ | [nodejs.org](https://nodejs.org) |
| npm | v9+ | Comes with Node.js |
| Ollama | Latest | [ollama.com](https://ollama.com) |
| RAM | 8GB+ recommended | — |
| Storage | ~5GB for Mistral model | — |

---

### 🚀 Setup — Step by Step

**Step 1 — Clone the repo**
```bash
git clone https://github.com/your-username/offline-ai-assistant.git
cd offline-ai-assistant
```

**Step 2 — Install & start Ollama**
```bash
# Download from https://ollama.com and install, then:
ollama pull mistral

# Verify it works:
ollama run mistral "hello"
```

**Step 3 — Start the backend**
```bash
cd backend
npm install
node server.js
```
> ✅ You should see: `Server running on port 3000`

**Step 4 — Start the frontend**
```bash
# Open a new terminal tab
cd frontend
npm install
npm run dev
```
> ✅ You should see: `Local: http://localhost:5173`

**Step 5 — Open in browser**
```
http://localhost:5173
```

---

### 🖥️ What Runs Where

| Service | Command | Port | Terminal |
|---|---|---|---|
| Ollama runtime | `ollama run mistral` | 11434 | Tab 1 |
| Node backend | `node server.js` | 3000 | Tab 2 |
| React frontend | `npm run dev` | 5173 | Tab 3 |

> All three must be running at the same time for the app to work.

---

### ⚠️ Common Errors & Fixes

| Error | Cause | Fix |
|---|---|---|
| `Cannot connect to Ollama` | Ollama not running | Run `ollama run mistral` first |
| `Port 3000 already in use` | Another process on 3000 | Kill it: `lsof -ti:3000 \| xargs kill` |
| `Camera not found` | Browser permission denied | Allow camera in browser settings |
| `Model not found` | Mistral not pulled | Run `ollama pull mistral` |
| Slow responses | Low RAM / CPU | Close other apps, use GPU if available |

---

## 🖥️ Usage

- **Neural Chat** — Type your prompt and get AI responses generated locally by Mistral.
- **Vision Scan** — Allow camera access and watch the model detect real-world objects in real time.

---

## 🤖 Supported Ollama Models

You can swap Mistral for any of these by changing the model name in `ollamaService.js`:

| Model | Size | Best For |
|---|---|---|
| `mistral` | ~4GB | General chat — used in this project |
| `llama3` | ~4.7GB | Reasoning & instruction following |
| `phi3` | ~2.3GB | Fast responses, low RAM usage |
| `gemma` | ~5GB | Google's open model |
| `codellama` | ~3.8GB | Code generation & debugging |
| `neural-chat` | ~4GB | Conversational AI |

---

## 🔐 Privacy First

Unlike cloud-based AI tools, this project:

- ✅ Stores **nothing** on external servers
- ✅ Sends **no data** over the internet during inference
- ✅ Runs the full model pipeline **on your hardware**
- ✅ Works in **airplane mode**
- ✅ No account, no login, no tracking

---

## 🧪 Known Challenges

| Challenge | Details |
|---|---|
| Hardware dependency | LLM speed depends on your CPU/GPU/RAM |
| First load time | COCO-SSD model takes a few seconds to load in browser |
| Startup order | Ollama must be running before the backend starts |
| Memory usage | Mistral uses ~4–5GB RAM while running |

---

## 🔮 Roadmap

| Feature | Priority | Status |
|---|---|---|
| 🎤 Voice input/output (STT + TTS) | High | 🔜 Planned |
| 📱 PWA / Mobile support | Medium | 🔜 Planned |
| 🗂️ Persistent chat history | Medium | 🔜 Planned |
| 🧠 Multi-model switcher UI | High | 🔜 Planned |
| 🔍 Advanced vision models | Low | 🔜 Planned |
| 🌐 LAN sharing (local network) | Medium | 🔜 Planned |

---

## 🤝 Contributing

Contributions, suggestions, and bug reports are welcome!

```bash
# Fork the repo and create your branch
git checkout -b feature/your-feature-name

# Commit your changes
git commit -m "feat: add your feature description"

# Push and open a Pull Request
git push origin feature/your-feature-name
```

Please follow conventional commit messages and keep PRs focused.

---

## 📜 License

This project is licensed under the [MIT License](LICENSE).

---

## 🙌 Acknowledgements

- [Ollama](https://ollama.com) — Local model runtime
- [Mistral AI](https://mistral.ai) — Open-weight LLM
- [TensorFlow.js](https://www.tensorflow.org/js) — Browser-based ML
- [COCO-SSD](https://github.com/tensorflow/tfjs-models/tree/master/coco-ssd) — Object detection model

---

## 📬 Connect

- GitHub: [@your-username](https://github.com/Shivam22601)
- LinkedIn: [your-profile](www.linkedin.com/in/shivam-mishra-b9ba93274)

---

<p align="center">
  <b>⭐ If this project helped you, consider giving it a star!</b><br/>
  <i>Your AI. Your Data. Your Machine.</i>
</p>
