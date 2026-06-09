"use client";

import React, { useState, useEffect, useRef } from "react";
import { AnimatePresence, motion } from "framer-motion";

export default function WhatsAppButton() {
  const [isOpen, setIsOpen] = useState(false);
  const panelRef = useRef<HTMLDivElement>(null);

  // Close panel on click outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (panelRef.current && !panelRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen]);

  const channels = [
    {
      title: "Cotizaciones y Ventas",
      subtitle: "Asesoría comercial personalizada",
      icon: "fa-solid fa-file-invoice-dollar",
      url: "https://wa.me/525548638428?text=Hola%2C%20me%20interesa%20obtener%20m%C3%A1s%20informaci%C3%B3n%20sobre%20los%20servicios%20de%20seguridad%20privada%20de%20Z%26O.%20%C2%BFMe%20podr%C3%ADan%20asesorar%3F",
      color: "var(--accent-color)",
    },
    {
      title: "Bolsa de Trabajo",
      subtitle: "Vacantes y reclutamiento activo",
      icon: "fa-solid fa-user-tie",
      url: "https://wa.me/525548638428?text=Hola%2C%20me%20interesa%20obtener%20informaci%C3%B3n%20sobre%20las%20vacantes%20y%20oportunidades%20de%20trabajo%20en%20Z%26O.",
      color: "var(--accent-color)",
    },
    {
      title: "Emergencias 24/7",
      subtitle: "Central de Monitoreo y Reacción",
      icon: "fa-solid fa-phone-volume",
      url: "tel:+525548638428",
      color: "#e53e3e", // red warning color for emergency
    },
  ];

  return (
    <div className="whatsapp-widget-container" ref={panelRef}>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="whatsapp-panel"
          >
            {/* Header */}
            <div className="whatsapp-panel-header">
              <div className="whatsapp-header-logo">
                <i className="fa-brands fa-whatsapp"></i>
                <div>
                  <h4>Atención Inmediata</h4>
                  <span>Z&O Seguridad Privada</span>
                </div>
              </div>
              <button
                className="whatsapp-panel-close"
                onClick={() => setIsOpen(false)}
                aria-label="Cerrar panel"
              >
                &times;
              </button>
            </div>

            {/* Body */}
            <div className="whatsapp-panel-body">
              <p className="whatsapp-intro">
                Hola 👋. Selecciona el departamento con el que deseas comunicarte:
              </p>

              <div className="whatsapp-channels-list">
                {channels.map((channel, idx) => (
                  <a
                    key={idx}
                    href={channel.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="whatsapp-channel-card"
                    onClick={() => setIsOpen(false)}
                  >
                    <div
                      className="channel-icon-wrapper"
                      style={{ color: channel.color, border: `1px solid ${channel.color}33` }}
                    >
                      <i className={channel.icon}></i>
                    </div>
                    <div className="channel-info">
                      <h5>{channel.title}</h5>
                      <span>{channel.subtitle}</span>
                    </div>
                    <i className="fa-solid fa-chevron-right channel-arrow"></i>
                  </a>
                ))}
              </div>
            </div>

            {/* Footer */}
            <div className="whatsapp-panel-footer">
              <i className="fa-solid fa-clock"></i>
              <span>Tiempo estimado de respuesta: &lt; 5 min</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`whatsapp-btn ${isOpen ? "active" : ""}`}
        aria-label={isOpen ? "Cerrar canales de WhatsApp" : "Contactar por WhatsApp"}
      >
        {isOpen ? (
          <i className="fa-solid fa-xmark"></i>
        ) : (
          <i className="fa-brands fa-whatsapp"></i>
        )}
      </button>
    </div>
  );
}
