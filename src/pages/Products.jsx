import { Fragment, useEffect, useState } from "react";
import MobileFilters from "../features/product/components/MobileFIlters";
import Filters from "../features/product/components/Filters";
import Navbar from "../features/navbar/Navbar";
import Footer from "../features/common/Footer";
import ProductList from "../features/product/components/ProductList";
import Pagination from "../features/common/Pagination";
import { Menu, Transition } from "@headlessui/react";
import { ChevronDownIcon, FunnelIcon } from "@heroicons/react/20/solid";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchCategoriesAsync,
  fetchColorsAsync,
  fetchBrandsAsync,
  fetchProductsByFilterAsync,
} from "../features/product/productSlice";
import { ITEMS_PER_PAGE } from "../features/common/constants";

const sortOptions = [
  { label: "Best Rating", value: "rating", order: "descending" },
  { label: "Price: Low to High", value: "price", order: "ascending" },
  { label: "Price: High to Low", value: "price", order: "descending" },
];

//for joining classes
function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function Products() {

  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  const [page, setPage] = useState(1);
  const [filters, setFilters] = useState({
    color: [],
    category: [],
    brand: [],
  });
  const [sort, setSort] = useState({ _sort: "", _order: "" });

  const dispatch = useDispatch();

  const brands = useSelector((state) => state.product.brands);
  const colors = useSelector((state) => state.product.colors);
  const categories = useSelector((state) => state.product.categories);
  const totalItems = useSelector(state => state.product.totalItems);

  useEffect(() => {
    dispatch(fetchCategoriesAsync());
    dispatch(fetchBrandsAsync());
    dispatch(fetchColorsAsync());
  }, [dispatch]);

  useEffect(()=>{
    const pagination = { _page: page, _limit: ITEMS_PER_PAGE };
    dispatch(fetchProductsByFilterAsync({filters:filters,sort:sort,pagination:pagination}));
  },[dispatch,filters,sort,page])

  const filterList = [
    {
      id: "color",
      name: "Color",
      options: colors,
    },
    {
      id: "category",
      name: "Category",
      options: categories,
    },
    {
      id: "brand",
      name: "Brands",
      options: brands,
    },
  ];


  const handlePage = (page) => setPage(page);

  const handleFilter = (e, filterName, filterValue) => {
    setFilters((prevFilters) => {
      const updatedFilter = { ...prevFilters };

      if (e.target.checked) {
        // Add filterValue to the filterName's array
        updatedFilter[filterName] = [...updatedFilter[filterName], filterValue];
      } else {
        // Remove filterValue from the filterName's array
        updatedFilter[filterName] = updatedFilter[filterName].filter(
          item => item !== filterValue
        );
      }
      setPage(1);//update page to first page
      return updatedFilter;
    });
  };

  const handleSort = (option) => {
    const sort = { _sort: option.value, _order: option.order };
    console.log({ sort });
    setSort(sort);
  };

  

  return (
    <>
      <Navbar />
      <div className="bg-white">
        <div>
          {/* Mobile filter dialog */}
          <MobileFilters
            mobileFiltersOpen={mobileFiltersOpen}
            setMobileFiltersOpen={setMobileFiltersOpen}
            filterList={filterList}
            handleFilter={handleFilter}
            filters={filters}
          />

          <main className="mx-auto lg:mx-11 px-4 sm:px-6 lg:px-8">
            <div className="flex items-baseline justify-between border-b border-gray-200 pb-6 pt-24">
              <h1 className="text-4xl font-bold tracking-tight text-gray-900">
                New Arrivals
              </h1>

              <div className="flex items-center">
                <Menu as="div" className="relative inline-block text-left">
                  <div>
                    <Menu.Button className="group inline-flex justify-center text-sm font-medium text-gray-700 hover:text-gray-900">
                      Sort
                      <ChevronDownIcon
                        className="-mr-1 ml-1 h-5 w-5 flex-shrink-0 text-gray-400 group-hover:text-gray-500"
                        aria-hidden="true"
                      />
                    </Menu.Button>
                  </div>

                  <Transition
                    as={Fragment}
                    enter="transition ease-out duration-100"
                    enterFrom="transform opacity-0 scale-95"
                    enterTo="transform opacity-100 scale-100"
                    leave="transition ease-in duration-75"
                    leaveFrom="transform opacity-100 scale-100"
                    leaveTo="transform opacity-0 scale-95"
                  >
                    <Menu.Items className="absolute right-0 z-10 mt-2 w-40 origin-top-right rounded-md bg-white shadow-2xl ring-1 ring-black ring-opacity-5 focus:outline-none">
                      <div className="py-1">
                        {sortOptions.map((option) => (
                          <Menu.Item key={option.label}>
                            {({ active }) => (
                              <p
                                onClick={() => handleSort(option)}
                                className={classNames(
                                  option.value == sort._sort &&
                                    option.order == sort._order
                                    ? "font-medium text-gray-900"
                                    : "text-gray-500",
                                  active ? "bg-gray-100" : "",
                                  "block px-4 py-2 text-sm cursor-pointer"
                                )}
                              >
                                {option.label}
                              </p>
                            )}
                          </Menu.Item>
                        ))}
                      </div>
                    </Menu.Items>
                  </Transition>
                </Menu>

                <button
                  type="button"
                  className="-m-2 ml-4 p-2 text-gray-400 hover:text-gray-500 sm:ml-6 lg:hidden"
                  onClick={() => setMobileFiltersOpen(true)}
                >
                  <span className="sr-only">Filters</span>
                  <FunnelIcon className="h-5 w-5" aria-hidden="true" />
                </button>
              </div>
            </div>

            <section aria-labelledby="products-heading" className="pb-24 pt-6">
              <div className="grid grid-cols-1 gap-x-8 gap-y-10 lg:grid-cols-4">
                {/* Filters */}
                <Filters 
                filterList={filterList} 
                handleFilter={handleFilter} 
                filters={filters} 
                />

                {/* Product grid */}
                <div className="lg:col-span-3">
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 lg:mx-8 gap-[30px] max-w-sm mx-auto md:max-w-none md:mx-0">
                    {/*  All Products */}
                    <ProductList />
                  </div>
                </div>
              </div>
              <Pagination
                page={page}
                handlePage={handlePage}
                totalItems={totalItems}
              ></Pagination>
            </section>
          </main>
        </div>
      </div>
      <Footer hiddenForSm={false} />
    </>
  );
}
