import "./style.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import TopHeader from "./components/topHeader";
import NavBar from "./components/navbar";
import Footer from "./components/footer";
import WishListPage from "./pages/wishList";
import CartListPage from "./pages/cartList";
import CurrentProductPage from "./pages/currentProduct";
import Home from "./pages/home";
import Rank from "./pages/ranking";
import React, { useState } from "react";
import LoginPage from "./pages/login";
import AccountModify from "./pages/account";
import Registration from "./pages/registration";
import SearchPage from "./pages/search";
function App(props) {
  
  const [quantity, setQuantity] = useState(0);

  //And note that we use : to signify a variable in the URL, just like we do in CurrentProductPage component path.

  return (
    <Router>
      <div id="App">
        <TopHeader />
        <NavBar />
        <Routes>
          <Route exact path="/" element={<Home />}></Route>
          <Route path="/wishList" element={<WishListPage />}></Route>
          <Route
            path="/shoppingCart"
            element={<CartListPage qVal={quantity} setqVal={setQuantity} />}
          ></Route>
          <Route path="/product/:id" element={<CurrentProductPage />}></Route>
          <Route path="/ranking" element={<Rank />}></Route>
          <Route path="/login" element={<LoginPage />}></Route>
          <Route path="/account" element={<AccountModify />}></Route>
          <Route path="/registration" element={<Registration />}></Route>
          <Route path="/search" element={<SearchPage />}></Route>
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
