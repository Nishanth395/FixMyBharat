'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useComplaints } from '@/lib/ComplaintContext';
import { StatusBadge, PriorityBadge, CategoryBadge } from '@/components/Badges';
import { 
  FileText, 
  Search, 
  MapPin, 
  Calendar, 
  ArrowRight, 
  PlusCircle, 
  Info,
  Filter
} from 'lucide-react';

export default function MyReportsPage() {
  const { complaints, loading } = useComplaints();
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [categoryFilter, setCategoryFilter] = useState<string>('all');

  const filtered = complaints.filter((c) => {
    const matchesSearch =
      c.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.location.address.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === 'all' || c.status === statusFilter;
    const matchesCategory = categoryFilter === 'all' || c.category === categoryFilter;

    return matchesSearch && matchesStatus && matchesCategory;
  });

  return (
    <div className="py-10 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-teal-950/70 border border-teal-500/30 text-teal-300 text-xs font-semibold mb-3">
            <FileText className="w-3.5 h-3.5" />
            <span>Citizen Tracking Portal</span>
          </div>
          <h1 className="text-3xl font-extrabold text-white tracking-tight">
            Citizen Complaints &amp; Civic Reports
          </h1>
          <p className="mt-1 text-slate-400 text-sm">
            Track real-time status, municipal assignments, and resolution notes for community reports.
          </p>
        </div>

        <Link
          href="/report"
          className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold text-white bg-teal-600 hover:bg-teal-500 shadow-md shadow-teal-600/25 transition-all self-start md:self-auto"
        >
          <PlusCircle className="w-4 h-4" />
          <span>Report New Issue</span>
        </Link>
      </div>

      {/* Demo Notice Banner */}
      <div className="mb-6 p-4 rounded-xl bg-[#0b1325] border border-amber-500/30 flex items-start gap-3 text-amber-200 text-xs sm:text-sm">
        <Info className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
        <div className="leading-relaxed">
          <strong className="text-white">Active Milestone 1 Demo Dataset:</strong> This registry displays mock civic reports combined with any new demo reports submitted from your browser session. Status updates made in the Authority Dashboard reflect here instantly.
        </div>
      </div>

      {/* Filter / Search Bar */}
      <div className="p-4 rounded-2xl bg-[#0b1325] border border-slate-800 mb-6 flex flex-col md:flex-row gap-3 items-stretch md:items-center">
        {/* Search */}
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search by Complaint ID (e.g. FMB-2026-8912), title, or location..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 rounded-xl bg-[#060b14] border border-slate-700 text-slate-200 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-teal-500 text-sm"
          />
        </div>

        {/* Status Filter */}
        <div className="flex items-center gap-2">
          <Filter className="w-4 h-4 text-slate-400 shrink-0" />
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
      </div>

      {/* Reports List */}
      {loading ? (
        <div className="p-12 text-center text-slate-400">Loading civic registry...</div>
      ) : filtered.length === 0 ? (
        <div className="p-12 text-center rounded-2xl bg-[#0b1325] border border-slate-850">
          <p className="text-slate-300 font-medium">No complaints match your filters.</p>
          <p className="text-xs text-slate-500 mt-1">Try clearing your search query or submit a new report.</p>
        </div>
      ) : (
        <div className="space-y-4">
          <div className="text-xs text-slate-400 font-semibold uppercase tracking-wider px-1">
            Displaying {filtered.length} of {complaints.length} Demo Complaints
          </div>

          <div className="grid grid-cols-1 gap-4">
            {filtered.map((item) => {
              const formattedDate = new Date(item.createdAt).toLocaleDateString('en-IN', {
                year: 'numeric',
                month: 'short',
                day: 'numeric',
                hour: '2-digit',
                minute: '2-digit',
              });

              return (
                <div
                  key={item.id}
                  className="p-5 sm:p-6 rounded-2xl bg-[#0b1325] border border-slate-800 hover:border-slate-700 transition-all flex flex-col md:flex-row gap-5 items-start md:items-center justify-between"
                >
                  <div className="space-y-3 flex-1 min-w-0">
                    {/* Header tags */}
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="font-mono text-xs font-bold text-teal-400 bg-teal-950/60 border border-teal-800/60 px-2 py-0.5 rounded">
                        {item.id}
                      </span>
                      <CategoryBadge category={item.category} />
                      <PriorityBadge priority={item.priority} size="sm" />
                      <StatusBadge status={item.status} size="sm" />
                    </div>

                    {/* Title */}
                    <h3 className="text-base sm:text-lg font-bold text-white hover:text-teal-300 transition-colors">
                      <Link href={`/complaints/${item.id}`}>{item.title}</Link>
                    </h3>

                    {/* Description excerpt */}
                    <p className="text-xs sm:text-sm text-slate-300 line-clamp-2 leading-relaxed">
                      {item.description}
                    </p>

                    {/* Location & Metadata */}
                    <div className="flex flex-wrap items-center gap-4 text-xs text-slate-400 pt-1">
                      <span className="inline-flex items-center gap-1.5 text-slate-300">
                        <MapPin className="w-3.5 h-3.5 text-teal-400 shrink-0" />
                        <span className="truncate max-w-xs">{item.location.address}, {item.location.city}</span>
                      </span>
                      <span className="inline-flex items-center gap-1 text-slate-400">
                        <Calendar className="w-3.5 h-3.5 text-slate-400" />
                        <span>{formattedDate}</span>
                      </span>
                      <span className="text-slate-400">
                        Dept: <strong className="text-slate-300">{item.assignedDepartment}</strong>
                      </span>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center gap-3 shrink-0 self-end md:self-center">
                    <Link
                      href={`/complaints/${item.id}`}
                      className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-semibold text-slate-200 bg-[#0f1a33] hover:bg-teal-600 hover:text-white border border-slate-700 hover:border-teal-500 transition-all"
                    >
                      <span>View Details</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
