



import React, { createContext, useState } from 'react';

export const CartContext = createContext();

export function CartProvider({ children }) {
    const [cart, setCart] = useState([]);

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
        <CartContext.Provider value={{ cart, addToCart, increaseQuantity, decreaseQuantity }}>
            {children}
        </CartContext.Provider>
    );
}


// import React, { createContext, useState } from 'react';

// export const CartContext = createContext();

// export function CartProvider({ children }) {
//     const [cart, setCart] = useState([]);
//     const { user } = useAuth();
//     const loadProducts = async (cartId) => {
//         try {
//             const response = await fetch('http://localhost:3000/products');

//             const json = await response.json();

//             if (!response.ok) {
//                 throw new Error(json.message || 'Failed to load products');
//             }

//             setCart(json);
//             console.log('Products loaded:', json.products);
//         } catch (error) {
//             console.error('Load products error:', error.message);
//         }
//     };
//     const createCart = useCallback(async () => {
//         const res = await axiosInstance.post('660/cart', {
//             userId: user.user.id,
//             items: [],
//         });
//         setCart(res.data);
//         localStorage.setItem('cart_id', JSON.stringify(res.data.id));
//     }, [user]);

//     const addCartItem = useCallback(
//         async (productId) => {
//             try {
//                 const updatedCart = { ...cart };
//                 const index = updatedCart.items.findIndex(
//                     (x) => x.productId === productId,
//                 );

//                 if (index === -1) {
//                     const items = [...updatedCart.items, { productId, quantity: 1 }];
//                     updatedCart.items = items;
//                 } else {
//                     const items = [
//                         ...updatedCart.items.slice(0, index),
//                         {
//                             ...updatedCart.items[index],
//                             quantity: updatedCart.items[index].quantity + 1,
//                         },
//                         ...updatedCart.items.slice(index + 1),
//                     ];
//                 }
//                 const response = await fetch(`http://localhost:3000/cart/${cart.id}`, updatedCart);
//             } catch (error) { }
//             [cart.id]
// );

//     useEffect(() => {
//         const cartId = localStorage.getItem('cart_id');
//         if (cartId) {
//             loadCart(cartId)
//         } else {
//             createCart();
//         }
//     }, []);


//     return (
//         <CartContext.Provider value={{ cart, addToCart, increaseQuantity, decreaseQuantity }}>
//             {children}
//         </CartContext.Provider>
//     );
// }

