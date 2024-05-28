import React, { createContext, useContext, useState } from 'react';

export const CartContext = createContext();

export function CartProvider({ children }) {
    const [cart, setCart] = useState([]);

    const addToCart = (product) => {
        setCart([...cart, product]);
    };

    return (
        <CartContext.Provider value={{ cart, addToCart }}>
            {children}
        </CartContext.Provider>
    );
}

export const useCart = () => useContext(CartContext);


// // cartContext.js
// import React, { createContext, useContext, useState, useEffect } from 'react';

// export const CartContext = createContext();

// export function CartProvider({ children }) {
//     const [cart, setCart] = useState([]);

//     const loadCart = async () => {
//         try {
//             const response = await fetch('http://localhost:3000/cart');
//             const json = await response.json();

//             if (!response.ok) {
//                 throw new Error(json.message || 'Failed to load cart');
//             }

//             setCart(json);
//             console.log('Cart loaded:', json.cart);
//         } catch (error) {
//             console.error('Load cart error:', error.message);
//         }
//     };

//     const addToCart = async (product) => {
//         try {
//             const response = await fetch('http://localhost:3000/cart', {
//                 method: 'POST',
//                 headers: {
//                     'Content-Type': 'application/json',
//                 },
//                 body: JSON.stringify({ product }),
//             });

//             const json = await response.json();

//             if (!response.ok) {
//                 throw new Error(json.message || 'Failed to add to cart');
//             }

//             setCart((prevCart) => [...prevCart, json]);
//             console.log('Product added to cart:', json);
//         } catch (error) {
//             console.error('Add to cart error:', error.message);
//         }
//     };

//     useEffect(() => {
//         loadCart();
//     }, []);

//     return (
//         <CartContext.Provider value={{ cart, addToCart }}>
//             {children}
//         </CartContext.Provider>
//     );
// }

// export const useCart = () => useContext(CartContext);
