import React from "react";
import MainSlider from "../components/MainSlider/index";
import Types from "../components/classifications";
import ProductTabs from "../components/productSliderTabs";
import NewProductc from "../components/newrelease";
import Brandslogo from "../components/brandsLogo/index";
import ClientCarousel from "../components/clientCarousel/index";
import ProductCard from "../components/productSlider";
import allProducts from "../services/watches";

function Rank(props) {

  return (
      <div>
        {/* <Types /> */}
        <NewProductc></NewProductc>
        {/* <ProductTabs /> */}
        {/* <ProductCard slides={allProducts} /> */}
        {/* <ClientCarousel /> */}
      </div>
  );

}

export default Rank;
