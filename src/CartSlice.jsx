import { createSlice } from '@reduxjs/toolkit';

export const CartSlice = createSlice({
  name: 'cart',
  initialState: {
    items: [], // Initialize items as an empty array
    totalQuantity: 0
  },
  reducers: {
    incrementCounter: (state) => {
      state.itemsCount += 1;
    },
    decrementCounter: (state) => {
      state.itemsCount -= 1;
    },
    addItem: (state, action) => {
      const { name, image, cost } = action.payload;
      const existingItem = state.items.find(item => item.name === name);
      if (existingItem) {
        existingItem.quantity++;
      } else {
        state.items.push({ name, image, cost, quantity: 1 });
      }
      state.totalQuantity = state.items.reduce((total, item) => total + item.quantity, 0);
    },
    removeItem: (state, action) => {
      state.items = state.items.filter(item => item.name !== action.payload);
      state.totalQuantity = state.items.reduce((total, item) => total + item.quantity, 0);
    },
    updateQuantity: (state, action) => {
      const { name, quantity } = action.payload;
      const itemToUpdate = state.items.find(item => item.name === name);
      if (itemToUpdate) {
        itemToUpdate.quantity = quantity;
      }
      // Update total quantity
      state.totalQuantity = state.items.reduce((total, item) => total + item.quantity, 0);
    },
  },
});

export const { addItem, removeItem, updateQuantity, incrementCounter, decrementCounter } = CartSlice.actions;

export default CartSlice.reducer;
