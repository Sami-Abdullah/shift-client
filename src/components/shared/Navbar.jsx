"use client";

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Button } from "@/components/ui/button";
import { Search, ShoppingBag } from 'lucide-react';

export default function GlobalNavbar() {
  const pathname = usePathname();

  // Helper function to check if link matches the current view path
  const isActive = (path) => pathname === path;

  const navLinks = [
    { name: 'Collections', href: '/collections' },
    { name: 'Archives', href: '/archives' },
    { name: 'Atelier', href: '/atelier' },
    { name: 'Objects', href: '/objects' },
    { name: 'Sign In', href: '/signin' },
    { name: 'Sign Up', href: '/signup' },
  ];

  return (
    <nav className="sticky top-0 z-50 h-14 w-full border-b border-white/5 bg-brand-neutral text-brand-secondary px-6 lg:px-12 flex items-center justify-between">
      {/* Brand Identity */}
      <div className="flex items-center">
        <Link href="/" className="text-sm font-medium tracking-[0.25em] uppercase text-brand-secondary font-serif">
          Shift
        </Link>
      </div>

      {/* Center Navigation Matrix matching image_1e6bcb.png exactly */}
      <div className="hidden md:flex gap-8 justify-center items-center h-full">
        {navLinks.map((link) => (
          <Link 
            key={link.name} 
            href={link.href} 
            className={`relative text-[10px] font-medium uppercase tracking-[0.2em] h-full flex items-center transition-colors duration-200 ${
              isActive(link.href) 
                ? 'text-brand-secondary' 
                : 'text-brand-primary/50 hover:text-brand-secondary'
            }`}
          >
            {link.name}
            {/* The structural indicator underline matching image_1e6bcb.png */}
            {isActive(link.href) && (
              <span className="absolute bottom-0 left-0 w-full h-[2px] bg-brand-secondary animate-in fade-in zoom-in-95 duration-150" />
            )}
          </Link>
        ))}
      </div>

      {/* Utilities */}
      <div className="flex items-center gap-1">
        <Button variant="ghost" size="icon" className="h-8 w-8 text-brand-secondary hover:bg-white/5 hover:text-white rounded-full cursor-pointer">
          <Search className="w-3.5 h-3.5 stroke-[1.25]" />
        </Button>
        <Button variant="ghost" size="icon" className="h-8 w-8 text-brand-secondary hover:bg-white/5 hover:text-white rounded-full cursor-pointer">
          <ShoppingBag className="w-3.5 h-3.5 stroke-[1.25]" />
        </Button>
      </div>
    </nav>
  );
}