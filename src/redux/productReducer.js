import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';


const initialState = {
  products: [],
  sortedData: []
};

export const getInitialStateAsync = createAsyncThunk("products/getInitialState",
  (arg, thunkAPI) => {
    axios.get("https://my-json-server.typicode.com/Vagdevi-Bora/ECOM/Products")
      .then((res) => thunkAPI.dispatch(actions.add(res.data)));
  })

const productSlice = createSlice({
  name: "products",
  initialState: initialState,
  reducers: {
    add: (state, action) => {
      state.products = [...action.payload];
    },
    deleted: (state, action) => {
      const id = action.payload;
      const index1 = state.products.findIndex((item) => item.id === id);
      const index2 = state.sortedData.findIndex((item) => item.id === id);
      if (index1 !== -1) {
        state.products.splice(index1, 1);
        state.sortedData.splice(index2, 1);
      }
      toast.warn('item deleted', {
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
    addNew: (state, action) => {
      state.products = [...action.payload];
    },
    sortedProducts: (state, action) => {
      state.sortedData = [...state.products].sort((a, b) => a.price - b.price);
    },
  }
});
export const pdtReducer = productSlice.reducer;
export const actions = productSlice.actions;
export const pdtSelector = (state) => state.pdtReducer.products;
