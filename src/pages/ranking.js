import React from "react";
import MainSlider from "../components/MainSlider/index";
import Types from "../components/classifications";
import ProductTabs from "../components/productSliderTabs";
import Brandslogo from "../components/brandsLogo/index";
import ClientCarousel from "../components/clientCarousel/index";
import ProductCard from "../components/productSlider";
import allProducts from "../services/watches";

function Rank(props) {

  return (
      <div>
        <Types />
        <ProductTabs />
        {/* <ProductCard slides={allProducts} /> */}
        {/* <ClientCarousel /> */}
      </div>
  );

}

export default Rank;
