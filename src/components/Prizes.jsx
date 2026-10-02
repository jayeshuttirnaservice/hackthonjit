import React from 'react';
import { Palette, Flame, ShieldCheck, Sparkle, CheckCircle2, Check } from 'lucide-react';

export default function Prizes() {
  return (
    <section id="prizes" className="py-20 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="font-mono text-xs text-brand-magenta uppercase tracking-widest bg-brand-magenta/10 px-3 py-1 rounded border border-brand-magenta/20">
            THE BAG 💰
          </span>
          <h2 className="font-display font-extrabold text-3xl sm:text-5xl mt-3 tracking-tight">
            ₹15,000 CASH PRIZES.
          </h2>
          <p className="text-slate-400 font-sans mt-3">
            Direct cash prizes via UPI/Bank transfer, official JIT College of Engineering certificates of excellence, winner trophies, and verified participation certificates for all team members.
          </p>
        </div>

        {/* Podium Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-end mb-16">
          
          {/* 2nd Place */}
          <div className="glass-card rounded-3xl p-8 border-2 border-white/20 neo-shadow-cyan text-center order-2 md:order-1 relative">
            <div className="inline-block px-4 py-1 rounded-full bg-brand-cyan/20 text-brand-cyan font-mono text-xs font-bold mb-4">
              🥈 2ND PLACE OVERALL
            </div>
            <div className="font-display font-black text-5xl text-white mb-2">₹5,000</div>
            <ul className="text-left font-mono text-xs space-y-3 border-t border-white/10 pt-6 text-slate-300">
              <li className="flex items-center gap-2">
                <Check className="w-4 h-4 text-brand-cyan" /> Direct Cash Prize (UPI / Bank Transfer)
              </li>
              <li className="flex items-center gap-2">
                <Check className="w-4 h-4 text-brand-cyan" /> Official JIT Runner-Up Trophy & Memento
              </li>
              <li className="flex items-center gap-2">
                <Check className="w-4 h-4 text-brand-cyan" /> Certificate of Merit from JIT
              </li>
              <li className="flex items-center gap-2">
                <Check className="w-4 h-4 text-brand-cyan" /> Verified Certificate of Participation
              </li>
            </ul>
          </div>

          {/* 1st Place (Grand Champion) */}
          <div className="glass-card rounded-3xl p-8 border-2 border-brand-lime neo-shadow-lime text-center order-1 md:order-2 relative -translate-y-4 bg-gradient-to-b from-brand-lime/10 to-brand-card">
            <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1.5 rounded-full bg-brand-lime text-black font-display font-black text-xs uppercase tracking-wider neo-shadow-white">
              👑 GRAND CHAMPION
            </div>
            <div className="pt-4 inline-block px-4 py-1 rounded-full bg-brand-lime/20 text-brand-lime font-mono text-xs font-bold mb-4">
              🥇 1ST PLACE OVERALL
            </div>
            <div className="font-display font-black text-6xl text-brand-lime mb-2">₹7,000</div>
            <ul className="text-left font-mono text-xs space-y-3.5 border-t border-white/10 pt-6 text-slate-200">
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-brand-lime" /> Direct Cash Prize (UPI / Bank Transfer)
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-brand-lime" /> Official JIT Winner Trophy & Memento
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-brand-lime" /> Certificate of Excellence from JIT
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-brand-lime" /> Verified Certificate of Participation
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-brand-lime" /> Project Showcase on JIT Innovation Portal
              </li>
            </ul>
          </div>

          {/* 3rd Place */}
          <div className="glass-card rounded-3xl p-8 border-2 border-white/20 neo-shadow-magenta text-center order-3 relative">
            <div className="inline-block px-4 py-1 rounded-full bg-brand-magenta/20 text-brand-magenta font-mono text-xs font-bold mb-4">
              🥉 3RD PLACE OVERALL
            </div>
            <div className="font-display font-black text-5xl text-white mb-2">₹3,000</div>
            <ul className="text-left font-mono text-xs space-y-3 border-t border-white/10 pt-6 text-slate-300">
              <li className="flex items-center gap-2">
                <Check className="w-4 h-4 text-brand-magenta" /> Direct Cash Prize (UPI / Bank Transfer)
              </li>
              <li className="flex items-center gap-2">
                <Check className="w-4 h-4 text-brand-magenta" /> Official JIT 2nd Runner-Up Trophy
              </li>
              <li className="flex items-center gap-2">
                <Check className="w-4 h-4 text-brand-magenta" /> Certificate of Merit from JIT
              </li>
              <li className="flex items-center gap-2">
                <Check className="w-4 h-4 text-brand-magenta" /> Verified Certificate of Participation
              </li>
            </ul>
          </div>

        </div>

        {/* Special Bounties */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          
          <div className="glass-card p-5 rounded-2xl border border-white/10 flex items-start gap-4">
            <div className="p-3 rounded-xl bg-brand-lime/10 text-brand-lime border border-brand-lime/20">
              <Palette className="w-5 h-5" />
            </div>
            <div>
              <div className="font-display font-bold text-white text-base">BEST UI/UX DESIGN</div>
              <div className="font-mono text-xs text-brand-lime font-bold">CERTIFICATE & MEMENTO</div>
              <p className="text-xs text-slate-400 mt-1">Smoothest animations, typography & clean user interface.</p>
            </div>
          </div>

          <div className="glass-card p-5 rounded-2xl border border-white/10 flex items-start gap-4">
            <div className="p-3 rounded-xl bg-brand-cyan/10 text-brand-cyan border border-brand-cyan/20">
              <Flame className="w-5 h-5" />
            </div>
            <div>
              <div className="font-display font-bold text-white text-base">MOST CREATIVE APP</div>
              <div className="font-mono text-xs text-brand-cyan font-bold">CERTIFICATE & MEMENTO</div>
              <p className="text-xs text-slate-400 mt-1">Unique concepts executed with outstanding student creativity.</p>
            </div>
          </div>

          <div className="glass-card p-5 rounded-2xl border border-white/10 flex items-start gap-4">
            <div className="p-3 rounded-xl bg-brand-magenta/10 text-brand-magenta border border-brand-magenta/20">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <div className="font-display font-bold text-white text-base">BEST TECHNICAL BUILD</div>
              <div className="font-mono text-xs text-brand-magenta font-bold">CERTIFICATE & MEMENTO</div>
              <p className="text-xs text-slate-400 mt-1">Clean code architecture, solid engineering & practical utility.</p>
            </div>
          </div>

          <div className="glass-card p-5 rounded-2xl border border-white/10 flex items-start gap-4">
            <div className="p-3 rounded-xl bg-purple-500/10 text-brand-purple border border-brand-purple/20">
              <Sparkle className="w-5 h-5" />
            </div>
            <div>
              <div className="font-display font-bold text-white text-base">PEOPLE'S CHOICE</div>
              <div className="font-mono text-xs text-brand-purple font-bold">COMMUNITY RECOGNITION</div>
              <p className="text-xs text-slate-400 mt-1">Voted live by hackers and attendees during pitch presentations.</p>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
