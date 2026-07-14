import { Navigate, useNavigate } from "react-router-dom";
import React  from "react";
import './Header.css';
import { CartContext } from "../../context/CartContext";
import Navbar from "../navbar/NavBar";


const  Header = () =>
{
    const baseUrl = import.meta.env.BASE_URL;
    const navigate = useNavigate();
    const { cartCount } = React.useContext(CartContext);
    const loadCart = () =>
{
   navigate('/CartItem')
}
    return (
           <header className="main-header">

    <div className="row">
        <div className="header-logo-box">
          <img src= {baseUrl + "images/Logo.jpg"} alt="Logo" className="logo" />
          </div>
          <div>
          <h1 className="company-name">Paradise Nursery </h1>
        </div>
   </div>
        
        <p className="plantspara">Plants</p>
        <div className="header-cart-box">
          <button className="cart-btn" onClick={loadCart}>
            🛒 <span className="cart-text">{cartCount} Cart</span>
          </button>
        </div>
      
      </header>
    )
}

export default Header