import React from 'react';
import { useState } from 'react';

export default function Formpage() {
  const [hoveredCard, setHoveredCard] = useState(false);
  
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div 
        className={`bg-white rounded-lg p-8 w-full max-w-3xl transition-shadow duration-300 shadow-lg`}
      >
        <h2 className="text-4xl font-bold mb-2">Add new password</h2>
        <p className="text-base text-gray-500 mb-12 max-w-2xl">
          Disclaimer: This application is for educational purposes only and lacks production-level security. Please do not enter actual or sensitive passwords. By using this site, you acknowledge that any consequences from entering real credentials are your own responsibility.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
          <div className="col-span-1">
            <label htmlFor="website" className="block text-lg font-medium mb-2">Website</label>
            <input 
              type="text" 
              id="website" 
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-black"
            />
          </div>
          
          <div className="col-span-1">
            <label htmlFor="password" className="block text-lg font-medium mb-2">Password</label>
            <input 
              type="password" 
              id="password" 
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-black"
            />
          </div>
          
          <div className="col-span-1">
            <label htmlFor="email" className="block text-lg font-medium mb-2">Email</label>
            <input 
              type="email" 
              id="email" 
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-black"
            />
          </div>
          
          <div className="col-span-2 flex justify-end mt-8">
            <button className="bg-black text-white font-medium py-2 px-6 rounded-lg cursor-pointer">
              Add
            </button>
          </div>

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
      </div>
    </div>
  );
}