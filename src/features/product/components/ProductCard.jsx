import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addToCartAsync } from "../../cart/cartSlice";
import { Link } from "react-router-dom";
import StarRatings from "react-star-ratings";
import { displayNotification } from "../../../utils/displayNotification";

export default function ProductCard({ item }) {
  const { product_id, variant_id, title, thumbnail, price, rating, brand } =item;
  const [show, setShow] = useState(false);

  const dispatch = useDispatch();
  const user=useSelector(state=>state.auth.loggedInUser)
  const error=useSelector(state=>state.cart.error)

  function handleClick() {
    const cartItem = {
      title: title,
      variant_id: variant_id,
      thumbnail: thumbnail,
      price:price,
      brand:brand,
      quantity:1,
      userID:user.id
    };
    dispatch(addToCartAsync(cartItem));
    if(error){
      displayNotification('something went wrong, plz try again', 'error')
      
    }
    else{
      setShow((show) => !show)
    }
  }

  return (
    <div>
      <Link to={`/product-detail/${product_id}/${variant_id}`}>
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
      </Link>

      {/* category, title ,price & add to cart button */}
      <div>
        <Link to={`/product-detail/${product_id}/${variant_id}`}>
          <div className="tex-sm capitalize text-gray-500 mb-1">{brand}</div>
          <h2 className="font-semibold mb-1">{title}</h2>
        </Link>
        <StarRatings
          rating={rating}
          starRatedColor="#ea580c"
          numberOfStars={5}
          name="rating"
          starDimension="20px"
          starSpacing="1px"
        />
        {/* <span>({count})</span> */}
        <div className="flex justify-between pr-4 mt-1">
          <h2 className="font-semibbold">₹ {price.toLocaleString('en-IN')}</h2>
          {show ? (
            <button className="bg-transparen text-green-700 font-semibold py-2 px-4 border cursor-default ">
              Added
            </button>
          ) : (
            <button
              onClick={handleClick}
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
