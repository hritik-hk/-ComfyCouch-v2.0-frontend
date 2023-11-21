import { useDispatch, useSelector } from "react-redux";
import { updateCartAsync } from "../cartSlice";
import { Link } from "react-router-dom";
import { deleteInCartAsync } from "../cartSlice";

export default function Cart() {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.cartItems);

  const totalAmount = cartItems.reduce(
    (amount, item) => item.price * item.quantity + amount,
    0
  );
  const totalItems = cartItems.reduce(
    (total, item) => item.quantity + total,
    0
  );

  const handleQuantity = (e, item) => {
    dispatch(updateCartAsync({ ...item, quantity: +e.target.value }));
  };

  const handleDelete = (id) => {
    dispatch(deleteInCartAsync(id));
  };

  return (
    <>
      <div className="bla bla">
        <div className="lg:grid lg:gap-x-8 lg:gap-y-10 lg:grid-cols-4 mx-auto bg-white max-w-[1500px] px-4 sm:px-6 lg:px-8">
          <div className="sm:col-span-3 border-t border-gray-200 px-4 py-6 sm:px-6">
            <h1 className="text-4xl my-5 font-bold tracking-tight text-gray-900">
              Cart
            </h1>
            <div className="sm:h-2/3 sm:overflow-y-auto">
              <ul className="-my-6 divide-y divide-gray-200">
                {cartItems.map((item) => (
                  <li key={item.variantID} className="flex py-6 pr-7">
                    <Link
                      to={`/product-detail/${item.productID}/${item.variantID}`}
                    >
                      <div className="h-36 w-40 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                        <img
                          src={item.thumbnail}
                          alt="image"
                          className="h-full w-full object-cover object-center"
                        />
                      </div>
                    </Link>
                    <div className="ml-4 flex flex-1 flex-col">
                      <div>
                        <div className="flex justify-between text-base font-medium text-gray-900">
                          <Link
                            to={`/product-detail/${item.productID}/${item.variantID}`}
                          >
                            <h3>{item.title}</h3>
                          </Link>
                          <p className="ml-4">
                            ₹ {item.price.toLocaleString("en-IN")}
                          </p>
                        </div>
                        <p className="mt-1 text-sm text-gray-500">
                          {item.brand}
                        </p>
                      </div>
                      <div className="flex flex-1 items-end justify-between text-sm">
                        <div className="text-gray-500">
                          <label
                            htmlFor="quantity"
                            className="inline mr-5 text-sm font-medium leading-6 text-gray-900"
                          >
                            Qty
                          </label>
                          <select
                            value={item.quantity}
                            onChange={(e) => handleQuantity(e, item)}
                          >
                            <option value="1">1</option>
                            <option value="2">2</option>
                            <option value="3">3</option>
                            <option value="4">4</option>
                            <option value="5">5</option>
                          </select>
                        </div>

                        <div className="flex">
                          <button
                            type="button"
                            onClick={() => handleDelete(item.id)}
                            className="font-medium text-indigo-600 hover:text-indigo-500"
                          >
                            Remove
                          </button>
                        </div>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="hidden sm:block sm:mt-20 sm:h-2/5 bg-gray-100 px-4 py-6 sm:px-6">
            <div className="flex justify-between my-2 text-base font-medium text-gray-900">
              <p>Subtotal</p>
              <p>₹ {totalAmount.toLocaleString("en-IN")}</p>
            </div>
            <div className="flex justify-between my-2 text-base font-medium text-gray-900">
              <p>Total Items in Cart</p>
              <p>{totalItems} items</p>
            </div>
            <p className="mt-0.5 text-sm text-gray-500">
              Shipping and taxes calculated at checkout.
            </p>
            <Link to='/checkout'>
            <div className="mt-6">
              <div className="flex items-center justify-center rounded-md border border-transparent bg-orange-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-red-600">
                Checkout
              </div>
            </div>
            </Link>
            <div className="mt-6 flex justify-center text-center text-sm text-gray-500">
              <p>
                or{"  "}
                <Link
                  to="/products"
                  className="font-medium text-orange-600 hover:text-red-600"
                >
                  Continue Shopping
                  <span aria-hidden="true"> &rarr;</span>
                </Link>
              </p>
            </div>
          </div>
        </div>

        {/* For Mobile screens */}
        <div className="fixed bottom-0 w-full  sm:hidden bg-gray-100 px-6 py-2 sm:py-6 ">
          <div className="flex justify-between my-2 text-base font-medium text-gray-900">
            <p>Subtotal</p>
            <p>₹ {totalAmount.toLocaleString("en-IN")}</p>
          </div>
          <div className="flex justify-between my-2 text-base font-medium text-gray-900">
            <p>Total Items in Cart</p>
            <p>{totalItems} items</p>
          </div>
          <p className="mt-0.5 text-sm text-gray-500">
            Shipping and taxes calculated at checkout.
          </p>
          <Link to='/checkout'>
            <div className="mt-6">
              <div className="flex items-center justify-center rounded-md border border-transparent bg-orange-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-red-600">
                Checkout
              </div>
            </div>
          </Link>
          <div className="mt-6 flex justify-center text-center text-sm text-gray-500">
            <p>
              or{" "}
              <button
                type="button"
                className="font-medium text-orange-600 hover:text-red-600"
              >
                Continue Shopping
                <span aria-hidden="true"> &rarr;</span>
              </button>
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
