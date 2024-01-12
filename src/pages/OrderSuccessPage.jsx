import { CheckCircleIcon } from "@heroicons/react/24/solid";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, Navigate, useParams } from "react-router-dom";
import { resetCartAsync } from "../features/cart/cartSlice";
import { resetOrder } from "../features/order/orderSlice";
import Navbar from "../features/navbar/Navbar";
import Footer from "../features/common/Footer";

export default function OrderSuccessPage() {
  const params = useParams();
  const dispatch = useDispatch();

  const user = useSelector((state) => state.user.userInfo);

  useEffect(() => {
    //reset cart
    dispatch(resetCartAsync());
    //resent current order placed
    dispatch(resetOrder());
  }, [dispatch]);

  return (
    <>
      <Navbar />
      {!params.id && <Navigate to="/" replace={true} />}
     {user && <main className="grid min-h-full place-items-center bg-white px-6 py-24 sm:py-32 lg:px-8 md:mb-[230px]">
        <div className=" mx-auto flex flex-col items-center justify-center">
          <CheckCircleIcon className="h-24 w-24 text-orange-600" />

          <p className="text-xl font-semibold mt-4">Hey {user.name}.</p>
          <h1 className="mt-4 text-3xl text-center font-bold tracking-tight text-gray-900 sm:text-5xl">
            Your order is successfully placed.
          </h1>
          <h3 className="mt-4 text-xl text-center font-bold tracking-tight text-gray-900 sm:text-2xl">
            Order Id: {params.id}
          </h3>
          <p className="mt-1 text-normal leading-7 text-gray-600">{`My Account > Orders`}</p>
          <div className="mt-10 flex items-center justify-center gap-x-6">
            <Link
              to="/my-orders"
              replace
              className="rounded-md bg-orange-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-red-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Go to Your Orders
            </Link>
          </div>
        </div>
      </main>}
      <Footer hiddenForSm={false} />
    </>
  );
}
