import { useState, useEffect, useMemo } from 'react';
import { useProducts } from '../hooks/useProducts';
import ProductCard from '../components/ProductCard';
import ProductModal from '../components/ProductModal';
import CourseRecommendation from '../components/CourseRecommendation';
import SearchFilter from '../components/SearchFilter';
import SEO from '../components/SEO';
import { debounce } from '../utils/helpers';

const Home = () => {
  const {
    products,
    filteredProducts,
    loading,
    error,
    filters,
    updateFilter,
    clearFilters
  } = useProducts();

  const [selectedProduct, setSelectedProduct] = useState(null);
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

  const handleProductClick = (product) => {
    setSelectedProduct(product);
  };

  const handleCloseModal = () => {
    setSelectedProduct(null);
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
    "description": "Find Your Perfect Gadget in Ghana",
    "potentialAction": {
      "@type": "SearchAction",
      "target": "https://www.laptopconnect.shop/?q={search_term_string}",
      "query-input": "required name=search_term_string"
    }
  };

  return (
    <>
      <SEO
        title="Find Your Perfect Gadget"
        description="Discover laptops, smartphones, watches and more tailored to your needs. Shop from a wide selection of new and used gadgets at competitive prices in Ghana."
        structuredData={homepageStructuredData}
      />
      <div className="min-h-screen bg-gray-50">
        {/* Hero Section */}
        <header className="relative bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-800 text-white">
          <div className="absolute inset-0 bg-black opacity-40"></div>
          <div className="relative container mx-auto px-6 sm:px-8 lg:px-12 py-32">
            <div className="text-center max-w-5xl mx-auto z-10 relative">
              <span className="inline-block py-1 px-3 rounded-full bg-blue-500 bg-opacity-30 border border-blue-400 text-blue-100 text-sm font-semibold mb-6 backdrop-blur-sm animate-fadeIn">
                Premium Electronics Catalog
              </span>
              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight tracking-tight">
                Find Your Perfect <br className="hidden md:block" />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-200 to-white">
                  Tech Companion
                </span>
              </h1>
              <p className="text-lg sm:text-xl md:text-2xl mb-10 text-blue-100 max-w-3xl mx-auto font-light leading-relaxed">
                Discover a curated collection of Laptops, Smartwatches, Phones & More. <br className="hidden sm:block" /> All tailored to your needs.
              </p>

              {/* Search Bar */}
              <div className="relative max-w-xl mx-auto mb-10 group">
                <div className="absolute inset-0 bg-blue-400 rounded-xl blur opacity-20 group-hover:opacity-30 transition duration-300"></div>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                  </div>
                  <input
                    type="text"
                    className="block w-full pl-11 pr-4 py-4 border-0 bg-white text-gray-900 placeholder-gray-500 rounded-xl shadow-lg ring-1 ring-black/5 focus:ring-2 focus:ring-blue-400 transition-all duration-300"
                    placeholder="Search for MacBook, iPhone, Galaxy Watch..."
                    value={searchTerm}
                    onChange={handleSearchChange}
                  />
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button
                  className="inline-flex items-center justify-center px-8 py-3.5 bg-white text-blue-600 font-semibold rounded-xl shadow-lg hover:bg-blue-50 hover:scale-105 transition-all duration-300 transform"
                  onClick={handleToggleFilters}
                >
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
                  </svg>
                  Browse Categories
                </button>
              </div>
            </div>
          </div>

          {/* Wave SVG */}
          <div className="absolute bottom-0 left-0 right-0">
            <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M0 120L60 105C120 90 180 60 240 45C300 30 360 30 420 45C480 60 540 90 600 105C660 120 720 120 780 105C840 90 900 60 960 45C1020 30 1080 30 1140 45C1200 60 1260 90 1320 105C1380 120 1440 120 1440 120V120H0Z" fill="currentColor" />
            </svg>
          </div>
        </header>

        {/* Course Recommendation - Keeping it as legacy or rename "Recommendation" */}
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
              products={products}
            />
          </aside>
        )}

        {/* Results Section */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col md:flex-row justify-between items-center mb-8">
              <div>
                <h2 className="text-2xl font-bold text-gray-900">
                  {searchTerm ? `Search Results for "${searchTerm}"` : 'All Products'}
                </h2>
                <p className="text-gray-600 mt-1">
                  {loading ? 'Loading...' : `${filteredProducts.length} items available`}
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

            {/* Products Grid */}
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
                <p className="text-gray-600 mb-6">We're having trouble loading our products. Please try again later.</p>
                <button
                  className="px-4 py-2 bg-primary-blue text-white rounded hover:bg-blue-700 transition-colors"
                  onClick={() => window.location.reload()}
                >
                  Try Again
                </button>
              </div>
            ) : filteredProducts.length === 0 ? (
              <div className="text-center py-12">
                <svg className="w-16 h-16 mx-auto text-gray-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0H9l-2.544-2.544a4 4 0 00-5.656 0L3.172 12.828a4 4 0 005.656 0L9 10.172l2.544 2.544a4 4 0 005.656 0l4.95-4.95a4 4 0 00-5.656 0z" />
                </svg>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">No products found</h3>
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
                {filteredProducts.map((product) => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    onClick={handleProductClick}
                  />
                ))}
              </div>
            )}
          </div>
        </section>

        {/* Product Modal */}
        <ProductModal
          product={selectedProduct}
          isOpen={!!selectedProduct}
          onClose={handleCloseModal}
        />
      </div>
    </>
  );
};

export default Home;