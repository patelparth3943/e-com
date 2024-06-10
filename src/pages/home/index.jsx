/* eslint-disable react/button-has-type */
import React, { useContext } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Link } from 'react-router-dom';
import Slider from 'react-slick';
import { ProductsContext } from '../../components/context/productsContext';
import { CartContext } from '../../components/context/cartcontext';
import Rating from '../../components/rating/rating';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { banner } from '../../assets/banner.webp'


function Home() {
  const { products } = useContext(ProductsContext);
  const { cart, addToCart, increaseQuantity, decreaseQuantity } = useContext(CartContext);

  const getCartItem = (id) => cart.find(item => item.id === id);

  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 4, // Show 4 slides by default
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 1800,
    pauseOnHover: true,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          infinite: true,
          dots: true
        }
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          infinite: true,
          dots: true
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          infinite: true,
          dots: true
        }
      }
    ]
  };

  const duplicatedProducts = [...products, ...products]; // Duplicate the products array to simulate an infinite loop

  return (
    <>
      <div>
        <div className=" text-center  rounded-2xl text-white">
          <img src={require('../../assets/banner1.jpg')} alt="Sweat Proof Undershirts" className="w-full h-auto" />
          <div className=" inset-0 flex flex-col pb-5 pt-5 rounded-2xl items-center justify-center bg-black bg-opacity-50">
            <h1 className="text-3xl md:text-5xl font-bold my-4">Style meets innovation, where fashion and technology unite.</h1>
            <p className="text-sm md:text-lg mb-6">"Discover fashion-forward looks and cutting-edge gadgets all in one place. Upgrade your wardrobe, elevate your lifestyle."</p>
            <div className="flex space-x-4">

              <a href='shop' className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">Shop Now</a>

            </div>
          </div>
        </div>
      </div>

      <div className='mt-10 mb-20'>
        <h1 className="text-3xl font-bold mb-6 text-center">Welcome to Our Store</h1>
        <Slider {...sliderSettings}>
          {duplicatedProducts.map((product, index) => {
            const cartItem = getCartItem(product.id);

            return (
              <div className="p-2" key={`${product.id}-${index}`}>
                <Card className="flex flex-col h-full">
                  <Link to={`/product/${product.id}`}>
                    <CardHeader className="relative w-full pt-3/4">
                      <img className="absolute top-0 left-0 w-full h-full object-contain" src={product.image} alt={product.title} />
                    </CardHeader>
                  </Link>
                  <CardContent className="flex flex-col gap-4 flex-grow">
                    <CardTitle className="line-clamp-1">{product.title}</CardTitle>
                    <CardDescription className="line-clamp-2">
                      {product.description}
                    </CardDescription>
                    {product.rating && (
                      <Rating rate={product.rating.rate} count={product.rating.count} />
                    )}
                    <p className="mt-auto">
                      {Intl.NumberFormat("en-US", {
                        currency: "USD",
                        style: 'currency'
                      }).format(product.price)}
                    </p>
                  </CardContent>
                  <CardFooter>
                    {cartItem ? (
                      <div className="flex items-center space-x-2">
                        <button
                          className="px-2 py-1 bg-gray-300 rounded"
                          onClick={() => decreaseQuantity(product.id)}
                        >
                          -
                        </button>
                        <span>{cartItem.quantity}</span>
                        <button
                          className="px-2 py-1 bg-gray-300 rounded"
                          onClick={() => increaseQuantity(product.id)}
                        >
                          +
                        </button>
                      </div>
                    ) : (
                      <div className="flex justify-between items-center">
                        <button
                          type="button"
                          onClick={() => addToCart(product)}
                          className="flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-8 py-3 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                        >
                          Add to bag
                        </button>
                      </div>
                    )}
                  </CardFooter>
                </Card>
              </div>
            );
          })}
        </Slider>
      </div>
    </>
  );
}

export default Home;
