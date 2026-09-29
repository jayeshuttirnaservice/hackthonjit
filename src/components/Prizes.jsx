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
            $50,000 UP FOR GRABS.
          </h2>
          <p className="text-slate-400 font-sans mt-3">
            Straight non-dilutive cold cash, GPU cloud compute credits, VC fast-track intros, and legendary custom hardware trophies.
          </p>
        </div>

        {/* Podium Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-end mb-16">
          
          {/* 2nd Place */}
          <div className="glass-card rounded-3xl p-8 border-2 border-white/20 neo-shadow-cyan text-center order-2 md:order-1 relative">
            <div className="inline-block px-4 py-1 rounded-full bg-brand-cyan/20 text-brand-cyan font-mono text-xs font-bold mb-4">
              🥈 2ND PLACE OVERALL
            </div>
            <div className="font-display font-black text-5xl text-white mb-2">$12,000</div>
            <div className="text-sm font-mono text-slate-400 mb-6">+ $15,000 Cloud Compute Credits</div>
            <ul className="text-left font-mono text-xs space-y-3 border-t border-white/10 pt-6 text-slate-300">
              <li className="flex items-center gap-2">
                <Check className="w-4 h-4 text-brand-cyan" /> Direct fast-track into top accelerator
              </li>
              <li className="flex items-center gap-2">
                <Check className="w-4 h-4 text-brand-cyan" /> 1-on-1 VC Pitch & Mentorship
              </li>
              <li className="flex items-center gap-2">
                <Check className="w-4 h-4 text-brand-cyan" /> Custom Silver Mechanical Keyboard
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
            <div className="font-display font-black text-6xl text-brand-lime mb-2">$25,000</div>
            <div className="text-sm font-mono text-slate-300 font-bold mb-6">+ $35,000 In Cloud & GPU Credits</div>
            <ul className="text-left font-mono text-xs space-y-3.5 border-t border-white/10 pt-6 text-slate-200">
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-brand-lime" /> $25K Cash (no equity taken, direct wire)
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-brand-lime" /> Guaranteed demo meeting with Tier-1 Partner VCs
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-brand-lime" /> Hand-forged Cyberpunk Champion Ring & Trophy
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-brand-lime" /> Front page feature across developer media
              </li>
            </ul>
          </div>

          {/* 3rd Place */}
          <div className="glass-card rounded-3xl p-8 border-2 border-white/20 neo-shadow-magenta text-center order-3 relative">
            <div className="inline-block px-4 py-1 rounded-full bg-brand-magenta/20 text-brand-magenta font-mono text-xs font-bold mb-4">
              🥉 3RD PLACE OVERALL
            </div>
            <div className="font-display font-black text-5xl text-white mb-2">$6,000</div>
            <div className="text-sm font-mono text-slate-400 mb-6">+ $10,000 Cloud Compute Credits</div>
            <ul className="text-left font-mono text-xs space-y-3 border-t border-white/10 pt-6 text-slate-300">
              <li className="flex items-center gap-2">
                <Check className="w-4 h-4 text-brand-magenta" /> Demo feature to 50,000+ engineers
              </li>
              <li className="flex items-center gap-2">
                <Check className="w-4 h-4 text-brand-magenta" /> Exclusive founder swag bag + hardware kits
              </li>
              <li className="flex items-center gap-2">
                <Check className="w-4 h-4 text-brand-magenta" /> Free Pro accounts across sponsor APIs
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
              <div className="font-display font-bold text-white text-base">BEST UI/UX DRIP</div>
              <div className="font-mono text-xs text-brand-lime font-bold">$2,500 BOUNTY</div>
              <p className="text-xs text-slate-400 mt-1">Smoothest animations, typography & pure aesthetic genius.</p>
            </div>
          </div>

          <div className="glass-card p-5 rounded-2xl border border-white/10 flex items-start gap-4">
            <div className="p-3 rounded-xl bg-brand-cyan/10 text-brand-cyan border border-brand-cyan/20">
              <Flame className="w-5 h-5" />
            </div>
            <div>
              <div className="font-display font-bold text-white text-base">FUNNIEST WORKING APP</div>
              <div className="font-mono text-xs text-brand-cyan font-bold">$2,000 BOUNTY</div>
              <p className="text-xs text-slate-400 mt-1">Absurd concepts executed with terrifying engineering perfection.</p>
            </div>
          </div>

          <div className="glass-card p-5 rounded-2xl border border-white/10 flex items-start gap-4">
            <div className="p-3 rounded-xl bg-brand-magenta/10 text-brand-magenta border border-brand-magenta/20">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <div className="font-display font-bold text-white text-base">BEST OPEN SOURCE TOOL</div>
              <div className="font-mono text-xs text-brand-magenta font-bold">$2,500 BOUNTY</div>
              <p className="text-xs text-slate-400 mt-1">A CLI, library, or devtool that 10x's developer happiness.</p>
            </div>
          </div>

          <div className="glass-card p-5 rounded-2xl border border-white/10 flex items-start gap-4">
            <div className="p-3 rounded-xl bg-purple-500/10 text-brand-purple border border-brand-purple/20">
              <Sparkle className="w-5 h-5" />
            </div>
            <div>
              <div className="font-display font-bold text-white text-base">PEOPLE'S CHOICE</div>
              <div className="font-mono text-xs text-brand-purple font-bold">COMMUNITY VOTE</div>
              <p className="text-xs text-slate-400 mt-1">Voted live by hackers and Discord watchers during pitch night.</p>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
