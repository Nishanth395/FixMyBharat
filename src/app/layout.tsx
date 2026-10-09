import type { Metadata } from 'next';
import './globals.css';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { ComplaintProvider } from '@/lib/ComplaintContext';

export const metadata: Metadata = {
  title: 'FixMyBharat | AI-Powered Civic Intelligence Platform',
  description:
    'Citizen Eyes. AI Intelligence. Municipal Action. FixMyBharat bridges citizens and municipal authorities with prioritized civic issue resolution.',
};

import { Suspense } from 'react';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark h-full">
      <body className="min-h-full flex flex-col bg-[#060b14] text-slate-100 antialiased selection:bg-teal-500/30 selection:text-teal-200">
        <ComplaintProvider>
          <Suspense fallback={<div className="h-16 border-b border-slate-800 bg-[#060b14]" />}>
            <Navbar />
          </Suspense>
          <main className="flex-1 flex flex-col">
            <Suspense fallback={<div className="p-8 text-center text-slate-400">Loading...</div>}>
              {children}
            </Suspense>
          </main>
          <Footer />
        </ComplaintProvider>
      </body>
    </html>
  );
}
