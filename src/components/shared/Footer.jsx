import React from 'react';
import Link from 'next/link';
import { Globe, Share2, ShieldCheck } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-brand-neutral border-t border-white/5 px-6 py-16 text-center text-brand-secondary">
      <div className="max-w-2xl mx-auto flex flex-col items-center space-y-8">
        
        {/* Large Centered Serif Logo */}
        <h3 className="text-2xl font-normal tracking-[0.2em] uppercase font-serif text-brand-secondary">
          FERRUM
        </h3>

        {/* Navigation Core Matrix */}
        <div className="flex flex-wrap justify-center items-center gap-x-8 gap-y-2 text-[10px] uppercase tracking-[0.2em] text-brand-primary/40">
          <Link href="#" className="hover:text-brand-secondary transition-colors">Privacy</Link>
          <Link href="#" className="hover:text-brand-secondary transition-colors">Terms</Link>
          <Link href="#" className="hover:text-brand-secondary transition-colors">Contact</Link>
          <Link href="#" className="hover:text-brand-secondary transition-colors">Instagram</Link>
        </div>

        {/* Global Security and Utilities Cluster */}
        <div className="flex justify-center items-center space-x-6 text-brand-primary/30 pt-2">
          <button className="hover:text-brand-secondary transition-colors cursor-pointer" aria-label="Region Matrix">
            <Globe className="w-4 h-4 stroke-[1.25]" />
          </button>
          <button className="hover:text-brand-secondary transition-colors cursor-pointer" aria-label="Data Nodes">
            <Share2 className="w-3.5 h-3.5 stroke-[1.25]" />
          </button>
          <button className="hover:text-brand-secondary transition-colors cursor-pointer" aria-label="System Identity">
            <ShieldCheck className="w-4 h-4 stroke-[1.25]" />
          </button>
        </div>

        {/* Legal Trace Line */}
        <p className="text-[9px] uppercase tracking-[0.25em] text-brand-primary/20 pt-4">
          © 2026 FERRUM ATELIER. ALL RIGHTS RESERVED.
        </p>
      </div>
    </footer>
  );
}