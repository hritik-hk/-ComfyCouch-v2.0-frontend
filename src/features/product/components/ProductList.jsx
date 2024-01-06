import ProductCard from "./ProductCard";
import { fetchAllProductAsync } from "../productSlice";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Bars } from "react-loader-spinner";
import product404 from "../../../assets/product404.webp";

export default function ProductList() {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.product.productList);
  const status = useSelector((state) => state.product.status);

  useEffect(() => {
    dispatch(fetchAllProductAsync());
  }, [dispatch]);

  return (
    <>
      {status === "loading" ? (
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
      ) : status === "idle" && products.length == 0 ? (
        <div className="h-full flex flex-col  justify-center items-center w-full sm:col-span-3">
          <img
            className="h-40 w-32 md:h-72 md:w-64"
            src={product404}
            alt="product not found"
          />
          <h1 className="text-2xl mt-5 md:text-4xl text-gray-400">{`PRODUCT(s) NOT FOUND`}</h1>
        </div>
      ) : (
        products.map((product) => {
          return <ProductCard key={product.variant_id} item={product} />;
        })
      )}
    </>
  );
}
