'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  Building2, 
  PlusCircle, 
  LayoutDashboard, 
  FileText, 
  Menu, 
  X, 
  ShieldCheck,
  RotateCcw
} from 'lucide-react';
import { useComplaints } from '@/lib/ComplaintContext';

export function Navbar() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { resetToDefaults } = useComplaints();
  const [resetting, setResetting] = useState(false);

  const navLinks = [
    { href: '/', label: 'Overview', icon: Building2 },
    { href: '/report', label: 'Report Issue', icon: PlusCircle, highlight: true },
    { href: '/my-reports', label: 'Citizen Reports', icon: FileText },
    { href: '/dashboard', label: 'Authority Console', icon: LayoutDashboard },
  ];

  const handleReset = async () => {
    if (confirm('Reset demo complaint store to initial mock dataset?')) {
      setResetting(true);
      await resetToDefaults();
      setResetting(false);
    }
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-slate-800 bg-[#060b14]/90 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo & Brand */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-teal-500 to-teal-700 flex items-center justify-center text-white shadow-md shadow-teal-500/20 group-hover:from-teal-400 group-hover:to-teal-600 transition-all">
              <ShieldCheck className="w-5 h-5 text-white" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="text-lg font-bold tracking-tight text-white">FixMyBharat</span>
                <span className="text-[10px] font-semibold uppercase tracking-wider px-1.5 py-0.5 rounded bg-teal-950 text-teal-400 border border-teal-800/60">
                  M1 Demo
                </span>
              </div>
              <p className="text-[11px] text-slate-400 -mt-0.5 hidden sm:block">Citizen Eyes · AI Intelligence · Municipal Action</p>
            </div>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-1">
            {navLinks.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href || (item.href !== '/' && pathname.startsWith(item.href));
              
              if (item.highlight) {
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`ml-2 inline-flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-sm font-semibold transition-all ${
                      isActive
                        ? 'bg-teal-500 text-white shadow-lg shadow-teal-500/25 ring-2 ring-teal-400/30'
                        : 'bg-teal-600 hover:bg-teal-500 text-white shadow-sm hover:shadow'
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    <span>{item.label}</span>
                  </Link>
                );
              }

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                    isActive
                      ? 'bg-[#152243] text-teal-300 border border-teal-500/30'
                      : 'text-slate-300 hover:text-white hover:bg-[#0f1a33]'
                  }`}
                >
                  <Icon className="w-4 h-4 opacity-75" />
                  <span>{item.label}</span>
                </Link>
              );
            })}

            <div className="h-5 w-px bg-slate-800 mx-2" />

            <button
              onClick={handleReset}
              disabled={resetting}
              title="Reset Demo Data"
              className="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-medium text-slate-400 hover:text-slate-200 hover:bg-[#0f1a33] transition-colors border border-transparent hover:border-slate-800"
            >
              <RotateCcw className={`w-3.5 h-3.5 ${resetting ? 'animate-spin text-teal-400' : ''}`} />
              <span className="hidden lg:inline">Reset Demo</span>
            </button>
          </nav>

          {/* Mobile menu trigger */}
          <div className="flex md:hidden items-center gap-2">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-850 focus:outline-none"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-slate-800 bg-[#060b14]/95 px-4 pt-3 pb-4 space-y-2">
          {navLinks.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setMobileMenuOpen(false)}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-base font-medium ${
                  isActive
                    ? 'bg-[#152243] text-teal-300 border border-teal-500/30'
                    : 'text-slate-300 hover:text-white hover:bg-[#0f1a33]'
                }`}
              >
                <Icon className="w-5 h-5 text-teal-400" />
                <span>{item.label}</span>
              </Link>
            );
          })}
          <div className="pt-2 border-t border-slate-800">
            <button
              onClick={() => {
                handleReset();
                setMobileMenuOpen(false);
              }}
              className="w-full flex items-center justify-center gap-2 px-3 py-2 text-sm text-slate-400 hover:text-white bg-[#0b1325] rounded-lg border border-slate-800"
            >
              <RotateCcw className="w-4 h-4" />
              <span>Reset Demo Complaints</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
