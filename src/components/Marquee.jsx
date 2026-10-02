import React from 'react';

export default function Marquee() {
  const items = [
    { text: '⚡ JITHON \'27', color: 'text-brand-lime' },
    { text: '🏛️ JIT COLLEGE OF ENGINEERING', color: 'text-brand-cyan' },
    { text: '⚡ 36 HOURS NON-STOP', color: 'text-brand-lime' },
    { text: '💰 ₹15,000 CASH PRIZES', color: 'text-brand-magenta' },
    { text: '📍 JIT HIGH-TECH CAMPUS & LABS', color: 'text-brand-lime' },
    { text: '🍕 FREE FOOD & RED BULL FOR ALL HACKERS', color: 'text-white' },
    { text: '🤖 AUTONOMOUS AI AGENTS', color: 'text-brand-magenta' },
    { text: '🚀 DIRECT SEED FUNDING OPPORTUNITY', color: 'text-brand-lime' },
    { text: '📍 IN JIT CAMPUS ONLY', color: 'text-brand-cyan' },
  ];

  return (
    <div className="border-y border-brand-border bg-black py-3 overflow-hidden select-none relative">
      <div className="animate-marquee font-mono text-sm tracking-widest uppercase font-black text-slate-300">
        {/* Render twice for seamless loop */}
        {[...items, ...items].map((item, idx) => (
          <React.Fragment key={idx}>
            <span className={`mx-4 ${item.color}`}>{item.text}</span>
            <span className="mx-4 text-white">•</span>
          </React.Fragment>
        ))}
      </div>
    </div>
  );
}
