import React from "react";
import MainSlider from "../components/MainSlider/index";
import ProductTabs from "../components/productSliderTabs";
import ClientCarousel from "../components/clientCarousel/index";
import NewProductc from "../components/newrelease/index";

function Home(props) {

  return (
      <div>
        <MainSlider />
        {/* <Types /> */}
        <ProductTabs />
        {/* <Brandslogo /> */}
        {/* <ProductCard slides={allProducts} /> */}
        <NewProductc limit={8}></NewProductc>
        <ClientCarousel />
      </div>
  );

}

export default Home;
