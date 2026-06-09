import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import ContactForm from '@/components/ContactForm';
import FAQAccordion from '@/components/FAQAccordion';
import FadeIn from '@/components/FadeIn';

export const metadata: Metadata = {
  title: 'Contacto',
  description: 'Contáctanos para una evaluación de riesgos gratuita. Sedes en CDMX y Monterrey.',
};

export default function Contacto() {
  return (
    <>
      <section className="hero">
        <div className="hero-overlay"></div>
        <div className="container">
          <div className="hero-content">
            <h1 className="hero-h1 fade-in-up">Contáctenos</h1>
            <div className="hero-text-box fade-in-up delay-1">
              <p className="hero-description">
                Estamos listos para atender sus necesidades de seguridad. Solicite una evaluación de riesgos hoy mismo.
              </p>
            </div>
          </div>
        </div>
        <a href="#contact" className="scroll-indicator fade-in delay-2">
          <span className="scroll-mouse">
            <span className="scroll-wheel"></span>
          </span>
          <span className="scroll-text">Deslizar</span>
          <span className="scroll-arrow"></span>
        </a>
      </section>

      <section id="contact" className="contact section-padding">
        <div className="container">
          <div className="contact-wrapper">
            <div className="contact-info scroll-reveal active">
              <h2 className="section-title">
                Hablemos de su <span className="text-gold">Seguridad</span>
              </h2>
              <p>Contáctenos para una evaluación de riesgos gratuita y personalizada.</p>

              <div className="info-item">
                <i className="fas fa-phone text-gold"></i>
                <div>
                  <p>
                    <strong style={{ color: 'var(--accent-color)', fontSize: '1.15rem' }}>Llámenos</strong>
                    <br />
                    <a href="tel:+525548638428" style={{ color: 'inherit', decoration: 'none' } as React.CSSProperties}>
                      +52 55 4863 8428
                    </a>
                  </p>
                </div>
              </div>
              <div className="info-item">
                <i className="fas fa-envelope text-gold"></i>
                <div>
                  <p>
                    <strong style={{ color: 'var(--accent-color)', fontSize: '1.15rem' }}>Escríbanos</strong>
                    <br />
                    contacto@zosecurity.com
                  </p>
                </div>
              </div>
              <div className="info-item">
                <i className="fas fa-clock text-gold"></i>
                <div>
                  <p>
                    <strong style={{ color: 'var(--accent-color)', fontSize: '1.15rem' }}>Horario de Atención</strong>
                    <br />
                    Lunes a Viernes: 9:00 AM - 6:00 PM
                    <br />
                    Seguridad Operativa: 24/7
                  </p>
                </div>
              </div>
              <div className="info-item">
                <i className="fa-solid fa-map-location-dot text-gold"></i>
                <div>
                  <p>
                    <strong style={{ color: 'var(--accent-color)', fontSize: '1.15rem' }}>Presencia Nacional</strong>
                    <br />
                    Contamos con oficinas corporativas y operativas de reacción rápida.
                    <br />
                    <Link
                      href="/cobertura"
                      className="text-gold"
                      style={{ textDecoration: 'underline', fontWeight: 600, marginTop: '5px', display: 'inline-block' }}
                    >
                      Ver Soportes y Direcciones &rarr;
                    </Link>
                  </p>
                </div>
              </div>
            </div>

            <ContactForm />
          </div>
        </div>
      </section>

      <section className="faq-section section-padding" style={{ background: 'var(--secondary-bg)', borderTop: '1px solid var(--border-color)' }}>
        <div className="container">
          <FadeIn direction="up">
            <div className="section-header" style={{ textAlign: 'center', marginBottom: '3rem' }}>
              <h2 className="section-title">
                Preguntas <span className="text-gold">Frecuentes</span>
              </h2>
              <p style={{ maxWidth: '600px', margin: '0 auto', opacity: 0.8 }}>
                Resuelva sus dudas sobre nuestros registros legales, tiempos de respuesta, filtros de confianza y la cobertura nacional de nuestros servicios especializados.
              </p>
            </div>
            <FAQAccordion />
          </FadeIn>
        </div>
      </section>
    </>
  );
}
