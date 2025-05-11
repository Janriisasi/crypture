import React from 'react';
import { useState, useRef, useEffect } from 'react';
import { Search, Plus, MoreVertical, Eye, Copy, Pin, Edit, Trash2, Check, X } from 'lucide-react';

export default function PasswordManager() {
  const [hoveredCard, setHoveredCard] = useState(null);
  const [openMenu, setOpenMenu] = useState(null);
  const [toast, setToast] = useState(null);
  const menuRef = useRef(null);
  
  // Sample password data
  const [passwordEntries, setPasswordEntries] = useState([
    { id: 1, site: 'Facebook', username: 'jane@gmail.com', password: 'password123', color: 'border-indigo-200 bg-indigo-50', pinned: false },
    { id: 2, site: 'Twitter', username: 'jane@gmail.com', password: 'password123', color: 'border-green-200 bg-green-50', pinned: false },
    { id: 3, site: 'Instagram', username: 'jane@gmail.com', password: 'password123', color: 'border-yellow-200 bg-yellow-50', pinned: false },
    { id: 4, site: 'LinkedIn', username: 'jane@gmail.com', password: 'password123', color: 'border-red-200 bg-red-50', pinned: false },
    { id: 5, site: 'GitHub', username: 'jane@gmail.com', password: 'password123', color: 'border-indigo-200 bg-indigo-50', pinned: false },
    { id: 6, site: 'Gmail', username: 'jane@gmail.com', password: 'password123', color: 'border-yellow-200 bg-yellow-50', pinned: false },
  ]);

  // Handle outside click to close menu
  useEffect(() => {
    function handleClickOutside(event) {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setOpenMenu(null);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [menuRef]);

  // Handle toast timeout
  useEffect(() => {
    if (toast) {
      const timer = setTimeout(() => {
        setToast(null);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [toast]);

  // Copy password to clipboard
  const copyPassword = (password) => {
    navigator.clipboard.writeText(password).then(() => {
      setToast({
        message: 'Password copied to clipboard!',
        type: 'success'
      });
    }).catch(() => {
      setToast({
        message: 'Failed to copy password.',
        type: 'error'
      });
    });
  };

  // Toggle pin status
  const togglePin = (id) => {
    // Get the current entry to determine if we're pinning or unpinning
    const currentEntry = passwordEntries.find(entry => entry.id === id);
    const isPinned = currentEntry?.pinned;

    setPasswordEntries(entries => 
      entries.map(entry => 
        entry.id === id ? { ...entry, pinned: !entry.pinned } : entry
      )
    );
    setOpenMenu(null);
    setToast({
      message: isPinned ? 'Password card unpinned successfully!' : 'Password card pinned successfully!',
      type: 'success'
    });
  };

  // Sort entries to show pinned items first
  const sortedEntries = [...passwordEntries].sort((a, b) => {
    if (a.pinned && !b.pinned) return -1;
    if (!a.pinned && b.pinned) return 1;
    return 0;
  });

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center">
      {/* Space at the top to push content down */}
      <div className="h-16 md:h-24"></div>

      {/* Main content container */}
      <div className="w-full flex flex-col items-center px-4 sm:px-6 md:px-8">
        {/* Logo */}
        <div className="mb-6 md:mb-8">
          <div className="text-4xl md:text-6xl font-bold flex items-center justify-center">
            {/* Replace this with your own image */}
            <img src="./src/assets/Logo.svg" alt="cryptore logo" className="h-16 md:h-24" />
          </div>
        </div>

        {/* Search Bar */}
        <div className="relative w-full max-w-3xl mb-6 md:mb-8">
          <input
            type="text"
            placeholder="Search..."
            className="w-full px-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-black focus:border-black transition-all duration-200"
          />
          <Search className="absolute right-4 top-2.5 text-gray-500" size={20} />
        </div>

        {/* Add New Button */}
        <div className="w-full max-w-3xl flex justify-end mb-4 md:mb-6 px-2 sm:px-0">
          <button className="bg-white p-2 rounded-md border border-gray-300 hover:bg-black hover:text-white transition-colors duration-200 cursor-pointer">
            <Plus size={20} />
          </button>
        </div>

        {/* Password Cards Grid */}
        <div className="w-full max-w-3xl grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 gap-3 md:gap-4 pb-10 px-2 sm:px-0">
          {sortedEntries.map((entry) => (
            <div
              key={entry.id}
              className={`rounded-lg border ${entry.color} p-3 md:p-4 aspect-square transition-all duration-200 relative ${
                hoveredCard === entry.id ? 'shadow-lg' : 'shadow-sm'
              }`}
              onMouseEnter={() => setHoveredCard(entry.id)}
              onMouseLeave={() => setHoveredCard(null)}
            >
              {/* Pin indicator */}
              {entry.pinned && (
                <div className="absolute left-2 md:left-3 top-2 md:top-3 text-green-500">
                  <Pin size={12} className="md:hidden" fill="currentColor" />
                  <Pin size={16} className="hidden md:block" fill="currentColor" />
                </div>
              )}
              
              {/* Menu icon */}
              <div 
                className="absolute right-2 md:right-3 top-2 md:top-3 text-gray-400 cursor-pointer hover:text-gray-600 z-10"
                onClick={(e) => {
                  e.stopPropagation();
                  setOpenMenu(openMenu === entry.id ? null : entry.id);
                }}
              >
                <MoreVertical size={12} className="md:hidden" />
                <MoreVertical size={16} className="hidden md:block" />
              </div>
              
              {/* Dropdown Menu */}
              {openMenu === entry.id && (
                <div 
                  ref={menuRef}
                  className="absolute right-2 md:right-3 top-6 md:top-8 bg-white rounded-md shadow-lg py-1 z-20 w-28 md:w-32 border border-gray-100 overflow-hidden"
                >
                  <button 
                    className="w-full text-left px-2 md:px-4 py-1 md:py-2 text-xs md:text-sm flex items-center gap-1 md:gap-2 hover:bg-green-50 hover:text-green-600 transition-colors duration-200 cursor-pointer"
                    onClick={() => togglePin(entry.id)}
                  >
                    <Pin size={12} className="md:hidden" /> 
                    <Pin size={14} className="hidden md:block" /> 
                    {entry.pinned ? 'Unpin' : 'Pin'}
                  </button>
                  <button className="w-full text-left px-2 md:px-4 py-1 md:py-2 text-xs md:text-sm flex items-center gap-1 md:gap-2 hover:bg-blue-50 hover:text-blue-600 transition-colors duration-200 cursor-pointer">
                    <Edit size={12} className="md:hidden" />
                    <Edit size={14} className="hidden md:block" /> 
                    Edit
                  </button>
                  <button className="w-full text-left px-2 md:px-4 py-1 md:py-2 text-xs md:text-sm flex items-center gap-1 md:gap-2 hover:bg-red-50 hover:text-red-600 transition-colors duration-200 cursor-pointer">
                    <Trash2 size={12} className="md:hidden" />
                    <Trash2 size={14} className="hidden md:block" /> 
                    Delete
                  </button>
                </div>
              )}
              
              {/* Content */}
              <div className="mt-2 md:mt-4 flex flex-col h-3/4 justify-between">
                <h2 className="text-base sm:text-lg md:text-xl font-bold truncate">{entry.site}</h2>
                
                <div className="space-y-1 md:space-y-2 mt-auto text-xs sm:text-sm">
                  <div>
                    <span className="font-bold">Username: </span>
                    <span className="text-gray-600 truncate block">{entry.username}</span>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex-1 min-w-0">
                      <span className="font-bold">Password: </span>
                      <span className="text-gray-600 truncate">{entry.password}</span>
                    </div>
                    
                    <div className="flex space-x-1 md:space-x-2 ml-1 md:ml-2">
                      <button className="text-gray-400 hover:text-gray-600 cursor-pointer">
                        <Eye size={14} />
                      </button>
                      <button 
                        className="text-gray-400 hover:text-blue-500 cursor-pointer"
                        onClick={() => copyPassword(entry.password)}
                      >
                        <Copy size={14} />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Toast notification */}
      {toast && (
        <div 
          className={`fixed bottom-4 right-4 px-4 py-2 rounded-md shadow-lg flex items-center gap-2 ${
            toast.type === 'success' ? 'bg-green-50 text-green-600 border border-green-600' : 
            'bg-red-50 text-red-600 border border-red-200'
          }`}
        >
          {toast.type === 'success' ? <Check size={16} /> : <X size={16} />}
          <span>{toast.message}</span>
        </div>
      )}

      {/* Avatar in top right - keeps absolute positioning */}
      <div className="absolute top-4 md:top-6 right-4 md:right-6">
        <div className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-black flex items-center justify-center text-white">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="12" cy="8" r="5" />
            <path d="M20 21v-2a7 7 0 0 0-14 0v2" />
          </svg>
        </div>
      </div>
    </div>
  );
}