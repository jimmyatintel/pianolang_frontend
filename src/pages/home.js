import React from "react";
import MainSlider from "../components/MainSlider/index";
import ProductTabs from "../components/productSliderTabs";
import ClientCarousel from "../components/clientCarousel/index";


function Home(props) {

  return (
      <div>
        <MainSlider />
        {/* <Types /> */}
        <ProductTabs />
        {/* <Brandslogo /> */}
        {/* <ProductCard slides={allProducts} /> */}
        <ClientCarousel />
      </div>
  );

}

export default Home;
