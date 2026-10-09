'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useComplaints } from '@/lib/ComplaintContext';
import { StatusBadge, PriorityBadge, CategoryBadge } from '@/components/Badges';
import { Complaint, ComplaintStatus } from '@/types/complaint';
import { CATEGORY_LABELS } from '@/data/mockComplaints';
import { 
  LayoutDashboard, 
  Search, 
  MapPin, 
  Clock, 
  CheckCircle2, 
  UserCheck, 
  ArrowUpRight,
  TrendingUp,
  Map as MapIcon,
  RefreshCw,
  Layers,
  Info
} from 'lucide-react';

export default function AuthorityDashboard() {
  const { complaints, stats, updateStatus, assignComplaint, loading } = useComplaints();

  // Filters
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState<string>('all');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [priorityFilter, setPriorityFilter] = useState<string>('all');

  // Interactive drawer / quick modal for status update & assignment
  const [activeComplaint, setActiveComplaint] = useState<Complaint | null>(null);
  const [newStatus, setNewStatus] = useState<ComplaintStatus>('in_progress');
  const [statusNote, setStatusNote] = useState('');
  const [assignDept, setAssignDept] = useState('');
  const [assignOfficer, setAssignOfficer] = useState('');
  const [isUpdating, setIsUpdating] = useState(false);
  const [actionSuccess, setActionSuccess] = useState<string | null>(null);

  // Filter complaints
  const filtered = complaints.filter((c) => {
    const matchesSearch =
      c.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.location.address.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = categoryFilter === 'all' || c.category === categoryFilter;
    const matchesStatus = statusFilter === 'all' || c.status === statusFilter;
    const matchesPriority = priorityFilter === 'all' || c.priority === priorityFilter;

    return matchesSearch && matchesCategory && matchesStatus && matchesPriority;
  });

  const openQuickAction = (complaint: Complaint) => {
    setActiveComplaint(complaint);
    setNewStatus(complaint.status);
    setAssignDept(complaint.assignedDepartment);
    setAssignOfficer(complaint.assignedOfficer || '');
    setStatusNote('');
    setActionSuccess(null);
  };

  const handleApplyUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!activeComplaint) return;

    setIsUpdating(true);
    setActionSuccess(null);

    try {
      // If status changed
      if (newStatus !== activeComplaint.status || statusNote.trim()) {
        await updateStatus(
          activeComplaint.id,
          newStatus,
          statusNote.trim() || `Status updated to ${newStatus} via Authority Console.`,
          'Municipal Control Officer'
        );
      }

      // If department / officer changed
      if (
        assignDept !== activeComplaint.assignedDepartment ||
        assignOfficer !== (activeComplaint.assignedOfficer || '')
      ) {
        await assignComplaint(activeComplaint.id, assignDept, assignOfficer);
      }

      setActionSuccess(`Updated ${activeComplaint.id} successfully!`);
      setTimeout(() => {
        setActiveComplaint(null);
        setActionSuccess(null);
      }, 1200);
    } catch (err) {
      console.error('Update failed:', err);
    } finally {
      setIsUpdating(false);
    }
  };

  // Category distribution calculation
  const categoryCounts: Record<string, number> = {};
  complaints.forEach((c) => {
    categoryCounts[c.category] = (categoryCounts[c.category] || 0) + 1;
  });

  return (
    <div className="py-8 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
      {/* Top Banner */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-teal-950/70 border border-teal-500/30 text-teal-300 text-xs font-semibold mb-2">
            <LayoutDashboard className="w-3.5 h-3.5" />
            <span>Municipal Operations Center</span>
          </div>
          <h1 className="text-3xl font-extrabold text-white tracking-tight">
            Authority Command Dashboard
          </h1>
          <p className="mt-1 text-slate-400 text-sm">
            Triage, prioritize, and dispatch field crews across municipal wards in real time.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="px-3.5 py-2 rounded-xl bg-[#0b1325] border border-slate-800 text-xs text-slate-300 flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span>Ward Dispatch: <strong>Ward 112 Central</strong></span>
          </div>
        </div>
      </div>

      {/* Demo Warning / Synchronized Notice */}
      <div className="mb-6 p-4 rounded-xl bg-[#0f1a33] border border-cyan-500/30 flex items-start gap-3 text-cyan-200 text-xs sm:text-sm">
        <Info className="w-5 h-5 text-cyan-400 shrink-0 mt-0.5" />
        <div className="leading-relaxed">
          <strong className="text-white">Synchronized Demo Store:</strong> Any status changes or department assignments you perform here take immediate effect across <code>/my-reports</code> and <code>/complaints/[id]</code>. Changes are stored in browser memory &amp; localStorage for this prototype.
        </div>
      </div>

      {/* KPI Stats Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-5 gap-4 mb-8">
        {/* Total */}
        <div className="p-4 sm:p-5 rounded-2xl bg-[#0b1325] border border-slate-800">
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span className="text-xs font-semibold uppercase tracking-wider">Total Complaints</span>
            <Layers className="w-4 h-4 text-slate-400" />
          </div>
          <div className="text-2xl sm:text-3xl font-bold text-white">{stats.total}</div>
          <div className="text-[11px] text-slate-400 mt-1">Logged across all wards</div>
        </div>

        {/* Pending */}
        <div className="p-4 sm:p-5 rounded-2xl bg-[#0b1325] border border-slate-800">
          <div className="flex items-center justify-between text-amber-400 mb-2">
            <span className="text-xs font-semibold uppercase tracking-wider">Pending Triage</span>
            <Clock className="w-4 h-4" />
          </div>
          <div className="text-2xl sm:text-3xl font-bold text-amber-400">{stats.pending}</div>
          <div className="text-[11px] text-slate-400 mt-1">Awaiting dispatch</div>
        </div>

        {/* Assigned */}
        <div className="p-4 sm:p-5 rounded-2xl bg-[#0b1325] border border-slate-800">
          <div className="flex items-center justify-between text-cyan-400 mb-2">
            <span className="text-xs font-semibold uppercase tracking-wider">Assigned</span>
            <UserCheck className="w-4 h-4" />
          </div>
          <div className="text-2xl sm:text-3xl font-bold text-cyan-400">{stats.assigned}</div>
          <div className="text-[11px] text-slate-400 mt-1">Routed to dept crews</div>
        </div>

        {/* In Progress */}
        <div className="p-4 sm:p-5 rounded-2xl bg-[#0b1325] border border-slate-800">
          <div className="flex items-center justify-between text-blue-400 mb-2">
            <span className="text-xs font-semibold uppercase tracking-wider">In Progress</span>
            <RefreshCw className="w-4 h-4" />
          </div>
          <div className="text-2xl sm:text-3xl font-bold text-blue-400">{stats.inProgress}</div>
          <div className="text-[11px] text-slate-400 mt-1">Active field repairs</div>
        </div>

        {/* Resolved */}
        <div className="p-4 sm:p-5 rounded-2xl bg-[#0b1325] border border-slate-800 col-span-2 lg:col-span-1">
          <div className="flex items-center justify-between text-emerald-400 mb-2">
            <span className="text-xs font-semibold uppercase tracking-wider">Resolved</span>
            <CheckCircle2 className="w-4 h-4" />
          </div>
          <div className="text-2xl sm:text-3xl font-bold text-emerald-400">{stats.resolved}</div>
          <div className="text-[11px] text-slate-400 mt-1">Verified completions</div>
        </div>
      </div>

      {/* Section: Priority Queue & Visual Map Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        {/* GIS Map & Spatial Intelligence Section */}
        <div className="lg:col-span-2 p-6 rounded-2xl bg-[#0b1325] border border-slate-800 flex flex-col justify-between">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <MapIcon className="w-5 h-5 text-teal-400" />
              <h2 className="text-base font-bold text-white">Geospatial Ward Incident Cluster Map</h2>
            </div>
            <span className="text-xs font-mono px-2 py-0.5 rounded bg-[#0f1a33] text-teal-300 border border-teal-800/50">
              Demo OpenStreetMap / GIS Placeholder
            </span>
          </div>

          {/* Interactive GIS Placeholder Visual */}
          <div className="relative rounded-xl overflow-hidden border border-slate-800 bg-[#060b14] h-72 flex flex-col items-center justify-center p-6 text-center">
            {/* Map styling grid lines */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#152243_1px,transparent_1px),linear-gradient(to_bottom,#152243_1px,transparent_1px)] bg-[size:3rem_3rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] opacity-30" />

            {/* Simulated Hotspot markers */}
            <div className="absolute top-1/4 left-1/3 flex items-center gap-1 group cursor-pointer">
              <span className="relative flex h-4 w-4">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-4 w-4 bg-red-500 text-[9px] font-bold text-white items-center justify-center">P0</span>
              </span>
              <span className="text-[10px] text-red-300 bg-red-950/80 px-1.5 py-0.5 rounded border border-red-800">
                St. Marks Junction
              </span>
            </div>

            <div className="absolute top-1/2 right-1/4 flex items-center gap-1 group cursor-pointer">
              <span className="relative flex h-3.5 w-3.5">
                <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-orange-500 text-[8px] font-bold text-white items-center justify-center">P1</span>
              </span>
              <span className="text-[10px] text-orange-300 bg-orange-950/80 px-1.5 py-0.5 rounded border border-orange-800">
                ORR Flyover
              </span>
            </div>

            <div className="absolute bottom-1/4 left-1/2 flex items-center gap-1 group cursor-pointer">
              <span className="relative flex h-3.5 w-3.5">
                <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-blue-500 text-[8px] font-bold text-white items-center justify-center">P1</span>
              </span>
              <span className="text-[10px] text-blue-300 bg-blue-950/80 px-1.5 py-0.5 rounded border border-blue-800">
                HSR 14th Main
              </span>
            </div>

            <div className="relative z-10 max-w-sm">
              <div className="w-10 h-10 rounded-xl bg-teal-950 border border-teal-500/40 text-teal-400 flex items-center justify-center mx-auto mb-3">
                <MapPin className="w-5 h-5" />
              </div>
              <h4 className="text-sm font-bold text-white">Geospatial GIS Engine Preview</h4>
              <p className="text-xs text-slate-400 mt-1">
                Visualizing {complaints.length} geocoded observations. Leaflet / OpenStreetMap and PostGIS clustering will be attached in Milestone 2.
              </p>
            </div>
          </div>

          <div className="mt-4 flex flex-wrap items-center justify-between gap-2 text-xs text-slate-400">
            <div className="flex items-center gap-4">
              <span className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-red-500" />
                <span>P0 Critical ({stats.critical})</span>
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-orange-500" />
                <span>P1 High</span>
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-yellow-500" />
                <span>P2 Medium</span>
              </span>
            </div>
            <span className="text-teal-400 font-mono text-[11px]">Lat: 12.9716° N · Lng: 77.5946° E</span>
          </div>
        </div>

        {/* Category & Status Breakdown Card */}
        <div className="p-6 rounded-2xl bg-[#0b1325] border border-slate-800 flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <TrendingUp className="w-5 h-5 text-teal-400" />
              <h2 className="text-base font-bold text-white">Category Distribution</h2>
            </div>

            <div className="space-y-3">
              {Object.entries(CATEGORY_LABELS).map(([catKey, catMeta]) => {
                const count = categoryCounts[catKey] || 0;
                const percentage = stats.total > 0 ? Math.round((count / stats.total) * 100) : 0;

                return (
                  <div key={catKey}>
                    <div className="flex items-center justify-between text-xs mb-1">
                      <span className="text-slate-300 truncate pr-2">{catMeta.label}</span>
                      <span className="font-semibold text-white">{count} ({percentage}%)</span>
                    </div>
                    <div className="w-full bg-[#060b14] h-2 rounded-full overflow-hidden border border-slate-800">
                      <div
                        className="bg-teal-500 h-full rounded-full transition-all duration-500"
                        style={{ width: `${percentage}%` }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="mt-6 pt-4 border-t border-slate-800 text-xs text-slate-400 flex items-center justify-between">
            <span>Triage Accuracy Score:</span>
            <span className="font-bold text-teal-400">94.8% (Model v1)</span>
          </div>
        </div>
      </div>

      {/* Filter Toolbar */}
      <div className="p-4 rounded-2xl bg-[#0b1325] border border-slate-800 mb-6 flex flex-col md:flex-row gap-3 items-stretch md:items-center">
        {/* Search */}
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search by ID, title, or address..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 rounded-xl bg-[#060b14] border border-slate-700 text-slate-200 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-teal-500 text-sm"
          />
        </div>

        {/* Priority Filter */}
        <select
          value={priorityFilter}
          onChange={(e) => setPriorityFilter(e.target.value)}
          className="px-3 py-2 rounded-xl bg-[#060b14] border border-slate-700 text-slate-200 focus:outline-none focus:ring-2 focus:ring-teal-500 text-sm"
        >
          <option value="all">All Priorities</option>
          <option value="critical">P0 Critical</option>
          <option value="high">P1 High</option>
          <option value="medium">P2 Medium</option>
          <option value="low">P3 Low</option>
        </select>

        {/* Status Filter */}
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="px-3 py-2 rounded-xl bg-[#060b14] border border-slate-700 text-slate-200 focus:outline-none focus:ring-2 focus:ring-teal-500 text-sm"
        >
          <option value="all">All Statuses</option>
          <option value="pending">Pending</option>
          <option value="assigned">Assigned</option>
          <option value="in_progress">In Progress</option>
          <option value="resolved">Resolved</option>
        </select>

        {/* Category Filter */}
        <select
          value={categoryFilter}
          onChange={(e) => setCategoryFilter(e.target.value)}
          className="px-3 py-2 rounded-xl bg-[#060b14] border border-slate-700 text-slate-200 focus:outline-none focus:ring-2 focus:ring-teal-500 text-sm"
        >
          <option value="all">All Categories</option>
          <option value="potholes">Potholes</option>
          <option value="open_manholes">Open Manholes</option>
          <option value="water_leakage">Water Leakage</option>
          <option value="garbage">Garbage</option>
          <option value="drainage">Drainage</option>
          <option value="streetlights">Streetlights</option>
          <option value="footpath">Footpaths</option>
        </select>
      </div>

      {/* Priority Operational Table */}
      <div className="rounded-2xl bg-[#0b1325] border border-slate-800 overflow-hidden shadow-xl">
        <div className="p-4 sm:p-5 border-b border-slate-800 flex items-center justify-between">
          <div>
            <h3 className="text-base font-bold text-white">Live Complaint Priority Queue</h3>
            <p className="text-xs text-slate-400 mt-0.5">
              Showing {filtered.length} prioritized tickets matching current operational filters
            </p>
          </div>
        </div>

        {loading ? (
          <div className="p-12 text-center text-slate-400">Loading operations queue...</div>
        ) : filtered.length === 0 ? (
          <div className="p-12 text-center text-slate-400">
            No complaints found matching your criteria.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs sm:text-sm">
              <thead>
                <tr className="border-b border-slate-800 bg-[#060b14] text-slate-400 uppercase tracking-wider text-[11px]">
                  <th className="py-3 px-4 font-semibold">Complaint ID</th>
                  <th className="py-3 px-4 font-semibold">Priority</th>
                  <th className="py-3 px-4 font-semibold">Category &amp; Title</th>
                  <th className="py-3 px-4 font-semibold">Location</th>
                  <th className="py-3 px-4 font-semibold">Status</th>
                  <th className="py-3 px-4 font-semibold">Assigned Dept / Officer</th>
                  <th className="py-3 px-4 font-semibold text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60">
                {filtered.map((item) => (
                  <tr
                    key={item.id}
                    className="hover:bg-[#0f1a33]/60 transition-colors group"
                  >
                    {/* ID */}
                    <td className="py-3.5 px-4 font-mono font-bold text-teal-400 whitespace-nowrap">
                      <Link href={`/complaints/${item.id}`} className="hover:underline">
                        {item.id}
                      </Link>
                    </td>

                    {/* Priority */}
                    <td className="py-3.5 px-4 whitespace-nowrap">
                      <PriorityBadge priority={item.priority} size="sm" />
                    </td>

                    {/* Title */}
                    <td className="py-3.5 px-4 max-w-xs sm:max-w-md">
                      <div className="font-semibold text-white truncate">{item.title}</div>
                      <div className="text-[11px] text-slate-400 flex items-center gap-1.5 mt-0.5">
                        <CategoryBadge category={item.category} showIcon={false} />
                        {item.aiAnalysis && (
                          <span className="text-teal-400 font-mono text-[10px]">
                            AI Conf: {Math.round(item.aiAnalysis.confidenceScore * 100)}%
                          </span>
                        )}
                      </div>
                    </td>

                    {/* Location */}
                    <td className="py-3.5 px-4 text-slate-300 max-w-xs truncate">
                      <div className="truncate">{item.location.address}</div>
                      <div className="text-[11px] text-slate-500">{item.location.city}</div>
                    </td>

                    {/* Status */}
                    <td className="py-3.5 px-4 whitespace-nowrap">
                      <StatusBadge status={item.status} size="sm" />
                    </td>

                    {/* Dept */}
                    <td className="py-3.5 px-4 text-slate-300 max-w-xs">
                      <div className="truncate font-medium text-slate-200">{item.assignedDepartment}</div>
                      <div className="text-[11px] text-slate-400 truncate">
                        {item.assignedOfficer || 'Unassigned Officer'}
                      </div>
                    </td>

                    {/* Actions */}
                    <td className="py-3.5 px-4 text-right whitespace-nowrap">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => openQuickAction(item)}
                          className="px-2.5 py-1.5 rounded-lg text-xs font-semibold bg-teal-950 text-teal-300 hover:bg-teal-900 border border-teal-700/50 transition-colors"
                        >
                          Update Status
                        </button>
                        <Link
                          href={`/complaints/${item.id}`}
                          className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
                          title="Open full complaint details"
                        >
                          <ArrowUpRight className="w-4 h-4" />
                        </Link>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Quick Action Drawer / Modal */}
      {activeComplaint && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#0b1325] border border-slate-750 w-full max-w-lg rounded-2xl shadow-2xl p-6 overflow-hidden animate-in fade-in zoom-in-95">
            <div className="flex items-center justify-between pb-4 border-b border-slate-800">
              <div>
                <span className="text-xs font-mono font-bold text-teal-400">
                  {activeComplaint.id}
                </span>
                <h3 className="text-lg font-bold text-white mt-0.5">
                  Update Complaint Status &amp; Assignment
                </h3>
              </div>
              <button
                onClick={() => setActiveComplaint(null)}
                className="text-slate-400 hover:text-white text-lg p-1"
              >
                ✕
              </button>
            </div>

            {actionSuccess && (
              <div className="mt-4 p-3 rounded-xl bg-emerald-950/70 border border-emerald-500/40 text-emerald-300 text-xs">
                {actionSuccess}
              </div>
            )}

            <form onSubmit={handleApplyUpdate} className="space-y-4 mt-4">
              <div>
                <label className="block text-xs font-semibold uppercase text-slate-400 mb-1">
                  Issue Summary
                </label>
                <p className="text-xs text-slate-200 bg-[#060b14] p-3 rounded-lg border border-slate-800">
                  {activeComplaint.title}
                </p>
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase text-slate-400 mb-1">
                  Current Status → New Status
                </label>
                <select
                  value={newStatus}
                  onChange={(e) => setNewStatus(e.target.value as ComplaintStatus)}
                  className="w-full px-3 py-2 rounded-xl bg-[#060b14] border border-slate-700 text-slate-200 text-sm focus:ring-2 focus:ring-teal-500"
                >
                  <option value="pending">Pending</option>
                  <option value="assigned">Assigned</option>
                  <option value="in_progress">In Progress</option>
                  <option value="resolved">Resolved</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase text-slate-400 mb-1">
                  Assigned Municipal Department
                </label>
                <input
                  type="text"
                  value={assignDept}
                  onChange={(e) => setAssignDept(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-[#060b14] border border-slate-700 text-slate-200 text-sm"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase text-slate-400 mb-1">
                  Assigned Field Engineer / Officer
                </label>
                <input
                  type="text"
                  placeholder="e.g. Er. K. Sharma (Assistant Executive Engineer)"
                  value={assignOfficer}
                  onChange={(e) => setAssignOfficer(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-[#060b14] border border-slate-700 text-slate-200 text-sm"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase text-slate-400 mb-1">
                  Progress Note / Resolution Audit Remark
                </label>
                <textarea
                  rows={2}
                  placeholder="e.g. Work crew mobilized; bitumen patched and inspected."
                  value={statusNote}
                  onChange={(e) => setStatusNote(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-[#060b14] border border-slate-700 text-slate-200 text-sm"
                />
              </div>

              <div className="pt-4 border-t border-slate-800 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setActiveComplaint(null)}
                  className="px-4 py-2 rounded-xl text-xs font-medium text-slate-400 hover:text-white"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isUpdating}
                  className="px-5 py-2 rounded-xl text-xs font-semibold text-white bg-teal-600 hover:bg-teal-500 shadow-md shadow-teal-600/30 transition-all disabled:opacity-50"
                >
                  {isUpdating ? 'Saving...' : 'Save & Propagate Update'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
