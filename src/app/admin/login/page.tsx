"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";

export default function AdminLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg("");

    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      if (!res.ok) {
        const json = await res.json();
        setErrorMsg(json.message || "Correo o contraseña incorrectos. Verifique sus credenciales.");
        setLoading(false);
      } else {
        router.push("/admin/dashboard");
        router.refresh();
      }
    } catch (err: any) {
      setErrorMsg("Ocurrió un error inesperado al intentar iniciar sesión.");
      setLoading(false);
    }
  };

  return (
    <div className="admin-login-layout" style={{
      minHeight: "100vh",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      background: "radial-gradient(circle at center, var(--primary-color) 0%, var(--secondary-color) 100%)",
      padding: "20px",
      position: "relative",
      overflow: "hidden"
    }}>
      {/* Decorative Blur Spheres */}
      <div style={{
        position: "absolute",
        width: "300px",
        height: "300px",
        background: "rgba(212, 175, 55, 0.04)",
        borderRadius: "50%",
        filter: "blur(80px)",
        top: "10%",
        left: "15%",
        pointerEvents: "none"
      }}></div>
      <div style={{
        position: "absolute",
        width: "400px",
        height: "400px",
        background: "rgba(13, 27, 42, 0.4)",
        borderRadius: "50%",
        filter: "blur(100px)",
        bottom: "10%",
        right: "10%",
        pointerEvents: "none"
      }}></div>

      <div className="login-card" style={{
        width: "100%",
        maxWidth: "420px",
        background: "rgba(255, 255, 255, 0.02)",
        backdropFilter: "blur(15px)",
        WebkitBackdropFilter: "blur(15px)",
        border: "1px solid rgba(255, 255, 255, 0.05)",
        borderRadius: "16px",
        padding: "40px",
        boxShadow: "0 25px 50px rgba(0, 0, 0, 0.4), 0 0 1px rgba(255, 255, 255, 0.1)",
        zIndex: 5
      }}>
        {/* Header/Logo */}
        <div style={{ textAlign: "center", marginBottom: "30px" }}>
          <div style={{
            display: "inline-flex",
            alignItems: "center",
            justifyContent: "center",
            width: "65px",
            height: "65px",
            borderRadius: "50%",
            background: "var(--accent-gradient)",
            boxShadow: "var(--gold-glow)",
            marginBottom: "15px"
          }}>
            <i className="fas fa-shield-halved" style={{ fontSize: "1.8rem", color: "#000" }}></i>
          </div>
          <h1 style={{ fontSize: "1.6rem", fontWeight: 700, margin: 0, letterSpacing: "0.5px" }}>
            Mesa de Control <span className="text-gold">Z&O</span>
          </h1>
          <p style={{ color: "var(--text-muted)", fontSize: "0.85rem", marginTop: "5px" }}>
            Ingrese para administrar blog, vacantes y FAQs
          </p>
        </div>

        {/* Error Alert Box */}
        {errorMsg && (
          <div style={{
            background: "rgba(239, 68, 68, 0.1)",
            borderLeft: "3px solid #ef4444",
            padding: "12px 15px",
            borderRadius: "4px",
            marginBottom: "20px",
            fontSize: "0.85rem",
            color: "#f87171"
          }}>
            <i className="fas fa-circle-exclamation" style={{ marginRight: "8px" }}></i>
            {errorMsg}
          </div>
        )}

        {/* Login Form */}
        <form onSubmit={handleLogin}>
          <div style={{ marginBottom: "20px" }}>
            <label htmlFor="email" style={{
              display: "block",
              fontSize: "0.82rem",
              fontWeight: 600,
              textTransform: "uppercase",
              letterSpacing: "1px",
              color: "var(--text-muted)",
              marginBottom: "8px"
            }}>
              Correo Electrónico
            </label>
            <div style={{ position: "relative" }}>
              <i className="fas fa-envelope" style={{
                position: "absolute",
                left: "15px",
                top: "50%",
                transform: "translateY(-50%)",
                color: "rgba(255, 255, 255, 0.3)",
                fontSize: "0.95rem"
              }}></i>
              <input
                type="email"
                id="email"
                required
                placeholder="usuario@internationalprivatesecurityzyo.com.mx"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                style={{
                  width: "100%",
                  padding: "12px 15px 12px 42px",
                  background: "rgba(255, 255, 255, 0.03)",
                  border: "1px solid rgba(255, 255, 255, 0.08)",
                  borderRadius: "6px",
                  color: "#fff",
                  fontSize: "0.95rem",
                  transition: "var(--transition)",
                  outline: "none"
                }}
                className="login-input"
              />
            </div>
          </div>

          <div style={{ marginBottom: "25px" }}>
            <label htmlFor="password" style={{
              display: "block",
              fontSize: "0.82rem",
              fontWeight: 600,
              textTransform: "uppercase",
              letterSpacing: "1px",
              color: "var(--text-muted)",
              marginBottom: "8px"
            }}>
              Contraseña
            </label>
            <div style={{ position: "relative" }}>
              <i className="fas fa-lock" style={{
                position: "absolute",
                left: "15px",
                top: "50%",
                transform: "translateY(-50%)",
                color: "rgba(255, 255, 255, 0.3)",
                fontSize: "0.95rem"
              }}></i>
              <input
                type="password"
                id="password"
                required
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                style={{
                  width: "100%",
                  padding: "12px 15px 12px 42px",
                  background: "rgba(255, 255, 255, 0.03)",
                  border: "1px solid rgba(255, 255, 255, 0.08)",
                  borderRadius: "6px",
                  color: "#fff",
                  fontSize: "0.95rem",
                  transition: "var(--transition)",
                  outline: "none"
                }}
                className="login-input"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="btn-primary"
            style={{
              width: "100%",
              padding: "14px",
              fontSize: "0.95rem",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "10px",
              opacity: loading ? 0.75 : 1,
              cursor: loading ? "not-allowed" : "pointer"
            }}
          >
            {loading ? (
              <>
                <i className="fas fa-spinner fa-spin" style={{ fontSize: "1.1rem" }}></i>
                Validando acceso...
              </>
            ) : (
              <>
                Ingresar
                <i className="fas fa-sign-in-alt"></i>
              </>
            )}
          </button>
        </form>

        <div style={{ textAlign: "center", marginTop: "25px" }}>
          <Link href="/" style={{
            fontSize: "0.85rem",
            color: "var(--text-muted)",
            transition: "var(--transition)",
            display: "inline-flex",
            alignItems: "center",
            gap: "5px"
          }} onMouseEnter={(e) => e.currentTarget.style.color = "var(--accent-color)"}
             onMouseLeave={(e) => e.currentTarget.style.color = "var(--text-muted)"}>
            <i className="fas fa-arrow-left" style={{ fontSize: "0.75rem" }}></i> Volver al sitio principal
          </Link>
        </div>
      </div>

      <style jsx global>{`
        .login-input:focus {
          border-color: var(--accent-color) !important;
          background: rgba(212, 175, 55, 0.02) !important;
          box-shadow: 0 0 10px rgba(212, 175, 55, 0.1) !important;
        }
      `}</style>
    </div>
  );
}
