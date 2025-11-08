import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function NotFound() {
  return (
    <>
      <Header />
      
      <main className="min-h-screen bg-white flex items-center justify-center px-5 py-12">
        <div className="text-center max-w-2xl">
          {/* 404 Number */}
          <h1 className="text-9xl md:text-[12rem] font-bold text-gray-900 leading-none mb-6">
            404
          </h1>
          
          {/* Page Not Found */}
          <h2 className="text-2xl md:text-3xl font-semibold text-gray-800 mb-4">
            Page Not Found
          </h2>
          
          {/* Description */}
          <p className="text-base md:text-lg text-gray-600 mb-8 max-w-md mx-auto">
            Sorry, the page you are looking for doesn&apos;t exist or has been moved. Let&apos;s get you back on track.
          </p>
          
          {/* Return to Homepage Button */}
          <Link 
            href="/" 
            className="inline-block btn-primary text-base px-8 py-3"
          >
            Return to Homepage
          </Link>
        </div>
      </main>
      
      <Footer />
    </>
  );
}
