import React, { useState } from 'react';
import {
  X,
  Fingerprint,
  Ticket,
  Loader2,
  ArrowRight,
  ArrowLeft,
  Plus,
  Trash2,
  Upload,
  CheckCircle2,
  Copy,
  Check,
  Clock,
  QrCode,
  Landmark,
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { playBeep } from '../utils/audio';
import qrImage from '../assets/QRonly.png';

export default function RegisterModal({ isOpen, onClose, sfxEnabled }) {
  const [step, setStep] = useState(1);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    mobile: '',
    college: 'JIT College of Engineering',
    technologyDomain: 'Autonomous AI & Machine Learning',
    teamName: '',
    members: [{ name: '', email: '', mobile: '' }],
    transactionId: '',
    paymentScreenshot: '',
  });

  const [screenshotPreview, setScreenshotPreview] = useState('');
  const [screenshotName, setScreenshotName] = useState('');
  const [copiedUpi, setCopiedUpi] = useState(false);
  const [copiedAcc, setCopiedAcc] = useState(false);
  const [copiedIfsc, setCopiedIfsc] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState('upi'); // 'upi' | 'bank'
  const [submittedData, setSubmittedData] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  if (!isOpen) return null;

  // Handle standard input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errorMessage) setErrorMessage('');
  };

  // Team member handlers
  const handleMemberChange = (index, field, value) => {
    setFormData((prev) => {
      const updated = [...prev.members];
      updated[index] = { ...updated[index], [field]: value };
      return { ...prev, members: updated };
    });
  };

  const handleAddMember = () => {
    if (formData.members.length >= 4) {
      setErrorMessage('Maximum 4 additional members (team of 5 total) allowed.');
      return;
    }
    setFormData((prev) => ({
      ...prev,
      members: [...prev.members, { name: '', email: '', mobile: '' }],
    }));
    playBeep(700, 0.05, 'triangle', sfxEnabled);
  };

  const handleRemoveMember = (index) => {
    if (formData.members.length <= 1) return;
    setFormData((prev) => ({
      ...prev,
      members: prev.members.filter((_, i) => i !== index),
    }));
    playBeep(500, 0.05, 'sine', sfxEnabled);
  };

  // Image upload handler (base64)
  const handleScreenshotUpload = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      setErrorMessage('Please upload a valid image file (PNG, JPG, or WEBP).');
      return;
    }

    if (file.size > 8 * 1024 * 1024) {
      setErrorMessage('Screenshot size must be under 8MB.');
      return;
    }

    setScreenshotName(file.name);
    const reader = new FileReader();
    reader.onload = (event) => {
      const base64Data = event.target?.result;
      setScreenshotPreview(base64Data);
      setFormData((prev) => ({ ...prev, paymentScreenshot: base64Data }));
      if (errorMessage) setErrorMessage('');
    };
    reader.readAsDataURL(file);
    playBeep(900, 0.06, 'triangle', sfxEnabled);
  };

  const handleCopyUpi = () => {
    navigator.clipboard.writeText('32488114540@sbi');
    setCopiedUpi(true);
    playBeep(950, 0.05, 'sine', sfxEnabled);
    setTimeout(() => setCopiedUpi(false), 2000);
  };

  const handleCopyAccount = () => {
    navigator.clipboard.writeText('32488114540');
    setCopiedAcc(true);
    playBeep(950, 0.05, 'sine', sfxEnabled);
    setTimeout(() => setCopiedAcc(false), 2000);
  };

  const handleCopyIfsc = () => {
    navigator.clipboard.writeText('SBIN0012510');
    setCopiedIfsc(true);
    playBeep(950, 0.05, 'sine', sfxEnabled);
    setTimeout(() => setCopiedIfsc(false), 2000);
  };

  // Step 1 Validation -> Proceed to Step 2
  const handleNextStep = (e) => {
    e.preventDefault();
    setErrorMessage('');

    if (!formData.name.trim()) {
      setErrorMessage('Leader Name is required.');
      return;
    }
    if (!formData.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      setErrorMessage('A valid Leader Email is required.');
      return;
    }
    if (!formData.mobile.trim() || formData.mobile.replace(/\D/g, '').length < 10) {
      setErrorMessage('A valid 10-digit Mobile Number is required.');
      return;
    }
    if (!formData.college.trim()) {
      setErrorMessage('College Name is required.');
      return;
    }
    if (!formData.teamName.trim()) {
      setErrorMessage('Team Name is required.');
      return;
    }

    playBeep(850, 0.08, 'triangle', sfxEnabled);
    setStep(2);
  };

  // Final submission on Step 2
  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage('');

    if (!formData.transactionId.trim()) {
      setErrorMessage('Please enter the Payment Transaction ID / UTR number.');
      return;
    }

    setIsSubmitting(true);

    try {
      const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';
      const response = await fetch(`${apiUrl}/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || 'Registration submission failed.');
      }

      const confCode =
        result.data?.confCode ||
        '#JIT-VH-' + Math.floor(10000 + Math.random() * 90000);

      setSubmittedData({
        name: result.data?.name || formData.name,
        teamName: result.data?.teamName || formData.teamName,
        confCode,
        transactionId: formData.transactionId,
        status: result.data?.status || 'pending',
      });

      // Celebration Confetti Cannon
      const end = Date.now() + 2 * 1000;
      const colors = ['#ccff00', '#00f0ff', '#ff007a', '#ffffff'];

      (function frame() {
        confetti({
          particleCount: 6,
          angle: 60,
          spread: 55,
          origin: { x: 0 },
          colors: colors,
        });
        confetti({
          particleCount: 6,
          angle: 120,
          spread: 55,
          origin: { x: 1 },
          colors: colors,
        });

        if (Date.now() < end) {
          requestAnimationFrame(frame);
        }
      })();

      playBeep(1100, 0.25, 'triangle', sfxEnabled);
    } catch (err) {
      console.error('Registration failed:', err);
      setErrorMessage(
        err.message || 'Could not connect to the backend server. Make sure backend is running.'
      );
      playBeep(300, 0.2, 'sawtooth', sfxEnabled);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleFinish = () => {
    setSubmittedData(null);
    setStep(1);
    setFormData({
      name: '',
      email: '',
      mobile: '',
      college: 'JIT College of Engineering',
      technologyDomain: 'Autonomous AI & Machine Learning',
      teamName: '',
      members: [{ name: '', email: '', mobile: '' }],
      transactionId: '',
      paymentScreenshot: '',
    });
    setScreenshotPreview('');
    setScreenshotName('');
    onClose();
  };

  return (
    <>
      {/* Registration Modal Dialog */}
      {!submittedData ? (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto bg-black/85 backdrop-blur-md">
          <div className="relative w-full max-w-4xl bg-brand-dark border-2 border-brand-lime rounded-3xl neo-shadow-lime p-5 sm:p-8 my-6 max-h-[92vh] overflow-y-auto">
            {/* Close Button */}
            <button
              onClick={() => {
                playBeep(500, 0.05, 'sine', sfxEnabled);
                onClose();
              }}
              className="absolute top-5 right-5 p-2 rounded-xl bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer z-10"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Step Progress Bar */}
            <div className="flex items-center gap-3 mb-6">
              <div
                className={`flex items-center gap-2 px-3 py-1 rounded-full font-mono text-xs font-bold transition-all ${
                  step === 1
                    ? 'bg-brand-lime text-black'
                    : 'bg-white/10 text-slate-300'
                }`}
              >
                <span>01</span>
                <span>TEAM & DETAILS</span>
              </div>
              <div className="w-8 h-[2px] bg-white/20"></div>
              <div
                className={`flex items-center gap-2 px-3 py-1 rounded-full font-mono text-xs font-bold transition-all ${
                  step === 2
                    ? 'bg-brand-cyan text-black'
                    : 'bg-white/10 text-slate-400'
                }`}
              >
                <span>02</span>
                <span>PAYMENT & VERIFICATION</span>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
              {/* Form Column */}
              <div className="lg:col-span-7">
                <div className="flex items-center gap-2 mb-1">
                  <span className="w-2.5 h-2.5 rounded-full bg-brand-lime animate-ping"></span>
                  <span className="font-mono text-[11px] text-brand-lime font-bold uppercase tracking-wider">
                    JITUrnHACK '26 REGISTRATION
                  </span>
                </div>

                <h3 className="font-display font-extrabold text-2xl text-white mb-1">
                  {step === 1
                    ? 'TEAM & PARTICIPANT DETAILS'
                    : 'VERIFY PAYMENT // UTR RECEIPT'}
                </h3>
                <p className="text-xs text-slate-400 font-sans mb-5">
                  {step === 1
                    ? 'Enter team leader details and add teammates. Click Next to proceed to payment.'
                    : 'Scan the UPI QR code, complete payment, and submit your UTR / Transaction ID for approval.'}
                </p>

                {errorMessage && (
                  <div className="mb-4 p-3.5 rounded-xl bg-red-500/10 border border-red-500/40 text-red-400 font-mono text-xs flex items-start gap-2.5 animate-pulse">
                    <span className="text-red-400 font-bold text-sm">⚠️</span>
                    <span className="leading-relaxed">{errorMessage}</span>
                  </div>
                )}

                {/* ================= STEP 1: FIRST PAGE ================= */}
                {step === 1 && (
                  <form onSubmit={handleNextStep} className="space-y-4">
                    {/* Name & Email */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label className="block font-mono text-[11px] text-slate-300 uppercase mb-1">
                          Leader Name *
                        </label>
                        <input
                          type="text"
                          name="name"
                          required
                          value={formData.name}
                          onChange={handleChange}
                          placeholder="e.g. Satoshi Nakamoto"
                          className="w-full px-3.5 py-2.5 rounded-xl bg-black/60 border border-white/15 focus:border-brand-lime text-white font-sans text-xs focus:outline-none transition-colors"
                        />
                      </div>
                      <div>
                        <label className="block font-mono text-[11px] text-slate-300 uppercase mb-1">
                          Leader Email *
                        </label>
                        <input
                          type="email"
                          name="email"
                          required
                          value={formData.email}
                          onChange={handleChange}
                          placeholder="you@example.com"
                          className="w-full px-3.5 py-2.5 rounded-xl bg-black/60 border border-white/15 focus:border-brand-lime text-white font-sans text-xs focus:outline-none transition-colors"
                        />
                      </div>
                    </div>

                    {/* Mobile No & College Name */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label className="block font-mono text-[11px] text-slate-300 uppercase mb-1">
                          Mobile No *
                        </label>
                        <input
                          type="tel"
                          name="mobile"
                          required
                          value={formData.mobile}
                          onChange={handleChange}
                          placeholder="e.g. 9876543210"
                          className="w-full px-3.5 py-2.5 rounded-xl bg-black/60 border border-white/15 focus:border-brand-lime text-white font-sans text-xs focus:outline-none transition-colors"
                        />
                      </div>
                      <div>
                        <label className="block font-mono text-[11px] text-slate-300 uppercase mb-1">
                          College Name *
                        </label>
                        <input
                          type="text"
                          name="college"
                          required
                          value={formData.college}
                          onChange={handleChange}
                          placeholder="JIT College of Engineering"
                          className="w-full px-3.5 py-2.5 rounded-xl bg-black/60 border border-white/15 focus:border-brand-lime text-white font-sans text-xs focus:outline-none transition-colors"
                        />
                      </div>
                    </div>

                    {/* Technology / Domain & Team Name */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label className="block font-mono text-[11px] text-slate-300 uppercase mb-1">
                          Technology / Domain *
                        </label>
                        <select
                          name="technologyDomain"
                          value={formData.technologyDomain}
                          onChange={handleChange}
                          className="w-full px-3.5 py-2.5 rounded-xl bg-black/60 border border-white/15 focus:border-brand-lime text-white font-sans text-xs focus:outline-none transition-colors"
                        >
                          <option value="Autonomous AI & Machine Learning">
                            Autonomous AI & Machine Learning
                          </option>
                          <option value="Web3 & Decentralized Rails">
                            Web3 & Decentralized Rails
                          </option>
                          <option value="Full-Stack & Cloud Systems">
                            Full-Stack & Cloud Systems
                          </option>
                          <option value="Hardware, IoT & Spatial Tech">
                            Hardware, IoT & Spatial Tech
                          </option>
                          <option value="Cyber Security & Defense">
                            Cyber Security & Defense
                          </option>
                        </select>
                      </div>

                      <div>
                        <label className="block font-mono text-[11px] text-slate-300 uppercase mb-1">
                          Team Name *
                        </label>
                        <input
                          type="text"
                          name="teamName"
                          required
                          value={formData.teamName}
                          onChange={handleChange}
                          placeholder="e.g. CyberDegens_404"
                          className="w-full px-3.5 py-2.5 rounded-xl bg-black/60 border border-white/15 focus:border-brand-lime text-white font-sans text-xs focus:outline-none transition-colors"
                        />
                      </div>
                    </div>

                    {/* Team Members Section */}
                    <div className="pt-2 border-t border-white/10">
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-mono text-xs text-brand-lime font-bold uppercase tracking-wider">
                          TEAM MEMBERS ({formData.members.length})
                        </span>
                        <button
                          type="button"
                          onClick={handleAddMember}
                          className="px-3 py-1 rounded-lg bg-brand-lime/10 hover:bg-brand-lime/20 border border-brand-lime/30 text-brand-lime font-mono text-[11px] font-bold flex items-center gap-1 transition-all cursor-pointer"
                        >
                          <Plus className="w-3.5 h-3.5" />
                          <span>ADD MEMBER</span>
                        </button>
                      </div>

                      <div className="space-y-2.5 max-h-56 overflow-y-auto pr-1">
                        {formData.members.map((member, idx) => (
                          <div
                            key={idx}
                            className="p-3 rounded-xl bg-black/40 border border-white/10 space-y-2 relative"
                          >
                            <div className="flex items-center justify-between">
                              <span className="font-mono text-[10px] text-brand-lime font-bold uppercase tracking-wider">
                                Member {idx + 1}
                              </span>
                              {formData.members.length > 1 && (
                                <button
                                  type="button"
                                  onClick={() => handleRemoveMember(idx)}
                                  className="p-1 rounded-md text-slate-400 hover:text-red-400 hover:bg-red-500/10 transition-colors cursor-pointer flex items-center gap-1 text-[10px] font-mono"
                                  title="Remove member"
                                >
                                  <Trash2 className="w-3.5 h-3.5" />
                                  <span>Remove</span>
                                </button>
                              )}
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                              <input
                                type="text"
                                value={member.name}
                                onChange={(e) =>
                                  handleMemberChange(idx, 'name', e.target.value)
                                }
                                placeholder={`Member ${idx + 1} Name`}
                                className="w-full px-3 py-1.5 rounded-lg bg-black/60 border border-white/10 focus:border-brand-lime text-white font-sans text-xs focus:outline-none"
                              />
                              <input
                                type="email"
                                value={member.email}
                                onChange={(e) =>
                                  handleMemberChange(idx, 'email', e.target.value)
                                }
                                placeholder="Member Email"
                                className="w-full px-3 py-1.5 rounded-lg bg-black/60 border border-white/10 focus:border-brand-lime text-white font-sans text-xs focus:outline-none"
                              />
                              <input
                                type="tel"
                                value={member.mobile || ''}
                                onChange={(e) =>
                                  handleMemberChange(idx, 'mobile', e.target.value)
                                }
                                placeholder="Member Mobile No"
                                className="w-full px-3 py-1.5 rounded-lg bg-black/60 border border-white/10 focus:border-brand-lime text-white font-sans text-xs focus:outline-none"
                              />
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Next Button */}
                    <button
                      type="submit"
                      className="w-full py-3.5 rounded-xl bg-brand-lime text-black font-display font-black text-sm neo-shadow-cyan hover:bg-[#d8ff33] active:translate-y-1 transition-all mt-4 flex items-center justify-center gap-2 cursor-pointer"
                    >
                      <span>NEXT: PAYMENT & VERIFICATION</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </form>
                )}

                {/* ================= STEP 2: PAYMENT & QR ================= */}
                {step === 2 && (
                  <form onSubmit={handleSubmit} className="space-y-4">
                    {/* Payment Mode Selector Tabs */}
                    <div className="grid grid-cols-2 gap-2 p-1 rounded-xl bg-black/60 border border-white/10 font-mono text-xs">
                      <button
                        type="button"
                        onClick={() => {
                          setPaymentMethod('upi');
                          playBeep(700, 0.05, 'sine', sfxEnabled);
                        }}
                        className={`py-2 px-3 rounded-lg font-bold flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
                          paymentMethod === 'upi'
                            ? 'bg-brand-lime text-black shadow-md'
                            : 'text-slate-400 hover:text-white'
                        }`}
                      >
                        <QrCode className="w-3.5 h-3.5" />
                        <span>UPI / QR CODE</span>
                      </button>

                      <button
                        type="button"
                        onClick={() => {
                          setPaymentMethod('bank');
                          playBeep(700, 0.05, 'sine', sfxEnabled);
                        }}
                        className={`py-2 px-3 rounded-lg font-bold flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
                          paymentMethod === 'bank'
                            ? 'bg-brand-cyan text-black shadow-md'
                            : 'text-slate-400 hover:text-white'
                        }`}
                      >
                        <Landmark className="w-3.5 h-3.5" />
                        <span>BANK DETAILS (IMPS/NEFT)</span>
                      </button>
                    </div>

                    {/* OPTION A: UPI QR CODE */}
                    {paymentMethod === 'upi' && (
                      <div className="p-4 rounded-2xl bg-black/60 border border-white/15 flex flex-col sm:flex-row items-center gap-5">
                        {/* QR Visual */}
                        <div className="w-36 h-36 sm:w-40 sm:h-40 bg-white p-2 rounded-2xl flex flex-col items-center justify-center shrink-0 shadow-lg border-2 border-brand-lime/40 relative group overflow-hidden">
                          <img
                            src={qrImage}
                            alt="Scan to Pay - 32488114540@sbi"
                            className="w-full h-full object-contain rounded-xl"
                          />
                        </div>

                        {/* Payment Info */}
                        <div className="flex-1 text-center sm:text-left">
                          <div className="inline-block px-2.5 py-0.5 rounded-md bg-brand-lime/20 text-brand-lime font-mono text-[10px] font-bold border border-brand-lime/30 mb-1">
                            SCAN TO PAY VIA ANY UPI APP
                          </div>
                          <h4 className="font-display font-bold text-white text-base">
                            JITUrnHACK '26 Registration Fee
                          </h4>
                          <p className="text-xs text-slate-300 font-sans mt-0.5 mb-2">
                            GPay, PhonePe, Paytm, or BHIM UPI accepted.
                          </p>

                          <div className="flex items-center gap-2 justify-center sm:justify-start">
                            <span className="font-mono text-xs text-brand-cyan bg-white/5 px-2.5 py-1 rounded border border-white/10 select-all font-bold">
                              32488114540@sbi
                            </span>
                            <button
                              type="button"
                              onClick={handleCopyUpi}
                              className="p-1 px-2 rounded bg-white/10 hover:bg-white/20 text-white font-mono text-[10px] flex items-center gap-1 transition-colors cursor-pointer"
                            >
                              {copiedUpi ? (
                                <>
                                  <Check className="w-3 h-3 text-brand-lime" />
                                  <span className="text-brand-lime">Copied</span>
                                </>
                              ) : (
                                <>
                                  <Copy className="w-3 h-3" />
                                  <span>Copy</span>
                                </>
                              )}
                            </button>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* OPTION B: BANK DETAILS */}
                    {paymentMethod === 'bank' && (
                      <div className="p-4 rounded-2xl bg-black/60 border border-white/15 space-y-3 font-mono text-xs">
                        <div className="flex items-center justify-between border-b border-white/10 pb-2">
                          <span className="text-[11px] text-brand-cyan font-bold uppercase flex items-center gap-1.5">
                            <Landmark className="w-3.5 h-3.5" />
                            OFFICIAL BANK ACCOUNT DETAILS
                          </span>
                          <span className="text-[10px] text-brand-lime font-bold">IMPS / NEFT / RTGS</span>
                        </div>

                        <div className="space-y-2">
                          <div>
                            <span className="text-[10px] text-slate-400 block uppercase">Bank Name</span>
                            <span className="text-white font-bold text-xs block">State Bank of India</span>
                          </div>

                          <div>
                            <span className="text-[10px] text-slate-400 block uppercase">Account Name</span>
                            <span className="text-slate-200 text-xs block leading-snug">
                              Jawahar Education Society's Institute of Technology, Management and Research, Nashik
                            </span>
                          </div>

                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                            {/* Account Number */}
                            <div className="p-2.5 rounded-xl bg-white/5 border border-white/10">
                              <span className="text-[10px] text-slate-400 block uppercase">Account Number</span>
                              <div className="flex items-center justify-between gap-1 mt-0.5">
                                <span className="text-brand-lime font-bold text-sm tracking-wider select-all">
                                  32488114540
                                </span>
                                <button
                                  type="button"
                                  onClick={handleCopyAccount}
                                  className="p-1 px-2 rounded bg-white/10 hover:bg-white/20 text-white text-[10px] flex items-center gap-1 transition-colors cursor-pointer"
                                >
                                  {copiedAcc ? (
                                    <>
                                      <Check className="w-2.5 h-2.5 text-brand-lime" />
                                      <span className="text-brand-lime">Copied</span>
                                    </>
                                  ) : (
                                    <>
                                      <Copy className="w-2.5 h-2.5" />
                                      <span>Copy</span>
                                    </>
                                  )}
                                </button>
                              </div>
                            </div>

                            {/* IFSC Code */}
                            <div className="p-2.5 rounded-xl bg-white/5 border border-white/10">
                              <span className="text-[10px] text-slate-400 block uppercase">IFSC Code</span>
                              <div className="flex items-center justify-between gap-1 mt-0.5">
                                <span className="text-brand-cyan font-bold text-sm tracking-wider select-all">
                                  SBIN0012510
                                </span>
                                <button
                                  type="button"
                                  onClick={handleCopyIfsc}
                                  className="p-1 px-2 rounded bg-white/10 hover:bg-white/20 text-white text-[10px] flex items-center gap-1 transition-colors cursor-pointer"
                                >
                                  {copiedIfsc ? (
                                    <>
                                      <Check className="w-2.5 h-2.5 text-brand-lime" />
                                      <span className="text-brand-lime">Copied</span>
                                    </>
                                  ) : (
                                    <>
                                      <Copy className="w-2.5 h-2.5" />
                                      <span>Copy</span>
                                    </>
                                  )}
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Transaction ID / UTR No */}
                    <div>
                      <label className="block font-mono text-xs text-slate-300 uppercase mb-1">
                        Transaction ID / UTR No *
                      </label>
                      <input
                        type="text"
                        name="transactionId"
                        required
                        value={formData.transactionId}
                        onChange={handleChange}
                        placeholder="e.g. 428901238910 / UPI-UTR-XXXXX"
                        className="w-full px-4 py-2.5 rounded-xl bg-black/60 border border-white/15 focus:border-brand-lime text-white font-sans text-xs focus:outline-none transition-colors"
                      />
                    </div>

                    {/* Payment Screenshot Upload */}
                    <div>
                      <label className="block font-mono text-xs text-slate-300 uppercase mb-1">
                        Payment Transaction Screenshot
                      </label>
                      <div className="relative border-2 border-dashed border-white/20 hover:border-brand-lime rounded-2xl p-4 text-center bg-black/40 transition-colors">
                        <input
                          type="file"
                          accept="image/*"
                          onChange={handleScreenshotUpload}
                          className="absolute inset-0 opacity-0 cursor-pointer w-full h-full"
                        />
                        {screenshotPreview ? (
                          <div className="flex items-center justify-between gap-3 text-left">
                            <div className="flex items-center gap-3">
                              <img
                                src={screenshotPreview}
                                alt="Receipt Preview"
                                className="w-12 h-12 rounded-lg object-cover border border-brand-lime"
                              />
                              <div>
                                <span className="font-mono text-xs text-white block truncate max-w-[200px]">
                                  {screenshotName || 'Screenshot attached'}
                                </span>
                                <span className="font-mono text-[10px] text-brand-lime flex items-center gap-1">
                                  <CheckCircle2 className="w-3 h-3" /> Ready for verification
                                </span>
                              </div>
                            </div>
                            <span className="font-mono text-[10px] text-slate-400 underline">
                              Change Image
                            </span>
                          </div>
                        ) : (
                          <div className="flex flex-col items-center justify-center py-2 pointer-events-none">
                            <Upload className="w-6 h-6 text-brand-lime mb-1" />
                            <span className="font-sans text-xs text-slate-200 font-semibold">
                              Click or drag screenshot here
                            </span>
                            <span className="font-mono text-[10px] text-slate-500 mt-0.5">
                              PNG, JPG, or WEBP (Max 8MB)
                            </span>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Action Buttons: Back + Submit */}
                    <div className="flex gap-3 pt-2">
                      <button
                        type="button"
                        onClick={() => {
                          playBeep(600, 0.05, 'sine', sfxEnabled);
                          setStep(1);
                        }}
                        className="px-5 py-3.5 rounded-xl bg-white/10 hover:bg-white/20 text-white font-mono text-xs flex items-center gap-1.5 transition-colors cursor-pointer"
                      >
                        <ArrowLeft className="w-4 h-4" />
                        <span>BACK</span>
                      </button>

                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="flex-1 py-3.5 rounded-xl bg-brand-lime text-black font-display font-black text-sm neo-shadow-cyan hover:bg-[#d8ff33] active:translate-y-1 transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed"
                      >
                        {isSubmitting ? (
                          <>
                            <Loader2 className="w-4 h-4 animate-spin" />
                            <span>SUBMITTING FOR APPROVAL...</span>
                          </>
                        ) : (
                          <>
                            <span>SUBMIT REGISTRATION</span>
                            <Ticket className="w-4 h-4" />
                          </>
                        )}
                      </button>
                    </div>
                  </form>
                )}
              </div>

              {/* Digital Pass Preview Column */}
              <div className="lg:col-span-5 flex flex-col items-center">
                <div className="text-center font-mono text-[11px] text-slate-400 mb-3 tracking-widest uppercase">
                  // LIVE REGISTRATION PREVIEW
                </div>

                <div className="w-full max-w-[320px] rounded-3xl hologram-effect border-2 border-white/30 p-5 shadow-2xl relative select-none">
                  {/* Badge Header */}
                  <div className="flex items-center justify-between border-b border-white/20 pb-3 mb-3">
                    <div className="flex items-center gap-2">
                      <span className="w-3 h-3 rounded-full bg-brand-lime"></span>
                      <div className="text-left">
                        <span className="font-display font-black text-white text-sm tracking-tight block leading-tight">
                          JITUrnHACK'26
                        </span>
                        <span className="font-mono text-[8px] text-brand-lime block tracking-wider uppercase">
                          JIT INNOVATION CELL
                        </span>
                      </div>
                    </div>
                    <span className="font-mono text-[9px] text-amber-400 bg-black/80 px-2 py-0.5 rounded border border-amber-400/40 flex items-center gap-1">
                      <Clock className="w-2.5 h-2.5" />
                      PENDING VERIF.
                    </span>
                  </div>

                  {/* Avatar / Scan simulator */}
                  <div className="w-16 h-16 mx-auto rounded-2xl bg-black/70 border border-white/20 flex flex-col items-center justify-center mb-3 relative overflow-hidden">
                    <Fingerprint className="w-8 h-8 text-brand-lime" />
                    <div className="absolute inset-0 bg-brand-lime/10 animate-scanline"></div>
                  </div>

                  {/* Team & Leader Details */}
                  <div className="text-center mb-4">
                    <div className="font-display font-black text-lg text-white truncate">
                      {formData.teamName.trim() || 'TEAM NAME'}
                    </div>
                    <div className="font-mono text-xs text-brand-cyan truncate">
                      Leader: {formData.name.trim() || 'Attendee Name'}
                    </div>
                    <div className="mt-1.5 inline-block px-2.5 py-0.5 rounded-full bg-white/10 text-brand-lime font-mono text-[10px] font-bold border border-white/10">
                      {formData.technologyDomain}
                    </div>
                  </div>

                  {/* Metadata Grid */}
                  <div className="grid grid-cols-2 gap-2 text-left font-mono text-[9px] bg-black/60 p-2.5 rounded-xl border border-white/10 mb-3">
                    <div>
                      <span className="text-slate-500 block">COLLEGE</span>
                      <span className="text-slate-200 font-bold truncate block">
                        {formData.college.trim() || 'JIT College of Engg'}
                      </span>
                    </div>
                    <div>
                      <span className="text-slate-500 block">MEMBERS</span>
                      <span className="text-brand-lime font-bold truncate block">
                        {formData.members.filter((m) => m.name.trim()).length + 1} Hacker(s)
                      </span>
                    </div>
                  </div>

                  {/* Barcode Graphic */}
                  <div className="flex items-center justify-between pt-2 border-t border-white/10">
                    <div className="font-mono text-[8px] tracking-widest text-slate-400">
                      #JIT-VERIF-QUEUED
                    </div>
                    <div className="flex gap-0.5 items-end h-5 opacity-75">
                      <div className="w-1 h-5 bg-white"></div>
                      <div className="w-0.5 h-5 bg-white"></div>
                      <div className="w-1.5 h-5 bg-white"></div>
                      <div className="w-0.5 h-5 bg-white"></div>
                      <div className="w-1 h-5 bg-white"></div>
                      <div className="w-2 h-5 bg-white"></div>
                      <div className="w-0.5 h-5 bg-white"></div>
                      <div className="w-1 h-5 bg-white"></div>
                    </div>
                  </div>
                </div>

                <p className="text-[10px] font-mono text-slate-500 mt-3 text-center">
                  *Subject to transaction ID verification by the JIT Admin team
                </p>
              </div>
            </div>
          </div>
        </div>
      ) : (
        /* Confirmation Success Modal */
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-lg">
          <div className="relative w-full max-w-md bg-brand-dark border-2 border-brand-lime rounded-3xl neo-shadow-lime p-7 text-center">
            <div className="w-16 h-16 rounded-full bg-amber-400/20 border-2 border-amber-400 mx-auto flex items-center justify-center text-3xl mb-4">
              ⏳
            </div>
            <h3 className="font-display font-black text-2xl text-white mb-2">
              SUBMITTED FOR APPROVAL!
            </h3>
            <p className="text-xs text-slate-300 font-sans mb-5">
              Your registration for <strong>{submittedData.teamName}</strong> has been
              received. The payment transaction is currently in the{' '}
              <strong className="text-amber-400">Admin Approval Area</strong> for verification.
            </p>

            <div className="bg-black/60 p-4 rounded-xl border border-white/10 font-mono text-xs text-left mb-5 space-y-1.5">
              <div className="text-slate-400">
                APPLICATION ID:{' '}
                <span className="text-brand-lime font-bold">
                  {submittedData.confCode}
                </span>
              </div>
              <div className="text-slate-400">
                TEAM: <span className="text-white">{submittedData.teamName}</span>
              </div>
              <div className="text-slate-400">
                LEADER: <span className="text-white">{submittedData.name}</span>
              </div>
              <div className="text-slate-400 truncate">
                TRANSACTION ID:{' '}
                <span className="text-brand-cyan">{submittedData.transactionId}</span>
              </div>
              <div className="text-slate-400">
                STATUS:{' '}
                <span className="text-amber-400 font-bold bg-amber-400/10 px-2 py-0.5 rounded border border-amber-400/30">
                  PENDING ADMIN APPROVAL ⏳
                </span>
              </div>
            </div>

            <button
              onClick={handleFinish}
              className="w-full py-3.5 rounded-xl bg-brand-lime text-black font-display font-black text-sm neo-shadow-white hover:bg-[#d8ff33] transition-all cursor-pointer"
            >
              GOT IT 🔥
            </button>
          </div>
        </div>
      )}
    </>
  );
}
