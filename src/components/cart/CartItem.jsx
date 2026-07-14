import React, { useState, useEffect, useContext } from "react";
import Header from "../Header/Header.jsx";
import { CartContext } from "../../context/CartContext.jsx";
import { useNavigate } from "react-router-dom";
import Navbar from "../navbar/NavBar.jsx";
import CartSlice from "../cartslice/CartSlice.jsx";
import './CartItem.css';

const CartItem = () => {
  const { decrementCart, cartCount } = useContext(CartContext);
  const navigate = useNavigate();

  // 1. Single source of truth for the cart data
  const [plants, setPlants] = useState(() => {
    let saveddata = sessionStorage.getItem("cartplants");
    return saveddata ? JSON.parse(saveddata) : [];
  });
  
  const [checkoutdisabled, setCheckoutdisabled] = useState(false);

  const styles = {
    checkoutbutton : {
      backgroundColor : checkoutdisabled ? "grey" : "green"
    }
  };

  const checkout = () => {
    decrementCart(-1);
    setPlants([]);
    sessionStorage.setItem("cartplants", JSON.stringify([])); 
    navigate('/Checkout');
  };

  const continueShopping = () => {
    navigate('/ProductList');
  };
  
  // 2. Automatically sync with sessionStorage whenever parent state alters
  useEffect(() => {
    sessionStorage.setItem("cartplants", JSON.stringify(plants));
    if (cartCount === 0 || plants.length === 0) {
      setCheckoutdisabled(true);
    } else {
      setCheckoutdisabled(false);
    }
  }, [plants, cartCount]);

  // 3. This total will now dynamically update when CartSlice updates the parent's state
  const cartTotal = plants.reduce((sum, plant) => sum + (parseInt(plant.ItemTotal) || 0), 0);

  return (
    <>
      <Header />
      <Navbar />
      <label id="lblcarttotal" className="lblcarttotal">
        Total Cart Amount: ${cartTotal}
      </label>
      <div className="cart-container">
        <div>
          {plants.map((plant) => (
            // Pass down state variables to the child component
            <CartSlice 
              key={plant.id} 
              plant={plant} 
              plants={plants} 
              setPlants={setPlants} 
            />
          ))}
        </div>
      </div>
      <div>
        <button className="bottombutton" onClick={continueShopping}> Continue Shopping</button>
        <button className="bottombutton" style={styles.checkoutbutton} disabled={checkoutdisabled} onClick={checkout}> Checkout</button>
      </div>
    </>
  );
};

export default CartItem;
