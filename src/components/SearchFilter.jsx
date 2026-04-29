import { useState, useEffect } from 'react';

const SearchFilter = ({ filters, updateFilter, clearFilters, products }) => {
  const [priceRange, setPriceRange] = useState({
    min: filters.minPrice,
    max: filters.maxPrice
  });

  // Extract unique values for filters from the actual data
  const categories = [...new Set(products.map(product => product.category))].filter(Boolean).sort();
  const brands = [...new Set(products.map(product => product.brand))].filter(Boolean).sort();
  const rams = [...new Set(products.map(product => product.ram))].filter(Boolean).sort();
  const storages = [...new Set(products.map(product => product.storage))].filter(Boolean).sort();

  // Dynamic Max Price calculation
  const maxInventoryPrice = products && products.length > 0 
    ? Math.max(...products.map(p => p.price || 0)) 
    : 20000;
    
  const sliderMax = Math.ceil((maxInventoryPrice || 20000) / 1000) * 1000;

  useEffect(() => {
    if (priceRange.max > sliderMax && sliderMax > 0) {
      setPriceRange(prev => ({ ...prev, max: sliderMax }));
      updateFilter('maxPrice', sliderMax);
    }
  }, [sliderMax]);

  const handlePriceChange = (type, value) => {
    const numValue = Math.min(Math.max(0, Number(value)), sliderMax);
    const newPriceRange = { ...priceRange, [type]: numValue };
    setPriceRange(newPriceRange);
    updateFilter(`${type}Price`, numValue);
  };

  const handleClearFilters = () => {
    setPriceRange({ min: 0, max: sliderMax });
    clearFilters();
  };

  return (
    <div className="bg-white border border-gray-100 rounded-2xl p-8 shadow-sm sticky top-28 max-h-[calc(100vh-140px)] overflow-y-auto no-scrollbar selection:bg-black selection:text-white">
      <div className="flex flex-col gap-10">
        <div className="flex items-center justify-between border-b border-gray-50 pb-6">
          <h2 className="text-2xl font-black text-gray-900 uppercase tracking-tighter italic">Filters</h2>
          <button
            className="text-[10px] font-black text-gray-400 hover:text-black uppercase tracking-widest transition-colors"
            onClick={handleClearFilters}
          >
            Clear All
          </button>
        </div>

        {/* Sorting Section */}
        <div className="space-y-6">
          <label className="text-[10px] font-black text-gray-400 uppercase tracking-[0.3em]">Sort By</label>
          <div className="flex flex-col gap-2">
            {[
              { id: 'price-asc', label: 'Price: Low to High' },
              { id: 'price-desc', label: 'Price: High to Low' },
              { id: 'newest', label: 'Newest First' }
            ].map((option) => (
              <button
                key={option.id}
                onClick={() => updateFilter('sortBy', option.id)}
                className={`text-left px-6 py-4 rounded-xl text-[11px] font-black uppercase tracking-widest transition-all duration-500 border ${
                  filters.sortBy === option.id
                  ? 'bg-black border-black text-white shadow-2xl'
                  : 'bg-white border-gray-100 text-gray-400 hover:border-black hover:text-black'
                }`}
              >
                {option.label}
              </button>
            ))}
          </div>
        </div>

        {/* Category Section */}
        <div className="space-y-6 border-t border-gray-50 pt-10">
          <label className="text-[10px] font-black text-gray-400 uppercase tracking-[0.3em]">Category</label>
          <div className="flex flex-col gap-2">
            <button
              onClick={() => updateFilter('category', '')}
              className={`text-left px-6 py-4 rounded-xl text-[11px] font-black uppercase tracking-widest transition-all duration-500 ${
                !filters.category 
                ? 'bg-black text-white shadow-2xl translate-x-2' 
                : 'text-gray-400 hover:text-black'
              }`}
            >
              All Products
            </button>
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => updateFilter('category', category)}
                className={`text-left px-6 py-4 rounded-xl text-[11px] font-black uppercase tracking-widest transition-all duration-500 ${
                  filters.category === category 
                  ? 'bg-black text-white shadow-2xl translate-x-2' 
                  : 'text-gray-400 hover:text-black'
                }`}
              >
                {category}s
              </button>
            ))}
          </div>
        </div>

        {/* Brand Section */}
        <div className="space-y-6 border-t border-gray-50 pt-10">
          <label className="text-[10px] font-black text-gray-400 uppercase tracking-[0.3em]">Brand</label>
          <div className="flex flex-wrap gap-2">
            {brands.map((brand) => (
              <button
                key={brand}
                onClick={() => updateFilter('brand', filters.brand === brand ? '' : brand)}
                className={`px-4 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all duration-500 border ${
                  filters.brand === brand 
                  ? 'bg-black border-black text-white shadow-xl' 
                  : 'bg-white border-gray-100 text-gray-400 hover:border-black hover:text-black'
                }`}
              >
                {brand}
              </button>
            ))}
          </div>
        </div>

        {/* Price Range Section */}
        <div className="space-y-6 border-t border-gray-50 pt-10">
          <label className="text-[10px] font-black text-gray-400 uppercase tracking-[0.3em]">Price Range (GHS)</label>
          <div className="flex items-center gap-4">
            <input 
              type="number"
              value={priceRange.min}
              onChange={(e) => handlePriceChange('min', e.target.value)}
              className="w-full px-4 py-4 bg-gray-50 border border-gray-100 rounded-xl text-xs font-black text-gray-900 focus:outline-none focus:border-black transition-all"
              placeholder="Min"
            />
            <span className="text-gray-300 font-black">/</span>
            <input 
              type="number"
              value={priceRange.max}
              onChange={(e) => handlePriceChange('max', e.target.value)}
              className="w-full px-4 py-4 bg-gray-50 border border-gray-100 rounded-xl text-xs font-black text-gray-900 focus:outline-none focus:border-black transition-all"
              placeholder="Max"
            />
          </div>
        </div>

        {/* Tech Specs Section */}
        <div className="space-y-8 border-t border-gray-50 pt-10">
          {rams.length > 0 && (
            <div className="space-y-4">
              <label className="text-[10px] font-black text-gray-400 uppercase tracking-[0.3em]">Memory / RAM</label>
              <div className="flex flex-wrap gap-2">
                {rams.map((ram) => (
                  <button
                    key={ram}
                    onClick={() => updateFilter('ram', filters.ram === ram ? '' : ram)}
                    className={`px-4 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest border transition-all duration-500 ${
                      filters.ram === ram ? 'bg-black border-black text-white shadow-xl' : 'bg-white border-gray-100 text-gray-400 hover:border-black hover:text-black'
                    }`}
                  >
                    {ram}
                  </button>
                ))}
              </div>
            </div>
          )}
          
          {storages.length > 0 && (
            <div className="space-y-4">
              <label className="text-[10px] font-black text-gray-400 uppercase tracking-[0.3em]">Storage / SSD</label>
              <div className="flex flex-wrap gap-2">
                {storages.map((st) => (
                  <button
                    key={st}
                    onClick={() => updateFilter('storage', filters.storage === st ? '' : st)}
                    className={`px-4 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest border transition-all duration-500 ${
                      filters.storage === st ? 'bg-black border-black text-white shadow-xl' : 'bg-white border-gray-100 text-gray-400 hover:border-black hover:text-black'
                    }`}
                  >
                    {st}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SearchFilter;