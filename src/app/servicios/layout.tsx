import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Servicios',
  description: 'Servicios de seguridad privada de élite. Protección personal, vigilancia, custodios y seguridad intramuros.',
};

export default function ServiciosLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
