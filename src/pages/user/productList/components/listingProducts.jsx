import React from "react";
import ProductCard from "../../../../component/productCard";
import { Grid } from "@mui/material";
function listingProducts(props) {
  const { products, paginationState } = props;
  const { page, itemsPerPage } = paginationState;

  const renderProducts = () => {
    return products.map((product) => (
      <Grid item xs={3} style={{ paddingInline: "80px" }}>
        <ProductCard product={product} />
      </Grid>
    ));
  };
  return (
    // <Grid
    //   sx={{ width: "100%" }}
    //   container
    //   wrap="true"
    //   spacing={{ xs: 2, sm: 5, md: 18 }}
    //   columns={{ xs: 4, sm: 5, md: 12 }}
    // >
    //   {renderProducts()}
    // </Grid>
    <Grid
      container
      sx={{ width: "100%", paddingRight: "100px", marginTop: "10px" }}
    >
      {renderProducts()}
    </Grid>
  );
}

export default listingProducts;
