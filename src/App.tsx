import { BrowserRouter, Route, Routes } from "react-router-dom";
import MainLayout from "./layout/MainLayout";
import Home from "./pages/HomePage/Home";
import Store from "./pages/StorePage/Store";
import { Register } from "./pages/AuthPage/Register";
import Login from "./pages/AuthPage/Login";
import { useEffect } from "react";
import BookDetail from "./pages/BookDetailPage/BookDetail";
import ScrollToTop from "./components/ScrollToTop";
import Cart from "./pages/CartPage/Cart";

import Wishlist from "./pages/WishlistPage/Wishlist";
import UserDetail from "./pages/UserDetailPage/UserDetail";
import UserAuthLayout from "./layout/UserAuthLayout";
import Shipping from "./pages/ShippingPage/Shipping";

function App() {
  useEffect(() => {
    const existingGuestId = localStorage.getItem("guestId");
    if (existingGuestId) {
      return;
    }
    const guestId: string = crypto.randomUUID();

    localStorage.setItem("guestId", guestId);
  }, []);
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Routes>
        <Route element={<MainLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/store" element={<Store />} />
          <Route path="/books/:id" element={<BookDetail />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/wishlist" element={<Wishlist />} />
        </Route>
        <Route element={<UserAuthLayout />}>
          <Route path="/my-profile" element={<UserDetail />} />
          <Route path="/shipping" element={<Shipping />} />
        </Route>
        <Route path="*" element={<div>404 Not Found</div>} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </BrowserRouter>
  );
}
export default App;
