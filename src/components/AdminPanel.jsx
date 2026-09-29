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
} from 'lucide-react';
import { playBeep } from '../utils/audio';

export default function AdminPanel() {
  const [registrations, setRegistrations] = useState([]);
  const [stats, setStats] = useState({ total: 0, pending: 0, approved: 0, rejected: 0 });
  const [activeTab, setActiveTab] = useState('pending'); // 'pending' | 'approved' | 'rejected' | 'all'
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState(null); // id of item being approved/rejected
  const [selectedImage, setSelectedImage] = useState(null); // modal preview for screenshot
  const [copiedId, setCopiedId] = useState(null);

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
    let ignore = false;
    async function load() {
      try {
        const [regRes, statsRes] = await Promise.all([
          fetch(`${apiUrl}/registrations?limit=100`),
          fetch(`${apiUrl}/registrations/stats`),
        ]);
        const regData = await regRes.json();
        const statsData = await statsRes.json();
        if (!ignore) {
          if (regData.success) setRegistrations(regData.data || []);
          if (statsData.success) setStats(statsData.stats || { total: 0, pending: 0, approved: 0, rejected: 0 });
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
  }, [apiUrl]);

  const handleGoHome = () => {
    window.history.pushState({}, '', '/');
    window.dispatchEvent(new PopStateEvent('popstate'));
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
              JITUrnHACK '26 Registration Management
            </h1>
            <p className="text-xs text-slate-400 font-sans mt-1">
              Review transaction receipts, verify UTR numbers, and approve hacker team admissions.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => {
                setIsLoading(true);
                fetchRegistrations();
              }}
              disabled={isLoading}
              className="px-4 py-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/15 text-slate-300 font-mono text-xs flex items-center gap-2 transition-all cursor-pointer"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${isLoading ? 'animate-spin' : ''}`} />
              <span>Refresh</span>
            </button>

            <button
              onClick={handleGoHome}
              className="px-4 py-2 rounded-xl bg-brand-lime text-black font-display font-black text-xs neo-shadow-white hover:bg-[#d8ff33] flex items-center gap-2 transition-all cursor-pointer"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back to Hackathon</span>
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
