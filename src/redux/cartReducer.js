import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

const initialState = {
  cart: [],
  noOfItems: 0
}
const cartSlice = createSlice({
  name: "cart",
  initialState: initialState,
  reducers: {
    localCart: (state, action) => {
      state.cart = [...action.payload]
      state.noOfItems = state.cart.length;
    },
    addCart: (state, action) => {
      state.cart.push(action.payload);
      state.noOfItems += 1;
    },

    deleteFromCart: (state, action) => {
      const id = action.payload;
      const index = state.cart.findIndex((item) => item.id === id);
      if (index !== -1) {
        state.cart.splice(index, 1);
        window.localStorage.setItem("cartData", JSON.stringify([...state.cart]));
        state.noOfItems -= 1
      }

    },

    increaseQty: (state, action) => {
      const product = state.cart.find((item) => item.id === action.payload);
      if (product) {
        product.qty += 1;
      }
      state.product = product;
      toast.info('Extra item added', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    },
    decreaseQty: (state, action) => {
      const product = state.cart.find((item) => item.id === action.payload);
      if (product.qty === 1) {
        toast.warn('if you want to remove the item from cart please click on remove button', {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      }
      if (product && product.qty > 1) {
        product.qty -= 1;

        toast.info('One item removed', {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      }
      state.product = product;
    },
  }
});

export const cartReducer = cartSlice.reducer;
export const { localCart, addCart, deleteFromCart, increaseQty, decreaseQty } = cartSlice.actions;
export const cartSelector = (state) => state.cartReducer.cart;
