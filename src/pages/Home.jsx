import { useState, useEffect, useMemo } from 'react';
import { useProducts } from '../hooks/useProducts';
import ProductCard from '../components/ProductCard';

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

  const [showFilters, setShowFilters] = useState(false);
  const [searchTerm, setSearchTerm] = useState(filters.searchTerm);

  // Categories for mobile filter strip
  const categories = ['All', 'Laptop', 'Phone', 'Smart Watch', 'Accessory'];

  // Debounce search term update
  const debouncedSearch = useMemo(
    () => debounce((value) => updateFilter('searchTerm', value), 500),
    [updateFilter]
  );

  useEffect(() => {
    debouncedSearch(searchTerm);
  }, [searchTerm, debouncedSearch]);

  const handleToggleFilters = () => {
    setShowFilters(!showFilters);
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const scrollToShop = () => {
    const shopSection = document.getElementById('shop');
    if (shopSection) {
      shopSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      <SEO
        title="Find Your Perfect Gadget"
        description="Discover laptops, smartphones, watches and more tailored to your needs. Shop from a wide selection of new and used gadgets at competitive prices in Ghana."
      />
      <div className="min-h-screen bg-white">
        {/* Hero Section - Premium Monochromatic */}
        <header className="relative bg-gray-900 text-white overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-black via-gray-900 to-gray-800 opacity-90"></div>
          
          {/* Decorative Elements */}
          <div className="absolute -top-24 -right-24 w-96 h-96 bg-gray-800 rounded-full blur-[120px] opacity-20 animate-pulse"></div>
          <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-gray-700 rounded-full blur-[120px] opacity-10"></div>

          <div className="relative max-w-[1400px] mx-auto px-6 md:px-8 py-32 md:py-48">
            <div className="text-center max-w-5xl mx-auto z-10 relative">
              <span className="inline-block py-1.5 px-4 rounded-full bg-white/5 border border-white/10 text-gray-400 text-[10px] font-black uppercase tracking-[0.4em] mb-8 backdrop-blur-sm">
                The 2026 Collection
              </span>
              <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black mb-8 leading-[0.9] tracking-tighter uppercase">
                Future <br className="hidden md:block" />
                <span className="italic text-transparent bg-clip-text bg-gradient-to-r from-white via-white to-gray-500">
                  Engineering
                </span>
              </h1>
              <p className="text-lg sm:text-xl md:text-2xl mb-12 text-gray-400 max-w-2xl mx-auto font-medium leading-relaxed tracking-tight">
                Premium Laptops, Smartwatches, and mobile technology. <br className="hidden sm:block" /> Curated for performance and aesthetics.
              </p>

              {/* Search Bar - High Contrast */}
              <div className="relative max-w-2xl mx-auto mb-12 group">
                <div className="absolute inset-0 bg-white/5 rounded-[24px] blur-xl opacity-0 group-focus-within:opacity-100 transition duration-500"></div>
                <div className="relative">
                  <div className="absolute inset-y-0 left-6 flex items-center pointer-events-none">
                    <svg className="h-5 w-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                  </div>
                  <input
                    type="text"
                    className="block w-full pl-16 pr-8 py-6 bg-white/5 hover:bg-white/10 border border-white/10 text-white placeholder-gray-500 rounded-[24px] backdrop-blur-md focus:outline-none focus:ring-2 focus:ring-white/20 transition-all duration-500 text-lg font-bold"
                    placeholder="Search model or specs..."
                    value={searchTerm}
                    onChange={handleSearchChange}
                  />
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-6 justify-center">
                <button
                  className="inline-flex items-center justify-center px-10 py-5 bg-white text-black font-black rounded-2xl shadow-2xl hover:scale-105 active:scale-95 transition-all duration-500 uppercase text-[11px] tracking-[0.2em]"
                  onClick={scrollToShop}
                >
                  Explore Catalog
                </button>
              </div>
            </div>
          </div>
        </header>

        {/* Expert Recommendations Section */}
        <section className="py-24 bg-white">
          <div className="max-w-[1400px] mx-auto px-6 md:px-8">
            <div className="mb-12">
              <span className="text-[10px] uppercase font-black tracking-[0.4em] text-gray-400">Curated</span>
              <h2 className="text-3xl font-black text-gray-900 uppercase tracking-tighter mt-2">Expert Selections</h2>
            </div>
            <CourseRecommendation />
          </div>
        </section>

        {/* Results Section */}
        <section className="py-24 bg-white border-t border-gray-50" id="shop">
          <div className="max-w-[1400px] mx-auto px-6 md:px-8">
            <div className="flex flex-col lg:flex-row gap-16">
              
              {/* Contextual Sidebar Filter (Desktop) */}
              <aside className={`w-full lg:w-80 flex-shrink-0 transition-all duration-300 ${showFilters ? 'block' : 'hidden lg:block'}`}>
                <SearchFilter
                  filters={filters}
                  updateFilter={updateFilter}
                  clearFilters={clearFilters}
                  products={products}
                />
              </aside>

              {/* Main Products Area */}
              <div className="flex-1">
                <div className="flex flex-col mb-12">
                  <div className="flex flex-col md:flex-row justify-between items-end pb-6 border-b border-gray-100 mb-8">
                    <div>
                      <h2 className="text-4xl font-black text-gray-900 uppercase tracking-tighter">
                        {searchTerm ? `Results for "${searchTerm}"` : 'The Inventory'}
                      </h2>
                      <p className="text-[10px] font-black uppercase tracking-[0.3em] text-gray-400 mt-2">
                        {loading ? 'Synchronizing...' : `${filteredProducts.length} Premium Units Found`}
                      </p>
                    </div>
                    <div className="flex items-center space-x-4 lg:hidden mt-8 md:mt-0">
                      <button
                        className="px-8 py-4 bg-black text-white text-[10px] font-black uppercase tracking-widest rounded-xl"
                        onClick={handleToggleFilters}
                      >
                        {showFilters ? 'Hide Parameters' : 'All Parameters'}
                      </button>
                    </div>
                  </div>

                  {/* Mobile Category Quick Filter */}
                  <div className="flex lg:hidden overflow-x-auto no-scrollbar gap-4 pb-4 -mx-2 px-2">
                    {categories.map((cat) => (
                      <button
                        key={cat}
                        onClick={() => updateFilter('category', cat === 'All' ? '' : cat)}
                        className={`flex-shrink-0 px-6 py-3 rounded-full text-[10px] font-black uppercase tracking-widest transition-all ${
                          (filters.category === cat || (cat === 'All' && !filters.category))
                            ? 'bg-black text-white shadow-xl'
                            : 'bg-gray-50 text-gray-400 border border-gray-100'
                        }`}
                      >
                        {cat}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Products Grid */}
                {loading ? (
                  <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-16">
                    {Array.from({ length: 6 }).map((_, index) => (
                      <div key={index} className="space-y-6">
                        <div className="aspect-[4/5] bg-gray-50 rounded-[32px] animate-pulse"></div>
                        <div className="space-y-3 px-2">
                          <div className="h-3 w-1/4 bg-gray-50 rounded-full"></div>
                          <div className="h-6 w-3/4 bg-gray-50 rounded-lg"></div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : error ? (
                  <div className="text-center py-24">
                    <p className="text-red-500 font-black uppercase text-xs tracking-widest mb-6">{error}</p>
                    <button
                      className="px-8 py-4 bg-black text-white rounded-2xl font-black text-[10px] uppercase tracking-widest"
                      onClick={() => window.location.reload()}
                    >
                      Retry
                    </button>
                  </div>
                ) : filteredProducts.length === 0 ? (
                  <div className="text-center py-32 bg-gray-50/50 rounded-[60px] border-2 border-dashed border-gray-100">
                    <h3 className="text-2xl font-black text-gray-900 uppercase tracking-tighter mb-4">Zero Matches</h3>
                    <p className="text-[10px] uppercase tracking-[0.3em] text-gray-400 font-bold mb-8">Try adjusting your parameters</p>
                    <button
                      className="px-8 py-4 bg-black text-white rounded-2xl font-black text-[10px] uppercase tracking-widest"
                      onClick={clearFilters}
                    >
                      Reset All
                    </button>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-12 sm:gap-16">
                    {filteredProducts.map((product) => (
                      <ProductCard
                        key={product.id}
                        product={product}
                      />
                    ))}
                  </div>
                )} 
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default Home;