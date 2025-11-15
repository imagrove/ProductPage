// components/Header.tsx
'use client';

import Link from 'next/link';
import { useState } from 'react';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const navItems = [
    { href: '/', label: 'Home' },
    { href: '/products', label: 'Products' },
    { href: '/about', label: 'About' },
    { href: '/contact', label: 'Contact' },
  ];

  return (
    <header className="bg-white shadow-md sticky top-0 z-40">
      <nav className="container mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          <Link href="/" className="text-xl font-bold text-gray-800">
            Product Store
          </Link>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex space-x-6">
            {navItems.map((item) => (
              <Link 
                key={item.href} 
                href={item.href} 
                className="text-gray-600 hover:text-gray-800 transition-colors"
              >
                {item.label}
              </Link>
            ))}
          </div>

          <div className="flex items-center space-x-4">
            {/* Cart Button */}
            <button
              className="snipcart-checkout text-gray-600 hover:text-gray-800 transition-colors relative"
              aria-label="Shopping cart"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                      d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-2.5 5M7 13l2.5 5m6-5v6a2 2 0 11-4 0v-6m4 0V9a2 2 0 10-4 0v4.01" />
              </svg>
              <span className="snipcart-items-count absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center"></span>
            </button>

            {/* Mobile Menu Button */}
            <button
              onClick={toggleMenu}
              className="md:hidden text-gray-600 hover:text-gray-800 transition-colors"
              aria-label="Toggle menu"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {isMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden mt-4 pb-4 border-t border-gray-200">
            <div className="flex flex-col space-y-2 pt-4">
              {navItems.map((item) => (
                <Link 
                  key={item.href} 
                  href={item.href} 
                  className="text-gray-600 hover:text-gray-800 py-2 transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}