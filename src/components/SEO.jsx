import React from 'react';
import { Helmet } from 'react-helmet-async';

const SEO = ({ 
  title, 
  description, 
  keywords, 
  ogImage, 
  ogUrl, 
  twitterCard = 'summary_large_image',
  structuredData,
  robots = 'index,follow'
}) => {
  const siteTitle = 'Laptop Connect - Find Your Perfect Laptop in Ghana';
  const fullTitle = title ? `${title} | ${siteTitle}` : siteTitle;
  const siteDescription = description || 'Discover laptops from top brands like Dell, HP, Lenovo, Apple, Acer, Microsoft tailored to your academic needs. Shop from a wide selection of new and used laptops at competitive prices in Ghana.';
  const siteKeywords = keywords || 'laptops, computer, dell, hp, lenovo, apple, acer, microsoft, gaming laptops, student laptops, laptop ghana, laptop accra, dell ghana, hp ghana, lenovo ghana';
  const siteImage = ogImage || '/logo.png';
  const siteUrl = ogUrl || 'https://www.laptopconnect.shop';

  // Local business structured data
  const localBusinessData = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": "Laptop Connect",
    "description": "Your trusted partner for quality laptops in Ghana since 2025",
    "url": "https://www.laptopconnect.shop",
    "logo": "https://www.laptopconnect.shop/logo.png",
    "image": "https://www.laptopconnect.shop/logo.png",
    "telephone": "+233 20 153 4711",
    "email": "laptopconnect@gmail.com",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "UCC Cape Coast Campus",
      "addressLocality": "Cape Coast",
      "addressCountry": "Ghana"
    },
    "openingHours": "Mo-Fr 09:00-18:00 Sa 10:00-16:00",
    "priceRange": "$$"
  };

  return (
    <Helmet>
      {/* Basic Meta Tags */}
      <title>{fullTitle}</title>
      <meta name="description" content={siteDescription} />
      <meta name="keywords" content={siteKeywords} />
      <meta name="robots" content={robots} />
      
      {/* Open Graph Tags */}
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={siteDescription} />
      <meta property="og:type" content="website" />
      <meta property="og:url" content={siteUrl} />
      <meta property="og:image" content={siteImage} />
      <meta property="og:site_name" content="Laptop Connect" />
      
      {/* Twitter Card Tags */}
      <meta name="twitter:card" content={twitterCard} />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={siteDescription} />
      <meta name="twitter:image" content={siteImage} />
      
      {/* Canonical URL */}
      <link rel="canonical" href={siteUrl} />
      
      {/* Structured Data */}
      <script type="application/ld+json">
        {JSON.stringify(structuredData || localBusinessData)}
      </script>
    </Helmet>
  );
};

export default SEO;