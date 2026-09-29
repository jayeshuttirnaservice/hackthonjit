import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { playBeep } from '../utils/audio';

export default function Stats({ sfxEnabled }) {
  const [hypeCount, setHypeCount] = useState(4289);

  const boostHype = () => {
    setHypeCount((prev) => prev + 1);

    confetti({
      particleCount: 25,
      spread: 45,
      origin: { y: 0.8 },
      colors: ['#ccff00', '#00f0ff', '#ff007a'],
    });

    playBeep(1200, 0.1, 'square', sfxEnabled);
  };

  return (
    <section id="about" className="py-20 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="font-mono text-xs text-brand-lime uppercase tracking-widest bg-brand-lime/10 px-3 py-1 rounded border border-brand-lime/20">
            THE NUMBERS DON'T LIE
          </span>
          <h2 className="font-display font-extrabold text-3xl sm:text-5xl mt-4 mb-4 tracking-tight">
            BUILT BY DEGENS, FOR BUILDERS.
          </h2>
          <p className="text-slate-400 font-sans">
            Forget boring corporate hackathons with stiff speeches. Hosted at{' '}
            <strong className="text-white">JIT College of Engineering</strong>, JITUrnHACK is high adrenaline, zero slide decks, and 100% working code.
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
          
          <div className="glass-card p-6 rounded-2xl border border-white/10 hover:border-brand-lime transition-all text-center group">
            <div className="font-mono text-xs text-slate-400 mb-2">// TOTAL_BAG</div>
            <div className="font-display font-black text-4xl sm:text-5xl text-brand-lime group-hover:scale-105 transition-transform">
              $50K+
            </div>
            <div className="font-sans text-xs text-slate-300 mt-2">Cash, grants & seed bounties</div>
          </div>

          <div className="glass-card p-6 rounded-2xl border border-white/10 hover:border-brand-cyan transition-all text-center group">
            <div className="font-mono text-xs text-slate-400 mb-2">// BUILD_TIME</div>
            <div className="font-display font-black text-4xl sm:text-5xl text-brand-cyan group-hover:scale-105 transition-transform">
              36 HRS
            </div>
            <div className="font-sans text-xs text-slate-300 mt-2">Straight sprint. No downtime.</div>
          </div>

          <div className="glass-card p-6 rounded-2xl border border-white/10 hover:border-brand-magenta transition-all text-center group">
            <div className="font-mono text-xs text-slate-400 mb-2">// EXPECTED_HACKERS</div>
            <div className="font-display font-black text-4xl sm:text-5xl text-brand-magenta group-hover:scale-105 transition-transform">
              1,200+
            </div>
            <div className="font-sans text-xs text-slate-300 mt-2">JIT Campus in-person + online</div>
          </div>

          <div className="glass-card p-6 rounded-2xl border border-white/10 hover:border-brand-purple transition-all text-center group">
            <div className="font-mono text-xs text-slate-400 mb-2">// POWERED_BY</div>
            <div className="font-display font-black text-4xl sm:text-5xl text-brand-purple group-hover:scale-105 transition-transform">
              ∞ CAFFEINE
            </div>
            <div className="font-sans text-xs text-slate-300 mt-2">JIT Food Court, Chai & Monster</div>
          </div>

        </div>

        {/* Interactive Vibe Booster Easter Egg */}
        <div className="mt-12 glass-card p-6 rounded-2xl border border-white/10 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-brand-lime/10 border border-brand-lime flex items-center justify-center text-2xl">
              💥
            </div>
            <div>
              <h3 className="font-display font-bold text-lg text-white">COMMUNITY HYPE COUNTER</h3>
              <p className="text-xs font-mono text-slate-400">
                Click to pump the global hype before hacking starts at JIT
              </p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="font-mono text-2xl font-black text-brand-lime bg-black/60 px-4 py-2 rounded-lg border border-white/10">
              <span>{hypeCount.toLocaleString()}</span> <span className="text-xs text-slate-400">HYPES</span>
            </div>
            <button
              onClick={boostHype}
              className="px-5 py-3 rounded-xl bg-white/10 hover:bg-brand-lime hover:text-black font-display font-extrabold text-sm border border-white/20 transition-all flex items-center gap-2 cursor-pointer active:scale-95"
            >
              <span>🔥 SEND HYPE</span>
            </button>
          </div>
        </div>

      </div>
    </section>
  );
}
