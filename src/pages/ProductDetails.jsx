import { useState } from "react";
import StarRatings from "react-star-ratings";
import { RadioGroup, Disclosure } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/24/outline";

const product = {
  id: 1,
  title: "Adria Fabric RHS Chaise Lounger in Bold Yellow Colour",
  price: 15899,
  rating: 3.5,
  stock: 94,
  brand: "Febonic",
  category: "sofas",
  thumbnail:
    "https://ii1.pepperfry.com/media/catalog/product/a/d/1100x1210/adria-fabric-chaise-lounger-in-bold-yellow-colour-adria-fabric-chaise-lounger-in-bold-yellow-colour-xoe0y9.jpg",
  images: [
    "https://ii1.pepperfry.com/media/catalog/product/a/d/1100x1210/adria-fabric-chaise-lounger-in-bold-yellow-colour-adria-fabric-chaise-lounger-in-bold-yellow-colour-xoe0y9.jpg",
    "https://ii1.pepperfry.com/media/catalog/product/a/d/1100x1210/adria-fabric-chaise-lounger-in-bold-yellow-colour-adria-fabric-chaise-lounger-in-bold-yellow-colour-pfnbbx.jpg",
    "https://ii1.pepperfry.com/media/catalog/product/a/d/1100x1210/adria-fabric-chaise-lounger-in-bold-yellow-colour-adria-fabric-chaise-lounger-in-bold-yellow-colour-chqdl9.jpg",
    "https://ii1.pepperfry.com/media/catalog/product/a/d/1100x1210/adria-fabric-chaise-lounger-in-bold-yellow-colour-adria-fabric-chaise-lounger-in-bold-yellow-colour-hvhaxw.jpg",
  ],
  colors: [
    {
      name: "Yellow",
      class: "bg-yellow",
      selectedClass: "ring-gray-400",
    },
    {
      name: "Brown",
      class: "bg-brown-200",
      selectedClass: "ring-gray-400",
    },
    {
      name: "Grey",
      class: "bg-gray-900",
      selectedClass: "ring-gray-900",
    },
  ],
  productDetails: [
    {
      Brand: "Febonic",
    },
    {
      Assembly: "Carpenter Assembly",
    },
    {
      Dimensions_cm: "H 83.8 x W 185.4 x D 76.2",
    },
    {
      Dimensions_in: "H 32 x W 73 x D 30",
    },
    {
      Primary_Material: "Fabric",
    },
    {
      Warranty: "12 Months' Warranty",
    },
    {
      Weight: "30 KG",
    },
  ],
  specifications: [
    {
      Brand_Warranty: "36 Months",
    },
    {
      Frame_Material: "12MM Neem Hard Wood Plywood",
    },
    {
      Disclaimers:
        "Accessories shown in the image are only for representation and are not part of the product.Depending on your screen settings and resolution on your device there may be a slight variance in fabric color and wood polish of the image and actual product.Wood grains will vary from product to product in case of solid wood furniture Furniture having intricate hand-painted details are individual unique pieces and may have slight distinctions and variance between the picture and actual product",
    },
  ],
  CustomerReviews: [
    {
      user_name: "PRANEET MOON",
      review: "Found damage please initiate one to one replacement",
      rating: 1,
    },
    {
      user_name: "Ravindra Agane",
      review: "Amazing Design, Built fore the compact houses",
      rating: 5,
    },
    {
      user_name: "Pushpa Srikar",
      review: "Sofa was comfortable and i liked the design of sofa also",
      rating: 4,
    },
    {
      user_name: "Amey Hulsure",
      review:
        "The yellow color of this sofa cum bed is excellent. It serves its purpose well as a sofa when we have guests around and the bed is good and comfy for a sound sleep. I like how this bed also offers storage space for me to keep some home products. Got the right product at a worthy price.",
      rating: 5,
    },
  ],
  breadcrumbs: [{ id: 1, name: "Sofas", href: "#" }],
};

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function ProductDetails() {
  const [selectedColor, setSelectedColor] = useState(product.colors[0]);
  const [selectedImg, setSelectedImg] = useState(product.thumbnail);

  return (
    <div className="bg-white">
      <div className="pt-6">
        <nav aria-label="Breadcrumb">
          <ol
            role="list"
            className="mx-auto flex max-w-2xl items-center space-x-2 px-4 sm:px-6 lg:max-w-7xl lg:px-8"
          >
            {product.breadcrumbs.map((breadcrumb) => (
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
                href={product.href}
                aria-current="page"
                className="font-medium text-gray-500 hover:text-gray-600"
              >
                {product.title}
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
                {product.images.map((img, idx) => {
                  return (
                    <div key={idx} className="cursor-pointer">
                      <RadioGroup.Option
                        key={idx} //change to a uuid
                        value={img}
                        className={({ checked }) =>
                          classNames(checked ? "border-red-600 border-2" : "")
                        }
                      >
                        <img
                          src={product.images[idx]}
                          alt="product image"
                          className="h-4/5 w-full object-cover object-bottom"
                        />
                      </RadioGroup.Option>
                    </div>
                  );
                })}
              </div>
            </RadioGroup>
          </div>

          {/* Product info */}
          <div className="mx-auto max-w-3xl px-4 pb-16 pt-10 sm:px-6 lg:px-8 lg:pb-24 lg:pt-16">
            <div className="lg:col-span-2 lg:border-r lg:border-gray-200 lg:pr-8">
              <h1 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
                {product.title}
              </h1>
            </div>

            {/* Options */}
            <div className="mt-4 lg:row-span-3 lg:mt-0">
              <p className="text-3xl tracking-tight text-gray-900">
                ₹{product.price}
              </p>

              {/* Reviews */}
              <div className="mt-6">
                <div className="flex items-center">
                  <StarRatings
                    rating={product.rating}
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
                  <h3 className="text-sm font-medium text-gray-900">Color</h3>

                  <RadioGroup
                    value={selectedColor}
                    onChange={setSelectedColor}
                    className="mt-4"
                  >
                    <div className="flex items-center space-x-3">
                      {product.colors.map((color) => (
                        <RadioGroup.Option
                          key={color.name}
                          value={color}
                          className={({ active, checked }) =>
                            classNames(
                              color.selectedClass,
                              active && checked ? "ring ring-offset-1" : "",
                              !active && checked ? "ring-2" : "",
                              "relative -m-0.5 flex cursor-pointer items-center justify-center rounded-full p-0.5 focus:outline-none"
                            )
                          }
                        >
                          <span
                            aria-hidden="true"
                            className={classNames(
                              color.class,
                              "h-8 w-8 rounded-full border border-black border-opacity-10"
                            )}
                          />
                        </RadioGroup.Option>
                      ))}
                    </div>
                  </RadioGroup>
                </div>
                <button
                  type="submit"
                  className="mt-10 flex w-1/2 items-center justify-center rounded-md border border-transparent bg-orange-600 px-8 py-3 text-base font-medium text-white hover:bg-red-600"
                >
                  Add to Cart
                </button>
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
                      {`Furniture having intricate hand-painted details are individual unique pieces and may have slight 
                distinctions and variance between the picture and actual product.`}
                    </Disclosure.Panel>
                  </>
                )}
              </Disclosure>
              <Disclosure as="div" className="border-b-2 py-4 my-4">
                {({ open }) => (
                  <>
                    <Disclosure.Button className="flex w-full justify-between">
                      <span>Highlights</span>
                      <ChevronDownIcon
                        className={`${
                          open ? "rotate-180 transform" : ""
                        } h-5 w-5`}
                      />
                    </Disclosure.Button>
                    <Disclosure.Panel className="px-4 pt-4 pb-2 text-sm text-gray-500">
                      {`Furniture having intricate hand-painted details are individual unique pieces and may have slight 
                distinctions and variance between the picture and actual product.`}
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
                      {`Furniture having intricate hand-painted details are individual unique pieces and may have slight 
                distinctions and variance between the picture and actual product.`}
                    </Disclosure.Panel>
                  </>
                )}
              </Disclosure>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
