import React, { useState } from 'react';
import { SearchIcon } from '../../assets/icons';

const SearchBar: React.FC = () => {
  const [searchValue, setSearchValue] = useState('');
  const [isFocused, setIsFocused] = useState(false);

  return (
    <div className="relative search-bar">
      <div className="header-component flex items-center justify-between w-[470px] h-14">
        <input
          type="text"
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          placeholder="Search here..."
          className="flex-1 bg-transparent text-base font-medium text-black placeholder-black/40 focus:outline-none"
        />
        <SearchIcon 
          size={31} 
          color="#292D32"
        />
      </div>
      
      {/* Search suggestions dropdown */}
      {searchValue && isFocused && (
        <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-neutral-200 rounded-lg shadow-lg z-50">
          <div className="p-3 text-sm text-neutral-500">
            Search suggestions will appear here...
          </div>
        </div>
      )}
    </div>
  );
};

export default SearchBar;