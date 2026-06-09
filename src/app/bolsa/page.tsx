import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Bolsa de Trabajo',
  description: 'Próximamente: Únete a nuestro equipo de élite en seguridad privada.',
};

export default function Bolsa() {
  return (
    <>
      <section className="hero">
        <div className="hero-overlay"></div>
        <div className="container">
          <div className="hero-content">
            <h1 className="hero-h1 fade-in-up">
              Bolsa de <span className="text-gold">Trabajo</span>
            </h1>
            <div className="hero-text-box fade-in-up delay-1">
              <p className="hero-description">
                Únase a nuestro equipo de seguridad de élite y desarrolle una carrera profesional sólida y honorable.
              </p>
            </div>
          </div>
        </div>
        <a href="#bolsa-section" className="scroll-indicator fade-in delay-2">
          <span className="scroll-mouse">
            <span className="scroll-wheel"></span>
          </span>
          <span className="scroll-text">Deslizar</span>
          <span className="scroll-arrow"></span>
        </a>
      </section>

      <section
        id="bolsa-section"
        className="bolsa-section section-padding text-center scroll-reveal active"
        style={{
          minHeight: '40vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <div className="container">
          <i className="fas fa-hard-hat text-gold" style={{ fontSize: '5rem', marginBottom: '30px' }}></i>
          <h2 className="section-title" style={{ marginBottom: '20px' }}>
            Plataforma en <span className="text-gold">Construcción</span>
          </h2>
          <p style={{ fontSize: '1.2rem', color: 'var(--text-muted)', maxWidth: '600px', margin: '0 auto 40px auto' }}>
            Estamos construyendo nuestra plataforma de reclutamiento para que puedas unirte a nuestro equipo de élite. ¡Vuelve pronto para conocer nuestras vacantes!
          </p>
          <Link href="/" className="btn-secondary">
            Volver al Inicio
          </Link>
        </div>
      </section>
    </>
  );
}
