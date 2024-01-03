import banner from "../assets/hero-banner.jpg";
import Navbar from "../features/navbar/Navbar";
import { Link } from "react-router-dom";

export default function Home() {
  return (
    <>
      <Navbar />
      <div
        className="w-full h-[400px] bg-cover bg-center flex flex-col md:h-screen"
        style={{ backgroundImage: `url(${banner})` }}
      >
        <div className="h-3/4 mt-2 flex flex-col justify-center items-center">
          <h1 className="text-3xl font-light md:text-7xl">
            Transform Your Space
          </h1>
          <h1 className="text-3xl font-bold md:text-7xl">
            Furnish Your Dreams
          </h1>
          <p className="my-2 md:my-5 md:text-xl">
            Unleash Your Creativity Width Our Exclusive Collection
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
    </>
  );
}
