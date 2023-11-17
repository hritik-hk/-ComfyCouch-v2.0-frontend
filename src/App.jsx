import "./App.css";
import AllProducts from "./pages/AllProducts";
import Login from "./features/auth/components/Login";
import Signup from "./features/auth/components/Signup";
import CartSidebar from "./features/cart/CartSidebar";
import Cart from "./features/cart/Cart";
import Checkout from "./pages/Checkout";
import ProductDetails from "./pages/ProductDetails";
import Protected from "./features/auth/components/Protected";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <Protected>
        <div>Welcome to Homepage</div>
      </Protected>
    ),
  },
  {
    path: "/products",
    element: (
      <Protected>
        <AllProducts />
      </Protected>
    ),
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/signup",
    element: <Signup />,
  },
  {
    path: "/cart",
    element: (
      <Protected>
        <Cart />
      </Protected>
    ),
  },
  {
    path: "/checkout",
    element: (
      <Protected>
        <Checkout />
      </Protected>
    ),
  },
  {
    path: "/product-detail/:productID/:variantID",
    element: (
      <Protected>
        <ProductDetails />
      </Protected>
    ),
  },
]);

function App() {
  return (
    <>
      <CartSidebar />
      <RouterProvider router={router} />
    </>
  );
}

export default App;
