import Navbar from "../features/navbar/Navbar";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import StarRatings from "react-star-ratings";
import { RadioGroup, Disclosure } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/24/outline";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchProductByIdAsync,
  updateProductAsync,
} from "../features/product/productSlice";
import { ColorRing } from "react-loader-spinner";
import { useNavigate } from "react-router-dom";
import { fetchVariantIdByColor } from "../features/product/productAPI";
import { addToCartAsync } from "../features/cart/cartSlice";
import { displayNotification } from "../utils/displayNotification";
import Footer from "../features/common/Footer";
import { useForm } from "react-hook-form";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function ProductDetails() {
  const params = useParams();

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm();

  const [show, setShow] = useState(false);

  const selectedProduct = useSelector((state) => state.product.selectedProduct);
  const userCart = useSelector((state) => state.cart.cartItems);
  const status = useSelector((state) => state.product.status);
  const token = useSelector((state) => state.auth.loggedInUserToken);
  const error = useSelector((state) => state.cart.error);
  const userInfo = useSelector((state) => state.user.userInfo);

  const [selectedColor, setSelectedColor] = useState(null);
  const [selectedImg, setSelectedImg] = useState(null);
  const [breadcrumbs, setBreadcrumbs] = useState([]);
  const [userRating, setUserRating] = useState(0);

  // fetch product details
  useEffect(() => {
    dispatch(fetchProductByIdAsync(params));
  }, [dispatch, params]);

  //initalize states, variables
  useEffect(() => {
    if (selectedProduct) {
      setSelectedImg(selectedProduct.selectedVariant.images[0]);
      setBreadcrumbs([{ id: 1, name: selectedProduct.category, href: "#" }]);
      const color = selectedProduct.productDetail.colors.find(
        (item) => item.color === selectedProduct.selectedVariant.color
      );
      if (color) {
        setSelectedColor(color.thumbnail);
      }
    }
  }, [selectedProduct]);

  useEffect(() => {
    if (
      selectedProduct &&
      userCart.find(
        (item) => item.variantID === selectedProduct.selectedVariant.variant_id
      )
    ) {
      setShow(true);
    } else {
      setShow(false);
    }
  }, [userCart, selectedProduct]);

  // useEffect(() => {
  //   register({ name: "rating" }, { value: userRating }); // Register the hidden input field(star rating) with the form
  // }, [userRating, register]);

  async function handleColor(productID, color) {
    const { variant_id } = await fetchVariantIdByColor(productID, color);
    navigate(`/product-detail/${productID}/${variant_id}`);
  }

  function handleAddToCart(e) {
    e.preventDefault();

    //throw error if you not logged in
    if (token === null) {
      displayNotification("Pls login to add items to cart", "error");
      return;
    }
    const variant = selectedProduct.selectedVariant;
    const cartItem = {
      title: variant.title,
      productID: variant.product_id,
      variantID: variant.variant_id,
      thumbnail: variant.thumbnail,
      color: variant.color,
      price: variant.price,
      brand: variant.brand,
      quantity: 1,
    };
    dispatch(addToCartAsync(cartItem));

    if (error) {
      displayNotification("something went wrong, plz try again", "error");
    }
  }

  async function addReview(review) {
    const updatedProduct = {
      ...selectedProduct.productDetail,
      customerReviews: [
        review,
        ...selectedProduct.productDetail.customerReviews,
      ],
    };
    dispatch(updateProductAsync(updatedProduct));
    dispatch(fetchProductByIdAsync(params));
  }

  return (
    <>
      <Navbar />
      {status === "loading" ? (
        <div className="mt-[64px] flex justify-center items-center w-full h-screen sm:col-span-3">
          <ColorRing
            height="100"
            width="100"
            wrapperStyle={{}}
            wrapperClass="color-ring-wrapper"
            visible={true}
            colors={["#e15b64", "#f47e60", "#f8b26a", "#abbd81", "#849b87"]}
          />
        </div>
      ) : (
        <div>
          {selectedProduct && (
            <div className="bg-white mt-[64px]">
              <div className="pt-6">
                <nav aria-label="Breadcrumb">
                  <ol
                    role="list"
                    className="mx-auto flex max-w-2xl items-center space-x-2 px-4 sm:px-6 lg:max-w-7xl lg:px-8"
                  >
                    {breadcrumbs.map((breadcrumb) => (
                      <li key={breadcrumb.id}>
                        <div className="flex items-center">
                          <a
                            href={breadcrumb.href}
                            className="mr-2 text-sm font-medium text-gray-900"
                          >
                            {breadcrumb.name}
                          </a>
                          <svg
                            width={16}
                            height={20}
                            viewBox="0 0 16 20"
                            fill="currentColor"
                            aria-hidden="true"
                            className="h-5 w-4 text-gray-300"
                          >
                            <path d="M5.697 4.34L8.98 16.532h1.327L7.025 4.341H5.697z" />
                          </svg>
                        </div>
                      </li>
                    ))}
                    <li className="text-sm">
                      <a
                        href="#"
                        aria-current="page"
                        className="font-medium text-gray-500 hover:text-gray-600"
                      >
                        {selectedProduct.selectedVariant?.title}
                      </a>
                    </li>
                  </ol>
                </nav>

                <div className="md:grid md:grid-cols-2">
                  {/* Image gallery */}
                  <div className="mx-auto mt-6 max-w-2xl sm:px-6 lg:px-8">
                    <div className="w-rounded-md lg:block">
                      <img
                        src={selectedImg}
                        alt={selectedImg}
                        className="h-full w-full"
                      />
                    </div>

                    <RadioGroup
                      value={selectedImg}
                      onChange={setSelectedImg}
                      className="mt-4"
                    >
                      <div className="mt-10 mx-auto grid grid-cols-4 gap-x-4 px-3">
                        {selectedProduct.selectedVariant.images.map(
                          (img, idx) => {
                            return (
                              <div key={idx} className="cursor-pointer">
                                <RadioGroup.Option
                                  key={idx} //change to a uuid
                                  value={img}
                                  className={({ checked }) =>
                                    classNames(
                                      checked ? "border-red-600 border-2" : ""
                                    )
                                  }
                                >
                                  <img
                                    src={
                                      selectedProduct.selectedVariant.images[
                                        idx
                                      ]
                                    }
                                    alt="product image"
                                    className="h-4/5 w-full object-cover object-bottom"
                                  />
                                </RadioGroup.Option>
                              </div>
                            );
                          }
                        )}
                      </div>
                    </RadioGroup>
                  </div>

                  {/* Product info */}
                  <div className="mx-auto max-w-3xl px-4 pb-16 pt-10 sm:px-6 lg:px-8 lg:pb-24 lg:pt-16">
                    <div className="lg:col-span-2 lg:border-r lg:border-gray-200 lg:pr-8">
                      <h1 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
                        {selectedProduct.selectedVariant.title}
                      </h1>
                    </div>

                    {/* Options */}
                    <div className="mt-4 lg:row-span-3 lg:mt-0">
                      <p className="text-3xl tracking-tight text-gray-900">
                        ₹{selectedProduct.selectedVariant.price}
                      </p>

                      <div className="mt-6">
                        <div className="flex items-center">
                          <StarRatings
                            rating={selectedProduct.selectedVariant.rating}
                            starRatedColor="#ea580c"
                            numberOfStars={5}
                            name="rating"
                            starDimension="20px"
                            starSpacing="1px"
                          />
                        </div>
                      </div>

                      <form className="mt-10">
                        {/* Colors */}
                        <div>
                          <h3 className="text-md font-medium text-gray-900">
                            Color
                          </h3>

                          {!selectedColor ? (
                            <h4 className="text-sm font-medium text-gray-900">
                              Not Available
                            </h4>
                          ) : (
                            <RadioGroup
                              value={selectedColor}
                              onChange={setSelectedColor}
                              className="mt-4"
                            >
                              <div className="mt-10 mx-auto grid grid-cols-4 gap-x-4 px-3">
                                {selectedProduct.productDetail.colors.map(
                                  (item, idx) => {
                                    return (
                                      <div
                                        key={idx}
                                        className="cursor-pointer"
                                        onClick={() =>
                                          handleColor(
                                            selectedProduct.productDetail
                                              .product_id,
                                            item.color
                                          )
                                        }
                                      >
                                        <RadioGroup.Option
                                          key={idx} //change to a uuid
                                          value={item.thumbnail}
                                          className={({ checked }) =>
                                            classNames(
                                              checked
                                                ? "border-red-600 border-2"
                                                : ""
                                            )
                                          }
                                        >
                                          <img
                                            src={item.thumbnail}
                                            alt="product image"
                                            className="h-4/5 w-full object-cover object-bottom"
                                          />
                                        </RadioGroup.Option>
                                      </div>
                                    );
                                  }
                                )}
                              </div>
                            </RadioGroup>
                          )}
                        </div>
                        {show ? (
                          <div className="mt-10 flex justify-start">
                            <button className="mx-3 bg-transparent text-green-700 font-semibold py-2 px-4 border cursor-default ">
                              Added
                            </button>
                            <Link
                              to="/cart"
                              className="mx-3 flex items-center justify-center rounded-md border border-transparent bg-orange-600 px-8 py-3 text-base font-medium text-white hover:bg-red-600"
                            >
                              Go to Cart
                            </Link>
                          </div>
                        ) : (
                          <button
                            onClick={(e) => handleAddToCart(e)}
                            type="submit"
                            className="mt-10 flex w-1/2 items-center justify-center rounded-md border border-transparent bg-orange-600 px-8 py-3 text-base font-medium text-white hover:bg-red-600"
                          >
                            Add to Cart
                          </button>
                        )}
                      </form>
                    </div>

                    <div className="py-10 lg:col-span-2 lg:col-start-1 lg:border-r lg:border-gray-200 lg:pb-16 lg:pr-8 lg:pt-6">
                      {/* Description and details */}
                      <Disclosure as="div" className="border-b-2 py-4 my-4">
                        {({ open }) => (
                          <>
                            <Disclosure.Button className="flex w-full justify-between">
                              <span>Product Details</span>
                              <ChevronDownIcon
                                className={`${
                                  open ? "rotate-180 transform" : ""
                                } h-5 w-5`}
                              />
                            </Disclosure.Button>
                            <Disclosure.Panel className="px-4 pt-4 pb-2 text-sm text-gray-500">
                              <div>
                                {
                                  <ul>
                                    {Object.entries(
                                      selectedProduct.productDetail
                                        .productDetails
                                    ).map(([key, value]) => (
                                      <li key={key}>
                                        <strong>{key}:</strong> {value}
                                      </li>
                                    ))}
                                  </ul>
                                }
                              </div>
                            </Disclosure.Panel>
                          </>
                        )}
                      </Disclosure>
                      <Disclosure as="div" className="border-b-2 py-4 my-4">
                        {({ open }) => (
                          <>
                            <Disclosure.Button className="flex w-full justify-between">
                              <span>Specifications</span>
                              <ChevronDownIcon
                                className={`${
                                  open ? "rotate-180 transform" : ""
                                } h-5 w-5`}
                              />
                            </Disclosure.Button>
                            <Disclosure.Panel className="px-4 pt-4 pb-2 text-sm text-gray-500">
                              {
                                <ul>
                                  {Object.entries(
                                    selectedProduct.productDetail.specifications
                                  ).map(([key, value]) => (
                                    <li key={key}>
                                      <strong>{key}:</strong> {value}
                                    </li>
                                  ))}
                                </ul>
                              }
                            </Disclosure.Panel>
                          </>
                        )}
                      </Disclosure>
                      <Disclosure as="div" className="border-b-2 py-4 my-4">
                        {({ open }) => (
                          <>
                            <Disclosure.Button className="flex w-full justify-between">
                              <span>Customer Reviews </span>
                              <ChevronDownIcon
                                className={`${
                                  open ? "rotate-180 transform" : ""
                                } h-5 w-5`}
                              />
                            </Disclosure.Button>
                            <Disclosure.Panel className="px-4 pt-4 pb-2 text-sm text-gray-500">
                              <div>
                                <div className="border-b-2 py-4">
                                  <h3 className="text-lg">Submit a Review</h3>
                                  <form
                                    onSubmit={handleSubmit((review) => {
                                      if (token) {
                                        addReview({
                                          user_name: userInfo.name,
                                          ...review,
                                        });
                                        reset();
                                        setUserRating(0);
                                      } else {
                                        displayNotification(
                                          "Pls login to add review",
                                          "error"
                                        );
                                      }
                                    })}
                                  >
                                    <div className="h-[150px] flex flex-col justify-around">
                                      <StarRatings
                                        rating={userRating}
                                        starRatedColor="#ea580c"
                                        numberOfStars={5}
                                        name="rating"
                                        starDimension="20px"
                                        stselectedProductarSpacing="1px"
                                        isSelectable={true}
                                        changeRating={(rating) => {
                                          setUserRating(rating);
                                          setValue("rating", rating);
                                        }}
                                      />
                                      <input
                                        type="hidden"
                                        {...register("rating", {
                                          required: "rating is required",
                                          pattern: {
                                            value: /^[1-5]\d*$/,
                                            message:
                                              "rating must be aleast 1 star",
                                          },
                                        })}
                                      />
                                      {errors.rating && (
                                        <p className="text-red-500">
                                          {errors.rating.message}
                                        </p>
                                      )}
                                      <input
                                        className="w-full rounded-l-lg p-4 border-t mr-0 border-b border-l text-gray-800 border-gray-200 bg-white"
                                        placeholder="write your review here..."
                                        {...register("review")}
                                      />
                                      <button
                                        type="submit"
                                        className=" w-fit rounded-md border border-transparent bg-orange-600 px-5 py-1 text-base font-medium text-white hover:bg-red-600"
                                      >
                                        Submit
                                      </button>
                                    </div>
                                  </form>
                                </div>

                                <div className="mt-3">
                                  {selectedProduct.productDetail.customerReviews.map(
                                    (item, idx) => {
                                      return (
                                        <div key={idx + 10} className="my-7">
                                          <h3 className="text-sm font-medium">
                                            {item.user_name}
                                          </h3>
                                          <StarRatings
                                            rating={item.rating}
                                            starRatedColor="#ea580c"
                                            numberOfStars={5}
                                            name="rating"
                                            starDimension="15px"
                                            starSpacing="1px"
                                          />
                                          <div>{item.review}</div>
                                        </div>
                                      );
                                    }
                                  )}
                                </div>
                              </div>
                            </Disclosure.Panel>
                          </>
                        )}
                      </Disclosure>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
      <Footer hiddenForSm={false} />
    </>
  );
}
