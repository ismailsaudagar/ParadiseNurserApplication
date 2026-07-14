import React, { useEffect } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { useState } from "react";
import Plantcard from "../../components/plantcard";
import Header from "../../components/Header/Header";
import { CartContext } from "../../context/CartContext";
import { useContext } from "react";
import Navbar from "../../components/navbar/NavBar";

// This variable automatically adjusts the path for localhost and GitHub Pages
const baseUrl = import.meta.env.BASE_URL;

const plants = [
    { id: 1, Name: "Snake Plant", Quantity: 0, Price: "10", Benefit: "It purifes the air", ImgUrl: baseUrl + "images/snakeplant.jpg", category: "Air purifier", ItemTotal: 0 },
    { id: 2, Name: "Pothos", Quantity: 0, Price: "13", Benefit: "It purifies the air", ImgUrl: baseUrl + "images/goldenpothos.jpg", category: "Air purifier", ItemTotal: 0 },
    { id: 3, Name: "Spider Plant", Quantity: 0, Price: "15", Benefit: "Safely removes carbon monooxide", ImgUrl: baseUrl + "images/images 1.jpg", category: "Air purifier", ItemTotal: 0 },
    { id: 4, Name: "xyaznd", Quantity: 0, Price: "17", Benefit: "Purrifes air", ImgUrl: baseUrl + "images/images.jpg", category: "Air purifier", ItemTotal: 0 },

    { id: 5, Name: "Aloe Vera", Quantity: 0, Price: "25", Benefit: "It is good for skin health", ImgUrl: baseUrl + "images/aloevera.jpg", category: "Skin care", ItemTotal: 0 },
    { id: 6, Name: "Dandellion", Quantity: 0, Price: "31", Benefit: "Good for skin removes acne", ImgUrl: baseUrl + "images/dendellion.jpg", category: "Skin care", ItemTotal: 0 },
    { id: 7, Name: "kkaetu", Quantity: 0, Price: "11", Benefit: "good for skin", ImgUrl: baseUrl + "images/goldenpothos.jpg", category: "Skin care", ItemTotal: 0 },

    { id: 8, Name: "aascd", Quantity: 0, Price: "9", Benefit: "good for health", ImgUrl: baseUrl + "images/peacelilly.jpg", category: "abcd", ItemTotal: 0 },
    { id: 9, Name: "Example Plant", Quantity: 0, Price: "18", Benefit: "good for health", ImgUrl: baseUrl + "images/peppermint.jpg", category: "abcd", ItemTotal: 0 }
];

let cartplantcount = 0;

const PlantList = () => {
  const navigate = useNavigate();
  const { incrementCart, decrementCart, quantityInCart } = React.useContext(CartContext);
  const { cartCount } = useContext(CartContext);

  const loadCart = () => {
    navigate('/Cart', { state: { cartCount: cartCount } });
  };

  const groupedPlants = Object.groupBy(plants, (plant) => plant.category);
  const [isDisabled, setIsDisabled] = useState(false);

  function SetCartCountMethod() {
    incrementCart();
  }

  return (
    <div className="page-wrapper">
      <Header />
      <Navbar />
      <div className="garden-container">
        {Object.entries(groupedPlants).map(([category, plantsInCategory]) => (
          <div key={category} className="category-section">
            <h2 className="category-title">{category}</h2>
            <div className="plants-grid">
              {plantsInCategory.map((plant) => (
                <Plantcard key={plant.id} plant={plant} />
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PlantList;
