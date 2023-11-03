import ProductCard from "./ProductCard";

export default function ProductList() {

    const items=[{
        id:1,
        title:'Muddha XXXL Leatherette Bean Bag with Beans in Navy Blue Colour',
        image:'https://ii1.pepperfry.com/media/catalog/product/m/u/1100x1210/muddha-xxxl-leatherette-bean-bag-with-beans-in-navy-blue-colour-muddha-xxxl-leatherette-bean-bag-wit-ar6eal.jpg',
        category:'bean bags',
        brand:'Sattva',
        rating:4,
        count:320,
        price:2599
    },
    {
        title:'Muddha XXXL Leatherette Bean Bag with Beans in Navy Blue Colour',
        id:2,
        image:'https://ii1.pepperfry.com/media/catalog/product/1/-/494x544/1-seater-manual-recliner-in-brown-colour-by-bantia-furniture-1-seater-manual-recliner-in-brown-colou-3hwtnq.jpg',
        category:'bean bags',
        brand:'Sattva',
        rating:4,
        count:320,
        price:2599
    },
    {
        title:'Muddha XXXL Leatherette Bean Bag with Beans in Navy Blue Colour',
        id:3,
        image:'https://ii1.pepperfry.com/media/catalog/product/m/o/1250x625/montez-velvet-lhs-sectional-sofa--2---lounger--in-pink---beige-colour-montez-velvet-lhs-sectional-so-vgb5lt.jpg',
        category:'bean bags',
        brand:'Sattva',
        rating:4,
        count:320,
        price:2599
    },
    {
        title:'Muddha XXXL Leatherette Bean Bag with Beans in Navy Blue Colour',
        id:4,
        image:'https://ii1.pepperfry.com/media/catalog/product/i/m/494x544/impero-lhs-l-shape-sofa-with-adjustable-headrest-in-tan-colour-by-vittoria-impero-lhs-l-shape-sofa-w-4wl87r.jpg',
        category:'bean bags',
        brand:'Sattva',
        rating:4,
        count:320,
        price:2599
    },
    {
        title:'Muddha XXXL Leatherette Bean Bag with Beans in Navy Blue Colour',
        id:5,
        image:'https://ii1.pepperfry.com/media/catalog/product/m/u/1100x1210/muddha-xxxl-leatherette-bean-bag-with-beans-in-navy-blue-colour-muddha-xxxl-leatherette-bean-bag-wit-ar6eal.jpg',
        category:'bean bags',
        brand:'Sattva',
        rating:4,
        count:320,
        price:2599
    }
]

  return <>
    {
        items.map((item=>{
            return <ProductCard
                key={item.id}
                item={item}
            />
        }))
    }
  </>;
}
