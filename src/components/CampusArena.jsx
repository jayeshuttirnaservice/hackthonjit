import React from 'react';
import { Wifi, Cpu, Coffee, Shield, Mic, Bus } from 'lucide-react';

export default function CampusArena() {
  const features = [
    {
      icon: Wifi,
      title: '1 Gbps Dedicated Campus Fiber',
      description: 'High-speed, low-latency enterprise fiber across all hacking bays and auditoriums so your Docker pulls, model downloads, and deployments are instantaneous.',
      color: 'text-brand-lime',
      bgColor: 'bg-brand-lime/10',
      borderColor: 'border-brand-lime/20',
      hoverBorder: 'hover:border-brand-lime',
    },
    {
      icon: Cpu,
      title: 'Advanced JIT Computing Labs',
      description: 'Work in air-conditioned high-spec computer labs with multi-monitor rigs, GPU workstations, and dedicated testing benches for IoT and hardware.',
      color: 'text-brand-cyan',
      bgColor: 'bg-brand-cyan/10',
      borderColor: 'border-brand-cyan/20',
      hoverBorder: 'hover:border-brand-cyan',
    },
    {
      icon: Coffee,
      title: '24/7 Hacker Food Court',
      description: 'All-night warm meals, midnight pizzas, samosas, continuous hot masala chai/coffee, and chilled energy drinks provided completely free on campus.',
      color: 'text-brand-magenta',
      bgColor: 'bg-brand-magenta/10',
      borderColor: 'border-brand-magenta/20',
      hoverBorder: 'hover:border-brand-magenta',
    },
    {
      icon: Shield,
      title: 'Safe Overnight Stay & Lounges',
      description: 'Dedicated gender-segregated quiet rest zones, beanbags, power banks, 24/7 guarded campus security, and medical response staff on campus.',
      color: 'text-brand-purple',
      bgColor: 'bg-brand-purple/10',
      borderColor: 'border-brand-purple/20',
      hoverBorder: 'hover:border-brand-purple',
    },
    {
      icon: Mic,
      title: 'JIT Grand Auditorium',
      description: 'Acoustically tuned 800+ seat central auditorium equipped with 4K projection screens and stage sound for opening keynotes and live demo roasts.',
      color: 'text-brand-lime',
      bgColor: 'bg-brand-lime/10',
      borderColor: 'border-brand-lime/20',
      hoverBorder: 'hover:border-brand-lime',
    },
    {
      icon: Bus,
      title: 'Shuttle Transit & Parking',
      description: 'Convenient JIT College bus pick-up points from major transit hubs, plus spacious gated parking for cars and two-wheelers.',
      color: 'text-brand-cyan',
      bgColor: 'bg-brand-cyan/10',
      borderColor: 'border-brand-cyan/20',
      hoverBorder: 'hover:border-brand-cyan',
    },
  ];

  return (
    <section id="campus" className="py-20 relative bg-brand-darker/60 border-t border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div>
            <span className="font-mono text-xs text-brand-lime uppercase tracking-widest bg-brand-lime/10 px-3 py-1 rounded border border-brand-lime/20">
              🏛️ OFFICIAL HOST INSTITUTION
            </span>
            <h2 className="font-display font-extrabold text-3xl sm:text-5xl mt-3 tracking-tight">
              THE JIT CAMPUS ARENA.
            </h2>
          </div>
          <p className="text-slate-400 font-sans max-w-md text-sm">
            <strong>JIT College of Engineering</strong> opens its premier campus facilities, advanced laboratories, and high-speed infrastructure to all selected builders.
          </p>
        </div>

        {/* Campus Features Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {features.map((feat, idx) => {
            const Icon = feat.icon;
            return (
              <div
                key={idx}
                className={`glass-card p-6 rounded-2xl border border-white/10 ${feat.hoverBorder} transition-all group`}
              >
                <div
                  className={`w-12 h-12 rounded-xl ${feat.bgColor} ${feat.color} flex items-center justify-center mb-4 border ${feat.borderColor} group-hover:scale-110 transition-transform`}
                >
                  <Icon className="w-6 h-6" />
                </div>
                <h3 className="font-display font-bold text-xl text-white mb-2">
                  {feat.title}
                </h3>
                <p className="text-slate-400 text-xs leading-relaxed">
                  {feat.description}
                </p>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
