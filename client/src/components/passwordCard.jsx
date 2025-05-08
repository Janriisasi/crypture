import React, { useState } from 'react';
import { Copy, Eye, EyeOff, Edit, Trash2 } from 'lucide-react';
import toast from 'react-hot-toast';

/**
 * @typedef {Object} PasswordItem
 * @property {string} id
 * @property {string} title
 * @property {string} username
 * @property {string} password
 * @property {string} [website]
 * @property {string} category
 * @property {'weak' | 'medium' | 'strong'} strength
 * @property {boolean} favorite
 * @property {string} lastUpdated
 */

const PasswordCard = ({ password, onEdit, onDelete }) => {
  const [showPassword, setShowPassword] = useState(false);
  
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  
  const copyToClipboard = (text, label = 'Copied!') => {
    navigator.clipboard.writeText(text)
      .then(() => {
        toast.success(label, {
          icon: '📋',
          style: {
            borderRadius: '8px',
            background: '#1a1a1a',
            color: '#fff',
          },
        });
      })
      .catch(() => {
        toast.error('Failed to copy!', {
          style: {
            borderRadius: '8px',
            background: '#b91c1c',
            color: '#fff',
          },
        });
      });
  };
  
  const renderPassword = () => {
    return showPassword ? password.password : '•'.repeat(Math.min(8, password.password.length));
  };

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-4 hover:shadow-md transition-shadow">
      <div className="flex justify-between items-start mb-2">
        <h3 className="font-medium text-gray-900">{password.title}</h3>
        <div className="flex space-x-1">
          <button 
            className="p-1 rounded-md hover:bg-gray-100" 
            title="Edit"
            onClick={() => onEdit(password)}
          >
            <Edit className="h-4 w-4 text-gray-500" />
          </button>
          <button 
            className="p-1 rounded-md hover:bg-gray-100" 
            title="Delete"
            onClick={() => onDelete(password.id)}
          >
            <Trash2 className="h-4 w-4 text-gray-500" />
          </button>
        </div>
      </div>
      
      <div className="text-sm text-gray-500 mb-4">
        {password.category.charAt(0).toUpperCase() + password.category.slice(1)}
        {password.website && ` • ${password.website}`}
      </div>

      <div className="space-y-3">
        <div>
          <div className="text-xs text-gray-500 mb-1">Username</div>
          <div className="flex justify-between items-center">
            <div className="text-sm truncate pr-2">{password.username}</div>
            <button 
              className="p-1 rounded-md hover:bg-gray-100" 
              title="Copy username"
              onClick={() => copyToClipboard(password.username, 'Username copied!')}
            >
              <Copy className="h-4 w-4 text-gray-500" />
            </button>
          </div>
        </div>

        <div>
          <div className="text-xs text-gray-500 mb-1">Password</div>
          <div className="flex justify-between items-center">
            <div className="text-sm font-mono">{renderPassword()}</div>
            <div className="flex">
              <button 
                className="p-1 rounded-md hover:bg-gray-100" 
                title="Toggle visibility"
                onClick={togglePasswordVisibility}
              >
                {showPassword ? (
                  <EyeOff className="h-4 w-4 text-gray-500" />
                ) : (
                  <Eye className="h-4 w-4 text-gray-500" />
                )}
              </button>
              <button 
                className="p-1 rounded-md hover:bg-gray-100" 
                title="Copy password"
                onClick={() => copyToClipboard(password.password, 'Password copied!')}
              >
                <Copy className="h-4 w-4 text-gray-500" />
              </button>
            </div>
          </div>
        </div>

        <div>
          <div className="flex justify-between text-xs text-gray-500">
            <span>Strength</span>
            <span>Last updated: {password.lastUpdated}</span>
          </div>
          <div className={`strength-meter ${
            password.strength === 'weak' ? 'strength-weak' : 
            password.strength === 'medium' ? 'strength-medium' : 'strength-strong'
          }`} style={{ width: password.strength === 'weak' ? '30%' : password.strength === 'medium' ? '70%' : '100%' }}></div>
        </div>
      </div>
    </div>
  );
};

export default PasswordCard;
