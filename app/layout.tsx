import type { Metadata } from "next";
import { League_Spartan } from "next/font/google";
import "./globals.css";
import ThemeProvider from "@/context/ThemeProvider";

const leagueSpartan = League_Spartan({
  variable: "--font-league-spartan",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Invoices app",
  description: "App to organise all your invoices in one place",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${leagueSpartan.variable} antialiased`}>
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
