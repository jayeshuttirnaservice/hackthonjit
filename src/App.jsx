import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Marquee from './components/Marquee';
import Stats from './components/Stats';
import CampusArena from './components/CampusArena';
import Tracks from './components/Tracks';
import Prizes from './components/Prizes';
import Schedule from './components/Schedule';
import FAQ from './components/FAQ';
import Footer from './components/Footer';
import RegisterPage from './components/RegisterPage';
import AdminPanel from './components/AdminPanel';

export default function App() {
  const [sfxEnabled, setSfxEnabled] = useState(true);
  const [currentPath, setCurrentPath] = useState(window.location.pathname);

  useEffect(() => {
    const handlePopState = () => setCurrentPath(window.location.pathname);
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const navigateTo = (path) => {
    window.history.pushState({}, '', path);
    setCurrentPath(path);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (currentPath === '/admin' || currentPath === '/admin/') {
    return <AdminPanel onNavigateHome={() => navigateTo('/')} />;
  }

  if (currentPath === '/register' || currentPath === '/register/') {
    return (
      <RegisterPage
        sfxEnabled={sfxEnabled}
        onNavigateHome={() => navigateTo('/')}
      />
    );
  }

  return (
    <div className="relative min-h-screen bg-brand-dark text-slate-100 font-sans selection:bg-brand-lime selection:text-black overflow-x-hidden">
      
      {/* Ambient Lighting Orbs */}
      <div className="fixed top-0 left-1/4 -translate-x-1/2 w-[550px] h-[550px] bg-brand-lime/10 rounded-full blur-[140px] pointer-events-none -z-10 animate-pulse"></div>
      <div className="fixed bottom-10 right-10 w-[500px] h-[500px] bg-brand-cyan/10 rounded-full blur-[160px] pointer-events-none -z-10"></div>
      <div className="fixed top-1/2 left-3/4 w-[400px] h-[400px] bg-brand-purple/10 rounded-full blur-[140px] pointer-events-none -z-10"></div>

      {/* Grid Pattern Overlay */}
      <div className="fixed inset-0 bg-grid-pattern pointer-events-none -z-10 opacity-70"></div>

      {/* Main Sections */}
      <Navbar
        onOpenRegister={() => navigateTo('/register')}
        sfxEnabled={sfxEnabled}
        onToggleSfx={() => setSfxEnabled((prev) => !prev)}
      />

      <main>
        <Hero
          onOpenRegister={() => navigateTo('/register')}
          sfxEnabled={sfxEnabled}
        />
        <Marquee />
        <Stats sfxEnabled={sfxEnabled} />
        <CampusArena />
        <Tracks />
        <Prizes />
        <Schedule sfxEnabled={sfxEnabled} />
        <FAQ sfxEnabled={sfxEnabled} />
      </main>

      <Footer
        onOpenRegister={() => navigateTo('/register')}
        sfxEnabled={sfxEnabled}
      />
    </div>
  );
}
