import React from 'react';
import { ComplaintStatus, PriorityLevel, IssueCategory } from '@/types/complaint';
import { CATEGORY_LABELS } from '@/data/mockComplaints';
import { 
  AlertTriangle, 
  Trash2, 
  Droplets, 
  Waves, 
  Lightbulb, 
  Footprints, 
  ShieldAlert,
  Clock,
  UserCheck,
  RefreshCw,
  CheckCircle2
} from 'lucide-react';

interface StatusBadgeProps {
  status: ComplaintStatus;
  size?: 'sm' | 'md' | 'lg';
}

export function StatusBadge({ status, size = 'md' }: StatusBadgeProps) {
  const sizeClasses = {
    sm: 'text-xs px-2 py-0.5 gap-1',
    md: 'text-xs px-2.5 py-1 gap-1.5',
    lg: 'text-sm px-3 py-1.5 gap-2',
  };

  switch (status) {
    case 'pending':
      return (
        <span className={`inline-flex items-center font-medium rounded-full bg-amber-500/10 text-amber-400 border border-amber-500/30 ${sizeClasses[size]}`}>
          <Clock className="w-3.5 h-3.5" />
          <span>Pending Review</span>
        </span>
      );
    case 'assigned':
      return (
        <span className={`inline-flex items-center font-medium rounded-full bg-cyan-500/10 text-cyan-400 border border-cyan-500/30 ${sizeClasses[size]}`}>
          <UserCheck className="w-3.5 h-3.5" />
          <span>Assigned to Dept</span>
        </span>
      );
    case 'in_progress':
      return (
        <span className={`inline-flex items-center font-medium rounded-full bg-blue-500/10 text-blue-400 border border-blue-500/30 ${sizeClasses[size]}`}>
          <RefreshCw className="w-3.5 h-3.5 animate-spin duration-3000" />
          <span>In Progress</span>
        </span>
      );
    case 'resolved':
      return (
        <span className={`inline-flex items-center font-medium rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 ${sizeClasses[size]}`}>
          <CheckCircle2 className="w-3.5 h-3.5" />
          <span>Resolved</span>
        </span>
      );
    default:
      return null;
  }
}

interface PriorityBadgeProps {
  priority: PriorityLevel;
  size?: 'sm' | 'md';
}

export function PriorityBadge({ priority, size = 'md' }: PriorityBadgeProps) {
  const sizeClasses = {
    sm: 'text-xs px-2 py-0.5',
    md: 'text-xs px-2.5 py-1',
  };

  switch (priority) {
    case 'critical':
      return (
        <span className={`inline-flex items-center font-semibold rounded-md bg-red-950/60 text-red-400 border border-red-500/40 uppercase tracking-wider ${sizeClasses[size]}`}>
          <span className="w-1.5 h-1.5 rounded-full bg-red-500 mr-1.5 animate-pulse" />
          Critical P0
        </span>
      );
    case 'high':
      return (
        <span className={`inline-flex items-center font-semibold rounded-md bg-orange-950/60 text-orange-400 border border-orange-500/40 uppercase tracking-wider ${sizeClasses[size]}`}>
          <span className="w-1.5 h-1.5 rounded-full bg-orange-500 mr-1.5" />
          High P1
        </span>
      );
    case 'medium':
      return (
        <span className={`inline-flex items-center font-medium rounded-md bg-yellow-950/50 text-yellow-300 border border-yellow-500/30 ${sizeClasses[size]}`}>
          Medium P2
        </span>
      );
    case 'low':
      return (
        <span className={`inline-flex items-center font-medium rounded-md bg-slate-800 text-slate-300 border border-slate-700 ${sizeClasses[size]}`}>
          Low P3
        </span>
      );
    default:
      return null;
  }
}

interface CategoryBadgeProps {
  category: IssueCategory;
  showIcon?: boolean;
}

export function CategoryBadge({ category, showIcon = true }: CategoryBadgeProps) {
  const meta = CATEGORY_LABELS[category] || { label: category, icon: 'AlertTriangle' };

  const renderIcon = () => {
    switch (category) {
      case 'potholes':
        return <AlertTriangle className="w-3.5 h-3.5 text-orange-400" />;
      case 'garbage':
        return <Trash2 className="w-3.5 h-3.5 text-amber-400" />;
      case 'water_leakage':
        return <Droplets className="w-3.5 h-3.5 text-blue-400" />;
      case 'drainage':
        return <Waves className="w-3.5 h-3.5 text-cyan-400" />;
      case 'streetlights':
        return <Lightbulb className="w-3.5 h-3.5 text-yellow-400" />;
      case 'footpath':
        return <Footprints className="w-3.5 h-3.5 text-emerald-400" />;
      case 'open_manholes':
        return <ShieldAlert className="w-3.5 h-3.5 text-rose-400" />;
      default:
        return <AlertTriangle className="w-3.5 h-3.5 text-teal-400" />;
    }
  };

  return (
    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-medium rounded-md bg-[#0f1a33] text-slate-200 border border-slate-800">
      {showIcon && renderIcon()}
      <span>{meta.label}</span>
    </span>
  );
}
