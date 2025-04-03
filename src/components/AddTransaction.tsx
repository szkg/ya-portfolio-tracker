import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '@/store/store';
import { addPortfolioItem } from '@/store/portfolioSlice';

interface AddTransactionProps {
  onClose: () => void;
  transactionType: 'buy' | 'sell';
}

export default function AddTransaction({ onClose, transactionType }: AddTransactionProps) {
  const dispatch = useDispatch<AppDispatch>();
  const [formData, setFormData] = useState({
    ticker: '',
    name: '',
    count: '',
    holdingValue: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(addPortfolioItem({
      ticker: formData.ticker,
      name: formData.name,
      count: parseFloat(formData.count),
      holdingValue: parseFloat(formData.holdingValue),
      transactionType
    }));
    setFormData({ ticker: '', name: '', count: '', holdingValue: '' });
    onClose();
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="ticker">
          Ticker
        </label>
        <input
          type="text"
          id="ticker"
          value={formData.ticker}
          onChange={(e) => setFormData({ ...formData, ticker: e.target.value })}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          required
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
          Name
        </label>
        <input
          type="text"
          id="name"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          required
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="count">
          Count
        </label>
        <input
          type="number"
          id="count"
          value={formData.count}
          onChange={(e) => setFormData({ ...formData, count: e.target.value })}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          step="any"
          required
        />
      </div>
      <div className="mb-6">
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="holdingValue">
          Holding Value
        </label>
        <input
          type="number"
          id="holdingValue"
          value={formData.holdingValue}
          onChange={(e) => setFormData({ ...formData, holdingValue: e.target.value })}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          step="any"
          required
        />
      </div>
      <div className="flex justify-end space-x-4">
        <button
          type="button"
          onClick={onClose}
          className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          {transactionType === 'buy' ? 'Buy' : 'Sell'}
        </button>
      </div>
    </form>
  );
} 