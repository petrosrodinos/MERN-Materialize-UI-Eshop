import { useState, useCallback, useEffect } from "react";

export const useCart = () => {
  const [cart, setCart] = useState(null);
  const [count, setCount] = useState(0);
  const [itemsId, setItemsId] = useState(null);
  const [total, setTotal] = useState(0);

  const addToCart = useCallback((product) => {
    let cart = JSON.parse(localStorage.getItem("cart"));
    if (cart) {
      setTotal(total + parseInt(product.price));
      cart.push(product);
      localStorage.setItem("cart", JSON.stringify(cart));
    } else {
      let products = [];
      products.push(product);
      localStorage.setItem("cart", JSON.stringify(products));
      setCount(1);
      setCart(products);
      setTotal(total + parseInt(product.price));
    }
    if (cart) {
      setCount(cart.length);
      setCart(cart);
    }
  }, []);

  const getCartData = useCallback(() => {
    let cart = JSON.parse(localStorage.getItem("cart"));
    if (cart) {
      console.log(cart);
      let productIds = [];
      let shopId = cart[0].shopId;
      cart.map((c) => {
        productIds.push(c._id);
      });
      return { productIds, shopId };
    }
  }, []);

  const emptyCart = useCallback(() => {
    localStorage.removeItem("cart");
    setCount(0);
    setCart(null);
  }, []);

  useEffect(() => {
    let cart = JSON.parse(localStorage.getItem("cart"));
    if (cart) {
      setCount(cart.length);
      setCart(cart);
    }
  }, []);

  return { cart, count, addToCart, total, emptyCart, getCartData };
};
