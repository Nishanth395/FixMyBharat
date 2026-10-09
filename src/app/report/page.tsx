'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useComplaints } from '@/lib/ComplaintContext';
import { IssueCategory, PriorityLevel } from '@/types/complaint';
import { CATEGORY_LABELS } from '@/data/mockComplaints';
import { 
  AlertTriangle, 
  Camera, 
  MapPin, 
  Upload, 
  CheckCircle, 
  ArrowRight, 
  Info,
  Sparkles,
  LocateFixed,
  X,
  FileCheck
} from 'lucide-react';

export default function ReportPage() {
  const { createComplaint } = useComplaints();

  // Form states
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState<IssueCategory>('potholes');
  const [priority, setPriority] = useState<PriorityLevel>('medium');
  const [address, setAddress] = useState('');
  const [landmark, setLandmark] = useState('');
  const [city, setCity] = useState('Bengaluru');
  const [pincode, setPincode] = useState('');
  const [latitude, setLatitude] = useState<string>('');
  const [longitude, setLongitude] = useState<string>('');
  const [citizenName, setCitizenName] = useState('');
  const [citizenPhone, setCitizenPhone] = useState('');
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  // Status and submission states
  const [submitting, setSubmitting] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [createdId, setCreatedId] = useState<string | null>(null);
  const [geoLocating, setGeoLocating] = useState(false);
  const [geoMessage, setGeoMessage] = useState<string | null>(null);

  // Explicit user-initiated geolocation handler
  const handleRequestLocation = () => {
    if (typeof window === 'undefined' || !navigator.geolocation) {
      setGeoMessage('Geolocation is not supported by your browser.');
      return;
    }

    setGeoLocating(true);
    setGeoMessage(null);

    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setLatitude(pos.coords.latitude.toFixed(6));
        setLongitude(pos.coords.longitude.toFixed(6));
        setGeoLocating(false);
        setGeoMessage('Location coordinates populated via device GPS.');
        if (!address) {
          setAddress('Current GPS Location Detected');
        }
      },
      (err) => {
        setGeoLocating(false);
        setGeoMessage(`Could not retrieve location: ${err.message}. You can manually type your location details below.`);
      },
      { timeout: 10000, enableHighAccuracy: true }
    );
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        setErrors((prev) => ({ ...prev, image: 'Image size should be less than 5MB.' }));
        return;
      }
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
        setErrors((prev) => {
          const updated = { ...prev };
          delete updated.image;
          return updated;
        });
      };
      reader.readAsDataURL(file);
    }
  };

  const removeImage = () => {
    setImagePreview(null);
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!title.trim()) {
      newErrors.title = 'Please enter a clear summary or title for the issue.';
    } else if (title.trim().length < 5) {
      newErrors.title = 'Title must be at least 5 characters long.';
    }

    if (!description.trim()) {
      newErrors.description = 'Please describe the problem and its impact.';
    } else if (description.trim().length < 15) {
      newErrors.description = 'Please provide at least 15 characters describing the issue.';
    }

    if (!address.trim()) {
      newErrors.address = 'Street name, junction, or specific location is required.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setSubmitting(true);

    try {
      const latNum = latitude ? parseFloat(latitude) : undefined;
      const lngNum = longitude ? parseFloat(longitude) : undefined;

      const created = await createComplaint({
        title,
        description,
        category,
        priority,
        location: {
          address: address.trim(),
          landmark: landmark.trim() || undefined,
          city: city.trim() || 'Bengaluru',
          pincode: pincode.trim() || undefined,
          latitude: isNaN(latNum as number) ? undefined : latNum,
          longitude: isNaN(lngNum as number) ? undefined : lngNum,
        },
        imageUrl: imagePreview || undefined,
        citizenName: citizenName.trim() || undefined,
        citizenPhone: citizenPhone.trim() || undefined,
      });

      setCreatedId(created.id);
    } catch (err) {
      console.error('Submission failed:', err);
      setErrors({ form: 'Failed to record demo complaint. Please try again.' });
    } finally {
      setSubmitting(false);
    }
  };

  // Preset sample image helper for quick testing
  const handleUseSamplePhoto = () => {
    setImagePreview('https://images.unsplash.com/photo-1515162816999-a0c47dc192f7?auto=format&fit=crop&w=800&q=80');
  };

  return (
    <div className="py-10 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto w-full">
      {/* Header */}
      <div className="mb-8">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-teal-950/70 border border-teal-500/30 text-teal-300 text-xs font-semibold mb-3">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Stage 01: Citizen Report</span>
        </div>
        <h1 className="text-3xl font-extrabold text-white tracking-tight">
          Report a Civic Infrastructure Issue
        </h1>
        <p className="mt-2 text-slate-400 text-sm sm:text-base leading-relaxed">
          Provide photo evidence and location details. Your report will be automatically triaged and assigned to the relevant municipal engineering division.
        </p>

        {/* Local Demo State Notice */}
        <div className="mt-4 p-4 rounded-xl bg-[#0f1a33] border border-cyan-500/30 flex items-start gap-3 text-cyan-200 text-xs sm:text-sm">
          <Info className="w-5 h-5 text-cyan-400 shrink-0 mt-0.5" />
          <div className="leading-relaxed">
            <strong className="text-white">Milestone 1 Demo Notice:</strong> Submissions are stored locally in client demo state. Reports are not yet persisted to a remote PostgreSQL/Supabase database. The architecture is modularized so this service connects to Supabase seamlessly in Milestone 2.
          </div>
        </div>
      </div>

      {/* Success Confirmation Card */}
      {createdId ? (
        <div className="p-8 rounded-2xl bg-[#0b1325] border border-emerald-500/40 shadow-2xl animate-in fade-in zoom-in-95 duration-200">
          <div className="w-14 h-14 rounded-full bg-emerald-950/80 border border-emerald-500/40 flex items-center justify-center text-emerald-400 mb-6">
            <CheckCircle className="w-8 h-8" />
          </div>

          <h2 className="text-2xl font-bold text-white mb-2">Complaint Successfully Registered!</h2>
          <p className="text-slate-300 text-sm mb-6">
            Your civic observation has been logged in the demo intelligence store and assigned an official tracking identifier.
          </p>

          <div className="p-4 rounded-xl bg-[#060b14] border border-slate-800 mb-6">
            <div className="text-xs uppercase tracking-wider text-slate-400 font-semibold mb-1">
              Generated Demo Complaint ID
            </div>
            <div className="text-2xl font-mono font-bold text-teal-400">{createdId}</div>
            <p className="text-xs text-slate-400 mt-2">
              Assigned Department: <strong className="text-slate-200">{CATEGORY_LABELS[category].department}</strong>
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-3">
            <Link
              href={`/complaints/${createdId}`}
              className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-semibold text-white bg-teal-600 hover:bg-teal-500 shadow-md shadow-teal-600/30 transition-all text-sm"
            >
              <span>View Complaint Details</span>
              <ArrowRight className="w-4 h-4" />
            </Link>

            <Link
              href="/my-reports"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-medium text-slate-200 bg-[#0f1a33] hover:bg-[#152243] border border-slate-700 transition-all text-sm"
            >
              <FileCheck className="w-4 h-4 text-teal-400" />
              <span>See in Citizen Reports</span>
            </Link>

            <button
              onClick={() => {
                setCreatedId(null);
                setTitle('');
                setDescription('');
                setAddress('');
                setLandmark('');
                setPincode('');
                setImagePreview(null);
              }}
              className="inline-flex items-center justify-center px-4 py-3 rounded-xl font-medium text-slate-400 hover:text-white transition-all text-sm"
            >
              Submit Another Report
            </button>
          </div>
        </div>
      ) : (
        /* Report Form */
        <form onSubmit={handleSubmit} className="space-y-8 bg-[#0b1325] border border-slate-800 p-6 sm:p-8 rounded-2xl shadow-xl">
          {errors.form && (
            <div className="p-4 rounded-xl bg-red-950/60 border border-red-500/40 text-red-300 text-sm">
              {errors.form}
            </div>
          )}

          {/* Section 1: Issue Classification */}
          <div className="space-y-4">
            <h2 className="text-sm font-semibold uppercase tracking-wider text-teal-400 flex items-center gap-2">
              <AlertTriangle className="w-4 h-4" />
              1. Issue Classification &amp; Summary
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="category" className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
                  Category *
                </label>
                <select
                  id="category"
                  value={category}
                  onChange={(e) => setCategory(e.target.value as IssueCategory)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#060b14] border border-slate-700 text-slate-200 focus:outline-none focus:ring-2 focus:ring-teal-500 text-sm"
                >
                  {Object.entries(CATEGORY_LABELS).map(([key, item]) => (
                    <option key={key} value={key} className="bg-[#0b1325] text-slate-200">
                      {item.label}
                    </option>
                  ))}
                </select>
                <p className="text-[11px] text-slate-400 mt-1.5">
                  Routes directly to: <strong className="text-slate-300">{CATEGORY_LABELS[category].department}</strong>
                </p>
              </div>

              <div>
                <label htmlFor="priority" className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
                  Urgency / Hazard Level
                </label>
                <select
                  id="priority"
                  value={priority}
                  onChange={(e) => setPriority(e.target.value as PriorityLevel)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#060b14] border border-slate-700 text-slate-200 focus:outline-none focus:ring-2 focus:ring-teal-500 text-sm"
                >
                  <option value="low" className="bg-[#0b1325]">Low (P3 - Minor maintenance defect)</option>
                  <option value="medium" className="bg-[#0b1325]">Medium (P2 - Standard civic inconvenience)</option>
                  <option value="high" className="bg-[#0b1325]">High (P1 - Obstruction / imminent hazard)</option>
                  <option value="critical" className="bg-[#0b1325]">Critical (P0 - Immediate life/safety hazard)</option>
                </select>
                <p className="text-[11px] text-slate-400 mt-1.5">
                  Will be validated by FixMyBharat AI computer vision triage.
                </p>
              </div>
            </div>

            <div>
              <label htmlFor="title" className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
                Issue Title *
              </label>
              <input
                id="title"
                type="text"
                placeholder="e.g. Deep unbarricaded open manhole near bus stop"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className={`w-full px-3.5 py-2.5 rounded-xl bg-[#060b14] border ${
                  errors.title ? 'border-red-500' : 'border-slate-700'
                } text-slate-200 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-teal-500 text-sm`}
              />
              {errors.title && <p className="text-xs text-red-400 mt-1.5">{errors.title}</p>}
            </div>

            <div>
              <label htmlFor="description" className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
                Detailed Description *
              </label>
              <textarea
                id="description"
                rows={3}
                placeholder="Describe what you observed, approximate dimensions, vehicle or pedestrian danger, and how long it has been in this state..."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className={`w-full px-3.5 py-2.5 rounded-xl bg-[#060b14] border ${
                  errors.description ? 'border-red-500' : 'border-slate-700'
                } text-slate-200 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-teal-500 text-sm`}
              />
              {errors.description && <p className="text-xs text-red-400 mt-1.5">{errors.description}</p>}
            </div>
          </div>

          {/* Section 2: Visual Evidence (Photo Upload) */}
          <div className="space-y-4 pt-4 border-t border-slate-800">
            <div className="flex items-center justify-between">
              <h2 className="text-sm font-semibold uppercase tracking-wider text-teal-400 flex items-center gap-2">
                <Camera className="w-4 h-4" />
                2. Photographic Evidence
              </h2>
              <button
                type="button"
                onClick={handleUseSamplePhoto}
                className="text-xs text-teal-400 hover:text-teal-300 underline font-medium"
              >
                Use sample photo
              </button>
            </div>

            {imagePreview ? (
              <div className="relative rounded-xl overflow-hidden border border-slate-700 bg-[#060b14] p-2 max-w-md">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={imagePreview}
                  alt="Issue preview"
                  className="w-full h-48 object-cover rounded-lg"
                />
                <button
                  type="button"
                  onClick={removeImage}
                  className="absolute top-4 right-4 p-1.5 rounded-full bg-black/70 text-white hover:bg-red-600 transition-colors"
                  title="Remove image"
                  aria-label="Remove image"
                >
                  <X className="w-4 h-4" />
                </button>
                <div className="mt-2 text-xs text-slate-400 flex items-center gap-1.5">
                  <CheckCircle className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Photo attached. Ready for AI visual classification.</span>
                </div>
              </div>
            ) : (
              <div>
                <label className="flex flex-col items-center justify-center w-full h-36 border-2 border-dashed border-slate-700 hover:border-teal-500/50 rounded-xl cursor-pointer bg-[#060b14] transition-all">
                  <div className="flex flex-col items-center justify-center pt-5 pb-6">
                    <Upload className="w-7 h-7 text-teal-400 mb-2" />
                    <p className="text-xs sm:text-sm text-slate-300 font-medium">
                      Click to upload photograph or drag and drop
                    </p>
                    <p className="text-[11px] text-slate-500 mt-1">PNG, JPG, WEBP (Max 5MB)</p>
                  </div>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="hidden"
                  />
                </label>
                {errors.image && <p className="text-xs text-red-400 mt-1.5">{errors.image}</p>}
              </div>
            )}
          </div>

          {/* Section 3: Location Details */}
          <div className="space-y-4 pt-4 border-t border-slate-800">
            <div className="flex items-center justify-between">
              <h2 className="text-sm font-semibold uppercase tracking-wider text-teal-400 flex items-center gap-2">
                <MapPin className="w-4 h-4" />
                3. Precise Location
              </h2>

              {/* Explicit Geolocation Button */}
              <button
                type="button"
                onClick={handleRequestLocation}
                disabled={geoLocating}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold text-teal-300 bg-teal-950/60 border border-teal-500/40 hover:bg-teal-900/60 transition-colors"
              >
                <LocateFixed className={`w-3.5 h-3.5 ${geoLocating ? 'animate-spin' : ''}`} />
                <span>{geoLocating ? 'Fetching GPS...' : 'Use My Current Location'}</span>
              </button>
            </div>

            {geoMessage && (
              <p className="text-xs text-teal-300 bg-teal-950/40 border border-teal-800/40 p-2.5 rounded-lg">
                {geoMessage}
              </p>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="md:col-span-2">
                <label htmlFor="address" className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
                  Street Address / Junction *
                </label>
                <input
                  id="address"
                  type="text"
                  placeholder="e.g. 100 Feet Road, Indiranagar, 12th Main Cross"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  className={`w-full px-3.5 py-2.5 rounded-xl bg-[#060b14] border ${
                    errors.address ? 'border-red-500' : 'border-slate-700'
                  } text-slate-200 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-teal-500 text-sm`}
                />
                {errors.address && <p className="text-xs text-red-400 mt-1.5">{errors.address}</p>}
              </div>

              <div>
                <label htmlFor="landmark" className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
                  Nearest Landmark
                </label>
                <input
                  id="landmark"
                  type="text"
                  placeholder="e.g. Opposite Metro Pillar 148"
                  value={landmark}
                  onChange={(e) => setLandmark(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#060b14] border border-slate-700 text-slate-200 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-teal-500 text-sm"
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label htmlFor="city" className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
                    City
                  </label>
                  <input
                    id="city"
                    type="text"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#060b14] border border-slate-700 text-slate-200 text-sm"
                  />
                </div>
                <div>
                  <label htmlFor="pincode" className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
                    PIN Code
                  </label>
                  <input
                    id="pincode"
                    type="text"
                    placeholder="560038"
                    value={pincode}
                    onChange={(e) => setPincode(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#060b14] border border-slate-700 text-slate-200 placeholder-slate-500 text-sm"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="latitude" className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
                  Latitude (Optional)
                </label>
                <input
                  id="latitude"
                  type="text"
                  placeholder="12.971598"
                  value={latitude}
                  onChange={(e) => setLatitude(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#060b14] border border-slate-700 text-slate-200 placeholder-slate-500 text-sm font-mono"
                />
              </div>

              <div>
                <label htmlFor="longitude" className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
                  Longitude (Optional)
                </label>
                <input
                  id="longitude"
                  type="text"
                  placeholder="77.594562"
                  value={longitude}
                  onChange={(e) => setLongitude(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#060b14] border border-slate-700 text-slate-200 placeholder-slate-500 text-sm font-mono"
                />
              </div>
            </div>
          </div>

          {/* Section 4: Citizen Details (Optional) */}
          <div className="space-y-4 pt-4 border-t border-slate-800">
            <h2 className="text-sm font-semibold uppercase tracking-wider text-teal-400">
              4. Reporter Contact (Optional)
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="name" className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
                  Your Name
                </label>
                <input
                  id="name"
                  type="text"
                  placeholder="e.g. Ramesh Kumar"
                  value={citizenName}
                  onChange={(e) => setCitizenName(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#060b14] border border-slate-700 text-slate-200 placeholder-slate-500 text-sm"
                />
              </div>
              <div>
                <label htmlFor="phone" className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
                  Mobile Number (For SMS Status Alerts)
                </label>
                <input
                  id="phone"
                  type="tel"
                  placeholder="+91 98765 43210"
                  value={citizenPhone}
                  onChange={(e) => setCitizenPhone(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#060b14] border border-slate-700 text-slate-200 placeholder-slate-500 text-sm"
                />
              </div>
            </div>
          </div>

          {/* Form Submit */}
          <div className="pt-4 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-xs text-slate-400">
              By submitting, your report enters the FixMyBharat demo verification pipeline.
            </p>
            <button
              type="submit"
              disabled={submitting}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-xl font-semibold text-white bg-teal-600 hover:bg-teal-500 shadow-lg shadow-teal-600/30 transition-all text-sm disabled:opacity-50"
            >
              {submitting ? (
                <span>Generating Demo Report...</span>
              ) : (
                <>
                  <span>Submit Demo Report</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </div>
        </form>
      )}
    </div>
  );
}
