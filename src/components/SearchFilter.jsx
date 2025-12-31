import { useState } from 'react';

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

  // Get unique conditions and normalize them
  const conditions = [...new Set(products.map(product => product.condition))]
    .filter(Boolean)
    .map(condition => condition.trim())
    .sort();

  const handlePriceChange = (type, value) => {
    const newPriceRange = { ...priceRange, [type]: value };
    setPriceRange(newPriceRange);
    updateFilter(`${type}Price`, value); // 'minPrice' or 'maxPrice'
  };

  const handleClearFilters = () => {
    setPriceRange({ min: 0, max: 30000 });
    clearFilters();
  };

  // Helper function to format condition display name
  const formatConditionDisplay = (condition) => {
    if (condition === 'NEW') return 'New';
    if (condition === 'UK_USED') return 'UK Used';
    if (condition === 'LOCAL_USED') return 'Local Used';
    return condition;
  };

  return (
    <div className="bg-background-light-gray rounded-lg p-6 mb-6">
      <div className="flex flex-col sm:flex-row items-center justify-between mb-6 gap-4">
        <h2 className="text-xl font-semibold text-gray-900">Filter Products</h2>
        <div className="flex items-center gap-4 w-full sm:w-auto">
          <select
            className="px-3 py-2 border border-border-gray rounded-md focus:outline-none focus:ring-2 focus:ring-primary-blue focus:border-transparent text-sm w-full sm:w-auto"
            value={filters.sortBy}
            onChange={(e) => updateFilter('sortBy', e.target.value)}
          >
            <option value="price-asc">Price: Low to High</option>
            <option value="price-desc">Price: High to Low</option>
            <option value="newest">Newest First</option>
          </select>
          <button
            className="text-sm text-primary-blue hover:text-blue-700 focus:outline-none whitespace-nowrap"
            onClick={handleClearFilters}
          >
            Clear All
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
        {/* Category Filter */}
        <div>
          <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-1">
            Category
          </label>
          <select
            id="category"
            className="w-full px-3 py-2 border border-border-gray rounded-md focus:outline-none focus:ring-2 focus:ring-primary-blue focus:border-transparent"
            value={filters.category}
            onChange={(e) => updateFilter('category', e.target.value)}
          >
            <option value="">All Categories</option>
            {categories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
        </div>

        {/* Brand Filter */}
        <div>
          <label htmlFor="brand" className="block text-sm font-medium text-gray-700 mb-1">
            Brand
          </label>
          <select
            id="brand"
            className="w-full px-3 py-2 border border-border-gray rounded-md focus:outline-none focus:ring-2 focus:ring-primary-blue focus:border-transparent"
            value={filters.brand}
            onChange={(e) => updateFilter('brand', e.target.value)}
          >
            <option value="">All Brands</option>
            {brands.map((brand) => (
              <option key={brand} value={brand}>
                {brand}
              </option>
            ))}
          </select>
        </div>

        {/* RAM Filter - Only relevant where RAM exists */}
        <div>
          <label htmlFor="ram" className="block text-sm font-medium text-gray-700 mb-1">
            RAM
          </label>
          <select
            id="ram"
            className="w-full px-3 py-2 border border-border-gray rounded-md focus:outline-none focus:ring-2 focus:ring-primary-blue focus:border-transparent"
            value={filters.ram}
            onChange={(e) => updateFilter('ram', e.target.value)}
          >
            <option value="">All RAM</option>
            {rams.map((ram) => (
              <option key={ram} value={ram}>
                {ram}
              </option>
            ))}
          </select>
        </div>

        {/* Storage Filter */}
        <div>
          <label htmlFor="storage" className="block text-sm font-medium text-gray-700 mb-1">
            Storage
          </label>
          <select
            id="storage"
            className="w-full px-3 py-2 border border-border-gray rounded-md focus:outline-none focus:ring-2 focus:ring-primary-blue focus:border-transparent"
            value={filters.storage}
            onChange={(e) => updateFilter('storage', e.target.value)}
          >
            <option value="">All Storage</option>
            {storages.map((storage) => (
              <option key={storage} value={storage}>
                {storage}
              </option>
            ))}
          </select>
        </div>

        {/* Condition Filter */}
        <div>
          <label htmlFor="condition" className="block text-sm font-medium text-gray-700 mb-1">
            Condition
          </label>
          <select
            id="condition"
            className="w-full px-3 py-2 border border-border-gray rounded-md focus:outline-none focus:ring-2 focus:ring-primary-blue focus:border-transparent"
            value={filters.condition}
            onChange={(e) => updateFilter('condition', e.target.value)}
          >
            <option value="">All Conditions</option>
            {conditions.map((condition) => (
              <option key={condition} value={condition}>
                {formatConditionDisplay(condition)}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Price Range Slider */}
      <div className="mt-4">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Price Range: ₵{priceRange.min} - ₵{priceRange.max}
        </label>
        <div className="relative">
          <div className="h-2 bg-gray-200 rounded-full">
            <div
              className="absolute h-2 bg-primary-blue rounded-full"
              style={{
                left: `${(priceRange.min / 30000) * 100}%`,
                width: `${((priceRange.max - priceRange.min) / 30000) * 100}%`
              }}
            ></div>
          </div>
          <input
            type="range"
            min="0"
            max="30000"
            step="100"
            value={priceRange.min}
            onChange={(e) => handlePriceChange('min', e.target.value)}
            className="absolute w-full h-2 opacity-0 cursor-pointer"
            style={{ zIndex: 2 }}
          />
          <input
            type="range"
            min="0"
            max="30000"
            step="100"
            value={priceRange.max}
            onChange={(e) => handlePriceChange('max', e.target.value)}
            className="absolute w-full h-2 opacity-0 cursor-pointer"
            style={{ zIndex: 1 }}
          />
        </div>
      </div>
    </div>
  );
};

export default SearchFilter;