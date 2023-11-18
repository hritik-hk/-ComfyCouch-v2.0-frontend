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
import Notification from "./features/common/Notification";

const router = createBrowserRouter([
  {
    path: "/",
    element: <div>Welcome to Homepage</div>,
  },
  {
    path: "/products",
    element: <AllProducts />,
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
    element: <ProductDetails />,
  },
]);

function App() {
  return (
    <>
      <Notification />
      <CartSidebar />
      <RouterProvider router={router} />
    </>
  );
}

export default App;
