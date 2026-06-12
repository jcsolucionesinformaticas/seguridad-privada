"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";

interface AdminLayoutProps {
  children: React.ReactNode;
}

export default function AdminDashboardLayout({ children }: AdminLayoutProps) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [userEmail, setUserEmail] = useState<string | null>("admin@internationalprivatesecurityzyo.com.mx");
  const [userRole, setUserRole] = useState<string | null>("Administrador");
  const [loading, setLoading] = useState(false);
  
  const pathname = usePathname();
  const router = useRouter();

  const handleSignOut = async () => {
    try {
      await fetch("/api/admin/logout", { method: "POST" });
    } catch (err) {
      // ignore
    }
    router.push("/admin/login");
    router.refresh();
  };

  const navLinks = [
    { href: "/admin/dashboard", label: "Inicio Dashboard", icon: "fa-chart-pie" },
    { href: "/admin/blog", label: "Artículos Blog", icon: "fa-newspaper" },
    { href: "/admin/faq", label: "Preguntas Frecuentes", icon: "fa-circle-question" },
  ];

  if (loading) {
    return (
      <div style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "var(--primary-color)",
        color: "#fff"
      }}>
        <div style={{ textAlign: "center" }}>
          <i className="fas fa-spinner fa-spin" style={{ fontSize: "2.5rem", color: "var(--accent-color)", marginBottom: "15px" }}></i>
          <p>Cargando panel de control...</p>
        </div>
      </div>
    );
  }

  return (
    <div style={{ display: "flex", minHeight: "100vh", background: "var(--secondary-color)" }}>
      {/* Sidebar navigation */}
      <aside style={{
        width: isSidebarOpen ? "260px" : "80px",
        background: "var(--primary-color)",
        borderRight: "1px solid rgba(255, 255, 255, 0.05)",
        transition: "width 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
        display: "flex",
        flexDirection: "column",
        zIndex: 100,
        position: "relative"
      }}>
        {/* Sidebar Header */}
        <div style={{
          padding: "25px 20px",
          borderBottom: "1px solid rgba(255, 255, 255, 0.05)",
          display: "flex",
          alignItems: "center",
          gap: "12px",
          overflow: "hidden"
        }}>
          <div style={{
            width: "38px",
            height: "38px",
            borderRadius: "50%",
            overflow: "hidden",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexShrink: 0,
            background: "rgba(255, 255, 255, 0.05)",
            border: "1px solid rgba(212, 175, 55, 0.2)"
          }}>
            <Image 
              src="/assets/logo.webp" 
              alt="Logo Z&O" 
              width={38} 
              height={38} 
              style={{ objectFit: "contain" }}
            />
          </div>
          {isSidebarOpen && (
            <div style={{ display: "flex", flexDirection: "column", whiteSpace: "nowrap" }}>
              <span style={{ fontSize: "0.85rem", fontWeight: 700, color: "#fff", letterSpacing: "0.5px" }}>Z&O SECURITY</span>
              <span className="text-gold" style={{ fontSize: "0.68rem", fontWeight: 600 }}>PANEL CONTROL</span>
            </div>
          )}
        </div>

        {/* User Card */}
        {isSidebarOpen && (
          <div style={{
            padding: "20px",
            margin: "20px 15px",
            background: "rgba(255, 255, 255, 0.02)",
            borderRadius: "8px",
            border: "1px solid rgba(255, 255, 255, 0.04)"
          }}>
            <div style={{ fontSize: "0.85rem", fontWeight: 600, color: "#fff", textOverflow: "ellipsis", overflow: "hidden", whiteSpace: "nowrap" }}>
              {userEmail}
            </div>
            <div className="text-gold" style={{ fontSize: "0.75rem", fontWeight: 500, marginTop: "4px" }}>
              {userRole}
            </div>
          </div>
        )}

        {/* Navigation Links */}
        <nav style={{ flexGrow: 1, padding: "10px 15px" }}>
          <ul style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <li key={link.href}>
                  <Link href={link.href} style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "15px",
                    padding: "12px 15px",
                    borderRadius: "6px",
                    color: isActive ? "#000" : "var(--text-muted)",
                    background: isActive ? "var(--accent-gradient)" : "transparent",
                    fontWeight: isActive ? 600 : 500,
                    fontSize: "0.92rem",
                    transition: "var(--transition)",
                    textDecoration: "none"
                  }} onMouseEnter={(e) => {
                    if (!isActive) e.currentTarget.style.color = "#fff";
                  }} onMouseLeave={(e) => {
                    if (!isActive) e.currentTarget.style.color = "var(--text-muted)";
                  }}>
                    <i className={`fas ${link.icon}`} style={{ fontSize: "1.1rem", width: "20px", textAlign: "center" }}></i>
                    {isSidebarOpen && <span>{link.label}</span>}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* Sidebar Footer */}
        <div style={{
          padding: "20px 15px",
          borderTop: "1px solid rgba(255, 255, 255, 0.05)",
          display: "flex",
          flexDirection: "column",
          gap: "8px"
        }}>
          <Link href="/" style={{
            display: "flex",
            alignItems: "center",
            gap: "15px",
            padding: "12px 15px",
            borderRadius: "6px",
            color: "var(--text-muted)",
            fontSize: "0.92rem",
            textDecoration: "none",
            transition: "var(--transition)"
          }} onMouseEnter={(e) => e.currentTarget.style.color = "#fff"}
             onMouseLeave={(e) => e.currentTarget.style.color = "var(--text-muted)"}>
            <i className="fas fa-arrow-left-to-line" style={{ fontSize: "1.1rem", width: "20px", textAlign: "center" }}></i>
            {isSidebarOpen && <span>Ir a la Web</span>}
          </Link>

          <button onClick={handleSignOut} style={{
            display: "flex",
            alignItems: "center",
            gap: "15px",
            padding: "12px 15px",
            borderRadius: "6px",
            color: "#f87171",
            background: "none",
            border: "none",
            width: "100%",
            textAlign: "left",
            fontSize: "0.92rem",
            cursor: "pointer",
            transition: "var(--transition)"
          }} onMouseEnter={(e) => e.currentTarget.style.background = "rgba(239, 68, 68, 0.05)"}
             onMouseLeave={(e) => e.currentTarget.style.background = "none"}>
            <i className="fas fa-power-off" style={{ fontSize: "1.1rem", width: "20px", textAlign: "center" }}></i>
            {isSidebarOpen && <span>Cerrar Sesión</span>}
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <div style={{ flexGrow: 1, display: "flex", flexDirection: "column", minWidth: 0 }}>
        {/* Top Header */}
        <header style={{
          height: "80px",
          background: "var(--primary-color)",
          borderBottom: "1px solid rgba(255, 255, 255, 0.05)",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "0 30px",
          position: "static" /* Override default fixed header style for main site */
        }}>
          <button 
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            style={{
              background: "none",
              border: "none",
              color: "#fff",
              fontSize: "1.2rem",
              cursor: "pointer",
              padding: "5px"
            }}
            aria-label="Alternar menú lateral"
          >
            <i className="fas fa-bars"></i>
          </button>

          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <span style={{ fontSize: "0.85rem", color: "var(--text-muted)" }}>Servidor de Base de Datos:</span>
            <span style={{
              background: "rgba(212, 175, 55, 0.1)",
              color: "var(--accent-color)",
              padding: "4px 10px",
              borderRadius: "20px",
              fontSize: "0.75rem",
              fontWeight: 600,
              display: "inline-flex",
              alignItems: "center",
              gap: "6px"
            }}>
              <span style={{ width: "6px", height: "6px", borderRadius: "50%", background: "var(--accent-color)", display: "inline-block" }}></span>
              Google Sheets API
            </span>
          </div>
        </header>

        {/* Page Children */}
        <main style={{ flexGrow: 1, padding: "40px", overflowY: "auto" }}>
          {children}
        </main>
      </div>
    </div>
  );
}
