import ProductCard from "./ProductCard";
import { fetchAllProductAsync } from "../productSlice";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Bars } from "react-loader-spinner";

export default function ProductList() {

  const dispatch = useDispatch();
  const products = useSelector((state) => state.product.productList);

  useEffect(() => {
    dispatch(fetchAllProductAsync());
  }, [dispatch]);

  return (
    <>
      {products.length==0 ? (
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
          ) :
        products.map((item) => {
          return <ProductCard key={item.variant_id} item={item} />;
        })}
    </>
  );
}
