import React from "react";
import ProductCard from "../../../../component/productCard";

function listingProducts(props) {
  const { products, paginationState } = props;
  const { page, itemsPerPage } = paginationState;

  const renderProducts = () => {
    const startIndex = (page - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const slicedProducts = products.slice(startIndex, endIndex);
    return slicedProducts.map((product) => <ProductCard product={product} />);
  };
  return (
    <div className="col-12 " style={{ display: "flex", flexWrap: "wrap" }}>
      {renderProducts()}
    </div>
  );
}

export default listingProducts;
