import "./globals.css";
import type { Metadata } from "next";
import { Cairo } from "next/font/google";

const cairo = Cairo({
  subsets: ["arabic"],
  weight: ["400", "600", "700"],
});

export const metadata: Metadata = {
  title: "Ghouth",
  description: "التسجيل في مؤسسة غوث",
  icons: {
    icon: [
      { url: "/favicon.svg", type: "image/svg+xml" },
      { url: "/icon.svg", type: "image/svg+xml" },
    ],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ar" dir="rtl">
      <body className={`${cairo.className} bg-white text-slate-800`}>
        {children}
      </body>
    </html>
  );
}


