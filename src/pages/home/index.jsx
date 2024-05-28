import React, { useContext } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { ProductsContext } from '../../components/context/productsContext';
import { CartContext } from '../../components/context/cartcontext';
import Rating from '../../components/rating/rating';

function Home() {
  const { products } = useContext(ProductsContext);
  const { addToCart } = useContext(CartContext);

  // console.log(products);

  return (
    <>
      <h1>Products</h1>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 md:gap-3 lg:gap-4">
        {products.map((product) => (
          <Card className="aspect-vrect overflow-hidden">
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
              <button
                type="button"
                onClick={() => addToCart(product)}
                className="mt-6 flex w-full items-center justify-center rounded-md border border-transparent bg-indigo-600 px-8 py-3 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
              >
                Add to bag
              </button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </>
  );
}

export default Home;
