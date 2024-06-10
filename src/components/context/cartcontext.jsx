
import React, { createContext, useState } from 'react';

export const CartContext = createContext();

export function CartProvider({ children }) {
    const [cart, setCart] = useState([]);

    const createCart = async () => {
        try {
            const res = await fetch('http://localhost:3000/cart', {
                method: 'POST',
                body: JSON.stringify({
                    date: new Date().toISOSString(),
                    prodcuts: [],
                }),
                headers: {
                    'Content-Type': 'application/json',
                    Accept: 'application/json'

                },

            });
            const json = await res.json();
            localStorage.setItem('cart', JSON.stringify(json));
            setCart(json);
        } catch (error) {
            console.log(error);

        }
    }


    const addToCart = (item) => {
        setCart((prevCart) => {
            const existingItem = prevCart.find(cartItem => cartItem.id === item.id);
            if (existingItem) {
                return prevCart.map(cartItem =>
                    cartItem.id === item.id
                        ? { ...cartItem, quantity: cartItem.quantity + 1 }
                        : cartItem
                );
            }
            return [...prevCart, { ...item, quantity: 1 }];
        });
    };

    const increaseQuantity = (itemId) => {
        setCart((prevCart) =>
            prevCart.map((item) =>
                item.id === itemId ? { ...item, quantity: item.quantity + 1 } : item
            )
        );
    };

    const decreaseQuantity = (itemId) => {
        setCart((prevCart) =>
            prevCart
                .map((item) =>
                    item.id === itemId ? { ...item, quantity: item.quantity - 1 } : item
                )
                .filter((item) => item.quantity > 0)
        );
    };

    return (
        <CartContext.Provider value={{ cart, addToCart, createCart, increaseQuantity, decreaseQuantity }}>
            {children}
        </CartContext.Provider>
    );
}


// import React, { createContext, useEffect, useState } from 'react';

// export const CartContext = createContext();

// export function CartProvider({ children }) {
//     const [cart, setCart] = useState([]);

//     const createCart = async () => {
//         try {
//             const res = await fetch('http://localhost:3000/cart', {
//                 method: 'POST',
//                 body: JSON.stringify({
//                     date: new Date().toISOSString(),
//                     prodcuts: [],
//                 }),
//                 headers: {
//                     'Content-Type': 'application/json',
//                     Accept: 'application/json'

//                 },

//             });
//             const json = await res.json();
//             localStorage.setItem('cart', JSON.stringify(json));
//             setCart(json);
//         } catch (error) {
//             console.log(error);

//         }
//     }


//     const addToCart = async data => {
//         try {
//             const index = cart?.prodcuts?.findIndex(
//                 x => x.productID === data.productID,
//             );
//             const res = await fetch('http://localhost:3000/cart/${cart.id}', {
//                 method: 'PUT',
//                 body: JSON.stringify({
//                     ...cart,
//                     prodcuts:
//                         index === -1
//                             ? [...cart.products, data]
//                             : data.quantity === 0
//                                 ? [
//                                     ...cart.producuts.slice(0, index),
//                                     ...cart.producuts.slice(index + 1),

//                                 ]
//                                 : [
//                                     ...cart.producuts.slice(0, index),
//                                     data,
//                                     ...cart.producuts.slice(index + 1),
//                                 ],
//                 }),
//                 headers: {
//                     'Content-Type': 'application/json',
//                     Accept: 'application/json'

//                 },

//             });
//             const json = await res.json();
//             localStorage.setItem('cart', JSON.stringify(json));
//             setCart(json);

//         } catch (error) {
//             console.log(error);

//         }
//     };
//     useEffect(() => {
//         const localcart = localStorage.getItem('cart')
//         if (localcart) {
//             setCart(JSON.parse(localcart));
//         } else {
//             createCart();
//         }
//     }, [])

//     // const increaseQuantity = (itemId) => {
//     //     setCart((prevCart) =>
//     //         prevCart.map((item) =>
//     //             item.id === itemId ? { ...item, quantity: item.quantity + 1 } : item
//     //         )
//     //     );
//     // };

//     // const decreaseQuantity = (itemId) => {
//     //     setCart((prevCart) =>
//     //         prevCart
//     //             .map((item) =>
//     //                 item.id === itemId ? { ...item, quantity: item.quantity - 1 } : item
//     //             )
//     //             .filter((item) => item.quantity > 0)
//     //     );
//     // };

//     return (
//         <CartContext.Provider value={{ addToCart, createCart }}>
//             {children}
//         </CartContext.Provider>
//     );
// }




