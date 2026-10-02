# ⚡ JITHON '27 // JIT COLLEGE OF ENGINEERING (React.js Edition)

A high-energy, cyberpunk & neo-brutalist hackathon single-page application built with **React 19, Vite, Tailwind CSS v4, Lucide React, Canvas-Confetti, and Web Audio API**.

Presented by **JIT College of Engineering (Department of Computer Engineering & Student Innovation Cell)**.

---

## 🚀 Quick Start

### 1. Install Dependencies
```bash
npm install
```

### 2. Start Local Development Server
```bash
npm run dev
```
Open **[http://localhost:5173](http://localhost:5173)** in your browser.

### 3. Build for Production
```bash 
npm run build
```

---

## 📂 Project Architecture

```
hack/
├── index.html                  # HTML entry point with Google Fonts (Space Grotesk, Plus Jakarta Sans, JetBrains Mono)
├── package.json                # React, Lucide-React, Tailwind CSS, Canvas-Confetti
├── vite.config.js              # Vite configuration with @tailwindcss/vite & @vitejs/plugin-react
├── src/
│   ├── main.jsx                # Application root mounting
│   ├── App.jsx                 # Master layout combining state, audio toggle, and modals
│   ├── index.css               # Tailwind CSS v4 @theme, custom cyberpunk animations & utilities
│   ├── components/
│   │   ├── Navbar.jsx          # Sticky navigation, logo, SFX toggle, mobile menu
│   │   ├── Hero.jsx            # Dynamic live countdown timer, glowing badges, CTAs
│   │   ├── Marquee.jsx         # Infinite looping ticker with JIT & hackathon highlights
│   │   ├── Stats.jsx           # Metrics & interactive community hype counter + confetti
│   │   ├── CampusArena.jsx     # JIT College of Engineering campus facility showcase
│   │   ├── Tracks.jsx          # Bento grid of the 4 hackathon themes
│   │   ├── Prizes.jsx          # $50,000 Bag podium & special category bounties
│   │   ├── Schedule.jsx        # Interactive day-switcher timeline for the 36-hour sprint
│   │   ├── FAQ.jsx             # Expandable accordion answering common hacker questions
│   │   ├── RegisterModal.jsx   # Interactive modal with real-time digital holographic badge generator
│   │   └── Footer.jsx          # College accreditation, department credits, and socials
│   └── utils/
│       └── audio.js            # Zero-dependency Web Audio API synthesizer for 8-bit sound effects
```

---

## ✨ Features & State Management

- **Modular React Architecture**: Broken down into clean, focused components with reusable states.
- **Dynamic Digital VIP Hacker Pass Generator**: As users type their name, institution (*JIT College of Engineering* or external), email, and role, their holographic pass renders live with custom barcode and animation.
- **Real-Time Countdown**: React `useEffect` interval calculating remaining days, hours, minutes, and seconds.
- **Web Audio SFX**: Built-in audio synthesizer with on/off state toggleable in the header.
- **Interactive Hype Booster**: State counter incrementing with canvas-confetti bursts and retro audio feedback.
- **Campus Arena Bento**: Showcases JIT's 1Gbps Fiber LAN, AI/IoT computing labs, 800-seat Auditorium, and 24/7 food court.
