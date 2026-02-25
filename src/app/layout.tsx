import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Skemmtilegt Hönnunarhús — Fagleg heimasíðugerð fyrir veitingastaði",
  description:
    "Við hönnun og smíðum heimasíður fyrir bara, veitingastaði og skemmtistaði á Íslandi. Sjáðu verkefni okkar og fáðu tilboð í dag.",
  keywords: [
    "heimasíðugerð",
    "vefhönnun",
    "veitingastaðir",
    "barir",
    "Ísland",
    "vefsíða",
    "skemmtilegt",
  ],
  openGraph: {
    title: "Skemmtilegt Hönnunarhús",
    description: "Fagleg heimasíðugerð fyrir bara og veitingastaði á Íslandi",
    type: "website",
    locale: "is_IS",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="is">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&family=Outfit:wght@300;400;500;600;700;800;900&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
