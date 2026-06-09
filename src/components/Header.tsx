"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';

export default function Header() {
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  const navLinks = [
    { href: '/', label: 'Inicio' },
    { href: '/nosotros', label: 'Nosotros' },
    { href: '/servicios', label: 'Servicios' },
    { href: '/cobertura', label: 'Cobertura' },
    { href: '/bolsa', label: 'Bolsa De Trabajo' },
    { href: '/blog', label: 'Blog' },
  ];

  return (
    <header id="header">
      <div className="container header-content">
        <Link href="/" className="logo" onClick={closeMenu}>
          <Image 
            src="/assets/logo.webp" 
            alt="Logo International Private Security Z&O" 
            className="logo-img" 
            width={50} 
            height={50} 
            priority
          />
          <div className="logo-text">
            <span className="company-name">INTERNATIONAL PRIVATE SECURITY</span>
            <span className="company-legal text-gold">Z&O S. DE R.L. C.V.</span>
          </div>
        </Link>
        
        <nav className={`nav-menu ${isMenuOpen ? 'active' : ''}`}>
          <ul>
            {navLinks.map((link) => {
              const isActive = link.href === '/' ? pathname === '/' : pathname.startsWith(link.href);
              return (
                <li key={link.href}>
                  <Link 
                    href={link.href} 
                    className={isActive ? 'active' : ''} 
                    onClick={closeMenu}
                  >
                    {link.label}
                  </Link>
                </li>
              );
            })}
            <li>
              <Link 
                href="/contacto" 
                className="btn-primary" 
                onClick={closeMenu}
              >
                Contáctanos
              </Link>
            </li>
          </ul>
        </nav>

        <div className="hamburger" onClick={toggleMenu} aria-label="Abrir menú de navegación" aria-expanded={isMenuOpen}>
          <i className={`fas ${isMenuOpen ? 'fa-times' : 'fa-bars'}`}></i>
        </div>
      </div>
    </header>
  );
}
