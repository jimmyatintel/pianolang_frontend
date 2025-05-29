import React from "react";
import NewProductc from "../components/newrelease";


function Rank(props) {

  return (
      <div>
        {/* <Types /> */}
        <NewProductc limit={30}></NewProductc>
        {/* <ProductTabs /> */}
        {/* <ProductCard slides={allProducts} /> */}
        {/* <ClientCarousel /> */}
      </div>
  );

}

export default Rank;
