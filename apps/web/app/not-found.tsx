import Link from 'next/link';

export default function NotFound() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-off-white text-charcoal-black px-4">
      <h1 className="text-h1 font-display mb-4">404</h1>
      <p className="text-body mb-8">Page not found.</p>
      <Link href="/en/" className="text-champagne-gold underline hover:no-underline">
        Return to Home
      </Link>
    </main>
  );
}
