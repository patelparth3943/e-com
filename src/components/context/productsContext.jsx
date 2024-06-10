/* eslint-disable no-shadow */
import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { CartContext } from './cartcontext';

export const ProductsContext = createContext();

export function ProductsProvider({ children }) {
    const [products, setProducts] = useState([]);
    const [product, setProduct] = useState({})
    const { setCart } = useContext(CartContext);


    const loadProducts = async () => {
        try {
            const response = await fetch('http://localhost:3000/products');

            const json = await response.json();

            if (!response.ok) {
                throw new Error(json.message || 'Failed to load products');
            }

            setProducts(json);
            console.log('Products loaded:', json.products);
        } catch (error) {
            console.error('Load products error:', error.message);
        }
    };


    const loadSingleProduct = async (id) => {
        try {
            const response = await fetch(`http://localhost:3000/products/${id}`)
            const json = await response.json();

            if (!response.ok) {
                throw new Error(json.message || 'Failed to load products');
            }
            console.log('Products loaded:', json);
            setProduct(json)
        } catch (error) {
            console.log(error);
        }
    }

    const addToCart = (product) => {
        setCart(prevCart => [...prevCart, product]);
    };

    useEffect(() => {
        loadProducts();
    }, []);
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
        <ProductsContext.Provider value={{ products, addToCart, decreaseQuantity, increaseQuantity, loadSingleProduct, product }}>
            {children}
        </ProductsContext.Provider>
    );
}

export const useProducts = () => useContext(ProductsContext);
