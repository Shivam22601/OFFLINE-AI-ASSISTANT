# 🧠 Offline AI Assistant

> A fully local, privacy-first AI system powered by Ollama + Mistral — no cloud, no cost, no compromise.

![Status](https://img.shields.io/badge/Status-Active-brightgreen?style=flat-square)
![React](https://img.shields.io/badge/Frontend-React.js-61DAFB?style=flat-square&logo=react)
![Node](https://img.shields.io/badge/Backend-Node.js-339933?style=flat-square&logo=node.js)
![Ollama](https://img.shields.io/badge/AI_Runtime-Ollama-black?style=flat-square)
![License](https://img.shields.io/badge/License-MIT-yellow?style=flat-square)

---

## 🖼️ Preview

![Offline AI Assistant UI](./screenshot.png)

> Left: **Neural Chat** with Mistral LLM | Right: **Vision Scan** with real-time object detection (COCO-SSD)

---

## 📌 What Is This?

**Offline AI Assistant** is a self-hosted AI application that runs entirely on your local machine. It combines a React-based frontend with a Node.js backend and uses **Ollama** to serve the **Mistral LLM** — giving you a powerful conversational AI without sending a single byte to the cloud.

It also includes a **real-time object detection** module powered by TensorFlow.js (COCO-SSD), accessible directly from your browser camera.

---

## ✨ Features

| Feature | Description |
|---|---|
| 💬 **AI Chat** | Real-time conversation with Mistral LLM via Ollama |
| 👁️ **Vision Scan** | Live object detection using your webcam + TensorFlow.js |
| 🔒 **100% Private** | All processing happens on your machine — nothing leaves it |
| ⚡ **No API Cost** | Completely free to run after initial setup |
| 🌐 **Works Offline** | No internet required after model download |

---

## 🏗️ Tech Stack

| Layer | Technology |
|---|---|
| Frontend | React.js, Tailwind CSS |
| Backend | Node.js, Express.js |
| AI Runtime | Ollama |
| Language Model | Mistral |
| Vision Model | COCO-SSD via TensorFlow.js |

---

## 🔄 System Workflow

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
└── README.md
```

---

## ⚙️ Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) v18+
- [Ollama](https://ollama.com) installed on your machine

---

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/offline-ai-assistant.git
cd offline-ai-assistant
```

### 2. Install Ollama & Pull Mistral

```bash
# Install from https://ollama.com, then:
ollama pull mistral
```

### 3. Install Backend Dependencies

```bash
cd backend
npm install
```

### 4. Install Frontend Dependencies

```bash
cd ../frontend
npm install
```

### 5. Start the Backend

```bash
cd backend
node server.js
```

### 6. Start the Frontend

```bash
cd frontend
npm run dev
```

### 7. Open in Browser

```
http://localhost:5173
```

---

## 🖥️ Usage

- **Neural Chat** — Type your prompt and get AI responses generated locally by Mistral.
- **Vision Scan** — Allow camera access and watch the model detect real-world objects in real time.

---

## 🔐 Privacy First

Unlike cloud-based AI tools, this project:

- ✅ Stores **nothing** on external servers
- ✅ Sends **no data** over the internet during inference
- ✅ Runs the full model pipeline **on your hardware**
- ✅ Works in **airplane mode**

---

## 🧪 Known Challenges

- LLM inference speed depends on your hardware (CPU/GPU)
- Browser-based vision models have memory limitations
- Ollama must be running before starting the backend

---

## 🔮 Roadmap

- [ ] 🎤 Voice input/output (Speech-to-Text + TTS)
- [ ] 📱 PWA support for mobile devices
- [ ] 🧠 Support for additional Ollama models (LLaMA 3, Phi-3, Gemma)
- [ ] 🗂️ Persistent chat history with local storage
- [ ] 🔍 Advanced vision model integration

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

- GitHub: [@your-username](https://github.com/your-username)
- LinkedIn: [your-profile](https://linkedin.com/in/your-profile)

---

<p align="center">
  <b>⭐ If this project helped you, consider giving it a star!</b><br/>
  <i>Your AI. Your Data. Your Machine.</i>
</p>
