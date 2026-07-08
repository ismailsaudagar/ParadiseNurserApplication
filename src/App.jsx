// src/App.jsx
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MainPage from './pages/mainpage/mainpage';
import PlantList from './pages/PlantList/PlantList';
import Checkout from './pages/checkout/checkout';
import './App.css';
import Cart from './components/cart/Cart';
import { CartProvider } from './context/CartContext';

function App() {
  return (
    <CartProvider>
      <Router>
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/PlantList" element={<PlantList />} />
          <Route path="/Cart" element={<Cart />} />
          <Route path="/Checkout" element={<Checkout />} />
          {/* Fallback route to catch spelling mistakes */}
          <Route path="*" element={<div style={{ padding: '20px' }}>404 - Page Not Found</div>} />
        </Routes>
      </Router>
    </CartProvider>
  );
}

export default App;
