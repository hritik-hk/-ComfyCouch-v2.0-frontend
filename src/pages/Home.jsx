import heroBanner from "../assets/hero-banner.jpg";
import Navbar from "../features/navbar/Navbar";
import Footer from "../features/common/Footer";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { fetchCategoriesAsync } from "../features/product/productSlice";
import {
  updateFilters,
  fetchProductsByFilterAsync,
} from "../features/product/productSlice";
import { ITEMS_PER_PAGE } from "../features/common/constants";
import { ColorRing } from "react-loader-spinner";

export default function Home() {
  const dispatch = useDispatch();

  const initialFilters = {
    color: [],
    category: [],
    brand: [],
  };

  const categories = useSelector((state) => state.product.categories);
  const status = useSelector((state) => state.product.status);

  const [imageLoaded, setImageLoaded] = useState(false);

  useEffect(() => {
    const heroImage = new Image();
    heroImage.src = heroBanner;
    heroImage.onload = () => {
      setImageLoaded(true);
    };
  }, []);

  useEffect(() => {
    dispatch(fetchCategoriesAsync());
    dispatch(updateFilters(initialFilters));
  }, [dispatch]);

  const handleCategory = (filterValue) => {
    let update = { ...initialFilters };
    update.category.push(filterValue);

    const pagination = { _page: 1, _limit: ITEMS_PER_PAGE };
    const sort = { _sort: "", _order: "" };
    dispatch(
      fetchProductsByFilterAsync({
        filters: update,
        sort: sort,
        pagination: pagination,
      })
    );
    dispatch(updateFilters(update));
  };

  return (
    <>
      <Navbar />
      {!imageLoaded && status==='loading' ? (
        <div className="h-[75vh] flex justify-center items-center w-full sm:col-span-3">
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
          <div
            className="w-full h-[400px] bg-cover bg-center flex flex-col md:h-screen"
            style={{ backgroundImage: `url(${heroBanner})` }}
          >
            <div className="h-3/4 mt-2 flex flex-col justify-center items-center">
              <h1 className="text-3xl font-light md:text-7xl">
                Transform Your Space
              </h1>
              <h1 className="text-3xl font-bold md:text-7xl">
                Furnish Your Dreams
              </h1>
              <p className="my-2 text-sm md:my-5 md:text-xl">
                Unleash Your Creativity With Our Exclusive Collection
              </p>
              <Link to="/products">
                <button
                  type="button"
                  className="text-white bg-gray-800 hover:bg-gray-900 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700"
                >
                  EXPLORE NOW
                </button>
              </Link>
            </div>
          </div>

          <div className="mt-10">
            <h1 className="text-2xl mb-5 text-center md:text-5xl">
              CATEGORIES
            </h1>
            {categories && (
              <div>
                <div className="flex flex-wrap justify-evenly">
                  {categories.map((item, index) => {
                    return (
                      <div
                        key={index}
                        className="flex flex-col justify-center items-center mx-4 relative my-5 rounded-xl"
                      >
                        <Link
                          to="/products"
                          onClick={() => handleCategory(item.value)}
                        >
                          <div className="h-full w-full absolute rounded-xl bg-black opacity-25 flex justify-center items-center px-2"></div>
                          <div className="h-full w-full absolute flex justify-center items-center">
                            <p className="text-white text-xl font-medium tracking-wide md:text-3xl">
                              {item.label}
                            </p>
                          </div>

                          <div className="h-32 w-36 md:h-52 md:w-64 overflow-hidden rounded-md border border-gray-200">
                            <img
                              src={item.thumbnail}
                              alt="image"
                              className="h-full w-full object-cover object-bottom"
                            />
                          </div>
                        </Link>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        </div>
      )}
      <Footer hiddenForSm={false} />
    </>
  );
}
