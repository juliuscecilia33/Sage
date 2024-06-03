import { Archivo } from "next/font/google";

import { ChapterCountContextProvider } from "./context/ChapterCount";
import "./globals.css";

const defaultUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : "http://localhost:3000";

export const metadata = {
  metadataBase: new URL(defaultUrl),
  title: "Sage",
  description: "Bible Notetaking App",
};

const archivo = Archivo({
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${archivo.className}`}>
      <body className="bg-background text-foreground">
        <main className="min-h-screen flex flex-col items-center">
          <ChapterCountContextProvider>{children}</ChapterCountContextProvider>
        </main>
      </body>
    </html>
  );
}
