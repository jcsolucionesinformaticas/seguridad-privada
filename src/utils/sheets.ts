import { BlogPost } from "@/data/blogData";

export interface FAQItem {
  id?: string;
  question: string;
  answer: string;
  orderNum?: number;
}

// Google Sheets API WebApp URL and Secret from environment
const WEBAPP_URL = process.env.NEXT_PUBLIC_SHEETS_WEBAPP_URL || "";
const API_SECRET = process.env.SHEETS_API_SECRET || "una_clave_secreta_muy_segura";

export async function getFaqs(): Promise<FAQItem[]> {
  if (!WEBAPP_URL) {
    throw new Error("NEXT_PUBLIC_SHEETS_WEBAPP_URL is not configured.");
  }
  
  const res = await fetch(`${WEBAPP_URL}?action=get_faqs`, {
    cache: "no-store",
  });
  if (!res.ok) throw new Error("Failed to fetch FAQs from sheets.");
  
  const contentType = res.headers.get("content-type") || "";
  if (!contentType.includes("application/json")) {
    throw new Error("La respuesta de Google Sheets no es JSON válido. Verifica la implementación del script y los permisos en Google Apps Script.");
  }
  
  const json = await res.json();
  if (json.status === "error") throw new Error(json.message);
  
  return (json.data || []).map((item: any) => ({
    id: item.ID,
    question: item.Question,
    answer: item.Answer,
    orderNum: Number(item.OrderNum) || 0,
  }));
}

export async function getBlogPosts(): Promise<BlogPost[]> {
  if (!WEBAPP_URL) {
    throw new Error("NEXT_PUBLIC_SHEETS_WEBAPP_URL is not configured.");
  }
  
  const res = await fetch(`${WEBAPP_URL}?action=get_blog_posts`, {
    cache: "no-store",
  });
  if (!res.ok) throw new Error("Failed to fetch BlogPosts from sheets.");
  
  const contentType = res.headers.get("content-type") || "";
  if (!contentType.includes("application/json")) {
    throw new Error("La respuesta de Google Sheets no es JSON válido. Verifica la implementación del script y los permisos en Google Apps Script.");
  }
  
  const json = await res.json();
  if (json.status === "error") throw new Error(json.message);
  
  return (json.data || []).map((item: any) => ({
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
    readTime: item.ReadTime,
  }));
}

export async function getBlogPostBySlug(slug: string): Promise<BlogPost | null> {
  const posts = await getBlogPosts();
  return posts.find((p) => p.slug === slug) || null;
}

export async function saveFaq(faq: { id?: string; question: string; answer: string; orderNum: number }) {
  if (!WEBAPP_URL) throw new Error("NEXT_PUBLIC_SHEETS_WEBAPP_URL is not configured.");
  
  const payload = {
    action: faq.id ? "update_faq" : "add_faq",
    secret: API_SECRET,
    id: faq.id,
    question: faq.question,
    answer: faq.answer,
    orderNum: faq.orderNum,
  };
  
  const res = await fetch(WEBAPP_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  
  if (!res.ok) throw new Error("Failed to save FAQ in sheets.");
  const json = await res.json();
  if (json.status === "error") throw new Error(json.message);
  return json.data;
}

export async function deleteFaq(id: string) {
  if (!WEBAPP_URL) throw new Error("NEXT_PUBLIC_SHEETS_WEBAPP_URL is not configured.");
  
  const payload = {
    action: "delete_faq",
    secret: API_SECRET,
    id: id,
  };
  
  const res = await fetch(WEBAPP_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  
  if (!res.ok) throw new Error("Failed to delete FAQ from sheets.");
  const json = await res.json();
  if (json.status === "error") throw new Error(json.message);
  return json.data;
}

export async function saveBlogPost(post: {
  id?: string;
  slug: string;
  title: string;
  summary: string;
  content: string[];
  category: string;
  author: string;
  image: string;
  featured: boolean;
  date: string;
  readTime: string;
}) {
  if (!WEBAPP_URL) throw new Error("NEXT_PUBLIC_SHEETS_WEBAPP_URL is not configured.");
  
  const payload = {
    action: post.id ? "update_blog_post" : "add_blog_post",
    secret: API_SECRET,
    id: post.id,
    slug: post.slug,
    title: post.title,
    summary: post.summary,
    content: post.content,
    category: post.category,
    author: post.author,
    image: post.image,
    featured: post.featured,
    date: post.date,
    readTime: post.readTime,
  };
  
  const res = await fetch(WEBAPP_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  
  if (!res.ok) throw new Error("Failed to save Blog Post in sheets.");
  const json = await res.json();
  if (json.status === "error") throw new Error(json.message);
  return json.data;
}

export async function deleteBlogPost(id: string) {
  if (!WEBAPP_URL) throw new Error("NEXT_PUBLIC_SHEETS_WEBAPP_URL is not configured.");
  
  const payload = {
    action: "delete_blog_post",
    secret: API_SECRET,
    id: id,
  };
  
  const res = await fetch(WEBAPP_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  
  if (!res.ok) throw new Error("Failed to delete Blog Post from sheets.");
  const json = await res.json();
  if (json.status === "error") throw new Error(json.message);
  return json.data;
}
