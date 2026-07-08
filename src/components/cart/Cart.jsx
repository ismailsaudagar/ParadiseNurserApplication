import React, { useState, useEffect, useContext } from "react";
import "./Cart.jsx";
import Header from "../Header/Header.jsx";
import { CartContext } from "../../context/CartContext.jsx";
import { Route, useNavigate } from "react-router-dom";
import { isPartOfTypeOnlyImportOrExportDeclaration } from "typescript";

const Cart = () => {
  const { incrementCart, decrementCart ,quantityInCart, cartCount} = useContext(CartContext);
  const navigate = useNavigate();

  

  // 1. Initialize state immediately using a fallback empty list
  const [plants, setPlants] = React.useState(() => {
    let saveddata = sessionStorage.getItem("cartplants");
    if(saveddata)
    return saveddata ? JSON.parse(saveddata) : [];
  });
  
  const [checkoutdisabled, setCheckoutdisabled] = useState(false)

  const styles = {
    div: {
      innerHeight: "1000px",
    },
    checkoutbutton :
    {
      backgrounColor : checkoutdisabled ? "grey" : "green"
    }
  };


  const checkout = ()=>
  {
    decrementCart(-1)
    setPlants([])
    sessionStorage.setItem("cartplants",plants)
    navigate('/Checkout')
  }

  const continueShopping = ()=>
    
    {
    navigate('/PlantList')
    }

  
  2. //Synchronize to sessionStorage automatically ONLY after state changes successfully
  useEffect(() => {

    sessionStorage.setItem("cartplants", JSON.stringify(plants));
     if (cartCount == 0)
     {
       setCheckoutdisabled(true)
     }

  }, [plants]);


 
  const cartTotal = plants.reduce((sum, plant) => sum + ( parseInt(plant.ItemTotal) || 0), 0);

  const increaseCount = (plantid) => {
    setPlants((prevplants) =>
      prevplants.map((plant) => {
        if (plant.id === plantid) {
          let newQuantity = plant.Quantity + 1;
          return {
            ...plant,
            Quantity: newQuantity,
            ItemTotal: newQuantity * plant.Price,
          };
        }
        return plant;
      })
    );
    incrementCart(); // Let Context handle global badge counter cleanly
  };

  
const decreaseCount = (plantid) => {
  
  const targetPlant = plants.find((p) => p.id === plantid);
  if (!targetPlant || targetPlant.Quantity <= 0) return;

   let newQuantity = targetPlant.Quantity - 1;
 
  if (newQuantity === 0) {

    deleteplant(plantid)
   
  }

  else
  {
    setPlants((prevplants) =>
    prevplants.map((plant) => {
      if (plant.id === plantid) {
        return {
          ...plant,
          Quantity: newQuantity,
          ItemTotal: newQuantity * plant.Price,
        };
      }
      return plant;
    })
  );

  decrementCart(); 
}
};


const deleteplant = (id,quantity)=>
{
 
  decrementCart(quantity);
   setPlants((prevPlants) => 
    // Keep every plant whose ID does NOT match the one we want to remove
    prevPlants.filter((plant) => plant.id !== id)
  );

}


  return (
    <>
      <Header />
      <label id="lblcarttotal" className="lblcarttotal">
        Total Cart Amount: ${cartTotal}
      </label>
      <div className="cart-container">
        <div>
          {plants.map((plant) => (
            // Added explicit unique key prop here to help React render list elements safely
            <div key={plant.id} className="cart-item-container">
              <div className="cart-item-left">
                <img src={plant.ImgUrl} alt={plant.Name} className="cart-image" />
              </div>

              <div className="cart-item-details">
                <h3 className="cart-product-name">{plant.Name}</h3>
                <p className="cart-product-price">${plant.Price}</p>
              </div>

              <div className="cart-item-quantity">
                <button className="qty-btn minus-btn" onClick={() => decreaseCount(plant.id)}>-</button>
                <span className="qty-number">{plant.Quantity}</span>
                <button className="qty-btn plus-btn" onClick={() => increaseCount(plant.id)}>+</button>
              </div>

              <div className="cart-item-action-block">
                <div className="cart-item-total">
                  <span className="subtotal-amount">Total: ${plant.ItemTotal}</span>
                </div>
                <button className="delete-btn"  onClick={ () => deleteplant(plant.id,plant.Quantity)}>Delete</button>
              </div>

              <div style={styles.div}> </div>
            </div>
          ))}
        </div>
      </div>
      <div>
        <button className="bottombutton" onClick={() =>continueShopping()}> Continue Shopping</button>
        <button className="bottombutton" style = {styles.checkoutbutton} disabled = {checkoutdisabled} onClick={() =>checkout()}> Checkout</button>
      </div>
    </>
  );
};

export default Cart;
