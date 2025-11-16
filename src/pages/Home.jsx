import { useState, useEffect, useMemo } from 'react';
import { useLaptops } from '../hooks/useLaptops';
import LaptopCard from '../components/LaptopCard';
import LaptopModal from '../components/LaptopModal';
import CourseRecommendation from '../components/CourseRecommendation';
import SearchFilter from '../components/SearchFilter';
import SEO from '../components/SEO';
import { debounce } from '../utils/helpers';

const Home = () => {
  const {
    laptops,
    filteredLaptops,
    loading,
    error,
    filters,
    updateFilter,
    clearFilters
  } = useLaptops();

  const [selectedLaptop, setSelectedLaptop] = useState(null);
  const [showFilters, setShowFilters] = useState(false);
  const [searchTerm, setSearchTerm] = useState(filters.searchTerm);

  // Debounce search term update
  const debouncedSearch = useMemo(
    () => debounce((value) => updateFilter('searchTerm', value), 500),
    [updateFilter]
  );

  useEffect(() => {
    debouncedSearch(searchTerm);
  }, [searchTerm, debouncedSearch]);

  const handleLaptopClick = (laptop) => {
    setSelectedLaptop(laptop);
  };

  const handleCloseModal = () => {
    setSelectedLaptop(null);
  };

  const handleToggleFilters = () => {
    setShowFilters(!showFilters);
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  // Structured data for homepage
  const homepageStructuredData = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "Laptop Connect",
    "url": "https://www.laptopconnect.shop",
    "description": "Find Your Perfect Laptop in Ghana",
    "potentialAction": {
      "@type": "SearchAction",
      "target": "https://www.laptopconnect.shop/?q={search_term_string}",
      "query-input": "required name=search_term_string"
    }
  };

  return (
    <>
      <SEO 
        title="Find Your Perfect Laptop"
        description="Discover laptops from top brands like Dell, HP, Lenovo, Apple, Acer, Microsoft tailored to your academic needs. Shop from a wide selection of new and used laptops at competitive prices in Ghana."
        structuredData={homepageStructuredData}
      />
      <div className="min-h-screen bg-gray-50">
        {/* Hero Section */}
        <header className="relative bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-800 text-white">
          <div className="absolute inset-0 bg-black opacity-40"></div>
          <div className="relative container mx-auto px-4 sm:px-6 lg:px-8 py-24">
            <div className="text-center max-w-4xl mx-auto">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
                Find Your Perfect Laptop
              </h1>
              <p className="text-xl md:text-2xl mb-8 text-blue-100">
                Discover laptops tailored to your academic needs with our intelligent recommendation system
              </p>
              
              {/* Search Bar */}
              <div className="relative max-w-2xl mx-auto mb-8">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <svg className="h-5 w-5 text-blue-300" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>
                <input
                  type="text"
                  className="block w-full pl-10 pr-4 py-4 border border-blue-300 bg-white bg-opacity-90 text-gray-900 placeholder-gray-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Search by brand, model, or processor..."
                  value={searchTerm}
                  onChange={handleSearchChange}
                />
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button
                  className="inline-flex items-center px-6 py-3 bg-white text-blue-700 font-medium rounded-lg hover:bg-gray-100 transition-colors"
                  onClick={handleToggleFilters}
                >
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
                  </svg>
                  Filters
                </button>
              </div>
            </div>
          </div>
          
          {/* Wave SVG */}
          <div className="absolute bottom-0 left-0 right-0">
            <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M0 120L60 105C120 90 180 60 240 45C300 30 360 30 420 45C480 60 540 90 600 105C660 120 720 120 780 105C840 90 900 60 960 45C1020 30 1080 30 1140 45C1200 60 1260 90 1320 105C1380 120 1440 120 1440 120V120H0Z" fill="currentColor"/>
            </svg>
          </div>
        </header>

        {/* Course Recommendation */}
        <section className="py-16 bg-white">
          <CourseRecommendation />
        </section>

        {/* Search Filter */}
        {showFilters && (
          <aside className="py-8 bg-gray-50">
            <SearchFilter
              filters={filters}
              updateFilter={updateFilter}
              clearFilters={clearFilters}
              laptops={laptops}
            />
          </aside>
        )}

        {/* Results Section */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col md:flex-row justify-between items-center mb-8">
              <div>
                <h2 className="text-2xl font-bold text-gray-900">
                  {searchTerm ? `Search Results for "${searchTerm}"` : 'All Laptops'}
                </h2>
                <p className="text-gray-600 mt-1">
                  {loading ? 'Loading...' : `${filteredLaptops.length} laptops available`}
                </p>
              </div>
              <div className="flex items-center space-x-4">
                {!showFilters && (
                  <button
                    className="text-sm text-primary-blue hover:text-blue-700 font-medium"
                    onClick={handleToggleFilters}
                  >
                    {showFilters ? 'Hide Filters' : 'Show Filters'}
                  </button>
                )}
              </div>
            </div>

            {/* Laptops Grid */}
            {loading ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {Array.from({ length: 8 }).map((_, index) => (
                  <div key={index} className="bg-white rounded-lg border border-gray-200 overflow-hidden shadow-sm">
                    <div className="h-48 bg-gray-100 skeleton"></div>
                    <div className="p-4">
                      <div className="h-4 bg-gray-100 rounded skeleton mb-2"></div>
                      <div className="h-3 bg-gray-100 rounded skeleton mb-2"></div>
                      <div className="h-3 bg-gray-100 rounded skeleton mb-4"></div>
                      <div className="flex justify-between">
                        <div className="h-6 w-24 bg-gray-100 rounded skeleton"></div>
                        <div className="h-8 w-24 bg-gray-100 rounded skeleton"></div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : error ? (
              <div className="text-center py-12">
                <div className="text-red-500 mb-4">{error}</div>
                <p className="text-gray-600 mb-6">We're having trouble loading our laptops. Please try again later.</p>
                <button
                  className="px-4 py-2 bg-primary-blue text-white rounded hover:bg-blue-700 transition-colors"
                  onClick={() => window.location.reload()}
                >
                  Try Again
                </button>
              </div>
            ) : filteredLaptops.length === 0 ? (
              <div className="text-center py-12">
                <svg className="w-16 h-16 mx-auto text-gray-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0H9l-2.544-2.544a4 4 0 00-5.656 0L3.172 12.828a4 4 0 005.656 0L9 10.172l2.544 2.544a4 4 0 005.656 0l4.95-4.95a4 4 0 00-5.656 0z" />
                </svg>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">No laptops found</h3>
                <p className="text-gray-600 mb-6">Try adjusting your filters or search terms</p>
                <button
                  className="px-4 py-2 bg-primary-blue text-white rounded hover:bg-blue-700 transition-colors"
                  onClick={clearFilters}
                >
                  Clear Filters
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {filteredLaptops.map((laptop) => (
                  <LaptopCard
                    key={laptop.id}
                    laptop={laptop}
                    onClick={handleLaptopClick}
                  />
                ))}
              </div>
            )}
          </div>
        </section>

        {/* Laptop Modal */}
        <LaptopModal
          laptop={selectedLaptop}
          isOpen={!!selectedLaptop}
          onClose={handleCloseModal}
        />
      </div>
    </>
  );
};

export default Home;