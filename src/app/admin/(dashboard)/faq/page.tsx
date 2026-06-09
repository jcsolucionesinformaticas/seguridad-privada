"use client";

import React, { useState, useEffect } from "react";

interface FAQItem {
  id: string;
  question: string;
  answer: string;
  order_num: number;
}

export default function AdminFAQPage() {
  const [faqs, setFaqs] = useState<FAQItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  
  // Form States
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [orderNum, setOrderNum] = useState("0");
  const [editingId, setEditingId] = useState<string | null>(null);

  const fetchFaqs = async () => {
    setLoading(true);
    try {
      const url = `${process.env.NEXT_PUBLIC_SHEETS_WEBAPP_URL}?action=get_faqs`;
      const res = await fetch(url, { cache: "no-store" });
      const json = await res.json();
      if (json.status === "success" && json.data) {
        const formatted = json.data.map((item: any) => ({
          id: item.ID,
          question: item.Question,
          answer: item.Answer,
          order_num: Number(item.OrderNum) || 0
        }));
        formatted.sort((a: any, b: any) => a.order_num - b.order_num);
        setFaqs(formatted);
      }
    } catch (err) {
      console.error("Error fetching FAQs:", err);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchFaqs();
  }, []);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!question.trim() || !answer.trim()) return;
    
    setSaving(true);
    const payload = {
      id: editingId || undefined,
      question: question.trim(),
      answer: answer.trim(),
      orderNum: parseInt(orderNum) || 0
    };

    try {
      const res = await fetch("/api/admin/faq", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const errJson = await res.json();
        throw new Error(errJson.error || "Failed to save");
      }
      
      resetForm();
      fetchFaqs();
    } catch (err: any) {
      alert("Error al guardar la FAQ: " + err.message);
    } finally {
      setSaving(false);
    }
  };

  const handleEdit = (faq: FAQItem) => {
    setEditingId(faq.id);
    setQuestion(faq.question);
    setAnswer(faq.answer);
    setOrderNum(faq.order_num.toString());
  };

  const handleDelete = async (id: string) => {
    if (!confirm("¿Está seguro de que desea eliminar esta pregunta frecuente?")) return;

    try {
      const res = await fetch(`/api/admin/faq?id=${id}`, {
        method: "DELETE",
      });

      if (!res.ok) {
        const errJson = await res.json();
        throw new Error(errJson.error || "Failed to delete");
      }

      if (editingId === id) resetForm();
      fetchFaqs();
    } catch (err: any) {
      alert("Error al eliminar la FAQ: " + err.message);
    }
  };

  const resetForm = () => {
    setEditingId(null);
    setQuestion("");
    setAnswer("");
    setOrderNum((faqs.length + 1).toString());
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "30px" }}>
      {/* Header */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <div>
          <h1 style={{ fontSize: "2rem", fontWeight: 700, margin: 0 }}>Preguntas Frecuentes (FAQs)</h1>
          <p style={{ color: "var(--text-muted)", fontSize: "0.95rem", marginTop: "5px" }}>
            Cree, modifique y ordene las preguntas frecuentes que se muestran en el sitio web de contacto.
          </p>
        </div>
      </div>

      <div style={{
        display: "grid",
        gridTemplateColumns: "1.2fr 1fr",
        gap: "35px",
        alignItems: "start"
      }}>
        {/* Left Side: FAQs List */}
        <div style={{
          background: "rgba(255, 255, 255, 0.02)",
          border: "1px solid rgba(255, 255, 255, 0.05)",
          borderRadius: "12px",
          padding: "30px"
        }}>
          <h2 style={{ fontSize: "1.2rem", fontWeight: 700, margin: 0, marginBottom: "20px" }}>
            Listado Activo
          </h2>

          {loading ? (
            <div style={{ textAlign: "center", padding: "40px 0", color: "var(--text-muted)" }}>
              <i className="fas fa-spinner fa-spin" style={{ fontSize: "1.5rem", color: "var(--accent-color)", marginBottom: "10px" }}></i>
              <p>Consultando base de datos...</p>
            </div>
          ) : faqs.length > 0 ? (
            <div style={{ display: "flex", flexDirection: "column", gap: "15px" }}>
              {faqs.map((faq) => (
                <div key={faq.id} style={{
                  padding: "20px",
                  background: "rgba(255, 255, 255, 0.01)",
                  border: "1px solid rgba(255, 255, 255, 0.03)",
                  borderRadius: "8px",
                  display: "flex",
                  justifyContent: "space-between",
                  gap: "15px"
                }}>
                  <div style={{ flexGrow: 1 }}>
                    <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "8px" }}>
                      <span className="text-gold" style={{ fontSize: "0.78rem", fontWeight: 600, background: "rgba(212, 175, 55, 0.1)", padding: "2px 8px", borderRadius: "10px" }}>
                        Orden: {faq.order_num}
                      </span>
                    </div>
                    <h3 style={{ fontSize: "1rem", fontWeight: 600, margin: 0, color: "#fff" }}>
                      {faq.question}
                    </h3>
                    <p style={{ color: "var(--text-muted)", fontSize: "0.88rem", marginTop: "8px", lineHeight: 1.5 }}>
                      {faq.answer}
                    </p>
                  </div>

                  <div style={{ display: "flex", flexDirection: "column", gap: "10px", flexShrink: 0 }}>
                    <button
                      onClick={() => handleEdit(faq)}
                      style={{
                        background: "rgba(255, 255, 255, 0.03)",
                        border: "1px solid rgba(255, 255, 255, 0.05)",
                        color: "var(--accent-color)",
                        width: "35px",
                        height: "35px",
                        borderRadius: "6px",
                        cursor: "pointer",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        transition: "var(--transition)"
                      }}
                      onMouseEnter={(e) => e.currentTarget.style.borderColor = "var(--accent-color)"}
                      onMouseLeave={(e) => e.currentTarget.style.borderColor = "rgba(255, 255, 255, 0.05)"}
                      title="Editar Pregunta"
                    >
                      <i className="fas fa-pencil" style={{ fontSize: "0.85rem" }}></i>
                    </button>
                    <button
                      onClick={() => handleDelete(faq.id)}
                      style={{
                        background: "rgba(239, 68, 68, 0.05)",
                        border: "1px solid rgba(239, 68, 68, 0.1)",
                        color: "#f87171",
                        width: "35px",
                        height: "35px",
                        borderRadius: "6px",
                        cursor: "pointer",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        transition: "var(--transition)"
                      }}
                      onMouseEnter={(e) => e.currentTarget.style.background = "rgba(239, 68, 68, 0.1)"}
                      onMouseLeave={(e) => e.currentTarget.style.background = "rgba(239, 68, 68, 0.05)"}
                      title="Eliminar Pregunta"
                    >
                      <i className="fas fa-trash" style={{ fontSize: "0.85rem" }}></i>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div style={{ textAlign: "center", padding: "40px 0", color: "var(--text-muted)", fontSize: "0.9rem" }}>
              No hay preguntas frecuentes registradas. Use el formulario de la derecha para agregar la primera.
            </div>
          )}
        </div>

        {/* Right Side: Form (Add/Edit) */}
        <div style={{
          background: "rgba(255, 255, 255, 0.02)",
          border: "1px solid rgba(255, 255, 255, 0.05)",
          borderRadius: "12px",
          padding: "30px",
          position: "sticky",
          top: "30px"
        }}>
          <h2 style={{ fontSize: "1.2rem", fontWeight: 700, margin: 0, marginBottom: "20px" }}>
            {editingId ? "Modificar Pregunta" : "Nueva Pregunta"}
          </h2>

          <form onSubmit={handleSave} style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
            <div>
              <label htmlFor="question" style={{
                display: "block",
                fontSize: "0.8rem",
                fontWeight: 600,
                textTransform: "uppercase",
                letterSpacing: "1px",
                color: "var(--text-muted)",
                marginBottom: "8px"
              }}>
                Pregunta (Español)
              </label>
              <input
                type="text"
                id="question"
                required
                placeholder="¿REPSE o licencias con las que cuenta la empresa?"
                value={question}
                onChange={(e) => setQuestion(e.target.value)}
                style={{
                  width: "100%",
                  padding: "12px 15px",
                  background: "rgba(255, 255, 255, 0.03)",
                  border: "1px solid rgba(255, 255, 255, 0.08)",
                  borderRadius: "6px",
                  color: "#fff",
                  fontSize: "0.95rem",
                  outline: "none"
                }}
                className="faq-input"
              />
            </div>

            <div>
              <label htmlFor="answer" style={{
                display: "block",
                fontSize: "0.8rem",
                fontWeight: 600,
                textTransform: "uppercase",
                letterSpacing: "1px",
                color: "var(--text-muted)",
                marginBottom: "8px"
              }}>
                Respuesta Detallada
              </label>
              <textarea
                id="answer"
                required
                rows={5}
                placeholder="Escriba aquí la respuesta legal u operativa..."
                value={answer}
                onChange={(e) => setAnswer(e.target.value)}
                style={{
                  width: "100%",
                  padding: "12px 15px",
                  background: "rgba(255, 255, 255, 0.03)",
                  border: "1px solid rgba(255, 255, 255, 0.08)",
                  borderRadius: "6px",
                  color: "#fff",
                  fontSize: "0.95rem",
                  outline: "none",
                  resize: "vertical",
                  lineHeight: 1.5
                }}
                className="faq-input"
              />
            </div>

            <div>
              <label htmlFor="orderNum" style={{
                display: "block",
                fontSize: "0.8rem",
                fontWeight: 600,
                textTransform: "uppercase",
                letterSpacing: "1px",
                color: "var(--text-muted)",
                marginBottom: "8px"
              }}>
                Orden de Visualización (Númerico)
              </label>
              <input
                type="number"
                id="orderNum"
                required
                min={0}
                placeholder="1"
                value={orderNum}
                onChange={(e) => setOrderNum(e.target.value)}
                style={{
                  width: "100%",
                  padding: "12px 15px",
                  background: "rgba(255, 255, 255, 0.03)",
                  border: "1px solid rgba(255, 255, 255, 0.08)",
                  borderRadius: "6px",
                  color: "#fff",
                  fontSize: "0.95rem",
                  outline: "none"
                }}
                className="faq-input"
              />
            </div>

            <div style={{ display: "flex", gap: "15px", marginTop: "10px" }}>
              <button
                type="submit"
                disabled={saving}
                className="btn-primary"
                style={{
                  flexGrow: 1,
                  padding: "12px 20px",
                  fontSize: "0.88rem",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "8px",
                  opacity: saving ? 0.75 : 1,
                  cursor: saving ? "not-allowed" : "pointer"
                }}
              >
                {saving ? (
                  <>
                    <i className="fas fa-spinner fa-spin"></i>
                    Guardando...
                  </>
                ) : (
                  <>
                    <i className="fas fa-save"></i>
                    {editingId ? "Actualizar Pregunta" : "Publicar Pregunta"}
                  </>
                )}
              </button>

              {editingId && (
                <button
                  type="button"
                  onClick={resetForm}
                  style={{
                    padding: "12px 20px",
                    fontSize: "0.88rem",
                    background: "rgba(255, 255, 255, 0.03)",
                    border: "1px solid rgba(255, 255, 255, 0.05)",
                    borderRadius: "5px",
                    color: "#fff",
                    cursor: "pointer",
                    transition: "var(--transition)"
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.borderColor = "#f87171"}
                  onMouseLeave={(e) => e.currentTarget.style.borderColor = "rgba(255, 255, 255, 0.05)"}
                >
                  Cancelar
                </button>
              )}
            </div>
          </form>
        </div>
      </div>

      <style jsx global>{`
        .faq-input:focus {
          border-color: var(--accent-color) !important;
          background: rgba(212, 175, 55, 0.02) !important;
          box-shadow: 0 0 10px rgba(212, 175, 55, 0.1) !important;
        }
      `}</style>
    </div>
  );
}
