import React, { useState } from 'react';
import { playBeep } from '../utils/audio';

export default function Schedule({ sfxEnabled }) {
  const [activeTab, setActiveTab] = useState('day1');

  const handleTabChange = (tab) => {
    setActiveTab(tab);
    playBeep(900, 0.05, 'sine', sfxEnabled);
  };

  return (
    <section id="schedule" className="py-20 relative bg-brand-darker">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="font-mono text-xs text-brand-lime uppercase tracking-widest bg-brand-lime/10 px-3 py-1 rounded border border-brand-lime/20">
            EVENT TIMELINE
          </span>
          <h2 className="font-display font-extrabold text-3xl sm:text-5xl mt-3 tracking-tight">
            THE 36-HOUR LORE.
          </h2>
          <p className="text-slate-400 font-sans mt-2">
            From first commit to final pitch at JIT College of Engineering.
          </p>
        </div>

        {/* Tab Buttons */}
        <div className="flex items-center justify-center gap-3 mb-10 font-mono text-xs">
          <button
            onClick={() => handleTabChange('day1')}
            className={`px-5 py-2.5 rounded-xl font-black transition-all cursor-pointer ${
              activeTab === 'day1'
                ? 'bg-brand-lime text-black'
                : 'bg-white/5 text-slate-400 hover:text-white border border-white/10'
            }`}
          >
            DAY 01 // KICKOFF (JAN 1)
          </button>
          <button
            onClick={() => handleTabChange('day2')}
            className={`px-5 py-2.5 rounded-xl font-black transition-all cursor-pointer ${
              activeTab === 'day2'
                ? 'bg-brand-cyan text-black'
                : 'bg-white/5 text-slate-400 hover:text-white border border-white/10'
            }`}
          >
            DAY 02 // SPRINT & CHAOS (JAN 2)
          </button>
          <button
            onClick={() => handleTabChange('day3')}
            className={`px-5 py-2.5 rounded-xl font-black transition-all cursor-pointer ${
              activeTab === 'day3'
                ? 'bg-brand-magenta text-white'
                : 'bg-white/5 text-slate-400 hover:text-white border border-white/10'
            }`}
          >
            DAY 03 // SHIP & GLORY (JAN 3)
          </button>
        </div>

        {/* Schedule List */}
        <div className="max-w-3xl mx-auto">
          {/* DAY 1 */}
          {activeTab === 'day1' && (
            <div className="space-y-4">
              <div className="glass-card p-6 rounded-2xl border border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:border-brand-lime transition-all">
                <div className="flex items-start gap-4">
                  <div className="font-mono text-brand-lime font-bold text-sm bg-brand-lime/10 px-3 py-1 rounded border border-brand-lime/30">
                    05:00 PM
                  </div>
                  <div>
                    <h4 className="font-display font-bold text-white text-lg">
                      JIT Campus Gate 1 Check-In & Badges
                    </h4>
                    <p className="text-xs text-slate-400 mt-1">
                      Check-in at JIT Tech Hub, collect hardware kits, Wi-Fi credentials & swag.
                    </p>
                  </div>
                </div>
                <span className="text-xs font-mono text-slate-500">// JIT CAMPUS GATE 1</span>
              </div>

              <div className="glass-card p-6 rounded-2xl border border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:border-brand-lime transition-all">
                <div className="flex items-start gap-4">
                  <div className="font-mono text-brand-lime font-bold text-sm bg-brand-lime/10 px-3 py-1 rounded border border-brand-lime/30">
                    07:00 PM
                  </div>
                  <div>
                    <h4 className="font-display font-bold text-white text-lg">
                      Opening Keynote at JIT Grand Auditorium
                    </h4>
                    <p className="text-xs text-slate-400 mt-1">
                      Welcome by JIT Tech Council, faculty mentors, sponsor API drops & track reveals.
                    </p>
                  </div>
                </div>
                <span className="text-xs font-mono text-slate-500">// JIT AUDITORIUM + LIVE STREAM</span>
              </div>

              <div className="glass-card p-6 rounded-2xl border border-brand-lime/40 bg-brand-lime/5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="flex items-start gap-4">
                  <div className="font-mono text-black bg-brand-lime font-black text-sm px-3 py-1 rounded">
                    08:00 PM
                  </div>
                  <div>
                    <h4 className="font-display font-bold text-brand-lime text-lg">
                      HACKING COMMENCES ⚡
                    </h4>
                    <p className="text-xs text-slate-300 mt-1">
                      Git repos initialized across JIT Computing Labs. High-speed 1Gbps LAN active.
                    </p>
                  </div>
                </div>
                <span className="text-xs font-mono text-brand-lime font-bold">// CLOCK STARTS</span>
              </div>

              <div className="glass-card p-6 rounded-2xl border border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:border-brand-lime transition-all">
                <div className="flex items-start gap-4">
                  <div className="font-mono text-brand-lime font-bold text-sm bg-brand-lime/10 px-3 py-1 rounded border border-brand-lime/30">
                    11:00 PM
                  </div>
                  <div>
                    <h4 className="font-display font-bold text-white text-lg">
                      Midnight Ramen & Mario Kart at Student Lounge
                    </h4>
                    <p className="text-xs text-slate-400 mt-1">
                      Piping hot food + Mario Kart tournament at JIT Gaming Lounge to decompress.
                    </p>
                  </div>
                </div>
                <span className="text-xs font-mono text-slate-500">// JIT LOUNGE</span>
              </div>
            </div>
          )}

          {/* DAY 2 */}
          {activeTab === 'day2' && (
            <div className="space-y-4">
              <div className="glass-card p-6 rounded-2xl border border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:border-brand-cyan transition-all">
                <div className="flex items-start gap-4">
                  <div className="font-mono text-brand-cyan font-bold text-sm bg-brand-cyan/10 px-3 py-1 rounded border border-brand-cyan/30">
                    09:00 AM
                  </div>
                  <div>
                    <h4 className="font-display font-bold text-white text-lg">
                      Breakfast Rush at JIT Food Court
                    </h4>
                    <p className="text-xs text-slate-400 mt-1">
                      Fresh breakfast, south/north Indian options, cold brew, and iced matcha.
                    </p>
                  </div>
                </div>
                <span className="text-xs font-mono text-slate-500">// JIT FOOD COURT</span>
              </div>

              <div className="glass-card p-6 rounded-2xl border border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:border-brand-cyan transition-all">
                <div className="flex items-start gap-4">
                  <div className="font-mono text-brand-cyan font-bold text-sm bg-brand-cyan/10 px-3 py-1 rounded border border-brand-cyan/30">
                    02:00 PM
                  </div>
                  <div>
                    <h4 className="font-display font-bold text-white text-lg">
                      Mentor Office Hours & Pitch Roast
                    </h4>
                    <p className="text-xs text-slate-400 mt-1">
                      Senior engineers and JIT research faculty roast your code architecture.
                    </p>
                  </div>
                </div>
                <span className="text-xs font-mono text-slate-500">// JIT AI LAB 204</span>
              </div>

              <div className="glass-card p-6 rounded-2xl border border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:border-brand-cyan transition-all">
                <div className="flex items-start gap-4">
                  <div className="font-mono text-brand-cyan font-bold text-sm bg-brand-cyan/10 px-3 py-1 rounded border border-brand-cyan/30">
                    12:00 AM
                  </div>
                  <div>
                    <h4 className="font-display font-bold text-white text-lg">
                      Midnight Pizza & Vibing DJ Set
                    </h4>
                    <p className="text-xs text-slate-400 mt-1">
                      JIT central lawn DJ set and midnight pizzas to keep energy peak through the night.
                    </p>
                  </div>
                </div>
                <span className="text-xs font-mono text-slate-500">// JIT AMPHITHEATER</span>
              </div>
            </div>
          )}

          {/* DAY 3 */}
          {activeTab === 'day3' && (
            <div className="space-y-4">
              <div className="glass-card p-6 rounded-2xl border border-brand-magenta/40 bg-brand-magenta/5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="flex items-start gap-4">
                  <div className="font-mono text-white bg-brand-magenta font-black text-sm px-3 py-1 rounded">
                    08:00 AM
                  </div>
                  <div>
                    <h4 className="font-display font-bold text-brand-magenta text-lg">
                      CODE FREEZE 🛑
                    </h4>
                    <p className="text-xs text-slate-300 mt-1">
                      No more commits allowed. All demo links and GitHub repos locked in portal.
                    </p>
                  </div>
                </div>
                <span className="text-xs font-mono text-brand-magenta font-bold">// REPO LOCKED</span>
              </div>

              <div className="glass-card p-6 rounded-2xl border border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:border-brand-magenta transition-all">
                <div className="flex items-start gap-4">
                  <div className="font-mono text-brand-magenta font-bold text-sm bg-brand-magenta/10 px-3 py-1 rounded border border-brand-magenta/30">
                    10:00 AM
                  </div>
                  <div>
                    <h4 className="font-display font-bold text-white text-lg">
                      Live Demos & Stage Roasts
                    </h4>
                    <p className="text-xs text-slate-400 mt-1">
                      3 minutes per squad on the JIT Auditorium stage. Live working code only.
                    </p>
                  </div>
                </div>
                <span className="text-xs font-mono text-slate-500">// MAIN AUDITORIUM</span>
              </div>

              <div className="glass-card p-6 rounded-2xl border border-brand-lime/40 bg-brand-lime/10 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="flex items-start gap-4">
                  <div className="font-mono text-black bg-brand-lime font-black text-sm px-3 py-1 rounded">
                    01:30 PM
                  </div>
                  <div>
                    <h4 className="font-display font-bold text-brand-lime text-lg">
                      Grand Award Ceremony & Afterparty
                    </h4>
                    <p className="text-xs text-slate-200 mt-1">
                      Trophies awarded by JIT leadership & sponsors, cash prizes distributed!
                    </p>
                  </div>
                </div>
                <span className="text-xs font-mono text-brand-lime font-bold">// JIT AUDITORIUM</span>
              </div>
            </div>
          )}
        </div>

      </div>
    </section>
  );
}
