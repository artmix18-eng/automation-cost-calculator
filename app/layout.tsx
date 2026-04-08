import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { ThemeProvider } from "next-themes";
import { Toaster } from "sonner";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin", "cyrillic"],
  display: "swap",
  preload: false,
});

export const metadata: Metadata = {
  title: "AutoFlow | Калькулятор ROI автоматизації бізнесу",
  description:
    "Розрахуйте точний ROI автоматизації вашого бізнесу за 2 хвилини. Безкоштовний калькулятор економії для малого і середнього бізнесу.",
  keywords: ["автоматизація бізнесу", "ROI калькулятор", "n8n", "автоматизація процесів", "заощадження"],
  openGraph: {
    title: "AutoFlow | Калькулятор ROI автоматизації",
    description: "Дізнайтесь скільки коштує ваша рутина. Калькулятор ROI автоматизації.",
    type: "website",
    locale: "uk_UA",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="uk" className={inter.variable} suppressHydrationWarning>
      <body className="min-h-screen antialiased">
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false}>
          {children}
          <Toaster richColors position="bottom-right" />
        </ThemeProvider>
      </body>
    </html>
  );
}
