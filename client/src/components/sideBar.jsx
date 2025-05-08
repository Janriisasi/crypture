import React from 'react';
import { FolderIcon, KeyIcon, SettingsIcon, ListIcon, PenIcon } from 'lucide-react';

const Sidebar = ({ onCategoryChange }) => {
  const [activeCategory, setActiveCategory] = React.useState('all');

  const handleCategoryClick = (category) => {
    setActiveCategory(category);
    onCategoryChange(category);
  };

  return (
    <div className="h-screen w-64 bg-sidebar fixed left-0 top-0 border-r border-sidebar-border">
      <div className="p-4">
        <div className="flex items-center space-x-2 mb-8">
          <KeyIcon className="text-vault-blue h-6 w-6" />
          <h1 className="text-xl font-bold text-vault-blue">Secure Vault</h1>
        </div>

        <div className="mb-6">
          <button className="w-full bg-vault-blue text-white rounded-md py-2 px-4 flex items-center justify-center">
            <PenIcon className="h-4 w-4 mr-2" />
            New Password
          </button>
        </div>

        <nav>
          <div className="mb-2 text-sm font-medium text-gray-500">Categories</div>
          <ul className="space-y-1">
            <li>
              <button 
                onClick={() => handleCategoryClick('all')}
                className={`w-full text-left px-3 py-2 rounded-md flex items-center ${
                  activeCategory === 'all' 
                  ? 'bg-sidebar-accent text-vault-blue font-medium' 
                  : 'text-sidebar-foreground hover:bg-sidebar-accent/50'
                }`}
              >
                <ListIcon className="h-4 w-4 mr-3" />
                All Items
              </button>
            </li>
            <li>
              <button 
                onClick={() => handleCategoryClick('favorites')}
                className={`w-full text-left px-3 py-2 rounded-md flex items-center ${
                  activeCategory === 'favorites' 
                  ? 'bg-sidebar-accent text-vault-blue font-medium' 
                  : 'text-sidebar-foreground hover:bg-sidebar-accent/50'
                }`}
              >
                <ListIcon className="h-4 w-4 mr-3" />
                Favorites
              </button>
            </li>
            <li>
              <button 
                onClick={() => handleCategoryClick('website')}
                className={`w-full text-left px-3 py-2 rounded-md flex items-center ${
                  activeCategory === 'website' 
                  ? 'bg-sidebar-accent text-vault-blue font-medium' 
                  : 'text-sidebar-foreground hover:bg-sidebar-accent/50'
                }`}
              >
                <FolderIcon className="h-4 w-4 mr-3" />
                Websites
              </button>
            </li>
            <li>
              <button 
                onClick={() => handleCategoryClick('app')}
                className={`w-full text-left px-3 py-2 rounded-md flex items-center ${
                  activeCategory === 'app' 
                  ? 'bg-sidebar-accent text-vault-blue font-medium' 
                  : 'text-sidebar-foreground hover:bg-sidebar-accent/50'
                }`}
              >
                <FolderIcon className="h-4 w-4 mr-3" />
                Apps
              </button>
            </li>
            <li>
              <button 
                onClick={() => handleCategoryClick('card')}
                className={`w-full text-left px-3 py-2 rounded-md flex items-center ${
                  activeCategory === 'card' 
                  ? 'bg-sidebar-accent text-vault-blue font-medium' 
                  : 'text-sidebar-foreground hover:bg-sidebar-accent/50'
                }`}
              >
                <FolderIcon className="h-4 w-4 mr-3" />
                Payment Cards
              </button>
            </li>
          </ul>
        </nav>

        <div className="absolute bottom-0 left-0 right-0 p-4">
          <button className="w-full text-left px-3 py-2 rounded-md flex items-center text-sidebar-foreground hover:bg-sidebar-accent/50">
            <SettingsIcon className="h-4 w-4 mr-3" />
            Settings
          </button>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;