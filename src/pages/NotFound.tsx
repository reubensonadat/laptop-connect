// src/pages/NotFound.tsx
import React from 'react';
import { Link } from 'react-router-dom';
import SEO from '../components/SEO';

const NotFound = () => {
  return (
    <>
      <SEO 
        title="Page Not Found - Laptop Connect"
        description="The page you're looking for doesn't exist. Browse our selection of laptops or return to the homepage."
      />
      
      <div className="container px-4 py-16 md:px-6 text-center">
        <h1 className="text-4xl font-bold mb-4">404 - Page Not Found</h1>
        <p className="text-lg text-muted-foreground mb-8">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <Link 
          to="/" 
          className="inline-block px-6 py-3 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors"
        >
          Return to Homepage
        </Link>
      </div>
    </>
  );
};

export default NotFound;