import { useState } from 'react';

export default function PasswordManagerForm() {
  const [hoveredCard, setHoveredCard] = useState(false);
  
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div 
        className={`bg-white rounded-lg p-8 w-full max-w-3xl transition-shadow duration-300 shadow-lg`}
      >
        <h2 className="text-3xl font-bold mb-4">Add new password</h2>
        <p className="text-xs text-gray-500 mb-12 max-w-2xl">
          Disclaimer: This application is for educational purposes only and lacks production-level security. Please do not enter actual or sensitive passwords. By using this site, you acknowledge that any consequences from entering real credentials are your own responsibility.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
          <div className="col-span-1">
            <label htmlFor="website" className="block text-lg font-medium mb-2">Website</label>
            <input 
              type="text" 
              id="website" 
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none"
            />
          </div>
          
          <div className="col-span-1">
            <label htmlFor="password" className="block text-lg font-medium mb-2">Password</label>
            <input 
              type="password" 
              id="password" 
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none"
            />
          </div>
          
          <div className="col-span-1">
            <label htmlFor="email" className="block text-lg font-medium mb-2">Email</label>
            <input 
              type="email" 
              id="email" 
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none"
            />
          </div>
          
          <div className="col-span-2 flex justify-end mt-8">
            <button className="bg-black text-white font-medium py-2 px-6 rounded-md">
              Add
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}