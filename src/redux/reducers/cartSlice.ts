import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// Define the type for a single cart item
type CartItem = {
  _id: string;
  name: string;
  price: number;
  image?: string;
  description?: string;
  quantity: number;
};

type CartState = {
  cart: CartItem[];
};

const initialState: CartState = {
  cart: [],
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    // Add an item to the cart or increase its quantity
    addToCart: (state, action: PayloadAction<CartItem>) => {
      const existingItem = state.cart.find((item) => item._id === action.payload._id);

      if (existingItem) {
        // If the item already exists, increase its quantity
        existingItem.quantity += action.payload.quantity;
      } else {
        // Add the item to the cart with the specified quantity
        state.cart.push(action.payload);
      }
    },

    // Remove an item from the cart
    removeFromCart: (state, action: PayloadAction<string>) => {
      // Remove the item directly based on its _id
      state.cart = state.cart.filter((item) => item._id !== action.payload);
    },
    

    // Reset the cart (clear all items)
    resetCart: (state) => {
      state.cart = [];
    },

    // Increase the quantity of an item
    increaseQuantity: (state, action: PayloadAction<string>) => {
      const itemIndex = state.cart.findIndex((item) => item._id === action.payload);

      if (itemIndex !== -1) {
        const item = state.cart[itemIndex];
        state.cart[itemIndex] = { ...item, quantity: item.quantity + 1 };
      }
    },

    // Decrease the quantity of an item
    decreaseQuantity: (state, action: PayloadAction<string>) => {
      const itemIndex = state.cart.findIndex((item) => item._id === action.payload);

      if (itemIndex !== -1) {
        const item = state.cart[itemIndex];

        if (item.quantity > 1) {
          state.cart[itemIndex] = { ...item, quantity: item.quantity - 1 };
        } else {
          // Remove the item if the quantity reaches 0
          state.cart.splice(itemIndex, 1);
        }
      }
    },
  },
});

// Export actions
export const { addToCart, removeFromCart, resetCart, increaseQuantity, decreaseQuantity } =
  cartSlice.actions;

// Export reducer
export default cartSlice.reducer;