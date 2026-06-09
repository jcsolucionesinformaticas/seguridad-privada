"use client";

import React, { useState, useEffect, useRef } from "react";

const GOOGLE_SHEETS_URL =
  process.env.NEXT_PUBLIC_SHEETS_WEBAPP_URL ||
  "https://script.google.com/macros/s/AKfycbxXMKjJ2u-PLwvpKbHjBF6LcsyK9Ky08QFHXfExGW8EmT2dLJRo1gz-_mbNmAmwI8FhIw/exec";

interface FormFields {
  name: string;
  email: string;
  phone: string;
  service: string;
  message: string;
  botcheck: boolean;
}

interface FormErrors {
  name: string;
  email: string;
  phone: string;
  service: string;
  message: string;
}

export default function ContactForm() {
  const [formData, setFormData] = useState<FormFields>({
    name: "",
    email: "",
    phone: "",
    service: "",
    message: "",
    botcheck: false,
  });

  const [errors, setErrors] = useState<FormErrors>({
    name: "",
    email: "",
    phone: "",
    service: "",
    message: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  // Refs for focusing first invalid element
  const nameRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const phoneRef = useRef<HTMLInputElement>(null);
  const serviceRef = useRef<HTMLSelectElement>(null);
  const messageRef = useRef<HTMLTextAreaElement>(null);

  // Handle Close Modal on Escape key
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape" && showSuccess) {
        setShowSuccess(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [showSuccess]);

  // Phone Formatter: (XXX) XXX-XXXX
  const formatPhone = (val: string) => {
    const clean = val.replace(/\D/g, "");
    const match = clean.match(/(\d{0,3})(\d{0,3})(\d{0,4})/);
    if (!match) return "";
    return !match[2]
      ? match[1]
      : "(" + match[1] + ") " + match[2] + (match[3] ? "-" + match[3] : "");
  };

  const validateField = (name: keyof FormErrors, value: string): string => {
    switch (name) {
      case "name":
        return value.trim().length >= 3
          ? ""
          : "El nombre debe tener al menos 3 caracteres.";
      case "email": {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return regex.test(value.trim())
          ? ""
          : "Por favor, ingrese un correo electrónico válido.";
      }
      case "phone": {
        const cleanPhone = value.replace(/\D/g, "");
        return cleanPhone.length === 10
          ? ""
          : "El teléfono debe contener exactamente 10 dígitos.";
      }
      case "service":
        return value ? "" : "Por favor, seleccione un tipo de servicio.";
      case "message":
        return value.trim().length >= 10
          ? ""
          : "El mensaje debe detallar al menos 10 caracteres.";
      default:
        return "";
    }
  };

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value, type } = e.target;
    let val = value;

    if (type === "checkbox") {
      const checked = (e.target as HTMLInputElement).checked;
      setFormData((prev) => ({ ...prev, [name]: checked }));
      return;
    }

    if (name === "phone") {
      val = formatPhone(value);
    }

    setFormData((prev) => ({ ...prev, [name]: val }));
    // Clear errors on change
    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const handleBlur = (
    e: React.FocusEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = e.target;
    const fieldName = name as keyof FormErrors;
    const errorMsg = validateField(fieldName, value);
    setErrors((prev) => ({ ...prev, [fieldName]: errorMsg }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (isSubmitting) return;

    // Validate all fields
    const newErrors: FormErrors = {
      name: validateField("name", formData.name),
      email: validateField("email", formData.email),
      phone: validateField("phone", formData.phone),
      service: validateField("service", formData.service),
      message: validateField("message", formData.message),
    };

    setErrors(newErrors);

    // Check if any error exists
    const hasErrors = Object.values(newErrors).some((err) => err !== "");

    if (hasErrors) {
      // Focus first field with error
      if (newErrors.name) nameRef.current?.focus();
      else if (newErrors.email) emailRef.current?.focus();
      else if (newErrors.phone) phoneRef.current?.focus();
      else if (newErrors.service) serviceRef.current?.focus();
      else if (newErrors.message) messageRef.current?.focus();
      return;
    }

    // Honeypot bot check
    if (formData.botcheck) {
      console.warn("Bot detected!");
      return;
    }

    setIsSubmitting(true);

    try {
      const phoneRaw = formData.phone.replace(/\D/g, "");

      const payload = {
        action: "add_lead",
        name: formData.name,
        email: formData.email,
        phone: phoneRaw,
        service: formData.service,
        message: formData.message,
      };

      const response = await fetch(GOOGLE_SHEETS_URL, {
        method: "POST",
        mode: "no-cors",
        headers: {
          "Content-Type": "text/plain",
        },
        body: JSON.stringify(payload),
      });

      // Con no-cors (Google Sheets), la respuesta es opaca (status 0).
      // Asumimos éxito si no entra al catch de error de red.
      setFormData({
        name: "",
        email: "",
        phone: "",
        service: "",
        message: "",
        botcheck: false,
      });
      setShowSuccess(true);
    } catch (error) {
      console.error(error);
      alert(
        "Error de red. Por favor, verifique su conexión a Internet o la configuración de su Google Sheets Apps Script."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <form
        onSubmit={handleSubmit}
        id="main-contact-form"
        className="contact-form scroll-reveal delay-1 active"
        noValidate
      >
        <input
          type="checkbox"
          name="botcheck"
          checked={formData.botcheck}
          onChange={handleChange}
          className="hidden"
          style={{ display: "none" }}
          tabIndex={-1}
          autoComplete="off"
        />

        <div className="form-group">
          <label htmlFor="form-name" className="sr-only">
            Nombre Completo
          </label>
          <input
            ref={nameRef}
            type="text"
            name="name"
            id="form-name"
            placeholder="Nombre Completo"
            value={formData.name}
            onChange={handleChange}
            onBlur={handleBlur}
            className={errors.name ? "invalid-field" : ""}
            aria-required="true"
            aria-invalid={errors.name ? "true" : "false"}
            aria-describedby="error-name"
            required
          />
          <span className="error-message" id="error-name">
            {errors.name}
          </span>
        </div>

        <div className="form-group">
          <label htmlFor="form-email" className="sr-only">
            Correo Electrónico
          </label>
          <input
            ref={emailRef}
            type="email"
            name="email"
            id="form-email"
            placeholder="Correo Electrónico"
            value={formData.email}
            onChange={handleChange}
            onBlur={handleBlur}
            className={errors.email ? "invalid-field" : ""}
            aria-required="true"
            aria-invalid={errors.email ? "true" : "false"}
            aria-describedby="error-email"
            required
          />
          <span className="error-message" id="error-email">
            {errors.email}
          </span>
        </div>

        <div className="form-group">
          <label htmlFor="form-phone" className="sr-only">
            Teléfono de Contacto (10 dígitos)
          </label>
          <input
            ref={phoneRef}
            type="tel"
            name="phone"
            id="form-phone"
            placeholder="Teléfono de Contacto (10 dígitos)"
            value={formData.phone}
            onChange={handleChange}
            onBlur={handleBlur}
            className={errors.phone ? "invalid-field" : ""}
            aria-required="true"
            aria-invalid={errors.phone ? "true" : "false"}
            aria-describedby="error-phone"
            required
          />
          <span className="error-message" id="error-phone">
            {errors.phone}
          </span>
        </div>

        <div className="form-group">
          <label htmlFor="form-service" className="sr-only">
            Tipo de Servicio Solicitado
          </label>
          <select
            ref={serviceRef}
            name="service"
            id="form-service"
            value={formData.service}
            onChange={handleChange}
            onBlur={handleBlur}
            className={errors.service ? "invalid-field" : ""}
            aria-required="true"
            aria-invalid={errors.service ? "true" : "false"}
            aria-describedby="error-service"
            required
          >
            <option value="" disabled>
              Tipo de Servicio Solicitado
            </option>
            <option value="Protección Personal">Protección Personal</option>
            <option value="Custodios De Bienes">Custodios De Bienes</option>
            <option value="Seguridad Intramuros">Seguridad Intramuros</option>
            <option value="Otro">Otro Esquema</option>
          </select>
          <span className="error-message" id="error-service">
            {errors.service}
          </span>
        </div>

        <div className="form-group">
          <label htmlFor="form-message" className="sr-only">
            Mensaje (Detalle de sus necesidades de seguridad)
          </label>
          <textarea
            ref={messageRef}
            name="message"
            id="form-message"
            rows={5}
            placeholder="Cuéntenos sobre sus necesidades de seguridad..."
            value={formData.message}
            onChange={handleChange}
            onBlur={handleBlur}
            className={errors.message ? "invalid-field" : ""}
            aria-required="true"
            aria-invalid={errors.message ? "true" : "false"}
            aria-describedby="error-message-text"
            required
          ></textarea>
          <span className="error-message" id="error-message-text">
            {errors.message}
          </span>
        </div>

        <button
          type="submit"
          id="btn-submit-form"
          className="btn-primary btn-block"
          disabled={isSubmitting}
        >
          <span>{isSubmitting ? "Enviando..." : "Enviar Mensaje"}</span>
          {isSubmitting && (
            <div
              className="spinner-form"
              style={{ display: "inline-block" }}
            ></div>
          )}
        </button>
      </form>

      {/* Confirmation Modal */}
      {showSuccess && (
        <div id="modal-success-form" className="modal-success active">
          <div className="modal-success-content">
            <div className="success-icon-box">
              <div className="success-icon-circle"></div>
              <i className="fa-solid fa-check success-check"></i>
            </div>
            <h2>¡Contacto Exitoso!</h2>
            <p>
              Su solicitud ha sido enviada con total confidencialidad. Un
              especialista en seguridad de <strong>Z&O</strong> le contactará a
              la brevedad.
            </p>
            <button onClick={() => setShowSuccess(false)} className="btn-primary">
              Entendido
            </button>
          </div>
        </div>
      )}
    </>
  );
}
