import { Fragment, useState } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { XMarkIcon } from '@heroicons/react/24/outline'


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




export default function CartSidebar() {
  const [open, setOpen] = useState(true)

  return (

    <Transition.Root show={open} as={Fragment}>
    <Dialog as="div" className="relative z-10" onClose={setOpen}>
      <Transition.Child
        as={Fragment}
        enter="ease-in-out duration-500"
        enterFrom="opacity-0"
        enterTo="opacity-100"
        leave="ease-in-out duration-500"
        leaveFrom="opacity-100"
        leaveTo="opacity-0"
      >
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
      </Transition.Child>

      <div className="fixed inset-0 overflow-hidden">
        <div className="absolute inset-0 overflow-hidden">
          <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full">
            <Transition.Child
              as={Fragment}
              enter="transform transition ease-in-out duration-500 sm:duration-700"
              enterFrom="translate-x-full"
              enterTo="translate-x-0"
              leave="transform transition ease-in-out duration-500 sm:duration-700"
              leaveFrom="translate-x-0"
              leaveTo="translate-x-full"
            >
              <Dialog.Panel className="pointer-events-auto w-screen max-w-xl">
                <div className="flex h-full flex-col overflow-y-scroll bg-white shadow-xl">
                  <div className="flex-1 overflow-y-auto px-4 py-6 sm:px-6">
                    <div className="flex items-start justify-between">
                      <Dialog.Title className="text-lg font-medium text-gray-900">Shopping cart</Dialog.Title>
                      <div className="ml-3 flex h-7 items-center">
                        <button
                          type="button"
                          className="relative -m-2 p-2 text-gray-400 hover:text-gray-500"
                          onClick={() => setOpen(false)}
                        >
                          <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                        </button>
                      </div>
                    </div>

                    <div className="mt-8">
                      <div className="flow-root">
                        <ul role="list" className="-my-6 divide-y divide-gray-200">
                          {products.map((product) => (
                            <li key={product.id} className="flex py-6">
                              <div className="h-36 w-40 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                                <img
                                  src={product.imageSrc}
                                  className="h-full w-full object-cover object-center"
                                />
                              </div>

                              <div className="ml-4 flex flex-1 flex-col">
                                <div>
                                  <div className="flex justify-between text-base font-medium text-gray-900">
                                    <h3>
                                      <a href={"#"}>{product.name}</a>
                                    </h3>
                                    <p className="ml-4">{product.price}</p>
                                  </div>
                                  <p className="mt-1 text-sm text-gray-500">{product.brand}</p>
                                </div>
                                <div className="flex flex-1 items-end justify-between text-sm">
                                  <p className="text-gray-500">Qty {product.quantity}</p>

                                  <div className="flex">
                                    <button
                                      type="button"
                                      className="font-medium text-orange-600 hover:text-red-700"
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
                  </div>

                  <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
                    <div className="flex justify-between text-base font-medium text-gray-900">
                      <p>Subtotal</p>
                      <p>$262.00</p>
                    </div>
                    <p className="mt-0.5 text-sm text-gray-500">Shipping and taxes calculated at checkout.</p>
                    <div className="mt-6">
                      <a
                        href="#"
                        className="flex items-center justify-center rounded-md border border-transparent bg-orange-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-red-600"
                      >
                        Checkout
                      </a>
                    </div>
                    <div className="mt-6 flex justify-center text-center text-sm text-gray-500">
                      <p>
                        or{' '}
                        <button
                          type="button"
                          className="font-medium text-indigo-600 hover:text-indigo-500"
                          onClick={() => setOpen(false)}
                        >
                          Continue Shopping
                          <span aria-hidden="true"> &rarr;</span>
                        </button>
                      </p>
                    </div>
                  </div>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </div>
    </Dialog>
  </Transition.Root>
  )
}
