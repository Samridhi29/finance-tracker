import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/header";
import { ClerkProvider } from "@clerk/nextjs";
import { Toaster } from "sonner";

const inter = Inter({ subsets: ["latin"] }); // Inter font for the entire app

export const metadata = {
  title: "FinGenius",
  description: "One stop Finance Platform",
};

export default function RootLayout({ children }) {
  return (
    <ClerkProvider>
      <html lang="en">
        <head>
          <link rel="icon" href="/logo-sm.png" sizes="any" />
        </head>
        <body className={`${inter.className}`}>
          <Header />
          <main className="min-h-screen">{children}</main>  {/* main helps search engines to know where the main content inside our app is*/ }
          <Toaster richColors />

          <footer className="bg-blue-50 py-12">
            <div className="container mx-auto px-4 text-center text-gray-600"> 
              {/* container makes responsive */}
              <p>Made with 💗 by Samridhi</p>
            </div>
          </footer>
        </body>
      </html>
    </ClerkProvider>
  );
}