import Navbar from "../../navbar/Navbar";
import Footer from "../../common/Footer";
import { Link } from "react-router-dom";
import { PlusIcon } from "@heroicons/react/24/solid";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { fetchLoggedInUserOrdersAsync } from "../../user/userSlice";
import { ColorRing } from "react-loader-spinner";
import noOrders from "../../../assets/no-orders.jpg";

export default function OrderHistory() {
  const dispatch = useDispatch();
  const orders = useSelector((state) => state.user.userOrders);
  const status = useSelector((state) => state.user.status);

  useEffect(() => {
    dispatch(fetchLoggedInUserOrdersAsync());
  }, [dispatch]);

  return (
    <>
      <Navbar />
      <div className="mt-[70px]">
        <div className="mt-10 flex flex-col justify-center items-center">
          <h1 className="text-3xl font-semibold">Order history</h1>
          <ul className="sm:mb-[250px]">
            {status === "loading" ? (
              <div className="h-[65vh] flex justify-center items-center w-full sm:col-span-3">
                <ColorRing
                  height="100"
                  width="100"
                  wrapperStyle={{}}
                  wrapperClass="color-ring-wrapper"
                  visible={true}
                  colors={[
                    "#e15b64",
                    "#f47e60",
                    "#f8b26a",
                    "#abbd81",
                    "#849b87",
                  ]}
                />
              </div>
            ) : orders.length == 0 ? (
              <div className="h-[75vh] w-full flex justify-center items-center">
                <img 
                src={noOrders} 
                className="h-1/2 w-fit rounded-lg"
                alt="no orders" />
              </div>
            ) : (
              orders.map((order, index) => {
                return (
                  <li
                    key={index}
                    className="flex flex-col my-10 px-5 py-3 bg-gray-100"
                  >
                    <h2 className="text-sm md:text-lg font-semibold mb-2">
                      Not Dispatched Yet
                    </h2>
                    <div className="flex justify-between mb-2">
                      <h2 className="md:text-xl font-semibold">
                        Order ID: {order.id}
                      </h2>
                      <Link
                        to={`/order/${order.id}`}
                        className="text-blue-600 text-sm sm:text-base font-semibold"
                      >
                        View Order Details
                      </Link>
                    </div>
                    {/* Some details */}
                    <div className="flex justify-start text-sm md:text-base">
                      <div className="mr-4">
                        <p className="font-medium">Date of Order</p>
                        <p>{order.createdAt.substring(0, 10)}</p>
                      </div>
                      <div className="mx-4">
                        <p className="font-medium">Total Cost</p>
                        <p>₹ {order.totalAmount.toLocaleString("en-IN")}</p>
                      </div>
                      <div className="mx-4">
                        <p className="font-medium">Payment Status</p>
                        <p>{order.paymentStatus}</p>
                      </div>
                    </div>
                    {/* list of products */}
                    <div className="flex justify-evenly sm:justify-start flex-wrap">
                      {order.cartItems.slice(0, 4).map((item, index) => {
                        return (
                          <div
                            key={item.variantID}
                            className="flex flex-col justify-center items-center my-2 mx-2 sm:my-6 sm:mx-4 relative"
                          >
                            {order.cartItems.length > 4 && index === 3 && (
                              
                              <div className="h-full w-full absolute">
                              <div className="h-full w-full absolute bg-black opacity-25 px-2" />
                                <div className="h-full w-full flex flex-col justify-center items-center">
                                  <div className="text-white text-5xl font-medium sm:text-7xl inline-block">
                                    <PlusIcon className="h-10 w-10 sm:h-16 sm:w-16 text-white inline-block" />
                                    {order.cartItems.length-4}
                                  </div>
                                  <p className="text-white text-4xl font-medium sm:text-6xl">more</p>
                                </div>
                                </div>
                             
                            )}
                            <Link
                              to={`/product-detail/${item.productID}/${item.variantID}`}
                            >
                              <div className="h-32 w-36 sm:h-52 sm:w-64 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                                <img
                                  src={item.thumbnail}
                                  alt="image"
                                  className="h-full w-full object-cover object-bottom"
                                />
                              </div>
                            </Link>
                            <div className="w-36 sm:w-64">
                              <div>
                                <Link
                                  to={`/product-detail/${item.productID}/${item.variantID}`}
                                >
                                  <h3 className="hidden sm:block">{item.title.substring(0, 30)}...</h3>
                                  <h3 className="sm:hidden text-xs">{item.title.substring(0, 20)}...</h3>
                                </Link>
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </li>
                );
              })
            )}
          </ul>
        </div>
      </div>
      <Footer hiddenForSm={false} />
    </>
  );
}
