import type {Metadata} from "next";
import {Geist, Geist_Mono} from "next/font/google";
import "../globals.css";
import {ThemeProvider} from "@/components/theme-provider";
import {UserProvider} from "@/components/UserContext";
import {Toaster} from "@/components/ui/toaster";
import {getUser} from "../actions/users";
import Navbar from "@/components/navbar/Navbar";
import {ChatBotProvider} from "@/components/chatWindow/ChatBotMessagesContext";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Talk2Pdf",
  description: "Chat with your PDF documents",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const user = await getUser();
  return (
    <html lang="en" suppressHydrationWarning>
      <head />
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem disableTransitionOnChange>
          <UserProvider user={user}>
            <div>
              <Navbar user={user} />
              <main className="mt-24">{children}</main>
            </div>
            <Toaster />
          </UserProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
