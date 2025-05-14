import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';

export default function Formpage() {
  const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState(false);
  const [entryId, setEntryId] = useState(null);
  
  const currentUser = JSON.parse(localStorage.getItem('user'));

  const colorOptions = [
    'border-indigo-200 bg-indigo-50',
    'border-green-200 bg-green-50',
    'border-yellow-200 bg-yellow-50',
    'border-red-200 bg-red-50',
    'border-blue-200 bg-blue-50',
    'border-purple-200 bg-purple-50'
  ];

  const [formData, setFormData] = useState({
    website: '', 
    email: '', 
    password: '',
    color: ''
  });

  useEffect(() => {
    const editEntry = localStorage.getItem('editEntry');
    if (editEntry) {
      const entry = JSON.parse(editEntry);
      setFormData({
        website: entry.website || '',
        email: entry.email || '',
        password: entry.password || '',
        color: entry.color || colorOptions[Math.floor(Math.random() * colorOptions.length)]
      });
      setEntryId(entry.id);
      setIsEditing(true);
      localStorage.removeItem('editEntry');
    } else {
      setFormData(prev => ({
        ...prev,
        color: colorOptions[Math.floor(Math.random() * colorOptions.length)]
      }));
    }
  }, []);

  const handleAdd = () => {
    if (!formData.website || !formData.email || !formData.password) {
      alert("Please fill in all fields");
      return;
    }

    if (!currentUser || !currentUser.email) {
      alert("You must be logged in to save passwords");
      navigate('/');
      return;
    }

    const existing = JSON.parse(localStorage.getItem("passwords")) || [];

    if (isEditing) {
      const updated = existing.map(entry => 
        entry.id === entryId ? 
        { ...entry, ...formData } : entry
      );
      localStorage.setItem("passwords", JSON.stringify(updated));
      setIsEditing(false);
      setEntryId(null);
      navigate('/homepage?action=edited');
    } else {
      const newEntry = {
        ...formData,
        id: Date.now(),
        userEmail: currentUser.email,
        pinned: false
      };
      const updated = [...existing, newEntry];
      localStorage.setItem("passwords", JSON.stringify(updated));
      navigate('/homepage?action=added');
    }

    setFormData({ website: '', email: '', password: '', color: '' });
  };

  const handleCancel = () => {
    setIsEditing(false);
    setEntryId(null);
    navigate('/homepage');
  };

  return (
    <motion.div
      initial={{ y: 30, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      exit={{ y: -30, opacity: 0 }}
      transition={{ duration: 0.4, ease: "easeIn" }}
    >
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg p-8 w-full max-w-3xl shadow-lg">
        <h2 className="text-4xl font-bold mb-2">{isEditing ? 'Edit password' : 'Add new password'}</h2>
        <p className="text-base text-gray-500 mb-12 max-w-2xl">
          Disclaimer: This application is for educational purposes only and lacks production-level security. Please do not enter actual or sensitive passwords.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
          <div className="col-span-1">
            <label className="block text-lg font-medium mb-2">Website</label>
            <input 
              type="text" 
              value={formData.website}
              onChange={(e) => setFormData({...formData, website: e.target.value})}
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-black"
              placeholder="e.g. Facebook"
            />
          </div>

          <div className="col-span-1">
            <label className="block text-lg font-medium mb-2">Password</label>
            <input 
              type="password"  
              value={formData.password}
              onChange={(e) => setFormData({...formData, password: e.target.value})}
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-black"
              placeholder="Your password"
            />
          </div>

          <div className="col-span-1">
            <label className="block text-lg font-medium mb-2">Email</label>
            <input 
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({...formData, email: e.target.value})}
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-black"
              placeholder="your.email@example.com"
            />
          </div>

          <div className="col-span-1">
            <label className="block text-lg font-medium mb-2">Card Color</label>
            <div className="grid grid-cols-6 gap-2">
              {colorOptions.map((color, index) => (
                <div 
                  key={index}
                  className={`h-8 w-8 rounded-full cursor-pointer ${color} border-2 ${formData.color === color ? 'ring-2 ring-black' : ''}`} 
                  onClick={() => setFormData({...formData, color})}
                />
              ))}
            </div>
          </div>

          <div className="col-span-2 flex justify-end mt-8 gap-4">
            {isEditing && (
              <button 
                className="bg-gray-200 text-gray-800 font-medium py-2 px-6 rounded-lg hover:bg-gray-300"
                onClick={handleCancel}
              >
                Cancel
              </button>
            )}
            <button 
              className="bg-black text-white font-medium py-2 px-6 rounded-lg hover:bg-gray-800"
              onClick={handleAdd}
            >
              {isEditing ? 'Save Changes' : 'Add'}
            </button>
          </div>

          {/* Avatar */}
          <div className="absolute top-4 md:top-6 right-4 md:right-6">
            <div className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-black flex items-center justify-center text-white">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="12" cy="8" r="5" />
                <path d="M20 21v-2a7 7 0 0 0-14 0v2" />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </div>
    </motion.div>
  );
}
