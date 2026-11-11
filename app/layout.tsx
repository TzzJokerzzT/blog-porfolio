import type { Metadata, Viewport } from "next";
import { Newsreader, Public_Sans } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/shared/components/ThemeProvider";
import { Layout } from "./layouts/AppLayout";
import { Analytics } from "@vercel/analytics/next";

const newsreader = Newsreader({
  variable: "--font-newsreader",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  style: ["normal", "italic"],
  display: "swap",
});

const publicSans = Public_Sans({
  variable: "--font-public-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  display: "swap",
});

const siteDescription =
  "Personal blog by Alexis Buelvas about frontend development, React, Next.js, TypeScript, and modern web technologies.";

export const metadata: Metadata = {
  title: {
    default: "Alexis Buelvas - Blog",
    template: "%s | Alexis Buelvas",
  },
  description: siteDescription,
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: "Alexis Buelvas",
    title: "Alexis Buelvas - Blog",
    description: siteDescription,
  },
  twitter: {
    card: "summary_large_image",
    title: "Alexis Buelvas - Blog",
    description: siteDescription,
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
    <html
      lang="en"
      suppressHydrationWarning
      className={`${newsreader.variable} ${publicSans.variable}`}
    >
      <head>
        {/* Aplica el tema guardado antes del primer pintado para evitar el flash */}
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
      <body>
        <ThemeProvider>
          <Layout>{children}</Layout>
          <Analytics />
        </ThemeProvider>
      </body>
    </html>
  );
}
