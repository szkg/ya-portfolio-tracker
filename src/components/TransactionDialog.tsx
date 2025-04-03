import { useState } from 'react';
import AddTransaction from './AddTransaction';

interface TransactionDialogProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function TransactionDialog({ isOpen, onClose }: TransactionDialogProps) {
  const [activeTab, setActiveTab] = useState('buy');

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-6 rounded-lg w-full max-w-md">
        <h2 className="text-2xl font-bold mb-4">Add New Transaction</h2>
        
        {/* Tabs */}
        <div className="border-b border-gray-200 mb-4">
          <nav className="-mb-px flex space-x-8">
            <button
              onClick={() => setActiveTab('buy')}
              className={`${
                activeTab === 'buy'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
            >
              Buy
            </button>
            <button
              onClick={() => setActiveTab('sell')}
              className={`${
                activeTab === 'sell'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
            >
              Sell
            </button>
          </nav>
        </div>

        {/* Tab Content */}
        <div className="mt-4">
          {activeTab === 'buy' && <AddTransaction onClose={onClose} transactionType="buy" />}
          {activeTab === 'sell' && <AddTransaction onClose={onClose} transactionType="sell" />}
          
        </div>
      </div>
    </div>
  );
}