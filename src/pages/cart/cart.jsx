// import React, { useContext, useEffect, useRef } from 'react';
// import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
// import { CartContext } from '../../components/context/cartcontext';

// function Cart({ onClose }) {
//     const { cart, increaseQuantity, decreaseQuantity } = useContext(CartContext);
//     const cartRef = useRef(null);

//     useEffect(() => {
//         if (cartRef.current) {
//             cartRef.current.style.transition = 'transform 0.3s ease-in-out';
//             cartRef.current.style.transform = 'translateY(0)';
//         }
//     }, []);

//     return (
//         <div className="fixed inset-0 overflow-y-auto z-50">
//             <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
//                 <div className="fixed inset-0 transition-opacity" aria-hidden="true" onClick={onClose}>
//                     <div className="absolute inset-0 bg-black opacity-50" />
//                 </div>
//                 <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
//                 <div ref={cartRef} className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-3xl sm:w-full">
//                     <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
//                         <div className="p-4 border-b">
//                             <h2 className="text-xl font-semibold">Shopping Cart</h2>
//                         </div>


//                         <div className="p-4 max-h-96 overflow-y-auto">
//                             {cart.length > 0 ? (
//                                 cart.map(item => (
//                                     <Card key={item.id} className="mb-4">
//                                         <CardHeader>
//                                             <img className="aspect-square object-contain" src={item.image} alt={item.title} />
//                                         </CardHeader>
//                                         <CardContent className="flex flex-col gap-4">
//                                             <CardTitle className="line-clamp-1">{item.title}</CardTitle>
//                                             <CardDescription className="line-clamp-2">{item.description}</CardDescription>
//                                             <p>{Intl.NumberFormat("en-US", { currency: "USD", style: 'currency' }).format(item.price)}</p>
//                                             <div className="flex items-center space-x-2">
//                                                 <button
//                                                     className="px-2 py-1 bg-gray-300 rounded"
//                                                     onClick={() => decreaseQuantity(item.id)}
//                                                 >
//                                                     -
//                                                 </button>
//                                                 <span>{item.quantity}</span>
//                                                 <button
//                                                     className="px-2 py-1 bg-gray-300 rounded"
//                                                     onClick={() => increaseQuantity(item.id)}
//                                                 >
//                                                     +
//                                                 </button>
//                                             </div>
//                                         </CardContent>
//                                         <CardFooter>
//                                             <span className="text-lg font-medium">${item.price * item.quantity}</span>
//                                         </CardFooter>
//                                     </Card>
//                                 ))
//                             ) : (
//                                 <p className="text-center text-gray-500">Your cart is empty</p>
//                             )}
//                         </div>


//                     </div>


//                     <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
//                         <button
//                             onClick={onClose}
//                             className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-500"
//                         >
//                             Close
//                         </button>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     );
// }

// export default Cart;
