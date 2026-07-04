"use client";

import React from 'react';
import Link from 'next/link';
import { useRouter, usePathname } from 'next/navigation';
import { Button } from "@/components/ui/button";
import { Search, ShoppingBag } from 'lucide-react';
import { authClient } from '@/lib/auth-client';

export default function Navbar() {
  const { data: session, isPending } = authClient.useSession();
  const user = session?.user ?? null;
  const pathname = usePathname();
  const router = useRouter();

  const isActive = (path) => pathname === path;

  const navLinks = [
    { name: 'Collections', href: '/collections' },
    { name: 'Archives', href: '/archives' },
    { name: 'Atelier', href: '/atelier' },
    { name: 'Objects', href: '/objects' },
    { name: 'Sign In', href: '/signin' },
    { name: 'Sign Up', href: '/signup' },
  ];

  const handleSignOut = async () => {
    await authClient.signOut({
      fetchOptions: {
        onSuccess: () => {
          router.push('/');
        },
      },
    });
  };

  // While session is loading show a neutral navbar
  // No flash, no layout shift — just nothing in the auth area
  if (isPending) {
    return (
      <nav className="sticky top-0 z-50 h-14 w-full border-b border-white/5 bg-brand-neutral text-brand-secondary px-6 lg:px-12 flex items-center justify-between">
        <div className="flex items-center">
          <Link href="/" className="text-sm font-medium tracking-[0.25em] uppercase text-brand-secondary font-serif">
            FERRUM
          </Link>
        </div>
        <div className="flex items-center gap-3">
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

  return (
    <nav className="sticky top-0 z-50 h-14 w-full border-b border-white/5 bg-brand-neutral text-brand-secondary px-6 lg:px-12 flex items-center justify-between">
      {/* Brand */}
      <div className="flex items-center">
        <Link href="/" className="text-sm font-medium tracking-[0.25em] uppercase text-brand-secondary font-serif">
          FERRUM
        </Link>
      </div>

      {/* Nav links */}
      <div className="hidden md:flex gap-8 justify-center items-center h-full">
        {navLinks.map((link) => {
          if (user && (link.href === '/signin' || link.href === '/signup')) {
            return null;
          }

          return (
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
              {isActive(link.href) && (
                <span className="absolute bottom-0 left-0 w-full h-[2px] bg-brand-secondary animate-in fade-in zoom-in-95 duration-150" />
              )}
            </Link>
          );
        })}

        {user && (
          <button
            onClick={handleSignOut}
            className="relative text-[10px] font-medium uppercase tracking-[0.2em] h-full flex items-center text-brand-primary/50 hover:text-brand-secondary transition-colors duration-200 cursor-pointer bg-transparent border-none p-0"
          >
            Sign out
          </button>
        )}
      </div>

      {/* Utilities */}
      <div className="flex items-center gap-3">
        {user && (
          <p className="hidden sm:block text-[10px] font-medium uppercase tracking-[0.15em] text-brand-primary/60 mr-1">
            Hello, {user.name?.split(' ')[0] || 'there'}
          </p>
        )}
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