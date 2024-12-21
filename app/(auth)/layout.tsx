import {ThemeProvider} from "@/components/theme-provider";
import {Metadata} from "next";
import {Inter} from "next/font/google";
import "../globals.css";
import Logo from "./components/Logo";
import {Geist, Geist_Mono} from "next/font/google";

export const metadata: Metadata = {
  title: "authentication",
  description: "",
};

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const inter = Inter({subsets: ["latin"]});

export default async function RootLayout({children}: {children: React.ReactNode}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head />
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem disableTransitionOnChange>
          <nav className="py-5 fixed container mx-auto w-full">
            <Logo />
          </nav>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
