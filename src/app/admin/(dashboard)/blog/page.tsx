"use client";

import React, { useState, useEffect } from "react";

interface BlogPost {
  id: string;
  slug: string;
  title: string;
  summary: string;
  content: string[];
  category: string;
  author: string;
  image: string;
  featured: boolean;
  date: string;
  read_time: string;
}

export default function AdminBlogPage() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [isEditorMode, setIsEditorMode] = useState(false);
  
  // Form States
  const [editingId, setEditingId] = useState<string | null>(null);
  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");
  const [summary, setSummary] = useState("");
  const [category, setCategory] = useState("Seguridad Industrial");
  const [author, setAuthor] = useState("Ing. Carlos Mendoza - Director de Operaciones Z&O");
  const [image, setImage] = useState("/assets/service_5.webp");
  const [featured, setFeatured] = useState(false);
  const [date, setDate] = useState("");
  const [readTime, setReadTime] = useState("5 min de lectura");
  const [contentText, setContentText] = useState("");

  const fetchPosts = async () => {
    setLoading(true);
    try {
      const url = `${process.env.NEXT_PUBLIC_SHEETS_WEBAPP_URL}?action=get_blog_posts`;
      const res = await fetch(url, { cache: "no-store" });
      const json = await res.json();
      if (json.status === "success" && json.data) {
        const formatted = json.data.map((item: any) => ({
          id: item.ID,
          slug: item.Slug,
          title: item.Title,
          summary: item.Summary,
          content: Array.isArray(item.Content) ? item.Content : [],
          category: item.Category,
          author: item.Author,
          image: item.Image,
          featured: item.Featured === "true" || item.Featured === true,
          date: item.Date,
          read_time: item.ReadTime,
        }));
        setPosts(formatted);
      }
    } catch (err) {
      console.error("Error fetching blog posts:", err);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  // Auto slug generator from Title
  const handleTitleChange = (val: string) => {
    setTitle(val);
    if (!editingId) {
      const suggestedSlug = val
        .toLowerCase()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "") // remove accents
        .replace(/[^\w\s-]/g, "") // remove special chars
        .replace(/[\s_-]+/g, "-") // spaces to hyphens
        .replace(/^-+|-+$/g, "");
      setSlug(suggestedSlug);
    }
  };

  const formatDateSpanish = (d: Date) => {
    const months = [
      "Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio",
      "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"
    ];
    return `${d.getDate()} de ${months[d.getMonth()]}, ${d.getFullYear()}`;
  };

  const handleCreateNew = () => {
    setEditingId(null);
    setTitle("");
    setSlug("");
    setSummary("");
    setCategory("Seguridad Industrial");
    setAuthor("Ing. Carlos Mendoza - Director de Operaciones Z&O");
    setImage("/assets/service_5.webp");
    setFeatured(false);
    setDate(formatDateSpanish(new Date()));
    setReadTime("5 min de lectura");
    setContentText("");
    setIsEditorMode(true);
  };

  const handleEdit = (post: BlogPost) => {
    setEditingId(post.id);
    setTitle(post.title);
    setSlug(post.slug);
    setSummary(post.summary);
    setCategory(post.category);
    setAuthor(post.author);
    setImage(post.image);
    setFeatured(post.featured);
    setDate(post.date);
    setReadTime(post.read_time);
    setContentText(post.content.join("\n\n"));
    setIsEditorMode(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm("¿Está seguro de que desea eliminar este artículo del blog?")) return;

    try {
      const res = await fetch(`/api/admin/blog?id=${id}`, {
        method: "DELETE",
      });

      if (!res.ok) {
        const errJson = await res.json();
        throw new Error(errJson.error || "Failed to delete");
      }

      fetchPosts();
    } catch (err: any) {
      alert("Error al eliminar el artículo: " + err.message);
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !slug.trim() || !summary.trim() || !contentText.trim()) return;

    setSaving(true);
    
    // Split content text into paragraphs by double line breaks
    const paragraphs = contentText
      .split("\n\n")
      .map((p) => p.trim())
      .filter(Boolean);

    const payload = {
      id: editingId || undefined,
      title: title.trim(),
      slug: slug.trim(),
      summary: summary.trim(),
      category,
      author: author.trim(),
      image,
      featured,
      date: date.trim(),
      readTime: readTime.trim(),
      content: paragraphs
    };

    try {
      const res = await fetch("/api/admin/blog", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const errJson = await res.json();
        throw new Error(errJson.error || "Failed to save");
      }

      setIsEditorMode(false);
      fetchPosts();
    } catch (err: any) {
      alert("Error al guardar el artículo: " + err.message);
    } finally {
      setSaving(false);
    }
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "30px" }}>
      {/* Header */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <div>
          <h1 style={{ fontSize: "2rem", fontWeight: 700, margin: 0 }}>Artículos del Blog</h1>
          <p style={{ color: "var(--text-muted)", fontSize: "0.95rem", marginTop: "5px" }}>
            Administre las publicaciones, consejos de seguridad y noticias legales de la empresa.
          </p>
        </div>
        {!isEditorMode && (
          <button onClick={handleCreateNew} className="btn-primary" style={{ padding: "12px 20px", fontSize: "0.88rem", display: "flex", alignItems: "center", gap: "8px" }}>
            <i className="fas fa-plus"></i> Redactar Artículo
          </button>
        )}
      </div>

      {isEditorMode ? (
        /* Editor Mode Form */
        <div style={{
          background: "rgba(255, 255, 255, 0.02)",
          border: "1px solid rgba(255, 255, 255, 0.05)",
          borderRadius: "12px",
          padding: "35px"
        }}>
          <h2 style={{ fontSize: "1.25rem", fontWeight: 700, margin: 0, marginBottom: "25px" }} className="text-gold">
            {editingId ? "Editar Artículo" : "Escribir Nuevo Artículo"}
          </h2>

          <form onSubmit={handleSave} style={{ display: "flex", flexDirection: "column", gap: "25px" }}>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "25px" }}>
              <div>
                <label style={{ display: "block", fontSize: "0.8rem", fontWeight: 600, color: "var(--text-muted)", marginBottom: "8px", textTransform: "uppercase" }}>Título</label>
                <input
                  type="text"
                  required
                  placeholder="Ej. 5 Consejos de Seguridad perimetral"
                  value={title}
                  onChange={(e) => handleTitleChange(e.target.value)}
                  style={{ width: "100%", padding: "12px 15px", background: "rgba(255, 255, 255, 0.03)", border: "1px solid rgba(255, 255, 255, 0.08)", borderRadius: "6px", color: "#fff" }}
                  className="blog-input"
                />
              </div>

              <div>
                <label style={{ display: "block", fontSize: "0.8rem", fontWeight: 600, color: "var(--text-muted)", marginBottom: "8px", textTransform: "uppercase" }}>URL Slug (Auto-generado)</label>
                <input
                  type="text"
                  required
                  placeholder="ej-consejos-seguridad"
                  value={slug}
                  onChange={(e) => setSlug(e.target.value)}
                  style={{ width: "100%", padding: "12px 15px", background: "rgba(255, 255, 255, 0.03)", border: "1px solid rgba(255, 255, 255, 0.08)", borderRadius: "6px", color: "#fff" }}
                  className="blog-input"
                />
              </div>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "20px" }}>
              <div>
                <label style={{ display: "block", fontSize: "0.8rem", fontWeight: 600, color: "var(--text-muted)", marginBottom: "8px", textTransform: "uppercase" }}>Categoría</label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  style={{ width: "100%", padding: "12px 15px", background: "rgba(13, 27, 42, 0.98)", border: "1px solid rgba(255, 255, 255, 0.08)", borderRadius: "6px", color: "#fff", outline: "none" }}
                >
                  <option value="Seguridad Industrial">Seguridad Industrial</option>
                  <option value="Legalidad">Legalidad</option>
                  <option value="Logística">Logística</option>
                </select>
              </div>

              <div>
                <label style={{ display: "block", fontSize: "0.8rem", fontWeight: 600, color: "var(--text-muted)", marginBottom: "8px", textTransform: "uppercase" }}>Imagen Destacada</label>
                <select
                  value={image}
                  onChange={(e) => setImage(e.target.value)}
                  style={{ width: "100%", padding: "12px 15px", background: "rgba(13, 27, 42, 0.98)", border: "1px solid rgba(255, 255, 255, 0.08)", borderRadius: "6px", color: "#fff", outline: "none" }}
                >
                  <option value="/assets/service_5.webp">Seguridad Intramuros (Service 5)</option>
                  <option value="/assets/service_1.webp">Protección Personal (Service 1)</option>
                  <option value="/assets/service_4.webp">Custodios de Bienes (Service 4)</option>
                </select>
              </div>

              <div>
                <label style={{ display: "block", fontSize: "0.8rem", fontWeight: 600, color: "var(--text-muted)", marginBottom: "8px", textTransform: "uppercase" }}>Tiempo de Lectura</label>
                <input
                  type="text"
                  required
                  placeholder="5 min de lectura"
                  value={readTime}
                  onChange={(e) => setReadTime(e.target.value)}
                  style={{ width: "100%", padding: "12px 15px", background: "rgba(255, 255, 255, 0.03)", border: "1px solid rgba(255, 255, 255, 0.08)", borderRadius: "6px", color: "#fff" }}
                  className="blog-input"
                />
              </div>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr", gap: "25px" }}>
              <div>
                <label style={{ display: "block", fontSize: "0.8rem", fontWeight: 600, color: "var(--text-muted)", marginBottom: "8px", textTransform: "uppercase" }}>Autor</label>
                <input
                  type="text"
                  required
                  value={author}
                  onChange={(e) => setAuthor(e.target.value)}
                  style={{ width: "100%", padding: "12px 15px", background: "rgba(255, 255, 255, 0.03)", border: "1px solid rgba(255, 255, 255, 0.08)", borderRadius: "6px", color: "#fff" }}
                  className="blog-input"
                />
              </div>

              <div>
                <label style={{ display: "block", fontSize: "0.8rem", fontWeight: 600, color: "var(--text-muted)", marginBottom: "8px", textTransform: "uppercase" }}>Fecha Manual</label>
                <input
                  type="text"
                  required
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  style={{ width: "100%", padding: "12px 15px", background: "rgba(255, 255, 255, 0.03)", border: "1px solid rgba(255, 255, 255, 0.08)", borderRadius: "6px", color: "#fff" }}
                  className="blog-input"
                />
              </div>
            </div>

            <div>
              <label style={{ display: "block", fontSize: "0.8rem", fontWeight: 600, color: "var(--text-muted)", marginBottom: "8px", textTransform: "uppercase" }}>Resumen del Artículo (Para Cards)</label>
              <textarea
                required
                rows={2}
                placeholder="Breve resumen introductorio para captar el interés..."
                value={summary}
                onChange={(e) => setSummary(e.target.value)}
                style={{ width: "100%", padding: "12px 15px", background: "rgba(255, 255, 255, 0.03)", border: "1px solid rgba(255, 255, 255, 0.08)", borderRadius: "6px", color: "#fff", resize: "vertical" }}
                className="blog-input"
              />
            </div>

            <div>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "8px" }}>
                <label style={{ display: "block", fontSize: "0.8rem", fontWeight: 600, color: "var(--text-muted)", textTransform: "uppercase", margin: 0 }}>Cuerpo del Artículo</label>
                <span style={{ fontSize: "0.75rem", color: "var(--accent-color)" }}>💡 Separe los párrafos pulsando DOS veces la tecla Enter (dejando una línea en blanco)</span>
              </div>
              <textarea
                required
                rows={10}
                placeholder="Escriba aquí los párrafos del artículo..."
                value={contentText}
                onChange={(e) => setContentText(e.target.value)}
                style={{ width: "100%", padding: "15px", background: "rgba(255, 255, 255, 0.03)", border: "1px solid rgba(255, 255, 255, 0.08)", borderRadius: "6px", color: "#fff", resize: "vertical", lineHeight: 1.6 }}
                className="blog-input"
              />
            </div>

            <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
              <input
                type="checkbox"
                id="featured"
                checked={featured}
                onChange={(e) => setFeatured(e.target.checked)}
                style={{ width: "18px", height: "18px", accentColor: "var(--accent-color)", cursor: "pointer" }}
              />
              <label htmlFor="featured" style={{ fontSize: "0.9rem", color: "#fff", cursor: "pointer", fontWeight: 500 }}>
                Marcar como artículo **Destacado** (se mostrará en la cabecera principal del blog)
              </label>
            </div>

            {/* Actions buttons */}
            <div style={{ display: "flex", gap: "15px", borderTop: "1px solid rgba(255, 255, 255, 0.05)", paddingTop: "25px", marginTop: "10px" }}>
              <button
                type="submit"
                disabled={saving}
                className="btn-primary"
                style={{ padding: "12px 25px", fontSize: "0.88rem", display: "flex", alignItems: "center", gap: "8px", opacity: saving ? 0.75 : 1, cursor: saving ? "not-allowed" : "pointer" }}
              >
                {saving ? (
                  <>
                    <i className="fas fa-spinner fa-spin"></i> Guardando...
                  </>
                ) : (
                  <>
                    <i className="fas fa-paper-plane"></i> {editingId ? "Actualizar Artículo" : "Publicar Artículo"}
                  </>
                )}
              </button>
              <button
                type="button"
                onClick={() => setIsEditorMode(false)}
                style={{ padding: "12px 25px", fontSize: "0.88rem", background: "rgba(255, 255, 255, 0.03)", border: "1px solid rgba(255, 255, 255, 0.05)", borderRadius: "5px", color: "#fff", cursor: "pointer", transition: "var(--transition)" }}
                onMouseEnter={(e) => e.currentTarget.style.borderColor = "#f87171"}
                onMouseLeave={(e) => e.currentTarget.style.borderColor = "rgba(255, 255, 255, 0.05)"}
              >
                Cancelar
              </button>
            </div>
          </form>
        </div>
      ) : (
        /* Blog posts lists table */
        <div style={{
          background: "rgba(255, 255, 255, 0.02)",
          border: "1px solid rgba(255, 255, 255, 0.05)",
          borderRadius: "12px",
          padding: "30px",
          overflow: "hidden"
        }}>
          <h2 style={{ fontSize: "1.2rem", fontWeight: 700, margin: 0, marginBottom: "20px" }}>Listado de Artículos</h2>
          
          {loading ? (
            <div style={{ textAlign: "center", padding: "40px 0", color: "var(--text-muted)" }}>
              <i className="fas fa-spinner fa-spin" style={{ fontSize: "1.5rem", color: "var(--accent-color)", marginBottom: "10px" }}></i>
              <p>Consultando base de datos...</p>
            </div>
          ) : posts.length > 0 ? (
            <div style={{ overflowX: "auto" }}>
              <table style={{ width: "100%", borderCollapse: "collapse", textAlign: "left", fontSize: "0.95rem" }}>
                <thead>
                  <tr style={{ borderBottom: "1px solid rgba(255, 255, 255, 0.08)", color: "var(--text-muted)" }}>
                    <th style={{ padding: "12px 15px", fontWeight: 600 }}>Título</th>
                    <th style={{ padding: "12px 15px", fontWeight: 600 }}>Categoría</th>
                    <th style={{ padding: "12px 15px", fontWeight: 600 }}>Fecha</th>
                    <th style={{ padding: "12px 15px", fontWeight: 600 }}>Destacado</th>
                    <th style={{ padding: "12px 15px", fontWeight: 600, textAlign: "right" }}>Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {posts.map((post) => (
                    <tr key={post.id} style={{ borderBottom: "1px solid rgba(255, 255, 255, 0.03)", transition: "var(--transition)" }} onMouseEnter={(e) => e.currentTarget.style.background = "rgba(255, 255, 255, 0.01)"} onMouseLeave={(e) => e.currentTarget.style.background = "none"}>
                      <td style={{ padding: "15px 15px", fontWeight: 600 }}>{post.title}</td>
                      <td style={{ padding: "15px 15px", color: "var(--text-muted)" }}>{post.category}</td>
                      <td style={{ padding: "15px 15px", color: "var(--text-muted)" }}>{post.date}</td>
                      <td style={{ padding: "15px 15px" }}>
                        {post.featured ? (
                          <span style={{ background: "rgba(212, 175, 55, 0.15)", color: "var(--accent-color)", padding: "3px 10px", borderRadius: "20px", fontSize: "0.75rem", fontWeight: 700 }}>
                            Destacado
                          </span>
                        ) : (
                          <span style={{ color: "var(--text-muted)", fontSize: "0.85rem" }}>No</span>
                        )}
                      </td>
                      <td style={{ padding: "15px 15px", textAlign: "right" }}>
                        <div style={{ display: "flex", gap: "10px", justifyContent: "flex-end" }}>
                          <button
                            onClick={() => handleEdit(post)}
                            style={{ background: "rgba(255, 255, 255, 0.03)", border: "1px solid rgba(255, 255, 255, 0.05)", color: "var(--accent-color)", width: "32px", height: "32px", borderRadius: "4px", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", transition: "var(--transition)" }}
                            onMouseEnter={(e) => e.currentTarget.style.borderColor = "var(--accent-color)"}
                            onMouseLeave={(e) => e.currentTarget.style.borderColor = "rgba(255, 255, 255, 0.05)"}
                            title="Editar Artículo"
                          >
                            <i className="fas fa-pencil" style={{ fontSize: "0.8rem" }}></i>
                          </button>
                          <button
                            onClick={() => handleDelete(post.id)}
                            style={{ background: "rgba(239, 68, 68, 0.05)", border: "1px solid rgba(239, 68, 68, 0.1)", color: "#f87171", width: "32px", height: "32px", borderRadius: "4px", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", transition: "var(--transition)" }}
                            onMouseEnter={(e) => e.currentTarget.style.background = "rgba(239, 68, 68, 0.1)"}
                            onMouseLeave={(e) => e.currentTarget.style.background = "rgba(239, 68, 68, 0.05)"}
                            title="Eliminar Artículo"
                          >
                            <i className="fas fa-trash" style={{ fontSize: "0.8rem" }}></i>
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div style={{ textAlign: "center", padding: "40px 0", color: "var(--text-muted)", fontSize: "0.9rem" }}>
              No hay artículos de blog en la base de datos de Google Sheets. Use el botón de arriba para redactar su primer post.
            </div>
          )}
        </div>
      )}

      <style jsx global>{`
        .blog-input:focus {
          border-color: var(--accent-color) !important;
          background: rgba(212, 175, 55, 0.02) !important;
          box-shadow: 0 0 10px rgba(212, 175, 55, 0.1) !important;
        }
      `}</style>
    </div>
  );
}
