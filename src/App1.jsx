// src/App.jsx
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import  App from './pages/app/App';
import ProductList from './pages/productlist/ProductList';
import Checkout from './pages/checkout/checkout';
import './App1.css';
import CartItem from './components/cart/CartItem';
import { CartProvider } from './context/CartContext';
import AboutUs from './pages/about/AboutUs';



function App1() {
  return (
    <CartProvider>
      <Router>
        <Routes>
          <Route path="/" element={<App />} />
          <Route path="/ProductList" element={<ProductList />} />
          <Route path="/CartItem" element={<CartItem />} />
          <Route path="/Checkout" element={<Checkout />} />
          <Route path="/about" element={<AboutUs/>} />
          {/* Fallback route to catch spelling mistakes */}
          <Route path="*" element={<div style={{ padding: '20px' }}>404 - Page Not Found</div>} />
        </Routes>
      </Router>
    </CartProvider>
  );
}

export default App1;
