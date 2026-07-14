




// src/main.jsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import App1 from './App1.jsx'; // This imports the routing layout from Step 1
import './index.css'; // Optional: your global index styles

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App1 />
  </React.StrictMode>
);










// import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// import MainPage from './pages/mainpage/mainpage';
// import PlantList from './pages/PlantList/PlantList';
// import Checkout from './pages/checkout/checkout';
// import './App.css';
// import Cart from './components/cart/Cart';
// import { CartProvider } from './context/CartContext';
// function App() {
//   return (
//     <CartProvider>
//     <Router>
//       <Routes>
//         {/* path="/" is the home page (MainPage) */}
//         <Route path="/" element={<MainPage />} />
        
//         {/* path="/PlantList" matches what you call in navigate() */}
//         <Route path="/PlantList" element={<PlantList />} />

//         <Route path= "/Cart" element={<Cart/>} />
//         <Route path="/Checkout" element={<Checkout/>} />
     
        
//       </Routes>
//     </Router>
//     </CartProvider>
//   );
// }

// export default App;
