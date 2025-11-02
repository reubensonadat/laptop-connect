import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { scrollToTop } from '../utils/helpers';

const NotFound = () => {
  useEffect(() => {
    scrollToTop();
  }, []);

  return (
    <div className="container mx-auto px-4 md:px-6 lg:px-8 py-8">
      <div className="max-w-2xl mx-auto text-center">
        <div className="mb-8">
          <h1 className="text-6xl font-bold text-primary-blue mb-4">404</h1>
          <h2 className="text-3xl font-semibold text-gray-900 mb-4">Page Not Found</h2>
          <p className="text-lg text-secondary-gray mb-8">
            Sorry, the page you are looking for doesn't exist or has been moved.
          </p>
        </div>
        
        <div className="space-y-4">
          <Link
            to="/"
            className="inline-block px-6 py-3 bg-primary-blue text-white font-medium rounded-lg hover:bg-blue-700 transition-colors focus:outline-none focus:ring-2 focus:ring-primary-blue focus:ring-offset-2"
          >
            Go to Homepage
          </Link>
          
          <div className="text-secondary-gray">
            Or try searching for what you're looking for:
          </div>
          
          <div className="max-w-md mx-auto">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg className="h-5 w-5 text-secondary-gray" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
              <input
                type="text"
                className="block w-full pl-10 pr-3 py-3 border border-border-gray rounded-lg leading-5 bg-white placeholder-secondary-gray focus:outline-none focus:placeholder-gray-400 focus:ring-2 focus:ring-primary-blue focus:border-primary-blue"
                placeholder="Search for laptops..."
              />
            </div>
          </div>
        </div>
        
        <div className="mt-12">
          <h3 className="text-lg font-medium text-gray-900 mb-4">You might be interested in:</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Link to="/?condition=NEW" className="block p-4 bg-white border border-border-gray rounded-lg hover:shadow-medium transition-shadow">
              <h4 className="font-medium text-gray-900 mb-2">New Laptops</h4>
              <p className="text-sm text-secondary-gray">Latest models with full warranty</p>
            </Link>
            <Link to="/?condition=UK_USED" className="block p-4 bg-white border border-border-gray rounded-lg hover:shadow-medium transition-shadow">
              <h4 className="font-medium text-gray-900 mb-2">UK Used Laptops</h4>
              <p className="text-sm text-secondary-gray">Quality refurbished laptops at great prices</p>
            </Link>
            <Link to="/?category=gaming" className="block p-4 bg-white border border-border-gray rounded-lg hover:shadow-medium transition-shadow">
              <h4 className="font-medium text-gray-900 mb-2">Gaming Laptops</h4>
              <p className="text-sm text-secondary-gray">High-performance laptops for gaming</p>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotFound;