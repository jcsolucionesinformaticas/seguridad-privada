import React from "react";
import Link from "next/link";
import { getFaqs, getBlogPosts } from "@/utils/sheets";

export const revalidate = 0; // Force server-rendering for up-to-date stats

export default async function DashboardPage() {
  let postsCount = 0;
  let faqsCount = 0;
  let recentPosts: any[] = [];

  try {
    const posts = await getBlogPosts();
    const faqs = await getFaqs();
    
    postsCount = posts.length;
    faqsCount = faqs.length;
    recentPosts = posts.slice(0, 3);
  } catch (err) {
    console.error("Error loading dashboard stats:", err);
  }

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "30px" }}>
      {/* Welcome Section */}
      <div>
        <h1 style={{ fontSize: "2rem", fontWeight: 700, margin: 0 }}>
          Bienvenido al Panel de Control <span className="text-gold">Z&O</span>
        </h1>
        <p style={{ color: "var(--text-muted)", fontSize: "0.95rem", marginTop: "5px" }}>
          Administre el contenido y las configuraciones de su plataforma de seguridad.
        </p>
      </div>

      {/* Stats Cards */}
      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
        gap: "25px"
      }}>
        <div style={{
          background: "rgba(255, 255, 255, 0.02)",
          border: "1px solid rgba(255, 255, 255, 0.05)",
          borderRadius: "12px",
          padding: "25px",
          display: "flex",
          alignItems: "center",
          gap: "20px"
        }}>
          <div style={{
            width: "55px",
            height: "55px",
            borderRadius: "10px",
            background: "rgba(212, 175, 55, 0.1)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: "1.5rem"
          }}>
            <i className="fas fa-newspaper text-gold"></i>
          </div>
          <div>
            <span style={{ fontSize: "2rem", fontWeight: 700, display: "block", lineHeight: 1 }}>
              {postsCount ?? 0}
            </span>
            <span style={{ fontSize: "0.85rem", color: "var(--text-muted)" }}>Artículos de Blog</span>
          </div>
        </div>

        <div style={{
          background: "rgba(255, 255, 255, 0.02)",
          border: "1px solid rgba(255, 255, 255, 0.05)",
          borderRadius: "12px",
          padding: "25px",
          display: "flex",
          alignItems: "center",
          gap: "20px"
        }}>
          <div style={{
            width: "55px",
            height: "55px",
            borderRadius: "10px",
            background: "rgba(212, 175, 55, 0.1)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: "1.5rem"
          }}>
            <i className="fas fa-circle-question text-gold"></i>
          </div>
          <div>
            <span style={{ fontSize: "2rem", fontWeight: 700, display: "block", lineHeight: 1 }}>
              {faqsCount ?? 0}
            </span>
            <span style={{ fontSize: "0.85rem", color: "var(--text-muted)" }}>FAQs Publicadas</span>
          </div>
        </div>

        <div style={{
          background: "rgba(255, 255, 255, 0.02)",
          border: "1px solid rgba(255, 255, 255, 0.05)",
          borderRadius: "12px",
          padding: "25px",
          display: "flex",
          alignItems: "center",
          gap: "20px"
        }}>
          <div style={{
            width: "55px",
            height: "55px",
            borderRadius: "10px",
            background: "rgba(212, 175, 55, 0.1)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: "1.5rem"
          }}>
            <i className="fas fa-database text-gold"></i>
          </div>
          <div>
            <span style={{ fontSize: "1.1rem", fontWeight: 700, display: "block", color: "var(--accent-color)", textTransform: "uppercase" }}>
              Sheets
            </span>
            <span style={{ fontSize: "0.85rem", color: "var(--text-muted)" }}>Base de Datos</span>
          </div>
        </div>
      </div>

      {/* Main Grid: Recent posts and quick links */}
      <div style={{
        display: "grid",
        gridTemplateColumns: "2fr 1fr",
        gap: "30px"
      }}>
        {/* Recent Blog Posts */}
        <div style={{
          background: "rgba(255, 255, 255, 0.02)",
          border: "1px solid rgba(255, 255, 255, 0.05)",
          borderRadius: "12px",
          padding: "30px"
        }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px" }}>
            <h2 style={{ fontSize: "1.2rem", fontWeight: 700, margin: 0 }}>Últimos Artículos Publicados</h2>
            <Link href="/admin/blog" className="text-gold" style={{ fontSize: "0.85rem", fontWeight: 600 }}>
              Ver Todos &rarr;
            </Link>
          </div>

          {recentPosts && recentPosts.length > 0 ? (
            <div style={{ display: "flex", flexDirection: "column", gap: "15px" }}>
              {recentPosts.map((post) => (
                <div key={post.slug} style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  padding: "15px",
                  background: "rgba(255, 255, 255, 0.01)",
                  border: "1px solid rgba(255, 255, 255, 0.03)",
                  borderRadius: "8px"
                }}>
                  <div>
                    <h3 style={{ fontSize: "0.95rem", fontWeight: 600, margin: 0 }}>{post.title}</h3>
                    <span style={{ fontSize: "0.78rem", color: "var(--text-muted)" }}>{post.category}</span>
                  </div>
                  <span style={{ fontSize: "0.8rem", color: "var(--text-muted)" }}>{post.date}</span>
                </div>
              ))}
            </div>
          ) : (
            <div style={{
              textAlign: "center",
              padding: "40px 0",
              color: "var(--text-muted)",
              fontSize: "0.9rem"
            }}>
              No hay artículos registrados aún en la base de datos de Google Sheets.
            </div>
          )}
        </div>

        {/* Quick Links / Actions */}
        <div style={{
          background: "rgba(255, 255, 255, 0.02)",
          border: "1px solid rgba(255, 255, 255, 0.05)",
          borderRadius: "12px",
          padding: "30px",
          display: "flex",
          flexDirection: "column",
          gap: "20px"
        }}>
          <h2 style={{ fontSize: "1.2rem", fontWeight: 700, margin: 0, marginBottom: "5px" }}>Acciones Rápidas</h2>

          <Link href="/admin/blog" className="btn-primary" style={{
            padding: "12px 15px",
            fontSize: "0.85rem",
            textAlign: "center",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "8px"
          }}>
            <i className="fas fa-plus"></i> Crear Nuevo Artículo
          </Link>

          <Link href="/admin/faq" className="faq-quick-link">
            <i className="fas fa-circle-question"></i> Gestionar FAQs
          </Link>

          <div style={{
            marginTop: "10px",
            padding: "15px",
            background: "rgba(212, 175, 55, 0.02)",
            border: "1px dashed rgba(212, 175, 55, 0.2)",
            borderRadius: "8px",
            fontSize: "0.8rem",
            color: "var(--text-muted)",
            lineHeight: 1.5
          }}>
            <i className="fas fa-circle-info text-gold" style={{ marginRight: "6px" }}></i>
            Los mensajes recibidos en el formulario de contacto se siguen guardando directamente en la hoja de cálculo de Google Sheets.
          </div>
        </div>
      </div>

      <style>{`
        .faq-quick-link {
          padding: 12px 15px;
          font-size: 0.85rem;
          background: rgba(255, 255, 255, 0.03);
          border: 1px solid rgba(255, 255, 255, 0.05);
          border-radius: 5px;
          color: #fff;
          text-align: center;
          font-weight: 600;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          transition: var(--transition);
          text-decoration: none;
        }
        .faq-quick-link:hover {
          border-color: var(--accent-color) !important;
          color: var(--accent-color) !important;
          background: rgba(212, 175, 55, 0.02) !important;
        }
      `}</style>
    </div>
  );
}
