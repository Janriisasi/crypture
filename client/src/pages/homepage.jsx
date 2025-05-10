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
    { id: 2, site: 'Facebook', username: 'jane@gmail.com', password: 'password123', color: 'border-green-200 bg-green-50', pinned: false },
    { id: 3, site: 'Facebook', username: 'jane@gmail.com', password: 'password123', color: 'border-yellow-200 bg-yellow-50', pinned: false },
    { id: 4, site: 'Facebook', username: 'jane@gmail.com', password: 'password123', color: 'border-red-200 bg-red-50', pinned: false },
    { id: 5, site: 'Facebook', username: 'jane@gmail.com', password: 'password123', color: 'border-indigo-200 bg-indigo-50', pinned: false },
    { id: 6, site: 'Facebook', username: 'jane@gmail.com', password: 'password123', color: 'border-yellow-200 bg-yellow-50', pinned: false },
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
    setPasswordEntries(entries => 
      entries.map(entry => 
        entry.id === id ? { ...entry, pinned: !entry.pinned } : entry
      )
    );
    setOpenMenu(null);
    setToast({
      message: 'Password card pinned successfully!',
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
      <div className="h-27"></div>

      {/* Main content container */}
      <div className="w-full flex flex-col items-center">
        {/* Logo */}
        <div className="mb-8">
          <div className="text-6xl font-bold flex items-center justify-center">
            {/* Replace this with your own image */}
            <img src="./src/assets/Logo.svg" alt="cryptore logo" className="h-24" />
          </div>
        </div>

        {/* Search Bar */}
        <div className="relative w-full max-w-3xl mb-8">
          <input
            type="text"
            placeholder="Search..."
            className="w-full px-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-black focus:border-black transition-all duration-200"
          />
          <Search className="absolute right-4 top-2.5 text-gray-500" size={20} />
        </div>

        {/* Add New Button */}
        <div className="w-full max-w-3xl flex justify-end mb-6">
          <button className="bg-white p-2 rounded-md border border-gray-300 hover:bg-black hover:text-white transition-colors duration-200 cursor-pointer">
            <Plus size={20} />
          </button>
        </div>

        {/* Password Cards Grid */}
        <div className="w-full max-w-3xl grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 gap-4 pb-10">
          {sortedEntries.map((entry) => (
            <div
              key={entry.id}
              className={`rounded-lg border ${entry.color} p-4 aspect-square transition-all duration-200 relative ${
                hoveredCard === entry.id ? 'shadow-lg' : 'shadow-sm'
              }`}
              onMouseEnter={() => setHoveredCard(entry.id)}
              onMouseLeave={() => setHoveredCard(null)}
            >
              {/* Pin indicator */}
              {entry.pinned && (
                <div className="absolute left-3 top-3 text-green-500">
                  <Pin size={16} fill="currentColor" />
                </div>
              )}
              
              {/* Menu icon */}
              <div 
                className="absolute right-3 top-3 text-gray-400 cursor-pointer hover:text-gray-600 z-10"
                onClick={(e) => {
                  e.stopPropagation();
                  setOpenMenu(openMenu === entry.id ? null : entry.id);
                }}
              >
                <MoreVertical size={16} />
              </div>
              
              {/* Dropdown Menu */}
              {openMenu === entry.id && (
                <div 
                  ref={menuRef}
                  className="absolute right-3 top-8 bg-white rounded-md shadow-lg py-1 z-20 w-32 border border-gray-100 overflow-hidden"
                  style={{ animation: 'fadeIn 0.2s ease-out' }}
                >
                  <button 
                    className="w-full text-left px-4 py-2 text-sm flex items-center gap-2 hover:bg-green-50 hover:text-green-600 transition-colors duration-200 cursor-pointer"
                    onClick={() => togglePin(entry.id)}
                  >
                    <Pin size={14} /> {entry.pinned ? 'Unpin' : 'Pin'}
                  </button>
                  <button className="w-full text-left px-4 py-2 text-sm flex items-center gap-2 hover:bg-blue-50 hover:text-blue-600 transition-colors duration-200 cursor-pointer">
                    <Edit size={14} /> Edit
                  </button>
                  <button className="w-full text-left px-4 py-2 text-sm flex items-center gap-2 hover:bg-red-50 hover:text-red-600 transition-colors duration-200 cursor-pointer">
                    <Trash2 size={14} /> Delete
                  </button>
                </div>
              )}
              
              {/* Content */}
              <div className="mt-4 flex flex-col h-3/4 justify-between">
                <h2 className="text-xl font-bold">{entry.site}</h2>
                
                <div className="space-y-2 mt-auto text-sm">
                  <div>
                    <span className="font-bold">Username: </span>
                    <span className="text-gray-600">{entry.username}</span>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="font-bold">Password: </span>
                      <span className="text-gray-600">{entry.password}</span>
                    </div>
                    
                    <div className="flex space-x-2">
                      <button className="text-gray-400 hover:text-gray-600 cursor-pointer">
                        <Eye size={16} />
                      </button>
                      <button 
                        className="text-gray-400 hover:text-blue-500 cursor-pointer"
                        onClick={() => copyPassword(entry.password)}
                      >
                        <Copy size={16} />
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
      <div className="absolute top-6 right-6">
        <div className="w-10 h-10 rounded-full bg-black flex items-center justify-center text-white">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="12" cy="8" r="5" />
            <path d="M20 21v-2a7 7 0 0 0-14 0v2" />
          </svg>
        </div>
      </div>
    </div>
  );
}