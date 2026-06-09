import React from 'react';
import type { Metadata } from 'next';
import FadeIn from '@/components/FadeIn';

export const metadata: Metadata = {
  title: 'Nosotros',
  description: 'Conozca nuestra trayectoria, misión y los sólidos valores de disciplina y lealtad que rigen a nuestro personal de seguridad de élite.',
};

export default function Nosotros() {
  return (
    <>
      <section className="hero">
        <div className="hero-overlay"></div>
        <div className="container">
          <div className="hero-content">
            <h1 className="hero-h1 fade-in-up">
              Sobre <span className="text-gold">Nosotros</span>
            </h1>
            <div className="hero-text-box fade-in-up delay-1">
              <p className="hero-description">
                Conozca nuestra trayectoria, misión y los sólidos valores de disciplina y lealtad que rigen a nuestro personal de seguridad de élite.
              </p>
            </div>
          </div>
        </div>
        <a href="#why-us" className="scroll-indicator fade-in delay-2">
          <span className="scroll-mouse">
            <span className="scroll-wheel"></span>
          </span>
          <span className="scroll-text">Deslizar</span>
          <span className="scroll-arrow"></span>
        </a>
      </section>

      <section id="why-us" className="why-us section-padding">
        <div className="container why-us-grid">
          <FadeIn direction="left">
            <div className="why-us-content">
              <h2 className="section-title">
                Nuestra <span className="text-gold">Filosofía</span>
              </h2>
              <div className="philosophy-grid">
                <div className="philosophy-item">
                  <h3 className="text-gold">Misión</h3>
                  <p>
                    Brindar servicios integrales de seguridad privada con profesionalismo, disciplina y alto sentido de responsabilidad, protegiendo personas, instalaciones y bienes de nuestros clientes mediante estrategias preventivas, personal capacitado y tecnología aplicada, generando confianza, tranquilidad y soluciones efectivas adaptadas a cada necesidad.
                  </p>
                </div>
                <div className="philosophy-item">
                  <h3 className="text-gold">Visión</h3>
                  <p>
                    Ser una empresa líder en seguridad privada a nivel nacional, reconocida por su excelencia operativa, ética profesional, capacidad de respuesta y compromiso con la protección integral de nuestros clientes, innovando constantemente en procesos, capacitación y servicios de seguridad.
                  </p>
                </div>
              </div>
            </div>
          </FadeIn>

          <FadeIn direction="right">
            <div className="why-us-stats">
              <div className="stat-item">
                <span className="stat-number" data-target="95">95</span><span>%</span>
                <p>Satisfacción Objetivo</p>
              </div>
              <div className="stat-item">
                <span className="stat-number" data-target="10">10</span><span>min</span>
                <p>Tiempo Respuesta</p>
              </div>
              <div className="stat-item">
                <span className="stat-number" data-target="100">100</span><span>%</span>
                <p>Personal Certificado</p>
              </div>
            </div>
          </FadeIn>
        </div>

        {/* Corporate Identity Extended Sections */}
        <div className="container" style={{ marginTop: '80px' }}>
          
          {/* Valores Corporativos */}
          <FadeIn direction="up">
            <div className="corporate-section">
              <h2 className="section-title text-center">
                Valores <span className="text-gold">Corporativos</span>
              </h2>
              <div className="values-grid">
                <div className="value-card">
                  <i className="fas fa-handshake text-gold"></i>
                  <h4>Honestidad</h4>
                  <p>Actuamos con transparencia, integridad y respeto en cada servicio y relación profesional.</p>
                </div>
                <div className="value-card">
                  <i className="fas fa-clipboard-check text-gold"></i>
                  <h4>Responsabilidad</h4>
                  <p>Cumplimos con nuestros compromisos operativos y administrativos de manera puntual y eficiente.</p>
                </div>
                <div className="value-card">
                  <i className="fas fa-user-shield text-gold"></i>
                  <h4>Disciplina</h4>
                  <p>Mantenemos estándares estrictos de conducta, presentación y desempeño en cada operación.</p>
                </div>
                <div className="value-card">
                  <i className="fas fa-shield-heart text-gold"></i>
                  <h4>Lealtad</h4>
                  <p>Protegemos los intereses y la confidencialidad de nuestros clientes con total compromiso.</p>
                </div>
                <div className="value-card">
                  <i className="fas fa-user-tie text-gold"></i>
                  <h4>Profesionalismo</h4>
                  <p>Nuestro personal trabaja con preparación, actitud de servicio y enfoque preventivo.</p>
                </div>
                <div className="value-card">
                  <i className="fas fa-users text-gold"></i>
                  <h4>Respeto</h4>
                  <p>Fomentamos relaciones laborales y comerciales basadas en la dignidad, igualdad y trato humano.</p>
                </div>
                <div className="value-card">
                  <i className="fas fa-gem text-gold"></i>
                  <h4>Compromiso</h4>
                  <p>Nos involucramos activamente en la seguridad y tranquilidad de quienes confían en nosotros.</p>
                </div>
                <div className="value-card">
                  <i className="fas fa-lock text-gold"></i>
                  <h4>Confidencialidad</h4>
                  <p>Resguardamos la información y operaciones de nuestros clientes con absoluta discreción.</p>
                </div>
              </div>
            </div>
          </FadeIn>

          {/* Objetivos Empresariales */}
          <FadeIn direction="up" delay={0.1}>
            <div className="corporate-section" style={{ marginTop: '60px' }}>
              <h2 className="section-title text-center">
                Objetivos <span className="text-gold">Empresariales</span>
              </h2>
              <div className="objective-main text-center">
                <i className="fas fa-bullseye text-gold" style={{ fontSize: '2rem', marginBottom: '15px' }}></i>
                <p style={{ fontSize: '1.1rem' }}>
                  <strong>Objetivo General:</strong> Proporcionar soluciones de seguridad privada confiables y eficientes que reduzcan riesgos y fortalezcan la protección de personas, instalaciones y valores.
                </p>
              </div>
              <ul className="corporate-list objectives-list">
                <li>
                  <i className="fas fa-check-circle text-gold"></i>
                  <span>Garantizar servicios de seguridad con altos estándares operativos.</span>
                </li>
                <li>
                  <i className="fas fa-check-circle text-gold"></i>
                  <span>Mantener personal capacitado y actualizado constantemente.</span>
                </li>
                <li>
                  <i className="fas fa-check-circle text-gold"></i>
                  <span>Implementar protocolos preventivos y de reacción inmediata.</span>
                </li>
                <li>
                  <i className="fas fa-check-circle text-gold"></i>
                  <span>Fortalecer la confianza y satisfacción de los clientes.</span>
                </li>
                <li>
                  <i className="fas fa-check-circle text-gold"></i>
                  <span>Expandir la cobertura y presencia de la empresa en diferentes sectores.</span>
                </li>
                <li>
                  <i className="fas fa-check-circle text-gold"></i>
                  <span>Incorporar tecnología y herramientas modernas de seguridad.</span>
                </li>
                <li>
                  <i className="fas fa-check-circle text-gold"></i>
                  <span>Mantener una cultura organizacional basada en ética y disciplina.</span>
                </li>
              </ul>
            </div>
          </FadeIn>

          {/* Estrategias Empresariales */}
          <FadeIn direction="up">
            <div className="corporate-section" style={{ marginTop: '60px' }}>
              <h2 className="section-title text-center">
                Estrategias <span className="text-gold">Empresariales</span>
              </h2>
              <div className="strategies-grid">
                <div className="strategy-card">
                  <div className="icon-wrapper">
                    <i className="fas fa-cogs text-gold"></i>
                  </div>
                  <div className="strategy-content">
                    <h4>Estrategia Operativa</h4>
                    <p>Diseñar planes de seguridad personalizados según el nivel de riesgo y necesidades de cada cliente.</p>
                  </div>
                </div>
                <div className="strategy-card">
                  <div className="icon-wrapper">
                    <i className="fas fa-graduation-cap text-gold"></i>
                  </div>
                  <div className="strategy-content">
                    <h4>Estrategia de Capacitación</h4>
                    <p>Capacitar continuamente al personal en prevención, reacción, atención al cliente, primeros auxilios y protocolos de seguridad.</p>
                  </div>
                </div>
                <div className="strategy-card">
                  <div className="icon-wrapper">
                    <i className="fas fa-eye text-gold"></i>
                  </div>
                  <div className="strategy-content">
                    <h4>Estrategia de Supervisión</h4>
                    <p>Realizar monitoreos y supervisiones constantes para garantizar el cumplimiento operativo y la calidad del servicio.</p>
                  </div>
                </div>
                <div className="strategy-card">
                  <div className="icon-wrapper">
                    <i className="fas fa-microchip text-gold"></i>
                  </div>
                  <div className="strategy-content">
                    <h4>Estrategia Tecnológica</h4>
                    <p>Integrar herramientas digitales, communication inmediata y controles operativos para mejorar la eficiencia y respuesta.</p>
                  </div>
                </div>
                <div className="strategy-card">
                  <div className="icon-wrapper">
                    <i className="fas fa-headset text-gold"></i>
                  </div>
                  <div className="strategy-content">
                    <h4>Atención al Cliente</h4>
                    <p>Mantener comunicación directa y atención rápida para resolver incidencias y fortalecer relaciones comerciales duraderas.</p>
                  </div>
                </div>
                <div className="strategy-card">
                  <div className="icon-wrapper">
                    <i className="fas fa-chart-line text-gold"></i>
                  </div>
                  <div className="strategy-content">
                    <h4>Estrategia de Crecimiento</h4>
                    <p>Desarrollar alianzas estratégicas y ampliar servicios en sectores corporativos, residenciales, comerciales e industriales.</p>
                  </div>
                </div>
              </div>
            </div>
          </FadeIn>

          {/* Políticas Empresariales */}
          <FadeIn direction="up">
            <div className="corporate-section" style={{ marginTop: '60px', marginBottom: '40px' }}>
              <h2 className="section-title text-center">
                Políticas <span className="text-gold">Empresariales</span>
              </h2>
              <div className="policies-grid">
                <div className="policy-card">
                  <h4>
                    <i className="fas fa-user-shield text-gold"></i> Profesionalismo
                  </h4>
                  <p>Todo el personal deberá desempeñar sus funciones con ética, respeto, disciplina y excelente presentación.</p>
                </div>
                <div className="policy-card">
                  <h4>
                    <i className="fas fa-user-secret text-gold"></i> Confidencialidad
                  </h4>
                  <p>La información de clientes, operaciones y servicios será manejada de forma estrictamente confidencial.</p>
                </div>
                <div className="policy-card">
                  <h4>
                    <i className="fas fa-hand-holding-heart text-gold"></i> Atención al Cliente
                  </h4>
                  <p>Se brindará atención inmediata, cordial y eficiente a cada cliente, priorizando sus necesidades de seguridad.</p>
                </div>
                <div className="policy-card">
                  <h4>
                    <i className="fas fa-book-reader text-gold"></i> Capacitación
                  </h4>
                  <p>El personal operativo y administrativo recibirá capacitación constante para fortalecer sus habilidades y conocimientos.</p>
                </div>
                <div className="policy-card">
                  <h4>
                    <i className="fas fa-shield-alt text-gold"></i> Prevención
                  </h4>
                  <p>Las operaciones estarán enfocadas en la prevención de riesgos y protección integral antes que la reacción.</p>
                </div>
                <div className="policy-card">
                  <h4>
                    <i className="fas fa-balance-scale text-gold"></i> Cumplimiento
                  </h4>
                  <p>La empresa cumplirá con las normativas legales y lineamientos aplicables al sector de seguridad privada.</p>
                </div>
                <div className="policy-card">
                  <h4>
                    <i className="fas fa-sync-alt text-gold"></i> Mejora Continua
                  </h4>
                  <p>Se evaluarán constantemente los procesos internos y operativos para optimizar la calidad del servicio.</p>
                </div>
                <div className="policy-card">
                  <h4>
                    <i className="fas fa-id-badge text-gold"></i> Imagen Institucional
                  </h4>
                  <p>El personal deberá mantener una imagen profesional, uniforme adecuado y comportamiento ejemplar en todo momento.</p>
                </div>
              </div>
            </div>
          </FadeIn>

        </div>
      </section>
    </>
  );
}
