import React, { useState, useEffect, useCallback } from 'react';
import {
  ArrowLeft,
  Clock,
  CheckCircle,
  XCircle,
  RefreshCw,
  Search,
  Users,
  Building,
  Phone,
  Mail,
  Receipt,
  Trash2,
  X,
  AlertCircle,
  Copy,
  Check,
  QrCode,
  Upload,
  RotateCcw,
  Loader2,
  Lock,
  KeyRound,
  LogOut,
  Eye,
  EyeOff,
  Shield,
  User,
} from 'lucide-react';
import { playBeep } from '../utils/audio';
import qrDefaultImage from '../assets/QRonly.png';

export default function AdminPanel({ onNavigateHome }) {
  // Authentication State
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    return !!sessionStorage.getItem('jit_admin_auth');
  });
  const [adminIdInput, setAdminIdInput] = useState('');
  const [passwordInput, setPasswordInput] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loginError, setLoginError] = useState('');
  const [isLoggingIn, setIsLoggingIn] = useState(false);

  const [registrations, setRegistrations] = useState([]);
  const [stats, setStats] = useState({ total: 0, pending: 0, approved: 0, rejected: 0 });
  const [activeTab, setActiveTab] = useState('pending'); // 'pending' | 'approved' | 'rejected' | 'all'
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState(null); // id of item being approved/rejected
  const [selectedImage, setSelectedImage] = useState(null); // modal preview for screenshot
  const [copiedId, setCopiedId] = useState(null);

  // Dynamic QR Code Management States
  const [qrSetting, setQrSetting] = useState({
    qrImageUrl: '',
    upiId: '32488114540@sbi',
    isCustom: false,
  });
  const [isQrModalOpen, setIsQrModalOpen] = useState(false);
  const [newQrBase64, setNewQrBase64] = useState('');
  const [newQrPreview, setNewQrPreview] = useState('');
  const [newUpiId, setNewUpiId] = useState('32488114540@sbi');
  const [isUpdatingQr, setIsUpdatingQr] = useState(false);
  const [qrStatusMsg, setQrStatusMsg] = useState(null);

  // Dynamic Password Change States
  const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false);
  const [currentPasswordInput, setCurrentPasswordInput] = useState('');
  const [newPasswordInput, setNewPasswordInput] = useState('');
  const [confirmPasswordInput, setConfirmPasswordInput] = useState('');
  const [passwordStatusMsg, setPasswordStatusMsg] = useState(null);
  const [isUpdatingPassword, setIsUpdatingPassword] = useState(false);

  const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

  const getFullImageUrl = (imagePath) => {
    if (!imagePath) return '';
    if (
      imagePath.startsWith('data:') ||
      imagePath.startsWith('http://') ||
      imagePath.startsWith('https://')
    ) {
      return imagePath;
    }
    const backendOrigin = apiUrl.replace(/\/api\/?$/, '');
    return `${backendOrigin}${imagePath}`;
  };

  const fetchQrSetting = useCallback(async () => {
    try {
      const res = await fetch(`${apiUrl}/settings/qr`);
      const data = await res.json();
      if (data.success && data.data) {
        setQrSetting(data.data);
        setNewUpiId(data.data.upiId || '32488114540@sbi');
      }
    } catch (err) {
      console.error('Failed to load QR settings:', err);
    }
  }, [apiUrl]);

  const fetchRegistrations = useCallback(async () => {
    try {
      const [regRes, statsRes] = await Promise.all([
        fetch(`${apiUrl}/registrations?limit=100`),
        fetch(`${apiUrl}/registrations/stats`),
      ]);
      const regData = await regRes.json();
      const statsData = await statsRes.json();
      if (regData.success) setRegistrations(regData.data || []);
      if (statsData.success) setStats(statsData.stats || { total: 0, pending: 0, approved: 0, rejected: 0 });
    } catch (err) {
      console.error('Failed to load admin data:', err);
    } finally {
      setIsLoading(false);
    }
  }, [apiUrl]);

  useEffect(() => {
    if (!isAuthenticated) return;
    let ignore = false;
    async function load() {
      try {
        const [regRes, statsRes, qrRes] = await Promise.all([
          fetch(`${apiUrl}/registrations?limit=100`),
          fetch(`${apiUrl}/registrations/stats`),
          fetch(`${apiUrl}/settings/qr`),
        ]);
        const regData = await regRes.json();
        const statsData = await statsRes.json();
        const qrData = await qrRes.json();
        if (!ignore) {
          if (regData.success) setRegistrations(regData.data || []);
          if (statsData.success) setStats(statsData.stats || { total: 0, pending: 0, approved: 0, rejected: 0 });
          if (qrData.success && qrData.data) {
            setQrSetting(qrData.data);
            setNewUpiId(qrData.data.upiId || '32488114540@sbi');
          }
        }
      } catch (err) {
        console.error('Failed to load admin data:', err);
      } finally {
        if (!ignore) setIsLoading(false);
      }
    }
    load();
    return () => {
      ignore = true;
    };
  }, [apiUrl, isAuthenticated]);

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!adminIdInput.trim() || !passwordInput) {
      setLoginError('Please enter both Admin ID and Password.');
      return;
    }

    setIsLoggingIn(true);
    setLoginError('');
    try {
      const res = await fetch(`${apiUrl}/admin/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          username: adminIdInput.trim(),
          password: passwordInput,
        }),
      });

      const data = await res.json();
      if (data.success) {
        sessionStorage.setItem('jit_admin_auth', data.token || 'true');
        sessionStorage.setItem('jit_admin_user', data.admin?.id || adminIdInput.trim());
        setIsAuthenticated(true);
        playBeep(1000, 0.15, 'triangle');
      } else {
        setLoginError(data.message || 'Invalid Admin ID or Password.');
        playBeep(300, 0.2, 'sawtooth');
      }
    } catch (err) {
      setLoginError('Failed to connect to backend server: ' + err.message);
      playBeep(300, 0.2, 'sawtooth');
    } finally {
      setIsLoggingIn(false);
    }
  };

  const handleLogout = () => {
    sessionStorage.removeItem('jit_admin_auth');
    sessionStorage.removeItem('jit_admin_user');
    setIsAuthenticated(false);
    setAdminIdInput('');
    setPasswordInput('');
    setLoginError('');
    playBeep(600, 0.1, 'sine');
  };

  const handleQrFileSelect = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      setQrStatusMsg({ type: 'error', text: 'Please select a valid image (PNG, JPG, or WEBP).' });
      return;
    }

    if (file.size > 10 * 1024 * 1024) {
      setQrStatusMsg({ type: 'error', text: 'Image file size must be under 10MB.' });
      return;
    }

    const reader = new FileReader();
    reader.onload = (ev) => {
      const base64 = ev.target?.result;
      setNewQrBase64(base64);
      setNewQrPreview(base64);
      setQrStatusMsg(null);
    };
    reader.readAsDataURL(file);
    playBeep(850, 0.05, 'triangle');
  };

  const handleSaveQrCode = async (e) => {
    e.preventDefault();
    if (!newQrBase64 && (!newUpiId || newUpiId.trim() === qrSetting.upiId)) {
      setQrStatusMsg({
        type: 'error',
        text: 'Please select a new QR image or change the UPI ID.',
      });
      return;
    }

    setIsUpdatingQr(true);
    setQrStatusMsg(null);
    try {
      const res = await fetch(`${apiUrl}/settings/qr`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          qrImage: newQrBase64 || undefined,
          upiId: newUpiId.trim(),
        }),
      });

      const data = await res.json();
      if (data.success) {
        setQrSetting(data.data);
        setNewQrBase64('');
        setNewQrPreview('');
        setQrStatusMsg({
          type: 'success',
          text: 'Payment QR code updated successfully! Live on main registration page.',
        });
        playBeep(1000, 0.15, 'triangle');
        setTimeout(() => {
          setIsQrModalOpen(false);
          setQrStatusMsg(null);
        }, 1500);
      } else {
        setQrStatusMsg({
          type: 'error',
          text: data.message || 'Failed to update QR code.',
        });
      }
    } catch (err) {
      setQrStatusMsg({ type: 'error', text: 'Network error: ' + err.message });
    } finally {
      setIsUpdatingQr(false);
    }
  };

  const handleResetQrCode = async () => {
    if (!window.confirm('Reset payment QR back to original official JIT QR code?')) return;
    setIsUpdatingQr(true);
    try {
      const res = await fetch(`${apiUrl}/settings/qr/reset`, { method: 'POST' });
      const data = await res.json();
      if (data.success) {
        setQrSetting(data.data);
        setNewQrBase64('');
        setNewQrPreview('');
        setNewUpiId(data.data.upiId);
        setQrStatusMsg({
          type: 'success',
          text: 'Reset to default official JIT QR code successfully.',
        });
        playBeep(900, 0.1, 'sine');
      }
    } catch (err) {
      setQrStatusMsg({ type: 'error', text: 'Reset failed: ' + err.message });
    } finally {
      setIsUpdatingQr(false);
    }
  };

  const handleGoHome = () => {
    if (onNavigateHome) {
      onNavigateHome();
    } else {
      window.history.pushState({}, '', '/');
      window.dispatchEvent(new PopStateEvent('popstate'));
    }
  };

  const handleChangePassword = async (e) => {
    e.preventDefault();
    if (!newPasswordInput || newPasswordInput.trim().length < 3) {
      setPasswordStatusMsg({ type: 'error', text: 'New password must be at least 3 characters long.' });
      return;
    }
    if (newPasswordInput !== confirmPasswordInput) {
      setPasswordStatusMsg({ type: 'error', text: 'New password and confirmation do not match.' });
      return;
    }

    setIsUpdatingPassword(true);
    setPasswordStatusMsg(null);
    try {
      const activeAdminUser = sessionStorage.getItem('jit_admin_user') || 'admin';
      const res = await fetch(`${apiUrl}/admin/update-credentials`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          username: activeAdminUser,
          currentPassword: currentPasswordInput,
          newPassword: newPasswordInput.trim(),
        }),
      });

      const data = await res.json();
      if (data.success) {
        setPasswordStatusMsg({
          type: 'success',
          text: 'Admin password updated successfully in simple text.',
        });
        setCurrentPasswordInput('');
        setNewPasswordInput('');
        setConfirmPasswordInput('');
        playBeep(1000, 0.15, 'triangle');
        setTimeout(() => {
          setIsPasswordModalOpen(false);
          setPasswordStatusMsg(null);
        }, 1500);
      } else {
        setPasswordStatusMsg({
          type: 'error',
          text: data.message || 'Failed to update admin password.',
        });
      }
    } catch (err) {
      setPasswordStatusMsg({ type: 'error', text: 'Network error: ' + err.message });
    } finally {
      setIsUpdatingPassword(false);
    }
  };

  const handleApprove = async (id) => {
    setActionLoading(id);
    try {
      const res = await fetch(`${apiUrl}/registrations/${id}/approve`, {
        method: 'PATCH',
      });
      const data = await res.json();
      if (data.success) {
        playBeep(1000, 0.15, 'triangle');
        fetchRegistrations();
      } else {
        alert(data.message || 'Failed to approve registration');
      }
    } catch (err) {
      alert('Error approving registration: ' + err.message);
    } finally {
      setActionLoading(null);
    }
  };

  const handleReject = async (id) => {
    if (!window.confirm('Are you sure you want to reject this registration?')) return;
    setActionLoading(id);
    try {
      const res = await fetch(`${apiUrl}/registrations/${id}/reject`, {
        method: 'PATCH',
      });
      const data = await res.json();
      if (data.success) {
        playBeep(400, 0.15, 'sawtooth');
        fetchRegistrations();
      } else {
        alert(data.message || 'Failed to reject registration');
      }
    } catch (err) {
      alert('Error rejecting registration: ' + err.message);
    } finally {
      setActionLoading(null);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this registration permanently?')) return;
    try {
      const res = await fetch(`${apiUrl}/registrations/${id}`, {
        method: 'DELETE',
      });
      const data = await res.json();
      if (data.success) {
        fetchRegistrations();
      }
    } catch (err) {
      alert('Error deleting registration: ' + err.message);
    }
  };

  const handleCopyUtr = (utr, id) => {
    navigator.clipboard.writeText(utr);
    setCopiedId(id);
    playBeep(900, 0.05, 'sine');
    setTimeout(() => setCopiedId(null), 1500);
  };

  // Filter registrations based on active tab and search query
  const filteredRegistrations = registrations.filter((reg) => {
    const matchesTab =
      activeTab === 'all' ? true : (reg.status || 'pending') === activeTab;

    if (!searchQuery.trim()) return matchesTab;

    const query = searchQuery.toLowerCase();
    const matchesSearch =
      reg.teamName?.toLowerCase().includes(query) ||
      reg.name?.toLowerCase().includes(query) ||
      reg.email?.toLowerCase().includes(query) ||
      reg.transactionId?.toLowerCase().includes(query) ||
      reg.college?.toLowerCase().includes(query) ||
      reg.confirmationCode?.toLowerCase().includes(query);

    return matchesTab && matchesSearch;
  });

  // Render Login Screen if not authenticated
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-brand-dark text-slate-100 font-sans flex items-center justify-center p-4 relative overflow-hidden selection:bg-brand-lime selection:text-black">
        {/* Ambient Glow Orbs */}
        <div className="fixed top-1/4 left-1/3 -translate-x-1/2 w-[500px] h-[500px] bg-brand-lime/10 rounded-full blur-[140px] pointer-events-none -z-10 animate-pulse"></div>
        <div className="fixed bottom-10 right-1/4 w-[450px] h-[450px] bg-brand-cyan/10 rounded-full blur-[150px] pointer-events-none -z-10"></div>
        <div className="fixed inset-0 bg-grid-pattern pointer-events-none -z-10 opacity-70"></div>

        <div className="max-w-md w-full bg-brand-card/90 border-2 border-brand-lime rounded-3xl neo-shadow-lime p-8 sm:p-10 backdrop-blur-xl relative">
          {/* Header Brand */}
          <div className="text-center mb-8">
            <div className="w-14 h-14 rounded-2xl bg-brand-lime mx-auto flex items-center justify-center text-black font-display font-black text-2xl neo-shadow-white mb-4">
              <Lock className="w-7 h-7 text-black" />
            </div>

            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-lime/10 border border-brand-lime/30 text-brand-lime font-mono text-[10px] font-bold tracking-widest uppercase mb-2">
              <span className="w-1.5 h-1.5 rounded-full bg-brand-lime animate-ping"></span>
              RESTRICTED ACCESS
            </div>

            <h1 className="font-display font-black text-2xl sm:text-3xl text-white tracking-tight">
              Admin Control Desk
            </h1>
            <p className="font-sans text-xs text-slate-400 mt-1">
              JITHON '27 // Jawahar Education Society's ITMR
            </p>
          </div>

          {/* Error Message */}
          {loginError && (
            <div className="p-3.5 rounded-xl bg-red-500/15 border border-red-500 text-red-300 font-mono text-xs flex items-center gap-2.5 mb-6">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{loginError}</span>
            </div>
          )}

          {/* Login Form */}
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block font-mono text-xs text-slate-300 uppercase mb-1.5 font-bold">
                Admin ID
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                  <User className="w-4 h-4" />
                </div>
                <input
                  type="text"
                  required
                  value={adminIdInput}
                  onChange={(e) => {
                    setAdminIdInput(e.target.value);
                    if (loginError) setLoginError('');
                  }}
                  placeholder="e.g. admin"
                  className="w-full pl-10 pr-4 py-3 rounded-xl bg-black/60 border border-white/15 focus:border-brand-lime text-white font-mono text-sm focus:outline-none transition-colors"
                />
              </div>
            </div>

            <div>
              <label className="block font-mono text-xs text-slate-300 uppercase mb-1.5 font-bold">
                Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                  <KeyRound className="w-4 h-4" />
                </div>
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={passwordInput}
                  onChange={(e) => {
                    setPasswordInput(e.target.value);
                    if (loginError) setLoginError('');
                  }}
                  placeholder="Enter admin password"
                  className="w-full pl-10 pr-11 py-3 rounded-xl bg-black/60 border border-white/15 focus:border-brand-lime text-white font-mono text-sm focus:outline-none transition-colors"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-slate-400 hover:text-white transition-colors cursor-pointer"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoggingIn}
              className="w-full py-3.5 rounded-xl bg-brand-lime text-black font-display font-black text-sm neo-shadow-white hover:bg-[#d8ff33] active:translate-y-1 disabled:opacity-50 transition-all flex items-center justify-center gap-2 cursor-pointer mt-2"
            >
              {isLoggingIn ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>AUTHENTICATING...</span>
                </>
              ) : (
                <>
                  <Shield className="w-4 h-4" />
                  <span>LOGIN TO ADMIN DESK</span>
                </>
              )}
            </button>
          </form>

          {/* Back Link */}
          <div className="mt-6 text-center">
            <button
              onClick={handleGoHome}
              className="text-xs font-mono text-slate-400 hover:text-white inline-flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back to Hackathon Home</span>
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-brand-dark text-slate-100 font-sans p-4 sm:p-8 lg:p-10 relative overflow-x-hidden selection:bg-brand-lime selection:text-black">
      {/* Background Glow */}
      <div className="fixed top-0 right-1/4 w-[500px] h-[500px] bg-brand-cyan/10 rounded-full blur-[150px] pointer-events-none -z-10"></div>
      <div className="fixed bottom-0 left-1/4 w-[500px] h-[500px] bg-brand-lime/10 rounded-full blur-[150px] pointer-events-none -z-10"></div>

      <div className="max-w-7xl mx-auto">
        {/* Top Header Bar */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-white/10 mb-8">
          <div>
            <div className="flex items-center gap-2 mb-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-brand-lime animate-ping"></span>
              <span className="font-mono text-xs text-brand-lime font-bold uppercase tracking-wider">
                ADMINISTRATION // APPROVAL CONTROL DESK
              </span>
            </div>
            <h1 className="font-display font-black text-2xl sm:text-4xl text-white">
              JITHON '27 Registration Management
            </h1>
            <p className="text-xs text-slate-400 font-sans mt-1">
              Review transaction receipts, verify UTR numbers, and approve hacker team admissions.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => {
                setIsQrModalOpen(true);
                setNewQrBase64('');
                setNewQrPreview('');
                setNewUpiId(qrSetting.upiId || '32488114540@sbi');
                setQrStatusMsg(null);
                playBeep(750, 0.05, 'triangle');
              }}
              className="px-4 py-2 rounded-xl bg-brand-cyan/15 hover:bg-brand-cyan/25 border border-brand-cyan/40 text-brand-cyan font-mono text-xs font-bold flex items-center gap-2 transition-all cursor-pointer shadow-lg shadow-brand-cyan/10"
            >
              <QrCode className="w-3.5 h-3.5" />
              <span>Change QR Code</span>
              {qrSetting?.isCustom && (
                <span className="w-2 h-2 rounded-full bg-brand-cyan animate-pulse"></span>
              )}
            </button>

            <button
              onClick={() => {
                setIsPasswordModalOpen(true);
                setCurrentPasswordInput('');
                setNewPasswordInput('');
                setConfirmPasswordInput('');
                setPasswordStatusMsg(null);
                playBeep(750, 0.05, 'triangle');
              }}
              className="px-4 py-2 rounded-xl bg-brand-purple/15 hover:bg-brand-purple/25 border border-brand-purple/40 text-purple-300 font-mono text-xs font-bold flex items-center gap-2 transition-all cursor-pointer shadow-lg shadow-brand-purple/10"
            >
              <KeyRound className="w-3.5 h-3.5" />
              <span>Change Password</span>
            </button>

            <button
              onClick={() => {
                setIsLoading(true);
                fetchRegistrations();
                fetchQrSetting();
              }}
              disabled={isLoading}
              className="px-4 py-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/15 text-slate-300 font-mono text-xs flex items-center gap-2 transition-all cursor-pointer"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${isLoading ? 'animate-spin' : ''}`} />
              <span>Refresh</span>
            </button>

            <button
              onClick={handleGoHome}
              className="px-4 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-white font-mono text-xs flex items-center gap-2 transition-all cursor-pointer"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Hackathon</span>
            </button>

            <button
              onClick={handleLogout}
              className="px-3.5 py-2 rounded-xl bg-red-500/15 hover:bg-red-500/25 border border-red-500/30 text-red-300 font-mono text-xs flex items-center gap-1.5 transition-all cursor-pointer"
              title="Log out of Admin Desk"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Logout</span>
            </button>
          </div>
        </div>

        {/* Real-Time Metrics Counters */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
          {/* Pending Card */}
          <div
            onClick={() => setActiveTab('pending')}
            className={`p-4 rounded-2xl border transition-all cursor-pointer ${
              activeTab === 'pending'
                ? 'bg-amber-400/10 border-amber-400 shadow-lg shadow-amber-400/10'
                : 'bg-black/50 border-white/10 hover:border-amber-400/50'
            }`}
          >
            <div className="flex items-center justify-between mb-1">
              <span className="font-mono text-[11px] text-amber-400 font-bold uppercase">
                Pending Approvals
              </span>
              <Clock className="w-4 h-4 text-amber-400" />
            </div>
            <div className="font-display font-black text-2xl sm:text-3xl text-white">
              {stats.pending || 0}
            </div>
            <span className="font-mono text-[10px] text-slate-400">Needs review & UTR match</span>
          </div>

          {/* Approved Card */}
          <div
            onClick={() => setActiveTab('approved')}
            className={`p-4 rounded-2xl border transition-all cursor-pointer ${
              activeTab === 'approved'
                ? 'bg-brand-lime/10 border-brand-lime shadow-lg shadow-brand-lime/10'
                : 'bg-black/50 border-white/10 hover:border-brand-lime/50'
            }`}
          >
            <div className="flex items-center justify-between mb-1">
              <span className="font-mono text-[11px] text-brand-lime font-bold uppercase">
                Approved Teams
              </span>
              <CheckCircle className="w-4 h-4 text-brand-lime" />
            </div>
            <div className="font-display font-black text-2xl sm:text-3xl text-white">
              {stats.approved || 0}
            </div>
            <span className="font-mono text-[10px] text-slate-400">Verified & passes minted</span>
          </div>

          {/* Rejected Card */}
          <div
            onClick={() => setActiveTab('rejected')}
            className={`p-4 rounded-2xl border transition-all cursor-pointer ${
              activeTab === 'rejected'
                ? 'bg-red-500/10 border-red-500 shadow-lg shadow-red-500/10'
                : 'bg-black/50 border-white/10 hover:border-red-500/50'
            }`}
          >
            <div className="flex items-center justify-between mb-1">
              <span className="font-mono text-[11px] text-red-400 font-bold uppercase">
                Rejected
              </span>
              <XCircle className="w-4 h-4 text-red-400" />
            </div>
            <div className="font-display font-black text-2xl sm:text-3xl text-white">
              {stats.rejected || 0}
            </div>
            <span className="font-mono text-[10px] text-slate-400">Invalid UTR / Duplicate</span>
          </div>

          {/* Total Card */}
          <div
            onClick={() => setActiveTab('all')}
            className={`p-4 rounded-2xl border transition-all cursor-pointer ${
              activeTab === 'all'
                ? 'bg-brand-cyan/10 border-brand-cyan shadow-lg shadow-brand-cyan/10'
                : 'bg-black/50 border-white/10 hover:border-brand-cyan/50'
            }`}
          >
            <div className="flex items-center justify-between mb-1">
              <span className="font-mono text-[11px] text-brand-cyan font-bold uppercase">
                Total Submissions
              </span>
              <Users className="w-4 h-4 text-brand-cyan" />
            </div>
            <div className="font-display font-black text-2xl sm:text-3xl text-white">
              {stats.total || 0}
            </div>
            <span className="font-mono text-[10px] text-slate-400">All registered hackers</span>
          </div>
        </div>

        {/* Filter Tabs & Search Bar */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 mb-6">
          {/* Tabs */}
          <div className="flex items-center gap-2 p-1 rounded-xl bg-black/60 border border-white/10 font-mono text-xs overflow-x-auto">
            <button
              onClick={() => setActiveTab('pending')}
              className={`px-3.5 py-1.5 rounded-lg font-bold transition-all cursor-pointer ${
                activeTab === 'pending'
                  ? 'bg-amber-400 text-black shadow-md'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Pending ({stats.pending || 0})
            </button>
            <button
              onClick={() => setActiveTab('approved')}
              className={`px-3.5 py-1.5 rounded-lg font-bold transition-all cursor-pointer ${
                activeTab === 'approved'
                  ? 'bg-brand-lime text-black shadow-md'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Approved ({stats.approved || 0})
            </button>
            <button
              onClick={() => setActiveTab('rejected')}
              className={`px-3.5 py-1.5 rounded-lg font-bold transition-all cursor-pointer ${
                activeTab === 'rejected'
                  ? 'bg-red-500 text-white shadow-md'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Rejected ({stats.rejected || 0})
            </button>
            <button
              onClick={() => setActiveTab('all')}
              className={`px-3.5 py-1.5 rounded-lg font-bold transition-all cursor-pointer ${
                activeTab === 'all'
                  ? 'bg-white text-black shadow-md'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              All ({stats.total || 0})
            </button>
          </div>

          {/* Search Box */}
          <div className="relative min-w-[260px]">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search team, leader, UTR, code..."
              className="w-full pl-9 pr-4 py-2 rounded-xl bg-black/60 border border-white/15 focus:border-brand-lime text-white font-sans text-xs focus:outline-none"
            />
          </div>
        </div>

        {/* Registration List / Approval Area */}
        {isLoading ? (
          <div className="p-16 rounded-2xl border border-white/10 bg-black/40 text-center font-mono text-sm text-slate-400">
            <RefreshCw className="w-6 h-6 animate-spin mx-auto mb-2 text-brand-lime" />
            Loading registrations from MongoDB...
          </div>
        ) : filteredRegistrations.length === 0 ? (
          <div className="p-16 rounded-2xl border-2 border-dashed border-white/10 bg-black/40 text-center">
            <AlertCircle className="w-8 h-8 text-slate-500 mx-auto mb-2" />
            <div className="font-display font-bold text-lg text-white mb-1">
              No registrations found
            </div>
            <p className="text-xs text-slate-400 font-sans max-w-sm mx-auto">
              {searchQuery
                ? 'No registrations match your search criteria.'
                : activeTab === 'pending'
                ? 'All pending submissions have been reviewed! New submissions will appear here.'
                : `No registrations found under "${activeTab}" status.`}
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {filteredRegistrations.map((reg) => (
              <div
                key={reg._id}
                className="p-5 rounded-2xl bg-black/60 border border-white/15 hover:border-white/30 transition-all flex flex-col lg:flex-row gap-6 items-start lg:items-center justify-between"
              >
                {/* Left: Team & Leader Details */}
                <div className="flex-1 space-y-2">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="font-display font-black text-xl text-white">
                      {reg.teamName}
                    </span>
                    <span className="font-mono text-[10px] text-brand-lime bg-brand-lime/10 px-2 py-0.5 rounded border border-brand-lime/30">
                      {reg.technologyDomain || 'Autonomous AI'}
                    </span>
                    <span className="font-mono text-[10px] text-slate-400 bg-white/5 px-2 py-0.5 rounded border border-white/10">
                      {reg.confirmationCode}
                    </span>

                    {/* Status Badge */}
                    {reg.status === 'approved' && (
                      <span className="font-mono text-[10px] font-bold text-brand-lime bg-brand-lime/20 px-2.5 py-0.5 rounded-full border border-brand-lime/50 flex items-center gap-1">
                        <CheckCircle className="w-3 h-3" /> APPROVED
                      </span>
                    )}
                    {reg.status === 'rejected' && (
                      <span className="font-mono text-[10px] font-bold text-red-400 bg-red-500/20 px-2.5 py-0.5 rounded-full border border-red-500/50 flex items-center gap-1">
                        <XCircle className="w-3 h-3" /> REJECTED
                      </span>
                    )}
                    {(!reg.status || reg.status === 'pending') && (
                      <span className="font-mono text-[10px] font-bold text-amber-400 bg-amber-400/20 px-2.5 py-0.5 rounded-full border border-amber-400/50 flex items-center gap-1 animate-pulse">
                        <Clock className="w-3 h-3" /> PENDING APPROVAL
                      </span>
                    )}
                  </div>

                  {/* Leader Info */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 font-mono text-xs text-slate-300 pt-1">
                    <div className="flex items-center gap-1.5 truncate">
                      <Users className="w-3.5 h-3.5 text-brand-cyan shrink-0" />
                      <span className="truncate">Leader: <strong className="text-white">{reg.name}</strong></span>
                    </div>
                    <div className="flex items-center gap-1.5 truncate">
                      <Mail className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                      <span className="truncate text-slate-300">{reg.email}</span>
                    </div>
                    <div className="flex items-center gap-1.5 truncate">
                      <Phone className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                      <span>{reg.mobile || 'N/A'}</span>
                    </div>
                  </div>

                  {/* College & Members Preview */}
                  <div className="flex flex-wrap items-center gap-3 font-mono text-[11px] text-slate-400">
                    <div className="flex items-center gap-1">
                      <Building className="w-3 h-3 text-slate-500" />
                      <span className="text-slate-300">{reg.college}</span>
                    </div>
                    <span>•</span>
                    <div className="w-full pt-1">
                      <span className="text-slate-500 block mb-1">
                        Teammates ({reg.members?.length || 0}):
                      </span>
                      {reg.members && reg.members.length > 0 ? (
                        <div className="flex flex-wrap gap-1.5">
                          {reg.members.map((m, mIdx) => (
                            <span
                              key={mIdx}
                              className="px-2 py-0.5 rounded-lg bg-white/5 border border-white/10 text-slate-200 text-[10px] inline-flex items-center gap-1.5"
                            >
                              <strong className="text-white">{m.name}</strong>
                              {m.mobile && (
                                <span className="text-brand-lime font-mono">📞 {m.mobile}</span>
                              )}
                              {m.email && (
                                <span className="text-brand-cyan">✉️ {m.email}</span>
                              )}
                            </span>
                          ))}
                        </div>
                      ) : (
                        <span className="text-slate-500 italic text-[10px]">Solo Leader</span>
                      )}
                    </div>
                  </div>
                </div>

                {/* Middle: Payment UTR & Screenshot */}
                <div className="p-3.5 rounded-xl bg-black/80 border border-white/10 w-full lg:w-auto shrink-0 space-y-2 font-mono text-xs">
                  <div className="flex items-center justify-between gap-3">
                    <span className="text-slate-400 text-[10px]">TRANSACTION ID / UTR</span>
                    <button
                      onClick={() => handleCopyUtr(reg.transactionId, reg._id)}
                      className="text-slate-400 hover:text-brand-lime flex items-center gap-1 text-[10px] cursor-pointer"
                    >
                      {copiedId === reg._id ? (
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

                  <div className="font-bold text-brand-cyan text-sm tracking-wide bg-white/5 px-2 py-1 rounded border border-white/10 select-all">
                    {reg.transactionId || 'NO_UTR_PROVIDED'}
                  </div>

                  {/* Screenshot Thumbnail */}
                  {reg.paymentScreenshot ? (
                    <button
                      onClick={() => setSelectedImage(reg.paymentScreenshot)}
                      className="w-full mt-1.5 px-2.5 py-1.5 rounded-lg bg-white/5 hover:bg-white/15 border border-brand-lime/30 text-brand-lime text-[11px] flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                    >
                      <Receipt className="w-3.5 h-3.5" />
                      <span>View Receipt Screenshot</span>
                    </button>
                  ) : (
                    <div className="text-[10px] text-slate-500 italic text-center">
                      No screenshot uploaded
                    </div>
                  )}
                </div>

                {/* Right: Approval Actions */}
                <div className="flex sm:flex-col gap-2 w-full sm:w-auto shrink-0 justify-end">
                  {reg.status !== 'approved' && (
                    <button
                      onClick={() => handleApprove(reg._id)}
                      disabled={actionLoading === reg._id}
                      className="flex-1 sm:flex-none px-4 py-2.5 rounded-xl bg-brand-lime text-black font-display font-black text-xs neo-shadow-white hover:bg-[#d8ff33] flex items-center justify-center gap-1.5 transition-all cursor-pointer disabled:opacity-50"
                    >
                      <CheckCircle className="w-4 h-4" />
                      <span>APPROVE</span>
                    </button>
                  )}

                  {reg.status !== 'rejected' && (
                    <button
                      onClick={() => handleReject(reg._id)}
                      disabled={actionLoading === reg._id}
                      className="flex-1 sm:flex-none px-4 py-2.5 rounded-xl bg-red-500/10 hover:bg-red-500/20 border border-red-500/30 text-red-400 font-mono text-xs flex items-center justify-center gap-1.5 transition-colors cursor-pointer disabled:opacity-50"
                    >
                      <XCircle className="w-4 h-4" />
                      <span>REJECT</span>
                    </button>
                  )}

                  <button
                    onClick={() => handleDelete(reg._id)}
                    className="p-2 rounded-xl text-slate-500 hover:text-red-400 hover:bg-white/5 transition-colors self-end cursor-pointer"
                    title="Delete permanently"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Dynamic Payment QR Code Configuration Modal */}
      {isQrModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-xl">
          <div className="relative max-w-3xl w-full bg-brand-dark border-2 border-brand-cyan rounded-3xl neo-shadow-cyan p-6 sm:p-8 max-h-[95vh] overflow-y-auto">
            {/* Header */}
            <div className="flex items-center justify-between pb-4 border-b border-white/10 mb-6">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-brand-cyan/20 border border-brand-cyan flex items-center justify-center text-brand-cyan">
                  <QrCode className="w-5 h-5" />
                </div>
                <div>
                  <h2 className="font-display font-black text-xl sm:text-2xl text-white flex items-center gap-2">
                    Payment QR Code Management
                  </h2>
                  <p className="text-xs text-slate-400 font-sans mt-0.5">
                    Upload a new payment QR code. Changes sync live across the entire registration page.
                  </p>
                </div>
              </div>
              <button
                onClick={() => setIsQrModalOpen(false)}
                className="p-2 rounded-xl bg-white/10 hover:bg-white/20 text-white cursor-pointer transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Status Alert Banner */}
            {qrStatusMsg && (
              <div
                className={`p-3.5 rounded-xl border mb-6 flex items-center gap-3 font-mono text-xs ${
                  qrStatusMsg.type === 'success'
                    ? 'bg-brand-lime/15 border-brand-lime text-brand-lime'
                    : 'bg-red-500/15 border-red-500 text-red-300'
                }`}
              >
                {qrStatusMsg.type === 'success' ? (
                  <Check className="w-4 h-4 shrink-0" />
                ) : (
                  <AlertCircle className="w-4 h-4 shrink-0" />
                )}
                <span>{qrStatusMsg.text}</span>
              </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Column 1: Current Live QR Code */}
              <div className="p-5 rounded-2xl bg-black/50 border border-white/10 flex flex-col items-center text-center">
                <div className="flex items-center justify-between w-full mb-3">
                  <span className="font-mono text-xs text-slate-400 font-bold uppercase">
                    Currently Active on Site
                  </span>
                  <span
                    className={`font-mono text-[10px] px-2 py-0.5 rounded font-bold uppercase ${
                      qrSetting.isCustom
                        ? 'bg-brand-cyan/20 text-brand-cyan border border-brand-cyan/40'
                        : 'bg-white/10 text-slate-300'
                    }`}
                  >
                    {qrSetting.isCustom ? 'Custom Uploaded' : 'Default Official'}
                  </span>
                </div>

                <div className="w-48 h-48 bg-white p-3 rounded-2xl flex items-center justify-center shadow-xl border-2 border-brand-cyan/40 mb-4 overflow-hidden">
                  <img
                    src={
                      qrSetting.qrImageUrl
                        ? getFullImageUrl(qrSetting.qrImageUrl)
                        : qrDefaultImage
                    }
                    alt="Active QR Code"
                    className="w-full h-full object-contain rounded-xl"
                  />
                </div>

                <div className="w-full bg-white/5 p-3 rounded-xl border border-white/10 font-mono text-xs text-left space-y-1">
                  <div className="text-slate-400 text-[11px]">ACTIVE UPI ID:</div>
                  <div className="text-brand-cyan font-bold truncate select-all">
                    {qrSetting.upiId || '32488114540@sbi'}
                  </div>
                </div>

                {qrSetting.isCustom && (
                  <button
                    type="button"
                    onClick={handleResetQrCode}
                    disabled={isUpdatingQr}
                    className="mt-4 px-3 py-1.5 rounded-lg bg-white/5 hover:bg-red-500/20 text-slate-400 hover:text-red-300 border border-white/10 hover:border-red-500/30 font-mono text-xs flex items-center gap-1.5 transition-colors cursor-pointer"
                  >
                    <RotateCcw className="w-3 h-3" />
                    <span>Reset to Default Official QR</span>
                  </button>
                )}
              </div>

              {/* Column 2: Upload New QR Code Form */}
              <form onSubmit={handleSaveQrCode} className="flex flex-col justify-between space-y-4">
                <div className="space-y-4">
                  <div>
                    <label className="block font-mono text-xs text-slate-300 uppercase mb-1.5 font-bold">
                      Upload New QR Image
                    </label>
                    <div className="relative border-2 border-dashed border-white/20 hover:border-brand-cyan rounded-2xl p-4 text-center bg-black/40 transition-colors">
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleQrFileSelect}
                        className="absolute inset-0 opacity-0 cursor-pointer w-full h-full"
                      />

                      {newQrPreview ? (
                        <div className="flex flex-col items-center gap-2">
                          <img
                            src={newQrPreview}
                            alt="New QR Preview"
                            className="w-28 h-28 object-contain bg-white p-2 rounded-xl shadow-lg border border-brand-cyan"
                          />
                          <span className="font-mono text-xs text-brand-lime font-bold">
                            ✓ New QR image selected
                          </span>
                          <span className="font-mono text-[10px] text-slate-400">
                            Click or drop to choose another image
                          </span>
                        </div>
                      ) : (
                        <div className="py-4 flex flex-col items-center">
                          <div className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center text-slate-400 mb-2">
                            <Upload className="w-6 h-6" />
                          </div>
                          <span className="font-mono text-xs text-white font-bold block mb-1">
                            Click to browse or drop QR image
                          </span>
                          <span className="font-mono text-[10px] text-slate-400">
                            PNG, JPG, or WEBP (Max 10MB)
                          </span>
                        </div>
                      )}
                    </div>
                  </div>

                  <div>
                    <label className="block font-mono text-xs text-slate-300 uppercase mb-1.5 font-bold">
                      UPI ID (Linked to this QR)
                    </label>
                    <input
                      type="text"
                      value={newUpiId}
                      onChange={(e) => setNewUpiId(e.target.value)}
                      placeholder="e.g. 32488114540@sbi"
                      className="w-full px-4 py-2.5 rounded-xl bg-black/60 border border-white/15 focus:border-brand-cyan text-white font-mono text-xs focus:outline-none transition-colors"
                    />
                    <span className="font-mono text-[10px] text-slate-500 mt-1 block">
                      This UPI ID will appear alongside the QR code and copy button on the main site.
                    </span>
                  </div>
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={isUpdatingQr || (!newQrBase64 && (!newUpiId || newUpiId.trim() === qrSetting.upiId))}
                    className="w-full py-3.5 rounded-xl bg-brand-cyan text-black font-display font-black text-sm neo-shadow-white hover:bg-[#33f3ff] disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 transition-all cursor-pointer"
                  >
                    {isUpdatingQr ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        <span>UPDATING LIVE SITE...</span>
                      </>
                    ) : (
                      <>
                        <CheckCircle className="w-4 h-4" />
                        <span>UPDATE QR ON MAIN SITE</span>
                      </>
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* Admin Password Change Modal */}
      {isPasswordModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-xl">
          <div className="relative max-w-md w-full bg-brand-dark border-2 border-brand-purple rounded-3xl neo-shadow-purple p-6 sm:p-8">
            <div className="flex items-center justify-between pb-4 border-b border-white/10 mb-6">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-brand-purple/20 border border-brand-purple flex items-center justify-center text-purple-300">
                  <KeyRound className="w-5 h-5" />
                </div>
                <div>
                  <h2 className="font-display font-black text-xl text-white">
                    Update Admin Password
                  </h2>
                  <p className="font-mono text-[10px] text-slate-400">
                    Saved directly in simple plain text (unhashed)
                  </p>
                </div>
              </div>
              <button
                onClick={() => setIsPasswordModalOpen(false)}
                className="p-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-white cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {passwordStatusMsg && (
              <div
                className={`p-3.5 rounded-xl font-mono text-xs flex items-center gap-2 mb-4 ${
                  passwordStatusMsg.type === 'success'
                    ? 'bg-brand-lime/20 border border-brand-lime text-brand-lime'
                    : 'bg-red-500/20 border border-red-500 text-red-300'
                }`}
              >
                {passwordStatusMsg.type === 'success' ? (
                  <CheckCircle className="w-4 h-4 shrink-0" />
                ) : (
                  <AlertCircle className="w-4 h-4 shrink-0" />
                )}
                <span>{passwordStatusMsg.text}</span>
              </div>
            )}

            <form onSubmit={handleChangePassword} className="space-y-4">
              <div>
                <label className="block font-mono text-xs text-slate-300 uppercase mb-1 font-bold">
                  Current Password
                </label>
                <input
                  type="password"
                  value={currentPasswordInput}
                  onChange={(e) => setCurrentPasswordInput(e.target.value)}
                  placeholder="Enter current password"
                  className="w-full px-4 py-2.5 rounded-xl bg-black/60 border border-white/15 focus:border-brand-purple text-white font-mono text-xs focus:outline-none"
                />
              </div>

              <div>
                <label className="block font-mono text-xs text-slate-300 uppercase mb-1 font-bold">
                  New Password (Plain Text) *
                </label>
                <input
                  type="password"
                  required
                  value={newPasswordInput}
                  onChange={(e) => setNewPasswordInput(e.target.value)}
                  placeholder="Enter new plain text password"
                  className="w-full px-4 py-2.5 rounded-xl bg-black/60 border border-white/15 focus:border-brand-purple text-white font-mono text-xs focus:outline-none"
                />
              </div>

              <div>
                <label className="block font-mono text-xs text-slate-300 uppercase mb-1 font-bold">
                  Confirm New Password *
                </label>
                <input
                  type="password"
                  required
                  value={confirmPasswordInput}
                  onChange={(e) => setConfirmPasswordInput(e.target.value)}
                  placeholder="Re-enter new password"
                  className="w-full px-4 py-2.5 rounded-xl bg-black/60 border border-white/15 focus:border-brand-purple text-white font-mono text-xs focus:outline-none"
                />
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  disabled={isUpdatingPassword}
                  className="w-full py-3 rounded-xl bg-purple-500 hover:bg-purple-400 text-white font-display font-black text-sm neo-shadow-white disabled:opacity-50 flex items-center justify-center gap-2 transition-all cursor-pointer"
                >
                  {isUpdatingPassword ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span>SAVING IN PLAIN TEXT...</span>
                    </>
                  ) : (
                    <>
                      <Shield className="w-4 h-4" />
                      <span>SAVE NEW PASSWORD</span>
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Image Modal Preview */}
      {selectedImage && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-lg">
          <div className="relative max-w-2xl w-full bg-brand-dark border-2 border-brand-lime rounded-3xl neo-shadow-lime p-5 max-h-[90vh] flex flex-col">
            <div className="flex items-center justify-between pb-3 border-b border-white/10 mb-3">
              <span className="font-mono text-xs text-brand-lime font-bold">
                PAYMENT TRANSACTION SCREENSHOT
              </span>
              <button
                onClick={() => setSelectedImage(null)}
                className="p-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-white cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="flex-1 overflow-auto flex items-center justify-center p-2 bg-black/60 rounded-xl">
              <img
                src={getFullImageUrl(selectedImage)}
                alt="Payment Receipt"
                className="max-h-[70vh] object-contain rounded-lg shadow-2xl"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
