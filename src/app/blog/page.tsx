import React from "react";
import type { Metadata } from "next";
import BlogClient from "./BlogClient";
import { getBlogPosts } from "@/utils/sheets";
import { blogPosts } from "@/data/blogData";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Blog Corporativo y Guías de Seguridad",
  description: "Artículos técnicos, análisis periciales y guías operativas sobre seguridad privada intramuros, REPSE, cumplimiento de la STPS y custodia de bienes.",
};

export default async function BlogPage() {
  let posts = blogPosts;

  try {
    const data = await getBlogPosts();
    if (data && data.length > 0) {
      posts = data;
    }
  } catch (err) {
    console.error("Error fetching blog posts from Google Sheets, using static fallback:", err);
  }

  return <BlogClient initialPosts={posts} />;
}
