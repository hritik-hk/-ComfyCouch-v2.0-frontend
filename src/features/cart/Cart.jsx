
//for testing UI
const products=[{
    id:10,
    name:'Muddha XXXL Leatherette Bean Bag with Beans in Navy Blue Colour',
    imageSrc:'https://ii1.pepperfry.com/media/catalog/product/m/u/1100x1210/muddha-xxxl-leatherette-bean-bag-with-beans-in-navy-blue-colour-muddha-xxxl-leatherette-bean-bag-wit-ar6eal.jpg',
    category:'bean bags',
    brand:'Sattva',
    rating:4,
    count:320,
    quantity: 1,
    price:'2599'
  
  },
  {
    name:'Muddha XXXL Leatherette Bean Bag with Beans in Navy Blue Colour',
    id:20,
    imageSrc:'https://ii1.pepperfry.com/media/catalog/product/1/-/494x544/1-seater-manual-recliner-in-brown-colour-by-bantia-furniture-1-seater-manual-recliner-in-brown-colou-3hwtnq.jpg',
    category:'bean bags',
    brand:'Sattva',
    rating:4,
    count:320,
    quantity:1,
    price:'2599'
  },
  {
    name:'Muddha XXXL Leatherette Bean Bag with Beans in Navy Blue Colour',
    id:30,
    imageSrc:'https://ii1.pepperfry.com/media/catalog/product/m/o/1250x625/montez-velvet-lhs-sectional-sofa--2---lounger--in-pink---beige-colour-montez-velvet-lhs-sectional-so-vgb5lt.jpg',
    category:'bean bags',
    brand:'Sattva',
    rating:4,
    count:320,
    quantity: 1,
    price:'2599'
  },
  {
    name:'Muddha XXXL Leatherette Bean Bag with Beans in Navy Blue Colour',
    id:40,
    imageSrc:'https://ii1.pepperfry.com/media/catalog/product/i/m/494x544/impero-lhs-l-shape-sofa-with-adjustable-headrest-in-tan-colour-by-vittoria-impero-lhs-l-shape-sofa-w-4wl87r.jpg',
    category:'bean bags',
    brand:'Sattva',
    rating:4,
    count:320,
    quantity: 1,
    price:'2599'
  },
  {
    name:'Muddha XXXL Leatherette Bean Bag with Beans in Navy Blue Colour',
    id:50,
    imageSrc:'https://ii1.pepperfry.com/media/catalog/product/m/u/1100x1210/muddha-xxxl-leatherette-bean-bag-with-beans-in-navy-blue-colour-muddha-xxxl-leatherette-bean-bag-wit-ar6eal.jpg',
    category:'bean bags',
    brand:'Sattva',
    rating:4,
    count:320,
    quantity: 1,
    price:'2599'
  }
  ]

export default function Cart(){
    return (
        <>
        <div>
        <div className="lg:grid lg:gap-x-8 lg:gap-y-10 lg:grid-cols-4 mx-auto bg-white max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="sm:col-span-3 border-t border-gray-200 px-4 py-6 sm:px-6">
            <h1 className="text-4xl my-5 font-bold tracking-tight text-gray-900">
              Cart
            </h1>
            <div className="sm:h-2/3 sm:overflow-y-auto">
              <ul className="-my-6 divide-y divide-gray-200">
                {products.map((item) => (
                  <li key={item.id} className="flex py-6">
                    <div className="h-36 w-40 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                      <img
                        src={item.imageSrc}
                        alt='image'
                        className="h-full w-full object-cover object-center"
                      />
                    </div>

                    <div className="ml-4 flex flex-1 flex-col">
                      <div>
                        <div className="flex justify-between text-base font-medium text-gray-900">
                          <h3>
                            <a href={item.id}>{item.name}</a>
                          </h3>
                          <p className="ml-4">${item.price}</p>
                        </div>
                        <p className="mt-1 text-sm text-gray-500">
                          {item.brand}
                        </p>
                      </div>
                      <div className="flex flex-1 items-end justify-between text-sm">
                        <div className="text-gray-500">
                          <label
                            htmlFor="quantity"
                            className="inline mr-5 text-sm font-medium leading-6 text-gray-900"
                          >
                            Qty
                          </label>
                          <select
                            value={item.quantity}
                          >
                            <option value="1">1</option>
                            <option value="2">2</option>
                            <option value="3">3</option>
                            <option value="4">4</option>
                            <option value="5">5</option>
                          </select>
                        </div>

                        <div className="flex">
                          <button
                            type="button"
                            className="font-medium text-indigo-600 hover:text-indigo-500"
                          >
                            Remove
                          </button>
                        </div>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="hidden sm:block sm:mt-20 sm:h-2/5 bg-gray-100 px-4 py-6 sm:px-6">
            <div className="flex justify-between my-2 text-base font-medium text-gray-900">
              <p>Subtotal</p>
              <p>$ {34567}</p>
            </div>
            <div className="flex justify-between my-2 text-base font-medium text-gray-900">
              <p>Total Items in Cart</p>
              <p>{6} items</p>
            </div>
            <p className="mt-0.5 text-sm text-gray-500">
              Shipping and taxes calculated at checkout.
            </p>
            <div className="mt-6">
              <div
                className="flex items-center justify-center rounded-md border border-transparent bg-orange-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-red-600"
              >
                Checkout
              </div>
            </div>
            <div className="mt-6 flex justify-center text-center text-sm text-gray-500">
              <p>
                or{' '}
                
                  <button
                    type="button"
                    className="font-medium text-orange-600 hover:text-red-600"
                  >
                    Continue Shopping
                    <span aria-hidden="true"> &rarr;</span>
                  </button>
              </p>
            </div>
          </div>
        </div>

        <div className="fixed bottom-0 w-full  sm:hidden bg-gray-100 px-6 py-2 sm:py-6 ">
            <div className="flex justify-between my-2 text-base font-medium text-gray-900">
              <p>Subtotal</p>
              <p>$ {34567}</p>
            </div>
            <div className="flex justify-between my-2 text-base font-medium text-gray-900">
              <p>Total Items in Cart</p>
              <p>{6} items</p>
            </div>
            <p className="mt-0.5 text-sm text-gray-500">
              Shipping and taxes calculated at checkout.
            </p>
            <div className="mt-6">
              <div
                className="flex items-center justify-center rounded-md border border-transparent bg-orange-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-red-600"
              >
                Checkout
              </div>
            </div>
            <div className="mt-6 flex justify-center text-center text-sm text-gray-500">
              <p>
                or{' '}
                
                  <button
                    type="button"
                    className="font-medium text-orange-600 hover:text-red-600"
                  >
                    Continue Shopping
                    <span aria-hidden="true"> &rarr;</span>
                  </button>
              </p>
            </div>
          </div>
          </div>




        </>
    )
}