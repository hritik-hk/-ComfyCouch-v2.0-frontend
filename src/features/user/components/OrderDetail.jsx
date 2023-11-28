import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";

export default function OrderDetail() {
  const { id } = useParams();
  const orders = useSelector((state) => state.user.userOrders);

  const [order, setOrder] = useState(null);

  useEffect(() => {
    const order = orders.find((order) => order.id == id);
    setOrder(order);
  }, [orders, id]);

  return (
    <>
      <div className="mx-auto">
        <div className="text-4xl font-medium text-center py-4">
          Orders Details
        </div>
        <div className="grid md:grid-cols-4 md:gap-y-2">
          {order &&
            order.cartItems.map((item) => {
              return (
                <div
                  key={item.variantID}
                  className="flex flex-col justify-center items-center py-6"
                >
                  <Link
                    to={`/product-detail/${item.productID}/${item.variantID}`}
                  >
                    <div className="h-64 w-80 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                      <img
                        src={item.thumbnail}
                        alt="image"
                        className="h-full w-full object-cover object-bottom"
                      />
                    </div>
                  </Link>
                  <div className="w-80">
                    <div>
                      <Link
                        to={`/product-detail/${item.productID}/${item.variantID}`}
                      >
                        <h3>{item.title}</h3>
                      </Link>
                    </div>
                    <div className="flex flex-1 items-end justify-between text-sm">
                      <div className="text-gray-500">Oty: {item.quantity}</div>
                      <p className="mt-1 text-sm text-gray-500">{item.brand}</p>
                    </div>
                    <p className="text-lg">Not yet Dispatched</p>
                  </div>
                </div>
              );
            })}
        </div>
      </div>
    </>
  );
}
