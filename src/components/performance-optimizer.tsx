import React from 'react';

const PerformanceOptimizer: React.FC = () => {
  return (
    <>
      {/* Preload critical resources */}
      <link
        rel="preload"
        href="/icons/icon-192x192.png"
        as="image"
        type="image/png"
      />
      <link
        rel="preload"
        href="/icons/icon-512x512.png"
        as="image"
        type="image/png"
      />
      
      {/* DNS prefetch for external resources */}
      <link rel="dns-prefetch" href="//www.google-analytics.com" />
      <link rel="dns-prefetch" href="//www.googletagmanager.com" />
      <link rel="dns-prefetch" href="//fonts.googleapis.com" />
      <link rel="dns-prefetch" href="//fonts.gstatic.com" />
      
      {/* Preconnect to external domains */}
      <link rel="preconnect" href="https://www.google-analytics.com" />
      <link rel="preconnect" href="https://www.googletagmanager.com" />
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      
      {/* Resource hints for better performance */}
      <meta httpEquiv="x-dns-prefetch-control" content="on" />
      
      {/* Critical CSS inline (if needed) */}
      <style
        dangerouslySetInnerHTML={{
          __html: `
            /* Critical CSS for above-the-fold content */
            .hero-section {
              background: linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%);
            }
            .loading-spinner {
              display: inline-block;
              width: 20px;
              height: 20px;
              border: 3px solid #f3f3f3;
              border-top: 3px solid #3498db;
              border-radius: 50%;
              animation: spin 1s linear infinite;
            }
            @keyframes spin {
              0% { transform: rotate(0deg); }
              100% { transform: rotate(360deg); }
            }
          `,
        }}
      />
    </>
  );
};

export default PerformanceOptimizer;
