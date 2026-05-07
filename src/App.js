import React from 'react';
import Nav from './components/Nav'; 
import './index.css';
import { useEffect, useState } from 'react';
import Footer from './components/Footer';
import Home from './pages/Home';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Books from './pages/Books';
import { books } from './data';
import BookInfo from './pages/BookInfo';
import Cart from './pages/Cart';

function App() {
  const [cart, setCart] = useState([]);

  function addToCart(book) {
    setCart((prevCart) => {
      const item = prevCart.find((cartItem) => +cartItem.id === +book.id);
      if (item) {
        return prevCart.map((cartItem) =>
          +cartItem.id === +book.id
            ? { ...cartItem, quantity: cartItem.quantity + 1 }
            : cartItem
        );
      }

      return [...prevCart, { ...book, quantity: 1 }];
    });
  }

  function removeFromCart(bookId) {
    setCart((prevCart) => prevCart.filter((item) => +item.id !== +bookId));
  }

  function updateCartItemQuantity(bookId, quantity) {
    const safeQuantity = Number.isNaN(quantity) ? 1 : Math.max(1, quantity);
    setCart((prevCart) =>
      prevCart.map((item) =>
        +item.id === +bookId ? { ...item, quantity: safeQuantity } : item
      )
    );
  }

  const cartItemCount = cart.reduce((total, item) => total + item.quantity, 0);
  const subTotal = cart.reduce(
    (total, item) => total + (item.salePrice || item.originalPrice) * item.quantity,
    0
  );
  const tax = subTotal * 0.08;
  const total = subTotal + tax;

  const cartTotals = {
    subTotal,
    tax,
    total,
  };

  function formatMoney(value) {
    return `$${value.toFixed(2)}`;
  }

  useEffect(() => {
    console.log(cart);
  }, [cart]);
  return (
    <Router>
    <div className="App">
      <Nav cartItemCount={cartItemCount} />
      <Routes><Route path="/" element={<Home />} /></Routes>
      <Routes><Route path="/books" element={<Books books={books} />} /></Routes>
      <Routes><Route path="/books/:id" element={<BookInfo books={books} addToCart={addToCart} cart={cart} />} /></Routes>
      <Routes><Route path="/cart" element={<Cart cart={cart} removeFromCart={removeFromCart} updateCartItemQuantity={updateCartItemQuantity} cartTotals={cartTotals} formatMoney={formatMoney} />} /></Routes>
      <Footer />
    </div>
    </Router>
  );
}

export default App;
