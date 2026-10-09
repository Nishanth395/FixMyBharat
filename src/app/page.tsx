import Link from 'next/link';
import { 
  AlertTriangle, 
  Trash2, 
  Droplets, 
  Waves, 
  Lightbulb, 
  Footprints, 
  ShieldAlert,
  ArrowRight,
  Sparkles,
  MapPin,
  CheckCircle2,
  BarChart3,
  Building,
  Users,
  Compass,
  FileCheck
} from 'lucide-react';

export default function HomePage() {
  const categories = [
    {
      id: 'potholes',
      name: 'Potholes & Road Damage',
      desc: 'Craters, asphalt loss, and road subsidence hazardous to vehicular safety.',
      icon: AlertTriangle,
      color: 'text-orange-400 bg-orange-950/40 border-orange-500/30',
      badge: 'High Impact'
    },
    {
      id: 'open_manholes',
      name: 'Open Manholes & Hazardous Pits',
      desc: 'Missing storm drain covers and uncovered utility shafts on pedestrian pathways.',
      icon: ShieldAlert,
      color: 'text-rose-400 bg-rose-950/40 border-rose-500/30',
      badge: 'Critical Hazard'
    },
    {
      id: 'water_leakage',
      name: 'Water Pipeline Leakage',
      desc: 'Clean potable supply ruptures, pipeline bursts, and wastage across streets.',
      icon: Droplets,
      color: 'text-blue-400 bg-blue-950/40 border-blue-500/30',
      badge: 'Utility Loss'
    },
    {
      id: 'garbage',
      name: 'Garbage & Solid Waste',
      desc: 'Uncollected refuse heaps, commercial dumping, and overflowing collection bins.',
      icon: Trash2,
      color: 'text-amber-400 bg-amber-950/40 border-amber-500/30',
      badge: 'Public Health'
    },
    {
      id: 'drainage',
      name: 'Drainage & Overflow',
      desc: 'Choked stormwater culverts, silt blockages, and backflow during monsoon.',
      icon: Waves,
      color: 'text-cyan-400 bg-cyan-950/40 border-cyan-500/30',
      badge: 'Flood Risk'
    },
    {
      id: 'streetlights',
      name: 'Streetlights & Electrical',
      desc: 'Defective luminaires, exposed cables, and persistent dark pedestrian stretches.',
      icon: Lightbulb,
      color: 'text-yellow-400 bg-yellow-950/40 border-yellow-500/30',
      badge: 'Safety'
    },
    {
      id: 'footpath',
      name: 'Damaged Footpaths',
      desc: 'Displaced pavers, unauthorized diggings, and non-accessible footways for seniors.',
      icon: Footprints,
      color: 'text-emerald-400 bg-emerald-950/40 border-emerald-500/30',
      badge: 'Accessibility'
    },
  ];

  const workflowSteps = [
    {
      number: '01',
      title: 'REPORT',
      tagline: 'Citizen Observation',
      description: 'Citizens snap photos and capture geolocations of civic infrastructure failures without bureaucratic red tape.',
      icon: MapPin,
      accent: 'border-teal-500/50 text-teal-400'
    },
    {
      number: '02',
      title: 'UNDERSTAND',
      tagline: 'Computer Vision & LLM Triage',
      description: 'Automated civic intelligence verifies severity, classifies root causes, and generates structured defect dossiers.',
      icon: Sparkles,
      accent: 'border-cyan-500/50 text-cyan-400'
    },
    {
      number: '03',
      title: 'PRIORITIZE',
      tagline: 'Risk-Weighted Queue',
      description: 'Dynamic scoring clusters duplicates, weighs hospital/school proximity, and ranks urgent public-safety hazards.',
      icon: BarChart3,
      accent: 'border-orange-500/50 text-orange-400'
    },
    {
      number: '04',
      title: 'RESOLVE',
      tagline: 'Department Dispatch',
      description: 'Automated work-order routing alerts ward engineers, tracks field teams, and records transparent timestamped resolution.',
      icon: CheckCircle2,
      accent: 'border-emerald-500/50 text-emerald-400'
    },
    {
      number: '05',
      title: 'PREVENT',
      tagline: 'Predictive Infrastructure',
      description: 'Recurring hotspot detection equips civic planning authorities to budget resurfacing before catastrophic failure.',
      icon: Building,
      accent: 'border-indigo-500/50 text-indigo-400'
    },
  ];

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative overflow-hidden pt-12 pb-20 md:pt-20 md:pb-28 border-b border-slate-800 bg-gradient-to-b from-[#0b1325] via-[#060b14] to-[#060b14]">
        {/* Subtle grid background */}
        <div className="absolute inset-0 bg-[radial-gradient(#152243_1px,transparent_1px)] [background-size:24px_24px] opacity-40 pointer-events-none" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#0f1a33] border border-teal-500/30 text-teal-300 text-xs font-semibold uppercase tracking-wider mb-6">
            <span className="w-2 h-2 rounded-full bg-teal-400 animate-pulse" />
            Civic Tech for Indian Municipalities · Team SyncMates
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white max-w-4xl mx-auto leading-tight">
            Citizen Eyes. AI Intelligence.{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-400 via-teal-300 to-orange-400">
              Municipal Action.
            </span>
          </h1>

          <p className="mt-6 text-lg sm:text-xl text-slate-300 max-w-2xl mx-auto leading-relaxed">
            FixMyBharat bridges the gap between everyday urban hazards and municipal resolution. We convert citizen photos into prioritized, verifiable work orders for city authorities.
          </p>

          {/* Action CTAs */}
          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/report"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-xl text-base font-semibold text-white bg-teal-600 hover:bg-teal-500 shadow-lg shadow-teal-600/30 hover:shadow-teal-500/40 transition-all border border-teal-400/20"
            >
              <AlertTriangle className="w-5 h-5 text-teal-200" />
              <span>Report an Issue</span>
              <ArrowRight className="w-4 h-4 ml-0.5" />
            </Link>

            <Link
              href="/dashboard"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-xl text-base font-semibold text-slate-200 bg-[#0f1a33] hover:bg-[#152243] hover:text-white border border-slate-700 hover:border-teal-500/40 transition-all"
            >
              <Compass className="w-5 h-5 text-teal-400" />
              <span>Explore Civic Dashboard</span>
            </Link>

            <Link
              href="/my-reports"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-3.5 rounded-xl text-sm font-medium text-slate-400 hover:text-slate-200 hover:bg-[#0b1325] border border-transparent hover:border-slate-800 transition-all"
            >
              <FileCheck className="w-4 h-4" />
              <span>Track Reports</span>
            </Link>
          </div>

          {/* Key Quick Stats */}
          <div className="mt-14 grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-3xl mx-auto">
            <div className="p-4 rounded-xl bg-[#0b1325]/80 border border-slate-800">
              <div className="text-2xl font-bold text-white">7+</div>
              <div className="text-xs text-slate-400 mt-1">Core Civic Domains</div>
            </div>
            <div className="p-4 rounded-xl bg-[#0b1325]/80 border border-slate-800">
              <div className="text-2xl font-bold text-teal-400">P0 - P3</div>
              <div className="text-xs text-slate-400 mt-1">AI Severity Triage</div>
            </div>
            <div className="p-4 rounded-xl bg-[#0b1325]/80 border border-slate-800">
              <div className="text-2xl font-bold text-orange-400">100%</div>
              <div className="text-xs text-slate-400 mt-1">Transparent Tracking</div>
            </div>
            <div className="p-4 rounded-xl bg-[#0b1325]/80 border border-slate-800">
              <div className="text-2xl font-bold text-white">Open</div>
              <div className="text-xs text-slate-400 mt-1">Municipal Architecture</div>
            </div>
          </div>
        </div>
      </section>

      {/* 5-Stage Workflow Section */}
      <section className="py-16 md:py-24 bg-[#060b14] border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-14">
            <h2 className="text-xs font-bold uppercase tracking-widest text-teal-400 mb-2">
              The FixMyBharat Engine
            </h2>
            <p className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              From Citizen Report to Municipal Prevention
            </p>
            <p className="mt-3 text-slate-400 text-sm sm:text-base">
              A structured five-phase pipeline engineered to replace lost paperwork with transparent, verified outcomes.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-5 gap-4 relative">
            {workflowSteps.map((step) => {
              const Icon = step.icon;
              return (
                <div
                  key={step.title}
                  className="relative p-5 rounded-xl bg-[#0b1325] border border-slate-800 hover:border-slate-700 transition-all group flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-xs font-mono font-bold text-slate-500">
                        {step.number}
                      </span>
                      <div className={`p-2 rounded-lg bg-[#0f1a33] border ${step.accent}`}>
                        <Icon className="w-4 h-4" />
                      </div>
                    </div>
                    <h3 className="text-base font-bold text-white tracking-tight mb-1">
                      {step.title}
                    </h3>
                    <div className="text-xs font-semibold text-teal-400/90 mb-2.5">
                      {step.tagline}
                    </div>
                    <p className="text-xs text-slate-400 leading-relaxed">
                      {step.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Civic Issue Categories */}
      <section className="py-16 md:py-24 bg-[#080e1c] border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
            <div>
              <h2 className="text-xs font-bold uppercase tracking-widest text-teal-400 mb-2">
                Urban Problem Scope
              </h2>
              <p className="text-3xl font-extrabold text-white tracking-tight">
                Civic Issue Categories Handled
              </p>
              <p className="text-sm text-slate-400 mt-2 max-w-xl">
                Standardized categorization auto-routed to respective ward municipal divisions across Indian urban local bodies.
              </p>
            </div>
            <Link
              href="/report"
              className="mt-4 md:mt-0 inline-flex items-center gap-2 text-sm font-semibold text-teal-400 hover:text-teal-300 transition-colors"
            >
              <span>Submit a report in these categories</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {categories.map((cat) => {
              const Icon = cat.icon;
              return (
                <div
                  key={cat.id}
                  className="p-5 rounded-xl bg-[#0b1325] border border-slate-800 hover:border-slate-700 transition-all flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <div className={`p-2.5 rounded-lg border ${cat.color}`}>
                        <Icon className="w-5 h-5" />
                      </div>
                      <span className="text-[10px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded bg-[#0f1a33] text-slate-300 border border-slate-800">
                        {cat.badge}
                      </span>
                    </div>
                    <h3 className="text-base font-bold text-white mb-1.5">{cat.name}</h3>
                    <p className="text-xs text-slate-400 leading-relaxed">{cat.desc}</p>
                  </div>
                  <div className="mt-4 pt-3 border-t border-slate-850 flex items-center justify-between">
                    <Link
                      href={`/report?category=${cat.id}`}
                      className="text-xs font-medium text-teal-400 hover:text-teal-300 inline-flex items-center gap-1"
                    >
                      <span>Report this</span>
                      <ArrowRight className="w-3 h-3" />
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Value Propositions: Citizens vs Authorities */}
      <section className="py-16 md:py-24 bg-[#060b14] border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <h2 className="text-xs font-bold uppercase tracking-widest text-teal-400 mb-2">
              Bilateral Impact
            </h2>
            <p className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              Value Propositions
            </p>
            <p className="mt-2 text-slate-400 text-sm">
              Designed symmetrically for citizens who observe problems and municipal authorities who fix them.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Citizens Card */}
            <div className="p-8 rounded-2xl bg-[#0b1325] border border-slate-800 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-teal-500/5 rounded-full blur-2xl pointer-events-none" />
              <div className="flex items-center gap-3 mb-6">
                <div className="p-3 rounded-xl bg-teal-950/60 border border-teal-500/30 text-teal-400">
                  <Users className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white">For Citizens &amp; Communities</h3>
                  <p className="text-xs text-teal-400 font-medium">Empowerment, Simplicity &amp; Transparency</p>
                </div>
              </div>

              <ul className="space-y-4 text-sm text-slate-300">
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="w-4 h-4 text-teal-400 mt-1 shrink-0" />
                  <span><strong>30-Second Reporting:</strong> Geotagged camera capture eliminates cumbersome municipal paperwork and bureaucracy.</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="w-4 h-4 text-teal-400 mt-1 shrink-0" />
                  <span><strong>Real-Time Lifecycle Tracking:</strong> Track ticket updates from pending triage to field engineer assignment and verified completion.</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="w-4 h-4 text-teal-400 mt-1 shrink-0" />
                  <span><strong>Accountability &amp; Community Voice:</strong> Direct visibility ensures vulnerable public safety hazards are not ignored or swept aside.</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="w-4 h-4 text-teal-400 mt-1 shrink-0" />
                  <span><strong>Privacy-First Control:</strong> Optional identity sharing with manual coordinate controls for maximum citizen confidence.</span>
                </li>
              </ul>

              <div className="mt-8 pt-6 border-t border-slate-800">
                <Link
                  href="/report"
                  className="inline-flex items-center gap-2 text-sm font-semibold text-teal-400 hover:text-teal-300"
                >
                  <span>Experience citizen submission</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>

            {/* Municipal Authorities Card */}
            <div className="p-8 rounded-2xl bg-[#0b1325] border border-slate-800 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-orange-500/5 rounded-full blur-2xl pointer-events-none" />
              <div className="flex items-center gap-3 mb-6">
                <div className="p-3 rounded-xl bg-orange-950/60 border border-orange-500/30 text-orange-400">
                  <Building className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white">For Municipal Authorities &amp; Ward Engineers</h3>
                  <p className="text-xs text-orange-400 font-medium">Triage, Resource Optimization &amp; SLAs</p>
                </div>
              </div>

              <ul className="space-y-4 text-sm text-slate-300">
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="w-4 h-4 text-orange-400 mt-1 shrink-0" />
                  <span><strong>Automated Prioritization:</strong> AI sorts incoming incidents by public hazard severity (P0 Critical to P3 Low), filtering duplicate spam.</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="w-4 h-4 text-orange-400 mt-1 shrink-0" />
                  <span><strong>Operational Command Center:</strong> Search, filter by department, assign field inspectors, and update progress in real time.</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="w-4 h-4 text-orange-400 mt-1 shrink-0" />
                  <span><strong>Geospatial Clustering:</strong> Identify repetitive pipeline bursts and pothole clusters before monsoon flooding hits.</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="w-4 h-4 text-orange-400 mt-1 shrink-0" />
                  <span><strong>Audit-Ready Compliance:</strong> Timestamped work records with before-and-after photo verification ready for municipal audits.</span>
                </li>
              </ul>

              <div className="mt-8 pt-6 border-t border-slate-800">
                <Link
                  href="/dashboard"
                  className="inline-flex items-center gap-2 text-sm font-semibold text-orange-400 hover:text-orange-300"
                >
                  <span>Open authority operations console</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Call To Action */}
      <section className="py-16 md:py-20 bg-gradient-to-b from-[#060b14] to-[#0b1325]">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="p-8 sm:p-12 rounded-3xl bg-[#0f1a33]/80 border border-slate-800 shadow-2xl relative overflow-hidden">
            <div className="relative z-10 max-w-2xl mx-auto">
              <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
                Ready to make your neighborhood safer?
              </h2>
              <p className="mt-4 text-slate-300 text-sm sm:text-base leading-relaxed">
                Notice a hazardous pothole, broken streetlight or overflowing drain? Submit a report now and test the interactive FixMyBharat triage engine.
              </p>
              <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
                <Link
                  href="/report"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl font-semibold text-white bg-teal-600 hover:bg-teal-500 shadow-lg shadow-teal-600/30 transition-all"
                >
                  <AlertTriangle className="w-4 h-4" />
                  <span>File a Civic Report</span>
                </Link>
                <Link
                  href="/my-reports"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl font-semibold text-slate-300 hover:text-white bg-[#0b1325] hover:bg-[#152243] border border-slate-700 transition-all"
                >
                  <FileCheck className="w-4 h-4 text-teal-400" />
                  <span>View Demo Reports</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
