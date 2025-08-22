import type { Metadata } from "next";
import { League_Spartan } from "next/font/google";
import "./globals.css";
import ThemeProvider from "@/context/ThemeProvider";
import { ClerkProvider } from "@clerk/nextjs";
import { dark } from "@clerk/themes";
import InvoiceProvider from "@/context/InvoiceProvider";

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
      <body
        className={`${leagueSpartan.variable} bg-light-200 dark:bg-dark-200 antialiased`}
      >
        <ClerkProvider
          appearance={{
            baseTheme: dark,
          }}
        >
          <ThemeProvider>
            {" "}
            <InvoiceProvider>{children}</InvoiceProvider>{" "}
          </ThemeProvider>
        </ClerkProvider>
      </body>
    </html>
  );
}
