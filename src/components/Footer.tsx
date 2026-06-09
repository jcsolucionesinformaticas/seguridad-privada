import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="container footer-grid">
        <div className="footer-col brand-col">
          <Link href="/" className="footer-brand" style={{ display: 'flex', alignItems: 'center', gap: '15px', textDecoration: 'none' }}>
            <Image 
              src="/assets/logo.webp" 
              alt="INTERNATIONAL PRIVATE SECURITY Z&O" 
              className="footer-logo-img" 
              style={{ objectFit: 'contain' }}
              width={48} 
              height={48} 
              loading="lazy" 
            />
            <div className="footer-brand-text" style={{ display: 'flex', flexDirection: 'column' }}>
              <span className="footer-brand-title" style={{ fontSize: '0.95rem', fontWeight: 700, letterSpacing: '1px', color: '#fff', lineHeight: 1.2 }}>INTERNATIONAL PRIVATE SECURITY</span>
              <span className="footer-brand-legal text-gold" style={{ fontSize: '0.75rem', fontWeight: 600, letterSpacing: '1.5px' }}>Z&O S. DE R.L. C.V.</span>
            </div>
          </Link>
          <p className="brand-desc">Seguridad privada de alto nivel, comprometidos con la protección, confianza e integridad de nuestros clientes en todo momento y territorio nacional.</p>
          <div className="footer-social">
            <a href="https://www.facebook.com/people/International-Pr%C3%ADvate-Security-ZO/61590195831815/" target="_blank" rel="noopener noreferrer" aria-label="Facebook"><i className="fab fa-facebook-f"></i></a>
            <a href="https://www.instagram.com/seguridadprivadazyo" target="_blank" rel="noopener noreferrer" aria-label="Instagram"><i className="fab fa-instagram"></i></a>
            <a href="https://www.tiktok.com/@internaprivasecurzyo" target="_blank" rel="noopener noreferrer" aria-label="TikTok"><i className="fab fa-tiktok"></i></a>
          </div>
        </div>
        
        <div className="footer-col">
          <h4>Servicios</h4>
          <ul>
            <li><Link href="/servicios">Protección Personal</Link></li>
            <li><Link href="/servicios">Custodios De Bienes</Link></li>
            <li><Link href="/servicios">Seguridad Intramuros</Link></li>
          </ul>
        </div>
        
        <div className="footer-col">
          <h4>Empresa</h4>
          <ul>
            <li><Link href="/">Inicio</Link></li>
            <li><Link href="/nosotros">Nosotros</Link></li>
            <li><Link href="/cobertura">Cobertura</Link></li>
            <li><Link href="/bolsa">Bolsa De Trabajo</Link></li>
            <li><Link href="/blog">Blog</Link></li>
            <li><Link href="/contacto">Contáctanos</Link></li>
          </ul>
        </div>
        
        <div className="footer-col contact-col">
          <h4>Contacto</h4>
          <ul className="footer-contact-info">
            <li>
              <i className="fa-solid fa-location-dot"></i>
              <span>Ciudad de México, México</span>
            </li>
            <li>
              <i className="fa-solid fa-phone"></i>
              <a href="tel:+525548638428">+52 55 4863 8428</a>
            </li>
            <li>
              <i className="fa-solid fa-envelope"></i>
              <a href="mailto:contacto@intersecurityzo.com">contacto@intersecurityzo.com</a>
            </li>
          </ul>
          <div className="footer-badge">
            <i className="fa-solid fa-shield-halved text-gold"></i>
            <span>Personal Certificado & Protegido 24/7</span>
          </div>
        </div>
      </div>
      
      <div className="footer-bottom">
        <div className="container footer-bottom-content">
          <p className="copyright">&copy; {currentYear} INTERNATIONAL PRIVATE SECURITY Z&O S. DE R.L. C.V. Todos los derechos reservados.</p>
          <div className="footer-creator">
            Desarrollado por <a href="https://jcsolucionesinformaticas.com.mx" target="_blank" rel="noopener noreferrer">JC Soluciones Informáticas</a>
          </div>
          <div className="footer-legal-links">
            <Link href="/aviso-privacidad">Aviso de Privacidad</Link>
            <span className="divider">|</span>
            <Link href="/terminos-servicio">Términos de Servicio</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
