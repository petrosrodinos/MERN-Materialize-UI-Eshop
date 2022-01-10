import React, { createContext, useContext } from "react";
import { useCart } from "../hooks/cartHook";

const CartContext = createContext();

const CartProvider = ({ children }) => {
  const { cart, count, addToCart, total, emptyCart, getCartData } = useCart();

  return (
    <CartContext.Provider
      value={{ cart, count, addToCart, total, emptyCart, getCartData }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const CartState = () => {
  return useContext(CartContext);
};

export default CartProvider;
