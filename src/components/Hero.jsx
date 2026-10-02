import React, { useState, useEffect } from 'react';
import { Sparkles, ChevronDown } from 'lucide-react';
import { playBeep } from '../utils/audio';

export default function Hero({ onOpenRegister, sfxEnabled }) {
  const calculateTimeLeft = () => {
    const targetDate = new Date('2027-01-01T09:00:00');
    const now = new Date().getTime();
    const diff = targetDate.getTime() - now;

    if (diff <= 0) {
      return { days: 0, hours: 0, mins: 0, secs: 0 };
    }

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const mins = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const secs = Math.floor((diff % (1000 * 60)) / 1000);

    return { days, hours, mins, secs };
  };

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft);

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative pt-12 pb-20 md:pt-20 md:pb-28 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Floating Badges */}
        <div className="flex flex-wrap items-center justify-center gap-3 mb-8">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-brand-lime/15 border border-brand-lime text-brand-lime font-mono text-xs font-black uppercase tracking-wider">
            <span>⚡ JITHON '27</span>
          </div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 border border-white/20 text-white font-mono text-xs font-bold uppercase tracking-wider">
            <span>🏛️ JIT COLLEGE OF ENGINEERING</span>
          </div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-lime/10 border border-brand-lime/30 text-brand-lime font-mono text-xs font-bold uppercase tracking-wider animate-bounce">
            <span className="w-2 h-2 rounded-full bg-brand-lime animate-ping"></span>
            JANUARY 1-3, 2027 // JIT CAMPUS ONLY
          </div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-magenta/10 border border-brand-magenta/30 text-brand-magenta font-mono text-xs font-bold">
            <span>🔥 ₹15,000 TOTAL CASH PRIZES</span>
          </div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-cyan/10 border border-brand-cyan/30 text-brand-cyan font-mono text-xs">
            <span>⚡ DEPT. OF COMPUTER ENGINEERING & INNOVATION CELL</span>
          </div>
        </div>

        {/* Main Headline */}
        <div className="text-center max-w-5xl mx-auto">
          <h1 className="font-display font-extrabold text-5xl sm:text-7xl lg:text-8xl tracking-tight leading-[0.95] uppercase mb-6">
            COOK CODE. <br className="hidden sm:inline" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-lime via-brand-cyan to-brand-magenta animate-pulse">
              GET THE BAG.
            </span>
            <br />
            NO CAP.
          </h1>

          <p className="max-w-2xl mx-auto text-lg sm:text-xl text-slate-300 font-sans font-medium mb-10 leading-relaxed">
            Welcome to <strong className="text-brand-lime font-bold">JITHON '27</strong>, hosted exclusively at{' '}
            <strong className="text-white border-b border-brand-lime pb-0.5">
              JIT College of Engineering
            </strong>
            . 36 hours of pure unadulterated hacking chaos. 1,000+ student builders, AI prompt engineers, designers, and memelords building things that shouldn't exist but do.
          </p>

          {/* Hero CTAs */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6 mb-16">
            <button
              onClick={() => {
                playBeep(900, 0.1, 'triangle', sfxEnabled);
                onOpenRegister();
              }}
              className="w-full sm:w-auto px-8 py-4 rounded-xl bg-brand-lime text-black font-display font-black text-lg neo-shadow-cyan hover:-translate-y-1 hover:bg-[#d8ff33] active:translate-y-0 active:shadow-none transition-all flex items-center justify-center gap-3 cursor-pointer"
            >
              <span>REGISTER FOR HACKATHON</span>
              <Sparkles className="w-5 h-5" />
            </button>

            <a
              href="#tracks"
              onClick={() => playBeep(650, 0.05, 'sine', sfxEnabled)}
              className="w-full sm:w-auto px-8 py-4 rounded-xl bg-white/5 hover:bg-white/10 text-white font-mono text-base border border-white/15 hover:border-brand-cyan transition-all flex items-center justify-center gap-2"
            >
              <span>EXPLORE TRACKS</span>
              <ChevronDown className="w-4 h-4" />
            </a>
          </div>

          {/* Live Countdown Timer */}
          <div className="max-w-3xl mx-auto glass-card rounded-2xl p-6 sm:p-8 neo-shadow-white border border-white/20">
            <div className="flex items-center justify-between border-b border-white/10 pb-4 mb-6">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-red-500 animate-ping"></span>
                <span className="font-mono text-xs text-slate-300 font-bold tracking-widest uppercase">
                  HACKING COMMENCES IN:
                </span>
              </div>
              <div className="font-mono text-xs text-brand-lime bg-brand-lime/10 px-2.5 py-1 rounded border border-brand-lime/30">
                COUNTDOWN IS RUNNING
              </div>
            </div>

            {/* Timer Grid */}
            <div className="grid grid-cols-4 gap-3 sm:gap-6 text-center">
              <div className="bg-black/50 border border-white/10 rounded-xl p-3 sm:p-4">
                <div className="font-display font-black text-3xl sm:text-5xl text-brand-lime">
                  {String(timeLeft.days).padStart(2, '0')}
                </div>
                <div className="font-mono text-[10px] sm:text-xs text-slate-400 mt-1 uppercase tracking-wider">
                  DAYS
                </div>
              </div>

              <div className="bg-black/50 border border-white/10 rounded-xl p-3 sm:p-4">
                <div className="font-display font-black text-3xl sm:text-5xl text-brand-cyan">
                  {String(timeLeft.hours).padStart(2, '0')}
                </div>
                <div className="font-mono text-[10px] sm:text-xs text-slate-400 mt-1 uppercase tracking-wider">
                  HOURS
                </div>
              </div>

              <div className="bg-black/50 border border-white/10 rounded-xl p-3 sm:p-4">
                <div className="font-display font-black text-3xl sm:text-5xl text-brand-magenta">
                  {String(timeLeft.mins).padStart(2, '0')}
                </div>
                <div className="font-mono text-[10px] sm:text-xs text-slate-400 mt-1 uppercase tracking-wider">
                  MINUTES
                </div>
              </div>

              <div className="bg-black/50 border border-white/10 rounded-xl p-3 sm:p-4">
                <div className="font-display font-black text-3xl sm:text-5xl text-white">
                  {String(timeLeft.secs).padStart(2, '0')}
                </div>
                <div className="font-mono text-[10px] sm:text-xs text-slate-400 mt-1 uppercase tracking-wider">
                  SECONDS
                </div>
              </div>
            </div>
          </div>

        </div>

      </div>

      {/* Floating Gen Z Stickers */}
      <div className="hidden lg:block absolute top-28 left-8 animate-float">
        <div className="bg-brand-card border-2 border-brand-lime px-4 py-2 rounded-xl neo-shadow-lime font-mono text-xs font-bold text-brand-lime rotate-[-8deg]">
          // NO SLEEP CLUB ☕
        </div>
      </div>

      <div
        className="hidden lg:block absolute top-40 right-10 animate-float"
        style={{ animationDelay: '-2s' }}
      >
        <div className="bg-brand-card border-2 border-brand-magenta px-4 py-2 rounded-xl neo-shadow-magenta font-mono text-xs font-bold text-brand-magenta rotate-[6deg]">
          100% FREE PIZZA & BOBA 🧋
        </div>
      </div>

      <div
        className="hidden lg:block absolute bottom-12 left-16 animate-float"
        style={{ animationDelay: '-3.5s' }}
      >
        <div className="bg-brand-card border-2 border-brand-cyan px-4 py-2 rounded-xl neo-shadow-cyan font-mono text-xs font-bold text-brand-cyan rotate-[4deg]">
          SHIP &gt; TALK ⚡
        </div>
      </div>
    </section>
  );
}
