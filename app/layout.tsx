import './globals.css';
import type { Metadata } from 'next';
import { Inter, Playfair_Display } from 'next/font/google';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });
const playfair = Playfair_Display({ subsets: ['latin'], variable: '--font-playfair' });

export const metadata: Metadata = {
  title: 'Noriza Bihandu - Photography & Videography',
  description: 'Professional photographer and videographer specializing in weddings, portraits, and commercial work. Capturing timeless memories with artistic excellence.',
  keywords: 'photography, videography, wedding photographer, portrait photographer, Sri Lanka photographer, professional photography',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${inter.variable} ${playfair.variable} font-sans antialiased`}>
        {children}
      </body>
    </html>
  );
}