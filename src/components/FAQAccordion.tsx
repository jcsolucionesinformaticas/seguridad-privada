"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface FAQItem {
  question: string;
  answer: string;
}

const faqData: FAQItem[] = [
  {
    question: "¿Z&O cuenta con permisos oficiales y registros legales vigentes?",
    answer: "Sí, operamos en estricto cumplimiento legal. Contamos con el registro REPSE (Registro de Prestadoras de Servicios Especializados) de la STPS para subcontratación autorizada, así como las licencias y autorizaciones federales y estatales necesarias emitidas por la Dirección General de Seguridad Privada (DGSP) y la Secretaría de Seguridad y Protección Ciudadana (SSPC)."
  },
  {
    question: "¿Cuál es su tiempo de respuesta ante incidencias o emergencias operativas?",
    answer: "Nuestra capacidad de respuesta está respaldada por un Centro de Mando y Monitoreo activo las 24 horas del día, los 365 días del año. Ante cualquier señal de alarma o reporte de nuestro personal en sitio, el protocolo de reacción se activa en menos de 10 minutos, enlazando directamente a supervisores de zona móviles y a las autoridades de seguridad pública locales y federales."
  },
  {
    question: "¿Tienen cobertura en todo el territorio mexicano?",
    answer: "Contamos con presencia operativa a nivel nacional. Nuestras sedes principales se ubican de manera estratégica en la Ciudad de México (Oficina Central Corporativa) y Monterrey, Nuevo León (Dirección Regional Norte), lo que nos permite coordinar y desplegar esquemas de vigilancia y custodias de mercancías federales a lo largo de las principales rutas logísticas e industriales del país."
  },
  {
    question: "¿Qué filtros de selección y control de confianza aplican a sus guardias?",
    answer: "Todo nuestro personal pasa por un riguroso proceso de reclutamiento. Esto incluye estudios socioeconómicos detallados, revisión de antecedentes penales, exámenes psicométricos y pruebas toxicológicas y médicas periódicas. Además, reciben capacitación táctica continua en prevención del delito, defensa personal, primeros auxilios y protocolos de comunicación."
  },
  {
    question: "¿Los servicios de seguridad privada contratados son deducibles de impuestos?",
    answer: "Absolutamente. Al contar con nuestro registro REPSE plenamente validado y cumplir con todas nuestras obligaciones fiscales y patronales, los comprobantes fiscales digitales (CFDI) que emitimos por concepto de servicios de seguridad privada especializada son 100% deducibles de impuestos (ISR) y acreditables para efectos del IVA para tu empresa."
  }
];

export default function FAQAccordion() {
  const [faqs, setFaqs] = useState<FAQItem[]>(faqData);
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  useEffect(() => {
    const fetchFaqs = async () => {
      try {
        const url = process.env.NEXT_PUBLIC_SHEETS_WEBAPP_URL;
        if (!url) return;
        
        const res = await fetch(`${url}?action=get_faqs`);
        const json = await res.json();
        if (json.status === "success" && json.data && json.data.length > 0) {
          const formatted = json.data.map((item: any) => ({
            question: item.Question,
            answer: item.Answer,
            orderNum: Number(item.OrderNum) || 0
          }));
          formatted.sort((a: any, b: any) => (a.orderNum || 0) - (b.orderNum || 0));
          setFaqs(formatted);
        }
      } catch (err) {
        // Fallback to static faqData
      }
    };
    fetchFaqs();
  }, []);

  const toggleIndex = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="faq-accordion">
      <div className="faq-grid">
        {faqs.map((item, index) => {
          const isOpen = openIndex === index;
          return (
            <div 
              key={index} 
              className={`faq-item ${isOpen ? "active" : ""}`}
            >
              <button 
                className="faq-question" 
                onClick={() => toggleIndex(index)}
                aria-expanded={isOpen}
              >
                <span>{item.question}</span>
                <i className={`fas fa-chevron-down faq-arrow ${isOpen ? "rotate-180" : ""}`}></i>
              </button>
              
              <AnimatePresence initial={false}>
                {isOpen && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                    style={{ overflow: "hidden" }}
                  >
                    <div className="faq-answer">
                      <p>{item.answer}</p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </div>
    </div>
  );
}
