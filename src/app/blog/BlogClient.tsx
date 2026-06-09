"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { blogPosts, BlogPost } from "@/data/blogData";
import FadeIn from "@/components/FadeIn";
import { motion, AnimatePresence } from "framer-motion";

interface BlogClientProps {
  initialPosts: BlogPost[];
}

export default function BlogClient({ initialPosts }: BlogClientProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>("Todos");

  // Get all unique categories
  const categories = ["Todos", ...Array.from(new Set(initialPosts.map((post) => post.category)))];

  // Filter posts
  const filteredPosts = selectedCategory === "Todos"
    ? initialPosts
    : initialPosts.filter((post) => post.category === selectedCategory);

  // Find featured post
  const featuredPost = initialPosts.find((post) => post.featured) || initialPosts[0];
  const regularPosts = filteredPosts.filter((post) => post.slug !== featuredPost.slug || selectedCategory !== "Todos");

  return (
    <>
      <section className="hero">
        <div className="hero-overlay"></div>
        <div className="container">
          <div className="hero-content">
            <h1 className="hero-h1 fade-in-up">
              Blog <span className="text-gold">Corporativo</span>
            </h1>
            <div className="hero-text-box fade-in-up delay-1">
              <p className="hero-description">
                Noticias, análisis técnicos y guías esenciales sobre seguridad privada, prevención industrial y cumplimiento legal en México.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="blog-section section-padding">
        <div className="container">
          {/* Categories Filter */}
          <FadeIn direction="up">
            <div className="blog-categories">
              {categories.map((category) => (
                <button
                  key={category}
                  className={`category-btn ${selectedCategory === category ? "active" : ""}`}
                  onClick={() => setSelectedCategory(category)}
                >
                  {category}
                </button>
              ))}
            </div>
          </FadeIn>

          {/* Featured Post */}
          {(selectedCategory === "Todos" || featuredPost.category === selectedCategory) && featuredPost ? (
            <FadeIn direction="up" delay={0.1}>
              <div className="featured-card">
                <div className="featured-image-wrapper">
                  <Image
                    src={featuredPost.image}
                    alt={featuredPost.title}
                    fill
                    sizes="(max-width: 992px) 100vw, 50vw"
                    priority
                    style={{ objectFit: "cover" }}
                    className="featured-image"
                  />
                  <span className="post-category-badge">{featuredPost.category}</span>
                </div>
                <div className="featured-content">
                  <span className="post-meta">
                    {featuredPost.date} &bull; {featuredPost.readTime}
                  </span>
                  <h2 className="featured-title">
                    <Link href={`/blog/${featuredPost.slug}`}>
                      {featuredPost.title}
                    </Link>
                  </h2>
                  <p className="featured-summary">{featuredPost.summary}</p>
                  <div className="featured-footer">
                    <span className="post-author">{featuredPost.author}</span>
                    <Link href={`/blog/${featuredPost.slug}`} className="btn-text">
                      Leer Artículo <i className="fas fa-arrow-right"></i>
                    </Link>
                  </div>
                </div>
              </div>
            </FadeIn>
          ) : null}

          {/* Regular Posts Grid */}
          <motion.div 
            layout 
            className="blog-grid" 
            style={{ marginTop: "3rem" }}
          >
            <AnimatePresence mode="popLayout">
              {regularPosts.map((post) => (
                <motion.article
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.3 }}
                  key={post.slug}
                  className="blog-card"
                >
                  <div className="blog-image-wrapper">
                    <Image
                      src={post.image}
                      alt={post.title}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      loading="lazy"
                      style={{ objectFit: "cover" }}
                      className="blog-image"
                    />
                    <span className="post-category-badge">{post.category}</span>
                  </div>
                  <div className="blog-card-content">
                    <span className="post-meta">
                      {post.date} &bull; {post.readTime}
                    </span>
                    <h3 className="blog-card-title">
                      <Link href={`/blog/${post.slug}`}>{post.title}</Link>
                    </h3>
                    <p className="blog-card-summary">{post.summary}</p>
                    <div className="blog-card-footer">
                      <Link href={`/blog/${post.slug}`} className="btn-text">
                        Leer Más <i className="fas fa-arrow-right"></i>
                      </Link>
                    </div>
                  </div>
                </motion.article>
              ))}
            </AnimatePresence>
          </motion.div>

          {filteredPosts.length === 0 && (
            <div className="no-posts">
              <p>No se encontraron artículos en esta categoría.</p>
            </div>
          )}
        </div>
      </section>
    </>
  );
}
