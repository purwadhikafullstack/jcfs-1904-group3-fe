import React from "react";
import ProductCard from "../../../../component/productCard";

function listingProducts(props) {
  const { products } = props;

  const renderProducts = () => {
    console.log(products);
    return products.map((product) => <ProductCard product={product} />);
  };
  return (
    <div className="col-12 " style={{ display: "flex", flexWrap: "wrap" }}>
      {renderProducts()}
    </div>
  );
}

export default listingProducts;
