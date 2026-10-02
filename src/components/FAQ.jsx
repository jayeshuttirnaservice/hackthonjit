import React, { useState } from 'react';
import { Plus } from 'lucide-react';
import { playBeep } from '../utils/audio';

export default function FAQ({ sfxEnabled }) {
  const [openId, setOpenId] = useState(null);

  const faqs = [
    {
      id: 1,
      q: 'How does registration and team verification work?',
      a: 'Register your team via the online form, complete the registration deposit by scanning the official UPI QR code, and submit your Transaction / UTR number with receipt. The JIT admin desk verifies all submissions in real-time, after which your confirmed admission entry pass is minted.',
      color: 'text-brand-lime',
    },
    {
      id: 2,
      q: 'Where is the hackathon venue located?',
      a: 'The event takes place exclusively inside the flagship campus of JIT College of Engineering. Selected participants will receive campus entry passes, gate directions, and college shuttle transport schedules in their confirmation packet.',
      color: 'text-brand-cyan',
    },
    {
      id: 3,
      q: 'Can students from colleges other than JIT participate?',
      a: 'Yes, 100%! While hosted by JIT College of Engineering, JITHON \'27 is open to college students, high-schoolers, and independent developers from all universities across India to compete on-site at the JIT campus.',
      color: 'text-brand-magenta',
    },
    {
      id: 4,
      q: 'Can I build something before the hackathon starts?',
      a: 'Nah, that is instant disqualification. You can brainstorm ideas, review JIT hardware kit specs, and prepare boilerplates, but all code must be committed during the 36 hours. Git commit history is strictly verified by judges.',
      color: 'text-brand-lime',
    },
    {
      id: 5,
      q: 'What if I don\'t have a team yet?',
      a: 'Teams can be 1 to 4 people. We host an interactive mixer on the JIT campus on Friday evening to help you find teammates and collaborate in real-time!',
      color: 'text-brand-purple',
    },
  ];

  const toggle = (id) => {
    setOpenId((prev) => (prev === id ? null : id));
    playBeep(750, 0.08, 'sine', sfxEnabled);
  };

  return (
    <section id="faqs" className="py-20 relative">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center mb-16">
          <span className="font-mono text-xs text-brand-cyan uppercase tracking-widest bg-brand-cyan/10 px-3 py-1 rounded border border-brand-cyan/20">
            COMMON QUESTIONS
          </span>
          <h2 className="font-display font-extrabold text-3xl sm:text-5xl mt-3 tracking-tight">
            FAQ (NO FLUFF)
          </h2>
          <p className="text-slate-400 font-sans mt-2">
            Everything you need to know about JITHON '27 at JIT College of Engineering.
          </p>
        </div>

        {/* FAQ Accordion List */}
        <div className="space-y-4">
          {faqs.map((faq) => {
            const isOpen = openId === faq.id;
            return (
              <div
                key={faq.id}
                className="glass-card rounded-2xl border border-white/10 overflow-hidden transition-all"
              >
                <button
                  onClick={() => toggle(faq.id)}
                  className={`w-full p-6 text-left flex items-center justify-between gap-4 font-display font-bold text-lg hover:${faq.color} transition-colors cursor-pointer`}
                >
                  <span>{faq.q}</span>
                  <Plus
                    className={`w-5 h-5 ${faq.color} shrink-0 transition-transform duration-300 ${
                      isOpen ? 'rotate-45' : 'rotate-0'
                    }`}
                  />
                </button>
                {isOpen && (
                  <div className="px-6 pb-6 text-slate-300 text-sm font-sans leading-relaxed border-t border-white/5 pt-4">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
