import React from "react";
import { CartContext } from "../../context/CartContext.jsx";
import { useContext } from "react";
import './CartSlice.css';

// We now destructure plants and setPlants from props
const CartSlice = ({ plant, plants, setPlants }) => {
  const { incrementCart, decrementCart } = useContext(CartContext);

  const increaseCount = (plantid) => {
    // Updates the shared array state in the parent
    setPlants((prevplants) =>
      prevplants.map((p) => {
        if (p.id === plantid) {
          let newQuantity = p.Quantity + 1;
          return {
            ...p,
            Quantity: newQuantity,
            ItemTotal: newQuantity * p.Price,
          };
        }
        return p;
      })
    );
    incrementCart(); 
  };

  const decreaseCount = (plantid) => {
    const targetPlant = plants.find((p) => p.id === plantid);
    if (!targetPlant || targetPlant.Quantity <= 0) return;

    let newQuantity = targetPlant.Quantity - 1;
 
    if (newQuantity === 0) {
      deleteplant(plantid, targetPlant.Quantity);
    } else {
      setPlants((prevplants) =>
        prevplants.map((p) => {
          if (p.id === plantid) {
            return {
              ...p,
              Quantity: newQuantity,
              ItemTotal: newQuantity * p.Price,
            };
          }
          return p;
        })
      );
      decrementCart(1); 
    }
  };

  const deleteplant = (id, quantity) => {
    decrementCart(quantity);
    // Removes the item from the parent array loop entirely
    setPlants((prevPlants) => 
      prevPlants.filter((p) => p.id !== id)
    );
  };

  return (
    <div className="cart-item-container">
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
        <button className="delete-btn" onClick={() => deleteplant(plant.id, plant.Quantity)}>Delete</button>
      </div>
    </div>
  );
};

export default CartSlice;
