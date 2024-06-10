/* eslint-disable react/button-has-type */
import React, { useContext, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { ProductsContext } from '../../components/context/productsContext';
import { CartContext } from '../../components/context/cartcontext';
import Rating from '../../components/rating/rating';

function ProductDetail() {
    const { productId } = useParams();
    const { loadSingleProduct, product } = useContext(ProductsContext);
    const { cart, addToCart, increaseQuantity, decreaseQuantity } = useContext(CartContext);

    useEffect(() => {
        loadSingleProduct(productId);
    }, []);

    const getCartItem = (id) => cart?.find(item => item.id === id);
    const cartItem = getCartItem(product.id);
    // const cartItem = cart?.find(y => y.productID === product.id);


    return (

        <div className="flex flex-col lg:flex-row gap-6 p-6 bg-gray-100" >

            {product && (

                <>
                    <div className="w-full lg:w-1/2">
                        <img className="w-full rounded-lg border border-gray-200" src={product.image} alt={product.title} />
                    </div>
                    <div className="w-full lg:w-1/2">
                        <h1 className="text-2xl font-bold mb-4">{product.title}</h1>
                        <div className="flex items-center mb-4">
                            {product.rating && (
                                <Rating rate={product.rating.rate} count={product.rating.count} />
                            )}
                        </div>
                        <p className="text-3xl text-red-600 mb-6">${product.price}</p>
                        <div className="flex mb-6">

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
                                <button onClick={() => addToCart(product)} className="bg-blue-500 text-white py-2 px-4 rounded">ADD TO CART</button>

                            )}
                        </div>
                        <div className="mb-4 text-lg text-gray-700">Type: {product.category}</div>
                        <p className="text-gray-800 leading-relaxed">{product.description}</p>
                    </div>
                </>
            )
            }
        </div >
    );
}

export default ProductDetail;


// /* eslint-disable react/button-has-type */
// import React, { useContext, useEffect } from 'react';
// import { useParams } from 'react-router-dom';
// import { ProductsContext } from '../../components/context/productsContext';
// import Rating from '../../components/rating/rating';


// function ProductDetail() {
//     const { productId } = useParams();
//     const { loadSingleProduct, product, addToCart } = useContext(ProductsContext);

//     useEffect(() => {
//         loadSingleProduct(productId);
//     }, []);



//     return (
//         <div className="flex flex-col lg:flex-row gap-6 p-6 bg-gray-100">
//             {product && (
//                 <>
//                     <div className="w-full lg:w-1/2">
//                         <img className="w-full rounded-lg border border-gray-200" src={product.image} alt={product.title} />
//                     </div>
//                     <div className="w-full lg:w-1/2">
//                         <h1 className="text-2xl font-bold mb-4">{product.title}</h1>
//                         <div className="flex items-center mb-4">
//                             {product.rating && (
//                                 <Rating rate={product.rating.rate} count={product.rating.count} />
//                             )}
//                         </div>
//                         <p className="text-3xl text-red-600 mb-6">₹{product.price}</p>
//                         <div className="flex mb-6">
//                             <button className="bg-blue-500 text-white py-2 px-4 rounded mr-4">BUY NOW</button>
//                             <button onClick={() => addToCart(product)} className="bg-blue-500 text-white py-2 px-4 rounded">ADD TO CART</button>
//                         </div>
//                         <div className="mb-4 text-lg text-gray-700">Type: {product.category}</div>
//                         <p className="text-gray-800 leading-relaxed">{product.description}</p>
//                     </div>
//                 </>
//             )}
//         </div>
//     );
// }

// export default ProductDetail;



// import React, { useContext, useEffect } from 'react'
// import { useParams } from 'react-router-dom'
// import { ProductsContext } from '../../components/context/productsContext';

// function ProductDetail() {
//     const para = useParams()
//     const { loadSingleProduct, product } = useContext(ProductsContext)
//     useEffect(() => {
//         loadSingleProduct(para.productId)
//     }, [])
//     return (
//         <div>{JSON.stringify(product)}</div>
//     )
// }

// export default ProductDetail