import React  from "react";
import './MainPage.css';
import PlantList from "../PlantList/PlantList";
import { useNavigate } from "react-router-dom";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import bgImage from '../../images/nurserybackgroundimage.jpg';

const MainPage =  () =>
{
    const navigate = useNavigate();
    
    const loadPlants = () =>
    {
        navigate('/PlantList')
    }
    return (

<body style={{ 
  backgroundImage: 'url("/src/images/nurserybackgroundimage.jpg")',
  
  backgroundSize: 'cover',
  backgroundPosition: 'center',
  minHeight: '100vh' 
 
  
}}>

<div style={{ minHeight: '100vh', background: 'linear-gradient(rgba(0,0,0,0.65), rgba(0,0,0,0.65)), url("/images/nurserybackgroundimage.jpg") center/cover no-repeat' }} className="container">
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
      </body>
    )
}

export default MainPage