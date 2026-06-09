import type { Metadata } from "next";
import { Outfit } from "next/font/google";
import "./globals.css";
import MainLayoutWrapper from "@/components/MainLayoutWrapper";

// Load Outfit Google Font dynamically
const outfit = Outfit({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-outfit",
  display: "swap",
});

// Configure Global Metadata & Open Graph SEO
export const metadata: Metadata = {
  title: {
    default: "INTERNATIONAL PRIVATE SECURITY | Z&O S. DE R.L. C.V.",
    template: "%s | INTERNATIONAL PRIVATE SECURITY Z&O",
  },
  description: "Servicios de seguridad privada de élite. Protección personal, vigilancia, custodios y seguridad intramuros.",
  metadataBase: new URL("https://zosecurity.com"),
  openGraph: {
    title: "INTERNATIONAL PRIVATE SECURITY | Z&O S. DE R.L. C.V.",
    description: "Protección de élite para quienes exigen lo mejor. Vigilancia, escoltas, custodios y seguridad estratégica.",
    url: "https://zosecurity.com",
    siteName: "INTERNATIONAL PRIVATE SECURITY Z&O",
    images: [
      {
        url: "/assets/hero_security.webp",
        width: 1200,
        height: 630,
        alt: "Z&O Security Services",
      },
    ],
    locale: "es_MX",
    type: "website",
    },
  icons: {
    icon: "/assets/logo.png",
    shortcut: "/assets/logo.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className={`${outfit.variable}`}>
      <head>
        {/* Load FontAwesome Icons */}
        <link 
          rel="stylesheet" 
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css" 
          precedence="default"
        />
      </head>
      <body>
        <MainLayoutWrapper>
          <main>
            {children}
          </main>
        </MainLayoutWrapper>
      </body>
    </html>
  );
}
