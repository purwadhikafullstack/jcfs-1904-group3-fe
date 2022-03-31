import React, { useEffect } from "react";
import { Button } from "@mui/material";
import { width } from "@mui/system";

function Index(props) {
  const { page, maxPage, ItemPerPage } = props.colorPaginationState;
  const { colors } = props;
  const { image, price, productName, variant, qtyAvailable } =
    props.slicedProducts[0];

  const imageButtonMapping = () => {
    return colors.map((value) => {
      const lowercased = value.toLowerCase();
      console.log(lowercased);
      return (
        <Button
          variant="contained"
          sx={{
            borderRadius: "50%",
            width: 50,
            height: 50,
            backgroundColor: lowercased,
          }}
        ></Button>
      );
    });
  };

  useEffect(() => {
    console.log(props);
  }, []);

  return (
    <div>
      <div className="container">
        <div className="row mt-3">
          <div className="col-6">
            <img style={{ width: "100%" }} src={image} alt="" />
          </div>
          <div className="col-6 d-flex flex-column justify-content-center">
            <h4>{productName}</h4>
            <h5>Rp {price}</h5>

            <div className="d-flex flex-row align-items-center">
              <button
                //   onClick={() => {
                //     quantityBtnHandler("decrement");
                //   }}
                className="btn btn-primary "
              >
                -
              </button>
              <strong className="text-center mx-4">10</strong>
              <button
                //   onClick={() => {
                //     quantityBtnHandler("increment");
                //   }}
                className="btn btn-primary "
              >
                +
              </button>
            </div>
            <p>{variant}</p>
            <div className="d-flex flex-row">{imageButtonMapping()}</div>
            <button className="btn btn-success mt-3">Add to cart</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Index;
