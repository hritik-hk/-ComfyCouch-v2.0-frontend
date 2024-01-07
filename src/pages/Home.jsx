import banner from "../assets/hero-banner.jpg";
import Navbar from "../features/navbar/Navbar";
import Footer from "../features/common/Footer";
import { Link } from "react-router-dom";

export default function Home() {
  const categories = [
    {
      value: "sofas-seating",
      label: "Sofas & Seating",
      thumbnail:
        "https://ii1.pepperfry.com/media/catalog/product/a/d/494x544/adria-fabric-chaise-lounger-in-bold-yellow-colour-adria-fabric-chaise-lounger-in-bold-yellow-colour-xoe0y9.jpg",
    },
    {
      value: "home-decor",
      label: "Home Decor",
      thumbnail:
        "https://ii1.pepperfry.com/media/catalog/product/m/u/494x544/musician--set-of-2--iron-human-figurine-by-craft-tree-musician--set-of-2--iron-human-figurine-by-cra-f8xwwm.jpg",
    },
    {
      value: "beanbag",
      label: "Bean Bag",
      thumbnail:
        "https://ii1.pepperfry.com/media/catalog/product/f/u/494x544/fusion-xxxl-leatherette-bean-bag-with-beans-in-black---multicolour-fusion-xxxl-leatherette-bean-bag--n6kj7t.jpg",
    },
    {
      value: "gaming-chair",
      label: "Gaming Chair",
      thumbnail:
        "https://ii1.pepperfry.com/media/catalog/product/m/o/494x544/monster-ultimate--t--gaming-chair-in-black---grey-colour-by-green-soul-monster-ultimate--t--gaming-c-cyemju.jpg",
    },
  ];

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
        <h1 className="text-2xl mb-5 text-center md:text-5xl">CATEGORIES</h1>
        <div>
          <div className="flex flex-wrap justify-evenly">
            {categories.map((item, index) => {
              return (
                <div
                  key={index}
                  className="flex flex-col justify-center items-center mx-4 relative my-5 rounded-xl"
                >
                
                    <div className="h-full w-full absolute rounded-xl bg-black opacity-25 flex justify-center items-center px-2">
                    </div>
                    <div className="h-full w-full absolute flex justify-center items-center">
                    <p className="text-white text-xl font-medium tracking-wide md:text-3xl">{item.label}</p>
                    </div>
                        
                  
                    <div className="h-32 w-36 md:h-52 md:w-64 overflow-hidden rounded-md border border-gray-200">
                      <img
                        src={item.thumbnail}
                        alt="image"
                        className="h-full w-full object-cover object-bottom"
                      />
                    </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
      <Footer hiddenForSm={false} />
    </>
  );
}
