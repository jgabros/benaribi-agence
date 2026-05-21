import type { ReactNode } from 'react';
import './globals.css';

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="bg-off-white font-body text-charcoal-black min-h-screen">
        {children}
      </body>
    </html>
  );
}
