import React from 'react';
import { Zap, ArrowRight } from 'lucide-react';
import { playBeep } from '../utils/audio';

export default function Footer({ onOpenRegister, sfxEnabled }) {
  return (
    <>
      {/* Bottom CTA Banner */}
      <section className="py-20 relative overflow-hidden">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative glass-card rounded-3xl p-8 sm:p-14 border-2 border-brand-lime neo-shadow-lime text-center overflow-hidden">
            <div className="absolute -right-20 -bottom-20 w-80 h-80 bg-brand-cyan/20 rounded-full blur-[100px] pointer-events-none"></div>
            <div className="absolute -left-20 -top-20 w-80 h-80 bg-brand-lime/20 rounded-full blur-[100px] pointer-events-none"></div>

            <span className="inline-block px-4 py-1.5 rounded-full bg-brand-lime text-black font-mono text-xs font-black uppercase mb-6">
              SPOTS ARE LIMITED TO 250 IN-PERSON AT JIT
            </span>

            <h2 className="font-display font-black text-4xl sm:text-6xl text-white tracking-tight uppercase max-w-3xl mx-auto mb-6">
              DON'T SLEEP ON THIS. <br />
              <span className="text-brand-lime">CLAIM YOUR HACKER PASS.</span>
            </h2>

            <p className="text-slate-300 font-sans max-w-xl mx-auto mb-8 text-base">
              Join 1,000+ ambitious creators building the future at JIT College of Engineering. Fast 60-second application. Instant confirmation.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <button
                onClick={() => {
                  playBeep(900, 0.1, 'triangle', sfxEnabled);
                  onOpenRegister();
                }}
                className="w-full sm:w-auto px-10 py-5 rounded-2xl bg-brand-lime text-black font-display font-black text-lg neo-shadow-cyan hover:bg-[#d8ff33] active:translate-y-1 transition-all flex items-center justify-center gap-3 cursor-pointer"
              >
                <span>REGISTER NOW — FREE</span>
                <ArrowRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Main Footer */}
      <footer className="border-t border-white/10 bg-brand-darker py-14 text-slate-400 font-mono text-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 pb-8 border-b border-white/10">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-lg bg-brand-lime flex items-center justify-center text-black font-black font-display text-lg neo-shadow-white">
                <Zap className="w-5 h-5 fill-black" />
              </div>
              <div>
                <div className="text-white font-display font-black text-lg tracking-tight">
                  JITUrnHACK '26 // JIT
                </div>
                <div className="text-[11px] text-slate-400">
                  HOSTED BY JIT COLLEGE OF ENGINEERING
                </div>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-6 text-xs">
              <a href="#about" className="hover:text-brand-lime transition-colors">
                ABOUT
              </a>
              <a href="#campus" className="hover:text-brand-cyan transition-colors">
                JIT CAMPUS
              </a>
              <a href="#tracks" className="hover:text-brand-cyan transition-colors">
                TRACKS
              </a>
              <a href="#prizes" className="hover:text-brand-magenta transition-colors">
                PRIZES
              </a>
              <a href="#schedule" className="hover:text-brand-lime transition-colors">
                SCHEDULE
              </a>
              <a href="#faqs" className="hover:text-white transition-colors">
                FAQ
              </a>
            </div>
          </div>

          <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-[11px] text-slate-500">
            <div>
              🏛️ Organized by the{' '}
              <strong className="text-slate-400">
                Department of Computer Engineering & Innovation Cell
              </strong>{' '}
              at <strong className="text-slate-400">JIT College of Engineering</strong>.
            </div>
            <div className="flex items-center gap-4">
              <span>© 2026 JIT COLLEGE OF ENGINEERING. ALL RIGHTS RESERVED.</span>
            </div>
          </div>

        </div>
      </footer>
    </>
  );
}
