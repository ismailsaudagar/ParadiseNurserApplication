import React  from "react";
import './App.css';
import productList from '../productlist/ProductList'
import { useNavigate } from "react-router-dom";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import bgImage from '/images/nurserybackgroundimage.jpg';

const App =  () =>
{
    const navigate = useNavigate();
    const baseUrl = import.meta.env.BASE_URL;
    const loadPlants = () =>
    {
        navigate('/ProductList')
    }
    return (

// {/* <body style={{ 
//   backgroundImage: 'url("'+ baseUrl + '"/images/nurserybackgroundimage.jpg")',
  
//   backgroundSize: 'cover',
//   backgroundPosition: 'center',
//   minHeight: '100vh' 
 
  
// }}> */}

<div className="maindiv">
<div className="smalldiv">
            <h1 style ={{color:"white"}}> Welcome To <br/>
        <br></br>
              Paradise Nursery
            </h1>      
    <button  className="bottombutton" onClick={loadPlants}>Get Started</button>
 </div>
 
 <div className="bigdiv">
                    
               <span className="span">

                The paradise nursery was founded in 2001 by Ismail Saudagar <br></br>
                It contains various types of plants . Like Rose Plants, Mango , Neem,
                Jasmin, Sunflower etc.
                You can buy the plants on reasonable prices and I am sure 
                you peoples will be happy.
               </span>
     
        </div>
        </div>
      // {/* </body> */}
    )
}

export default App