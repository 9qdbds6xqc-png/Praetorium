import type { Metadata } from "next";
import { GoogleAnalytics } from "@/components/analytics/GoogleAnalytics";
import { PageViewTracker } from "@/components/analytics/PageViewTracker";
import "./globals.css";

export const metadata: Metadata = {
  title: "Praetorium Technologies",
  description: "Praetorium Technologies",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        {children}
        <GoogleAnalytics />
        <PageViewTracker />
      </body>
    </html>
  );
}

