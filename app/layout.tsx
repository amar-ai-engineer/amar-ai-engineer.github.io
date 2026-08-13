import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import AmbientBackground from "@/components/AmbientBackground";
import CustomCursor from "@/components/CustomCursor";

const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

const jetbrains = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Amar Ismail — AI Engineer · a portfolio you meet, not read",
  description:
    "Amar Ismail — AI Engineer building Healthcare AI, FinTech and automation systems. Meet Ami, an AI guide that walks you through the work.",
  authors: [{ name: "Amar Ismail" }],
  keywords: [
    "Amar Ismail",
    "AI Engineer",
    "Healthcare AI",
    "FinTech AI",
    "Business Automation",
    "LLM",
    "RAG",
  ],
};

// Sets the theme before first paint to avoid a flash (system default, remembered override).
const themeScript = `(function(){try{var t=localStorage.getItem('theme');if(t!=='light'&&t!=='dark'){t=window.matchMedia('(prefers-color-scheme: dark)').matches?'dark':'light';}document.documentElement.dataset.theme=t;}catch(e){}})();`;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${inter.variable} ${jetbrains.variable} h-full antialiased`}
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body className="min-h-full">
        <AmbientBackground />
        <CustomCursor />
        {children}
      </body>
    </html>
  );
}
