import Products from "./pages/Products";
import Login from "./features/auth/components/Login";
import Signup from "./features/auth/components/Signup";
import CartPage from "./pages/CartPage";
import Checkout from "./pages/Checkout";
import ProductDetails from "./pages/ProductDetails";
import Protected from "./features/auth/components/Protected";
import PageNotFound from "./pages/PageNotFound";
import OrderSuccessPage from "./pages/OrderSuccessPage";
import OrderDetail from "./features/order/components/OrderDetail";
import OrderHistory from "./features/order/components/OrderHistory";
import UserProfile from "./features/user/components/UserProfile";
import Logout from "./features/auth/components/Logout";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Notification from "./features/common/Notification";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { fetchItemsByUserIdAsync } from "./features/cart/cartSlice";
import { fetchLoggedInUserAsync } from "./features/user/userSlice";
import { checkAuthAsync } from "./features/auth/authSlice";
import { Link } from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <div>
        Welcome to Homepage
        <h2>
          <Link to="/products">Go to Products</Link>
        </h2>
      </div>
    ),
  },
  {
    path: "/products",
    element: <Products />,
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
  {
    path: "/order-success/:id",
    element: <OrderSuccessPage />,
  },
  {
    path: "/order/:id",
    element: (
      <Protected>
        <OrderDetail />
      </Protected>
    ),
  },
  {
    path: "/my-orders",
    element: (
      <Protected>
        <OrderHistory />
      </Protected>
    ),
  },
  {
    path: "/profile",
    element: (
      <Protected>
        <UserProfile />
      </Protected>
    ),
  },
  {
    path: "/logout",
    element: <Logout />,
  },
  {
    path: "*",
    element: <PageNotFound />,
  },
]);

function App() {
  const dispatch = useDispatch();
  const token = useSelector((state) => state.auth.loggedInUserToken);
  const userChecked = useSelector((state) => state.auth.userChecked);

  useEffect(() => {
    dispatch(checkAuthAsync());
  }, [dispatch]);

  useEffect(() => {
    if (token) {
      dispatch(fetchItemsByUserIdAsync());
      dispatch(fetchLoggedInUserAsync());
    } 
  }, [dispatch, token]);

  return (
    <>
      <Notification />
      {userChecked && <RouterProvider router={router} />}
    </>
  );
}

export default App;
