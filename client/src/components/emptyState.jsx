import React from 'react';
import { KeyIcon } from 'lucide-react';

const EmptyState = () => {
  return (
    <div className="flex flex-col items-center justify-center h-full py-16">
      <div className="bg-gray-100 p-4 rounded-full mb-4">
        <KeyIcon className="h-8 w-8 text-vault-grey" />
      </div>
      <h3 className="text-xl font-medium text-gray-900 mb-2">No passwords found</h3>
      <p className="text-gray-500 text-center max-w-sm mb-6">
        You don't have any passwords saved yet or none match your current filters.
      </p>
      <button className="bg-vault-blue text-white rounded-md py-2 px-4">
        Create Your First Password
      </button>
    </div>
  );
};

export default EmptyState;