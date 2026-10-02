import React from 'react';
import { Bot, Cpu } from 'lucide-react';

export default function Tracks() {
  return (
    <section id="tracks" className="py-20 relative bg-black/40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div>
            <span className="font-mono text-xs text-brand-cyan uppercase tracking-widest bg-brand-cyan/10 px-3 py-1 rounded border border-brand-cyan/20">
              PICK YOUR ARENA
            </span>
            <h2 className="font-display font-extrabold text-3xl sm:text-5xl mt-3 tracking-tight">
              WHAT ARE YOU COOKING?
            </h2>
          </div>
          <p className="text-slate-400 font-sans max-w-md text-sm">
            4 high-voltage tracks designed for student engineers, prompt designers, hardware hackers, and internet builders.
          </p>
        </div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

          {/* Track 1: AI Agents (2 cols) */}
          <div className="md:col-span-2 glass-card rounded-3xl p-8 relative overflow-hidden group hover:border-brand-lime transition-all">
            <div className="absolute top-0 right-0 p-8 text-brand-lime/10 group-hover:text-brand-lime/20 transition-colors pointer-events-none">
              <Bot className="w-36 h-36" />
            </div>
            <div className="relative z-10 flex flex-col h-full justify-between">
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <span className="px-3 py-1 rounded-full bg-brand-lime text-black font-mono text-xs font-black">
                    TRACK 01
                  </span>
                  <span className="text-xs font-mono text-brand-lime font-bold">
                    FEATURED TRACK
                  </span>
                </div>
                <h3 className="font-display font-black text-2xl sm:text-3xl text-white mb-3">
                  AUTONOMOUS AI & AGENTS
                </h3>
                <p className="text-slate-300 text-sm leading-relaxed mb-6 max-w-xl">
                  Tired of simple ChatGPT wrappers? Build multi-agent swarms that execute real work, autonomous coding engines, self-operating social accounts, or tools that replace entire SaaS verticals.
                </p>
              </div>
              <div className="flex flex-wrap gap-2 pt-4 border-t border-white/10 font-mono text-xs">
                <span className="px-2.5 py-1 rounded bg-white/5 text-slate-300">#AgenticWorkflows</span>
                <span className="px-2.5 py-1 rounded bg-white/5 text-slate-300">#LocalLLMs</span>
                <span className="px-2.5 py-1 rounded bg-white/5 text-slate-300">#VoiceAgents</span>
                <span className="px-2.5 py-1 rounded bg-white/5 text-slate-300">#MCP-Tools</span>
              </div>
            </div>
          </div>

          {/* Track 2: Consumer & Brainrot */}
          <div className="glass-card rounded-3xl p-8 relative overflow-hidden group hover:border-brand-magenta transition-all">
            <div className="flex flex-col h-full justify-between">
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <span className="px-3 py-1 rounded-full bg-brand-magenta text-white font-mono text-xs font-black">
                    TRACK 02
                  </span>
                  <span className="text-xs font-mono text-brand-magenta font-bold">VIRAL & CONSUMER</span>
                </div>
                <h3 className="font-display font-black text-2xl text-white mb-3">
                  BRAINROT TO PRODUCT
                </h3>
                <p className="text-slate-300 text-sm leading-relaxed mb-6">
                  Turn viral culture into functional, addictive internet toys. Micro-social platforms, hyper-niche games, attention-economy hacking apps.
                </p>
              </div>
              <div className="flex flex-wrap gap-2 pt-4 border-t border-white/10 font-mono text-xs">
                <span className="px-2.5 py-1 rounded bg-white/5 text-slate-300">#Consumer</span>
                <span className="px-2.5 py-1 rounded bg-white/5 text-slate-300">#ViralGrowth</span>
                <span className="px-2.5 py-1 rounded bg-white/5 text-slate-300">#SocialGimmicks</span>
              </div>
            </div>
          </div>

          {/* Track 3: Crypto & Degen */}
          <div className="glass-card rounded-3xl p-8 relative overflow-hidden group hover:border-brand-cyan transition-all">
            <div className="flex flex-col h-full justify-between">
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <span className="px-3 py-1 rounded-full bg-brand-cyan text-black font-mono text-xs font-black">
                    TRACK 03
                  </span>
                  <span className="text-xs font-mono text-brand-cyan font-bold">WEB3 & DEGEN</span>
                </div>
                <h3 className="font-display font-black text-2xl text-white mb-3">
                  DEGEN RAILS & CRYPTO
                </h3>
                <p className="text-slate-300 text-sm leading-relaxed mb-6">
                  Micro-tipping bots, decentralized physical infrastructure (DePIN), prediction markets, zero-knowledge identity, or on-chain agent wallets.
                </p>
              </div>
              <div className="flex flex-wrap gap-2 pt-4 border-t border-white/10 font-mono text-xs">
                <span className="px-2.5 py-1 rounded bg-white/5 text-slate-300">#Solana</span>
                <span className="px-2.5 py-1 rounded bg-white/5 text-slate-300">#Base</span>
                <span className="px-2.5 py-1 rounded bg-white/5 text-slate-300">#ZKProofs</span>
              </div>
            </div>
          </div>

          {/* Track 4: Hardware & Spatial (2 cols) */}
          <div className="md:col-span-2 glass-card rounded-3xl p-8 relative overflow-hidden group hover:border-brand-purple transition-all">
            <div className="absolute top-0 right-0 p-8 text-brand-purple/10 group-hover:text-brand-purple/20 transition-colors pointer-events-none">
              <Cpu className="w-36 h-36" />
            </div>
            <div className="relative z-10 flex flex-col h-full justify-between">
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <span className="px-3 py-1 rounded-full bg-brand-purple text-white font-mono text-xs font-black">
                    TRACK 04
                  </span>
                  <span className="text-xs font-mono text-purple-300 font-bold">
                    HARDWARE & IOT
                  </span>
                </div>
                <h3 className="font-display font-black text-2xl sm:text-3xl text-white mb-3">
                  HARDWARE GREMLINS & SPATIAL
                </h3>
                <p className="text-slate-300 text-sm leading-relaxed mb-6 max-w-xl">
                  Touch grass and wire up some circuits. Micro-controllers, Raspberry Pi surveillance bots, AR glasses hacks, smart wearables that ping when someone's talking cap.
                </p>
              </div>
              <div className="flex flex-wrap gap-2 pt-4 border-t border-white/10 font-mono text-xs">
                <span className="px-2.5 py-1 rounded bg-white/5 text-slate-300">#RaspberryPi</span>
                <span className="px-2.5 py-1 rounded bg-white/5 text-slate-300">#ESP32</span>
                <span className="px-2.5 py-1 rounded bg-white/5 text-slate-300">#Wearables</span>
                <span className="px-2.5 py-1 rounded bg-white/5 text-slate-300">#SpatialComputing</span>
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
