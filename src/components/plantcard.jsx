import { useEffect, useState } from "react";
import  '../pages/productlist/ProductList';
import { CartContext } from "../context/CartContext";
import React from "react";
import '../pages/productlist/ProductList.css';
import Navbar from "./navbar/NavBar";

const Plantcard = ({ plant }) => {
  const { incrementCart } = React.useContext(CartContext);
  const [isDisabled, setIsDisabled] = useState(false);

  // Check if item is already in cart on mount to disable button if needed
  useEffect(() => {
    const existingPlants = sessionStorage.getItem("cartplants");
    if (existingPlants) {
      const currentCart = JSON.parse(existingPlants);
      const isAlreadyInCart = currentCart.some((x) => x.id === plant.id && x.Quantity > 0);
      if (isAlreadyInCart) {
        setIsDisabled(true);
      }
      else{
        setIsDisabled(false)
      }
    }
  }, [plant.id]);

  const addtocart = (targetPlant) => {
    setIsDisabled(true);

    // 1. Always fetch the freshest cart data inside the function
    const existingPlants = sessionStorage.getItem("cartplants");
    let currentCart = existingPlants ? JSON.parse(existingPlants) : [];

    // 2. Check existence by ID, not by object reference
    const existingPlantIndex = currentCart.findIndex((x) => x.id === targetPlant.id);

    if (existingPlantIndex !== -1) {
      // Item exists: update quantity immutably
      const updatedPlant = { ...currentCart[existingPlantIndex] };
      updatedPlant.Quantity += 1;
      updatedPlant.ItemTotal = updatedPlant.Quantity * updatedPlant.Price;
      currentCart[existingPlantIndex] = updatedPlant;
    } else {
      // Item does not exist: create a fresh object copy starting at quantity 1
      const newPlantItem = {
        ...targetPlant,
        Quantity: 1,
        ItemTotal: targetPlant.Price,
      };
      currentCart.push(newPlantItem);
      incrementCart();
    }

    // 3. Save back to session storage
    sessionStorage.setItem("cartplants", JSON.stringify(currentCart));
  };

  const buttonStyle = {
    backgroundColor: isDisabled ? "#cccccc" : "#007bff",
    color: isDisabled ? "#666666" : "#ffffff",
  };

  return (
   
    <div className="plantcarddiv">
      <span className="plantcarddivspan">{plant.Benefit}</span>
      <h3 className="plantcarddivh3">{plant.Name}</h3>
      <div className="plantcardinternaldiv">
        <img src={plant.ImgUrl} alt={plant.Name} className="internalimg" />
      </div>
      <div className="div3">${plant.Price}</div>
      <button
        disabled={isDisabled}
        style={buttonStyle}
        className="divcardbtn"
        onClick={() => addtocart(plant)}
      >
        Add to Cart
      </button>
    </div>
  );
};

export default Plantcard;
