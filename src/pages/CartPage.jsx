import Cart from "../features/cart/components/Cart";
import Navbar from "../features/navbar/Navbar";
import Footer from "../features/common/Footer";

export default function CartPage() {
  return (
    <>
      <Navbar />
      <Cart />
      <Footer hiddenForSm={true} />
    </>
  );
}
