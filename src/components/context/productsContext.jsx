import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { CartContext } from './cartcontext';

export const ProductsContext = createContext();

export function ProductsProvider({ children }) {
    const [products, setProducts] = useState([]);
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

    const addToCart = (product) => {
        setCart(prevCart => [...prevCart, product]);
    };

    useEffect(() => {
        loadProducts();
    }, []);

    return (
        <ProductsContext.Provider value={{ products, addToCart }}>
            {children}
        </ProductsContext.Provider>
    );
}

export const useProducts = () => useContext(ProductsContext);
