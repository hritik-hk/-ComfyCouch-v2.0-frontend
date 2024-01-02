import { Link } from "react-router-dom";
import { PlusIcon } from "@heroicons/react/24/outline";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { fetchLoggedInUserOrdersAsync } from "../../user/userSlice";
import { Bars } from "react-loader-spinner";

export default function OrderHistory() {
  const dispatch = useDispatch();
  const orders = useSelector((state) => state.user.userOrders);

  useEffect(() => {
    dispatch(fetchLoggedInUserOrdersAsync());
  }, [dispatch]);

  return (
    <>
      <div>
        <div className="mt-10 flex flex-col justify-center items-center">
          <h1 className="text-2xl font-semibold">Order history</h1>
          <ul>
            {orders == null ? (
              <div className="flex justify-center items-center w-full sm:col-span-3">
                <Bars
                  height="100"
                  width="100"
                  color="#f57242"
                  ariaLabel="bars-loading"
                  wrapperStyle={{}}
                  wrapperClass=""
                  visible={true}
                />
              </div>
            ) : (
              orders.map((order, index) => {
                return (
                  <li
                    key={index}
                    className="flex flex-col my-10 px-5 py-3 bg-gray-100"
                  >
                    <h2 className="text-lg font-semibold mb-2">
                      Not Dispatched Yet
                    </h2>
                    <div className="flex justify-between mb-2">
                      <h2 className="text-xl font-semibold">
                        Order ID: {order.id}
                      </h2>
                      <Link
                        to={`/order/${order.id}`}
                        className="text-blue-600 text-base font-medium"
                      >
                        View Order Details
                      </Link>
                    </div>
                    {/* Some details */}
                    <div className="flex justify-start">
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
                      <div className="mx-4">
                        <p className="font-medium">Delivery Date</p>
                        <p>{order.createdAt.substring(0, 10)}</p>
                      </div>
                    </div>
                    {/* list of products */}
                    <div className="flex">
                      {order.cartItems.slice(0, 5).map((item, index) => {
                        return (
                          <div
                            key={item.variantID}
                            className="flex flex-col justify-center items-center py-6 mx-4 relative"
                          >
                            {order.cartItems.length > 5 && index === 4 && (
                              <div className="h-full w-full absolute bg-black opacity-25 flex justify-center items-center px-2">
                                <div>
                                  <div className="text-white text-7xl inline-block">
                                    <PlusIcon className="h-16 w-16 text-white inline-block" />
                                    3
                                  </div>
                                  <p className="text-white text-6xl">more</p>
                                </div>
                              </div>
                            )}
                            <Link
                              to={`/product-detail/${item.productID}/${item.variantID}`}
                            >
                              <div className="h-52 w-64 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                                <img
                                  src={item.thumbnail}
                                  alt="image"
                                  className="h-full w-full object-cover object-bottom"
                                />
                              </div>
                            </Link>
                            <div className="w-64">
                              <div>
                                <Link
                                  to={`/product-detail/${item.productID}/${item.variantID}`}
                                >
                                  <h3>{item.title.substring(0, 30)}...</h3>
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
    </>
  );
}
