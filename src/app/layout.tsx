import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "OpenBusiness - Gestão simples para seu negócio",
  description:
    "Plataforma open-source de Backend as a Service construida com Next.js, TypeScript e shadcn/ui",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="pt-BR" className="h-full antialiased">
      <body className="flex min-h-full flex-col">{children}</body>
    </html>
  );
}
