import "./style.css";
import { BrowserRouter as Router, Routes, Route, useNavigate } from "react-router-dom";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import TopHeader from "./components/topHeader";
import NavBar from "./components/navbar";
import Footer from "./components/footer";
import CartListPage from "./pages/cartList";
import CurrentProductPage from "./pages/currentProduct";
import Home from "./pages/home";
import Rank from "./pages/ranking";
import React, { useState, useEffect, useRef } from "react";
import LoginPage from "./pages/login";
import AccountModify from "./pages/account";
import Registration from "./pages/registration";
import SearchPage from "./pages/search";
import OrderList from "./pages/order_list";
import ManageSongs from "./pages/manage";
import Contact from "./pages/contact";
import OrderComplete from "./pages/ordercomplete";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "./redux/reducers/user-actions";

// ⏰ Idle time (in ms)
const IDLE_TIMEOUT = 30 * 60 * 1000; // 30 minutes

function App(props) {
  const [quantity, setQuantity] = useState(0);
  const dispatch = useDispatch();
  const user = useSelector(state => state.user); // adjust based on your reducer structure
  const timerRef = useRef(null);

  // Reset idle timer
  const resetTimer = () => {
    if (timerRef.current) clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => {
      if (user?.isLoggedIn) {
        dispatch(logout());
        alert("You have been logged out due to inactivity.");
      }
    }, IDLE_TIMEOUT);
  };

  useEffect(() => {
    const activityEvents = ["mousemove", "mousedown", "keydown", "scroll", "touchstart"];
    activityEvents.forEach(event => window.addEventListener(event, resetTimer));
    resetTimer(); // Start the timer on mount

    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
      activityEvents.forEach(event => window.removeEventListener(event, resetTimer));
    };
  }, [user]);

  return (
    <Router>
      <div id="App">
        <TopHeader />
        <NavBar />
        <Routes>
          <Route exact path="/" element={<Home />}></Route>
          <Route path="/shoppingCart" element={<CartListPage qVal={quantity} setqVal={setQuantity} />}></Route>
          <Route path="/product/:id" element={<CurrentProductPage />}></Route>
          <Route path="/ranking" element={<Rank />}></Route>
          <Route path="/login" element={<LoginPage />}></Route>
          <Route path="/account" element={<AccountModify />}></Route>
          <Route path="/registration" element={<Registration />}></Route>
          <Route path="/search" element={<SearchPage />}></Route>
          <Route path="/orderlist" element={<OrderList />}></Route>
          <Route path="/manage" element={<ManageSongs />}></Route>
          <Route path="/contact" element={<Contact />}></Route>
          <Route path="/ordercomplete/:id" element={<OrderComplete />}></Route>
          <Route path="*" element={<Home />}></Route>
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;