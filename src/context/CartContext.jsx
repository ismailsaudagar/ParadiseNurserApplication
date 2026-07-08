import React, { createContext, useState, useEffect } from 'react';

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  // Initialize state from sessionStorage so counts persist on refresh
  const [cartCount, setCartCount] = useState(() => {
    const saved = sessionStorage.getItem('cartCount');
    return saved ? parseInt(saved, 10) : 0;
  });


  const [quantityInCart, setQuantityInCart]= useState(()=>
  {
    const updatedquantityincart = sessionStorage.getItem('quantityincart');
    return updatedquantityincart ? JSON.parse(quantityInCart): [];
  })
  
  // Sync to sessionStorage automatically whenever cartCount changes
  useEffect(() => {
    sessionStorage.setItem('cartCount', cartCount);
  }, [cartCount]);

  const incrementCart = () => setCartCount(prev => prev + 1);
  const decrementCart = (count = 0) =>
    { 
    debugger;
      if (count>0)
      {
       setCartCount(prev => (prev > 0 ? prev - count : 0))
      }
      if (count<0)
      {
        setCartCount(0)
      }
      if(count == 0)
      {
        setCartCount(prev => (prev > 0 ? prev - 1 : 0))
      }
     
    }

  return (
    <CartContext.Provider value={{ cartCount, incrementCart, decrementCart , quantityInCart}}>
      {children}
    </CartContext.Provider>
  );
};
