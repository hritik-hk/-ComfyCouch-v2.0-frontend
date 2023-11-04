import "./App.css";
import AllProducts from "./pages/AllProducts";
import Login from "./features/auth/components/Login";
import Signup from "./features/auth/components/Signup";
import CartSidebar from "./features/cart/CartSidebar";
import Cart from "./features/cart/Cart";
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/",
    element: <div></div>,
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
    element: <Cart />,
  }
]);

function App() {
  return <>
      <CartSidebar />
      <RouterProvider router={router} />
  </>;
}

export default App;
