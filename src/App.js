import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { AllProducts } from './components/allProducts';
import Cart from "./components/cart";
import CreatePage from "./components/createPage";
import Navbar from "./components/navbar";

function App() {

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Navbar />,
      children: [
        { path: "/", element: <AllProducts /> },
        { path: "/add-to-cart", element: <Cart loading={false} /> },
        { path: "/add-a-product", element: <CreatePage /> },
      ],
    }
  ])

  return (
    <div className="App">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
