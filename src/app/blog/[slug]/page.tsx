import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { blogPosts } from "@/data/blogData";
import type { BlogPost as BlogPostType } from "@/data/blogData";
import FadeIn from "@/components/FadeIn";
import ReadingProgressBar from "@/components/ReadingProgressBar";
import { getBlogPostBySlug, getBlogPosts } from "@/utils/sheets";

export const dynamic = "force-dynamic";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return blogPosts.map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  let post = null;

  try {
    post = await getBlogPostBySlug(slug);
  } catch (err) {
    // Ignore
  }

  if (!post) {
    post = blogPosts.find((p) => p.slug === slug);
  }

  return {
    title: post ? `${post.title} | Z&O Security` : "Artículo no encontrado | Z&O Security",
    description: post ? post.summary : "Artículo del blog corporativo de seguridad privada.",
  };
}

export default async function BlogPost({ params }: PageProps) {
  const { slug } = await params;
  let post: BlogPostType | null | undefined = null;

  try {
    post = await getBlogPostBySlug(slug);
  } catch (err) {
    // Ignore
  }

  if (!post) {
    post = blogPosts.find((p) => p.slug === slug);
  }

  if (!post) {
    notFound();
  }

  // Get 2 related posts
  let relatedPosts: BlogPostType[] = [];
  try {
    const allPosts = await getBlogPosts();
    relatedPosts = allPosts
      .filter((p) => p.slug !== slug)
      .slice(0, 2);
  } catch (err) {
    // Ignore
  }

  if (relatedPosts.length === 0) {
    relatedPosts = blogPosts
      .filter((p) => p.slug !== slug)
      .slice(0, 2);
  }

  return (
    <>
      <ReadingProgressBar />
      {/* Short Sub-Hero header for reading context - now matching the 100vh unified design */}
      <section className="hero">
        <div className="hero-overlay"></div>
        <div className="container">
          <div className="hero-content">
            <span className="post-category-badge detail-badge" style={{ position: 'relative', top: 0, left: 0, display: 'inline-block', marginBottom: '20px' }}>
              {post.category}
            </span>
            <h1 className="hero-h1 fade-in-up blog-post-title">
              {post.title}
            </h1>
            <div className="hero-text-box fade-in-up delay-1" style={{ borderLeftColor: 'var(--accent-color)' }}>
              <div className="detail-meta" style={{ display: 'flex', flexWrap: 'wrap', gap: '15px', fontSize: '1rem', color: '#fff', fontWeight: 500 }}>
                <span>{post.date}</span>
                <span className="meta-separator" style={{ color: 'var(--accent-color)' }}>&bull;</span>
                <span>{post.readTime}</span>
                <span className="meta-separator" style={{ color: 'var(--accent-color)' }}>&bull;</span>
                <span>Por {post.author.split(" - ")[0]}</span>
              </div>
            </div>
          </div>
        </div>
        <a href="#article-start" className="scroll-indicator fade-in delay-2">
          <span className="scroll-mouse">
            <span className="scroll-wheel"></span>
          </span>
          <span className="scroll-text">Leer Artículo</span>
          <span className="scroll-arrow"></span>
        </a>
      </section>

      <section id="article-start" className="blog-detail-section section-padding">
        <div className="container">
          <div className="blog-detail-layout">
            {/* Main Content Column */}
            <main className="blog-detail-main">
              <Link href="/blog" className="back-to-blog">
                <i className="fas fa-arrow-left"></i> Volver al Blog
              </Link>

              {/* Main Post Image */}
              <div className="detail-image-container">
                <Image
                  src={post.image}
                  alt={post.title}
                  fill
                  priority
                  style={{ objectFit: "cover" }}
                  className="detail-main-image"
                />
              </div>

              {/* Post Content */}
              <article className="post-article">
                {post.content.map((paragraph, index) => {
                  // Check if paragraph is a bullet list or key point
                  if (paragraph.match(/^\d\./)) {
                    const [number, ...textParts] = paragraph.split(" ");
                    const restOfText = textParts.join(" ");
                    return (
                      <div key={index} className="post-key-point">
                        <span className="key-point-num text-gold">{number}</span>
                        <p className="key-point-text"><strong>{restOfText.split(":")[0]}:</strong>{restOfText.split(":")[1] || ""}</p>
                      </div>
                    );
                  }
                  return <p key={index}>{paragraph}</p>;
                })}
              </article>

              {/* Dynamic CTA box at end of reading */}
              <div className="post-cta-box">
                <div className="cta-icon">
                  <i className="fas fa-shield-halved text-gold"></i>
                </div>
                <div className="cta-info">
                  <h3>¿Su patrimonio industrial o logístico está protegido?</h3>
                  <p>
                    Nuestros especialistas pueden realizar una auditoría de riesgos completa sin costo para su empresa o corporativo.
                  </p>
                  <Link href="/contacto" className="btn-primary">
                    Agendar Evaluación de Riesgos
                  </Link>
                </div>
              </div>
            </main>

            {/* Sidebar Column */}
            <aside className="blog-detail-sidebar">
              {/* Author Widget */}
              <div className="sidebar-widget author-widget">
                <h3>Autor</h3>
                <div className="author-card">
                  <div className="author-avatar">
                    <i className="fas fa-user-tie text-gold"></i>
                  </div>
                  <div className="author-details">
                    <h4>{post.author.split(" - ")[0]}</h4>
                    <span className="author-role">{post.author.split(" - ")[1]}</span>
                  </div>
                </div>
                <p className="author-bio">
                  Especialista certificado con más de 15 años de trayectoria en dirección estratégica, seguridad patrimonial e implantación de planes de mitigación de pérdidas.
                </p>
              </div>

              {/* Related Posts Widget */}
              <div className="sidebar-widget related-widget">
                <h3>Artículos Relacionados</h3>
                <div className="related-list">
                  {relatedPosts.map((related) => (
                    <Link href={`/blog/${related.slug}`} key={related.slug} className="related-item">
                      <div className="related-img-wrapper">
                        <Image
                          src={related.image}
                          alt={related.title}
                          fill
                          sizes="100px"
                          style={{ objectFit: "cover" }}
                        />
                      </div>
                      <div className="related-item-info">
                        <h4>{related.title}</h4>
                        <span>{related.date}</span>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>

              {/* Contact Card Widget */}
              <div className="sidebar-widget contact-widget">
                <i className="fas fa-phone-volume text-gold widget-phone-icon"></i>
                <h3>Atención Inmediata</h3>
                <p>Comuníquese directamente con nuestra mesa de control y operaciones.</p>
                <a href="tel:+525548638428" className="sidebar-phone-btn">
                  +52 55 4863 8428
                </a>
              </div>
            </aside>
          </div>
        </div>
      </section>
    </>
  );
}
