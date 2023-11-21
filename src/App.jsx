import "./App.css";
import AllProducts from "./pages/AllProducts";
import Login from "./features/auth/components/Login";
import Signup from "./features/auth/components/Signup";
import CartPage from "./pages/CartPage";
import Checkout from "./pages/Checkout";
import ProductDetails from "./pages/ProductDetails";
import Protected from "./features/auth/components/Protected";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Notification from "./features/common/Notification";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { fetchItemsByUserIdAsync } from "./features/cart/cartSlice";

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
        <CartPage />
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

  const dispatch= useDispatch()
  const user=useSelector(state=>state.auth.loggedInUser)

  useEffect(()=>{
    if(user) {
      dispatch(fetchItemsByUserIdAsync(user.id))
    }
  },[user])

  return (
    <>
      <Notification />
      <RouterProvider router={router} />
    </>
  );
}

export default App;
