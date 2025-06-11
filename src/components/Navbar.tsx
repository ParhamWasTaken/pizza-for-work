'use client'; 
import Link from 'next/link';
import { useAuth } from '@/contexts/AuthContext';
import { useState, useEffect } from 'react';

export const Navbar = () => {
  const { user } = useAuth();
  // State to manage whether the mobile menu is open or closed
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // An effect to prevent scrolling when the mobile menu is open
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    return () => { document.body.style.overflow = 'auto'; };
  }, [isMenuOpen]);

  return (
    <>
      <header className="bg-background/80 border-b-2 border-border sticky top-0 z-50 backdrop-blur-sm">
        <div className="container mx-auto flex justify-between items-center p-4">
          <Link href="/" className="font-logo text-3xl text-primary">
            OnePizza.wtf
          </Link>
          
          {/* Desktop Navigation: Hidden on small screens */}
          <nav className="hidden md:flex space-x-8 items-center">
            <Link href="/marketplace" className="text-foreground hover:text-primary font-bold">Marketplace</Link>
            <Link href="/about-us" className="text-foreground hover:text-primary font-bold">About Us</Link>
            {user ? (
              <Link href="/profile" className="bg-primary text-white px-4 py-2 rounded-lg font-bold border-b-4 border-primary-hover">Profile</Link>
            ) : (
              <Link href="/login" className="bg-foreground text-background px-4 py-2 rounded-lg font-bold border-b-4 border-black/40">Login</Link>
            )}
          </nav>

          {/* Mobile Menu Button: Only visible on small screens */}
          <div className="md:hidden">
            <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="text-foreground">
              <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="4" x2="20" y1="12" y2="12"/><line x1="4" x2="20" y1="6" y2="6"/><line x1="4" x2="20" y1="18" y2="18"/></svg>
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu Overlay: Only shows when `isMenuOpen` is true */}
      {isMenuOpen && (
        <div className="fixed inset-0 z-40 bg-background flex flex-col items-center justify-center md:hidden">
          <nav className="flex flex-col items-center space-y-8 text-center">
            <Link href="/marketplace" className="font-display text-4xl text-foreground hover:text-primary" onClick={() => setIsMenuOpen(false)}>Marketplace</Link>
            <Link href="/about-us" className="font-display text-4xl text-foreground hover:text-primary" onClick={() => setIsMenuOpen(false)}>About Us</Link>
            {user ? (
              <Link href="/profile" className="font-display text-4xl text-foreground hover:text-primary" onClick={() => setIsMenuOpen(false)}>Profile</Link>
            ) : (
              <Link href="/login" className="font-display text-4xl text-foreground hover:text-primary" onClick={() => setIsMenuOpen(false)}>Login</Link>
            )}
          </nav>
        </div>
      )}
    </>
  );
};