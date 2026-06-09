"use client";

import React from "react";
import { usePathname } from "next/navigation";
import Header from "./Header";
import Footer from "./Footer";
import WhatsAppButton from "./WhatsAppButton";

interface MainLayoutWrapperProps {
  children: React.ReactNode;
}

export default function MainLayoutWrapper({ children }: MainLayoutWrapperProps) {
  const pathname = usePathname();
  
  // Detect if the current route is part of the admin panel or an API endpoint
  const isAdminRoute = pathname.startsWith("/admin") || pathname.startsWith("/api");

  if (isAdminRoute) {
    // Return children directly for admin panel, bypassing main site header/footer/floats
    return <>{children}</>;
  }

  return (
    <>
      <Header />
      {children}
      <Footer />
      <WhatsAppButton />
    </>
  );
}
