import React from 'react';
import Link from 'next/link';
import { ShieldCheck, ArrowRight } from 'lucide-react';

export function Footer() {
  return (
    <footer className="border-t border-slate-800 bg-[#060b14] mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Brand info */}
          <div className="md:col-span-2 space-y-3">
            <div className="flex items-center gap-2.5">
              <div className="w-7 h-7 rounded bg-teal-600 flex items-center justify-center text-white">
                <ShieldCheck className="w-4 h-4" />
              </div>
              <span className="text-base font-bold text-white tracking-tight">FixMyBharat</span>
            </div>
            <p className="text-sm text-slate-400 max-w-sm leading-relaxed">
              Transforming citizen observations into structured, location-aware civic intelligence for municipal authorities across Bharat.
            </p>
            <div className="text-xs text-slate-500">
              Developed by <strong className="text-slate-300 font-semibold">Team SyncMates</strong> · Milestone 1
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-xs font-semibold text-slate-300 uppercase tracking-wider mb-3">Workflow Routes</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/report" className="text-slate-400 hover:text-teal-400 transition-colors inline-flex items-center gap-1.5">
                  <ArrowRight className="w-3 h-3 text-teal-500" />
                  Report Civic Issue
                </Link>
              </li>
              <li>
                <Link href="/my-reports" className="text-slate-400 hover:text-teal-400 transition-colors inline-flex items-center gap-1.5">
                  <ArrowRight className="w-3 h-3 text-teal-500" />
                  Citizen Reports
                </Link>
              </li>
              <li>
                <Link href="/dashboard" className="text-slate-400 hover:text-teal-400 transition-colors inline-flex items-center gap-1.5">
                  <ArrowRight className="w-3 h-3 text-teal-500" />
                  Authority Dashboard
                </Link>
              </li>
            </ul>
          </div>

          {/* Architecture Status */}
          <div>
            <h4 className="text-xs font-semibold text-slate-300 uppercase tracking-wider mb-3">Milestone 1 Scope</h4>
            <div className="rounded-lg bg-[#0b1325] border border-slate-800 p-3 space-y-1.5 text-xs text-slate-400">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-400" />
                <span>Next.js App Router (Local Demo Store)</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-amber-400" />
                <span>Supabase / PostGIS Ready</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-cyan-400" />
                <span>Vision AI &amp; LLM Triage Ready</span>
              </div>
            </div>
          </div>
        </div>

        <div className="pt-6 border-t border-slate-850 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-4">
          <div>
            &copy; 2026 FixMyBharat · Team SyncMates. Built for public good and municipal resilience.
          </div>
          <div className="flex items-center gap-4 text-slate-400">
            <span className="px-2 py-0.5 rounded bg-slate-900 border border-slate-800 text-[11px]">
              Local Reactive Demo State
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
