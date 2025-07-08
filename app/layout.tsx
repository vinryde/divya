import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Senan Education Lab",
  description: "Senan Education Lab advances research and innovation in education, sustainability, and technology. Explore projects, outreach, and resources empowering educators and communities worldwide.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Mona+Sans:ital,wght@0,200..900;1,200..900&display=swap"
        />
      </head>
      <body className={`antialiased`}>{children}</body>
    </html>
  );
}
