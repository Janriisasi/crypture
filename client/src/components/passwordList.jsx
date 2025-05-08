import React from 'react';
import PasswordCard from './passwordCard';
import EmptyState from './emptyState';

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

// Sample password data
const mockPasswords = [
  {
    id: '1',
    title: 'Gmail Account',
    username: 'user@gmail.com',
    password: 'StrongPass123!',
    website: 'gmail.com',
    category: 'website',
    strength: 'strong',
    favorite: true,
    lastUpdated: '2 days ago',
  },
  {
    id: '2',
    title: 'Facebook',
    username: 'user.name',
    password: 'Fb@Pass456',
    website: 'facebook.com',
    category: 'website',
    strength: 'medium',
    favorite: false,
    lastUpdated: '2 weeks ago',
  },
  {
    id: '3',
    title: 'Netflix Account',
    username: 'user@example.com',
    password: 'Netflix2023',
    website: 'netflix.com',
    category: 'website',
    strength: 'medium',
    favorite: true,
    lastUpdated: '1 month ago',
  },
  {
    id: '4',
    title: 'Banking App',
    username: 'user.banking',
    password: 'Secure!Bank!123',
    category: 'app',
    strength: 'strong',
    favorite: true,
    lastUpdated: '3 days ago',
  },
  {
    id: '5',
    title: 'Twitter',
    username: 'twitteruser',
    password: 'tweet123',
    website: 'twitter.com',
    category: 'website',
    strength: 'weak',
    favorite: false,
    lastUpdated: '6 months ago',
  },
  {
    id: '6',
    title: 'Chase Credit Card',
    username: '****4567',
    password: 'CardPin1234',
    category: 'card',
    strength: 'medium',
    favorite: false,
    lastUpdated: '1 year ago',
  },
];

const PasswordList = ({ searchTerm, category }) => {
  // Filter passwords based on search term and category
  const filteredPasswords = mockPasswords.filter((password) => {
    const matchesSearch =
      password.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      password.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (password.website && password.website.toLowerCase().includes(searchTerm.toLowerCase()));

    const matchesCategory =
      category === 'all' ||
      (category === 'favorites' && password.favorite) ||
      password.category === category;

    return matchesSearch && matchesCategory;
  });

  if (filteredPasswords.length === 0) {
    return <EmptyState />;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {filteredPasswords.map((password) => (
        <PasswordCard key={password.id} password={password} />
      ))}
    </div>
  );
};

export default PasswordList;