import React from "react";
import ProductCard from "../../../../component/productCard";
import { Grid } from "@mui/material";
function listingProducts(props) {
  const { products, paginationState } = props;
  const { page, itemsPerPage } = paginationState;

  const renderProducts = () => {
    return products.map((product) => (
      <Grid item xs={3}>
        <ProductCard product={product} />
      </Grid>
    ));
  };
  return (
    <Grid
      container
      sx={{ width: "100%", paddingLeft: "50px", marginTop: "10px" }}
      spacing={5}
    >
      {renderProducts()}
    </Grid>
  );
}

export default listingProducts;
