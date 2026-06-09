import React from 'react';
import Link from 'next/link';

export default function Home() {
  return (
    <section id="home" className="hero">
      <div className="hero-overlay"></div>
      <div className="container">
        <div className="hero-content">
          <h1 className="hero-h1 fade-in-up">
            Seguridad <span className="text-gold">Privada</span>
          </h1>
          <div className="hero-text-box fade-in-up delay-1">
            <p className="hero-slogan">Custodiando Hoy, Asegurando su Mañana.</p>
            <p className="hero-description">
              Protección de élite para quienes exigen lo mejor. Vigilancia, escoltas y seguridad estratégica.
            </p>
          </div>
          <div className="hero-btns fade-in-up delay-2">
            <Link href="/contacto" className="btn-primary">
              Solicitar Servicio
            </Link>
            <Link href="/servicios" className="btn-secondary">
              Ver Servicios
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
