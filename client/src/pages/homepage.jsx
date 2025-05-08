import React, { useState } from 'react';
import Sidebar from '../components/sideBar';
import SearchBar from '../components/searchBar';
import PasswordList from '../components/passwordList';

const Homepage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const handleSearch = (term) => {
    setSearchTerm(term);
  };

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar onCategoryChange={handleCategoryChange} />
      <main className="flex-1 pl-64">
        <div className="container mx-auto px-4 py-6">
          <div className="mb-8">
            <h1 className="text-2xl font-bold mb-6">Password Manager</h1>
            <SearchBar onSearch={handleSearch} />
          </div>
          
          <div className="mb-6">
            <div className="flex justify-between items-center">
              <h2 className="text-lg font-medium">
                {selectedCategory === 'all' ? 'All Passwords' : 
                 selectedCategory === 'favorites' ? 'Favorite Passwords' : 
                 `${selectedCategory.charAt(0).toUpperCase() + selectedCategory.slice(1)} Passwords`}
              </h2>
              <div className="text-sm text-gray-500">
                Sort by: 
                <select className="ml-2 border-none bg-transparent focus:outline-none focus:ring-0 cursor-pointer">
                  <option>Title (A-Z)</option>
                  <option>Recently Updated</option>
                  <option>Strength</option>
                </select>
              </div>
            </div>
          </div>

          <PasswordList searchTerm={searchTerm} category={selectedCategory} />
        </div>
      </main>
    </div>
  );
};

export default Homepage;