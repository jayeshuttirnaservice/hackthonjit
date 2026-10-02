import React, { useState } from 'react';
import { Volume2, VolumeX, ArrowUpRight, Menu, X, Zap } from 'lucide-react';
import { playBeep } from '../utils/audio';

export default function Navbar({ onOpenRegister, sfxEnabled, onToggleSfx }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleLinkClick = (freq = 700) => {
    playBeep(freq, 0.05, 'triangle', sfxEnabled);
  };

  return (
    <>
      {/* Top Notice Banner */}
      <div className="bg-gradient-to-r from-brand-lime via-brand-cyan to-brand-magenta text-black py-1.5 px-4 text-xs font-mono font-bold tracking-wider uppercase text-center flex items-center justify-center gap-3 relative z-50">
        <span className="inline-flex items-center gap-1.5 bg-black text-brand-lime px-2 py-0.5 rounded text-[11px]">
          <span className="w-2 h-2 rounded-full bg-brand-lime animate-ping"></span>
          JIT COLLEGE OF ENGINEERING PRESENTS
        </span>
        <span className="truncate">
          ⚡ JITHON '27 • ON-CAMPUS AT JIT & GLOBAL VIRTUAL • REGISTRATIONS OPEN
        </span>
        <button
          onClick={() => {
            playBeep(850, 0.08, 'triangle', sfxEnabled);
            onOpenRegister();
          }}
          className="hidden md:inline-block underline font-black hover:text-white transition-colors cursor-pointer"
        >
          CLAIM YOUR PASS &rarr;
        </button>
      </div>

      {/* Main Sticky Navbar */}
      <header className="sticky top-0 z-40 backdrop-blur-xl bg-brand-darker/80 border-b border-white/10 transition-all duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          
          {/* Brand Logo */}
          <a
            href="#"
            onClick={() => handleLinkClick(650)}
            className="flex items-center gap-3 group"
          >
            <div className="w-10 h-10 rounded-lg bg-brand-lime flex items-center justify-center text-black font-display font-black text-xl neo-shadow-white group-hover:rotate-6 transition-transform">
              <Zap className="w-6 h-6 fill-black" />
            </div>
            <div className="flex flex-col">
              <span className="font-display font-black text-xl tracking-tight text-white flex items-center gap-1.5">
                JITHON<span className="text-brand-lime text-2xl leading-none">.</span>
                <span className="text-[10px] font-mono font-bold px-1.5 py-0.5 rounded bg-brand-lime/15 text-brand-lime border border-brand-lime/40">
                  '27
                </span>
              </span>
              <span className="text-[10px] font-mono text-slate-400 tracking-widest uppercase flex items-center gap-1">
                🏛️ JIT COLLEGE OF ENGINEERING
              </span>
            </div>
          </a>

          {/* Desktop Nav Links */}
          <nav className="hidden md:flex items-center gap-7 font-mono text-xs lg:text-sm">
            <a
              href="#about"
              onClick={() => handleLinkClick(700)}
              className="text-slate-300 hover:text-brand-lime transition-colors"
            >
              /01.ABOUT
            </a>
            <a
              href="#campus"
              onClick={() => handleLinkClick(720)}
              className="text-brand-lime hover:text-white font-bold transition-colors"
            >
              /02.JIT_CAMPUS
            </a>
            <a
              href="#tracks"
              onClick={() => handleLinkClick(740)}
              className="text-slate-300 hover:text-brand-cyan transition-colors"
            >
              /03.TRACKS
            </a>
            <a
              href="#prizes"
              onClick={() => handleLinkClick(760)}
              className="text-slate-300 hover:text-brand-magenta transition-colors"
            >
              /04.PRIZES
            </a>
            <a
              href="#schedule"
              onClick={() => handleLinkClick(780)}
              className="text-slate-300 hover:text-brand-lime transition-colors"
            >
              /05.LORE
            </a>
            <a
              href="#faqs"
              onClick={() => handleLinkClick(800)}
              className="text-slate-300 hover:text-slate-100 transition-colors"
            >
              /06.FAQ
            </a>
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-3">
            {/* SFX Toggle */}
            <button
              onClick={() => {
                onToggleSfx();
                playBeep(sfxEnabled ? 500 : 900, 0.1, 'sine', true);
              }}
              className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-full border border-white/10 bg-white/5 text-xs font-mono text-slate-400 hover:text-brand-lime hover:border-brand-lime/40 transition-all cursor-pointer"
            >
              {sfxEnabled ? (
                <>
                  <Volume2 className="w-3.5 h-3.5 text-brand-lime" />
                  <span>SFX: ON</span>
                </>
              ) : (
                <>
                  <VolumeX className="w-3.5 h-3.5 text-slate-500" />
                  <span>SFX: OFF</span>
                </>
              )}
            </button>

            {/* Register CTA */}
            <button
              onClick={() => {
                playBeep(850, 0.08, 'triangle', sfxEnabled);
                onOpenRegister();
              }}
              className="relative group font-display font-extrabold text-sm px-5 py-2.5 rounded-lg bg-brand-lime text-black neo-shadow-cyan active:translate-x-1 active:translate-y-1 active:shadow-none transition-all flex items-center gap-2 cursor-pointer"
            >
              <span>APPLY TO HACK</span>
              <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </button>

            {/* Mobile Menu Trigger */}
            <button
              onClick={() => {
                playBeep(700, 0.05, 'triangle', sfxEnabled);
                setMobileMenuOpen(!mobileMenuOpen);
              }}
              className="md:hidden p-2 text-slate-300 hover:text-white rounded-lg bg-white/5 border border-white/10 cursor-pointer"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>

        {/* Mobile Dropdown */}
        {mobileMenuOpen && (
          <div className="md:hidden border-b border-white/10 bg-brand-darker/95 px-6 py-6 space-y-4 font-mono text-sm">
            <a
              href="#about"
              onClick={() => {
                setMobileMenuOpen(false);
                handleLinkClick();
              }}
              className="block text-slate-300 hover:text-brand-lime"
            >
              /01.ABOUT
            </a>
            <a
              href="#campus"
              onClick={() => {
                setMobileMenuOpen(false);
                handleLinkClick();
              }}
              className="block text-brand-lime font-bold"
            >
              /02.JIT_CAMPUS 🏛️
            </a>
            <a
              href="#tracks"
              onClick={() => {
                setMobileMenuOpen(false);
                handleLinkClick();
              }}
              className="block text-slate-300 hover:text-brand-cyan"
            >
              /03.TRACKS
            </a>
            <a
              href="#prizes"
              onClick={() => {
                setMobileMenuOpen(false);
                handleLinkClick();
              }}
              className="block text-slate-300 hover:text-brand-magenta"
            >
              /04.PRIZES
            </a>
            <a
              href="#schedule"
              onClick={() => {
                setMobileMenuOpen(false);
                handleLinkClick();
              }}
              className="block text-slate-300 hover:text-brand-lime"
            >
              /05.LORE
            </a>
            <a
              href="#faqs"
              onClick={() => {
                setMobileMenuOpen(false);
                handleLinkClick();
              }}
              className="block text-slate-300 hover:text-slate-100"
            >
              /06.FAQ
            </a>
            <div className="pt-4 border-t border-white/10 flex flex-col gap-3">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenRegister();
                }}
                className="w-full text-center py-3 bg-brand-lime text-black font-display font-black rounded-lg cursor-pointer"
              >
                CLAIM YOUR SPOT &rarr;
              </button>
            </div>
          </div>
        )}
      </header>
    </>
  );
}
