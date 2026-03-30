import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Kiril Rothacher — Developer",
  description:
    "Personal portfolio of Kiril Rothacher, Developer at PostFinance based in Thierachern, Thun, Switzerland.",
  keywords: ["developer", "portfolio", "PostFinance", "Switzerland", "Thun"],
  authors: [{ name: "Kiril Rothacher" }],
  openGraph: {
    title: "Kiril Rothacher — Developer",
    description: "Developer at PostFinance based in Thun, Switzerland.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="de" className="scroll-smooth">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
      </head>
      <body className="bg-background text-foreground antialiased">
        {children}
      </body>
    </html>
  );
}
