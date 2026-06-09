"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import FadeIn from '@/components/FadeIn';

export default function Servicios() {
  const [activeModal, setActiveModal] = useState<string | null>(null);
  const [currentSlide, setCurrentSlide] = useState(0);

  const openModal = (modalId: string) => {
    setActiveModal(modalId);
    document.body.classList.add('modal-open');
    document.documentElement.classList.add('modal-open');
  };

  const closeModal = () => {
    setActiveModal(null);
    document.body.classList.remove('modal-open');
    document.documentElement.classList.remove('modal-open');
  };

  const handleOutsideClick = (e: React.MouseEvent<HTMLDivElement>, modalId: string) => {
    if (e.target === e.currentTarget) {
      closeModal();
    }
  };

  // Close modal on Escape key press
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        closeModal();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      // Clean up body classes when component unmounts
      document.body.classList.remove('modal-open');
      document.documentElement.classList.remove('modal-open');
    };
  }, []);

  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);

  const minSwipeDistance = 50;

  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;

    if (isLeftSwipe) {
      nextSlide();
    } else if (isRightSwipe) {
      prevSlide();
    }
  };

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev === 2 ? 0 : prev + 1));
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev === 0 ? 2 : prev - 1));
  };

  return (
    <>
      <section className="hero">
        <div className="hero-overlay"></div>
        <div className="container">
          <div className="hero-content">
            <h1 className="hero-h1 fade-in-up">
              Nuestros <span className="text-gold">Servicios</span>
            </h1>
            <div className="hero-text-box fade-in-up delay-1">
              <p className="hero-description">
                Soluciones integrales de seguridad privada de élite adaptadas con precisión a sus requerimientos de protección.
              </p>
            </div>
          </div>
        </div>
        <a href="#services" className="scroll-indicator fade-in delay-2">
          <span className="scroll-mouse">
            <span className="scroll-wheel"></span>
          </span>
          <span className="scroll-text">Deslizar</span>
          <span className="scroll-arrow"></span>
        </a>
      </section>

      <section id="services" className="services section-padding">
        <div className="container">
          <FadeIn direction="up">
            <div className="text-center scroll-reveal active" style={{ marginBottom: '50px' }}>
              <h2 className="section-title">
                Nuestras Líneas de <span className="text-gold">Protección</span>
              </h2>
              <p style={{ maxWidth: '600px', margin: '0 auto', color: '#a0aec0' }}>
                Haga clic en cualquiera de nuestras tarjetas de servicio para explorar a detalle nuestros rigurosos estándares operativos y planes tácticos.
              </p>
            </div>
          </FadeIn>

          <FadeIn direction="up" delay={0.1}>
            <div className="services-carousel-container">
              <div 
                className="services-carousel-track"
                style={{ transform: `translateX(-${currentSlide * 100}%)` }}
                onTouchStart={handleTouchStart}
                onTouchMove={handleTouchMove}
                onTouchEnd={handleTouchEnd}
              >
                
                <div className="service-card" onClick={() => openModal('modal-personal')}>
                  <div className="service-image">
                    <Image 
                      src="/assets/service_1.webp" 
                      alt="Protección Personal" 
                      width={400} 
                      height={260} 
                      loading="lazy" 
                    />
                  </div>
                  <div className="service-info">
                    <div className="icon-box">
                      <i className="fas fa-user-shield"></i>
                    </div>
                    <h3>Protección Personal</h3>
                    <p>Escoltas altamente capacitados para garantizar su seguridad e integridad física en todo momento.</p>
                  </div>
                </div>

                <div className="service-card" onClick={() => openModal('modal-custodios')}>
                  <div className="service-image">
                    <Image 
                      src="/assets/service_4.webp" 
                      alt="Custodios" 
                      width={400} 
                      height={260} 
                      loading="lazy" 
                    />
                  </div>
                  <div className="service-info">
                    <div className="icon-box">
                      <i className="fa-solid fa-truck-fast"></i>
                    </div>
                    <h3>Custodios De Bienes</h3>
                    <p>Protección especializada para el transporte de mercancías and valores, garantizando una entrega segura y puntual.</p>
                  </div>
                </div>

                <div className="service-card" onClick={() => openModal('modal-intramuros')}>
                  <div className="service-image">
                    <Image 
                      src="/assets/service_5.webp" 
                      alt="Seguridad Intramuros" 
                      width={400} 
                      height={260} 
                      loading="lazy" 
                    />
                  </div>
                  <div className="service-info">
                    <div className="icon-box">
                      <i className="fa-solid fa-building-lock"></i>
                    </div>
                    <h3>Seguridad Intramuros</h3>
                    <p>Seguridad interna para empresas, bodegas y zonas residenciales con personal altamente capacitado y protocolos estrictos.</p>
                  </div>
                </div>

              </div>

              {/* Carousel navigation controls (Visible only on mobile) */}
              <div className="carousel-nav-controls">
                <button className="carousel-arrow-btn" onClick={prevSlide} aria-label="Anterior servicio">
                  <i className="fa-solid fa-chevron-left"></i>
                </button>
                <div className="carousel-dots">
                  {[0, 1, 2].map((idx) => (
                    <div 
                      key={idx}
                      className={`carousel-dot ${currentSlide === idx ? 'active' : ''}`}
                      onClick={() => setCurrentSlide(idx)}
                    />
                  ))}
                </div>
                <button className="carousel-arrow-btn" onClick={nextSlide} aria-label="Siguiente servicio">
                  <i className="fa-solid fa-chevron-right"></i>
                </button>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Sección de Filosofía y Valor Agregado */}
      <section 
        className="service-philosophy section-padding" 
        style={{ 
          backgroundColor: 'var(--primary-color)', 
          borderTop: '1px solid rgba(255, 255, 255, 0.05)', 
          borderBottom: '1px solid rgba(255, 255, 255, 0.05)' 
        }}
      >
        <div className="container philosophy-container">
          <FadeIn direction="left">
            <div className="philosophy-text">
              <h2 className="section-title">
                Protección <span className="text-gold">Táctica e Integral</span>
              </h2>
              <p className="lead-text">
                En Internacional Private Security Z&O, nuestra misión va más allá de la vigilancia estándar. Diseñamos esquemas operativos avanzados adaptados a las vulnerabilidades específicas de su entorno corporativo, comercial o personal.
              </p>
              <p>
                Cada uno de nuestros servicios está respaldado por un riguroso control de confianza, capacitación táctica continua ante situaciones de alto estrés y el uso de tecnologías de punta para garantizar una reacción inmediata.
              </p>
              
              <div className="philosophy-badges">
                <div className="ph-badge">
                  <i className="fas fa-certificate text-gold"></i>
                  <span>Certificaciones Federales</span>
                </div>
                <div className="ph-badge">
                  <i className="fas fa-shield-halved text-gold"></i>
                  <span>Respaldo Operativo 24/7</span>
                </div>
              </div>
            </div>
          </FadeIn>
          
          <FadeIn direction="right">
            <div className="philosophy-features">
              <div className="feature-small-card">
                <div className="f-icon"><i className="fas fa-user-check"></i></div>
                <div className="f-details">
                  <h3>Selección Rigurosa</h3>
                  <p>Todo nuestro personal pasa por pruebas estrictas de control de confianza, exámenes psicométricos y toxicológicos.</p>
                </div>
              </div>
              
              <div className="feature-small-card">
                <div className="f-icon"><i className="fas fa-satellite-dish"></i></div>
                <div className="f-details">
                  <h3>Monitoreo y GPS</h3>
                  <p>Seguimiento satelital en tiempo real para custodias y unidades patrulleras, coordinado con nuestro centro de comando.</p>
                </div>
              </div>
              
              <div className="feature-small-card">
                <div className="f-icon"><i className="fas fa-handcuffs"></i></div>
                <div className="f-details">
                  <h3>Alineación Legal</h3>
                  <p>Operamos en estricto cumplimiento con la Ley Federal de Seguridad Privada y normativas vigentes.</p>
                </div>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Sección de Proceso Operativo */}
      <section className="service-process section-padding" style={{ backgroundColor: 'var(--secondary-color)' }}>
        <div className="container">
          <FadeIn direction="up">
            <div className="text-center scroll-reveal active" style={{ marginBottom: '50px' }}>
              <h2 className="section-title">
                Proceso de <span className="text-gold">Despliegue Operativo</span>
              </h2>
              <p style={{ maxWidth: '600px', margin: '0 auto', color: '#a0aec0' }}>
                Garantizamos una transición y despliegue impecable mediante un método estructurado y auditable en cuatro fases clave.
              </p>
            </div>
          </FadeIn>
          
          <div className="process-grid">
            <FadeIn direction="up" delay={0.1}>
              <div className="process-step">
                <div className="step-num">01</div>
                <h3>Diagnóstico Operativo</h3>
                <p>Analizamos minuciosamente las instalaciones, rutas o perfiles de riesgo para detectar vulnerabilidades.</p>
              </div>
            </FadeIn>
            
            <FadeIn direction="up" delay={0.2}>
              <div className="process-step">
                <div className="step-num">02</div>
                <h3>Planificación Táctica</h3>
                <p>Diseñamos las consignas específicas, asignamos al personal ideal y definimos los protocolos de comunicación.</p>
              </div>
            </FadeIn>
            
            <FadeIn direction="up" delay={0.3}>
              <div className="process-step">
                <div className="step-num">03</div>
                <h3>Activación de Servicio</h3>
                <p>Desplegamos el estado de fuerza con supervisión presencial en la plaza y enlace directo con el centro de control Z&O.</p>
              </div>
            </FadeIn>
            
            <FadeIn direction="up" delay={0.4}>
              <div className="process-step">
                <div className="step-num">04</div>
                <h3>Auditorías y Reportes</h3>
                <p>Realizamos evaluaciones periódicas, actualizamos bitácoras y enviamos reportes ejecutivos semanales.</p>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* Sección de CTA */}
      <section className="services-cta section-padding">
        <div className="container services-cta-content scroll-reveal active">
          <FadeIn direction="up">
            <h2>¿Necesita un Esquema de Seguridad a su Medida?</h2>
            <p>Nuestros expertos están listos para realizar un análisis de vulnerabilidad inicial sin costo para su empresa o familia.</p>
            <div className="cta-buttons">
              <Link href="/contacto" className="btn-primary">
                Solicitar Asesoría
              </Link>
              <a 
                href="https://wa.me/525548638428?text=Hola%2C%20me%20interesa%20obtener%20m%C3%A1s%20informaci%C3%B3n%20sobre%20los%20servicios%20de%20seguridad%20privada%20de%20Z%26O.%20%C2%BFMe%20podr%C3%ADan%20asesorar%3F" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="btn-secondary"
              >
                <i className="fab fa-whatsapp"></i> Hablar con un Asesor
              </a>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Modals for Services */}
      
      {/* Modal Personal */}
      <div 
        id="modal-personal" 
        className={`modal ${activeModal === 'modal-personal' ? 'show' : ''}`} 
        onClick={(e) => handleOutsideClick(e, 'modal-personal')}
      >
        <div className="modal-content">
          <span className="modal-close" onClick={closeModal}>&times;</span>
          <div className="modal-header">
            <i className="fas fa-user-shield text-gold"></i>
            <h2>Protección Personal</h2>
          </div>
          <div className="modal-body">
            <p>Escoltas altamente capacitados para garantizar su seguridad e integridad física en todo momento. Nuestro personal cuenta con un entrenamiento táctico riguroso y una excelente presentación.</p>
            <ul className="modal-features">
              <li><i className="fas fa-check"></i> <span>Análisis detallado de rutas y rutinas diarias.</span></li>
              <li><i className="fas fa-check"></i> <span>Personal con capacitación en manejo evasivo y defensivo.</span></li>
              <li><i className="fas fa-check"></i> <span>Vehículos blindados disponibles bajo solicitud.</span></li>
              <li><i className="fas fa-check"></i> <span>Discreción y confidencialidad absoluta en todo momento.</span></li>
            </ul>
          </div>
        </div>
      </div>

      {/* Modal Custodios */}
      <div 
        id="modal-custodios" 
        className={`modal ${activeModal === 'modal-custodios' ? 'show' : ''}`} 
        onClick={(e) => handleOutsideClick(e, 'modal-custodios')}
      >
        <div className="modal-content">
          <span className="modal-close" onClick={closeModal}>&times;</span>
          <div className="modal-header">
            <i className="fa-solid fa-truck-fast text-gold"></i>
            <h2>Custodios De Bienes</h2>
          </div>
          <div className="modal-body">
            <p>Protección especializada para el transporte de mercancías y valores, garantizando una entrega segura y puntual de principio a fin, en todo el territorio nacional.</p>
            <ul className="modal-features">
              <li><i className="fas fa-check"></i> <span>Custodia de mercancía en tránsito local y federal.</span></li>
              <li><i className="fas fa-check"></i> <span>Centro de monitoreo GPS activo las 24 horas del día.</span></li>
              <li><i className="fas fa-check"></i> <span>Vehículos de escolta equipados con sistemas de comunicación.</span></li>
              <li><i className="fas fa-check"></i> <span>Protocolos estrictos de reacción inmediata ante emergencias.</span></li>
            </ul>
          </div>
        </div>
      </div>

      {/* Modal Intramuros */}
      <div 
        id="modal-intramuros" 
        className={`modal ${activeModal === 'modal-intramuros' ? 'show' : ''}`} 
        onClick={(e) => handleOutsideClick(e, 'modal-intramuros')}
      >
        <div className="modal-content">
          <span className="modal-close" onClick={closeModal}>&times;</span>
          <div className="modal-header">
            <i className="fa-solid fa-building-lock text-gold"></i>
            <h2>Seguridad Intramuros</h2>
          </div>
          <div className="modal-body">
            <p>Seguridad interna para empresas, corporativos, bodegas y zonas residenciales. Mantenemos el orden y prevenimos cualquier tipo de riesgo en sus instalaciones.</p>
            <ul className="modal-features">
              <li><i className="fas fa-check"></i> <span>Control estricto de accesos y salidas peatonales y vehiculares.</span></li>
              <li><i className="fas fa-check"></i> <span>Rondas de vigilancia perimetral periódicas y aleatorias.</span></li>
              <li><i className="fas fa-check"></i> <span>Manejo detallado de bitácoras y reportes de incidencias.</span></li>
              <li><i className="fas fa-check"></i> <span>Operación integral con sistemas de monitoreo CCTV.</span></li>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
}
