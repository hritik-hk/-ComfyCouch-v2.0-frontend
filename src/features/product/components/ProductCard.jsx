import { useState } from "react";
import StarRatings from "react-star-ratings";
// import { addToCart } from "../features/cart/cartSlice";
// import { useDispatch,useSelector } from "react-redux";

export default function ProductCard({ item }) {
  const { title, price, thumbnail, rating, count=123, brand } = item;

  // const cartItem={
  //   id:id,
  //   title:title,
  //   price:price,
  //   thumbnail:thumbnail,
  //   quantity:1
  // }

  //   const dispatch=useDispatch();
  //   const cart=useSelector(state=>state.cart.items);

  //   const handleAdd=()=>{
  //     dispatch(addToCart(cartItem))
  //   }

  //   const IsInCart = (cart, id) => {
  //     const result = cart.find((item) => item.id === id);
  //     return result===undefined?false:true;
  //   }

  const [show, setShow] = useState(false);

  return (
    <div>
      <div className="border border-[#e4e4e4] h-[300px] mb-4 relative overflow-hidden group transition">
        <div className="w-full h-full flex justify-center items-center">
          {/* thumbnail */}
          <div className="w-[350px] flex justify-center items-center">
            <img
              className="max-h-[250px] group-hover:scale-110 transition duration-300"
              src={thumbnail}
              alt=""
            />
          </div>
        </div>
      </div>

      {/* category, title ,price & add to cart button */}
      <div>
        <div className="tex-sm capitalize text-gray-500 mb-1">{brand}</div>
        <h2 className="font-semibold mb-1">{title.substring(0, 29)}</h2>
        <StarRatings
          rating={rating}
          starRatedColor="#ea580c"
          numberOfStars={5}
          name="rating"
          starDimension="20px"
          starSpacing="1px"
        />
        <span>({count})</span>
        <div className="flex justify-between pr-4 mt-1">
          <h2 className="font-semibbold">₹ {price}</h2>
          {show ? (
            <button className="bg-transparen text-green-700 font-semibold py-2 px-4 border cursor-default ">
              Added
            </button>
          ) : (
            <button
              onClick={() => setShow(!show)}
              className="bg-transparent hover:bg-orange-600 text-orange-700 font-semibold hover:text-white py-2 px-4 border border-orange-600 hover:border-transparent rounded"
            >
              Add to Cart
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
