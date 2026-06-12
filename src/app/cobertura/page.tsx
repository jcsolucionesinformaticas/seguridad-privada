import React from 'react';
import type { Metadata } from 'next';
import InteractiveMap from '@/components/InteractiveMap';

export const metadata: Metadata = {
  title: 'Cobertura y Sucursales',
  description: 'Sedes corporativas en CDMX y Monterrey con cobertura nacional y despliegue estratégico.',
};

export default function Cobertura() {
  return (
    <>
      <section className="hero">
        <div className="hero-overlay"></div>
        <div className="container">
          <div className="hero-content">
            <h1 className="hero-h1 fade-in-up">
              Presencia y <span className="text-gold">Cobertura</span>
            </h1>
            <div className="hero-text-box fade-in-up delay-1">
              <p className="hero-description">
                Despliegue operativo estratégico y oficinas corporativas en los centros industriales y financieros más importantes del país para garantizar una reacción inmediata.
              </p>
            </div>
          </div>
        </div>
        <a href="#branches" className="scroll-indicator fade-in delay-2">
          <span className="scroll-mouse">
            <span className="scroll-wheel"></span>
          </span>
          <span className="scroll-text">Deslizar</span>
          <span className="scroll-arrow"></span>
        </a>
      </section>

      <section id="branches" className="branches section-padding">
        <div className="container">
          <div className="section-header text-center scroll-reveal active">
            <h2 className="section-title">
              Nuestras <span className="text-gold">Sedes Oficiales</span>
            </h2>
            <p className="section-subtitle" style={{ maxWidth: '600px', margin: '15px auto 0 auto' }}>
              Oficinas centrales equipadas con personal administrativo, de control y logística listos para atenderle de manera personalizada.
            </p>
          </div>

          {/* Mapa Interactivo */}
          <div className="scroll-reveal active" style={{ marginBottom: '60px' }}>
            <InteractiveMap />
          </div>

          <div className="cobertura-grid">
            {/* Sede CDMX */}
            <div className="branch-card scroll-reveal-left active">
              <div className="branch-header">
                <i className="fa-solid fa-building-shield"></i>
                <div>
                  <h2>Sede Ciudad de México</h2>
                  <span className="text-gold" style={{ fontSize: '0.9rem', fontWeight: 600 }}>
                    Oficina Central Corporativa
                  </span>
                </div>
              </div>
              <div className="branch-details">
                <p>
                  Ubicada de forma estratégica en el norte de la capital, nuestra oficina principal dirige las operaciones del área metropolitana y la región centro del país.
                </p>
                <ul className="branch-details-list">
                  <li>
                    <i className="fa-solid fa-location-dot"></i>
                    <span>
                      Av. 23 de Abril No. 347, Piso 1, Interior 4, Colonia Ampliación San Pedro Xalpa, Alcaldía Azcapotzalco. CDMX. C.P. 02719
                    </span>
                  </li>
                  <li>
                    <i className="fa-solid fa-phone"></i>
                    <span>
                      <a href="https://wa.me/525548638428" target="_blank" rel="noopener noreferrer" style={{ color: 'inherit', textDecoration: 'underline' }}>
                        +52 55 4863 8428
                      </a> (Línea Principal)
                    </span>
                  </li>
                  <li>
                    <i className="fa-solid fa-envelope"></i>
                    <span>contacto@internationalprivatesecurityzyo.com.mx</span>
                  </li>
                  <li>
                    <i className="fa-solid fa-clock"></i>
                    <span>Lunes a Viernes: 9:00 AM - 6:00 PM</span>
                  </li>
                </ul>
              </div>
              <div className="map-placeholder">
                <i className="fa-solid fa-map-location-dot map-icon"></i>
                <h3 style={{ fontSize: '1.1rem', marginBottom: '8px' }}>Ubicación en Azcapotzalco, CDMX</h3>
                <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)', marginBottom: '15px' }}>
                  Visualice el mapa interactivo y trace su ruta en tiempo real.
                </p>
                <a
                  href="https://www.google.com/maps/dir/?api=1&destination=Av.+23+de+Abril+347,+San+Pedro+Xalpa,+Azcapotzalco,+02719+Ciudad+de+M%C3%A9xico,+CDMX"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-primary"
                  style={{ padding: '10px 20px', fontSize: '0.9rem' }}
                >
                  <i className="fa-solid fa-route" style={{ marginRight: '8px' }}></i>Cómo Llegar (Google Maps)
                </a>
              </div>
            </div>

            {/* Sede Monterrey */}
            <div className="branch-card scroll-reveal-right active">
              <div className="branch-header">
                <i className="fa-solid fa-building-shield"></i>
                <div>
                  <h2>Sede Monterrey</h2>
                  <span className="text-gold" style={{ fontSize: '0.9rem', fontWeight: 600 }}>
                    Dirección Regional Norte
                  </span>
                </div>
              </div>
              <div className="branch-details">
                <p>
                  Nuestra base en Nuevo León gestiona la logística del norte del país, garantizando custodias de mercancías seguras y cobertura intramuros de alto nivel.
                </p>
                <ul className="branch-details-list">
                  <li>
                    <i className="fa-solid fa-location-dot"></i>
                    <span>
                      C. Ordenanzas Reales 205, Col. La Encomienda, Gral. Escobedo, Nuevo León. C.P. 66059
                    </span>
                  </li>
                  <li>
                    <i className="fa-solid fa-phone"></i>
                    <span>
                      <a href="https://wa.me/528180218302" target="_blank" rel="noopener noreferrer" style={{ color: 'inherit', textDecoration: 'underline' }}>
                        +52 81 8021 8302
                      </a> (Enlace Directo)
                    </span>
                  </li>
                  <li>
                    <i className="fa-solid fa-envelope"></i>
                    <span>mty@internationalprivatesecurityzyo.com.mx</span>
                  </li>
                  <li>
                    <i className="fa-solid fa-clock"></i>
                    <span>Lunes a Viernes: 9:00 AM - 6:00 PM</span>
                  </li>
                </ul>
              </div>
              <div className="map-placeholder">
                <i className="fa-solid fa-map-location-dot map-icon"></i>
                <h3 style={{ fontSize: '1.1rem', marginBottom: '8px' }}>Ubicación en Escobedo, NL</h3>
                <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)', marginBottom: '15px' }}>
                  Visualice el mapa interactivo y trace su ruta en tiempo real.
                </p>
                <a
                  href="https://www.google.com/maps/dir/?api=1&destination=Calle+Ordenanzas+Reales+205,+La+Encomienda,+Escobedo,+Nuevo+Le%C3%B3n"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-primary"
                  style={{ padding: '10px 20px', fontSize: '0.9rem' }}
                >
                  <i className="fa-solid fa-route" style={{ marginRight: '8px' }}></i>Cómo Llegar (Google Maps)
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
