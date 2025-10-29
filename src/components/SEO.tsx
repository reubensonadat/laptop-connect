import React from 'react';
import { Helmet } from 'react-helmet-async';

interface SEOProps {
  title?: string;
  description?: string;
  keywords?: string;
  image?: string;
  url?: string;
  type?: string;
}

const SEO: React.FC<SEOProps> = ({
  title = 'Laptop Connect - Find Your Perfect Laptop in Ghana',
  description = 'Find the perfect laptop for your course with our intelligent recommendation system. Quality laptops at affordable prices in Ghana with flexible payment options.',
  keywords = 'laptops, Ghana, student laptops, course recommendations, Dell, HP, Lenovo, MacBook, affordable laptops, laptop shop, Accra',
  image = '/og-image.jpg',
  url = window.location.href,
  type = 'website'
}) => {
  return (
    <Helmet>
      {/* Title */}
      <title>{title}</title>
      <meta name="title" content={title} />
      
      {/* Description */}
      <meta name="description" content={description} />
      
      {/* Keywords */}
      <meta name="keywords" content={keywords} />
      
      {/* Canonical URL */}
      <link rel="canonical" href={url} />
      
      {/* Open Graph / Facebook */}
      <meta property="og:type" content={type} />
      <meta property="og:url" content={url} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      
      {/* Twitter */}
      <meta property="twitter:card" content="summary_large_image" />
      <meta property="twitter:url" content={url} />
      <meta property="twitter:title" content={title} />
      <meta property="twitter:description" content={description} />
      <meta property="twitter:image" content={image} />
    </Helmet>
  );
};

export default SEO;