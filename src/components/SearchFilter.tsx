import React from 'react';
import { X } from 'lucide-react';
import { Filters } from '../types';

interface SearchFilterProps {
  filters: Filters;
  onFilterChange: (filters: Partial<Filters>) => void;
  onClearFilters: () => void;
}

const SearchFilter: React.FC<SearchFilterProps> = ({ 
  filters, 
  onFilterChange, 
  onClearFilters 
}) => {
  const brands = ['HP', 'Dell', 'Lenovo', 'Apple', 'ASUS', 'Acer', 'MSI', 'Microsoft'];
  const ramOptions = ['4GB', '8GB', '16GB', '32GB'];
  const storageOptions = ['SSD', 'HDD'];
  const conditionOptions = ['New', 'Used'];

  const handlePriceRangeChange = (index: number, value: number) => {
    const newPriceRange = [...filters.priceRange] as [number, number];
    newPriceRange[index] = value;
    onFilterChange({ priceRange: newPriceRange });
  };

  return (
    <div className="bg-muted/30 rounded-lg p-6">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold">Filters</h3>
        <button 
          onClick={onClearFilters}
          className="text-sm text-primary hover:underline flex items-center gap-1"
        >
          <X className="h-3 w-3" />
          Clear All
        </button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
        {/* Brand Filter */}
        <div>
          <label className="block text-sm font-medium mb-2">Brand</label>
          <select 
            className="w-full p-2 border rounded-md bg-background"
            value={filters.brand}
            onChange={(e) => onFilterChange({ brand: e.target.value })}
          >
            <option value="">All Brands</option>
            {brands.map(brand => (
              <option key={brand} value={brand}>{brand}</option>
            ))}
          </select>
        </div>
        
        {/* RAM Filter */}
        <div>
          <label className="block text-sm font-medium mb-2">RAM</label>
          <select 
            className="w-full p-2 border rounded-md bg-background"
            value={filters.ram}
            onChange={(e) => onFilterChange({ ram: e.target.value })}
          >
            <option value="">All RAM</option>
            {ramOptions.map(ram => (
              <option key={ram} value={ram}>{ram}</option>
            ))}
          </select>
        </div>
        
        {/* Storage Filter */}
        <div>
          <label className="block text-sm font-medium mb-2">Storage Type</label>
          <select 
            className="w-full p-2 border rounded-md bg-background"
            value={filters.storage}
            onChange={(e) => onFilterChange({ storage: e.target.value })}
          >
            <option value="">All Storage</option>
            {storageOptions.map(storage => (
              <option key={storage} value={storage}>{storage}</option>
            ))}
          </select>
        </div>
        
        {/* Condition Filter */}
        <div>
          <label className="block text-sm font-medium mb-2">Condition</label>
          <select 
            className="w-full p-2 border rounded-md bg-background"
            value={filters.condition}
            onChange={(e) => onFilterChange({ condition: e.target.value })}
          >
            <option value="">All Conditions</option>
            {conditionOptions.map(condition => (
              <option key={condition} value={condition}>{condition}</option>
            ))}
          </select>
        </div>
        
        {/* Price Range Filter */}
        <div>
          <label className="block text-sm font-medium mb-2">
            Price Range: ₵{filters.priceRange[0]} - ₵{filters.priceRange[1]}
          </label>
          <div className="space-y-2">
            <div>
              <label className="text-xs text-muted-foreground">Min: ₵{filters.priceRange[0]}</label>
              <input 
                type="range" 
                min="0" 
                max="10000" 
                step="500"
                value={filters.priceRange[0]}
                onChange={(e) => handlePriceRangeChange(0, Number(e.target.value))}
                className="w-full"
              />
            </div>
            <div>
              <label className="text-xs text-muted-foreground">Max: ₵{filters.priceRange[1]}</label>
              <input 
                type="range" 
                min="0" 
                max="10000" 
                step="500"
                value={filters.priceRange[1]}
                onChange={(e) => handlePriceRangeChange(1, Number(e.target.value))}
                className="w-full"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchFilter;