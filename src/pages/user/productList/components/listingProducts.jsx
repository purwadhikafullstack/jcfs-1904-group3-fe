import React from "react";
import ProductCard from "../../../../component/productCard";

function listingProducts(props) {
  const { products, paginationState } = props;
  const { page, itemsPerPage } = paginationState;

  const renderProducts = () => {
    return products.map((product) => <ProductCard product={product} />);
  };
  return (
    <div
      className="col-12 "
      style={{
        paddingLeft: "5%",
        display: "flex",
        flexWrap: "wrap",
        gap: "2%",
      }}
    >
      {renderProducts()}
    </div>
  );
}

export default listingProducts;
