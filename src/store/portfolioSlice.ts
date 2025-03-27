import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { PortfolioItem } from '@/lib/db';

interface PortfolioState {
  items: PortfolioItem[];
  loading: boolean;
  error: string | null;
}

const initialState: PortfolioState = {
  items: [],
  loading: false,
  error: null,
};

export const fetchPortfolioItems = createAsyncThunk(
  'portfolio/fetchItems',
  async () => {
    const response = await fetch('/api/portfolio');
    if (!response.ok) {
      throw new Error('Failed to fetch portfolio items');
    }
    return response.json();
  }
);

export const addPortfolioItem = createAsyncThunk(
  'portfolio/addItem',
  async (item: Omit<PortfolioItem, 'id'>) => {
    const response = await fetch('/api/portfolio', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(item),
    });
    if (!response.ok) {
      throw new Error('Failed to add portfolio item');
    }
    return response.json();
  }
);

const portfolioSlice = createSlice({
  name: 'portfolio',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPortfolioItems.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchPortfolioItems.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(fetchPortfolioItems.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch portfolio items';
      })
      .addCase(addPortfolioItem.fulfilled, (state, action) => {
        state.items.push(action.payload);
      });
  },
});

export default portfolioSlice.reducer; 