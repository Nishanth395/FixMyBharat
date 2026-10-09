'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { useComplaints } from '@/lib/ComplaintContext';
import { StatusBadge, PriorityBadge, CategoryBadge } from '@/components/Badges';
import { ComplaintStatus } from '@/types/complaint';
import { 
  ArrowLeft, 
  MapPin, 
  Building2, 
  User, 
  Sparkles, 
  Clock, 
  AlertOctagon,
  Send
} from 'lucide-react';

export default function ComplaintDetailPage() {
  const params = useParams();
  const complaintId = params?.id as string;
  const { getComplaintById, updateStatus, loading } = useComplaints();

  // Detail status update state
  const [newStatus, setNewStatus] = useState<ComplaintStatus>('in_progress');
  const [note, setNote] = useState('');
  const [officerName, setOfficerName] = useState('Ward Duty Engineer');
  const [isUpdating, setIsUpdating] = useState(false);
  const [feedbackMsg, setFeedbackMsg] = useState<string | null>(null);

  if (loading) {
    return (
      <div className="py-20 text-center text-slate-400">
        Loading complaint record...
      </div>
    );
  }

  const complaint = getComplaintById(complaintId);

  // Clear not-found state for unknown IDs
  if (!complaint) {
    return (
      <div className="py-16 px-4 max-w-xl mx-auto text-center">
        <div className="w-16 h-16 rounded-2xl bg-red-950/60 border border-red-500/40 text-red-400 flex items-center justify-center mx-auto mb-4">
          <AlertOctagon className="w-8 h-8" />
        </div>
        <h1 className="text-2xl font-bold text-white mb-2">Complaint Record Not Found</h1>
        <p className="text-slate-400 text-sm mb-6 leading-relaxed">
          The requested identifier <code className="text-teal-400 font-mono bg-[#0b1325] px-2 py-0.5 rounded border border-slate-800">{complaintId}</code> does not exist in the current FixMyBharat municipal demo store.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link
            href="/my-reports"
            className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold text-white bg-teal-600 hover:bg-teal-500 transition-all"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Citizen Reports</span>
          </Link>
          <Link
            href="/dashboard"
            className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl text-sm font-medium text-slate-300 bg-[#0b1325] hover:bg-[#152243] border border-slate-700 transition-all"
          >
            <span>Authority Dashboard</span>
          </Link>
        </div>
      </div>
    );
  }

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsUpdating(true);
    setFeedbackMsg(null);
    try {
      await updateStatus(
        complaint.id,
        newStatus,
        note.trim() || `Status updated to ${newStatus}.`,
        officerName.trim() || 'Ward Duty Engineer'
      );
      setFeedbackMsg('Complaint record updated and audit timeline recorded.');
      setNote('');
      setTimeout(() => setFeedbackMsg(null), 3000);
    } catch (err) {
      console.error('Update failed:', err);
    } finally {
      setIsUpdating(false);
    }
  };

  const createdFormatted = new Date(complaint.createdAt).toLocaleDateString('en-IN', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });

  return (
    <div className="py-10 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto w-full">
      {/* Navigation Breadcrumb */}
      <div className="flex items-center justify-between gap-4 mb-6">
        <Link
          href="/my-reports"
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-400 hover:text-teal-300 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to All Reports</span>
        </Link>
        <div className="flex items-center gap-2">
          <Link
            href="/dashboard"
            className="text-xs text-teal-400 hover:text-teal-300 underline font-medium"
          >
            Open in Operations Console →
          </Link>
        </div>
      </div>

      {/* Main Dossier Header */}
      <div className="p-6 sm:p-8 rounded-2xl bg-[#0b1325] border border-slate-800 shadow-xl mb-8">
        <div className="flex flex-wrap items-center gap-3 mb-4">
          <span className="font-mono text-sm font-bold text-teal-400 bg-teal-950/80 border border-teal-800/80 px-3 py-1 rounded-lg">
            {complaint.id}
          </span>
          <CategoryBadge category={complaint.category} />
          <PriorityBadge priority={complaint.priority} />
          <StatusBadge status={complaint.status} size="lg" />
        </div>

        <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight leading-snug">
          {complaint.title}
        </h1>

        <p className="mt-4 text-slate-300 text-sm sm:text-base leading-relaxed bg-[#060b14] p-4 rounded-xl border border-slate-800/80">
          {complaint.description}
        </p>

        <div className="mt-6 pt-6 border-t border-slate-800 grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs text-slate-400">
          <div>
            <span className="block text-slate-500 uppercase font-semibold text-[10px] tracking-wider mb-1">
              Filing Timestamp
            </span>
            <span className="text-slate-200 font-medium">{createdFormatted}</span>
          </div>

          <div>
            <span className="block text-slate-500 uppercase font-semibold text-[10px] tracking-wider mb-1">
              Assigned Department
            </span>
            <span className="text-teal-300 font-medium">{complaint.assignedDepartment}</span>
          </div>

          <div>
            <span className="block text-slate-500 uppercase font-semibold text-[10px] tracking-wider mb-1">
              Supervising Officer
            </span>
            <span className="text-slate-200 font-medium">{complaint.assignedOfficer || 'Pending Assignment'}</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left 2 Cols: Visual Evidence + AI Triage + Timeline */}
        <div className="lg:col-span-2 space-y-8">
          {/* Visual Evidence Section */}
          <div className="p-6 rounded-2xl bg-[#0b1325] border border-slate-800">
            <h2 className="text-sm font-semibold uppercase tracking-wider text-teal-400 mb-4 flex items-center gap-2">
              <Sparkles className="w-4 h-4" />
              Photographic Evidence &amp; Visual Verification
            </h2>

            {complaint.imageUrl ? (
              <div className="rounded-xl overflow-hidden border border-slate-800 bg-[#060b14]">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={complaint.imageUrl}
                  alt={complaint.title}
                  className="w-full max-h-96 object-cover"
                />
                <div className="p-3 text-xs text-slate-400 flex items-center justify-between border-t border-slate-800">
                  <span>Georeferenced camera capture</span>
                  <span className="text-teal-400 font-mono">Exif Geotag Verified</span>
                </div>
              </div>
            ) : (
              <div className="p-8 rounded-xl bg-[#060b14] border border-slate-800 text-center text-slate-400 text-xs">
                No photograph was attached with this submission.
              </div>
            )}

            {/* AI Computer Vision Dossier */}
            {complaint.aiAnalysis && (
              <div className="mt-4 p-4 rounded-xl bg-[#0f1a33] border border-teal-500/30 text-xs space-y-2.5">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-teal-300 uppercase tracking-wider text-[11px] flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-teal-400" />
                    AI Computer Vision &amp; Severity Assessment
                  </span>
                  <span className="font-mono font-bold text-teal-400">
                    Confidence: {Math.round(complaint.aiAnalysis.confidenceScore * 100)}%
                  </span>
                </div>

                <div className="text-slate-300">
                  <strong className="text-slate-200">Urgency Reason: </strong>
                  {complaint.aiAnalysis.urgencyReason}
                </div>

                <div className="flex flex-wrap gap-1.5 pt-1">
                  {complaint.aiAnalysis.detectedObjects.map((obj, i) => (
                    <span
                      key={i}
                      className="px-2 py-0.5 rounded bg-[#0b1325] text-slate-300 border border-slate-700 text-[11px]"
                    >
                      {obj}
                    </span>
                  ))}
                </div>

                {complaint.aiAnalysis.estimatedCostRange && (
                  <div className="text-slate-400 pt-1 text-[11px]">
                    Municipal Repair Budget Estimate: <strong className="text-slate-200">{complaint.aiAnalysis.estimatedCostRange}</strong>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Audit Trail & Status Timeline */}
          <div className="p-6 rounded-2xl bg-[#0b1325] border border-slate-800">
            <h2 className="text-sm font-semibold uppercase tracking-wider text-teal-400 mb-6 flex items-center gap-2">
              <Clock className="w-4 h-4" />
              Transparent Audit Log &amp; Resolution History
            </h2>

            <div className="relative pl-6 space-y-6 before:absolute before:left-2.5 before:top-2 before:bottom-2 before:w-0.5 before:bg-slate-800">
              {complaint.updates.map((update, idx) => {
                const date = new Date(update.timestamp).toLocaleDateString('en-IN', {
                  month: 'short',
                  day: 'numeric',
                  hour: '2-digit',
                  minute: '2-digit',
                });

                return (
                  <div key={update.id || idx} className="relative group">
                    {/* Circle icon */}
                    <div className="absolute -left-6 top-1 w-3 h-3 rounded-full bg-teal-400 ring-4 ring-[#0b1325]" />

                    <div className="bg-[#060b14] p-4 rounded-xl border border-slate-800">
                      <div className="flex flex-wrap items-center justify-between gap-2 mb-1.5">
                        <StatusBadge status={update.status} size="sm" />
                        <span className="text-[11px] font-mono text-slate-400">{date}</span>
                      </div>
                      <p className="text-xs sm:text-sm text-slate-200 leading-relaxed">
                        {update.note}
                      </p>
                      <div className="text-[11px] text-slate-500 mt-2">
                        Updated by: <span className="text-slate-400 font-medium">{update.updatedBy}</span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Right Col: Location Dossier + Citizen Details + Authority Action Box */}
        <div className="space-y-6">
          {/* Location Box */}
          <div className="p-6 rounded-2xl bg-[#0b1325] border border-slate-800">
            <h3 className="text-sm font-semibold uppercase tracking-wider text-teal-400 mb-4 flex items-center gap-2">
              <MapPin className="w-4 h-4" />
              Location Information
            </h3>

            <div className="space-y-3 text-xs sm:text-sm">
              <div>
                <span className="text-slate-500 block text-xs">Address:</span>
                <span className="text-slate-200 font-medium">{complaint.location.address}</span>
              </div>

              {complaint.location.landmark && (
                <div>
                  <span className="text-slate-500 block text-xs">Landmark:</span>
                  <span className="text-slate-300">{complaint.location.landmark}</span>
                </div>
              )}

              <div className="flex justify-between text-xs pt-1">
                <div>
                  <span className="text-slate-500 block">City:</span>
                  <span className="text-slate-300 font-medium">{complaint.location.city}</span>
                </div>
                {complaint.location.pincode && (
                  <div>
                    <span className="text-slate-500 block">PIN:</span>
                    <span className="text-slate-300 font-mono">{complaint.location.pincode}</span>
                  </div>
                )}
              </div>

              {complaint.location.latitude && complaint.location.longitude && (
                <div className="p-2.5 rounded-lg bg-[#060b14] border border-slate-800 font-mono text-xs text-teal-400 mt-2">
                  <div>GPS: {complaint.location.latitude.toFixed(6)}° N</div>
                  <div>LNG: {complaint.location.longitude.toFixed(6)}° E</div>
                </div>
              )}
            </div>
          </div>

          {/* Citizen Reporter Info */}
          <div className="p-6 rounded-2xl bg-[#0b1325] border border-slate-800">
            <h3 className="text-sm font-semibold uppercase tracking-wider text-teal-400 mb-4 flex items-center gap-2">
              <User className="w-4 h-4" />
              Citizen Reporter Details
            </h3>

            <div className="space-y-2.5 text-xs sm:text-sm text-slate-300">
              <div className="flex items-center justify-between">
                <span className="text-slate-500">Name:</span>
                <span className="font-medium text-white">{complaint.citizenName || 'Civic Observer'}</span>
              </div>
              {complaint.citizenPhone && (
                <div className="flex items-center justify-between">
                  <span className="text-slate-500">Contact:</span>
                  <span className="font-mono text-slate-300">{complaint.citizenPhone}</span>
                </div>
              )}
              <div className="flex items-center justify-between text-[11px] text-slate-500 pt-2 border-t border-slate-800">
                <span>Verification State:</span>
                <span className="text-emerald-400 font-semibold">Self-Certified Citizen</span>
              </div>
            </div>
          </div>

          {/* Authority Action Widget (In-place status modification) */}
          <div className="p-6 rounded-2xl bg-[#0f1a33] border border-teal-500/30">
            <h3 className="text-sm font-semibold uppercase tracking-wider text-teal-300 mb-3 flex items-center gap-2">
              <Building2 className="w-4 h-4 text-teal-400" />
              Authority Action Console
            </h3>
            <p className="text-xs text-slate-300 mb-4 leading-relaxed">
              Municipal supervisors can update ticket status and log inspection notes directly to the audit trail.
            </p>

            {feedbackMsg && (
              <div className="mb-4 p-3 rounded-lg bg-emerald-950/70 border border-emerald-500/40 text-emerald-300 text-xs">
                {feedbackMsg}
              </div>
            )}

            <form onSubmit={handleUpdate} className="space-y-3.5">
              <div>
                <label className="block text-[11px] font-semibold uppercase tracking-wider text-slate-300 mb-1">
                  Change Status
                </label>
                <select
                  value={newStatus}
                  onChange={(e) => setNewStatus(e.target.value as ComplaintStatus)}
                  className="w-full px-3 py-2 rounded-xl bg-[#060b14] border border-slate-700 text-slate-200 text-xs focus:ring-2 focus:ring-teal-500"
                >
                  <option value="pending">Pending Review</option>
                  <option value="assigned">Assigned to Dept</option>
                  <option value="in_progress">In Progress (Field Work)</option>
                  <option value="resolved">Resolved (Completed)</option>
                </select>
              </div>

              <div>
                <label className="block text-[11px] font-semibold uppercase tracking-wider text-slate-300 mb-1">
                  Inspecting Officer
                </label>
                <input
                  type="text"
                  value={officerName}
                  onChange={(e) => setOfficerName(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-[#060b14] border border-slate-700 text-slate-200 text-xs"
                />
              </div>

              <div>
                <label className="block text-[11px] font-semibold uppercase tracking-wider text-slate-300 mb-1">
                  Inspection Note / Resolution Memo
                </label>
                <textarea
                  rows={2}
                  placeholder="Record materials deployed, contractor info or verification..."
                  value={note}
                  onChange={(e) => setNote(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-[#060b14] border border-slate-700 text-slate-200 text-xs"
                />
              </div>

              <button
                type="submit"
                disabled={isUpdating}
                className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl font-semibold text-xs text-white bg-teal-600 hover:bg-teal-500 shadow-md shadow-teal-600/30 transition-all disabled:opacity-50"
              >
                <Send className="w-3.5 h-3.5" />
                <span>{isUpdating ? 'Recording...' : 'Append Status Update'}</span>
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
