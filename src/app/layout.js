import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

export const metadata = {
  title: "ECHOES | The Art of Second Chances",
  description: "A premium social network for missed connections.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="dark h-full">
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap"
          rel="stylesheet"
        />
      </head>
      <body
        className={`${inter.variable} min-h-full flex flex-col font-inter antialiased`}
        suppressHydrationWarning
      >
        {children}
      </body>
    </html>
  );
}
