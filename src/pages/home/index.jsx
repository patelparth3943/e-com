import React, { useContext } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { ProductsContext } from '../../components/context/productsContext';
import { CartContext } from '../../components/context/cartcontext';
import Rating from '../../components/rating/rating';

function Home() {
  const { products } = useContext(ProductsContext);
  const { cart, addToCart, increaseQuantity, decreaseQuantity } = useContext(CartContext);

  const getCartItem = (id) => cart.find(item => item.id === id);

  return (
    <>
      <span>--------------------------------</span>
      <h1>Products</h1>
      <span>--------------------------------</span>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 md:gap-3 lg:gap-4">
        {products.map((product, index) => {
          const cartItem = getCartItem(product.id);

          return (
            <Card key={`${product.id}-${index}`} className="aspect-vrect overflow-hidden">
              <CardHeader>
                <img className="aspect-square object-contain" src={product.image} alt={product.title} />
              </CardHeader>
              <CardContent className="flex flex-col gap-4">
                <CardTitle className="line-clamp-1">{product.title}</CardTitle>
                <CardDescription className="line-clamp-2">
                  {product.description}
                </CardDescription>
                {product.rating && (
                  <Rating rate={product.rating.rate} count={product.rating.count} />
                )}
                <p>
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
          );
        })}
      </div>
    </>
  );
}

export default Home;


