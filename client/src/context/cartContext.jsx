import React, { createContext, useState } from "react";

export const CartContext = createContext({});

export const CartProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
  const [isOpen, setIsOpen] = useState(false);

  const toggleCart = () => setIsOpen((prev) => (prev ? false : true));

  const addToCart = (product) => {
    const isExist = products.find((p) => p.id === product.id);

    if (isExist) {
      setProducts((prev) => {
        const updatedProducts = prev.map((p) => {
          return p.id === product.id ? { ...p, quantity: p.quantity + 1 } : p;
        });

        return updatedProducts;
      });
    } else {
      setProducts((prev) => {
        return [...prev, product];
      });
    }
  };

  const removeProduct = (product) => {
    setProducts((prev) => prev.filter((p) => p.id !== product.id));
  };

  return (
    <CartContext.Provider
      value={{
        CartProvider,
        isOpen,
        toggleCart,
        addToCart,
        removeProduct,
        products,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
