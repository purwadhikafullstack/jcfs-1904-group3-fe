import React from "react";
import ProductCard from "../../../../component/productCard";

function listingProducts(props) {
  const { products } = props;

  const renderProducts = () => {
    console.log(products);
    return products.map((product) => <ProductCard product={product} />);
  };
  return <div className=" d-flex flex-wrap col-9 ">{renderProducts()}</div>;
}

export default listingProducts;
