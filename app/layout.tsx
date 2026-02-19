import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/shared/components/ThemeProvider";
import { Layout } from "./layouts/AppLayout";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Alexis Buelvas - Frontend Developer",
    template: "%s | Alexis Buelvas",
  },
  description:
    "Frontend Developer with 6+ years of experience building modern web applications with React, Next.js, TypeScript, and cutting-edge technologies.",
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: "Alexis Buelvas Portfolio",
    title: "Alexis Buelvas - Frontend Developer",
    description:
      "Frontend Developer with 6+ years of experience building modern web applications with React, Next.js, TypeScript, and cutting-edge technologies.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Alexis Buelvas - Frontend Developer",
    description:
      "Frontend Developer with 6+ years of experience building modern web applications with React, Next.js, TypeScript, and cutting-edge technologies.",
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#0a0a0a" },
  ],
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* Script para prevenir flash de tema incorrecto */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  var theme = localStorage.getItem('theme-storage');
                  if (theme) {
                    var parsed = JSON.parse(theme);
                    var selectedTheme = parsed.state.theme;
                    var systemDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
                    var isDark = selectedTheme === 'dark' || (selectedTheme === 'system' && systemDark);
                    
                    if (isDark) {
                      document.documentElement.classList.add('dark');
                    } else {
                      document.documentElement.classList.remove('dark');
                    }
                  } else {
                    // Si no hay preferencia guardada, usar sistema
                    if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
                      document.documentElement.classList.add('dark');
                    }
                  }
                } catch (e) {
                  // Si hay error, usar sistema por defecto
                  if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
                    document.documentElement.classList.add('dark');
                  }
                }
              })();
            `,
          }}
        />
      </head>
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        <ThemeProvider>
          <Layout>{children}</Layout>
        </ThemeProvider>
      </body>
    </html>
  );
}
